import React from 'react'
import Link from 'next/link'
import style from '@/styles/product-list.module.scss'
import { FaRegHeart, FaCartArrowDown, FaPlus, FaSearch } from 'react-icons/fa6'
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md'
import { IoIosSearch } from 'react-icons/io'
import { IMG_PATH } from '@/configs'

export default function ProductList() {
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
                        商品分類
                      </label>
                      <ul className={style['accordion-child']}>
                        <li>
                          <label>
                            <input type="checkbox" /> All - 全部商品
                            <span>(105)</span>
                          </label>
                        </li>
                        <li className={style['main-cate']}>
                          <a href="">室內健身</a>
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
                          <a href="">營養補給品</a>
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
                          <a href="">服飾及配件</a>
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
                          <a href="">智能運動系列</a>
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
                        性別
                      </label>
                      <ul className={style['accordion-child']}>
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
                        服飾配件尺寸
                      </label>
                      <ul className={style['accordion-child']}>
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
                        價格區間
                      </label>
                      <ul className={style['accordion-child']}>
                        <div className={style['sc-original']}>
                          (原始區間：NT$150
                          <span className={style['sc-dash']}>-</span>
                          NT$2,290)
                        </div>
                        <div className={style['sc-range']}>
                          <div className={style['sc-bdy']}>
                            <p className={style['sc-text']}>最低</p>
                            <input
                              type="number"
                              min={0}
                              className={style['sc-input']}
                              defaultValue=""
                            />
                          </div>
                          <div className={style['sc-range']}> － </div>
                          <div className={style['sc-bdy']}>
                            <p className={style['sc-text']}>最高</p>
                            <input
                              type="number"
                              min={0}
                              className={style['sc-input']}
                              defaultValue=""
                            />
                          </div>
                        </div>
                        <div className={style['sc-btn-filter']}>
                          <button type="button" className={style['sc-btn']}>
                            篩選
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
                  <div className={`col-lg-6 col-md-6 col-sm-6`}>
                    <div className={style['shop-product-option-left']}>
                      <p>
                        顯示第 <span>1</span> – <span>12</span> 筆結果 (共{' '}
                        <span>105</span> 筆)
                      </p>
                    </div>
                  </div>
                  <div className={`col-lg-3 col-md-3 col-sm-3`}>
                    <div className={style['shop-product-option-right-sort']}>
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
                  </div>
                  <div className={`col-lg-3 col-md-3 col-sm-3`}>
                    <div className={style['shop-product-option-right-qty']}>
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
                {/* 產品區塊 Begin */}
                <div className={`row`}>
                  <div className={`col-lg-4 col-md-6 col-sm-6`}>
                    <div className={style['product-item']}>
                      <Link
                        href="//product-detail"
                        className={`${style['product-item-pic']} ${style['set-bg']}`}
                      >
                        <img
                          src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                          alt=""
                        />
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
                          <Link
                            href="#"
                            style={{ color: '#ffffff', fontSize: '18px' }}
                          >
                            <FaCartArrowDown />
                          </Link>
                        </ul>
                      </Link>
                      <div className={`mt-3 ${style['product-item-text']}`}>
                        <Link
                          href="/product/product-detail"
                          className={`${style['product-item-title']}`}
                        >
                          <h5>平衡瑜珈墊11111</h5>
                        </Link>
                        <span>NT$ 1,200</span>
                      </div>
                    </div>
                  </div>
                  <div className={`col-lg-4 col-md-6 col-sm-6`}>
                    <div className={style['product-item']}>
                      <Link
                        href="//product-detail"
                        className={`${style['product-item-pic']} ${style['set-bg']}`}
                      >
                        <img
                          src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                          alt=""
                        />
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
                          <Link
                            href="#"
                            style={{ color: '#ffffff', fontSize: '18px' }}
                          >
                            <FaCartArrowDown />
                          </Link>
                        </ul>
                      </Link>
                      <div className={`mt-3 ${style['product-item-text']}`}>
                        <Link
                          href="/product/product-detail"
                          className={`${style['product-item-title']}`}
                        >
                          <h5>平衡瑜珈墊11111</h5>
                        </Link>
                        <span>NT$ 1,200</span>
                      </div>
                    </div>
                  </div>
                  <div className={`col-lg-4 col-md-6 col-sm-6`}>
                    <div className={style['product-item']}>
                      <Link
                        href="//product-detail"
                        className={`${style['product-item-pic']} ${style['set-bg']}`}
                      >
                        <img
                          src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                          alt=""
                        />
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
                          <Link
                            href="#"
                            style={{ color: '#ffffff', fontSize: '18px' }}
                          >
                            <FaCartArrowDown />
                          </Link>
                        </ul>
                      </Link>
                      <div className={`mt-3 ${style['product-item-text']}`}>
                        <Link
                          href="/product/product-detail"
                          className={`${style['product-item-title']}`}
                        >
                          <h5>平衡瑜珈墊11111</h5>
                        </Link>
                        <span>NT$ 1,200</span>
                      </div>
                    </div>
                  </div>
                  <div className={`col-lg-4 col-md-6 col-sm-6`}>
                    <div className={style['product-item']}>
                      <Link
                        href="//product-detail"
                        className={`${style['product-item-pic']} ${style['set-bg']}`}
                      >
                        <img
                          src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                          alt=""
                        />
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
                          <Link
                            href="#"
                            style={{ color: '#ffffff', fontSize: '18px' }}
                          >
                            <FaCartArrowDown />
                          </Link>
                        </ul>
                      </Link>
                      <div className={`mt-3 ${style['product-item-text']}`}>
                        <Link
                          href="/product/product-detail"
                          className={`${style['product-item-title']}`}
                        >
                          <h5>平衡瑜珈墊11111</h5>
                        </Link>
                        <span>NT$ 1,200</span>
                      </div>
                    </div>
                  </div>
                  <div className={`col-lg-4 col-md-6 col-sm-6`}>
                    <div className={style['product-item']}>
                      <Link
                        href="//product-detail"
                        className={`${style['product-item-pic']} ${style['set-bg']}`}
                      >
                        <img
                          src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                          alt=""
                        />
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
                          <Link
                            href="#"
                            style={{ color: '#ffffff', fontSize: '18px' }}
                          >
                            <FaCartArrowDown />
                          </Link>
                        </ul>
                      </Link>
                      <div className={`mt-3 ${style['product-item-text']}`}>
                        <Link
                          href="/product/product-detail"
                          className={`${style['product-item-title']}`}
                        >
                          <h5>平衡瑜珈墊11111</h5>
                        </Link>
                        <span>NT$ 1,200</span>
                      </div>
                    </div>
                  </div>
                  <div className={`col-lg-4 col-md-6 col-sm-6`}>
                    <div className={style['product-item']}>
                      <Link
                        href="//product-detail"
                        className={`${style['product-item-pic']} ${style['set-bg']}`}
                      >
                        <img
                          src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                          alt=""
                        />
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
                          <Link
                            href="#"
                            style={{ color: '#ffffff', fontSize: '18px' }}
                          >
                            <FaCartArrowDown />
                          </Link>
                        </ul>
                      </Link>
                      <div className={`mt-3 ${style['product-item-text']}`}>
                        <Link
                          href="/product/product-detail"
                          className={`${style['product-item-title']}`}
                        >
                          <h5>平衡瑜珈墊11111</h5>
                        </Link>
                        <span>NT$ 1,200</span>
                      </div>
                    </div>
                  </div>
                  <div className={`col-lg-4 col-md-6 col-sm-6`}>
                    <div className={style['product-item']}>
                      <Link
                        href="//product-detail"
                        className={`${style['product-item-pic']} ${style['set-bg']}`}
                      >
                        <img
                          src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                          alt=""
                        />
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
                          <Link
                            href="#"
                            style={{ color: '#ffffff', fontSize: '18px' }}
                          >
                            <FaCartArrowDown />
                          </Link>
                        </ul>
                      </Link>
                      <div className={`mt-3 ${style['product-item-text']}`}>
                        <Link
                          href="/product/product-detail"
                          className={`${style['product-item-title']}`}
                        >
                          <h5>平衡瑜珈墊11111</h5>
                        </Link>
                        <span>NT$ 1,200</span>
                      </div>
                    </div>
                  </div>
                  <div className={`col-lg-4 col-md-6 col-sm-6`}>
                    <div className={style['product-item']}>
                      <Link
                        href="//product-detail"
                        className={`${style['product-item-pic']} ${style['set-bg']}`}
                      >
                        <img
                          src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                          alt=""
                        />
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
                          <Link
                            href="#"
                            style={{ color: '#ffffff', fontSize: '18px' }}
                          >
                            <FaCartArrowDown />
                          </Link>
                        </ul>
                      </Link>
                      <div className={`mt-3 ${style['product-item-text']}`}>
                        <Link
                          href="/product/product-detail"
                          className={`${style['product-item-title']}`}
                        >
                          <h5>平衡瑜珈墊11111</h5>
                        </Link>
                        <span>NT$ 1,200</span>
                      </div>
                    </div>
                  </div>
                  <div className={`col-lg-4 col-md-6 col-sm-6`}>
                    <div className={style['product-item']}>
                      <Link
                        href="//product-detail"
                        className={`${style['product-item-pic']} ${style['set-bg']}`}
                      >
                        <img
                          src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                          alt=""
                        />
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
                          <Link
                            href="#"
                            style={{ color: '#ffffff', fontSize: '18px' }}
                          >
                            <FaCartArrowDown />
                          </Link>
                        </ul>
                      </Link>
                      <div className={`mt-3 ${style['product-item-text']}`}>
                        <Link
                          href="/product/product-detail"
                          className={`${style['product-item-title']}`}
                        >
                          <h5>平衡瑜珈墊11111</h5>
                        </Link>
                        <span>NT$ 1,200</span>
                      </div>
                    </div>
                  </div>
                  <div className={`col-lg-4 col-md-6 col-sm-6`}>
                    <div className={style['product-item']}>
                      <Link
                        href="//product-detail"
                        className={`${style['product-item-pic']} ${style['set-bg']}`}
                      >
                        <img
                          src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                          alt=""
                        />
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
                          <Link
                            href="#"
                            style={{ color: '#ffffff', fontSize: '18px' }}
                          >
                            <FaCartArrowDown />
                          </Link>
                        </ul>
                      </Link>
                      <div className={`mt-3 ${style['product-item-text']}`}>
                        <Link
                          href="/product/product-detail"
                          className={`${style['product-item-title']}`}
                        >
                          <h5>平衡瑜珈墊11111</h5>
                        </Link>
                        <span>NT$ 1,200</span>
                      </div>
                    </div>
                  </div>
                  <div className={`col-lg-4 col-md-6 col-sm-6`}>
                    <div className={style['product-item']}>
                      <Link
                        href="//product-detail"
                        className={`${style['product-item-pic']} ${style['set-bg']}`}
                      >
                        <img
                          src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                          alt=""
                        />
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
                          <Link
                            href="#"
                            style={{ color: '#ffffff', fontSize: '18px' }}
                          >
                            <FaCartArrowDown />
                          </Link>
                        </ul>
                      </Link>
                      <div className={`mt-3 ${style['product-item-text']}`}>
                        <Link
                          href="/product/product-detail"
                          className={`${style['product-item-title']}`}
                        >
                          <h5>平衡瑜珈墊11111</h5>
                        </Link>
                        <span>NT$ 1,200</span>
                      </div>
                    </div>
                  </div>
                  <div className={`col-lg-4 col-md-6 col-sm-6`}>
                    <div className={style['product-item']}>
                      <Link
                        href="//product-detail"
                        className={`${style['product-item-pic']} ${style['set-bg']}`}
                      >
                        <img
                          src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                          alt=""
                        />
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
                          <Link
                            href="#"
                            style={{ color: '#ffffff', fontSize: '18px' }}
                          >
                            <FaCartArrowDown />
                          </Link>
                        </ul>
                      </Link>
                      <div className={`mt-3 ${style['product-item-text']}`}>
                        <Link
                          href="/product/product-detail"
                          className={`${style['product-item-title']}`}
                        >
                          <h5>平衡瑜珈墊11111</h5>
                        </Link>
                        <span>NT$ 1,200</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 產品區塊 End */}
              </div>
              {/* product pagination Begin */}
              <nav aria-label="Page navigation example">
                <ul className="pagination mb-4">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">
                        <MdKeyboardDoubleArrowLeft />
                      </span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="VeryFirst">
                      <span aria-hidden="true">
                        <MdKeyboardArrowLeft />
                      </span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">
                        <MdKeyboardArrowRight />
                      </span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">
                        <MdKeyboardDoubleArrowRight />
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
              {/* product pagination End */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
