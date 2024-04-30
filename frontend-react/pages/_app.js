import { useEffect } from 'react'
import '@/styles/global.scss'
import '@/styles/style.css'
import '@/styles/my-style.css'
import DefaultLayout from '@/components/layout/default-layout'
import { AuthContextProvider } from '@/context/auth-context'
import { CartProvider } from '@/hooks/use-cart'
import { ClassFavContextProvider } from '@/context/class-fav-context'
import { ProductFavContextProvider } from '@/context/product-fav-context'
import { PointsContextProvider } from '@/context/points-context'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // 使用預設排版檔案
  // 對應`components/layout/default-layout/index.js`
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <AuthContextProvider>
      <PointsContextProvider>
        <ClassFavContextProvider>
          <ProductFavContextProvider>
            <CartProvider>
              {getLayout(<Component {...pageProps} />)}
            </CartProvider>
          </ProductFavContextProvider>
        </ClassFavContextProvider>
      </PointsContextProvider>
    </AuthContextProvider>
  )
}
