import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import style from '@/styles/jack-use/button.module.css'
import { FaPhone, FaClock, FaLocationDot } from 'react-icons/fa6'
import Link from 'next/link'
import { API_SERVER } from '@/configs/index'
import Swiper from '@/components/gym/swiper/swiper'

export default function GymPlace() {
  const router = useRouter()

  // 用狀態接收 fetch來的介紹資料
  const [gymData, setGymData] = useState([])
  const [selectedArea, setSelectedArea] = useState('全部區域')
  const [selectedGym, setSelectedGym] = useState('全部場館')

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
    setSelectedGym('全部場館') // 重置場館選項

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

  // const handleGymChange = (e) => {
  //   const selectedValue = e.target.value
  //   setSelectedGym(selectedValue) // 更新选择的場館
  // }

  // 獲取所有縣市的列表
  const cityList = [...new Set(gymData.map((item) => item.gym_area))]

  // 獲取每個縣市的場館數量
  const cityGymCounts = cityList.reduce((acc, city) => {
    const count = gymData.filter((item) => item.gym_area === city).length
    acc[city] = count
    return acc
  }, {})

  // 獲取選定縣市的場館列表
  const selectedCityGyms = gymData.filter(
    (item) => selectedArea === '全部區域' || item.gym_area === selectedArea
  )

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="mt-4 text-center" style={{ marginTop: 20 }}>
            <Swiper />
          </div>
          <div className="section-title">
            <h3 className="mt-4 text-center">
              <FaLocationDot />
              尋找場地
            </h3>
            <span className="mt-4" style={{ color: '#EB6234' }}>
              營業據點遍佈全台各地，提供給您最完整的服務。請依據您的需求，選取地區與廠館，即能尋找離您最近的據點！
            </span>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <select
            name="area"
            id="area"
            style={{ marginRight: 15, width: '100%', maxWidth: 200 }}
            className="form-select form-select-lg mb-3"
            data-width="medium"
            value={selectedArea}
            onChange={handleAreaChange}
          >
            <option value="全部區域">全部區域</option>
            {cityList.map((city) => (
              <option key={city} value={city}>
                {`${city} (${cityGymCounts[city]} 場館)`}
              </option>
            ))}
          </select>

          <select
            name="gym"
            id="gym"
            className="form-select form-select-lg mb-3"
            style={{ width: '100%', maxWidth: 300 }}
            data-width="medium"
            aria-label=".form-select-lg example"
            value={selectedGym}
            onChange={(e) => {
              const selectedValue = e.target.value
              setSelectedGym(selectedValue) // 更新所選場館

              // 更新URL參數
              router.push(
                {
                  pathname: '/gym',
                  query: { gym: selectedValue },
                },
                undefined,
                { scroll: false }
              )
            }}
          >
            <option value="全部場館">全部場館</option>
            {selectedCityGyms.map((gym) => (
              <option key={gym.gym_id} value={gym.gym_name}>
                {gym.gym_name}
              </option>
            ))}
          </select>
        </div>

        <div className="row" style={{ marginBottom: 20 }}>
          {selectedCityGyms
            .filter(
              (gym) =>
                selectedGym === '全部場館' || gym.gym_name === selectedGym
            )
            .map((v, i) => (
              <div
                key={i}
                className="col-md-6 col-lg-4"
                style={{ marginTop: 20 }}
              >
                <div className="card mb-3" style={{ maxWidth: 540 }}>
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
                    <Link
                      href={{
                        pathname: '/class',
                        query: {
                          tab: 'right',
                          date: '2024-05-07',
                          gym_name: v.gym_name,
                        },
                      }}
                      className={style['site-btn']}
                    >
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
            ))}
        </div>
      </div>
    </>
  )
}
