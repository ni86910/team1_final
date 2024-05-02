import React, { useState } from 'react'
import Link from 'next/link'
import style from '@/styles/order-confirmation-main.module.scss'
import { IMG_PATH } from '@/configs'

export default function OrderConfirmationMain() {
  return (
    <>
      <section className={`${style['order-confirmation']} ${style['spad']}`}>
        <div className={`container pt-3 pb-5`}>
          {/* 感謝收到訂單 */}
          <div className={`d-flw ${style['order-confirmation-content']}`}>
            <div
              className={`row justify-content-center ${style['order-confirmation-img']}`}
            >
              <img
                src={`${IMG_PATH}/materials/delivery.gif`}
                alt=""
                style={{
                  height: 350,
                  width: 500,
                  marginTop: '45px',
                  marginBottom: '60px',
                }}
              />
            </div>
            <div className={style['order-confirmation-message']}>
              <div className={`mb-2 ${style['order-number']}`}>
                <h6 className={`row justify-content-center`}>
                  訂單編號:
                  <Link
                    href="#"
                    className={`row justify-content-center`}
                    style={{ color: '#EB6234' }}
                  >
                    <span className={`row justify-content-center`}>
                      #FTU000010
                    </span>
                  </Link>
                </h6>
              </div>
              <h2
                className={`row justify-content-center mt-4 mb-4`}
                style={{ fontWeight: '700' }}
              >
                感謝您的購買!
              </h2>
              <h4
                className={`row justify-content-center mb-2`}
                style={{ fontSize: '18px' }}
              >
                您將會在短期內收到一封訂單確認通知郵件。
              </h4>
              <h4
                className={`row justify-content-center mb-4`}
                style={{ fontSize: '18px' }}
              >
                請點選以下查詢訂單，確認商品備貨狀態。
              </h4>
            </div>
            <div
              className={`d-flex justify-content-center ${style['order-confirmation-button']}`}
            >
              <Link
                type="button"
                href="/product"
                className={`btn btn-lg col-3 mb-5 me-2 ${style['backtoshop-btn']}`}
              >
                返回商城
              </Link>
              <Link
                type="button"
                href="/member/order"
                className={`btn btn-lg col-3 mb-5 ms-2 ${style['checkorders-btn']}`}
              >
                查詢訂單
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
