import React from "react";
import assign from "lodash/assign";
import { addLocaleData } from "react-intl";
import moment from "moment";
import Cookies from "js-cookie";

import { translationMapping } from "../translations";
import en from "../translations/en.json"; // English

const TranslationContext = React.createContext({
  language: "en",
  messages: {},
  setLanguage: () => {}
});

class TranslationProvider extends React.Component {
  state = {
    language: "en",
    messages: en
  };

  componentDidMount() {
    const language =
      Cookies.get("cganode.locale") ||
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      navigator.userLanguage;

    this.setLanguage(language);
  }

  async setLanguage(language) {
    const langConfig = translationMapping[language] || {
      messages: language.split("-")[0],
      intlLocale: language.split("-")[0],
      momentLocale: language.split("-")[0].toLowerCase()
      // messages: language,
      // intlLocale: language.split("-")[0],
      // momentLocale: language.toLowerCase()
    };

    const messages = await import(`../translations/${
      langConfig.messages
    }.json`);

    const locale = await import(`react-intl/locale-data/${
      langConfig.intlLocale
    }`);

    if (!/^en/.test(langConfig.momentLocale)) {
      await import(`moment/locale/${langConfig.momentLocale}`);
    }

    addLocaleData([...locale]);
    moment.locale(langConfig.momentLocale);

    this.setState({ language, messages }, () => {
      Cookies.set("cganode.locale", language);
    });
  }

  render() {
    const data = assign({}, this.state, {
      setLanguage: this.setLanguage.bind(this)
    });

    return (
      <TranslationContext.Provider value={data}>
        {this.props.children}
      </TranslationContext.Provider>
    );
  }
}

const withTranslations = WrappedComponent => {
  return function TranslationConsumer(props) {
    return (
      <TranslationContext.Consumer>
        {locale => <WrappedComponent locale={locale} {...props} />}
      </TranslationContext.Consumer>
    );
  };
};

export { withTranslations, TranslationProvider };
