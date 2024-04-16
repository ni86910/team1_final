import { FaHeart, FaRegHeart } from 'react-icons/fa'
import style from '@/styles/jack-use/button.module.css'

import React, { useState } from 'react'

function BookmarkButton({ onToggle }) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleToggle = () => {
    setIsBookmarked(!isBookmarked)
    // 調用回調函數，將當前收藏狀態傳遞給父元件
    onToggle(!isBookmarked)
  }

  return (
    <button className={style['btn']} onClick={handleToggle}>
      {isBookmarked ? <FaHeart /> : <FaRegHeart />}
    </button>
  )
}

export default BookmarkButton