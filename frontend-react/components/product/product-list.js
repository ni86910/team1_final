import React from 'react'
import style from '@/styles/product-list.module.scss'
import { FaRegHeart, FaPlus, FaSearch } from 'react-icons/fa6'
import { IMG_PATH } from '@/configs'

export default function ProductList() {
  return (
    <>
      <section className={`${style.shop} ${style.spad}`}>
        <div className={`container-fluid ${style['shop-product-display']}`}>
          <div className={`row`}>
            <div className={`col-lg-3`}>
              <div className={`${style['shop-sidebar']}`}>
                <div className={style['shop-sidebar-search']}>
                  <form action="#">
                    <input
                      className={`col-9`}
                      type="text"
                      placeholder="請輸入商品關鍵字..."
                    />
                    <button
                      type="submit"
                      className={`col-3 ${style['search-icon']}`}
                    >
                      搜尋
                    </button>
                  </form>
                </div>
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
              </div>
            </div>
            <div className={`col-lg-9`}>
              <div className={style['shop-product-option']}>
                <div className={`row`}>
                  <div className={`col-lg-6 col-md-6 col-sm-6`}>
                    <div className={style['shop-product-option-left']}>
                      <p>顯示第 1–12 筆結果 (共 126 筆)</p>
                    </div>
                  </div>
                  <div
                    className={`col-lg-3 col-md-3 col-sm-3 d-flex justify-content-end`}
                  >
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
                  <div
                    className={`col-lg-3 col-md-3 col-sm-3 d-flex justify-content-start`}
                  >
                    <div className={style['shop-product-option-right-qty']}>
                      <select>
                        <option value="" active="">
                          每頁顯示72個
                        </option>
                        <option value="">每頁顯示48個</option>
                        <option value="">每頁顯示24個</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {/* 產品區塊 Begin */}
              <div className={`row`}>
                <div className={`col-lg-4 col-md-6 col-sm-6`}>
                  <div className={style['product-item']}>
                    <div
                      className={`${style['product-item-pic']} ${style['set-bg']}`}
                    >
                      <img
                        src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                        alt=""
                      />
                      <ul className={style['product-hover']}>
                        <li>
                          <a href="#">
                            <FaRegHeart />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className={style['product-item-text']}>
                      <h6>平衡瑜珈墊</h6>
                      <a href="#" className={style['add-cart']}>
                        <FaPlus /> 加入購物車
                      </a>
                      <h5>NT$ 1,200</h5>
                    </div>
                  </div>
                </div>
                <div className={`col-lg-4 col-md-6 col-sm-6`}>
                  <div className={`${style['product-item']} ${style['sale']}`}>
                    <div
                      className={`${style['product-item-pic']} ${style['set-bg']}`}
                    >
                      <img
                        src="img/fitsu_products/product_yoga_01_00_00.webp"
                        alt=""
                      />
                      <span className={style['label']}>特價</span>
                      <ul className={style['product-hover']}>
                        <li>
                          <a href="#">
                            <FaRegHeart />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className={style['product-item-text']}>
                      <h6>靈巧瑜珈網</h6>
                      <a href="#" className={style['add-cart']}>
                        <FaPlus /> 加入購物車
                      </a>
                      <h5>NT$ 590</h5>
                    </div>
                  </div>
                </div>
                <div className={`col-lg-4 col-md-6 col-sm-6`}>
                  <div className={style['product-item`']}>
                    <div className={`product-item-pic set-bg`}>
                      <img
                        src="img/fitsu_products/product_yoga_02_00_00.webp"
                        alt=""
                      />
                      <ul className={`product-hover`}>
                        <li>
                          <a href="#">
                            <FaRegHeart />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className={style['product-item-text']}>
                      <h6>靈活瑜珈磚</h6>
                      <a href="#" className={style['add-cart']}>
                        <FaPlus /> 加入購物車
                      </a>
                      <h5>NT$ 499</h5>
                    </div>
                  </div>
                </div>
                <div className={`col-lg-4 col-md-6 col-sm-6`}>
                  <div className={`${style['product-item']} ${style['sale']}`}>
                    <div className={`product-item-pic set-bg`}>
                      <img
                        src="img/fitsu_products/product_yoga_03_00_00.jpg"
                        alt=""
                      />
                      <span className={`label`}>Sale</span>
                      <ul className={`product-hover`}>
                        <li>
                          <a href="#">
                            <img src="img/icon/heart.png" alt="" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className={`product-item-text`}>
                      <h6>心靈瑜珈帷</h6>
                      <a href="#" className={`add-cart`}>
                        <FaPlus /> 加入購物車
                      </a>
                      <h5>NT$ 899</h5>
                    </div>
                  </div>
                </div>
                <div className={`col-lg-4 col-md-6 col-sm-6`}>
                  <div className={style['product-item`']}>
                    <div className={`product-item-pic set-bg`}>
                      <img
                        src="img/fitsu_products/product_yoga_07_00_00.webp"
                        alt=""
                      />
                      <ul className={`product-hover`}>
                        <li>
                          <a href="#">
                            <FaRegHeart />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className={`product-item-text`}>
                      <h6>柔美瑜珈布</h6>
                      <a href="#" className={`add-cart`}>
                        <FaPlus /> 加入購物車
                      </a>
                      <h5>NT$ 399</h5>
                    </div>
                  </div>
                </div>
                <div className={`col-lg-4 col-md-6 col-sm-6`}>
                  <div className={style['product-item`']}>
                    <div className={`product-item-pic set-bg`}>
                      <img
                        src="img/fitsu_products/product_yoga_08_00_00.webp"
                        alt=""
                      />
                      <ul className={`product-hover`}>
                        <li>
                          <a href="#">
                            <img src="img/icon/heart.png" alt="" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className={`product-item-text`}>
                      <h6>靜心瑜珈筒</h6>
                      <a href="#" className={`add-cart`}>
                        <FaPlus /> 加入購物車
                      </a>
                      <h5>NT$ 469</h5>
                    </div>
                  </div>
                </div>
                <div className={`col-lg-4 col-md-6 col-sm-6`}>
                  <div className={style['product-item`']}>
                    <div className={`product-item-pic set-bg`}>
                      <img
                        src="img/fitsu_products/product_yoga_15_00.webp"
                        alt=""
                      />
                      <ul className={`product-hover`}>
                        <li>
                          <a href="#">
                            <FaRegHeart />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className={`product-item-text`}>
                      <h6>柔韌瑜珈帶</h6>
                      <a href="#" className={`add-cart`}>
                        <FaPlus /> 加入購物車
                      </a>
                      <h5>NT$ 299</h5>
                    </div>
                  </div>
                </div>
                <div className={`col-lg-4 col-md-6 col-sm-6`}>
                  <div className={`product-item sale`}>
                    <div className={`product-item-pic set-bg`}>
                      <img
                        src="img/fitsu_products/product_yoga_13_00_00.webp"
                        alt=""
                      />
                      <span className={`label`}>Sale</span>
                      <ul className={`product-hover`}>
                        <li>
                          <a href="#">
                            <FaRegHeart />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className={`product-item-text`}>
                      <h6>靈動瑜珈條</h6>
                      <a href="#" className={`add-cart`}>
                        <FaPlus /> 加入購物車
                      </a>
                      <h5>NT$ 399</h5>
                    </div>
                  </div>
                </div>
                <div className={`col-lg-4 col-md-6 col-sm-6`}>
                  <div className={style['product-item`']}>
                    <div className={`product-item-pic set-bg`}>
                      <img
                        src="img/fitsu_products/product_yoga_06_00_00.webp"
                        alt=""
                      />
                      <ul className={`product-hover`}>
                        <li>
                          <a href="#">
                            <FaRegHeart />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className={`product-item-text`}>
                      <h6>自在瑜珈綁</h6>
                      <a href="#" className={`add-cart`}>
                        <FaPlus /> 加入購物車
                      </a>
                      <h5>NT$ 199</h5>
                    </div>
                  </div>
                </div>
                <div className={`col-lg-4 col-md-6 col-sm-6`}>
                  <div className={`product-item sale`}>
                    <div className={`product-item-pic set-bg`}>
                      <img
                        src="img/fitsu_products/product_yoga_15_01_00.webp"
                        alt=""
                      />
                      <span className={`label`}>特價</span>
                      <ul className={`product-hover`}>
                        <li>
                          <a href="#">
                            <FaRegHeart />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className={`product-item-text`}>
                      <h6>瑜珈瑜珈瑜珈</h6>
                      <a href="#" className={`add-cart`}>
                        <FaPlus /> 加入購物車
                      </a>
                      <h5>NT$ 100</h5>
                    </div>
                  </div>
                </div>
                <div className={`col-lg-4 col-md-6 col-sm-6`}>
                  <div className={style['product-item`']}>
                    <div className={`product-item-pic set-bg`}>
                      <img
                        src="img/fitsu_products/product_yoga_13_01_00.webp"
                        alt=""
                      />
                      <ul className={`product-hover`}>
                        <li>
                          <a href="#">
                            <FaRegHeart />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className={`product-item-text`}>
                      <h6>輕盈瑜珈球</h6>
                      <a href="#" className={`add-cart`}>
                        <FaPlus /> 加入購物車
                      </a>
                      <h5>NT$ 350</h5>
                    </div>
                  </div>
                </div>
                <div className={`col-lg-4 col-md-6 col-sm-6`}>
                  <div className={style['product-item`']}>
                    <div className={`product-item-pic set-bg`}>
                      <img
                        src="img/fitsu_products/product_yoga_04_00_00.webp"
                        alt=""
                      />
                      <ul className={`product-hover`}>
                        <li>
                          <a href="#">
                            <FaRegHeart />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className={`product-item-text`}>
                      <h6>yogayogayoga</h6>
                      <a href="#" className={`add-cart`}>
                        <FaPlus /> 加入購物車
                      </a>
                      <h5>NT$ 499</h5>
                    </div>
                  </div>
                </div>
              </div>
              {/* 產品區塊 End */}

              {/* product pagination Begin */}
              <nav aria-label="Page navigation example">
                <ul className="pagination mb-4">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">«</span>
                      <span className={`sr-only`}>Previous</span>
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
                      <span aria-hidden="true">»</span>
                      <span className="sr-only">Next</span>
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
