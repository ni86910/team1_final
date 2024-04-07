import React from 'react'
// import Navbar from '@/components/common/navbar'
// import Footer from '@/components/common/footer'
import OrderPage from '@/components/member/order'
import Head from 'next/head'

export default function Order() {
  return (
    <>
      <Head>
        <title>我的訂單</title>
      </Head>
      <OrderPage />
    </>
  )
}