import React, { useState, useEffect } from 'react'
import ProductList from '@/components/product/product-list'
import ProductSearch from '@/components/product/product-search'
import Head from 'next/head'
// import Loader from '@/components/product-b/loader'
// import LoadingBar from 'react-top-loading-bar'
import { useBreadcrumb } from '@/context/breadcrumb-context'

export default function Index() {
  // 設定麵包屑
  const { setPath, setPageName } = useBreadcrumb()

  useEffect(() => {
    setPath([{ name: '健康商城', href: '/', isEnd: true }])
    setPageName('健康商城')
  }, [])

  const [searchKeyword, setSearchKeyword] = useState('')
  return (
    <>
      <Head>
        <title>Fits U - 健康商城</title>
      </Head>
      <div style={{ marginTop: '80px', marginBottom: '30px' }}>
        <ProductSearch
          setSearchKeyword={setSearchKeyword}
          searchKeyword={searchKeyword}
        />
        <ProductList searchKeyword={searchKeyword} />
      </div>
    </>
  )
}
