import React, { useState } from 'react'
import style from '@/styles/login.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { FaStarOfLife } from 'react-icons/fa6'

export default function LoginPage() {
  // 狀態為物件，屬性名稱對應到表單欄位的name屬性
  const [user, setUser] = useState({
    m_account: '',
    m_pwd: '',
  })

  // 記錄錯誤訊息用的狀態
  const [error, setError] = useState({
    m_account: '',
    m_pwd: '',
  })

  // 多欄位共用事件處理函式
  const handleFieldChange = (e) => {
    console.log(e.target.name, e.target.value, e.target.type)

    //ES6新特性: computed property names(計算得到的屬性名稱)
    // [e.target.name]: e.target.value
    // ^^^^^^^^^^^^^^^ 這樣可以動態的設定物件的屬性名稱
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E5%90%8D
    const nextUser = { ...user, [e.target.name]: e.target.value }

    setUser(nextUser)
  }

  // 表單送出的事件
  const handleSubmit = (e) => {
    // 取消表單送出的預設行為，要改用fetch/ajax來送出表單資料
    e.preventDefault()
    // e.target指的是表單

    // 這裡可以作自訂的表單檢查 --- START ---
    // 信號代表有沒有錯誤
    let hasError = false
    // 記錄錯誤的物件
    const newError = {
      m_account: '',
      m_pwd: '',
    }

    // if(user.m_account)指的是"有填寫"的情況，所以反之為"沒填寫"的情況
    if (!user.m_account) {
      newError.m_account = '帳號為必填'
      hasError = true
    }

    if (!user.m_pwd) {
      newError.m_pwd = '密碼為必填'
      hasError = true
    }

    if (user.m_pwd.length < 6) {
      // 指定預設值語法，如果已經有上個錯誤訊息的話，不會再加入這個訊息
      // 同欄位多個檢查時才會使用
      newError.m_pwd ||= '密碼至少要6個字元'
      hasError = true
    }

    if (user.m_pwd.length > 10) {
      newError.m_pwd ||= '密碼至多為10個字元'
      hasError = true
    }

    if (hasError) {
      setError(newError)
      return // 流程控制，有錯誤訊息則先跳出處理函式不繼續送到伺服器
    }
    // 這裡可以作自訂的表單檢查 --- END ---

    // 這裡之後送到伺服器(資料庫)中
  }

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
                        <form onSubmit={handleSubmit}>
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
                                className="form-control"
                                style={{ borderRadius: '10px' }}
                                type="email"
                                id="m_account"
                                name="m_account"
                                value={user.m_account}
                                onChange={handleFieldChange}
                                placeholder="請輸入信箱"
                              />
                            </div>
                            <div className={style['error']}>
                              {error.m_account}
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
                                className="form-control"
                                style={{ borderRadius: '10px' }}
                                type="password"
                                id="m_pwd"
                                name="m_pwd"
                                value={user.m_pwd}
                                onChange={handleFieldChange}
                                placeholder="請輸入4-6位數密碼"
                              />
                            </div>
                            <div className={style['error']}>{error.m_pwd}</div>
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
                              <Link href="register" className={style['a-link']}>
                                {' '}
                                趕快來註冊!
                              </Link>
                            </p>
                            <Link
                              href="forget-password"
                              className={style['a-link']}
                            >
                              忘記密碼?
                            </Link>
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
