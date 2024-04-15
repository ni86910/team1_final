import React, { useState, useEffect } from 'react'
import ProductCardList from './product-card-list'
import ProductCategory from './product-category'
import Link from 'next/link'
import style from '@/styles/product-list.module.scss'

/* 頁碼 icon */
import {
  MdClose,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md'

export default function ProductList() {
  return (
    <>
      <section className={`${style.shop} ${style.spad}`}>
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
                        (還沒改好)顯示第 <span>1</span> – <span>12</span> 筆結果
                        (共 <span>104</span> 筆)
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
                        <select>
                          <option value="" active="">
                            商品排序
                          </option>
                          <option value="">上架時間: 由新到舊</option>
                          <option value="">上架時間: 由舊到新</option>
                          <option value="">價格: 由高到低</option>
                          <option value="">價格: 由低到高</option>
                        </select>
                      </div>
                      <div
                        className={`col-6 d-flex ${style['shop-product-option-right-qty']}`}
                      >
                        <select>
                          <option value="">每頁顯示48個</option>
                          <option value="" active="">
                            每頁顯示12個
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* 商品排序 End */}
                  <ProductCardList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
