import React, { useState } from 'react'
import { Col, Button } from 'react-bootstrap'
import { FaStarOfLife } from 'react-icons/fa6'
import style from '@/styles/forget-password.module.scss'

import { MdChangeCircle } from 'react-icons/md'

export default function ForgetPasswordPage() {
  const [randomCode, setRandomCode] = useState('')

  // 生成隨機的四位數字驗證碼
  const generateRandomCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000)
    setRandomCode(code.toString())
  }

  // 初始化時生成一次驗證碼
  useState(() => {
    generateRandomCode()
  }, [])
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
                              className={`col-md-4 col-form-label text-md-right ${style['label-text']}`}
                            >
                              <FaStarOfLife className={style['icon-padding']} />
                              會員帳號
                            </label>
                            <div className="col-md-4 col-form-label text-md-right">
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
                            className={`form-group row ${style['forget-box']}`}
                          >
                            <label
                              htmlFor="verify-code"
                              className={`col-md-4 col-form-label text-md-right ${style['label-text']}`}
                            >
                              <FaStarOfLife className={style['icon-padding']} />
                              驗證碼
                            </label>
                            <div
                              className={`col-md-4 col-form-label text-md-right ${style['label-text']}`}
                            >
                              <input
                                className={style['verify-box']}
                                type="text"
                                placeholder=" 請輸入驗證碼"
                              />
                            </div>
                          </div>
                          <Col className={style['verify-col']}>
                            <div
                              id="verify-code"
                              className={style['verify-number']}
                            >
                              {randomCode}
                            </div>
                            <Button
                              className={style['changg']}
                              onClick={generateRandomCode}
                            >
                              <MdChangeCircle size={'30px'} />
                            </Button>
                          </Col>

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
    </>
  )
}
