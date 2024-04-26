import React, { useState, useEffect } from 'react'
import style from '@/styles/cart-main.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { API_SERVER } from '../common/config'
import { ProductRow } from './product-row'
// hooks
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/context/auth-context'
import { usePoints } from '@/context/points-context'

// sweet alert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

// icon
import { IoReturnDownBackOutline } from 'react-icons/io5'
import { MdShoppingCartCheckout } from 'react-icons/md'

export default function CartMain() {
  const { auth } = useAuth()
  const router = useRouter()
  // use-cart hook
  const { items, calcTotalItems, calcTotalPrice, myPoints, setMyPoints } =
    useCart()

  // 控制點數折抵 toggle button
  const [isToggled, setIsToggled] = useState(false)
  const handleToggleSwitchChange = () => {
    setIsToggled(!isToggled)
    if (isToggled) {
      setMyPoints(0)
    } else {
      setMyPoints(totalPoints)
    }
  }

  // 使用會員積分
  const { totalPoints } = usePoints()

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
                    {items.map((v, i) => {
                      return (
                        <ProductRow
                          v={v}
                          key={v.product_id}
                          imgSrc={`/img/products/${
                            v.image.includes(',')
                              ? v.image.split(',')[0]
                              : v.image
                          }`}
                          productName={v.product_name}
                          spec={`F`} //規格id=帶出product_name尚未處理
                          price={v.price}
                        />
                      )
                    })}
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
                        <span className={style['cart-point-points']}>
                          {totalPoints}
                        </span>
                        點
                      </div>
                      <div className={`col-6 ${style['cart-point-input']}`}>
                        <label htmlFor="input_id">- NT$</label>
                        {isToggled ? (
                          <input
                            type="number"
                            placeholder=" "
                            value={myPoints}
                            onChange={(e) => {
                              setMyPoints(e.target.value)
                            }}
                            max={totalPoints}
                            onBlur={() => {
                              if (myPoints > totalPoints) {
                                setMyPoints(totalPoints)
                              }
                            }}
                          />
                        ) : (
                          <input
                            type="text"
                            placeholder=" "
                            value={0}
                            disabled
                          />
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
                      商品金額{' '}
                      <span>NT$ {calcTotalPrice().toLocaleString()}</span>
                    </li>
                    <li>
                      點數折抵(使用 {myPoints} 點) <span>- NT$ {myPoints}</span>
                    </li>
                    <li>
                      小計{' '}
                      <span className={style['cart-total-subtotal']}>
                        NT$ {(calcTotalPrice() - myPoints).toLocaleString()}
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
