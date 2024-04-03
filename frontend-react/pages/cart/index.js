import React from 'react'
import Head from 'next/head'
import ShopCart from '@/components/cart/shop-cart'
// import Loader from '@/components/product-b/loader'
// import LoadingBar from 'react-top-loading-bar'

export default function Shop() {
  return (
    <>
      <Head>
        <title>Fits U - 購物車</title>
      </Head>
      <hr />
      <ShopCart />
    </>
  )
}
