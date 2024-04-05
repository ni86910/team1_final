import React from 'react'
import ProductList from '@/components/product/product-list'
import ProductSearch from '@/components/product/product-search'
import Head from 'next/head'
// import Loader from '@/components/product-b/loader'
// import LoadingBar from 'react-top-loading-bar'

export default function Product() {
  return (
    <>
      <Head>
        <title>Fits U - 健康商城</title>
      </Head>
      <div style={{ margin: '80px, 50px, 0, 50px' }}>
        <ProductSearch />
        <ProductList />
      </div>
    </>
  )
}
