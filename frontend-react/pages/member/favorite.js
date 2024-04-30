import { useEffect } from 'react'
// import Navbar from '@/components/common/navbar'
// import Footer from '@/components/common/footer'
import FavoritePage from '@/components/member/favorite'
import Head from 'next/head'
import { useBreadcrumb } from '@/context/breadcrumb-context'

export default function Favorite() {
  // 設定麵包屑
  const { setPath, setPageName } = useBreadcrumb()

  useEffect(() => {
    setPath([{ name: '會員中心', href: '/', isEnd: true }])
    setPageName('會員中心')
  }, [])
  return (
    <>
      <Head>
        <title>我的收藏</title>
      </Head>
      <FavoritePage />
    </>
  )
}
