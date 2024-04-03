import React from 'react'
import style from '@/styles/forget-password.module.scss'
import Image from 'next/image'

export default function ForgetPasswordPage() {
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
                        <form action="#" method="#">
                          <div
                            className={`form-group row ${style['forget-box']}`}
                          >
                            <label
                              htmlFor="m_account"
                              className="col-md-4 col-form-label text-md-right"
                            >
                              會員帳號
                            </label>
                            <div className="col-md-6">
                              <input
                                type="email"
                                id="m_account"
                                className="form-control"
                                name="m_account"
                                placeholder="請輸入信箱"
                                required
                              />
                            </div>
                          </div>
                          <div
                            className={`form-group row ${style['forget-box']}`}
                          >
                            <label
                              htmlFor="password"
                              className="col-md-4 col-form-label text-md-right"
                            >
                              驗證碼
                            </label>
                            <div className="input_block">
                              <p id="verify_code">
                                驗證碼<span>*</span>
                              </p>
                              <input
                                id="validText"
                                type="text"
                                placeholder="請輸入驗證碼"
                              />
                              <canvas id="auth-code" />
                              <button
                                id="reBtn"
                                style={{
                                  left: 15,
                                  bottom: 6,
                                  borderStyle: 'none',
                                  border: 'none',
                                  outline: 'none',
                                  fontSize: 20,
                                  cursor: 'pointer',
                                }}
                              >
                                換圖
                              </button>
                              <span id="result" style={{ color: 'red' }} />
                            </div>
                          </div>
                          <button
                            type="submit"
                            className={`btn ${style['forget-btn']}`}
                          >
                            <span className="glyphicon glyphicon-off" />
                            確認
                          </button>
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
    </>
  )
}
