import React from 'react'
import Head from 'next/head'
import ShopDetail from '@/components/shop/shop-detail'
// import Loader from '@/components/product-b/loader'
// import LoadingBar from 'react-top-loading-bar'

export default function Shop() {
  return (
    <>
      <Head>
        <title>Fits U - 商品詳細</title>
      </Head>
      <hr />
      <ShopDetail />
    </>
  )
}
