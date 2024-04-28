import { useState, useEffect } from 'react'
import Myaccordion from '@/components/accordion/Myaccordion'
import TOP from '@/components/TOPbutton/top'
import { questions } from '@/pages/api/accordion-data'
import Image from 'next/image'
import {
  FaBasketball,
  FaLocationDot,
  FaClock,
  FaPhone,
  FaPersonSwimming,
  FaBath,
} from 'react-icons/fa6'
import { FaHotTub } from 'react-icons/fa'
import { IoWoman } from 'react-icons/io5'
import { MdSportsMartialArts, MdElectricBike } from 'react-icons/md'
import { GiSteam } from 'react-icons/gi'
import { useRouter } from 'next/router'
import { API_SERVER } from '@/configs/index'

export default function GymDetail() {
  const [accordion, setAccordion] = useState(questions)
  // const [gymData, setGymData] = useState([])
  const router = useRouter()

  // 用來接收 fetch資料 的狀態
  const [gymInfo, setGymInfo] = useState({
    gym_id: 0,
    gym_area: '',
    gym_name: '',
    gym_description: '',
    image_path: '',
    gym_opentime: '',
    gym_phone: '',
    gym_address: '',
    gym_position: '',
  })

  // fetch時要執行的function
  const getGymData = async (gym_id) => {
    const url = `${API_SERVER}/gym/${gym_id}`

    // 開始fetch
    try {
      const r = await fetch(url)
      const data = await r.json()
      // 這裡拿到的是物件
      if (typeof data === 'object' && data) {
        setGymInfo(data)
        console.log(data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // router.isReady時 就要去fetch資料
  useEffect(() => {
    if (router.isReady) {
      const { gym_id } = router.query
      console.log('gym_id:', gym_id)
      getGymData(gym_id)
    }
  }, [router.isReady])

  //文章分段
  const text2jsx = (text) => {
    return text.split('\n\n').map((v, i) => (
      <div className="gym-section" key={i}>
        {v.split('\n').map((v2, i2) => (
          <div className="gym-p" key={`${i}-${i2}`}>
            {v2}
          </div>
        ))}
      </div>
    ))
  }

  return (
    <>
      {!gymInfo ? (
        <div>Loading...</div>
      ) : (
        <section
          style={{
            backgroundImage: 'url("/img/gym/place-mask.png")',
            backgroundSize: 'cover',
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col" style={{ marginBottom: 20 }}>
                <h4 className="mt-4 text-center">廠館環境</h4>
                <div className="mt-4 text-center">
                  {text2jsx(gymInfo.gym_description)}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col text-center">
                <Image
                  src={`/img/gym/${gymInfo.image_path}`}
                  alt=""
                  width={900}
                  height={400}
                />
              </div>
            </div>
            <div className="row">
              <div className="col" style={{ marginBottom: 15 }}>
                <h4 className="mt-4 text-center">廠館介紹</h4>
              </div>
              <iframe
                title="場地地圖"
                src={gymInfo.gym_position}
                frameBorder="0"
                width={600}
                height={450}
              ></iframe>
            </div>
            <div className="row" style={{ marginTop: 20 }}>
              <div className="col-lg-6 mb-4 mb-lg-0">
                <div
                  className="card"
                  style={{ border: 'none', height: '100%' }}
                >
                  <div className="card-body">
                    <h5 className="card-title">廠館資料</h5>
                    <p>
                      <FaPhone />
                      廠館電話: {gymInfo.gym_phone}
                    </p>
                    <p>
                      <FaClock />
                      營業時間: {gymInfo.gym_opentime}
                    </p>
                    <p>
                      <FaLocationDot />
                      廠館地址: {gymInfo.gym_address}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="card"
                  style={{ border: 'none', height: '100%', lineHeight: 3 }}
                >
                  <div className="card-body">
                    <h5 className="card-title">館內設施</h5>
                    <div className="row">
                      <div className="col">
                        <MdSportsMartialArts />
                        有氧教室
                        <br />
                        <GiSteam />
                        蒸氣室
                        <br />
                        <MdElectricBike />
                        飛輪教室
                        <br />
                        <IoWoman />
                        女性專區
                      </div>
                      <div className="col">
                        <FaBath />
                        更衣室
                        <br />
                        <FaHotTub />
                        烤箱
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <h4 className="mt-4 text-center">營運企業文化</h4>
                <p className="mt-4 text-center">
                  強身為強國之根基，相關研究證實運動能有效促進人民健康，體育發展程度更是國家現代化及國民生活品質的重要指標，因此先進國家莫不投入大量資源支持運動賽事或廣建運動場館。
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h4 className="mt-4 text-center">廠館公告</h4>
                <p className="mt-4 text-center">
                  以下為最新公告，包含課程異動調整、營業時間異動與輔具公告等等
                </p>
              </div>
              <div className="row" style={{ marginBottom: 20 }}>
                {accordion.map((item) => (
                  <Myaccordion key={item.id} {...item} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      <TOP />
    </>
  )
}
