import React, { Fragment } from "react";
import { FormattedNumber } from "react-intl";
import { TranslatedMessage } from "lib/TranslatedMessage";
import _ from "lodash";
import TransactionHistory from "./TransactionHistory";
import UnopenedAccount from "./UnopenedAccount";

import config from "client-config.json";
import { apiClient } from "lib/Client";

import AccountWebsocket from "lib/AccountWebsocket";

export default class AccountHistory extends React.Component {
  state = {
    history: [],
    nextPageHead: null,
    pendingTransactions: null
  };

  constructor(props) {
    super(props);

    this.websocket = new AccountWebsocket(config.websocketServer);
    this.pendingTimeout = null;
  }

  async componentDidMount() {
    this.fetchData();

    try {
      await this.websocket.connect();
      this.websocket.subscribeAccount(
        this.props.account,
        this.onWebsocketEvent.bind(this)
      );
    } catch (e) {
      console.log(e.message);
    }
  }

  componentWillUnmount() {
    this.clearTimers();
    this.websocket.disconnect();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.account !== this.props.account) {
      this.clearTimers();

      this.websocket.unsubscribeAccount(prevProps.account);
      this.websocket.subscribeAccount(
        this.props.account,
        this.onWebsocketEvent.bind(this)
      );

      this.setState(
        {
          history: [],
          nextPageHead: null,
          pendingTransactions: null
        },
        this.fetchData.bind(this)
      );
    }
  }

  clearTimers() {
    if (this.pendingTimeout) clearTimeout(this.pendingTimeout);
  }

  async fetchData() {
    this.fetchHistory();
    this.fetchPending();
  }

  async fetchHistory() {
    const { account } = this.props;
    let { history, nextPageHead } = this.state;

    try {
      let resp = await apiClient.history(account, this.state.nextPageHead);

      if (nextPageHead) {
        resp = resp.slice(1);
      }

      if (resp === "") return;
      history = history.concat(resp);

      nextPageHead = _.last(history).hash;
      this.setState({ history, nextPageHead });
    } catch (e) {}
  }

  async fetchPending() {
    const { account } = this.props;

    try {
      const pendingTransactions = await apiClient.pendingTransactions(account);
      this.setState({ pendingTransactions });

      this.pendingTimeout = setTimeout(this.fetchPending.bind(this), 10000);
    } catch (e) {
      // We don't have to fail hard if this doesn't work
    }
  }

  async onWebsocketEvent(event) {
    let { history } = this.state;
    let { balance, blockCount } = this.props;
    let representative;

    event.block.hash = event.hash;
    event.block.timestamp = event.timestamp;
    switch (event.block.type) {
      case "receive":
        balance += parseFloat(event.block.amount, 10);

        // Need to fetch the source block to get the sender
        const sendBlock = await apiClient.block(event.block.source);
        event.block.account = sendBlock.block_account;
        break;
      case "send":
        event.block.account = event.block.destination;
        balance -= parseFloat(event.block.amount, 10);
        break;
      case "change":
        representative = event.block.representative;
        break;
      case "state":
        representative = event.block.representative;
        if (event.is_send === "true") {
          balance -= parseFloat(event.block.amount, 10);
          event.block.subtype = "send";
        } else {
          balance += parseFloat(event.block.amount, 10);
          if (parseInt(event.block.previous, 16) === 0) {
            event.block.subtype = "open";
          } else if (parseInt(event.block.link, 16) === 0) {
            event.block.subtype = "change";
          } else {
            event.block.subtype = "receive";
          }
        }

        break;
    }

    history.unshift(event.block);
    blockCount++;

    this.setState({ history });
    // this.props.onAccountUpdate({ balance, representative, block_count: blockCount })
  }

  loadMore() {
    this.fetchHistory();
  }

  hasMore() {
    return this.props.blockCount > this.state.history.length;
  }

  pendingTransactions() {
    return this.state.pendingTransactions.blocks.map(block => {
      block.account = block.source;
      return block;
    });
  }

  render() {
    const { history, pendingTransactions } = this.state;

    if (history.length === 0 && !pendingTransactions) {
      return <UnopenedAccount />;
    }

    return (
      <Fragment>
        {this.getPendingTransactions()}
        {this.getTransactions()}
        {this.getLoadMore()}
      </Fragment>
    );
  }

  getPendingTransactions() {
    const { pendingTransactions } = this.state;
    if (!pendingTransactions || pendingTransactions.total === 0) return;

    return (
      <Fragment>
        <div className="row mt-5 align-items-center">
          <div className="col">
            <h2 className="mb-0">
              <TranslatedMessage id="account.pending.title" />
            </h2>
            <p className="text-muted">
              <TranslatedMessage id="account.pending.limit" />
            </p>
          </div>
          <div className="col-auto">
            <h4>
              <FormattedNumber value={pendingTransactions.total} />{" "}
              <span className="text-muted">
                <TranslatedMessage id="account.pending.count" />
              </span>
            </h4>
          </div>
        </div>

        <TransactionHistory history={this.pendingTransactions()} />
      </Fragment>
    );
  }

  getTransactions() {
    const { history } = this.state;
    if (history.length === 0) return;

    return (
      <Fragment>
        <div className="row mt-5 align-items-center">
          <div className="col">
            <h2>
              <TranslatedMessage id="account.transactions.title" />
            </h2>
          </div>
          <div className="col-auto">
            <h4>
              <FormattedNumber value={this.props.blockCount} />{" "}
              <span className="text-muted">
                <TranslatedMessage id="account.transactions.total" />
              </span>
            </h4>
          </div>
        </div>

        <TransactionHistory history={history} />
      </Fragment>
    );
  }

  getLoadMore() {
    if (!this.hasMore()) return;
    return (
      <div className="text-center">
        <button
          className="btn btn-nano-primary"
          onClick={this.loadMore.bind(this)}
        >
          <TranslatedMessage id="account.transactions.load_more" />
        </button>
      </div>
    );
  }
}
