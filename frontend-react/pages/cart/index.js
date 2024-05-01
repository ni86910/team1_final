import React, { useEffect } from 'react'
import Head from 'next/head'
import CartMain from '@/components/cart/cart-main'
// import Loader from '@/components/product-b/loader'
// import LoadingBar from 'react-top-loading-bar'
import { useBreadcrumb } from '@/context/breadcrumb-context'

export default function Index() {
  // 設定麵包屑
  const { setPath, setPageName } = useBreadcrumb()
  useEffect(() => {
    setPath([
      { name: '健康商城', href: '/product', isEnd: false },
      { name: '購物車', href: '/', isEnd: true },
    ])
    setPageName('購物車')
  }, [])
  return (
    <>
      <Head>
        <title>Fits U - 購物車</title>
      </Head>
      <CartMain />
    </>
  )
}
