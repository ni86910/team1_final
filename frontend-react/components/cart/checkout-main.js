import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { Button, Modal, Form } from 'react-bootstrap'
import style from '@/styles/cart-checkout-main.module.scss'
import { useRouter } from 'next/router'

// hooks
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/context/auth-context'
import { usePoints } from '@/context/points-context'

// 7-11 門市
import { useShip711StoreOpener } from '@/hooks/use-ship-711-store'

// icon
import { FaRegHeart, FaPlus, FaRegCreditCard } from 'react-icons/fa6'
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io'

// 圖片路徑
import { IMG_PATH } from '@/configs'

export default function CheckoutMain() {
  const { auth } = useAuth()
  const router = useRouter()
  // use-cart hook
  const { items, calcTotalItems, calcTotalPrice, myPoints, setMyPoints } =
    useCart()

  // 閱讀購買須知後才可送出訂單
  const [membershipTermsChecked, setMembershipTermsChecked] = useState(false)

  // 變更資料彈窗
  const [showModal, setShowModal] = useState(false)
  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => {
    setShowModal(true)
    // 在這裡改變連結的樣式
    // const memberTermsLink = document.querySelector(`.${style['']}`)
  }
  const [shippingMethod, setShippingMethod] = useState(1) // 預設運送方式為 7-ELEVEN 取貨

  // useShip711StoreOpener的第一個傳入參數是"伺服器7-11運送商店用Callback路由網址"
  // 指的是node(express)的對應api路由。詳情請見說明文件:
  const { store711, openWindow, closeWindow } = useShip711StoreOpener(
    'http://localhost:3001/shipment/711',
    { autoCloseMins: 3 } // x分鐘沒完成選擇會自動關閉，預設5分鐘。
  )

  // send order
  const handleSubmitOrder = (event) => {
    event.preventDefault() // 防止表單提交預設行為
  }

  // 當 checkbox 被點擊時更新狀態
  const handleMembershipTermsChange = (event) => {
    setMembershipTermsChecked(event.target.checked)
  }

  // 使用 useRef hook 創建 ref
  const purchaseNotesRef = useRef(null)
  const purchaseOrder = useRef(null)

  return (
    <>
      <section className={`${style['checkout']} ${style['spad']}`}>
        <div className={`container`}>
          <Form
            className={`row`}
            onSubmit={(event) => handleSubmitOrder(event)}
          >
            {/* Left 結帳詳細區塊 */}
            <div
              ref={purchaseOrder}
              id="purchaseOrder"
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
                        {shippingMethod === 1 ? (
                          <>
                            <span className={style['pickUpWay']}>
                              <img
                                width="20px"
                                height="20px"
                                src={`${IMG_PATH}/delivery-7-eleven.png`}
                                className={`me-3`}
                                alt=""
                              />
                              7-ELEVEN 取貨
                            </span>
                            <span className={style['price-highlight']}>
                              NT${' '}
                              <span className={style['sevenElevenFee']}>
                                {60}
                              </span>
                            </span>
                            <p style={{ marginTop: '15px' }}>
                              <button
                                style={{
                                  backgroundColor: '#E6E6E6',
                                  color: '#EB6234',
                                  width: '90px',
                                  height: '40px',
                                  border: '1px solid #EB6234',
                                  borderRadius: '5px',
                                  marginBottom: '15px',
                                  letterSpacing: '2px',
                                  fontWeight: '700',
                                }}
                                onClick={() => {
                                  openWindow()
                                }}
                              >
                                選擇門市
                              </button>
                              <br />
                              門市名稱:{' '}
                              <input
                                type="text"
                                value={store711.storename}
                                disabled
                              />
                              <br />
                              門市地址:{' '}
                              <input
                                type="text"
                                value={store711.storeaddress}
                                disabled
                              />
                            </p>
                          </>
                        ) : (
                          <>
                            <span className={style['pickUpWay']}>
                              <img
                                width="40px"
                                height="40px"
                                src={`${IMG_PATH}/delivery-truck.png`}
                                className={`me-2`}
                                alt=""
                              />
                              宅配
                            </span>
                            <span className={style['price-highlight']}>
                              NT${' '}
                              <span className={style['deliveryFee']}>{80}</span>
                            </span>
                            <p style={{ marginTop: '15px' }}>
                              <div className={style['checkout-BlockRow']}>
                                <div>803 高雄市苓雅區***路123號</div>
                                <div>蔡*紓 (+886)0912****12</div>
                              </div>
                            </p>
                          </>
                        )}
                      </div>
                      <button
                        style={{
                          color: '#F1600D',
                          background: '#ffffff',
                          border: 'none',
                          width: '100px',
                          height: '50px',
                          fontSize: '18px',
                          fontWeight: '700',
                        }}
                        onClick={handleShowModal}
                      >
                        變更 <IoIosArrowForward />
                      </button>
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
                    <div className={style['checkout-payment']}>
                      <div className={`row ${style['cash-area']}`}>
                        <label>
                          <input
                            type="radio"
                            className={`my-3 me-2`}
                            id="cash"
                            name="payment"
                            Value={10}
                            checked
                          />
                          貨到付款
                        </label>
                      </div>
                      <div className={`row ${style['line-pay-area']}`}>
                        <label>
                          <input
                            type="radio"
                            className={`my-3 me-2`}
                            id="linepay"
                            name="payment"
                            Value={11}
                          />
                          Line-pay
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 付款方式 end */}
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
                    商品金額<span>NT$ {calcTotalPrice().toLocaleString()}</span>
                  </li>
                  <li>
                    點數折抵後 (使用{myPoints}點) NT$
                    <span>
                      {(calcTotalPrice() - myPoints).toLocaleString()}
                    </span>
                  </li>
                  <li>
                    運費{' '}
                    <span className={style['deliveryFee']}>
                      <span className={style['pickUpWay']}>
                        {shippingMethod === 1 ? '' : ''}
                      </span>
                      NT$ {shippingMethod === 1 ? '60' : '80'}
                    </span>
                  </li>
                </ul>
                <ul>
                  <li>
                    總計{' '}
                    <span className={style['price-highlight']}>
                      NT${' '}
                      {shippingMethod === 1
                        ? (calcTotalPrice() - myPoints + 60).toLocaleString()
                        : (calcTotalPrice() - myPoints + 80).toLocaleString()}
                    </span>
                  </li>
                </ul>
                <hr />
                <div className={style['checkout-products-detail']}>
                  購買清單 (共<span>{calcTotalItems()}</span>件){' '}
                  <IoIosArrowDown />
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
                      checked={membershipTermsChecked}
                      onChange={handleMembershipTermsChange}
                    />
                    <span className={style['CheckMark']} />
                  </label>
                  <label htmlFor="membershipTerms" className={`col-11`}>
                    我已經閱讀並同意
                    <Link
                      href="#purchaseNotes"
                      style={{
                        color: '#EB6234',
                        textDecoration: 'underline',
                        fontWeight: '800',
                      }}
                    >
                      以下
                    </Link>
                    購買須知、會員權益聲明、隱私權及網站使用條款
                  </label>
                </div>
              </div>
              <div
                className={`row justify-content-center ms-3 mb-3 ${style['confirm-order-btn']}`}
              >
                <Button
                  type="submit" // 將 type 設為 button，避免表單自動提交
                  className={style['confirm-order-btn']}
                  disabled={!membershipTermsChecked}
                  onClick={(event) => {
                    if (!membershipTermsChecked) {
                      window.alert('請先勾選已閱讀購物須知')
                    } else {
                      handleSubmitOrder(event)
                    }
                  }}
                >
                  <FaRegCreditCard size={20} /> 送出訂單
                </Button>
              </div>
            </div>
            {/* 購物須知 */}
            <div
              ref={purchaseNotesRef}
              id="purchaseNotes"
              className={style['checkout-BlockContainer']}
            >
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
                  <p>
                    感謝您撥空詳閱本站購物須知!{' '}
                    <Link
                      href="#purchaseOrder"
                      style={{
                        color: '#EB6234',
                        textDecoration: 'underline',
                        fontWeight: '700',
                      }}
                    >
                      請繼續您的訂購流程
                    </Link>
                  </p>
                  <p />
                </div>
              </div>
            </div>
          </Form>
        </div>

        {/* Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>請選擇收貨方式</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={`container`}>
              <div className={`row`}>
                <label>
                  <input
                    type="radio"
                    className={`my-3 me-2`}
                    id="sevenEleven"
                    name="sevenEleven"
                    value={1}
                    checked={shippingMethod === 1}
                    onChange={() => {
                      setShippingMethod(1)
                      handleCloseModal() // 關閉 Modal
                    }}
                  />
                  7-ELEVEN 取貨{' '}
                  <span style={{ color: '#EB6234', fontWeight: '700' }}>
                    NT$ 60
                  </span>
                </label>
                <label>
                  <input
                    type="radio"
                    className={`my-3 me-2`}
                    id="cash"
                    name="cash"
                    value={2}
                    checked={shippingMethod === 2}
                    onChange={() => {
                      setShippingMethod(2)
                      handleCloseModal() // 關閉 Modal
                    }}
                  />
                  宅配{' '}
                  <span style={{ color: '#EB6234', fontWeight: '700' }}>
                    NT$ 80
                  </span>
                </label>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={handleCloseModal}
              className={`btn ${style['confirm-order-btn']}`}
            >
              取消
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  )
}
