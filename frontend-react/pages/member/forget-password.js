import React from 'react'
// import Navbar from '@/components/common/navbar'
// import Footer from '@/components/common/footer'
import ForgetPasswordPage from '@/components/member/forget-password'
import Head from 'next/head'

export default function ForgetPassword() {
  return (
    <>
      <Head>
        <title>忘記密碼</title>
      </Head>
      <ForgetPasswordPage />
    </>
  )
}
