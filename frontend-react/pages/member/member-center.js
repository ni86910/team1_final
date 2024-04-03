import React from 'react'
// import Navbar from '@/components/common/navbar'
// import Footer from '@/components/common/footer'
import MemberCenterPage from '@/components/member/member-center'
import Head from 'next/head'

export default function MemberCenter() {
  return (
    <>
      <Head>
        <title>會員專區</title>
      </Head>
      <MemberCenterPage />
    </>
  )
}
