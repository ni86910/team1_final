import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/router'
import style from '@/styles/login.module.scss'
import Link from 'next/link'
import GoogleLogin from './google-login'
import { FaStarOfLife } from 'react-icons/fa6'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [m_account, setAccount] = useState('')
  const [m_pwd, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    console.log({ m_account, m_pwd })
    login(m_account, m_pwd).then((result) => {
      if (result) {
        alert('登入成功')
        router.push('/member/profile')
      } else {
        alert('登入失敗')
      }
    })
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
                        <form onSubmit={onSubmit}>
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
                                value={m_account}
                                onChange={(e) => setAccount(e.target.value)}
                                placeholder="請輸入信箱"
                              />
                            </div>
                            <div className={style['error']}>
                              {/* {error.m_account} */}
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
                                value={m_pwd}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="請輸入4-6位數密碼"
                              />
                            </div>
                            {/* <div className={style['error']}>{error.m_pwd}</div> */}
                          </div>
                          <div
                            className={`checkbox ${style['check-remember']}`}
                          >
                            <label>
                              <input type="checkbox" />
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
                        <br />
                        <GoogleLogin />
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
