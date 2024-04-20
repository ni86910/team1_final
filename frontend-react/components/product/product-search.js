import React, { useState, useEffect } from 'react'
// import Link from 'next/link'
import style from '@/styles/product-search.module.scss'
import { IoIosSearch } from 'react-icons/io'
import { useRouter } from 'next/router'
import { API_SERVER } from '../common/config'

export default function ProductSearch({ setSearchKeyword, searchKeyword }) {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1) // 追蹤當前頁碼

  // 解決前端路由(網址列)會慢一拍 的問題
  // searchKeyword 來控制搜尋欄的值，將搜尋欄從原本的行為，
  // 變成-> 輸入東西，觸發該input的onChange，在onChange事件中，會把輸入的值丟給searchKeyword，並讓input的值由searchKeyword決定


  // useEffect(() => {
  //   // 呈現資料的 function
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch(
  //         `${API_SERVER}/product${location.search}`,
  //         { credentials: 'include' }
  //       )
  //       if (response.ok) {
  //         const data = await response.json()
  //         setProducts(data.rows) // 注意這裡根據後端返回的格式修改
  //       } else {
  //         throw new Error('獲取商品時出錯')
  //       }
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   if (router.isReady) {
  //     fetchProducts()
  //   }
  // }, [currentPage, router]) // 當 currentPage 改變時再次呼叫 useEffect)

  // 取得 query string 的資料
  const qs = { ...router.query }

  return (
    <>
      <div className={`ms-3 ${style['shop-sidebar-search']}`}>
        <form
          className={style['search']}
          onSubmit={(e) => {
            e.preventDefault()
            const val = e.currentTarget.elements[0].value
            console.log(val)
            setSearchKeyword(val)
            router.push({
              query: { ...router.query, keyword: searchKeyword },
            })
          }}
        >
          <div className={style['search-wrapper']}>
            <input
              type="text"
              name=""
              value={searchKeyword}
              placeholder="輸入關鍵字 + Enter..."
              className={style['search-field']}
              onChange={(e) => {
                setSearchKeyword(e.target.value)
              }}
            />
            <button type="submit" className={style['search-icon']}>
              <IoIosSearch />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
