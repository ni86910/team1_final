import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '@/context/auth-context'
import { API_SERVER } from '@/configs'
import { useRouter } from 'next/router'

const PointsContext = createContext()

export function PointsContextProvider({ children }) {
  const router = useRouter()
  const { auth } = useAuth()

  // 使用會員積分
  const [totalPoints, setTotalPoints] = useState(0)

  // 從後端獲取會員積分總和
  useEffect(() => {
    // 呈現資料的 function
    if (auth.member_id) {
      const fetchPoints = async () => {
        try {
          const response = await fetch(
            `${API_SERVER}/points/all_points?member_id=${auth.member_id}`,
            { credentials: 'include' }
          )
          if (response.ok) {
            const data = await response.json()
            setTotalPoints(data.totalPoint) // 將欄位名稱從 points_id 改為 points
          } else {
            throw new Error('獲取點數資料時出錯')
          }
        } catch (error) {
          console.error(error)
        }
      }

      if (router.isReady) {
        fetchPoints()
      }
    }
  }, [auth.member_id, router])
  return (
    <PointsContext.Provider value={{ totalPoints }}>
      {children}
    </PointsContext.Provider>
  )
}

export function usePoints() {
  return useContext(PointsContext)
}

export default PointsContext
