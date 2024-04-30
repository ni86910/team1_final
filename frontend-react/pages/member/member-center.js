import React, { useEffect } from 'react'
// import Navbar from '@/components/common/navbar'
// import Footer from '@/components/common/footer'
import MemberCenterPage from '@/components/member/member-center'
import Head from 'next/head'
import NotLogin from '@/components/common/not-login'
import { useBreadcrumb } from '@/context/breadcrumb-context'

export default function MemberCenter() {
  // 設定麵包屑
  const { setPath, setPageName } = useBreadcrumb()

  useEffect(() => {
    setPath([{ name: '會員中心', href: '/', isEnd: true }])
    setPageName('會員中心')
  }, [])

  return (
    <>
      <Head>
        <title>會員中心</title>
      </Head>
      <NotLogin />
      <MemberCenterPage />
    </>
  )
}
