import React, { useState } from 'react'
import Image from 'next/image'
import style from '@/styles/login.module.scss'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
// import useFirebase from '../../hooks/use-firebase'
import { useRouter } from 'next/router'
import { auth } from '@/hooks/firebase-config'
import { API_SERVER } from '@/configs/index'

export default function GoogleLogin() {
  const router = useRouter()
  const [googlefile, setGooglefile] = useState({})
  // 目前使用 google 做第三方登入
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()

    try {
      const response = await signInWithPopup(auth, provider)
      const token = response.user.accessToken
      localStorage.setItem('access_token', token)
      // 登入成功就轉址
      if (token) {
        fetch(`${API_SERVER}/google-login`, {
          method: 'POST',
          headers: new Headers({
            Authorization: `${auth.token}`,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setGooglefile(data)
          })
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
      value={googlefile}
    >
      <span className="glyphicon glyphicon-remove" />
      <Image
        className={style['google-img']}
        src="/img/member/#"
        width={20}
        height={20}
        alt=""
      />
      使用Google快速登入
    </button>
  )
}
