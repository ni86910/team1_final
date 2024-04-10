import { useState, useEffect } from 'react'
import style from '@/styles/jack-use/button.module.css'
import { FaSearch } from 'react-icons/fa'
import { FaPhone, FaClock, FaLocationDot } from 'react-icons/fa6'
import Link from 'next/link'
import { API_SERVER } from '@/configs/index'

export default function GymPlace() {
  // 用狀態接收fetch來的介紹資料
  const [gymData, setGymData] = useState([])

  useEffect(() => {
    fetch(`${API_SERVER}/gym`, { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        setGymData(data)
      })
  }, [])

  return (
    <>
      {/* <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>場地一覽</h4>
                <div className="breadcrumb__links">
                  <a href="./index.html">首頁</a>
                  <span>場地一覽</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* Breadcrumb Section End */}
      <div className="container">
        <div className="row">
          <h4 className="mt-4 text-center">
            <FaLocationDot />
            尋找場地
          </h4>
          <p className="mt-4 text-center">
            營業據點遍佈全台各地，提供給您最完整的服務。請依據您的需求，選取地區與廠館，即能尋找離您最近的據點！
          </p>
        </div>
        <form
          action=""
          className="row justify-content-center"
          style={{ marginBottom: 20 }}
        >
          <div className="col-auto">
            <select
              name="area"
              id="area"
              className={style['select']}
              data-type="select"
              data-width="medium"
            >
              <option value="全部區域" selected="selected">
                全部區域
              </option>
              <option value="臺北市">臺北市</option>
              <option value="新北市">新北市</option>
              <option value="臺中市">臺中市</option>
              <option value="臺南市">臺南市</option>
              <option value="高雄市">高雄市</option>
            </select>
          </div>
          <div className="col-auto">
            <button className={style['btn']} type="submit">
              <FaSearch />
            </button>
          </div>
        </form>

        <div className="row" style={{ marginBottom: 20 }}>
          {gymData.map((v, i) => {
            return (
              <>
                <div key={i} className="col-4" style={{ marginTop: 20 }}>
                  <div className="card">
                    <div className="card-body">
                      <p className="card-text">{v.gym_area}</p>
                      <h5 className="card-title">{v.gym_name}</h5>
                      <p className="card-text">
                        <FaPhone />
                        {v.gym_phone}
                      </p>
                      <p className="card-text">
                        <FaClock />
                        {v.gym_opentime}
                      </p>
                      <p className="card-text">
                        <FaLocationDot />
                        {v.gym_address}
                      </p>
                      <Link href={'#'} className={style['site-btn']}>
                        課表查詢
                      </Link>
                      <br />
                      <br />
                      <Link
                        href={'/gym/index-gym-detail'}
                        className={style['site-btn']}
                      >
                        查看更多資訊
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}
