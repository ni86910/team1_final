import React from 'react'
// import Navbar from '@/components/common/navbar'
// import Footer from '@/components/common/footer'
import ProfilePage from '@/components/member/profile'
import Head from 'next/head'

export default function Profile() {
  return (
    <>
      <Head>
        <title>個人資料</title>
      </Head>
      <ProfilePage />
    </>
  )
}
