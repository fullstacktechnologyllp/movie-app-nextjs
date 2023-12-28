import React from 'react';
import { useTranslation } from 'next-i18next';
import { Dropdown } from 'react-bootstrap';

interface LanguageSwitcherProps {
  className?: string; // Define className as an optional prop
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Dropdown className={className}>
      <Dropdown.Toggle variant="secondary" id="languageDropdown">
        Select Language
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeLanguage('en')}>English</Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage('de')}>German</Dropdown.Item>
        {/* Add more Dropdown.Item elements for other languages if needed */}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
