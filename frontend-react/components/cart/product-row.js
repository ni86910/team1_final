import React, { useState, useEffect } from 'react'
import style from '@/styles/cart-main.module.scss'
import Link from 'next/link'
import { RxPlus, RxMinus, RxCross2 } from 'react-icons/rx'

export function ProductRow({ imgSrc, productName, color, price }) {
  const [count, setCount] = useState(1) // 使用useState來追蹤每個<tr>的count狀態

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1) // 減少count，但最小值只能是1
    }
  }

  const handleIncrease = () => {
    setCount(count + 1) // 增加count
  }
  return (
    <tr>
      <td className={style['product-cart-item']}>
        <div className={style['product-cart-item-pic']}>
          <img src={imgSrc} alt="" />
        </div>
        <div className={style['product-cart-item-text']}>
          <h6>{productName}</h6>
          <span>{color}</span>
          <h5>{price}</h5>
        </div>
      </td>
      <td className={style['quantity-item']}>
        <div className={style['quantity']}>
          <button className={style['qt-minus']} onClick={handleDecrease}>
            <RxMinus />
          </button>
          <div className={style['pro-qty-2']}>
            <input
              className={style['qt-input']}
              type="text"
              value={count} // 使用value屬性設置input的值
            />
          </div>
          <button className={style['qt-plus']} onClick={handleIncrease}>
            <RxPlus />
          </button>
        </div>
      </td>
      <td className={style['cart-full-price']}>{`NT$ ${price * count}`}</td>
      <td className={style['cart-close']}>
        <div className={style['cross-icon']}>
          <RxCross2 size={15} />
        </div>
      </td>
    </tr>
  )
}
