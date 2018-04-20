import React from "react";
import { Route } from "react-router-dom";

import "./Content.css";

import NodeStatus from "./views/NodeStatus";
import NetworkStatus from "./views/NetworkStatus";
import Delegators from "./views/Delegators";

import Explorer from "./views/Explorer";
import ExplorerAccount from "./views/explorer/Account";

export default ({ account }) => {
  return (
    <div id="Content">
      <Route
        exact
        path="/"
        render={props => <NodeStatus {...props} account={account} />}
      />
      <Route
        exact
        path="/network"
        render={props => <NetworkStatus {...props} account={account} />}
      />
      <Route exact path="/explorer" render={props => <Explorer {...props} />} />
      <Route path="/explorer/account/:account" component={ExplorerAccount} />
      <Route
        exact
        path="/delegators"
        render={props => <Delegators {...props} account={account} />}
      />
    </div>
  );
};
