import React from 'react'
import CheckoutMain from '@/components/cart/checkout-main'
import Head from 'next/head'
// import Loader from '@/components/product-b/loader'
// import LoadingBar from 'react-top-loading-bar'

export default function Checkout() {
  return (
    <>
      <Head>
        <title>Fits U - 結帳頁</title>
      </Head>
      <hr />
      <CheckoutMain />
    </>
  )
}
