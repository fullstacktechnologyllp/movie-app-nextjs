
"use client"
import './page.module.css'
import { useEffect, useState } from 'react';
import Signin from './signin/page';
import Movies from './movies/page';
import '../i18n';

export default function Home() {
  const [ isLoggedIn, setLoggedIn ] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const selectedLanguage = localStorage.getItem('selectedLanguage');

    if (token !== '' || token !== null) {
      setLoggedIn(true);
      window.location.href = '/movies'
    }
    if (!selectedLanguage) {
      localStorage.setItem('selectedLanguage', 'en');
    }
  }, []);

  return (<>

    { !isLoggedIn ? <><Signin /></> : <><Movies /></> }
  </>)
}
