import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Dropdown } from 'react-bootstrap';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { i18n } = useTranslation();
  const [ selectedLanguage, setSelectedLanguage ] = useState<string>('');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('selectedLanguage', lng); // Save selected language to localStorage
    setSelectedLanguage(lng); // Update selected language state
  };

  useEffect(() => {
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
      changeLanguage(selectedLanguage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }
  }, []);

  return (
    <Dropdown className={ className }>
      <Dropdown.Toggle variant="secondary" id="languageDropdown" className='custom-input-bg'>
        { selectedLanguage === 'en' ? 'English' : selectedLanguage === 'de' ? 'Deutsch' : 'Select Language' }
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={ () => changeLanguage('en') }>English</Dropdown.Item>
        <Dropdown.Item onClick={ () => changeLanguage('de') }>{ selectedLanguage === 'de' ? 'Deutsch' : 'German' }</Dropdown.Item>
        {/* Add more Dropdown.Item elements for other languages if needed */ }
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
