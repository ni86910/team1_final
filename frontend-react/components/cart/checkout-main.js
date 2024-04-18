import React, { useState } from 'react'
import Link from 'next/link'
import { Button, Modal, Form } from 'react-bootstrap'

import style from '@/styles/cart-checkout-main.module.scss'
import { FaRegHeart, FaPlus, FaRegCreditCard } from 'react-icons/fa6'
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io'

export default function CheckoutMain() {
  // 變更資料彈窗
  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => {
    setShowModal(true)
    // 在這裡改變連結的樣式
    // const memberTermsLink = document.querySelector(`.${style['']}`)
  }

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
                        運送方式 <span style={{ color: '#EB6234' }}>*</span>
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
                        onClick={handleShowModal}
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
                        訂購人資訊 <span style={{ color: '#EB6234' }}>*</span>
                      </h5>
                    </div>
                    <div className={`row ${style['checkout-BlockRow']}`}>
                      <div className={`col-9 ${style['checkout-option']}`}>
                        Email：oce*****@gmail.com
                      </div>
                    </div>
                  </div>
                </div>
                {/* 付款方式 start */}
                <div className={style['checkout-BlockContainer']}>
                  <div className={style['checkout-MaskContainer']}>
                    <div className={style['checkout-BlockTitle']}>
                      <h5>
                        付款方式 <span style={{ color: '#EB6234' }}>*</span>
                      </h5>
                    </div>
                    <div className={style['checkout-BlockRow']}>
                      <div className={style['checkout-payment']}>
                        <label>
                          <input
                            type="radio"
                            className={`my-3 me-2`}
                            id="creditCard"
                            name="payment"
                            defaultValue={1}
                            defaultChecked="checked"
                          />
                          信用卡一次付清
                        </label>
                        <div className={style['PaymentCardActionContainer']}>
                          <div className={style['CreditCardContainer']}>
                            <div className={style['FieldsContainer']}>
                              <div className={style['InputField']}>
                                <div id="cardNumber">
                                  <iframe
                                    src="https://pay-panel.payments.91app.com/sdk/fields/1.2.15/index.html?%7B%22type%22%3A%22number%22%2C%22enableIcon%22%3Atrue%2C%22placeholder%22%3A%22%E4%BF%A1%E7%94%A8%E5%8D%A1%E8%99%9F%22%2C%22styles%22%3A%7B%22normal%22%3A%7B%22width%22%3A%22100%25%22%2C%22height%22%3A%2240px%22%2C%22color%22%3A%22%23000000%22%2C%22borderColor%22%3A%22%23d8d8d8%22%7D%2C%22focus%22%3A%7B%22color%22%3A%22%23000000%22%2C%22borderColor%22%3A%22%230279ff%22%7D%2C%22error%22%3A%7B%22color%22%3A%22%23000000%22%2C%22borderColor%22%3A%22%23ff5353%22%7D%2C%22success%22%3A%7B%22color%22%3A%22%23000000%22%2C%22borderColor%22%3A%22%23d8d8d8%22%7D%7D%7D"
                                    name="number"
                                    width="100%"
                                    height="40px"
                                    sandbox="allow-same-origin allow-scripts"
                                    allowTransparency="true"
                                    title="信用卡號輸入框"
                                  ></iframe>
                                </div>
                                <span className={style['InputFieldError']}>
                                  必填
                                </span>
                              </div>
                              <div className={style['InputField']}>
                                <div id="cardExpirationDate">
                                  <iframe
                                    src="https://pay-panel.payments.91app.com/sdk/fields/1.2.15/index.html?%7B%22type%22%3A%22expirationDate%22%2C%22enableIcon%22%3Atrue%2C%22placeholder%22%3A%22%E6%9C%88%E4%BB%BD%2F%E5%B9%B4%E4%BB%BD%22%2C%22styles%22%3A%7B%22normal%22%3A%7B%22width%22%3A%22100%25%22%2C%22height%22%3A%2240px%22%2C%22color%22%3A%22%23000000%22%2C%22borderColor%22%3A%22%23d8d8d8%22%7D%2C%22focus%22%3A%7B%22color%22%3A%22%23000000%22%2C%22borderColor%22%3A%22%230279ff%22%7D%2C%22error%22%3A%7B%22color%22%3A%22%23000000%22%2C%22borderColor%22%3A%22%23ff5353%22%7D%2C%22success%22%3A%7B%22color%22%3A%22%23000000%22%2C%22borderColor%22%3A%22%23d8d8d8%22%7D%7D%7D"
                                    name="expirationDate"
                                    width="100%"
                                    height="40px"
                                    sandbox="allow-same-origin allow-scripts"
                                    allowTransparency="true"
                                    title="有效日期輸入框"
                                  ></iframe>
                                </div>
                                <span className={style['InputFieldError']}>
                                  必填
                                </span>
                              </div>
                              <div className={style['InputField']}>
                                <div id="cardCCV">
                                  <iframe
                                    src="https://pay-panel.payments.91app.com/sdk/fields/1.2.15/index.html?%7B%22type%22%3A%22ccv%22%2C%22enableIcon%22%3Atrue%2C%22placeholder%22%3A%22%E6%9C%AB%E4%B8%89%E7%A2%BC%22%2C%22styles%22%3A%7B%22normal%22%3A%7B%22width%22%3A%22100%25%22%2C%22height%22%3A%2240px%22%2C%22color%22%3A%22%23000000%22%2C%22borderColor%22%3A%22%23d8d8d8%22%7D%2C%22focus%22%3A%7B%22color%22%3A%22%23000000%22%2C%22borderColor%22%3A%22%230279ff%22%7D%2C%22error%22%3A%7B%22color%22%3A%22%23000000%22%2C%22borderColor%22%3A%22%23ff5353%22%7D%2C%22success%22%3A%7B%22color%22%3A%22%23000000%22%2C%22borderColor%22%3A%22%23d8d8d8%22%7D%7D%7D"
                                    name="ccv"
                                    width="100%"
                                    height="40px"
                                    sandbox="allow-same-origin allow-scripts"
                                    allowTransparency="true"
                                    title="CSV輸入框"
                                  ></iframe>
                                </div>
                                <span className={style['InputFieldError']}>
                                  必填
                                </span>
                              </div>
                            </div>
                            <div className={style['RemeberCreditCard']}>
                              <label
                                htmlFor="rememberCreditCard"
                                className={style['CheckBoxContainer']}
                              >
                                <input
                                  id="rememberCreditCard"
                                  name="rememberCreditCard"
                                  type="checkbox"
                                  className={style['InputCheckBox']}
                                  defaultChecked=""
                                />
                                <span className={style['CheckMark']} />
                                <span className={style['LabelText']}>
                                  記住這張卡
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className={style['CreditCardStatement']}>
                          本公司將依您提供資料向銀行及持卡人照會並保留出貨權益，如冒用他人信用卡及個資，經查獲必移送法辦。
                        </div>
                      </div>
                    </div>
                    <div className={style['checkout-payment']}>
                      <label>
                        <input
                          type="radio"
                          className={`my-3 me-2`}
                          id="cash"
                          name="payment"
                          defaultValue={3}
                        />
                        貨到付款
                      </label>
                    </div>
                  </div>
                </div>
                {/* 付款方式 end */}
              </div>
            </div>
            {/* 購物須知 */}
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
                    4. 如遇缺貨或商品無法出貨時，客服人員將會以電話與您聯絡。
                  </p>
                  <p>感謝您撥空詳閱本站購物須知</p>
                  <p />
                </div>
              </div>
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
              {/* 同意會員條款 checkbox */}
              <div className={style['BlockContainer']}>
                <div className={`row ${style['TermsAndConditionsContainer']}`}>
                  <label
                    htmlFor="membershipTerms"
                    className={`col-1 ${style['CheckBoxContainer']}`}
                  >
                    {''}
                    <input
                      id="membershipTerms"
                      name="membershipTerms"
                      type="checkbox"
                      className={style['InputCheckBox']}
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
                <Link href="/cart/order-confirmation">
                  <FaRegCreditCard size={20} /> 送出訂單
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>請選擇收貨方式</Modal.Title>
          </Modal.Header>
          <Modal.Body>12345</Modal.Body>
          <Modal.Footer>
            <Button
              onClick={handleCloseModal}
              className={`btn ${style['confirm-order-btn']}`}
            >
              關閉
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  )
}
