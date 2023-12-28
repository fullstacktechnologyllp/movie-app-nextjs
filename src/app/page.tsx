
"use client"
import './page.module.css'
import { useEffect, useState } from 'react';
import Signin from './signin/page';
import Movies from './movies/page';
import { appWithTranslation } from 'next-i18next'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    <ToastContainer position="bottom-left"
      autoClose={ 3000 }
      hideProgressBar={ true }
      rtl={ false }
      pauseOnFocusLoss={ false }
      theme="dark"
    />
    { !isLoggedIn ? <><Signin /></> : <><Movies /></> }
  </>)
}

export default appWithTranslation(Home);
