import React, { Fragment } from "react";
import { TranslatedMessage } from "lib/TranslatedMessage";
import sampleSize from "lodash/sampleSize";

import AccountLink from "../AccountLink";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class RandomVerifiedAccounts extends React.Component {
  state = { accounts: [] };

  async componentDidMount() {
    const data = await fetch("/verified.json", {
      mode: "cors"
    });
    const accounts = await data.json();

    this.setState({ accounts: sampleSize(accounts, this.props.count) });
  }

  render() {
    return (
      <Fragment>
        <h3 className="mb-0">
          <FontAwesomeIcon
            icon={['fad', 'file-certificate']}
            color={'#5abf1f'}
          />{" "}
          <TranslatedMessage id="ninja.verified_accounts" />
        </h3>
        <p className="text-muted">
          <TranslatedMessage
            id="ninja.verified_accounts.desc"
            values={{
              link: "CGA EXPLORER"
            }}
          />
        </p>

        <hr />

        {this.state.accounts.map(account => (
          <VerifiedAccount key={account.account} account={account} />
        ))}
      </Fragment>
    );
  }
}

const VerifiedAccount = ({ account }) => {
  return (
    <div className="row">
      <div className="col">
        <h5 className="mb-0">
          <AccountLink
            account={account.account}
            name={account.alias}
            className="text-dark break-word"
          />
        </h5>
        <p>
          <AccountLink
            account={account.account}
            className="text-muted break-word"
          />
        </p>
      </div>
    </div>
  );
};
