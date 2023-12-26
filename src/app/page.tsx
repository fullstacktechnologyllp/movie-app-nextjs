
"use client"
import styles from './page.module.css'
import { useState } from 'react';
import Signin from './signin/page';
import Dashboard from './dashboard/page';

export default function Home() {
  const [ isLoggedIn, setLoggedIn ] = useState(true);

  return (isLoggedIn ? <><Signin /></> : <><Dashboard /></>)
}
