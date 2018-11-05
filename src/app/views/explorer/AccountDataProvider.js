import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import _ from "lodash";

import config from "client-config.json";
import { apiClient } from "lib/Client";

import AccountWebsocket from "lib/AccountWebsocket";

const PENDING_INTERVAL = 60 * 1000;

export default function withAccountData(WrappedComponent) {
  return class AccountDataProvider extends React.Component {
    static propTypes = {
      account: PropTypes.string.isRequired
    };

    state = {
      balance: 0,
      pending: 0,
      representative: null,
      weight: 0,
      blockCount: 0,
      version: "1",
      unopened: false,
      loading: true,

      history: [],
      nextPageHead: null,
      pendingTransactions: null
    };

    accountTimeout = null;
    pendingTimeout = null;
    websocket = null;

    accountIsValid() {
      const { account } = this.props;
      return /^(xrb|nano)_[A-Za-z0-9]{59,60}$/.test(account);
    }

    async componentDidMount() {
      await this.fetchAccount();
      this.fetchHistory();
      this.fetchPending();
      this.connectWebsocket();
    }

    componentWillUnmount() {
      if (this.accountTimeout) clearTimeout(this.accountTimeout);
      if (this.pendingTimeout) clearTimeout(this.pendingTimeout);
      if (this.websocket) this.disconnectWebsocket();
    }

    async fetchAccount() {
      const { account } = this.props;
      try {
        const data = await apiClient.account(account);
        this.setState(
          {
            balance: parseFloat(data.balance, 10),
            pending: parseFloat(data.pending, 10),
            representative: data.representative,
            weight: parseFloat(data.weight, 10),
            blockCount: parseFloat(data.block_count, 10),
            version: data.account_version,
            unopened: false
          },
          () => {
            this.accountTimeout = setTimeout(
              this.fetchAccount.bind(this),
              60000
            );
          }
        );
      } catch (e) {
        this.setState({ unopened: true, loading: false });
      }
    }

    async fetchHistory() {
      const { account } = this.props;
      const { history, nextPageHead } = this.state;

      try {
        let resp = await apiClient.history(account, nextPageHead);

        if (nextPageHead) {
          resp = resp.slice(1);
        }

        if (resp === "") return;
        const updatedHistory = history.concat(resp);

        this.setState({
          loading: false,
          history: updatedHistory,
          nextPageHead: _.last(updatedHistory).hash
        });
      } catch (e) {
        this.setState({ loading: false });
      }
    }

    async fetchPending() {
      const { account } = this.props;

      try {
        const pendingTransactions = await apiClient.pendingTransactions(
          account
        );

        pendingTransactions.blocks = pendingTransactions.blocks.map(block => {
          block.account = block.source;
          return block;
        });

        this.setState({ pendingTransactions });
        this.pendingTimeout = setTimeout(
          this.fetchPending.bind(this),
          PENDING_INTERVAL
        );
      } catch (e) {
        // We don't have to fail hard if this doesn't work
      }
    }

    async connectWebsocket() {
      this.websocket = new AccountWebsocket(config.websocketServer);

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

    disconnectWebsocket() {
      this.websocket.disconnect();
      this.websocket = null;
    }

    async onWebsocketEvent(event) {
      let {
        history,
        balance,
        blockCount,
        pendingTransactions,
        representative
      } = this.state;

      if (this.pendingTimeout) clearTimeout(this.pendingTimeout);

      const removeBlockFromPending = () => {
        // Remove the transaction from pending transactions
        const pendingIndex = pendingTransactions.blocks.findIndex(
          block => block.hash === event.block.link
        );

        if (pendingIndex >= 0) {
          pendingTransactions.blocks.splice(pendingIndex, 1);
          pendingTransactions.total -= 1;
        }
      };

      event.block.hash = event.hash;
      event.block.timestamp = event.timestamp;
      switch (event.block.type) {
        case "receive":
          balance += parseFloat(event.block.amount, 10);

          // Need to fetch the source block to get the sender
          const sendBlock = await apiClient.block(event.block.source);
          event.block.account = sendBlock.block_account;

          removeBlockFromPending();

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
              removeBlockFromPending();
            } else if (parseInt(event.block.link, 16) === 0) {
              event.block.subtype = "change";
            } else {
              event.block.subtype = "receive";
              removeBlockFromPending();
            }
          }

          break;
      }

      this.setState(
        {
          history: [event.block].concat(history),
          blockCount: blockCount + 1,
          unopened: false,
          representative,
          pendingTransactions,
          balance
        },
        () => {
          this.pendingTimeout = setTimeout(
            this.fetchPending.bind(this),
            PENDING_INTERVAL
          );
        }
      );
    }

    render() {
      if (!this.accountIsValid()) {
        return this.redirect();
      }

      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          loadMore={this.fetchHistory.bind(this)}
          hasMore={this.state.blockCount > this.state.history.length}
        />
      );
    }

    redirect() {
      return <Redirect to="/explorer" />;
    }
  };
}