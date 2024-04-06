import React, { useState } from 'react'
import style from '@/styles/register.module.scss'
import Image from 'next/image'
import { Button, Modal, Form } from 'react-bootstrap'
import { FaStarOfLife } from 'react-icons/fa6'

export default function RegisterPage() {
  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)

  return (
    <>
      <section className={style['regist-section']}>
        <div className="col-6">
          <div className={style['regist-headline']}>
            <h2>會員專區</h2>
            <div style={{ margin: '20px 0px' }}>
              請選擇註冊方式，現在加入菲特友，健康跟著加倍有。
            </div>
            <div className={style['regist-form']}>
              <div className="row justify-content-center">
                <div>
                  <div className="card">
                    <div className={`card-header ${style['register-text']}`}>
                      會員註冊
                    </div>
                    <div className="card-body">
                      <form action="#" method="#">
                        <button
                          type="submit"
                          className={`btn ${style['google-btn']}`}
                        >
                          <span className="glyphicon glyphicon-remove" />
                          <Image
                            className={style['google-img']}
                            src="/img/member/google.png"
                            width={20}
                            height={20}
                            alt="google"
                          />
                          使用Google快速註冊
                        </button>
                        <br />
                        <br />
                        <div className={style['straight-line']} />
                        <br />
                        <div className={`form-group row ${style['form-box']}`}>
                          <label
                            htmlFor="m_name"
                            className={`col-md-4 col-form-label text-md-right ${style['label-text']}`}
                          >
                            <FaStarOfLife className={style['icon-padding']} />
                            會員名稱
                          </label>
                          <div className="col-md-6">
                            <input
                              style={{ borderRadius: '10px' }}
                              type="text"
                              id="m_name"
                              className="form-control"
                              name="m_name"
                              placeholder="請輸入名稱"
                            />
                          </div>
                        </div>
                        <div className={`form-group row ${style['form-box']}`}>
                          <label
                            htmlFor="m_account"
                            className={`col-md-4 col-form-label text-md-right ${style['label-text']}`}
                          >
                            <FaStarOfLife className={style['icon-padding']} />
                            會員帳號
                          </label>
                          <div className="col-md-6">
                            <input
                              style={{ borderRadius: '10px' }}
                              type="email"
                              id="m_account"
                              className="form-control"
                              name="m_account"
                              placeholder="請輸入信箱"
                              required=""
                            />
                          </div>
                        </div>
                        <div className={`form-group row ${style['form-box']}`}>
                          <label
                            htmlFor="m_pwd"
                            className={`col-md-4 col-form-label text-md-right ${style['label-text']}`}
                          >
                            <FaStarOfLife className={style['icon-padding']} />
                            會員密碼
                          </label>
                          <div className="col-md-6">
                            <input
                              style={{ borderRadius: '10px' }}
                              type="password"
                              id="m_pwd"
                              className="form-control"
                              name="m_pwd"
                              placeholder="請輸入4-6位數密碼"
                              required=""
                            />
                          </div>
                        </div>
                        <div className={`form-group row ${style['form-box']}`}>
                          <label
                            htmlFor="gender"
                            className={`col-md-4 col-form-label text-md-right ${style['label-text']}`}
                          >
                            <FaStarOfLife className={style['icon-padding']} />
                            性別
                          </label>
                          <div className="col-md-6">
                            <Form.Select aria-label="Default select example">
                              <option selected="">請選擇</option>
                              <option value="0">男生</option>
                              <option value="1">女生</option>
                            </Form.Select>
                          </div>
                        </div>
                        <div className={`form-group row ${style['form-box']}`}>
                          <label
                            htmlFor="birthday"
                            className={`col-md-4 col-form-label text-md-right ${style['label-text']}`}
                          >
                            <FaStarOfLife className={style['icon-padding']} />
                            生日
                          </label>
                          <div className="col-md-6">
                            <input
                              style={{ borderRadius: '10px' }}
                              type="date"
                              id="birthday"
                              className="form-control"
                              name="birthday"
                            />
                          </div>
                        </div>
                        <div className={`form-group row ${style['form-box']}`}>
                          <label
                            htmlFor="mobile"
                            className={`col-md-4 col-form-label text-md-right ${style['label-text']}`}
                          >
                            <FaStarOfLife className={style['icon-padding']} />
                            手機
                          </label>
                          <div className="col-md-6">
                            <input
                              style={{ borderRadius: '10px' }}
                              type="text"
                              id="mobile"
                              className="form-control"
                              name="mobile"
                              placeholder="請輸入手機號碼"
                              required=""
                            />
                          </div>
                        </div>
                        <div className={`form-group row ${style['form-box']}`}>
                          <label
                            htmlFor="address"
                            className={`col-md-4 col-form-label text-md-right ${style['label-text']}`}
                          >
                            <FaStarOfLife className={style['icon-padding']} />
                            地址
                          </label>
                          <div className="col-md-6">
                            <textarea
                              style={{ borderRadius: '10px' }}
                              type="text"
                              className="form-control"
                              id="address"
                              name="address"
                              col={20}
                              rows={2}
                              defaultValue={''}
                            />
                          </div>
                        </div>
                        <div className="checkbox">
                          <input type="checkbox" defaultValue="" />
                          <a
                            className={style['member-terms']}
                            onClick={handleShowModal}
                          >
                            我已詳閱會員條款
                          </a>
                        </div>
                        <button
                          type="submit"
                          className={`btn ${style['register-btn']}`}
                        >
                          <span className="glyphicon glyphicon-off" />
                          註冊
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Fit-U 會員條款</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Member-Terms */}
          <div>
            會員資格：
            <ul>
              <li>1.1 申請加入本健身房的會員必須年滿18歲。</li>
              <li>1.2 會員必須填寫完整且準確的個人資料。</li>
              <li>
                1.3
                健身房保留拒絕或撤銷會員資格的權利，若發現會員提供的資訊不實或違反會員條款。
              </li>
              會費與付款：{' '}
              <li>
                2.1
                會員應按時繳納會費，逾期未繳納會費的會員將被停止使用健身房設施。
              </li>
              <li>2.2 會員應遵守健身房設施的使用規定，並保護設施不被損壞。</li>
              安全注意事項：{' '}
              <li>
                3.1 在使用健身房設施時，請遵循健身教練的指導，以避免受傷。
              </li>{' '}
              <li>3.2 未成年人應在成年監護人的陪同下使用健身房設施。</li>{' '}
              責任限制：{' '}
              <li>4.1 健身房不對會員在健身過程中可能遭受的任何傷害負責。</li>{' '}
              <li>
                4.2 會員應自行購買適當的保險，以應對可能發生的意外或傷害。
              </li>{' '}
              其他條款：
              <li>
                5.健身房保留修改會員條款的權利，修改後的條款將在健身房網站上公布。
              </li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
