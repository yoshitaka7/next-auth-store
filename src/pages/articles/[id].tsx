import React, { useState, useContext, useRef } from "react";
import Router from 'next/router'
import dayjs from 'dayjs';
import Header from "../../components/header";
import styles from '../../styles/Article.module.scss';
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'node:querystring'
import { AuthContext } from '../../context/AuthContext';
import { readArticles, readArticle, deleteArticle, updateArticle } from "../../utils/article";
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { useAlert } from 'react-alert'
import { Item } from "../../@types/global";

interface Params extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const articles  = await readArticles();
  const paths = articles.map((article) => `/articles/${article.id}`)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const article = await readArticle(params.id)
  const date = dayjs(article.created_at.toDate());
  const formatDate = date.format('YYYY/MM/DD')

  return {
    props: {
      author: article.author,
      title: article.title,
      text: article.text,
      uid: article.uid,
      date: formatDate,
      article_id: params.id
    }
  }
};

const Article = ({ author, title, text, uid, date, article_id } : Item) => {
  const { user } = useContext(AuthContext);

  const [edit, setEdit] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const alert = useAlert();

  const renewArticle = async ():Promise<void> => {
    if (titleRef.current!.value === '' || textRef.current!.value === '') {
      alert.error('未入力の項目があると更新できません。')
      return
    }

    updateArticle(article_id, titleRef.current!.value, textRef.current!.value)
    .then(() => {
      alert.success('記事内容を更新しました')
      Router.push('/')
    })
    .catch((error) => {
      alert.error('記事の更新に失敗しました。時間をおいて再度お試しください。')
      console.log(error)
    })
  }

  const removeArticle = (id: string):void => {
    deleteArticle(id);
    alert.success('記事を削除しました')
    Router.push('/')
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        {edit === false ? (
          <>
            <time>{date}</time>
            <h2>{title}</h2>
            <hr/>
            <p className={styles.text}>{text}</p>
            <p className={styles.author}>{author}</p>
            {user && (user.uid === uid) &&
              <div className={styles.buttons}>
                <Button variant="secondary" onClick={() => setEdit(true)}>編集</Button>
                <Button variant="danger" onClick={() => removeArticle(article_id)}>削除</Button>
              </div>
            }
          </>
        ) : (
          <div className={styles.container__inner}>
            <InputGroup className="mb-5">
              <InputGroup.Text id="basic-addon1">タイトル</InputGroup.Text>
              <FormControl aria-label="Title" aria-describedby="basic-addon1" defaultValue={title} ref={titleRef}/>
            </InputGroup>
            <InputGroup className={styles.form}>
              <InputGroup.Text>本文</InputGroup.Text>
              <FormControl as="textarea" aria-label="With textarea" defaultValue={text} ref={textRef}/>
            </InputGroup>
            <Button variant="success" className={styles.btn} onClick={renewArticle}>更新する</Button>
            <Button variant="danger" className={styles.btn} onClick={() => setEdit(false)}>キャンセル</Button>
          </div>
        )}
      </div>
    </>
  )
}

export default Article