import React from 'react'
import ShopProduct from '@/components/shop/shop-product'
import Head from 'next/head'

export default function Shop() {
  return (
    <>
      <Head>
        <title>Fits U - 健康商城</title>
      </Head>
      <hr />
      <ShopProduct />
    </>
  )
}
