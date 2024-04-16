import React from 'react'
import ProductList from '@/components/product/product-list'
import ProductSearch from '@/components/product/product-search'
import Head from 'next/head'
// import Loader from '@/components/product-b/loader'
// import LoadingBar from 'react-top-loading-bar'

export default function Index() {
  return (
    <>
      <Head>
        <title>Fits U - 健康商城</title>
      </Head>
      <div style={{ marginTop: '80px', marginBottom: '30px' }}>
        <ProductSearch />
        <ProductList />
      </div>
    </>
  )
}