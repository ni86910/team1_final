import { useState, useEffect } from 'react'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import validator from 'validator'
import style from '@/styles/login.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import { FaStarOfLife } from 'react-icons/fa6'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()

  // 呈現密碼用
  const [inputText, setInputText] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // 驗證
  const [data, setData] = useState({
    m_account: '',
    m_pwd: '',
  })
  const [errors, setErrors] = useState({
    m_account: '',
    m_pwd: '',
  })

  // 新增Remember Me 狀態
  const [rememberMe, setrememberMe] = useState(false)

  useEffect(() => {
    const rememberAccount = localStorage.getItem('rememberAccount')
    const rememberPwd = localStorage.getItem('rememberPwd')
    const rememberState = localStorage.getItem('rememberState')

    if (rememberState === 'true' && rememberAccount && rememberPwd) {
      setData({ m_account: rememberAccount, m_pwd: rememberPwd })
      setrememberMe(true)
    }
  }, [])



  // 驗證表單字段
  const validateFields = () => {
    const newErrors = {}

    if (validator.isEmpty(data.m_account, { ignore_whitespace: true })) {
      newErrors.m_account = '帳號為必填欄位'
    } else if (!validator.isEmail(data.m_account)) {
      newErrors.m_account = '電子郵件格式不正確'
    }

    if (validator.isEmpty(data.m_pwd, { ignore_whitespace: true })) {
      newErrors.m_pwd = '密碼為必填欄位'
    } else if (
      !validator.isStrongPassword(data.m_pwd, {
        minLength: 5,         // 最小字元數
        minLowercase: 1,      // 最少要幾個小寫英文字元
        minUppercase: 0,      // 最少要幾個大寫英文字元
        minNumbers: 0,        // 最少要幾個數字
        minSymbols: 0,        // 最少要幾個符號
      })
    ) {
      newErrors.m_pwd = '密碼至少5個字元，要包含一個英文小寫字元'
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === '')
  }

  // 提交表單
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateFields()) {
      return;
    }

    const { m_account, m_pwd } = data;

    try {
      const result = await login(m_account, m_pwd);
      if (result) {
        console.log(result)
        if(rememberMe){
          localStorage.setItem('rememberAccount', m_account);
          localStorage.setItem('rememberPwd', m_pwd);
          localStorage.setItem('rememberState', true);
        }else{
          localStorage.removeItem('rememberAccount');
          localStorage.removeItem('rememberPwd');
          localStorage.removeItem('rememberState');
        }

        Swal.fire({
          position: 'top',
          icon: 'success',
          title: '登入成功',
          showConfirmButton: false,
          timer: 2000,
        });
        router.push('/member/profile');
      } else {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: '登入失敗',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

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

  //處理Remember Me 變化
  const handleRememberMeChange = () =>{
    setrememberMe(!rememberMe)
  }


  return (
    <section className={style['login-section']}>
      <style jsx>{`
        .error {
          color: red;
          font-size: 13px;
        }`}</style>
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
                              value={data.m_account}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="請輸入信箱"
                            />
                          </div>
                          <div className="error">{errors.m_account}</div>
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
                          <div className="col-md-6" style={{ position: 'relative' }}>
                          <input
                            className="form-control"
                            style={{ borderRadius: '10px' }}
                            id="m_pwd"
                            name="m_pwd"
                            type={showPassword ? 'text' : 'password'}
                            value={data.m_pwd}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="請輸入密碼"
                          />
                          <button
                          type="button"
                          className={style['show-password']}
                          onClick={(e) => {
                            e.preventDefault()
                            setShowPassword(!showPassword)}}
                          >
                            {!showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                          <div className="error">{errors.m_pwd}</div>
                        </div>
                        <div className={`checkbox ${style['check-remember']}`}>
                          <label>
                            <input  
                              type="checkbox"
                              checked={rememberMe}
                              onChange={handleRememberMeChange}
                            />
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
  )
}
