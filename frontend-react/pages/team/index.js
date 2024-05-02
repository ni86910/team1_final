import { useEffect } from 'react'
import Head from 'next/head'
import Team from '@/components/team/team'
import { useBreadcrumb } from '@/context/breadcrumb-context'

export default function Index() {
  // 設定麵包屑
  const { setPath, setPageName } = useBreadcrumb()

  useEffect(() => {
    setPath([{ name: '團隊介紹', href: '/', isEnd: true }])
    setPageName('團隊介紹')
  }, [])
  return (
    <>
      <Head>
        <title>團隊介紹</title>
      </Head>
      <Team />
    </>
  )
}
