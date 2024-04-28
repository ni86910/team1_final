import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { REGISTER_POST } from '@/components/common/config'
// Style
import style from '@/styles/register.module.scss'
// 套件
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'
import validator from 'validator'
/* Bootstrap */
import { Button, Modal, Form } from 'react-bootstrap'
// React-Icon
import { FaStarOfLife } from 'react-icons/fa6'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function RegisterPage() {
  const router = useRouter()
  // 會員條款
  const [showModal, setShowModal] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  // 呈現密碼用
  const [showPassword, setShowPassword] = useState(false)

  // 驗證
  const [data, setData] = useState({
    m_name: '',
    m_account: '',
    m_pwd: '',
    gender: '',
    mobile: '',
    birthday: '',
    address: '',
  })
  // 錯誤
  const [errors, setErrors] = useState({
    m_name: '',
    m_account: '',
    m_pwd: '',
    mobile: '',
  })
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

    // if (validator.isEmpty(data.address, { ignore_whitespace: true })) {
    //   newErrors.address = '地址為必填欄位'
    // }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === '')
  }

  const onSubmit = async (e) => {
    e.preventDefault() // 表單不要以傳統方式送出
    const isValid = validateFields() // 檢查所有欄位是否填寫

    if (isValid && agreedToTerms) {
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
      if (!isValid) {
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
      }
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
  const handleBlur = () => {
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

  // 一鍵輸入
  const fillFakeData = () => {
    setData({
      m_name: '第一組',
      m_account: 'a123456789@test.com',
      m_pwd: 'a123456',
      gender: '女',
      mobile: '0920240507',
      birthday: '2023-11-28',
      address: '高雄市前金區中正三路211號8樓-1',
    })
  }

  return (
    <>
      <section className={style['regist-section']}>
        <style jsx>{`
          .error {
            color: red;
            font-size: 11px;
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
                        {/* 姓名 */}
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
                        {/* 帳號 */}
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
                        {/* 密碼 */}
                        <div className={`form-group row ${style['form-box']}`}>
                          <label
                            htmlFor="m_pwd"
                            className={`col-md-4 col-form-label text-md-right ${style['label-text']}`}
                          >
                            <FaStarOfLife className={style['icon-padding']} />
                            會員密碼
                          </label>
                          <div
                            className="col-md-6"
                            style={{
                              position: 'relative',
                            }}
                          >
                            <input
                              className="form-control"
                              name="m_pwd"
                              id="m_pwd"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="請輸密碼"
                              value={data.m_pwd}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <button
                              type="button"
                              className={style['show-password']}
                              onClick={(e) => {
                                e.preventDefault()
                                setShowPassword(!showPassword)
                              }}
                            >
                              {!showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            <div className="error">{errors.m_pwd}</div>
                          </div>
                        </div>
                        {/* 性別 */}
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
                        {/* 生日 */}
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
                        {/* 手機 */}
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
                        {/* 地址 */}
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
                            />
                          </div>
                        </div>
                        {/* 會員條款 */}
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
                      <div className={`col-md-6 ${style['fake-data-col']}`}>
                        <button
                          onClick={fillFakeData}
                          className={`btn ${style['fake-data-btn']}`}
                        >
                          一鍵輸入
                        </button>
                      </div>
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
          <div className={style['modal-term-container']}>
            <h5 className={style['modal-h5']}>會員資格：</h5>
            <ul style={{ listStyle: 'none' }}>
              <div className={style['terms-text']}>
                <li>- 申請加入本健身房的會員必須年滿18歲。</li>
                <li>- 會員必須填寫完整且準確的個人資料。</li>
                <li className={style['li-text-bottom']}>
                  -
                  健身房保留拒絕或撤銷會員資格的權利，若發現會員提供的資訊不實或違反會員條款。
                </li>
              </div>
              <h5 className={style['modal-h5']}>會費與付款： </h5>
              <div className={style['terms-text']}>
                <li>
                  -
                  會員應按時繳納會費，逾期未繳納會費的會員將被停止使用健身房設施。
                </li>
                <li>- 會員應遵守健身房設施的使用規定，並保護設施不被損壞。</li>
              </div>
              <h5 className={style['modal-h5']}>責任限制： </h5>
              <div className={style['terms-text']}>
                <li>- 健身房不對會員在健身過程中可能遭受的任何傷害負責。</li>{' '}
                <li>
                  - 會員應自行購買適當的保險，以應對可能發生的意外或傷害。
                </li>{' '}
              </div>
              <h5 className={style['modal-h5']}>注意事項： </h5>
              <div className={style['terms-text']}>
                <li>
                  - 在使用健身房設施時，請遵循健身教練的指導，以避免受傷。
                </li>{' '}
                <li>- 未成年人應在成年監護人的陪同下使用健身房設施。</li>{' '}
              </div>
              <h5 className={style['modal-h5']}>其他條款： </h5>
              <div className={style['terms-text']}>
                <li>
                  -
                  健身房保留修改會員條款的權利，修改後的條款將在健身房網站上公布。
                </li>
              </div>
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
