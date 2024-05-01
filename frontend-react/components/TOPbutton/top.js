// useState 和 useEffect 是 React 的內置 Hook，用於在函數組件中管理狀態和副作用。
import { useState, useEffect } from 'react'

export default function Top() {
  // useState 創建了一個狀態變量 showScrollButton 和一個更新該狀態的函數 setShowScrollButton。showScrollButton 用於跟蹤是否應該顯示置頂按鈕。
  const [showScrollButton, setShowScrollButton] = useState(false)

  // useEffect 用於在組件掛載時設置滾動事件監聽器。handleScroll 是滾動事件的處理程序，當網頁滾動時會調用該函數。
  useEffect(() => {
    // 在 handleScroll 中，如果 window.scrollY 大於 300 像素，則設置 showScrollButton 為 true，以顯示置頂按鈕；否則設置為 false。
    const handleScroll = () => {
      // 当用户向下滚动时显示按钮
      if (window.scrollY > 300) {
        setShowScrollButton(true)
      } else {
        setShowScrollButton(false)
      }
    }
    // 當組件卸載時（通過返回的清理函數），會移除滾動事件監聽器。
    window.addEventListener('scroll', handleScroll)

    return () => {
      // 组件卸载时移除滚动事件监听
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // scrollToTop 是一個函數，用於將網頁平滑地滾動到頂部。使用 window.scrollTo API，設置滾動的行為為 'smooth'
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // 組件的返回值中沒有顯示，但您可能會在組件的 JSX 中使用 showScrollButton 變量來條件性地渲染置頂按鈕，並在按鈕上設置 onClick 事件處理程序，調用 scrollToTop 函數。
  return (
    <>
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            // padding: '10px',
            background: 'black',
            color: '#EB6234',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1000,
            height: '70px',
            width: '70px',
            fontWeight: '600',
          }}
        >
          TOP
        </button>
      )}
    </>
  )
}
