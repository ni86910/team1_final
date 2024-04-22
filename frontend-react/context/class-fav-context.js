import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '@/context/auth-context'
import { API_SERVER } from '@/configs'
import { useRouter } from 'next/router'

const ClassFavContext = createContext()

export function ClassFavContextProvider({ children }) {
  const router = useRouter()
  const { auth } = useAuth()

  // 紀錄該會員的 所有課程收藏
  const [allClassFav, setAllClassFav] = useState([])

  // auth改變 就去抓資料
  useEffect(() => {
    const url = `${API_SERVER}/class/all_fav?member_id=${auth.member_id}`
    try {
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          setAllClassFav(data)
        })
    } catch (e) {
      console.log(e)
    }
  }, [auth,router])

  return (
    <ClassFavContext.Provider value={{ allClassFav }}>
      {children}
    </ClassFavContext.Provider>
  )
}

export function useClassFav() {
  return useContext(ClassFavContext)
}

export default ClassFavContext
