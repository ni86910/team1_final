import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
} from 'firebase/auth'
import { useEffect } from 'react'
import { firebaseConfig } from './firebase-config'

// 重定向專用，用於在同頁面(firebase的登入頁會與回調頁同一頁)監聽登入情況
// getRedirectResult回調頁時用(註:重定向後，回調回來時才會呼叫)
// onAuthStateChanged監聽auth物件變化 <---(用這個就足夠，它會在頁面一啟動偵測目前登入情況)

const initApp = (callback) => {
  const auth = getAuth()

  // Result from Redirect auth flow.
  getRedirectResult(auth)
    .then((result) => {
      if (result) {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken

        const user = result.user
        console.log(token)
        console.log(user)
      }
    })
    .catch((error) => {
      console.error(error)
    })

  // 監聽用，當auth狀態改變會觸發
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user', user)
      // callback the user data
      callback(user.providerData[0])
    }
  })
}

// TODO: 目前不需要從firebase登出，firebase登出並不會登出google
const logoutFirebase = () => {
  const auth = getAuth()

  signOut(auth)
    .then(function () {
      // Sign-out successful.
      console.log('Sign-out successful.')
      // window.location.assign('https://accounts.google.com/logout')
    })
    .catch(function (error) {
      // An error happened.
      console.log(error)
    })
}

const loginGoogle = async (callback) => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user
      console.log(user)

      // user後端寫入資料庫等等的操作
      callback(user.providerData[0])
    })
    .catch((error) => {
      console.log(error)
    })
}

const loginGoogleRedirect = async (callback) => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  // redirect to google auth
  signInWithRedirect(auth, provider)
}

export default function UseFirebase() {
  // 這裡要設定initApp，讓這個頁面能監聽firebase的google登入狀態
  useEffect(() => {
    // 初始化
    initializeApp(firebaseConfig)
  }, [])

  return {
    initApp,
    loginGoogleRedirect,
    loginGoogle,
    logoutFirebase,
  }
}
