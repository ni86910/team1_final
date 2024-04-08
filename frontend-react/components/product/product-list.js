import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import style from '@/styles/product-list.module.scss'
import { API_SERVER } from '../common/config'
import { FaRegHeart, FaCartArrowDown, FaDumbbell } from 'react-icons/fa6'
import {
  TbZoomMoney,
  TbRulerMeasure,
  TbMoodSmile,
  TbShirtSport,
  TbCup,
  TbDeviceWatchBolt,
  TbShoppingBag,
} from 'react-icons/tb'
import {
  MdClose,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md'
import { PiArrowLineDownFill, PiArrowLineUpFill } from 'react-icons/pi'

import { IMG_PATH } from '@/configs'

export default function ProductList() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(`${API_SERVER}/product/product-list`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('獲取商品時出錯:', error))
  }, [])
  return (
    <>
      <section className={`${style.shop} ${style.spad}`}>
        <div className={`container-fluid ${style['shop-product-display']}`}>
          <div className={`row`}>
            <div className={`col-lg-3`}>
              <div className={style['shop-sidebar']}>
                {/* 產品分類選單 start */}
                <div className={style['shop-sidebar-accordion']}>
                  <ul className={style['accordion']}>
                    <li className={style['accordion-item']}>
                      <input
                        id="s1"
                        className={style['hide']}
                        type="checkbox"
                      />
                      <label htmlFor="s1" className={style['accordion-label']}>
                        <TbShoppingBag /> 商品分類
                      </label>
                      <ul className={style['accordion-child']}>
                        <li>
                          <Link href="#" className={style['reset-filter-btn']}>
                            <MdClose /> 清除分類條件
                          </Link>
                          <hr />
                          <Link
                            href="/product-list"
                            className={style['all-product-link']}
                          >
                            All - 全部商品{' '}
                          </Link>
                          <span>(105)</span>
                        </li>
                        <li className={style['main-cate']}>
                          <Link href="">
                            <FaDumbbell /> 室內健身
                          </Link>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> 有氧/重量訓練
                            <span>(20)</span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> 瑜珈 <span>(20)</span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> 拳擊 <span>(20)</span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> 舞蹈 <span>(20)</span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> 運動恢復放鬆
                            <span>(20)</span>
                          </label>
                        </li>
                        <li className={style['main-cate']}>
                          <Link href="">
                            <TbCup /> 營養補給品
                          </Link>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> 能量補給 <span>(20)</span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> 乳清蛋白 <span>(20)</span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> 能量飲 <span>(20)</span>
                          </label>
                        </li>
                        <li className={style['main-cate']}>
                          <Link href="">
                            <TbShirtSport /> 服飾及配件
                          </Link>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> 運動服飾 <span>(20)</span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> 運動包袋 <span>(20)</span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> 運動水壺 <span>(20)</span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> 配件專區 <span>(20)</span>
                          </label>
                        </li>
                        <li className={style['main-cate']}>
                          <Link href="">
                            <TbDeviceWatchBolt /> 智能運動系列
                          </Link>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> 智能電子用品{' '}
                            <span>(20)</span>
                          </label>
                        </li>
                      </ul>
                    </li>
                    <li className={style['accordion-item']}>
                      <input
                        id="s2"
                        className={style['hide']}
                        type="checkbox"
                      />
                      <label htmlFor="s2" className={style['accordion-label']}>
                        <TbMoodSmile /> 性別
                      </label>
                      <ul className={style['accordion-child']}>
                        <Link href="#" className={style['reset-filter-btn']}>
                          <MdClose /> 清除性別條件
                        </Link>
                        <hr />
                        <li>
                          <label>
                            <input type="checkbox" /> 女
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> 男
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> 中性
                          </label>
                        </li>
                      </ul>
                    </li>
                    <li className={style['accordion-item']}>
                      <input
                        id="s3"
                        className={style['hide']}
                        type="checkbox"
                      />
                      <label htmlFor="s3" className={style['accordion-label']}>
                        <TbRulerMeasure /> 尺寸
                      </label>
                      <ul className={style['accordion-child']}>
                        <Link href="#" className={style['reset-filter-btn']}>
                          <MdClose /> 清除尺寸條件
                        </Link>
                        <li>
                          <label>
                            <input type="checkbox" /> 2XS
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> XS
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> S
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> M
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> L
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> XL
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> 2XL
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" /> 3XL
                          </label>
                        </li>
                      </ul>
                    </li>
                    <li className={style['accordion-item']}>
                      <input
                        id="s4"
                        className={style['hide']}
                        type="checkbox"
                      />
                      <label htmlFor="s4" className={style['accordion-label']}>
                        <TbZoomMoney /> 價格區間
                      </label>
                      <ul className={style['accordion-child']}>
                        <div className={style['sc-original']}>
                          (原始區間：<span>NT$150</span>
                          <span> - </span>
                          <span>NT$2,290</span>)
                        </div>
                        <div className={style['sc-range']}>
                          <div className={style['sc-bdy']}>
                            <p className={style['sc-text']}>
                              最低 <PiArrowLineDownFill />
                            </p>
                            <input
                              type="number"
                              min={0}
                              className={style['sc-input']}
                              defaultValue=""
                            />
                          </div>
                          <div className={style['sc-range']}> 至 </div>
                          <div className={style['sc-bdy']}>
                            <p className={style['sc-text']}>
                              最高 <PiArrowLineUpFill />
                            </p>
                            <input
                              type="number"
                              min={0}
                              className={style['sc-input']}
                              defaultValue=""
                            />
                          </div>
                        </div>
                        <div className={`row ${style['sc-btn-filter']}`}>
                          <button
                            type="button"
                            className={`col-4 col ${style['sc-btn-price']}`}
                          >
                            篩選
                          </button>
                          <button
                            type="button"
                            className={`col-4 ${style['sc-btn-reset']}`}
                          >
                            重置
                          </button>
                        </div>
                      </ul>
                    </li>
                  </ul>
                </div>
                {/* 產品分類選單 end */}
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
                        <span>105</span> 筆)
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
                          <option value="">銷量: 由高到低</option>
                        </select>
                      </div>
                      <div
                        className={`col-6 d-flex ${style['shop-product-option-right-qty']}`}
                      >
                        <select>
                          <option value="" active="">
                            每頁顯示48個
                          </option>
                          <option value="">每頁顯示24個</option>
                          <option value="">每頁顯示12個</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* 商品排序 End */}
                </div>
                {/* 產品區塊 Begin */}
                <div className={`row`}>
                  {products.map((v) => (
                    <div
                      className={`col-lg-4 col-md-6 col-sm-6`}
                      key={v.product_id}
                    >
                      <div className={style['product-item']}>
                        <Link
                          href={`/product-detail/${v.product_id}`}
                          className={`${style['product-item-pic']} ${style['set-bg']}`}
                        >
                          <img
                            src={
                              v.image.includes(',')
                                ? `/${v.image.split(',')[0]}`
                                : `/${v.image}`
                            }
                            alt={v.product_name}
                          />
                        </Link>
                        <ul className={style['fav-button']}>
                          <li>
                            <Link
                              href="#"
                              style={{ color: '#ffffff', fontSize: '18px' }}
                            >
                              <FaRegHeart />
                            </Link>
                          </li>
                        </ul>
                        <ul className={style['add-cart-button']}>
                          <li>
                            <Link
                              href="#"
                              style={{ color: '#ffffff', fontSize: '18px' }}
                            >
                              <FaCartArrowDown />
                            </Link>
                          </li>
                        </ul>
                        <div className={`mt-3 ${style['product-item-text']}`}>
                          <Link
                            href={`/product-detail/${v.product_id}`}
                            className={`${style['product-item-title']}`}
                          >
                            <p>{v.product_name}</p>
                          </Link>
                          <span>NT$ {v.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* <div className={`col-lg-4 col-md-6 col-sm-6`}>
                    <div className={style['product-item']}>
                      <Link
                        href="//product-detail"
                        className={`${style['product-item-pic']} ${style['set-bg']}`}
                      >
                        <img
                          src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                          alt=""
                        />
                      </Link>
                      <ul className={style['fav-button']}>
                        <li>
                          <Link
                            href="#"
                            style={{ color: '#ffffff', fontSize: '18px' }}
                          >
                            <FaRegHeart />
                          </Link>
                        </li>
                      </ul>
                      <ul className={style['add-cart-button']}>
                        <li>
                          <Link
                            href="#"
                            style={{ color: '#ffffff', fontSize: '18px' }}
                          >
                            <FaCartArrowDown />
                          </Link>
                        </li>
                      </ul>
                      <div className={`mt-3 ${style['product-item-text']}`}>
                        <Link
                          href="/product/product-detail"
                          className={`${style['product-item-title']}`}
                        >
                          <p>平衡瑜珈墊11111</p>
                        </Link>
                        <span>NT$ 1,200</span>
                      </div>
                    </div>
                  </div> */}
                </div>
                {/* 產品區塊 End */}
                {/* product pagination Begin */}
                {/* <div className={`d-flex ${style['pagination-nav']}`}>
                  <nav aria-label="Page navigation example">
                    <ul className={`pagination mb-4`}>
                      <li className="page-item">
                        <Link
                          className="page-link"
                          href="#"
                          aria-label="Previous"
                        >
                          <span aria-hidden="true">
                            <MdKeyboardDoubleArrowLeft />
                          </span>
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          className="page-link"
                          href="#"
                          aria-label="VeryFirst"
                        >
                          <span aria-hidden="true">
                            <MdKeyboardArrowLeft />
                          </span>
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" href="#">
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" href="#">
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" href="#">
                          3
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" href="#">
                          ...
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" href="#">
                          7
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" href="#">
                          8
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" href="#">
                          9
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">
                            <MdKeyboardArrowRight />
                          </span>
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          className="page-link"
                          href="#"
                          aria-label="LastPage"
                        >
                          <span aria-hidden="true">
                            <MdKeyboardDoubleArrowRight />
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div> */}
                {/* product pagination End */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
