import { createContext, useContext, useEffect, useState } from 'react'

const BreadcrumbContext = createContext()

export function BreadcrumbContextProvider({ children }) {
  const [path, setPath] = useState([])
  const [pageName, setPageName] = useState('首頁')

  /*
  使用說明:
  此context主要功能為 控制麵包屑

  1.setPageName() 放入該頁名稱
  2.setPath()裡面要放 一個陣列，陣列中包一或多個物件，物件中須包含以下3個值 
  name 為課程名稱 href 為點擊後前往的連結 isEnd 則決定該麵包屑節點是否為最後一個
  
  物件範例:{ name: '課程專區', href: '/class', isEnd: true }

  麵包屑預設開頭為"首頁"

  若希望麵包屑長得像這樣「首頁>課程專區>課表查詢」
  則應如下
  setPath(
    [
      { name: '課程專區', href: '/class', isEnd: false },
      { name: '課表查詢」', href: '/class/check-class', isEnd: true }
    ]
  )


  使用範例:
  1. 在檔案中引入
  import { useBreadcrumb } from '@/context/breadcrumb-context'

  2.取得setPath跟setPageName
  const { setPath, setPageName } = useBreadcrumb()

  3.在useEffect設定
  useEffect(() => {
    setPath([{ name: '課程專區', href: '/class', isEnd: true }])
    setPageName('課程專區')
  }, [])

  */

  return (
    <BreadcrumbContext.Provider
      value={{ path, setPath, pageName, setPageName }}
    >
      {children}
    </BreadcrumbContext.Provider>
  )
}

export function useBreadcrumb() {
  return useContext(BreadcrumbContext)
}

export default BreadcrumbContext
