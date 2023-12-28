
"use client"
import './page.module.css'
import { useEffect, useState } from 'react';
import Signin from './signin/page';
import Movies from './movies/page';
import { appWithTranslation } from 'next-i18next'
import '../i18n';

function Home() {
  const [ isLoggedIn, setLoggedIn ] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== '') {
      setLoggedIn(true);
      window.location.href = '/movies'
    }
  }, []);

  return (<>
 { !isLoggedIn ? <><Signin /></> : <><Movies /></> }

  </>)
}

export default appWithTranslation(Home);
