import { FaHeart, FaRegHeart } from 'react-icons/fa'
import style from '@/styles/jack-use/button.module.css'
import { API_SERVER } from '@/configs'
import { useAuth } from '@/context/auth-context'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Router, { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'

function ClassFav({ favInfo, setToggleBtn, toggleBtn }) {
  const router = useRouter()
  const { auth } = useAuth()

  // 尚未登入
  const notMember = () => {
    Swal.fire({
      title: '您尚未登入',
      text: '無法收藏課程',
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
    const url = `${API_SERVER}/class/remove-fav`
    try {
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // 設定 Content-Type 為 JSON
        },
        body: JSON.stringify({
          member_id: favInfo.member_id,
          class_schedule_id: favInfo.class_schedule_id,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          console.log('刪除結果', data)
          setToggleBtn(!toggleBtn)
        })
    } catch (e) {
      console.log(e)
    }
  }

  // 新增
  const addFav = () => {
    const url = `${API_SERVER}/class/add-fav`
    try {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 設定 Content-Type 為 JSON
        },
        body: JSON.stringify({
          member_id: favInfo.member_id,
          class_schedule_id: favInfo.class_schedule_id,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
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
    // 已經收藏過了 則用post發fetch
    if (favInfo.alreadyFav) {
      console.log('取消收藏')
      removeFav()
    } else {
      // 還沒收藏過，則 用DELETE 發fetch
      console.log('收藏')
      addFav()
    }
  }

  useEffect(() => {}, [favInfo])
  return (
    <button className={style['btn']} onClick={handleToggle}>
      {favInfo.alreadyFav ? <FaHeart /> : <FaRegHeart />}
    </button>
  )
}

export default ClassFav
