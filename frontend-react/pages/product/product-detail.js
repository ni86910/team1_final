import React from 'react'
import Head from 'next/head'
import ProductDetail from '@/components/product/product-detail'
// import Loader from '@/components/product-b/loader'
// import LoadingBar from 'react-top-loading-bar'

export default function Shop() {
  return (
    <>
      <Head>
        <title>Fits U - 商品詳細</title>
      </Head>
      <hr />
      <ProductDetail />
    </>
  )
}
