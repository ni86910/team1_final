import React, { useEffect } from 'react'
import Head from 'next/head'
import GymPlace from '@/components/gym/gym'
import { useBreadcrumb } from '@/context/breadcrumb-context'

export default function IndexGym() {
  // 設定麵包屑
  const { setPath, setPageName } = useBreadcrumb()
  useEffect(() => {
    setPath([{ name: '場地一覽', href: '/', isEnd: true }])
    setPageName('場地一覽')
  }, [])
  return (
    <>
      <Head>
        <title>場地一覽</title>
      </Head>
      <GymPlace />
    </>
  )
}
