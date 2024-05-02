import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ProductCardList from './product-card-list'
import ProductCategory from './product-category'
import style from '@/styles/product-list.module.scss'
import { IoIosArrowUp } from 'react-icons/io'

export default function ProductList({ searchKeyword }) {
  const router = useRouter()
  const [orderBy, setOrderBy] = useState('default') // 增加一個狀態來追蹤排序方式
  const [perPage, setPerPage] = useState(12) // 增加一個狀態來追蹤每頁顯示商品數量
  const [page, setPage] = useState(1)

  // 定義排序改變時的處理函式
  const handleSortChange = (e) => {
    // 如果新的排序值不是預設值，則傳遞該值，否則不傳遞
    const newOrderBy = e.target.value !== 'default' ? e.target.value : null
    router.push({
      pathname: '/product',
      query: { ...router.query, orderBy: newOrderBy },
    })
  }

  // 定義每頁顯示商品數量改變時的處理函式
  const handlePerPageChange = (e) => {
    const newPerPage = e.target.value
    setPerPage(newPerPage)

    router.push({
      pathname: '/product',
      query: { ...router.query, perPage: newPerPage },
    })
  }

  // 到頁首
  const clickToGotoTop = useRef(null)

  return (
    <>
      <section
        className={`${style.shop} ${style.spad}`}
      >
        <div className={`container-fluid ${style['shop-product-display']}`}>
          <div className={`row`}>
            <div className={`col-lg-3`}>
              <div className={style['shop-sidebar']}>
                <ProductCategory />
              </div>
            </div>
            <div className={`col-lg-9`}>
              {/* product list section Begin */}
              <div className={style['shop-product-option']}>
                <div className={`row`}>
                  {/* 顯示商品筆數  */}
                  <div className={`col-lg-6 col-md-6 col-sm-12`}>
                    <div className={style['shop-product-option-left']}>
                      <p>
                        顯示第 <span>1</span> – <span>12</span> 筆結果 (共{' '}
                        <span>104</span> 筆)
                      </p>
                    </div>
                  </div>
                  {/* 顯示商品筆數 End */}
                  {/* 商品排序 Start */}
                  <div className={`col-lg-6 col-md-6 col-sm-12`}>
                    <div className={`row`}>
                      <div
                        className={`col-6 d-flex ${style['shop-product-option-right-sort']}`}
                      >
                        <select value={orderBy} onChange={handleSortChange}>
                          <option value="default">商品排序</option>
                          <option value="newest">上架時間: 由新到舊</option>
                          <option value="oldest">上架時間: 由舊到新</option>
                          <option value="priceHigh">價格: 由高到低</option>
                          <option value="priceLow">價格: 由低到高</option>
                        </select>
                      </div>
                      <div
                        className={`col-6 d-flex ${style['shop-product-option-right-qty']}`}
                      >
                        <select value={perPage} onChange={handlePerPageChange}>
                          <option value="12">每頁顯示12個(預設)</option>
                          <option value="48">每頁顯示48個</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* 商品排序 End */}
                  <ProductCardList
                    orderBy={orderBy}
                    perPage={perPage}
                    setPage={setPage}
                    page={page}
                    searchKeyword={searchKeyword}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
