import React from 'react'
import Head from 'next/head'
import Quest from '@/components/quest/quest'

export default function Index() {
  return (
    <>
      <Head>
        <title>常見問題</title>
      </Head>
      <Quest />
    </>
  )
}
