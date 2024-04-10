import React from 'react'
// import Navbar from '@/components/common/navbar'
// import Footer from '@/components/common/footer'
import LoginPage from '@/components/member/login'
import Head from 'next/head'

export default function Login() {
  return (
    <>
      <Head>
        <title>會員登入</title>
      </Head>
      <LoginPage />
    </>
  )
}
