import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import style from '@/styles/jack-use/button.module.css'
import TOP from '@/components/TOPbutton/top'
import { FaPhone, FaClock, FaLocationDot } from 'react-icons/fa6'
import Link from 'next/link'
import { API_SERVER } from '@/configs/index'
import Swiper from '@/components/gym/swiper/swiper'

export default function GymPlace() {
  const router = useRouter()
  // 用狀態接收fetch來的介紹資料
  const [gymData, setGymData] = useState([])
  const [selectedArea, setSelectedArea] = useState('全部區域')

  useEffect(() => {
    fetch(`${API_SERVER}/gym`, { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        setGymData(data)
      })
    if (router.query.gym) {
      setSelectedArea(router.query.gym)
    }
  }, [router.isReady])

  const handleAreaChange = (e) => {
    const selectedValue = e.target.value
    setSelectedArea(selectedValue) // 更新选择的区域

    // 更新 URL 参数
    router.push(
      {
        pathname: '/gym',
        query: { gym: selectedValue },
      },
      undefined,
      { scroll: false }
    )
  }

  const filteredGymData = gymData.filter((item) => {
    return selectedArea === '全部區域' || item.gym_area === selectedArea // 根据选择的区域进行过滤
  })

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="mt-4 text-center" style={{ marginTop: 20 }}>
            <Swiper />
          </div>

          <h4 className="mt-4 text-center">
            <FaLocationDot />
            尋找場地
          </h4>
          <p className="mt-4 text-center">
            營業據點遍佈全台各地，提供給您最完整的服務。請依據您的需求，選取地區與廠館，即能尋找離您最近的據點！
          </p>
        </div>
        <form
          action="get"
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
              value={selectedArea}
              onChange={handleAreaChange}
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
        </form>

        <div className="row" style={{ marginBottom: 20 }}>
          {filteredGymData.map((v, i) => {
            return (
              <>
                <div key={i} className="col-4" style={{ marginTop: 20 }}>
                  <div className="card" style={{ height: 330 }}>
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
                        href={`/gym/${v.gym_id}`}
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
      <TOP />
    </>
  )
}
