import React, { Fragment } from "react";
import { FormattedNumber } from "react-intl";
import { TranslatedMessage } from "lib/TranslatedMessage";

import HistoryEntry from "./HistoryEntry";
import AccountLink from "../../../AccountLink";
import BlockLink from "../../../BlockLink";
import OptionalField from "../../../OptionalField";
import { formatTimestamp } from "lib/util";
import config from "client-config.json";

export default function HistorySendBlock({ block }) {
  return (
    <HistoryEntry
      type={
        <span className="text-danger text-capitalize">
          <TranslatedMessage id="block.subtype.send" />
        </span>
      }
      account={
        <Fragment>
          <span className="text-muted">
            <TranslatedMessage id="block.to" />
          </span>{" "}
          <AccountLink
            account={block.account}
            className="text-dark break-word"
            ninja
          />
        </Fragment>
      }
      amount={
        <span className="text-danger">
          -<FormattedNumber
            value={block.amount}
            minimumFractionDigits={6}
            maximumFractionDigits={2}
          />{" "}
          {config.currency}
        </span>
      }
      date={<OptionalField value={formatTimestamp(block.timestamp)} />}
      block={
        <div className="text-truncate">
          <small>
            <BlockLink hash={block.hash} className="text-muted" />
          </small>
        </div>
      }
    />
  );
}
