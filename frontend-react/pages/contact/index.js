import React, { useEffect } from 'react'
import Head from 'next/head'
import Contact from '@/components/contact/contact'
import { useBreadcrumb } from '@/context/breadcrumb-context'

export default function ContactIndex() {
  // 設定麵包屑
  const { setPath, setPageName } = useBreadcrumb()
  useEffect(() => {
    setPath([{ name: '客服專區', href: '/', isEnd: true }])
    setPageName('客服專區')
  }, [])
  return (
    <>
      <Head>
        <title>客服專區</title>
      </Head>
      <Contact />
    </>
  )
}
