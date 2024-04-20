import React, { useState } from 'react'
import Image from 'next/image'
import style from '@/styles/login.module.scss'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
// import useFirebase from '../../hooks/use-firebase'
import { useRouter } from 'next/router'
import { auth } from '../../hooks/firebase-config'

export default function GoogleLogin() {
  const router = useRouter()
  // 目前使用 google 做第三方登入
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    // 限制只有帶 ckex.tech 才會出現在選項
    provider.setCustomParameters({
      // hd: 'ckex.tech',
    })
    try {
      const response = await signInWithPopup(auth, provider)
      const token = response.user.accessToken
      localStorage.setItem('access_token', token)
      // 登入成功就轉址
      if (token) {
        // 送出登入一筆會員資料(展示用)
        router.push('/member/profile')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <button
      type="submit"
      className={`btn ${style['google-btn']}`}
      onClick={signInWithGoogle}
    >
      <span className="glyphicon glyphicon-remove" />
      <Image
        className={style['google-img']}
        src="/img/member/google.png"
        width={20}
        height={20}
        alt=""
      />
      使用Google快速登入
    </button>
  )
}
