// 這裡貼上從firebase專案設定中，網頁應用程式整合的設定值
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyD8YPb1-pSx_WcSTcHcmUQwoPiFKavr08Q',
  authDomain: 'login-645ab.firebaseapp.com',
  projectId: 'login-645ab',
  storageBucket: 'login-645ab.appspot.com',
  messagingSenderId: '733250262079',
  appId: '1:733250262079:web:98a300f76d5ee6abc3948a',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
