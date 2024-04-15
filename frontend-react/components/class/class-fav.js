import { FaHeart, FaRegHeart } from 'react-icons/fa'
import style from '@/styles/jack-use/button.module.css'
import { API_SERVER } from '@/configs'

import React, { useEffect, useState } from 'react'

function ClassFav({ favInfo, setToggleBtn, toggleBtn }) {
  const [isBookmarked, setIsBookmarked] = useState(false)

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
