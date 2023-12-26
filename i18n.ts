// i18n.ts
import { i18n } from 'next-i18next';

const NextI18NextInstance = new i18n({
  defaultLanguage: 'en',
  otherLanguages: ['de'],
  localeSubpaths: {
    de: 'de',
  },
});

export default NextI18NextInstance;
