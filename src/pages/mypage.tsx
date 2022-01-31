import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from '../context/AuthContext';
import { readMyArticles } from "../utils/article";
import { Card } from 'react-bootstrap';
import Header from "../components/header";
import styles from '../styles/Mypage.module.scss'
import { ArticleData } from "../@types/global";

const Mypage = () => {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState<ArticleData[]>([]);

  useEffect(() => {
    fetchArticles();
  }, [user]);

  //投稿記事取得
  const fetchArticles = async ():Promise<void> => {
    setArticles([]);

    if (user) {
      const _articles = await readMyArticles(user.uid);
      setArticles(_articles);
    }
};

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>Your Profile</h1>
        {user &&
          <>
            <p className={styles.info}>{user.name}</p>
            <p className={styles.info}>{user.email}</p>
          </>
        }
        <h2>投稿した記事</h2>
        <hr></hr>
        {articles.map((article, i) => (
          <Card className={styles.card} key={i}>
            <Card.Header>{article.title}</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>
                  {' '}{article.text}{' '}
                </p>
                <footer className="blockquote-footer">{article.author}</footer>
              </blockquote>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Mypage
