import { useEffect } from 'react'
// import Navbar from '@/components/common/navbar'
// import Footer from '@/components/common/footer'
import PointsPage from '@/components/member/points'
import NotLogin from '@/components/common/not-login'
import Head from 'next/head'
import { useBreadcrumb } from '@/context/breadcrumb-context'

export default function Points() {
  // 設定麵包屑
  const { setPath, setPageName } = useBreadcrumb()

  useEffect(() => {
    setPath([{ name: '會員中心', href: '/', isEnd: true }])
    setPageName('會員中心')
  }, [])
  return (
    <>
      <Head>
        <title>我的點數</title>
      </Head>
      <NotLogin />
      <PointsPage />
    </>
  )
}
