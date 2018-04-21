import React from "react";
import moment from "moment";
import accounting from "accounting";
import NanoNodeNinja from "../../../../lib/NanoNodeNinja";

export default class NodeNinjaAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };

    this.timeout = null;
  }

  componentDidMount() {
    this.fetchNinja();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.account !== this.props.account) {
      this.fetchNinja();
    }
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  async fetchNinja() {
    const { account } = this.props;
    const ninja = new NanoNodeNinja(account);
    await ninja.fetch();

    this.setState({ data: ninja.data });

    this.timeout = setTimeout(this.fetchNinja.bind(this), 60000);
  }

  render() {
    const { account } = this.props;
    const { data } = this.state;

    if (!data || !data.monitor) return null;

    return (
      <div className="row mt-5">
        <div className="col-sm text-sm-right">
          <h2 className="mb-0">{data.alias}</h2>
          <p className="text-muted">
            Verified by{" "}
            <a
              href={`https://nanonode.ninja/account/${account}`}
              className="text-muted"
              target="_blank"
            >
              Nano Node Ninja
            </a>
          </p>

          <a
            href={data.monitor.url}
            className="btn btn-nano-primary"
            target="_blank"
          >
            Open Node Monitor
          </a>
        </div>
        <div className="col-sm mt-3 mt-sm-0">
          <h3>
            Sync status{" "}
            <small className="text-muted">
              {accounting.formatNumber(data.monitor.sync, 2)}%
            </small>
          </h3>
          <h3>
            Block count{" "}
            <small className="text-muted">
              {accounting.formatNumber(data.monitor.blocks)}
            </small>
          </h3>
          <h3>
            Uptime{" "}
            <small className="text-muted">
              {accounting.formatNumber(data.uptime, 2)}%
            </small>
          </h3>
          <h3>
            Last voted{" "}
            <small className="text-muted">
              {moment(data.lastVoted).fromNow()}
            </small>
          </h3>
          <h3>
            Node version{" "}
            <small className="text-muted">{data.monitor.version}</small>
          </h3>
        </div>
      </div>
    );
  }
}
