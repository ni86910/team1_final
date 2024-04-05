import React, { useState } from 'react'
import style from '@/styles/order-confirmation-main.module.scss'
import { IMG_PATH } from '@/configs'

export default function OrderConfirmationMain() {
  return (
    <>
      <section className={`${style['order-confirmation']} ${style['spad']}`}>
        <div className={`container pt-3`}>
          {/* 感謝收到訂單 */}
          <div className={style['order-confirmation-content']}>
            <div className={`row justify-content-center`}>
              <img
                src={`${IMG_PATH}/materials/thankyou.png`}
                alt=""
                style={{ height: 700, width: 700 }}
              />
            </div>
            <div className={style['order-confirmation-message']}>
              <div className={`mb-2 ${style['order-number']}`}>
                <h5 className={`row justify-content-center`}>
                  訂單編號:
                  <span className={`row justify-content-center`}>
                    #35789621
                  </span>
                </h5>
              </div>
              <h2 className={`row justify-content-center mb-3`}>
                感謝您的購買!
              </h2>
              <h4 className={`row justify-content-center mb-2`}>
                您將會在短期內收到一封訂單確認通知郵件。
              </h4>
              <h4 className={`row justify-content-center mb-4`}>
                請點選以下查詢訂單，確認商品備貨狀態。
              </h4>
            </div>
            <div
              className={`d-flex justify-content-center ${style['order-confirmation-button']}`}
            >
              <button
                type="button"
                className={`btn btn-lg col-3 mb-5 me-2 ${style['backtoshop-btn']}`}
              >
                返回商城
              </button>
              <button
                type="button"
                className={`btn btn-lg col-3 mb-5 ms-2 ${style['checkorders-btn']}`}
              >
                查詢訂單
              </button>
            </div>
          </div>
          {/* 您可能也會喜歡 */}
          <div className={style['recommend-products']}>
            <div className={style['recommend-products-title']}>
              <h3>您可能也會喜歡...</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
