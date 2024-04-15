import React from 'react'
import Head from 'next/head'
import GymPlace from '@/components/gym/gym'

export default function IndexGym() {
  return (
    <>
      <Head>
        <title>場地一覽</title>
      </Head>
      <GymPlace />
    </>
  )
}
