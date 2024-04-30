import React from 'react'
// import Navbar from '@/components/common/navbar'
// import Footer from '@/components/common/footer'
import ResetPasswordPage from '@/components/member/reset-password'
import Head from 'next/head'

export default function ResetPassword() {
  return (
    <>
      <Head>
        <title>重置密碼</title>
      </Head>
      <ResetPasswordPage />
    </>
  )
}
