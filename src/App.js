import React from "react";
import { IntlProvider } from "react-intl";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "primer-tooltips/build/build.css";

import config from "client-config.json";
import { withTranslations } from "./lib/TranslationContext";
import Navigation from "./app/Navigation";
import DonationAlert from "./app/DonationAlert";
import Content from "./app/Content";

import AccountLink from "./app/partials/AccountLink";

function App({ locale }) {
  return (
    <IntlProvider locale={locale.language} messages={locale.messages}>
      <div id="App" className="container-fluid p-0 h-100">
        <div className="row Header align-items-center mr-0">
          <div className="col">
            <Navigation />
          </div>
        </div>

        <DonationAlert />

        <Content />

        <hr />

        <div className="row mr-0 align-items-center">
          <div className="col-md">
            <div className="py-2 px-4">
              <p className="mb-0">Powered by XPEEDCOIN</p>
            </div>
          </div>
          <div className="col-auto text-md-right">
            <div className="py-2 px-4">
              <a
                href="https://xpeedcoin.com"
                target="_blank"
                className="btn btn-sm btn-nano-primary mb-1"
              >
                XPEEDCOIN.COM
              </a>
            </div>
          </div>
        </div>
      </div>
    </IntlProvider>
  );
}

export default withTranslations(App);
