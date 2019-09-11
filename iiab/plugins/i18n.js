export default function({ app }) {
  // onLanguageSwitched called right after a new locale has been set
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    const rtl = app.i18n.locales.find(i => i.code === newLocale).rtl;
    app.vuetify.framework.rtl = rtl;
  };
}
