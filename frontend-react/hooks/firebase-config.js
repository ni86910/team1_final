// 這裡貼上從firebase專案設定中，網頁應用程式整合的設定值
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyBYIxO5OzO1TEv_TUlsR1YLHn3tiFY3cXs',
  authDomain: 'next-login-210c4.firebaseapp.com',
  projectId: 'next-login-210c4',
  storageBucket: 'next-login-210c4.appspot.com',
  messagingSenderId: '1062883198806',
  appId: '1:1062883198806:web:9dda772d5b20082744b8f7',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
