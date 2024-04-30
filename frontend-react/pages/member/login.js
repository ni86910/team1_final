import { useEffect } from 'react'
// import Navbar from '@/components/common/navbar'
// import Footer from '@/components/common/footer'
import LoginPage from '@/components/member/login'
import Head from 'next/head'
import { useBreadcrumb } from '@/context/breadcrumb-context'

export default function Login() {
  // 設定麵包屑
  const { setPath, setPageName } = useBreadcrumb()

  useEffect(() => {
    setPath([{ name: '登入', href: '/', isEnd: true }])
    setPageName('登入')
  }, [])
  return (
    <>
      <Head>
        <title>會員登入</title>
      </Head>
      <LoginPage />
    </>
  )
}
