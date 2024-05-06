import { useRouter } from 'next/router'
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
    console.log('送出信件結果')
    const m_account = document.getElementById('m_account').value // 從表單中獲取會員帳號

    const response = await fetch(
      `${API_SERVER}/forget-password/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ m_account }), // 將會員帳號作為 JSON 對象發送到後端
      }
    )
    const result = await response.json()
    console.log(result)
    if (result) {
      toast.success('請到您的電子信箱收取郵件', {
        style: {
          border: '3px solid #ED7C15',
          padding: '14px',
          color: 'black',
        },
        iconTheme: {
          primary: 'green',
          secondary: 'white',
        },
      })
    } else {
      console.log(result)
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
                          輸入您的會員帳號，按下確認後，我們會將
                          <span
                            style={{
                              color: 'red',
                              textDecoration: 'underline',
                            }}
                          >
                            &quot;密碼重設指示寄送&quot;
                          </span>{' '}
                          給您。
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
                          <Button
                            type="submit"
                            className={style['forget-btn']}
                            onClick={sendMemberEmail}
                          >
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
