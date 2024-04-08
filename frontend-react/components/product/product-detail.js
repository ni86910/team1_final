import React, { useState } from 'react'
import style from '@/styles/product-detail.module.scss'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'
import { FaRegHeart, FaPlus, FaCartArrowDown } from 'react-icons/fa6'
import { RxPlus, RxMinus, RxCross2 } from 'react-icons/rx'
import { IMG_PATH } from '@/configs'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'

export default function ProductDetail() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Shop Details Section Begin */}
      <section className={`${style['shop-detail']} ${style['spad']}`}>
        <div className={`container px-2`}>
          <div className={`row`}>
            <div className={`col-lg-12 mt-5`}>
              {/* <div
                className={`justify-content-center ${style['product-detail-breadcrumb']}`}
              >
                <a href="#">首頁</a>
                <a href="#">健康商城</a>
                <span>商品詳細</span>
              </div> */}
            </div>
            {/* Product Gallery Section Start */}
            <div
              className={`col-xs-12 col-md-6 ${style['product-gallery-section']}`}
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
                      src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                      alt=""
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                      alt=""
                    />{' '}
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                      alt=""
                    />{' '}
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                      alt=""
                    />{' '}
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                      alt=""
                    />{' '}
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
                      src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                      alt=""
                    />{' '}
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                      alt=""
                    />{' '}
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                      alt=""
                    />{' '}
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                      alt=""
                    />{' '}
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={`${IMG_PATH}/product_yoga_11_00_00.webp`}
                      alt=""
                    />{' '}
                  </SwiperSlide>
                </Swiper>
              </div>
              <br />
            </div>
            {/* Product Gallery Section End */}
            {/* Product Options Section Start */}
            <div className={`col-xs-12 col-md-6 ${style['product-info']}`}>
              <div className={`row ${style['product-detail-text']}`}>
                <h2>女款棉質透氣訓練緊身褲</h2>
                <h4>
                  NT$ 1,270.00 <span>NT$ 1,370</span>
                </h4>
              </div>
              <div className={`row ${style['product-detail-option']}`}>
                <div className={` ${style['product-detail-option-spec']}`}>
                  <p
                    className={``}
                    style={{ fontWeight: 700, marginBottom: '10px' }}
                  >
                    請選擇規格:
                  </p>
                  <div className={`${style['choose-spec']}`}>
                    <ul className={`d-flex`}>
                      <li className={`col-4`}>1</li>
                      <li className={`col-4`}>2</li>
                      <li className={`col-4`}>3</li>
                    </ul>
                  </div>
                </div>
                <div className={`row ${style['product-details-options-qty']}`}>
                  {/* 數量增減的框還沒加上 */}
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
                        onClick={() => {
                          setCount(count - 1)
                        }}
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
                        onClick={() => {
                          setCount(count + 1)
                        }}
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
                      <span style={{ color: '#EB6234' }}>23</span>
                    </li>
                    <li>
                      <span style={{ color: '#999999' }}>商品分類:</span>{' '}
                      <span style={{ color: '#EB6234' }}>
                        服飾及配件＞配件專區
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              {/* 加入購物車/立即結帳按鈕 Start */}
              <div className="row d-flex justify-content-center">
                <Link href="#" className={`col-6 ${style['add-to-cart-btn']}`}>
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
              <p style={{ marginBottom: '80px' }}>
                產品原名為Sato緊身褲，我們參考使用者的回饋全新設計Stretch緊身褲。更耐穿，更不透明，還可以讓你在運動提升自信。雙腿間搭配鑲布襯料，穿著更舒適。加寬腰帶，更為平坦。新款剪裁可貼合任何身形，提供最大的舒適感受。你會愛上這款全新Stretch緊身褲
              </p>
            </div>
            {/* Product Options Section End */}
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
                  href="//product-detail"
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
                  href="//product-detail"
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
