import React, { useRef, useContext } from "react";
import Router from 'next/router'
import { AuthContext } from '../context/AuthContext';
import { createArticle } from "../utils/article";
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { useAlert } from 'react-alert'
import Header from "../components/header";
import styles from '../styles/Post.module.scss';


const Post = () => {
  const { user } = useContext(AuthContext);
  const alert = useAlert();

  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const postArticle = async ():Promise<void> => {
    if (titleRef.current!.value === '' && textRef.current!.value === '') {
      alert.error('記事のタイトル、本文が未入力です')
      return
    } else if (textRef.current!.value === '') {
      alert.error('記事の本文が未入力です')
      return
    } else if (titleRef.current!.value === '') {
      alert.error('記事のタイトルが未入力です')
      return
    }

    if (user) {
      await createArticle(user.uid, user.name, titleRef.current!.value, textRef.current!.value,)
      alert.success('記事を投稿しました')
      Router.push('/')
    }
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.container__inner}>
          <InputGroup className="mb-5">
            <InputGroup.Text id="basic-addon1">タイトル</InputGroup.Text>
            <FormControl aria-label="Username" aria-describedby="basic-addon1" ref={titleRef}/>
          </InputGroup>
          <InputGroup className={styles.form}>
            <InputGroup.Text>本文</InputGroup.Text>
            <FormControl as="textarea" aria-label="With textarea" ref={textRef}/>
          </InputGroup>
          <Button variant="success" className={styles.btn} onClick={postArticle}>投稿する</Button>
        </div>
      </div>
    </>
  )
}

export default Post
