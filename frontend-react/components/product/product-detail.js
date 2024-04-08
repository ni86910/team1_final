import React, { useState } from 'react'
import { IMG_PATH } from '@/configs'
import { FaRegHeart, FaPlus } from 'react-icons/fa6'
import style from '@/styles/product-detail.module.scss'
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
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <>
      {/* Shop Details Section Begin */}
      <section className={`${style['shop-detail']} ${style['spad']}`}>
        <div className={`container px-5`}>
          <div className={`row`}>
            <div className={`col-lg-12`}>
              <div
                className={`justify-content-center ${style['product-detail-breadcrumb']}`}
              >
                <a href="#">首頁</a>
                <a href="#">健康商城</a>
                <span>商品詳細</span>
              </div>
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
            {/* Product Options Section Start */}
            <div className={`col-xs-12 col-md-6 ${style['product-info']}`}>
              <div className={style['product-detail-text']}>
                <h2>女款棉質透氣訓練緊身褲</h2>
                <h4>
                  NT$ 1,270.00 <span>NT$ 1,370</span>
                </h4>
                <div className={style['product-detail-option']}>
                  <div className={style['product-detail-option-spec']}>
                    <span
                      className={`row justify-content-start`}
                      style={{ fontWeight: 700, marginBottom: '10px' }}
                    >
                      請選擇規格:
                    </span>
                    <div className={`row ${style['choose-spec']}`}>
                      <ul className={`d-flex justify-content-start`}>
                        <a
                          href="#"
                          className={`col-4 ${style['choose-spec-option']}`}
                        >
                          1
                        </a>
                        <a
                          href="#"
                          className={`col-4 ${style['choose-spec-option']}`}
                        >
                          2
                        </a>
                        <a
                          href="#"
                          className={`col-4 ${style['choose-spec-option']}`}
                        >
                          3
                        </a>
                      </ul>
                    </div>
                  </div>
                  <div className={style['product-details-options-qty']}>
                    {/* 數量增減的框還沒加上 */}
                    <span
                      className="row justify-content-start"
                      style={{
                        fontWeight: 700,
                        marginTop: '30px',
                        marginBottom: '10px',
                      }}
                    >
                      數量:
                    </span>
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  <button
                    href="#"
                    className={`col-6 ${style['add-to-cart-btn']}`}
                  >
                    加入購物車
                  </button>
                  <button
                    href="#"
                    className={`col-6 ${style['primary-checkout-btn']}`}
                  >
                    立即結帳
                  </button>
                </div>
              </div>
              <div className={style['product-details-btns-option']}>
                <a href="#">
                  <FaRegHeart /> 加入我的收藏
                </a>{' '}
              </div>
              <div className={style['product-details-last-option']}>
                <ul>
                  <li>
                    <span>庫存數量:</span> 23
                  </li>
                  <li>
                    <span>商品分類:</span> 服飾及配件＞配件專區
                  </li>
                </ul>
              </div>
              <hr />
              <p>
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
              <div className={style['related-product-item']}>
                <div
                  className={`${style['related-product-item-pic']} ${style['set-bg']}`}
                >
                  <img src="img/products/product_acc_01_00_00.jpg" alt="" />
                  <span className={style['label']}>新品</span>
                  <ul className={style['product-hover']}>
                    <li>
                      <a href="#">
                        <FaRegHeart />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className={style['related-product-item-text']}>
                  <h6>Piqué Biker Jacket</h6>
                  <a href="#" className={style['add-cart']}>
                    <FaPlus /> 加入購物車
                  </a>
                  <h5>$67.24</h5>
                </div>
              </div>
            </div>
            <div className={`col-lg-3 col-md-6 col-sm-6 col-sm-6`}>
              <div className={style['related-product-item']}>
                <div
                  className={`${style['related-product-item-pic']} ${style['set-bg']}`}
                >
                  <img src="img/products/product_relax_02_00_00.webp" alt="" />
                  <ul className={style['product-hover']}>
                    <li>
                      <a href="#">
                        <FaRegHeart />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className={style['related-product-item-text']}>
                  <h6>Piqué Biker Jacket</h6>
                  <a href="#" className={style['add-cart']}>
                    <FaPlus /> 加入購物車
                  </a>
                  <h5>$67.24</h5>
                </div>
              </div>
            </div>
            <div className={`col-lg-3 col-md-6 col-sm-6 col-sm-6`}>
              <div
                className={`${style['related-product-item']} ${style['sale']}`}
              >
                <div
                  className={`${style['related-product-item-pic']} ${style['set-bg']}`}
                >
                  <img src="img/products/product_bottle_01_01_00.webp" alt="" />
                  <span className={style['label']}>特惠</span>
                  <ul className={style['product-hover']}>
                    <li>
                      <a href="#">
                        <FaRegHeart />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className={style['related-product-item-text']}>
                  <h6>Multi-pocket Chest Bag</h6>
                  <a href="#" className={style['add-cart']}>
                    <FaPlus /> 加入購物車
                  </a>
                  <h5>$43.48</h5>
                </div>
              </div>
            </div>
            <div className={`col-lg-3 col-md-6 col-sm-6 col-sm-6`}>
              <div className={style['related-product-item']}>
                <div
                  className={`${style['related-product-item-pic']} ${style['set-bg']}`}
                >
                  <img src="img/products/product_bag_02_00_00.webp" alt="" />
                  <ul className={style['product-hover']}>
                    <li>
                      <a href="#">
                        <FaRegHeart />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className={style['related-product-item-text']}>
                  <h6>Diagonal Textured Cap</h6>
                  <a href="#" className={style['add-cart']}>
                    <FaPlus /> 加入購物車
                  </a>
                  <h5>$60.9</h5>
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
