import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { API_SERVER } from '../common/config'
import style from '@/styles/product-list.module.scss'
import { FaRegHeart, FaCartArrowDown } from 'react-icons/fa6'
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/context/auth-context'

//sweet alert
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default function ProductCardList({
  perPage,
  orderBy,
  category,
  page,
  setPage,
  searchKeyword,
}) {
  const router = useRouter()
  const { auth, logout } = useAuth()
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1) // 追蹤當前頁碼
  const [totalPages, setTotalPages] = useState(0) // 新增 totalPage 狀態
  // const perPage = 12 // 每頁顯示的資料筆數

  const { addItem } = useCart()
  // `${API_SERVER}/product?orderBy=${ob}&perPage=${perPage}&page=${page}&category=${category}&keyword=${searchKeyword}`
  useEffect(() => {
    const ob = router.query.orderBy
    // const pp = router.query
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
          setCurrentPage(data.page)
          setTotalPages(data.totalPages)
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
      {/* 產品區塊 Begin */}
      <div className={`row`}>
        {!products ? (
          <></>
        ) : (
          products.map((v) => (
            <div className={`col-lg-4 col-md-6 col-sm-6`} key={v.product_id}>
              <div className={style['product-item']}>
                <Link
                  href={`/product/${v.product_id}`}
                  className={`${style['product-item-pic']} ${style['set-bg']}`}
                >
                  <Image
                    height={326}
                    width={326}
                    src={`/img/products/${
                      v.image.includes(',') ? v.image.split(',')[0] : v.image
                    }`}
                    alt={v.product_name}
                    onMouseEnter={(e) => {
                      e.currentTarget.src = `/img/products/${
                        v.image.includes(',') ? v.image.split(',')[1] : v.image
                      }`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.src = `/img/products/${
                        v.image.includes(',') ? v.image.split(',')[0] : v.image
                      }`
                    }}
                  />
                </Link>
                <ul className={style['fav-button']}>
                  <li>
                    <Link
                      href="#"
                      style={{ color: '#ffffff', fontSize: '18px' }}
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
                      <FaRegHeart />
                    </Link>
                  </li>
                </ul>
                <ul className={style['add-cart-button']}>
                  <Link
                    href="#"
                    style={{ color: '#ffffff', fontSize: '18px' }}
                    onClick={(e) => {
                      e.preventDefault()
                      if (!auth.member_id) {
                        Swal.fire({
                          title: '請先登入!',
                          text: '無法加入購物車',
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#EB6234',
                          cancelButtonColor: 'black',
                          confirmButtonText: '前往登入',
                          cancelButtonText: '取消',
                        }).then((result) => {
                          if (result.isConfirmed) {
                            router.push('/member/login')
                          }
                        })
                      } else {
                        addItem(v)
                      }
                    }}
                  >
                    <li>
                      <FaCartArrowDown />
                    </li>
                  </Link>
                </ul>
                <div className={`mt-3 ${style['product-item-text']}`}>
                  <Link
                    href={`/product/${v.product_id}`}
                    className={`${style['product-item-title']}`}
                  >
                    <p>{v.product_name}</p>
                  </Link>
                  <span>NT$ {v.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))
        )}
        {/* 產品區塊 End */}

        {/* 頁碼 Begin */}
        <div className={`d-flex ${style['pagination-nav']}`}>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {Array(9)
                .fill(1)
                .map((v, i) => {
                  const p = i + 1
                  const active = p === currentPage ? 'active' : ''
                  {
                    /* const usp = new URLSearchParams({ ...qs, page: p }) */
                  }
                  // 條件式寫這裡 p > totalPage or p < 1 回傳 null
                  if (p > totalPages || p < 1) return null
                  return (
                    <li className={`page-item ${active}`} key={p}>
                      <Link
                        className="page-link"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setPage(p)
                          router.push({
                            query: { ...router.query, page: p },
                          })
                        }}
                      >
                        {p}
                      </Link>
                    </li>
                  )
                })}
            </ul>
          </nav>
        </div>
      </div>
      {/* 頁碼 End */}
    </>
  )
}
