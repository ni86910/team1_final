import React from 'react'
import Image from 'next/image'
import style from '@/styles/login.module.scss'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'next/router'
import { auth } from '@/hooks/firebase-config'
import Swal from 'sweetalert2'
import { useAuth } from '@/context/auth-context'

export default function GoogleLogin() {
  const { login } = useAuth()
  const router = useRouter()
  // 目前使用 google 做第三方登入
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()

    try {
      const response = await signInWithPopup(auth, provider)
      console.log(response.user.providerData[0])

      const token = response.user.accessToken
      localStorage.setItem('access_token', token)
      // 登入成功就轉址
      if (token) {
        login('googletest@test.com', 'a123456')

        setTimeout(() => {
          router.push('/member/profile')
          Swal.fire({
            title: '已成功登入!',
            icon: 'success',
          })
        }, 2000)
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
      // value={googlefile}
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
