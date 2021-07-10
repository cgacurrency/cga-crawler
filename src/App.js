import React from "react";
import { IntlProvider } from "react-intl";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "primer-tooltips/build/build.css";

import config from "client-config.json";
import { withTranslations } from "./lib/TranslationContext";
import Navigation from "./app/Navigation";

import Content from "./app/Content";

import AccountLink from "./app/partials/AccountLink";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fad } from "@fortawesome/pro-duotone-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fad, fas, fab);

function App({ locale }) {
  return (
    <IntlProvider locale={locale.language} messages={locale.messages}>
      <div id="App" className="container-fluid p-0 h-100">
        <div className="row Header align-items-center mr-0">
          <div className="col">
            <Navigation />
          </div>
        </div>

        <Content />

        <hr />

        <div className="row mr-0 align-items-center">
          <div className="col-md">
            <div className="py-2 px-4">
              <p className="mb-0">Powered by Crypto Game Alliance</p>
            </div>
          </div>
          <div className="col-auto text-md-right">
            <div className="py-2 px-4">
              <a
                href="https://www.cgaio.com"
                target="_blank"
                className="btn btn-sm btn-nano-primary mb-1"
              >
                CGAIO.COM
              </a>
            </div>
          </div>
        </div>

        <div className="row mr-0 align-items-center">
          <div className="col-md">
            <div className="py-2 px-4">
              <ul id="cgasocial">
                <li>
                  <a href="https://twitter.com/cga_coin" target="_blank">
                    <FontAwesomeIcon
                      icon={["fab", "twitter"]}
                      // color={"#4c6ef5"}
                    />{" "}
                  </a>
                </li>
                <li>
                  <a href="https://discord.com/invite/PNuD9qnM2J" target="_blank">
                    <FontAwesomeIcon
                      icon={["fab", "discord"]}
                    />{" "}
                  </a>
                </li>
                <li>
                  <a href="https://t.me/cgacurrency" target="_blank">
                    <FontAwesomeIcon
                      icon={["fab", "telegram-plane"]}
                    />{" "}
                  </a>
                </li>
                <li>
                  <a href="https://www.reddit.com/r/cgacurrency/" target="_blank">
                    <FontAwesomeIcon
                      icon={["fab", "reddit-alien"]}
                    />{" "}
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/cgacoin.net" target="_blank">
                    <FontAwesomeIcon
                      icon={["fab", "facebook-f"]}
                    />{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </IntlProvider>
  );
}

export default withTranslations(App);
