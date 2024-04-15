import React from 'react'
import Head from 'next/head'
import Team from '@/components/team/team'

export default function Index() {
  return (
    <>
      <Head>
        <title>團隊介紹</title>
      </Head>
      <Team />
    </>
  )
}
