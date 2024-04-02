import React, { useState } from 'react'
import Myaccordion from '../accordion/Myaccordion'
import { questions } from '@/pages/api/accordion-data'
import Image from 'next/image'

export default function GymDetail() {
  const [data, setData] = useState(questions)
  return (
    <>
      {/* Breadcrumb Section Begin */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>場地一覽</h4>
                <div className="breadcrumb__links">
                  <a href="./index.html">首頁</a>
                  <span>場地一覽-高雄博愛</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      <section style={{ backgroundImage: 'url("/img/gym/place-mask.png")' }}>
        <div className="container">
          <div className="row">
            <div className="col">
              <h4 className="mt-4 text-center">廠館環境</h4>
              <p className="mt-4 text-center">
                博愛廠是健身工廠發跡之廠，斥資新台幣兩億元打造全館樓地板面積約莫3000多坪、四層樓，鄰近漢神巨蛋百貨商圈、位於捷運紅線巨蛋站與生態園區站之間
                (近生態園區站)，並附設汽機車專屬停車場，交通便捷！全面引進國外專業健身器材，滿足各個年齡層對運動的需求；為提倡兒童運動風氣，特別規劃兒童體適能與寒暑假課程，引領台灣全民運動健身風氣，
                館內附設【人體工房】提供會員，舒壓及放鬆身心靈平衡
              </p>
            </div>
            <div className="row">
              <div className="col text-center">
                <Image
                  src="/img/gym/gym.jpg"
                  alt=""
                  width={1000}
                  height={500}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col" style={{ marginBottom: 15 }}>
              <h4 className="mt-4 text-center">廠館介紹</h4>
            </div>
            <iframe
              title="場地地圖"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14726.470667809659!2d120.3089536!3d22.6680394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e050e941cadd3%3A0x8d563ee3e69c2101!2z5YGl6Lqr5bel5bugIEZpdG5lc3MgRmFjdG9yeSDljZrmhJvlu6A!5e0!3m2!1szh-TW!2stw!4v1710043145912!5m2!1szh-TW!2stw"
              width={600}
              height={450}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col">
              <div className="card" style={{ border: 'none', height: 350 }}>
                <div className="card-body">
                  <h5 className="card-title">廠館資料</h5>
                  <p>廠館電話</p>
                  <p>07-3453838</p>
                  <p>營業時間</p>
                  <p>周一至周六 06:00~24:00</p>
                  <p>周日 08:00~24:00</p>
                  <p>廠館地址</p>
                  <p>813高雄市左營區博愛三路102號</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card" style={{ border: 'none', height: 350 }}>
                <div className="card-body">
                  <h5 className="card-title">館內設施</h5>
                  <div className="row">
                    <div className="col">
                      <img src="#" alt="" width={30} height={30} />
                      有氧教室
                      <br />
                      <img src="#" alt="" width={30} height={30} />
                      蒸氣室
                      <br />
                      <img src="#" alt="" width={30} height={30} />
                      飛輪教室
                      <br />
                      <img src="#" alt="" width={30} height={30} />
                      籃球場
                    </div>
                    <div className="col">
                      <img src="#" alt="" width={30} height={30} />
                      更衣室
                      <br />
                      <img src="#" alt="" width={30} height={30} />
                      烤箱
                      <br />
                      <img src="#" alt="" width={30} height={30} />
                      游泳池
                      <br />
                      <img src="#" alt="" width={30} height={30} />
                      女性專區
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4 className="mt-4 text-center">
                營運企業文化，專注於打造專業、舒適、優良的運動環境，並於2014年起深耕雙北新都會區及拓展運動服務版圖，至桃竹苗、嘉南地區，全力推廣培養全民健康生活態度
              </h4>
              <p className="mt-4 text-center">
                強身為強國之根基，相關研究證實運動能有效促進人民健康，體育發展程度更是國家現代化及國民生活品質的重要指標，因此先進國家莫不投入大量資源支持運動賽事或廣建運動場館強身為強國之根基，相關研究證實運動能有效促進人民健康，體育發展程度更是國家現代化及國民生活品質的重要指標，因此先進國家莫不投入大量資源支持運動賽事或廣建運動場館
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
            <div className="row">
              {data.map((curElem) => {
                const { id } = curElem
                return <Myaccordion key={id} {...curElem} />
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
