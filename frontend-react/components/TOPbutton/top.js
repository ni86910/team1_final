import { useState, useEffect } from 'react'

export default function Top() {
  const [showScrollButton, setShowScrollButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // 当用户向下滚动时显示按钮
      if (window.scrollY > 300) {
        setShowScrollButton(true)
      } else {
        setShowScrollButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      // 组件卸载时移除滚动事件监听
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {/* 置頂按钮 */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            padding: '10px',
            background: 'black',
            color: 'white',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          TOP
        </button>
      )}
    </>
  )
}
