import { useRouter, useState, useEffect } from 'next/router'
import { API_SERVER } from '../common/config'
import { Button } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
// React-Icon
import { FaStarOfLife } from 'react-icons/fa6'
// Style
import style from '@/styles/forget-password.module.scss'

export default function ForgetPasswordPage() {
  const router = useRouter()

  const sendMemberEmail = async (e) => {
    e.preventDefault()
    console.log('按下按鈕')
    const r = await fetch(`${API_SERVER}/forget-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    })
    const result = await r.json()

    console.log(result)
    if (result.status) {
      toast.success('請到您的電子信箱收取郵件', {
        style: {
          border: '1px solid #ED7C15',
          padding: '14px',
          color: 'white',
        },
        iconTheme: {
          primary: 'green',
          secondary: '#ED7C15',
        },
      })
      router.back()
    } else {
      toast.error('無此帳號信箱,請重新輸入', {
        duration: 2000,
        style: {
          backgroundColor: 'black',
          color: 'white',
        },
      })
    }
  }

  return (
    <>
      <section className={style['forget-section']}>
        <div className="col-6">
          <div className={style['forget-headline']}>
            <h2>會員專區</h2>
            <div style={{ margin: '20px 0px' }}>
              動動你的小指頭，立即找回你的健康好朋友
            </div>
            <div className={style['forget-form']}>
              <div>
                <div className="row justify-content-center">
                  <div>
                    <div className="card">
                      <div className={`card-header ${style['forget-text']}`}>
                        忘記密碼
                      </div>
                      <div className="card-body">
                        <p className={`text-center mb-3 ${style['text-note']}`}>
                          輸入您的會員帳號，按下{' '}
                          <span
                            style={{
                              color: 'red',
                              textDecoration: 'underline',
                            }}
                          >
                            &quot;取得驗証碼&quot;
                          </span>{' '}
                          按鈕後，我們會將密碼重設指示寄送給您。
                        </p>
                        <form>
                          {/* 信箱帳號開始 */}
                          <div
                            className={`form-group row ${style['forget-box']}`}
                          >
                            <label
                              htmlFor="m_account"
                              className={`col-md-4 col-form-label ${style['label-text']}`}
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
                              />
                            </div>
                          </div>
                          {/* 信箱驗證碼 */}
                          <div
                            className={`form-group row ${style['forget-box']}`}
                          >
                            <label
                              htmlFor="m_account"
                              className={`col-md-4 col-form-label ${style['label-verify-text']}`}
                            >
                              <FaStarOfLife className={style['icon-padding']} />
                              驗證碼
                            </label>
                            <div className="col-md-6">
                              <input
                                style={{ borderRadius: '10px' }}
                                type="text"
                                id="verify"
                                className="form-control"
                                name="verify"
                                placeholder="請從信箱領取驗證碼"
                              />
                            </div>
                          </div>

                          <div className="col-md-12" style={{ margin: '0px', padding:'0px' }}>
                            <button
                              className={style['verification-btn']}
                              type="button"
                              id="button-addon2"
                              onClick={sendMemberEmail}
                            >
                              取得驗証碼
                            </button>
                          </div>

                          {/* 新密碼 */}
                          <div
                            className={`form-group row ${style['forget-box']}`}
                          >
                            <label
                              htmlFor="m_pwd"
                              className={`col-md-4 col-form-label ${style['label-verify-text']}`}
                            >
                              <FaStarOfLife className={style['icon-padding']} />
                              新密碼
                            </label>
                            <div className="col-md-6">
                              <input
                                style={{ borderRadius: '10px' }}
                                type="password"
                                id="verify"
                                className="form-control"
                                name="new_pwd"
                                placeholder="請輸入新密碼"
                              />
                            </div>
                          </div>
                          {/* 確認新密碼 */}
                          <div
                            className={`form-group row ${style['forget-box']}`}
                          >
                            <label
                              htmlFor="m_pwd"
                              className={`col-md-4 col-form-label ${style['label-verify-text']}`}
                            >
                              <FaStarOfLife className={style['icon-padding']} />
                              確認密碼
                            </label>
                            <div className="col-md-6">
                              <input
                                style={{ borderRadius: '10px' }}
                                type="password"
                                className="form-control"
                                name="confirm_pwd"
                                placeholder="請輸入確認密碼"
                              />
                            </div>
                          </div>
                          <Button type="submit" className={style['forget-btn']}>
                            <span className="glyphicon glyphicon-off" />
                            確認
                          </Button>
                        </form>
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
    </>
  )
}
