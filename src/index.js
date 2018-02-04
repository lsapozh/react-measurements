import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from "firebase"
import "firebase/firestore" // eslint-disable-line

const config = {
  apiKey: "AIzaSyBAZFlifDgaU7XLiKXuFzXDPmlsh7buff8",
  authDomain: "liliia-93817.firebaseapp.com",
  databaseURL: "https://liliia-93817.firebaseio.com",
  projectId: "liliia-93817",
  storageBucket: "liliia-93817.appspot.com",
  messagingSenderId: "807624150554"
};

firebase.initializeApp(config);

const db = firebase.firestore();
window.db = db
ReactDOM.render(<App db={db} />, document.getElementById('root'));
registerServiceWorker();

