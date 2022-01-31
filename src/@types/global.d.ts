export type User = {
  name: string
  email: string
  uid: string
}

export type Item = {
  author: string
  title: string
  text: string
  uid: string
  date: string
  article_id: string
}

export type Article = {
  id: string
  author: string;
  title: string;
  text: string;
  uid: string
  date: string
}

export type ArticleData = {
  id: string
  author: string;
  title: string;
  text: string;
  created_at: string;
  uid: string
}