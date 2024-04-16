import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import TOP from '@/components/TOPbutton/top'
import { API_SERVER } from '@/configs/index'
import style from '@/styles/jack-use/button.module.css'
import Swiper from '@/components/team/swiper/swiper'

export default function Team() {
  const router = useRouter()
  // 用狀態接收fetch來的介紹資料
  const [teamData, setTeamData] = useState([])
  const [selectedTeam, setSelectedTeam] = useState('全部總類')

  useEffect(() => {
    fetch(`${API_SERVER}/team`, { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        setTeamData(data)
      })
    if (router.query.team) {
      setSelectedTeam(router.query.team)
    }
  }, [router.isReady])

  const handleTeamChange = (e) => {
    const selectedValue = e.target.value
    setSelectedTeam(selectedValue) // 更新选择的区域

    // 更新 URL 参数
    router.push(
      {
        pathname: '/team',
        query: { team: selectedValue },
      },
      undefined,
      { scroll: false }
    )
  }

  const filteredTeamData = teamData.filter((item) => {
    return selectedTeam === '全部總類' || item.teacher_type === selectedTeam // 根据选择的区域进行过滤
  })

  //文章分段
  // const text2jsx = (text) => {
  //   return text.split('\n\n').map((v, i) => (
  //     <div className="team-section" key={i}>
  //       {v.split('\n').map((v2, i2) => (
  //         <div className="team-p" key={`${i}-${i2}`}>
  //           {v2}
  //         </div>
  //       ))}
  //     </div>
  //   ))
  // }

  return (
    <>
      {/* About Section Begin */}

      <div className="container">
        <div className="row" style={{ marginTop: 20 }}>
          <div className="col-lg-12">
            <div className="about__pic">
              <Swiper />
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
                  value={selectedTeam}
                  onChange={handleTeamChange}
                >
                  <option value="全部總類" selected="selected">
                    全部總類
                  </option>
                  <option value="教練">教練</option>
                  <option value="營養師">營養師</option>
                </select>
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          {filteredTeamData.map((v, i) => {
            return (
              <>
                <div className="col-lg-3 col-md-6 col-sm-6" key={i}>
                  <div className="team__item">
                    <Image
                      src={`/img/team/${v.teacher_image}`}
                      alt=""
                      width={500}
                      height={350}
                      data-bs-toggle="modal"
                      data-bs-target={`#modalJohnSmith${i}`}
                    />
                    <h4>{v.teacher_name}</h4>
                    <span>{v.teacher_type}</span>
                  </div>
                </div>

                <div
                  className="modal fade"
                  id={`modalJohnSmith${i}`}
                  tabIndex={-1}
                  aria-labelledby="modalJohnSmithLabel"
                  aria-hidden="true"
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
                          src={`/img/team/${v.teacher_image}`}
                          alt=""
                          width={250}
                          height={300}
                        />
                        <div>{v.teacher_type}</div>
                        <br />
                        <div>{v.teacher_describe}</div>
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
            <div className="client__item">
              <Image
                src="/img/team/client-1.png"
                alt=""
                width={60}
                height={70}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-4 col-6">
            <div className="client__item">
              <Image
                src="/img/team/client-2.png"
                alt=""
                width={60}
                height={70}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-4 col-6">
            <div className="client__item">
              <Image
                src="/img/team/client-3.png"
                alt=""
                width={60}
                height={70}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-4 col-6">
            <div className="client__item">
              <Image
                src="/img/team/client-4.png"
                alt=""
                width={60}
                height={70}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-4 col-6">
            <div className="client__item">
              <Image
                src="/img/team/client-5.png"
                alt=""
                width={60}
                height={70}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-4 col-6">
            <div className="client__item">
              <Image
                src="/img/team/client-6.png"
                alt=""
                width={60}
                height={70}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-4 col-6">
            <div className="client__item">
              <Image
                src="/img/team/client-7.png"
                alt=""
                width={60}
                height={70}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-4 col-6">
            <div className="client__item">
              <Image
                src="/img/team/client-8.png"
                alt=""
                width={60}
                height={70}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Client Section End */}
      <TOP />
    </>
  )
}
