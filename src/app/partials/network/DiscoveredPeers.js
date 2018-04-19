import React, { Fragment } from "react";
import accounting from "accounting";
import AccountLink from "../AccountLink";

const STATUSES = {
  ok: 1000,
  warning: 10000
};

export default class DiscoveredPeers extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      repsOnly: false
    };
  }

  filteredPeers() {
    const { peers } = this.props;
    const { repsOnly } = this.state;

    if (!repsOnly) return peers;

    return peers.filter(peer => {
      if (repsOnly) {
        return peer.data.votingWeight && peer.data.votingWeight >= 256;
      }

      return true;
    });
  }

  sortedPeers() {
    return this.filteredPeers().sort((a, b) => {
      if (!a.data.nanoNodeName) return 1;
      if (!b.data.nanoNodeName) return -1;
      if (a.data.nanoNodeName < b.data.nanoNodeName) return -1;
      if (a.data.nanoNodeName > b.data.nanoNodeName) return 1;
      return 0;
    });
  }

  render() {
    const { peers, stats } = this.props;
    const sortedPeers = this.sortedPeers();

    return (
      <Fragment>
        <div className="row">
          <div className="col">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={this.state.repsOnly}
                id="PeerListRepsOnly"
                onChange={e => this.setState({ repsOnly: e.target.checked })}
              />
              <label className="form-check-label" htmlFor="PeerListRepsOnly">
                Representatives only
              </label>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Checked Blocks</th>
                <th>Unchecked Blocks</th>
                <th>Voting Weight</th>
                <th>Peers</th>
                <th>Version</th>
                <th>Account</th>
              </tr>
            </thead>
            <tbody>
              {sortedPeers.map(peer => (
                <PeerEntry
                  key={peer.peer}
                  peer={peer}
                  currentBlock={stats.currentBlocks.max}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

const PeerEntry = ({ peer, currentBlock }) => {
  const { url, data } = peer;
  const rootUrl = url.replace("api.php", "");

  const peerBlock = parseInt(data.currentBlock, 10);
  const peerLag = currentBlock - peerBlock;

  let statusClass;
  if (peerLag < STATUSES.ok) {
    statusClass = "text-success";
  } else if (peerLag < STATUSES.warning) {
    statusClass = "text-warning";
  } else {
    statusClass = "text-danger";
  }

  return (
    <tr className={statusClass}>
      <td>
        <a href={rootUrl} className={statusClass} target="_blank">
          <OptionalField value={data.nanoNodeName} />
        </a>
      </td>
      <td>{accounting.formatNumber(data.currentBlock)}</td>
      <td>{accounting.formatNumber(data.uncheckedBlocks)}</td>
      <td>
        <OptionalField value={data.votingWeight}>
          {value => (
            <Fragment>
              {accounting.formatNumber(parseFloat(data.votingWeight, 10))} NANO
            </Fragment>
          )}
        </OptionalField>
      </td>
      <td>
        <OptionalField value={data.numPeers}>
          {value => accounting.formatNumber(value)}
        </OptionalField>
      </td>
      <td>
        <OptionalField value={data.version} />
      </td>
      <td>
        <AccountLink account={data.nanoNodeAccount} short />
      </td>
    </tr>
  );
};

const OptionalField = ({ value, children }) => {
  if (!value) return <i className="text-muted">Unknown</i>;
  if (!children) return <Fragment>{value}</Fragment>;
  return children(value);
};
