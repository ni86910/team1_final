import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '@/context/auth-context'
import { API_SERVER } from '@/configs'
import { useRouter } from 'next/router'

const ProductFavContext = createContext()

export function ProductFavContextProvider({ children }) {
  const router = useRouter()
  const { auth } = useAuth()

  // 紀錄該會員的 所有商品收藏
  const [allProductFav, setAllProductFav] = useState([])

  // auth改變 就去抓資料
  useEffect(() => {
    const url = `${API_SERVER}/product/all_fav?member_id=${auth.member_id}`
    try {
      fetch(url)
        .then((r) => {
          if (!r.ok) {
            throw new Error('Failed to fetch')
          }
          return r.json()
        })
        .then((data) => {
          setAllProductFav(data)
        })
        .catch((error) => {
          console.error('Fetch error:', error)
        })
    } catch (e) {
      console.error('Fetch error:', e)
    }
  }, [auth, router])

  // 檢查收藏按鈕是否被點擊，用來更新 favInfo 的依據
  const [toggleBtn, setToggleBtn] = useState(true)

  return (
    <ProductFavContext.Provider
      value={{
        allProductFav,
        toggleBtn,
        setToggleBtn,
      }}
    >
      {children}
    </ProductFavContext.Provider>
  )
}

export function useProductFav() {
  return useContext(ProductFavContext)
}

export default ProductFavContext
