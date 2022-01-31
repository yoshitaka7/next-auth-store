import { db, FirebaseTimestamp } from '../firebase'
import { ArticleData } from '../@types/global';

//記事作成
export const createArticle = async (uid:string, author:string, title:string, text:string):Promise<void> => {
  const timestamp = FirebaseTimestamp.now()  //作成時のtimestampを定数に
  const articleData = {  //投稿データ
    author: author,
    title: title,
    text: text,
    created_at: timestamp,
    uid: uid
  }
  db.collection('posts').doc().set(articleData);
};

// update a todo
export const updateArticle = (article_id:string, title:string, text:string):Promise<void> => {
  const timestamp = FirebaseTimestamp.now()  //作成時のtimestampを定数に
  return db.collection('posts').doc(article_id).update({
    title: title,
    text: text,
    created_at: timestamp
  })
};

//記事削除
export const deleteArticle = (id: string) => {
  db.collection('posts').doc(id).delete();
}

//全記事習得
export const readArticles = async (): Promise<ArticleData[]> => {
  const postRef = db.collection('posts').orderBy('created_at', 'desc')
  const snapshot = await postRef.get()
  const data: Array<any> = [];

  snapshot.docs.map((_data) => {
      data.push({
          id: _data.id,
          ..._data.data(),
      });
  });

  return data as ArticleData[];
};

//投稿記事取得
export const readMyArticles = async (uid: string): Promise<ArticleData[]> => {
  const snapshot = await db.collection('posts').where('uid', '==', uid).get();  //投稿記事のみを取得
  const data: Array<any> = [];

  snapshot.docs.map((_data) => {
    data.push({
      id: _data.id,
      ..._data.data(),
    });
  });

  return data as ArticleData[];
}

//単一記事取得
export const readArticle = async (id: string): Promise<ArticleData> => {
  const docRef = await db.collection('posts').doc(id).get()
  const data = docRef.data();
  return data as ArticleData;
}