import React from 'react'
import OrderConfirmationMain from '@/components/cart/order-confirmation'
import Head from 'next/head'
// import Loader from '@/components/product-b/loader'
// import LoadingBar from 'react-top-loading-bar'

export default function OrderConfirmation() {
  return (
    <>
      <Head>
        <title>Fits U - 訂單成立</title>
      </Head>
      <hr />
      <OrderConfirmationMain />
    </>
  )
}
