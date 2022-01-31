import React, { useRef } from "react";
import Router from 'next/router'
import { createAccount } from "../utils/auth";
import { Button, Form } from 'react-bootstrap';
import styles from '../styles/Login.module.scss'
import { useAlert } from 'react-alert'

const account = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const alert = useAlert();

  const onClickCreateAccount = async ():Promise<void> => {
    if (nameRef.current!.value === '' || emailRef.current!.value === '' || passwordRef.current!.value === '') {
      alert.error('未入力の項目があります。')
      return
    }

    createAccount(nameRef.current!.value, emailRef.current!.value, passwordRef.current!.value)
    .then(() => {
      alert.success('アカウントが作成できました!')
      Router.push('/')
    })
    .catch((error) => {
      alert.error('アカウントの作成に失敗しました。再度やり直してください。')
      console.log((error))
    })
  }


  return (
    <div className={styles.container}>
      <h1>Create your account</h1>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Username</Form.Label>
          <Form.Control type="name" placeholder="name" ref={nameRef}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
        </Form.Group>
        <Button variant="success" className={styles.login} onClick={onClickCreateAccount}>Sign Up</Button>
      </Form>
    </div>
  )
}

export default account
