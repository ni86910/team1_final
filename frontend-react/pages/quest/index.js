import { useEffect } from 'react'
import Head from 'next/head'
import Quest from '@/components/quest/quest'
import { useBreadcrumb } from '@/context/breadcrumb-context'

export default function Index() {
  // 設定麵包屑
  const { setPath, setPageName } = useBreadcrumb()

  useEffect(() => {
    setPath([{ name: '常見問題', href: '/', isEnd: true }])
    setPageName('常見問題')
  }, [])
  return (
    <>
      <Head>
        <title>常見問題</title>
      </Head>
      <Quest />
    </>
  )
}
