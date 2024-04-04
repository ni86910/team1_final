import React from 'react'
import ProductList from '@/components/product/product-list'
import Head from 'next/head'
// import Loader from '@/components/product-b/loader'
// import LoadingBar from 'react-top-loading-bar'

export default function Shop() {
  return (
    <>
      <Head>
        <title>Fits U - 健康商城</title>
      </Head>
      <hr />
      <ProductList />
    </>
  )
}
