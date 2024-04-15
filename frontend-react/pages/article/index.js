import React from 'react'
import Head from 'next/head'
import Article from '@/components/article/article'

export default function Index() {
  return (
    <>
      <Head>
        <title>健康小知識</title>
      </Head>
      <Article />
    </>
  )
}
