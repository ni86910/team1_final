import React from 'react'
import style from '@/styles/jack-use/button.module.css'
import { FaSearch } from 'react-icons/fa'

export default function GymPlace() {
  return (
    <>
      <section className="breadcrumb-option">
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
      </section>
      {/* Breadcrumb Section End */}
      <div className="container">
        <div className="row">
          <h4 className="mt-4 text-center">
            <i className="fa-solid fa-location-dot" />
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
            <button
              className="btn btn-warning"
              style={{
                border: 'none',
                borderRadius: '50%',
                color: '#ffffff',
                backgroundColor: '#000',
              }}
              type="submit"
            >
              <FaSearch />
            </button>
          </div>
        </form>
        <div className="row" style={{ marginBottom: 20 }}>
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <p className="card-text">高雄市</p>
                <h5 className="card-title">高雄博愛</h5>
                <p className="card-text">07-3453838</p>
                <p className="card-text">周一至周日 08:00~24:00</p>
                <p className="card-text">高雄市左營區博愛三路102號</p>
                <button href="#" className={style['site-btn']}>
                  課表查詢
                </button>
                <br />
                <button
                  href="gym-detail"
                  className={style['site-btn']}
                  style={{ marginTop: 10 }}
                >
                  查看更多資訊
                </button>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <p className="card-text">高雄市</p>
                <h5 className="card-title">高雄博愛</h5>
                <p className="card-text">07-3453838</p>
                <p className="card-text">周一至周日 08:00~24:00</p>
                <p className="card-text">高雄市左營區博愛三路102號</p>
                <button href="#" className={style['site-btn']}>
                  課表查詢
                </button>
                <br />
                <button
                  href="gym-detail"
                  className={style['site-btn']}
                  style={{ marginTop: 10 }}
                >
                  查看更多資訊
                </button>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <p className="card-text">高雄市</p>
                <h5 className="card-title">高雄博愛</h5>
                <p className="card-text">07-3453838</p>
                <p className="card-text">周一至周日 08:00~24:00</p>
                <p className="card-text">高雄市左營區博愛三路102號</p>
                <button href="#" className={style['site-btn']}>
                  課表查詢
                </button>
                <br />
                <button
                  href="gym-detail"
                  className={style['site-btn']}
                  style={{ marginTop: 10 }}
                >
                  查看更多資訊
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginBottom: 20 }}>
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <p className="card-text">高雄市</p>
                <h5 className="card-title">高雄博愛</h5>
                <p className="card-text">07-3453838</p>
                <p className="card-text">周一至周日 08:00~24:00</p>
                <p className="card-text">高雄市左營區博愛三路102號</p>
                <button href="#" className={style['site-btn']}>
                  課表查詢
                </button>
                <br />
                <button
                  href="gym-detail"
                  className={style['site-btn']}
                  style={{ marginTop: 10 }}
                >
                  查看更多資訊
                </button>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <p className="card-text">高雄市</p>
                <h5 className="card-title">高雄博愛</h5>
                <p className="card-text">07-3453838</p>
                <p className="card-text">周一至周日 08:00~24:00</p>
                <p className="card-text">高雄市左營區博愛三路102號</p>
                <button href="#" className={style['site-btn']}>
                  課表查詢
                </button>
                <br />
                <button
                  href="gym-detail"
                  className={style['site-btn']}
                  style={{ marginTop: 10 }}
                >
                  查看更多資訊
                </button>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <p className="card-text">高雄市</p>
                <h5 className="card-title">高雄博愛</h5>
                <p className="card-text">07-3453838</p>
                <p className="card-text">周一至周日 08:00~24:00</p>
                <p className="card-text">高雄市左營區博愛三路102號</p>
                <button href="#" className={style['site-btn']}>
                  課表查詢
                </button>
                <br />
                <button
                  href="gym-detail"
                  className={style['site-btn']}
                  style={{ marginTop: 10 }}
                >
                  查看更多資訊
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
