const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
    messagesDirectory: 'src/translations/extracted/',
    translationsDirectory: 'src/translations/locales/',
    languages: ['fr'], // any language you need
});