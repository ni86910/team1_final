import React from 'react'
// import Navbar from '@/components/common/navbar'
// import Footer from '@/components/common/footer'
import PointsPage from '@/components/member/points'
import Head from 'next/head'

export default function Points() {
  return (
    <>
      <Head>
        <title>我的點數</title>
      </Head>
      <PointsPage />
    </>
  )
}
