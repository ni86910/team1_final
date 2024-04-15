import React, {useState, useEffect} from 'react'
// import Link from 'next/link'
import style from '@/styles/product-search.module.scss'
import { IoIosSearch } from 'react-icons/io'
import { useRouter } from 'next/router'
import { API_SERVER } from '../common/config'

export default function ProductSearch() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1) // 追蹤當前頁碼

  useEffect(() => {
    // 呈現資料的 function
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${API_SERVER}/product${location.search}`,
          { credentials: 'include' }
        )
        if (response.ok) {
          const data = await response.json()
          setProducts(data.rows) // 注意這裡根據後端返回的格式修改
        } else {
          throw new Error('獲取商品時出錯')
        }
      } catch (error) {
        console.error(error)
      }
    }
    if (router.isReady) {
      fetchProducts()
    }
  }, [currentPage, router]) // 當 currentPage 改變時再次呼叫 useEffect)

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
            router.push(`?keyword=${val}`)
          }}
        >
          <div className={style['search-wrapper']}>
            <input
              type="text"
              name=""
              placeholder="輸入關鍵字 + Enter..."
              className={style['search-field']}
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
