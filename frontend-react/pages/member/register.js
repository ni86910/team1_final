import { useEffect } from 'react'
// import Navbar from '@/components/common/navbar'
// import Footer from '@/components/common/footer'
import RegisterPage from '@/components/member/register'
import Head from 'next/head'
import { useBreadcrumb } from '@/context/breadcrumb-context'

export default function Register() {
  // 設定麵包屑
  const { setPath, setPageName } = useBreadcrumb()

  useEffect(() => {
    setPath([
      { name: '會員中心', href: '/member/member-center', isEnd: false },
      { name: '會員註冊', href: '/', isEnd: true },
    ])
    setPageName('會員中心')
  }, [])
  return (
    <>
      <Head>
        <title>會員註冊</title>
      </Head>
      <RegisterPage />
    </>
  )
}
