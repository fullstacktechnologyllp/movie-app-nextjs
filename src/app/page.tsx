
"use client"
import styles from './page.module.css'
import { useState } from 'react';
import Signin from './signin/page';
import Movies from './movies/page';
import { appWithTranslation } from 'next-i18next'
import '../i18n';

function Home() {
  const [ isLoggedIn, setLoggedIn ] = useState(true);

  return (isLoggedIn ? <><Signin /></> : <><Movies /></>)
}

export default appWithTranslation(Home);
