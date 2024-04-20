import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCart } from '@/hooks/use-cart'

import Link from 'next/link'
import style from '@/styles/product-detail.module.scss'
import { FaRegHeart, FaPlus, FaCartArrowDown } from 'react-icons/fa6'
import { RxPlus, RxMinus, RxCross2 } from 'react-icons/rx'
import { IMG_PATH } from '@/configs'
import { API_SERVER } from '../common/config'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'

export default function ProductDetail() {
  const { addItem } = useCart()

  const router = useRouter()
  const [products, setProducts] = useState([])
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [count, setCount] = useState(1)

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1) // 減少count，但最小值只能是1
    }
  }
  const handleIncrease = () => {
    setCount(count + 1) // 增加count
  }

  useEffect(() => {
    //取得動態路由的值
    const p_id = router.query.p_id
    // 呈現資料的 function
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_SERVER}/product/${p_id}`, {
          credentials: 'include',
        })
        if (response.ok) {
          const data = await response.json()
          setProducts(data) // 注意這裡根據後端返回的格式修改
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
  }, [router, router.isReady]) // 當 currentPage 改變時再次呼叫 useEffect)

  // 取得 query string 的資料
  const qs = { ...router.query }

  return (
    <>
      {/* Shop Details Section Begin */}
      <section className={`${style['shop-detail']} ${style['spad']}`}>
        <div className={`container px-2`}>
          <div className={`row`}>
            {!products ? (
              <div>loading...</div>
            ) : (
              products.map((v) => (
                <>
                  <div
                    className={`col-xs-12 col-md-6 mt-5 ${style['product-gallery-section']}`}
                  >
                    <div className={style['swiper-wrapper']}>
                      <Swiper
                        style={{
                          '--swiper-navigation-color': '#EB6234',
                          '--swiper-pagination-color': '#EB6234',
                        }}
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: false,
                        }}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
                        className="mySwiper2"
                      >
                        <br />
                        <SwiperSlide>
                          <img
                            src={`/img/products/${
                              v.image.includes(',')
                                ? v.image.split(',')[0]
                                : v.image
                            }`}
                            alt=""
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img
                            src={`/img/products/${
                              v.image.includes(',')
                                ? v.image.split(',')[1]
                                : v.image
                            }`}
                            alt=""
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img
                            src={`/img/products/${
                              v.image.includes(',')
                                ? v.image.split(',')[2]
                                : v.image
                            }`}
                            alt=""
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img
                            src={`/img/products/${
                              v.image.includes(',')
                                ? v.image.split(',')[3]
                                : v.image
                            }`}
                            alt=""
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img
                            src={`/img/products/${
                              v.image.includes(',')
                                ? v.image.split(',')[4]
                                : v.image
                            }`}
                            alt=""
                          />
                        </SwiperSlide>
                      </Swiper>
                      <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                      >
                        <SwiperSlide>
                          <img
                            src={`/img/products/${
                              v.image.includes(',')
                                ? v.image.split(',')[0]
                                : v.image
                            }`}
                            alt=""
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img
                            src={`/img/products/${
                              v.image.includes(',')
                                ? v.image.split(',')[1]
                                : v.image
                            }`}
                            alt=""
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img
                            src={`/img/products/${
                              v.image.includes(',')
                                ? v.image.split(',')[2]
                                : v.image
                            }`}
                            alt=""
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img
                            src={`/img/products/${
                              v.image.includes(',')
                                ? v.image.split(',')[3]
                                : v.image
                            }`}
                            alt=""
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img
                            src={`/img/products/${
                              v.image.includes(',')
                                ? v.image.split(',')[4]
                                : v.image
                            }`}
                            alt=""
                          />
                        </SwiperSlide>
                      </Swiper>
                    </div>
                    <br />
                  </div>

                  <div
                    className={`col-xs-12 col-md-6 mt-5 ${style['product-info']}`}
                  >
                    <div className={`row ${style['product-detail-text']}`}>
                      <h2>{v.product_name}</h2>
                      <h4>NT$ {v.price}</h4>
                    </div>
                    <div className={`row ${style['product-detail-option']}`}>
                      <div
                        className={` ${style['product-detail-option-spec']}`}
                      >
                        <p
                          className={``}
                          style={{ fontWeight: 700, marginBottom: '10px' }}
                        >
                          請選擇規格:
                        </p>
                        <div className={`${style['choose-spec']}`}>
                          <ul className={`d-flex`}>
                            <li className={`col-4`}>F</li>
                          </ul>
                        </div>
                      </div>
                      <div
                        className={`row ${style['product-details-options-qty']}`}
                      >
                        <p
                          className={``}
                          style={{
                            fontWeight: 700,
                            marginTop: '30px',
                            marginBottom: '10px',
                          }}
                        >
                          數量:
                        </p>
                        <div className={style['quantity-item']}>
                          <div className={style['quantity']}>
                            <button
                              className={style['qt-minus']}
                              onClick={handleDecrease}
                            >
                              <RxMinus />
                            </button>
                            <div className={style['pro-qty-2']}>
                              <input
                                className={style['qt-input']}
                                type="text"
                                Value={count}
                              />
                            </div>
                            <button
                              className={style['qt-plus']}
                              onClick={handleIncrease}
                            >
                              <RxPlus />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className={style['product-details-stock-cate']}>
                        <ul>
                          <li>
                            <span style={{ color: '#999999' }}>庫存數量:</span>{' '}
                            <span style={{ color: '#EB6234' }}>
                              {v.product_quantity}
                            </span>
                          </li>
                          {/* <li>
                            <span style={{ color: '#999999' }}>商品分類:</span>{' '}
                            <span style={{ color: '#EB6234' }}>
                              服飾及配件＞配件專區
                            </span>
                          </li> */}
                        </ul>
                      </div>
                    </div>
                    {/* 加入購物車/立即結帳按鈕 Start */}
                    <div className="row d-flex justify-content-center">
                      <Link
                        href="#"
                        className={`col-6 ${style['add-to-cart-btn']}`}
                        onClick={(e) => {
                          e.preventDefault()
                          addItem(v, count)
                        }}
                      >
                        加入購物車
                      </Link>
                      <Link
                        href="/cart/checkout"
                        className={`col-6 ${style['primary-checkout-btn']}`}
                      >
                        立即結帳
                      </Link>
                    </div>
                    {/* 加入購物車/立即結帳按鈕 End */}

                    <div
                      className={`d-flex justify-content-center ${style['product-details-btn-option']}`}
                    >
                      <Link href="#">
                        <FaRegHeart /> 加入我的收藏
                      </Link>
                    </div>
                    <hr />
                    <p style={{ marginBottom: '80px' }}>{v.description}</p>
                  </div>
                </>
              ))
            )}
          </div>
        </div>
      </section>
      {/* Shop Details Section End */}

      {/* Related Section Begin */}
      <section className={`${style.related} ${style.spad}`}>
        <div className={`container`}>
          <div className={`row`}>
            <div className={`col-lg-12`}>
              <h3 className={style['related-title']}>相關產品</h3>
            </div>
          </div>
          <div className={`row`}>
            <div className={`col-lg-3 col-md-6 col-sm-6 col-sm-6`}>
              <div className={style['product-item']}>
                <Link
                  href={`/product/${products.product_id}`}
                  className={`${style['product-item-pic']} ${style['set-bg']}`}
                >
                  <img
                    src={`${IMG_PATH}/product_apparel_19_00_02.webp`}
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
            </div>
            <div className={`col-lg-3 col-md-6 col-sm-6 col-sm-6`}>
              <div className={style['product-item']}>
                <Link
                  href={`/product/${products.product_id}`}
                  className={`${style['product-item-pic']} ${style['set-bg']}`}
                >
                  <img src={`${IMG_PATH}/product_drink_02_00_01.jpg`} alt="" />
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
                    href={`/product/${products.product_id}`}
                    className={`${style['product-item-title']}`}
                  >
                    <p>平衡瑜珈墊11111</p>
                  </Link>
                  <span>NT$ 1,200</span>
                </div>
              </div>
            </div>
            <div className={`col-lg-3 col-md-6 col-sm-6 col-sm-6`}>
              <div className={style['product-item']}>
                <Link
                  href={`/product/${products.product_id}`}
                  className={`${style['product-item-pic']} ${style['set-bg']}`}
                >
                  <img src={`${IMG_PATH}/product_gym_09_01_00.webp`} alt="" />
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
            </div>
            <div className={`col-lg-3 col-md-6 col-sm-6 col-sm-6`}>
              <div className={style['product-item']}>
                <Link
                  href="//product-detail"
                  className={`${style['product-item-pic']} ${style['set-bg']}`}
                >
                  <img src={`${IMG_PATH}/product_yoga_05_00_02.webp`} alt="" />
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
            </div>
          </div>
        </div>
      </section>
      {/* Related Section End */}
    </>
  )
}
