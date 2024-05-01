import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { API_SERVER } from '../common/config'
import { Button } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'

// React-Icon
import { FaStarOfLife } from 'react-icons/fa6'
// Style
import style from '@/styles/forget-password.module.scss'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [ResetToken, setResetToken] = useState(null) // 新增

  // 獲取 resetPasswordToken
  useEffect(() => {
    const { token } = router.query
    if (token) {
      setResetToken(token)
    }
  }, [router.query])

  const changePassword = async (e) => {
    e.preventDefault()
    console.log('按下確定')
    const m_pwd = document.getElementById('m_pwd').value // 從表單中獲取會員帳號

    const response = await fetch(
      `${API_SERVER}/forget-password/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ m_pwd: m_pwd, ResetToken: ResetToken }),
      }
    )
    const res = await response.json()
    console.log(res)
    if (res.success) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '密碼重新設定成功',
        showConfirmButton: false,
        timer: 2000,
      })
      router.push('/member/login')
    } else {
      toast.error('密碼重新設定失敗', {
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
                        重置密碼
                      </div>
                      <div className="card-body">
                        <p className={`text-center mb-3 ${style['text-note']}`}>
                          輸入您的新密碼，按下{' '}
                          <span
                            style={{
                              color: 'red',
                              textDecoration: 'underline',
                            }}
                          >
                            &quot;確認&quot;
                          </span>{' '}
                          後，立即找回流失的健康。
                        </p>
                        <form>
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
                                id="m_pwd"
                                className="form-control"
                                name="m_pwd"
                                placeholder="請輸入新密碼"
                              />
                            </div>
                          </div>
                          {/* 確認新密碼 */}
                          <div
                            className={`form-group row ${style['forget-box']}`}
                          >
                            <label
                              htmlFor="confirm_pwd"
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
                          <Button
                            type="submit"
                            className={style['forget-btn']}
                            onClick={changePassword}
                          >
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
