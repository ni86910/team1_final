import { useEffect } from 'react'
import Head from 'next/head'
import ProductDetail from '@/components/product/product-detail'
// import Loader from '@/components/product-b/loader'
// import LoadingBar from 'react-top-loading-bar'
import { useBreadcrumb } from '@/context/breadcrumb-context'

export default function Detail() {
  // 設定麵包屑
  const { setPath, setPageName } = useBreadcrumb()

  useEffect(() => {
    setPath([
      { name: '健康商城', href: '/product', isEnd: false },
      { name: '商品詳細', href: '/', isEnd: true },
    ])
    setPageName('商品詳細')
  }, [])

  return (
    <>
      <Head>
        <title>Fits U - 商品詳細</title>
      </Head>
      <ProductDetail />
    </>
  )
}
