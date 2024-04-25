import { useState, useEffect } from 'react'
import style from '@/styles/jack-use/button.module.css'
import TOP from '@/components/TOPbutton/top'
import { API_SERVER } from '@/configs/index'
import Swal from 'sweetalert2'

export default function Contact() {
  const [formData, setFormData] = useState({
    consult_type: '',
    consult_name: '',
    consult_email: '',
    request: '',
  })
  // 用於保存登錄狀態
  // const [isLoggedIn, setIsLoggedIn] = useState(false)

  // 模擬檢查用戶是否已經登錄
  // useEffect(() => {
  //   // 您可以在這裡進行實際的驗證邏輯
  //   const token = localStorage.getItem('authToken') // 例如從本地存儲中獲取身份驗證令牌
  //   setIsLoggedIn(!!token)
  // }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 數據驗證：確保所有必填內容不為空白
    if (
      !formData.consult_type ||
      !formData.consult_name ||
      !formData.consult_email ||
      !formData.request
    ) {
      // alert('請完整填寫所有必填字段。')
      Swal.fire('請完整填寫所有必填字段!')
      return
    }

    try {
      const response = await fetch(`${API_SERVER}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        Swal.fire({
          title: '表單提交成功！',
          icon: 'success',
        })
        // alert('表單提交成功！')
        e.target.reset()
      } else {
        // alert('表單提交失敗，請稍後再試。')
        Swal.fire({
          icon: 'error',
          text: '表單提交失敗，請稍後再試!',
        })
        console.error('Failed to submit form')
      }
    } catch (error) {
      alert('提交過程中出現錯誤，請稍後再試。')
      console.error('Error submitting form:', error)
    }
  }

  return (
    <>
      {/* Map Begin */}
      <div className="container">
        <div className="map" style={{ marginTop: 20 }}>
          <iframe
            title="聯絡地圖"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.685143944804!2d120.29046327481278!3d22.62822983093009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e05f5a79b7517%3A0x9c0020e1575c5ebf!2z6LOH5bGV5ZyL6ZqbLemrmOmbhOiok-e3tOS4reW_gw!5e0!3m2!1szh-TW!2stw!4v1709129194811!5m2!1szh-TW!2stw"
            width={600}
            height={450}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      {/* Map End */}
      {/* Contact Section Begin */}
      <section className="contact spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="contact__text">
                <div className="section-title">
                  <span style={{ color: '#EB6234' }}>Service</span>
                  <h2>客服專區</h2>
                  <p>
                    填寫並提交資表單後，我們收到內容後，會一併審核您提供的資訊。
                  </p>
                </div>
                <ul>
                  <li>
                    <h4>資展國際-高雄訓練中心</h4>
                    <p>
                      801高雄市前金區中正四路211號8號樓之1
                      <br />
                      079699885
                    </p>
                  </li>
                  <li>
                    <h4>資展國際-台北訓練中心</h4>
                    <p>
                      台北市復興南路一段390號2樓(大安捷運站4號、6號出口)
                      <br />
                      (02) 6631-6588(台北窗口)
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="contact__form">
                <form action="post" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12" style={{ marginBottom: 20 }}>
                      <select
                        name="consult_type"
                        className="form-select form-select-lg mb-3"
                        style={{ width: 230 }}
                        onChange={handleChange}
                      >
                        <option value="" selected="selected">
                          請選擇諮詢內容
                        </option>
                        <option value="問題詢問" onChange={handleChange}>
                          問題詢問
                        </option>
                        <option value="異業/商品合作" onChange={handleChange}>
                          異業/商品合作
                        </option>
                        <option
                          value="企業/特約商家申請"
                          onChange={handleChange}
                        >
                          企業/特約商家申請
                        </option>
                      </select>
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        className="form-control"
                        name="consult_name"
                        placeholder="Name"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="email"
                        className="form-control"
                        name="consult_email"
                        placeholder="Email"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <textarea
                        name="request"
                        className="form-control"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                      />
                      <button type="reset" className={style['site-btn']}>
                        重新填寫
                      </button>
                      <button type="submit" className={style['site-btn']}>
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TOP />
    </>
  )
}
