import firebase from 'firebase/app';
import 'firebase/database';

const config = { /** FIREBASE CONFIG */ }

firebase.initializeApp(config);

export const sendMessage = (author, content, callback) => {

  if (typeof author !== 'string' || typeof content !== 'string') return;
  if (!author.trim() || !content.trim()) return;

  const message = {
      author: author,
      content: content,
      createdAt: String(new Date())
  };

  firebase.database().ref().child('messages')
      .push(message);

  callback && callback();

}

export const emitMessages = setState => {
  const ref = firebase.database().ref('messages/');
  ref.on("value", snapshot => {
      if (snapshot.exists()) {
          const msgs = Object.values(snapshot.val()).sort((a, b) => {
              const da = Number(new Date(a.createdAt));
              const db = Number(new Date(b.createdAt));
              return da > db ? -1 : 1;
          });
          setState(msgs);
      }
  });
}