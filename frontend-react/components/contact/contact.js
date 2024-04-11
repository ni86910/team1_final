import { useState } from 'react'
import style from '@/styles/jack-use/button.module.css'
import Link from 'next/link'
import { API_SERVER } from '@/configs/index'

export default function Contact() {
  const [formData, setFormData] = useState({
    consult_id: 0,
    consult_name: '',
    consult_email: '',
    request: '',
    book_time: '',
    consult_time: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_SERVER}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data) // Handle response from server
      } else {
        console.error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <>
      {/* Map Begin */}
      <div className="map">
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
                      <select name="category" className="select" id="category">
                        <option value="All">選擇類別</option>
                        <option value="問題詢問">問題詢問</option>
                        <option value="異業/商品合作">異業/商品合作</option>
                        <option value="企業/特約商家申請">
                          企業/特約商家申請
                        </option>
                      </select>
                    </div>
                    <div className="col-lg-6">
                      <input type="text" name="name" placeholder="Name" />
                    </div>
                    <div className="col-lg-6">
                      <input type="email" name="email" placeholder="Email" />
                    </div>
                    <div className="col-lg-12">
                      <textarea
                        name="message"
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
    </>
  )
}
