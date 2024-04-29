import React from 'react'
// import Navbar from '@/components/common/navbar'
// import Footer from '@/components/common/footer'
import FavoritePage from '@/components/member/favorite'
import NotLogin from '@/components/common/not-login'
import Head from 'next/head'

export default function Favorite() {
  return (
    <>
      <Head>
        <title>我的收藏</title>
      </Head>
      <NotLogin />
      <FavoritePage />
    </>
  )
}
