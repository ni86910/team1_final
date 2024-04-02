import React from 'react'
import Head from 'next/head'
import ArticleDetail from '@/components/article/article-detail'

export default function DetailIndex() {
  return (
    <>
      <Head>
        <title>健康小知識-detail</title>
      </Head>
      <ArticleDetail />
    </>
  )
}
