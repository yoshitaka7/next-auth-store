import React, { useRef } from "react";
import Router from 'next/router'
import { signIn } from "../utils/auth";
import { Button, Form } from 'react-bootstrap';
import styles from '../styles/Login.module.scss'
import { useAlert } from 'react-alert'

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const alert = useAlert();

  const onClickSignIn = async ():Promise<void> => {
    if (emailRef.current!.value === '' || passwordRef.current!.value === '') {
      alert.error('未入力の項目があります')
      return
    }

    signIn(emailRef.current!.value, passwordRef.current!.value)
    .then(() => {
      Router.push('/')
    })
    .catch((error) => {
      alert.error('ログインに失敗しました。メールアドレス、パスワードに間違いがないか確かめ、再度お試しください。')
      console.log(error)
    })
  }

  return (
    <div className={styles.container}>
      <h1>Sign in</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
        </Form.Group>
        <Button variant="success" className={styles.login} onClick={onClickSignIn}>Sign in</Button>
      </Form>
    </div>
  )
}

export default Login
