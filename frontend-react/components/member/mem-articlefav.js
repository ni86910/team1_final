import { useState, useEffect } from 'react'
import { useAuth } from '@/context/auth-context' //登出
import { useRouter } from 'next/router'
import { API_SERVER } from '@/configs/index'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
/* React-Bootstrap */
import { Table } from 'react-bootstrap'

/* React-icon */
import { FaHeart } from 'react-icons/fa6'

export default function ArtFavorite() {
  const { logout, auth } = useAuth()
  const router = useRouter()

  // 用來接收 fetch資料 的狀態
  const [articleData, setArticleData] = useState([])

  // 檢查收藏按鈕是否被點擊，用來更新favInfo 的依據
  const [toggleBtn, setToggleBtn] = useState(true)

  // 抓收藏資料
  useEffect(() => {
    if (auth.member_id) {
      // 取得會員id
      const member_id = auth.member_id
      // 取得文章id
      const article_id = router.query.article_id

      const url = `${API_SERVER}/favorites/all-fav?member_id=${member_id}&article=${article_id}`

      try {
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', // 設定 Content-Type 為 JSON
          },
        })
          .then((r) => r.json())
          .then((data) => {
            console.log('收藏資訊', data)
            setArticleData(data)
          })
      } catch (e) {
        console.log(e)
      }
    }
  }, [toggleBtn, router.isReady, auth])

  const handleRemoveFavorite = async (fav_Id) => {
    try {
      const url = `${API_SERVER}/favorites/del-fav`
      const requestBody = {
        fav_id: fav_Id,
      }
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (response.ok) {
        // 成功刪除後更新狀態以重新加載收藏資料
        setToggleBtn(!toggleBtn)
        toast.success('已取消收藏')
      } else {
        console.error('取消收藏失敗')
      }
    } catch (error) {
      console.error('取消收藏失敗', error)
    }
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {articleData.length === 0 ? (
        <Table striped hover bordered className="mt-4">
          <thead>
            <tr>
              <th>文章標題</th>
              <th>收藏時間</th>
              <th>移除收藏</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="3">目前沒有收藏。</td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <Table striped hover bordered className="mt-4">
          <thead>
            <tr>
              <th>文章標題</th>
              <th>收藏時間</th>
              <th>移除收藏</th>
            </tr>
          </thead>
          <tbody>
            {articleData.map((v, i) => (
              <tr key={i}>
                <td>
                  <Link
                    style={{ color: 'black' }}
                    href={`/article/${v.article_id}`}
                  >
                    {v.title}
                  </Link>
                </td>
                <td>{v.fav_time}</td>
                <td>
                  <div
                    role="presentation"
                    onClick={() => handleRemoveFavorite(v.fav_id)}
                    style={{ textAlign: 'center' }}
                  >
                    <FaHeart />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
