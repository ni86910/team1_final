import React, { useState, useEffect } from 'react'
import style from '@/styles/cart-main.module.scss'
import Link from 'next/link'
import { FaRegHeart } from 'react-icons/fa6'
import { RxPlus, RxMinus, RxCross2 } from 'react-icons/rx'
import { IoReturnDownBackOutline } from 'react-icons/io5'
import { MdShoppingCartCheckout } from 'react-icons/md'
import { IMG_PATH } from '@/configs'
import { ProductRow } from './product-row'

export default function CartMain() {
  const [count, setCount] = useState(0)

  const [isToggled, setIsToggled] = useState(false)
  const handleToggleSwitchChange = () => {
    setIsToggled(!isToggled)
  }

  return (
    <>
      {/* Shopping Cart Section Begin */}
      <section className={`${style['shopping-cart']} ${style['spad']}`}>
        <div className={`container`}>
          <div className={`row`}>
            <div className={`col-lg-8`} style={{ marginTop: '30px' }}>
              <div className={style['shopping-cart-table']}>
                <table>
                  <thead>
                    <tr>
                      <th>商品名稱</th>
                      <th>購買數量</th>
                      <th>小計金額</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <ProductRow
                      imgSrc="img/products/product_drink_01_00_00.jpg"
                      productName="【現貨速出】 RIOT 機能吸凍 (柳橙) 能量飲"
                      color="Orange"
                      price={90}
                    />
                    <ProductRow
                      imgSrc="img/products/product_gym_14_00_02.webp"
                      productName="5kg 訓練彈力帶"
                      color="藍"
                      price={99}
                    />
                  </tbody>
                </table>
              </div>
              <div className={`row mb-5 ${style['continue-shopping']}`}>
                <div className={`col-lg-6 col-md-6 col-sm-6`}>
                  <div className={style['continue-btn']}>
                    <Link href="/product">
                      <IoReturnDownBackOutline size={20} /> 繼續購物{' '}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-lg-4 col-md-12`} style={{ marginTop: '30px' }}>
              {/* 會員點數折抵區塊 start */}
              <div className={style['cart-point-BlockContainer']}>
                <div className={style['cart-point-MaskContainer']}>
                  <div className={style['cart-point-BlockTitle']}>
                    <div className={`d-flex ${style['row']}`}>
                      <h5 className={`col-6 ${style['cart-point-title']}`}>
                        點數折抵
                      </h5>
                      <div className={`col-6 d-flex justify-content-end`}>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            checked={isToggled}
                            onChange={handleToggleSwitchChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault"
                          >
                            {' '}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={style['cart-point-BlockRow']}>
                    <div className={`row`}>
                      <div className={`col-6 ${style['cart-point-status']}`}>
                        可折抵
                        <span className={style['cart-point-points']}>70</span>點
                      </div>
                      <div className={`col-6 ${style['cart-point-input']}`}>
                        <label htmlFor="input_id">- NT$</label>
                        {isToggled ? (
                          <input type="text" placeholder=" " />
                        ) : (
                          <input type="text" placeholder=" " disabled />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 會員點數折抵區塊 end */}
              {/* 小計明細 start */}
              <div className={style['cart-total-BlockContainer']}>
                <div className={style['cart-total-MaskContainer']}>
                  <div className={`row ${style['cart-total-BlockTitle']}`}>
                    <h5>小計明細</h5>
                  </div>
                  <ul>
                    <li>
                      商品金額 <span>NT$ 1500</span>
                    </li>
                    <li>
                      折價券 <span>- NT$ 100</span>
                    </li>
                    <li>
                      點數折抵(使用 10 點) <span>- NT$ 10</span>
                    </li>
                    <li>
                      小計{' '}
                      <span className={style['cart-total-subtotal']}>
                        NT$ 1390
                      </span>
                    </li>
                  </ul>
                  <Link href="/cart/checkout" className={style['primary-btn']}>
                    <MdShoppingCartCheckout size={20} /> 下一步 - 結帳
                  </Link>
                </div>
              </div>
              {/* 小計明細 end */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
