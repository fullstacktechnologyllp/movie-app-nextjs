
"use client"
import styles from './page.module.css'
import { useState } from 'react';
import Signin from './signin/page';
import Movies from './movies/page';

export default function Home() {
  const [ isLoggedIn, setLoggedIn ] = useState(true);

  return (isLoggedIn ? <><Signin /></> : <><Movies /></>)
}
