import React, { useEffect } from 'react'
import Head from 'next/head'
import Article from '@/components/article/article'
import { useBreadcrumb } from '@/context/breadcrumb-context'

export default function Index() {
   // 設定麵包屑
  const { setPath, setPageName } = useBreadcrumb()
  useEffect(() => {
    setPath([{ name: '健康小知識', href: '/article', isEnd: true }])
    setPageName('健康小知識')
  }, [])
  return (
    <>
      <Head>
        <title>健康小知識</title>
      </Head>
      <Article />
    </>
  )
}
