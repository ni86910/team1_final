import React from 'react'
import CheckoutMain from '@/components/cart/checkout-main'
import Head from 'next/head'
import Link from 'next/link'
// import Loader from '@/components/product-b/loader'
// import LoadingBar from 'react-top-loading-bar'

export default function Checkout() {
  return (
    <>
      <Head>
        <title>Fits U - 結帳頁</title>
      </Head>
      <CheckoutMain />
      <br />
      <Link href="/cart">連至 購物車</Link>
    </>
  )
}
