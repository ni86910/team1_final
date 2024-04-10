import React from 'react'
import Head from 'next/head'
import CartMain from '@/components/cart/cart-main'
// import Loader from '@/components/product-b/loader'
// import LoadingBar from 'react-top-loading-bar'

export default function Cart() {
  return (
    <>
      <Head>
        <title>Fits U - 購物車</title>
      </Head>
      <CartMain />
    </>
  )
}
