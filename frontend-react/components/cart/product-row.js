import React, { useState, useEffect } from 'react'
import style from '@/styles/cart-main.module.scss'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'

// sweet alert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

// icon
import { RxPlus, RxMinus, RxCross2 } from 'react-icons/rx'

export function ProductRow({ v, imgSrc, productName, color, price }) {
  const { items, incrementItemById, decrementItemById, removeItemById } =
    useCart()

  // notifyAndRemove 定義此函數名稱為跳出訊息並執行刪除
  const notifyAndRemove = (productName, product_id) => {
    MySwal.fire({
      title: '你確定嗎?',
      text: '此動作將無法復原!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      confirmButtonText: '是的，請刪除。',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: '已刪除!',
          text: productName + '已從購物車中移除',
          icon: 'success',
        })
        // 這裡做刪除的動作
        removeItemById(product_id)
      }
    })
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
          <button
            className={style['qt-minus']}
            onClick={() => {
              // 如果使用者按下-按鈕，預先計算商品的數量會變多少
              const nextQty = v.qty - 1
              // 下一個(即將改變)的商品數量會變為0的話，移除此商品
              if (nextQty === 0) {
                // removeItemById(v.id)
                // 改為以下對話盒，使用者確定後才會執行刪除
                notifyAndRemove(v.product_name, v.product_id)
              } else {
                decrementItemById(v.product_id)
              }
            }}
          >
            <RxMinus />
          </button>
          <div className={style['pro-qty-2']}>
            <input
              className={style['qt-input']}
              type="text"
              value={v.qty} // 使用value屬性設置input的值
            />
          </div>
          <button
            className={style['qt-plus']}
            onClick={() => {
              incrementItemById(v.product_id)
            }}
          >
            <RxPlus />
          </button>
        </div>
      </td>
      <td className={style['cart-full-price']}>{`NT$ ${price * v.qty}`}</td>
      <td className={style['cart-close']}>
        <div className={style['cross-icon']}>
          <button
            onClick={() => {
              // removeItemById(v.id)
              // +
              // notifySA(v.name)
              // 改為以下對話盒，使用者確定後才會執行刪除
              notifyAndRemove(v.product_name, v.product_id)
            }}
          >
            <RxCross2 size={15} /> 移除
          </button>
        </div>
      </td>
    </tr>
  )
}
