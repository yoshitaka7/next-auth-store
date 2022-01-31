import type { NextPage } from 'next'
import React, { useContext } from "react";
import Link from 'next/link'
import { AuthContext } from '../context/AuthContext';
import { signOut } from '../utils/auth';
import Header from '../components/header';
import styles from '../styles/Home.module.scss'
import Button from 'react-bootstrap/Button';

const Home: NextPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
    {(user !== undefined ) ? (
      <>
        <Header />
        <main className={styles.container}>
          <h1>Welcome Back</h1>
          <p className={styles.name}>{user.name}</p>
          <div className={styles.buttons}>
            <Link href="/articles">
              <Button variant="primary">一覧ページ</Button>
            </Link>
          </div>
        </main>
      </>

    ) : (
      <main className={styles.container}>
        <h1>Welcome!!<br/>Let's create Account or Sign In</h1>
        <div className={styles.buttons}>
          <Link href="/account">
            <Button variant="success">アカウント作成</Button>
          </Link>
          <Link href="/login">
            <Button variant="primary">ログイン</Button>
          </Link>
        </div>
      </main>
    )}
    </>
  )
}

export default Home
