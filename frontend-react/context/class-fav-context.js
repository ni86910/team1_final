import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '@/context/auth-context'
import { API_SERVER } from '@/configs'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import toast, { Toaster } from 'react-hot-toast'

const ClassFavContext = createContext()

export function ClassFavContextProvider({ children }) {
  const router = useRouter()
  const { auth } = useAuth()

  const [bookState, setBookState] = useState('立即預約')

  // 取消預約的通知
  const removeBookAlert = () => {
    Swal.fire({
      icon: 'success',
      title: '成功取消',
      showConfirmButton: false,
      timer: 1500,
    })
  }

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
  }, [auth, router])

  const [allBook, setAllBook] = useState([])

  // 檢查收藏按鈕是否被點擊，用來更新favInfo 的依據
  const [toggleBtn, setToggleBtn] = useState(true)

  // 抓會員所有預約資料
  useEffect(() => {
    if (auth.member_id) {
      const url = `${API_SERVER}/class/all-book?member_id=${auth.member_id}`
      try {
        fetch(url)
          .then((r) => r.json())
          .then((data) => {
            setAllBook(data)
            console.log('allBook', data)
          })
      } catch (e) {
        console.log(e)
      }
    }
  }, [router.isReady, auth, router, toggleBtn])

  // 點擊取消預約 確認框
  const checkRemoveBook = (member_id, class_schedule_id, path) => {
    Swal.fire({
      title: '是否要取消預約?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#EB6234',
      cancelButtonColor: 'black',
      confirmButtonText: '確定',
      cancelButtonText: '再考慮一下',
    }).then((result) => {
      if (result.isConfirmed) {
        removeBook(member_id, class_schedule_id, path)
      }
    })
  }

  // 執行 移除預約
  const removeBook = (member_id, class_schedule_id, path) => {
    const url = `${API_SERVER}/class/remove-book`
    try {
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // 設定 Content-Type 為 JSON
        },
        body: JSON.stringify({
          member_id: member_id,
          class_schedule_id: class_schedule_id,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          console.log('刪除結果', data)
          setToggleBtn(!toggleBtn)
          removeBookAlert()
          if (path) {
            router.push(
              {
                pathname: path,
              },
              undefined,
              { scroll: false }
            )
          }
        })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ClassFavContext.Provider
      value={{
        allClassFav,
        allBook,
        checkRemoveBook,
        toggleBtn,
        setToggleBtn,
        setBookState,
        bookState,
      }}
    >
      {children}
    </ClassFavContext.Provider>
  )
}

export function useClassFav() {
  return useContext(ClassFavContext)
}

export default ClassFavContext
