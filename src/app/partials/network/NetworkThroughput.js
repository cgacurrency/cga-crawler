import React, { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import TpsCounter from "./TpsCounter";

export default function NetworkThroughput() {
  return (
    <Fragment>
      <h2 className="mb-0">
        <FormattedMessage id="network.tps.title" />
      </h2>
      <p className="text-muted">
        <FormattedMessage id="network.tps.desc" />
      </p>

      <div className="row">
        <div className="col-lg mb-3">
          <TpsCounter period="1m" title="1 minute" />
        </div>
        <div className="col-lg mb-3">
          <TpsCounter period="5m" title="5 minutes" />
        </div>
      </div>

      <div className="row">
        <div className="col-lg mb-3">
          <TpsCounter period="30m" title="30 minutes" />
        </div>

        <div className="col-lg mb-3">
          <TpsCounter period="1hr" title="1 hour" />
        </div>
      </div>

      <div className="row">
        <div className="col-lg mb-3">
          <TpsCounter period="1d" title="1 day" />
        </div>
        <div className="col-lg mb-3">
          <TpsCounter period="1w" title="1 week" />
        </div>
      </div>
    </Fragment>
  );
}
