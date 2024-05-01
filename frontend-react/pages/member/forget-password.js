import { useEffect } from 'react'
// import Navbar from '@/components/common/navbar'
// import Footer from '@/components/common/footer'
import ForgetPasswordPage from '@/components/member/forget-password'
import Head from 'next/head'
import { useBreadcrumb } from '@/context/breadcrumb-context'

export default function ForgetPassword() {
  // 設定麵包屑
  const { setPath, setPageName } = useBreadcrumb()

  useEffect(() => {
    setPath([
      { name: '登入', href: '/member/login', isEnd: false },
      { name: '忘記密碼', href: '/', isEnd: true },
    ])
    setPageName('忘記密碼')
  }, [])
  return (
    <>
      <Head>
        <title>忘記密碼</title>
      </Head>
      <ForgetPasswordPage />
    </>
  )
}
