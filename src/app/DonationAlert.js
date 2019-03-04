import React from "react";
import Cookies from "js-cookie";
import AccountLink from "./partials/AccountLink";
import config from "../client-config.json";

export default class DonationAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: Cookies.get("xpdnode.donation_alert_dismissed") !== "1"
    };
  }

  onDismiss() {
    this.setState({ open: false }, () => {
      Cookies.set("xpdnode.donation_alert_dismissed", "1", { expires: 7 });
    });
  }

  render() {
    if (!this.state.open) return null;

    return (
      <div
        className="row mt-5 mx-auto justify-content-center"
        style={{ maxWidth: "1680px" }}
      >
        <div className="col">
          <div
            className="alert alert-secondary alert-dismissible fade show d-none d-md-block"
            role="alert"
          >
            Welcome to official block explorer! XPEED EXPLORER  is a free-to-use service that has a strict no-ads
            policy.
          </div>
        </div>
      </div>
    );
  }
}
