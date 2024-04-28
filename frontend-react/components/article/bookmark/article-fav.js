import { FaHeart, FaRegHeart } from 'react-icons/fa'
import style from '@/styles/jack-use/button.module.css'
import { API_SERVER } from '@/configs'
import { useAuth } from '@/context/auth-context'
import Swal from 'sweetalert2'
import Router, { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'

function ArticleFav({ favInfo, setToggleBtn, toggleBtn }) {
  const router = useRouter()
  const { auth } = useAuth()
  // hot toast 收藏訊息
  const addFavToast = () => toast.success('加到收藏')
  const removeFavToast = () => toast.success('移除收藏')

  // 尚未登入
  const notMember = () => {
    Swal.fire({
      title: '您尚未登入',
      text: '無法收藏文章',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '前往登入',
      cancelButtonText: '繼續瀏覽',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/member/login')
      }
    })
  }

  // 刪除
  const removeFav = () => {
    const url = `${API_SERVER}/article/del-fav`
    try {
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // 設定 Content-Type 為 JSON
        },
        body: JSON.stringify({
          member_id: favInfo.member_id,
          article_id: favInfo.article_id,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          console.log('刪除結果', data)
          removeFavToast()
          setToggleBtn(!toggleBtn)
        })
    } catch (e) {
      console.log(e)
    }
  }

  // 新增
  const addFav = () => {
    const url = `${API_SERVER}/article/add-fav`
    try {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 設定 Content-Type 為 JSON
        },
        body: JSON.stringify({
          member_id: favInfo.member_id,
          article_id: favInfo.article_id,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          addFavToast()
          console.log('新增結果', data)
          setToggleBtn(!toggleBtn)
        })
    } catch (e) {
      console.log(e)
    }
  }

  // 按了之後 執行以下
  const handleToggle = () => {
    // 尚未登入
    if (!auth.member_id) {
      notMember()
      return
    }

    if (favInfo.alreadyFav) {
      console.log('已取消收藏')
      removeFav()
    } else {
      console.log('已加入收藏')
      addFav()
    }
  }

  useEffect(() => {}, [favInfo])
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <button className={style['btn']} onClick={handleToggle}>
        {favInfo.alreadyFav ? <FaHeart /> : <FaRegHeart />}
      </button>
    </>
  )
}

export default ArticleFav
