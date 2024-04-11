import React from 'react'
// import Navbar from '@/components/common/navbar'
// import Footer from '@/components/common/footer'
import RegisterPage from '@/components/member/register'
import Head from 'next/head'

export default function Register() {
  return (
    <>
      <Head>
        <title>會員註冊</title>
      </Head>
      <RegisterPage />
    </>
  )
}
