import React, { useState } from 'react'
import style from '@/styles/register.module.scss'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'
import validator from 'validator'
import Link from 'next/link'
/* Bootstrap */
import { Button, Modal, Form } from 'react-bootstrap'
import { FaStarOfLife } from 'react-icons/fa6'

import { REGISTER_POST } from '@/components/common/config'
import { useRouter } from 'next/router'


export default function RegisterPage() {
  const router = useRouter()
  // 會員條款
  const [showModal, setShowModal] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // 驗證
  const [data, setData] = useState({
    m_name: '',
    m_account: '',
    m_pwd: '',
    mobile: '',
    address: '',
  })
  const [errors, setErrors] = useState({
    m_name: '',
    m_account: '',
    m_pwd: '',
    mobile: '',
    address: '',
  })

  // 整個表單有沒有通過檢查
  const [isPass, setIsPass] = useState(false)
  // 驗證表單字段
  const validateFields = () => {
    const newErrors = {}
    if (validator.isEmpty(data.m_name, { ignore_whitespace: true })) {
      newErrors.m_name = '名稱為必填欄位'
    } else if (!validator.isLength(data.m_name, { min: 2 })) {
      newErrors.m_name = '名稱不得小於2字元'
    }

    if (validator.isEmpty(data.m_account, { ignore_whitespace: true })) {
      newErrors.m_account = '帳號為必填欄位'
    } else if (!validator.isEmail(data.m_account)) {
      newErrors.m_account = '電子郵件格式不正確'
    }

    if (validator.isEmpty(data.m_pwd, { ignore_whitespace: true })) {
      newErrors.m_pwd = '密碼為必填欄位'
    } else if (
      !validator.isStrongPassword(data.m_pwd, {
        minLength: 5, // 最小字元數
        minLowercase: 1, // 最少要幾個小寫英文字元
        minUppercase: 0, // 最少要幾個大寫英文字元
        minNumbers: 0, // 最少要幾個數字
        minSymbols: 0, // 最少要幾個符號
      })
    ) {
      newErrors.m_pwd = '密碼至少5個字元，要包含一個英文小寫字元'
    }

    if (validator.isEmpty(data.mobile, { ignore_whitespace: true })) {
      newErrors.mobile = '手機為必填欄位'
    } else if (!validator.isMobilePhone(data.mobile, 'zh-TW')) {
      newErrors.mobile = '手機號碼格式不正確'
    }

    if (validator.isEmpty(data.address, { ignore_whitespace: true })) {
      newErrors.address = '地址為必填欄位'
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === '')
  }

  const onSubmit = async (e) => {
    e.preventDefault() // 表單不要以傳統方式送出

    if (!validateFields()) {
      return
    }
    const { m_account, m_pwd } = data
    if (isPass) {
      const r = await fetch(REGISTER_POST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await r.json()

      console.log(result)
      if (result.success) {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: '註冊成功',
          showConfirmButton: false,
          timer: 2000,
        })
        router.push('/member/login')
      } else {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: '註冊失敗',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    } else {
      toast.error('必填欄位請填入符合格式的值', {
        duration: 2000,
        style: {
          backgroundColor: 'black',
          color: 'white',
        },
      })
    }
    if (!agreedToTerms) {
      toast.error('請勾選會員條款', {
        duration: 2000,
        style: {
          backgroundColor: 'black',
          color: 'white',
        },
      })
      return // 停止表單提交
    }
  }

  // 處理輸入框變化
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }
  // 處理輸入框失去焦點
  const handleBlur = (e) => {
    validateFields()
  }

  // 會員條款的彈窗
  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => {
    setShowModal(true)
    // 在這裡改變連結的樣式
    const memberTermsLink = document.querySelector(`.${style['member-terms']}`)
    memberTermsLink.style.color = 'orange'
  }

  return (
    <>
      <section className={style['regist-section']}>
        <style jsx>{`
          .error {
            color: red;
            font-size: 13px;
          }
        `}</style>
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
                      <form name="form1" onSubmit={onSubmit}>
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
                              type="text"
                              id="m_name"
                              className="form-control"
                              name="m_name"
                              placeholder="請輸入名稱"
                              value={data.m_name}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <div className="error">{errors.m_name}</div>
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
                              type="email"
                              id="m_account"
                              className="form-control"
                              name="m_account"
                              placeholder="請輸入信箱"
                              value={data.m_account}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <div className="error">{errors.m_account}</div>
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
                              type="password"
                              id="m_pwd"
                              className="form-control"
                              name="m_pwd"
                              placeholder="請輸密碼"
                              value={data.m_pwd}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="error">{errors.m_pwd}</div>
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
                            <Form.Select
                              name="gender"
                              aria-label="Default select example"
                              value={data.gender}
                              onChange={handleChange}
                            >
                              <option select="">請選擇</option>
                              <option value="男">男生</option>
                              <option value="女">女生</option>
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
                              type="date"
                              id="birthday"
                              className="form-control"
                              name="birthday"
                              value={data.birthday}
                              onChange={handleChange}
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
                              type="text"
                              id="mobile"
                              className="form-control"
                              name="mobile"
                              placeholder="請輸入手機號碼"
                              value={data.mobile}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="error">{errors.mobile}</div>
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
                              type="text"
                              className="form-control"
                              id="address"
                              name="address"
                              col={20}
                              rows={2}
                              value={data.address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="error">{errors.address}</div>
                          </div>
                        </div>
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                          />
                          <Link
                            href="#"
                            className={style['member-terms']}
                            onClick={handleShowModal}
                          >
                            我已詳閱會員條款
                          </Link>
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
      <Toaster />

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
          <Button
            onClick={handleCloseModal}
            className={`btn ${style['register-btn']}`}
          >
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
