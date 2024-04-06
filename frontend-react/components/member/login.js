import React, { Fragment } from 'react'
import style from '@/styles/login.module.scss'
import Image from 'next/image'
import { FaStarOfLife } from 'react-icons/fa6'

export default function LoginPage() {
  return (
    <>
      <section className={style['login-section']}>
        <div className="col-6">
          <div className={style['login-headline']}>
            <h2>會員專區</h2>
            <div style={{ margin: '20px 0px' }}>
              請選擇登入方式，前往專屬會員中心，查看更多資訊。
            </div>
            <div className={style['login-form']}>
              <div>
                <div className="row justify-content-center">
                  <div>
                    <div className="card">
                      <div className={`card-header ${style['login-text']}`}>
                        會員登入
                      </div>
                      <div className="card-body">
                        <form action="#" method="#">
                          <div
                            className={`form-group row ${style['account-box']}`}
                          >
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
                                required
                              />
                            </div>
                          </div>
                          <div
                            className={`form-group row ${style['account-box']}`}
                          >
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
                                required
                              />
                            </div>
                          </div>
                          <div
                            className={`checkbox ${style['check-remember']}`}
                          >
                            <label>
                              <input type="checkbox" defaultValue="" />
                              &nbsp;Remember me
                            </label>
                          </div>
                          <br />
                          <button
                            type="submit"
                            className={`btn ${style['login-btn']}`}
                          >
                            <span className="glyphicon glyphicon-off" />
                            登入
                          </button>
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
                            使用Google快速登入
                          </button>
                          <br />
                          <br />
                          <div className={style['straight-line']} />
                          <br />
                          <div className="sign">
                            <p>
                              還沒加入菲特友嗎?{' '}
                              <a href="register" className={style['a-link']}>
                                {' '}
                                趕快來註冊!
                              </a>
                            </p>
                            <a
                              href="forget-password"
                              className={style['a-link']}
                            >
                              忘記密碼?
                            </a>
                          </div>
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
