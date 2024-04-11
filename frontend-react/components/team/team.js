import { useState, useEffect } from 'react'
import Image from 'next/image'
import { API_SERVER } from '@/configs/index'

export default function Team() {
  // 用狀態接收fetch來的介紹資料
  const [teamData, setTeamData] = useState([])

  useEffect(() => {
    fetch(`${API_SERVER}/team`, { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        setTeamData(data)
      })
  }, [])

  return (
    <>
      {/* About Section Begin */}

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="about__pic">
              <Image
                src="/img/team/about-us.jpg"
                width={1000}
                height={550}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* About Section End */}
      {/* Team Section Begin */}

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span style={{ color: '#EB6234' }}>教練團隊</span>
              <h2>Meet Our 教練團隊</h2>
            </div>
          </div>
        </div>

        <div className="row">
          {teamData.map((v, i) => {
            return (
              <>
                <div className="col-lg-3 col-md-6 col-sm-6" key={i}>
                  <div className="team__item">
                    <Image
                      src="/img/team/team-2.jpg"
                      alt=""
                      width={500}
                      height={350}
                      data-bs-toggle="modal"
                      data-bs-target={`#modalJohnSmith${i}`}
                    />
                    <h4>
                      {/* John Smith */}
                      {v.teacher_name}
                    </h4>
                    <span>
                      {/* 健身教練 */}
                      {v.teacher_type}
                    </span>
                  </div>
                </div>
              </>
            )
          })}
          {/* Modal for John Smith */}
          {teamData.map((v, i) => {
            return (
              <>
                <div
                  className="modal fade"
                  id={`modalJohnSmith${i}`}
                  tabIndex={-1}
                  aria-labelledby="modalJohnSmithLabel"
                  aria-hidden="true"
                  key={i}
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="modalJohnSmithLabel">
                          {v.teacher_name} 資歷
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body">
                        {/* Add modal body content here */}
                        <Image
                          src="/img/team/team-2.jpg"
                          alt=""
                          width={250}
                          height={300}
                        />
                        <p>{v.teacher_type}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>

      {/* Team Section End */}
      {/* Client Section Begin */}
      <section className="clients spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span style={{ color: '#EB6234' }}>合作夥伴</span>
                <h2>Happy Clients</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <Image
                  src="/img/team/client-1.png"
                  alt=""
                  width={60}
                  height={70}
                />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <Image
                  src="/img/team/client-2.png"
                  alt=""
                  width={60}
                  height={70}
                />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <Image
                  src="/img/team/client-3.png"
                  alt=""
                  width={60}
                  height={70}
                />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <Image
                  src="/img/team/client-4.png"
                  alt=""
                  width={60}
                  height={70}
                />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <Image
                  src="/img/team/client-5.png"
                  alt=""
                  width={60}
                  height={70}
                />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <Image
                  src="/img/team/client-6.png"
                  alt=""
                  width={60}
                  height={70}
                />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <Image
                  src="/img/team/client-7.png"
                  alt=""
                  width={60}
                  height={70}
                />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <Image
                  src="/img/team/client-8.png"
                  alt=""
                  width={60}
                  height={70}
                />
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Client Section End */}
    </>
  )
}
