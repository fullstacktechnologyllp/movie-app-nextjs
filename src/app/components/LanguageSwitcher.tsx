// src/components/LanguageSwitcher.tsx
import React from 'react';
import { useTranslation } from 'next-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('de')}>German</button>
    </div>
  );
};

export default LanguageSwitcher;
