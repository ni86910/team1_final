import React, { useState } from 'react'
import BookmarkButton from '@/components/article/bookmark/fav-icon'

function BookMark() {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleBookmarkToggle = () => {
    setIsBookmarked(isBookmarked)
  }

  return (
    <>
      <BookmarkButton onToggle={handleBookmarkToggle} />
    </>
  )
}

export default BookMark
