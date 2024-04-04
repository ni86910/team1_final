import React, { useState } from 'react'
import Link from 'next/link'
import style from '@/styles/cart-checkout-main.module.scss'
import { FaRegHeart, FaPlus, FaRegCreditCard } from 'react-icons/fa6'
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io'

export default function CheckoutMain() {
  return (
    <>
      <section className={`${style['checkout']} ${style['spad']}`}>
        <div className={`container`}>
          <div className={`row`}>
            {/* Left 結帳詳細區塊 */}
            <div
              className={`col-lg-8 col-sm-12 ${style['checkout-left-section']}`}
            >
              <h3>結帳詳細</h3>
              <div className={`row`}>
                <div className={style['checkout-BlockContainer']}>
                  <div className={style['checkout-MaskContainer']}>
                    <div className={style['checkout-BlockTitle']}>
                      <h5>
                        運送方式 <span className={style['star-key']}>*</span>
                      </h5>
                    </div>
                    <div className={`row ${style['checkout-BlockRow']}`}>
                      <div className={`col-9 ${style['checkout-option']}`}>
                        宅配
                        <span className={style['price-highlight']}>NT$80</span>
                      </div>
                      <a
                        href="#"
                        className={`col-3 ${style['checkout-choose']}`}
                      >
                        變更 <IoIosArrowForward />
                      </a>
                    </div>
                    <div className={style['checkout-BlockRow']}>
                      <div>803 高雄市苓雅區***路123號</div>
                      <div>王*帥 (+886)0912****12</div>
                    </div>
                  </div>
                </div>
                <div className={style['checkout-BlockContainer']}>
                  <div className={style['checkout-MaskContainer']}>
                    <div className={style['checkout-BlockTitle']}>
                      <h5>
                        訂購人資訊 <span className={style['star-key']}>*</span>
                      </h5>
                    </div>
                    <div className={`row ${style['checkout-BlockRow']}`}>
                      <div className={`col-9 ${style['checkout-option']}`}>
                        Email：oce*****@gmail.com
                      </div>
                      <a
                        href="#"
                        className={`col-3 ${style['checkout-choose']}`}
                      >
                        變更 <IoIosArrowForward />
                      </a>
                    </div>
                  </div>
                </div>
                <div className={style['checkout-BlockContainer']}>
                  <div className={style['checkout-MaskContainer']}>
                    <div className={style['checkout-BlockTitle']}>
                      <h5>
                        付款方式 <span className={`star-key`}>*</span>
                      </h5>
                    </div>
                    <div className={style['checkout-BlockRow']}>
                      <div className={style['checkout-payment']}>
                        <label>
                          <input
                            type="radio"
                            id="creditCard"
                            name="payment"
                            defaultValue={1}
                            defaultChecked=""
                          />
                          信用卡一次付清
                        </label>
                      </div>
                      <div className={style['checkout-payment']}>
                        <label>
                          <input
                            type="radio"
                            id="LinePay"
                            name="payment"
                            defaultValue={2}
                          />
                          LINE Pay
                        </label>
                      </div>
                      <div className={style['checkout-payment']}>
                        <label>
                          <input
                            type="radio"
                            id="cash"
                            name="payment"
                            defaultValue={3}
                          />
                          貨到付款
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={style['checkout-BlockContainer']}>
                  <div className={style['checkout-MaskContainer']}>
                    <div className={style['checkout-BlockTitle']}>
                      <h5>
                        發票資料 <span className={style['star-key']}>*</span>
                      </h5>
                    </div>
                    <div className={style['checkout-BlockRow']}>
                      <a href="">
                        <div className={`d-flex ${style['invoice-option']}`}>
                          <span className={style['invoice-option-left']}>
                            會員載具
                          </span>
                          <span className={style['invoice-option-right']}>
                            <IoIosArrowForward />
                          </span>
                        </div>
                      </a>
                      <div className={style['invoice-subtitle']}>
                        發票中獎將以電子信箱與簡訊通知
                      </div>
                    </div>
                  </div>
                </div>
                <div className={style['checkout-BlockContainer']}>
                  <div className={style['checkout-MaskContainer']}>
                    <div className={style['checkout-BlockTitle']}>
                      <h5>購物須知</h5>
                    </div>
                    <div className={style['purchase-notes']}>
                      <p style={{ marginBottom: 0 }}>
                        <span style={{ backgroundColor: '#FF965A' }}>
                          訂單成立後，將於三日內(不含六日/國定假日)
                        </span>
                      </p>
                      <p style={{ marginBottom: 0 }}>
                        <span style={{ backgroundColor: '#FF965A' }}>
                          安排出貨，出貨狀況可於查看訂單中確認。
                          <br />
                        </span>
                        <span style={{ backgroundColor: '#FF965A' }}>
                          假期期間訂單量眾多，將於上班日起陸續安排出貨。
                          <br />
                        </span>
                        <span style={{ backgroundColor: '#FF965A' }}>
                          若您願意等候，歡迎下單選購。
                          <br />
                          <br />
                        </span>
                      </p>
                      <span style={{ color: '#0000ff' }}>
                        * * * 下列購物須知，請您詳閱 * * *
                      </span>
                      <p style={{ marginBottom: 0 }}></p>
                      <p>
                        1. 訂單一經成立後將於 上班日起
                        陸續安排出貨，恕無法指定出貨日與配送時間，亦或延後、保留。
                      </p>
                      <p>配送時間說明：</p>
                      <p>【宅配】約２～３天(不含六日及國定假日)</p>
                      <p>【超商取貨】約２～５個工作天會送達您指定的超商門市</p>
                      <p>
                        2. 基於確保消費者購物資料與交易安全等因素，
                        <span style={{ color: '#ff0000' }}>
                          訂單成立後將無法變更訂單商品內容，取消訂單也無法恢復
                        </span>
                        ，若需更改訂單內容與付款方式，還請您取消訂單後重新下單即可，可至【會員專區→查看訂單→申請取消訂單】。
                      </p>
                      <p>
                        3.
                        已成立訂單【尚未安排出貨】為前提，如欲申請取消訂單約5~10分鐘後，商品庫存會自動回補庫存，效期內可用之點數也會一併自動歸還至您的帳戶。
                      </p>
                      <p>
                        4.
                        如遇缺貨或商品無法出貨時，客服人員將會以電話與您聯絡。
                      </p>
                      <p>感謝您撥空詳閱本站購物須知</p>
                      <p />
                    </div>
                  </div>
                </div>
              </div>
              {/* <Link href={}>返回購物車</Link> */}
            </div>
            {/* Right 訂單金額總計 */}
            <div
              className={`col-lg-4 col-sm-12 ${style['checkout-right-section']}`}
            >
              <div className={style['checkout-order']}>
                <div className={style['checkout-BlockTitle']}>
                  <h5>付款明細</h5>
                  <hr />
                </div>
                <ul>
                  <li>
                    商品金額 <span> NT$ 1,091</span>
                  </li>
                  <li>
                    點數折抵 (使用91點) <span>NT$ 1,000</span>
                  </li>
                  <li>
                    運費 <span>NT$ 80</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    總計{' '}
                    <span className={style['price-highlight']}>NT$ 1,080</span>
                  </li>
                </ul>
                <hr />
                <div className={style['checkout-products-detail']}>
                  購買清單 (共<span>4</span>件) <IoIosArrowDown />
                </div>
              </div>
              <div className={style['BlockContainer']}>
                <div className={`row ${style['TermsAndConditionsContainer']}`}>
                  <label
                    htmlFor="membershipTerms"
                    className={`col-1 ${style['CheckBoxContainer']}`}
                  >
                    <input
                      id="membershipTerms"
                      name="membershipTerms"
                      type="checkbox"
                      className={style['InputCheckBox']}
                      //defaultChecked={true} // 或者省略這個屬性，表示不預選中
                    />
                    <span className={style['CheckMark']} />
                  </label>
                  <label htmlFor="membershipTerms" className={`col-11`}>
                    我已經閱讀並同意以上購買須知、
                    <a href="#" className={style['TermsAndConditionsLink']}>
                      <span>會員權益聲明</span>
                    </a>{' '}
                    與{' '}
                    <a href="#" className={style['TermsAndConditionsLink']}>
                      <span>隱私權及網站使用條款</span>
                    </a>
                  </label>
                </div>
              </div>
              <div
                className={`row justify-content-center ${style['confirm-order-btn']}`}
              >
                <a href="#">
                  <FaRegCreditCard size={20} /> 送出訂單
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
