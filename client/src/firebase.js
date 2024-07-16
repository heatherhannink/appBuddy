import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyASCVMj6uyFneJQQfVN70Q0bxfBzWkZnbE',
  authDomain: 'buddycheck-65bbc.firebaseapp.com',
  projectId: 'buddycheck-65bbc',
  storageBucket: 'buddycheck-65bbc.appspot.com',
  messagingSenderId: '214425591502',
  appId: 'Y1:214425591502:web:9b245239efe98703113a9f',
  measurementId: "G-T5CE6170DG"
};

firebase.initializeApp(firebaseConfig);

export const messaging = firebase.messaging();