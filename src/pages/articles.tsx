import React from "react";
import dayjs from 'dayjs';
import Link from "next/link"
import Header from "../components/header";
import styles from '../styles/Articles.module.scss'
import { Card } from 'react-bootstrap';
import { readArticles } from "../utils/article";
import { GetStaticProps } from 'next'
import { Article } from "../@types/global";


export const getStaticProps: GetStaticProps = async () => {
  const articles = await readArticles();
  const newArticles = articles.map(article => {
    const date = dayjs(article.created_at.toDate());
    const after = {
      id: article.id,
      text: article.text,
      title: article.title,
      uid: article.uid,
      author: article.author,
      date:date.format('YYYY/MM/DD')
    }
    return after
  })

  return {
    props: {
      articles: newArticles
    }
  }
};

const Articles = ({ articles }:any) => {

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>すべての記事</h1>
        {articles.map((article:Article, i:number) => {

          return (
            <Link href={`/articles/${article.id}`} key={i}>
              <a className={styles.link}>
                <Card className={styles.card}>
                  <Card.Header>{article.title}</Card.Header>
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>
                        {' '}{article.text}{' '}
                      </p>
                      <footer className="blockquote-footer mt-0 mb-0">{article.author}</footer>
                      <time>{article.date}</time>
                    </blockquote>
                  </Card.Body>
                </Card>
              </a>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default Articles