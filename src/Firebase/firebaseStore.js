import {
  collection, addDoc, getFirestore, updateDoc, deleteDoc, doc, getDocs,
} from 'firebase/firestore';
import { app } from './firebase';

const db = getFirestore(app);

export const createPost = (text, uid, username) => {
  console.log(uid);
  return addDoc(collection(db, 'posts'), {
    username,
    text,
    uid,
  });
};

export const editPost = async (postId, newText) => {
  await updateDoc(doc(db, 'posts', postId), {
    text: newText,
  });
};

export const deletePost = async (postId) => {
  await deleteDoc(doc(db, 'posts', postId));
};

export const fetchPosts = async () => {
  const postsCollection = collection(db, 'posts');
  const snapshot = await getDocs(postsCollection);
  const posts = [];

  snapshot.forEach((firePost) => {
    const post = firePost.data();

    post.id = firePost.id;
    posts.push(post);
  });
  return posts;
};
