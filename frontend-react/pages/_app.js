import { useEffect } from 'react'
import '@/styles/global.scss'
import '@/styles/style.css'
import '@/styles/my-style.css'
import DefaultLayout from '@/components/layout/default-layout'
import '@/styles/jack-use/place-search.css'
import '@/styles/jack-use/article.css'
import '@/styles/jack-use/carousel.css'
import '@/styles/jack-use/accordion.css'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // 使用預設排版檔案
  // 對應`components/layout/default-layout/index.js`
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return getLayout(<Component {...pageProps} />)
}
