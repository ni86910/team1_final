import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import TOP from '@/components/TOPbutton/top'
import { API_SERVER } from '@/configs/index'
import Swiper from '@/components/team/swiper/swiper'
import { RiTeamFill } from 'react-icons/ri'

export default function Team() {
  const router = useRouter()
  const [teamData, setTeamData] = useState([])
  const [selectedTeam, setSelectedTeam] = useState('全部總類')
  const [selectedName, setSelectedName] = useState('')
  const [coachNames, setCoachNames] = useState([]) // 教練
  const [nutritionistNames, setNutritionistNames] = useState([]) // 營養師

  useEffect(() => {
    fetch(`${API_SERVER}/team`, { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        setTeamData(data)
        const coachNames = data
          .filter((item) => item.teacher_type === '教練')
          .map((item) => item.teacher_name)
        const nutritionistNames = data
          .filter((item) => item.teacher_type === '營養師')
          .map((item) => item.teacher_name)
        setCoachNames(coachNames)
        setNutritionistNames(nutritionistNames)
      })
    if (router.query.team) {
      setSelectedTeam(router.query.team)
    }
    if (router.query.name) {
      setSelectedName(router.query.name)
    }
  }, [router.isReady])

  const handleTeamChange = (e) => {
    const selectedValue = e.target.value
    setSelectedTeam(selectedValue)

    router.push(
      {
        pathname: '/team',
        query: { team: selectedValue, name: selectedName },
      },
      undefined,
      { scroll: false }
    )
  }

  const handleNameChange = (e) => {
    const selectedValue = e.target.value
    setSelectedName(selectedValue)

    router.push(
      {
        pathname: '/team',
        query: { team: selectedTeam, name: selectedValue },
      },
      undefined,
      { scroll: false }
    )
  }

  const filteredTeamData = teamData.filter((item) => {
    return (
      (selectedTeam === '全部總類' || item.teacher_type === selectedTeam) &&
      (selectedName === '' || item.teacher_name === selectedName)
    )
  })

  const text2jsx = (text) => {
    return text.split('\n\n').map((v1, i1) => (
      <div className="team-section" key={i1}>
        {v1.split('\n').map((v2, i2) => (
          <div className="team-p" key={`${i1}-${i2}`}>
            {v2}
          </div>
        ))}
      </div>
    ))
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="mt-4 text-center" style={{ marginTop: 20 }}>
            <Swiper />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h3 className="mt-4 text-center">
                <RiTeamFill />
                教練團隊
              </h3>
              <span className="mt-4" style={{ color: '#EB6234' }}>
                教練團隊能讓您事半功倍，用最少的時間達成您心目中的體態，讓每次的努力不會白費。
              </span>
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
                  className="form-select form-select-lg mb-3"
                  data-type="select"
                  data-width="medium"
                  value={selectedTeam}
                  onChange={handleTeamChange}
                >
                  <option value="全部總類">全部總類</option>
                  <option value="教練">教練 ({coachNames.length})</option>
                  <option value="營養師">
                    營養師 ({nutritionistNames.length})
                  </option>
                </select>
              </div>
              <div className="col-auto">
                <select
                  name="name"
                  id="name"
                  className="form-select form-select-lg mb-3"
                  data-type="select"
                  data-width="medium"
                  value={selectedName}
                  onChange={handleNameChange}
                >
                  <option value="">全部姓名</option>
                  {selectedTeam === '全部總類'
                    ? // 渲染所有姓名选项
                      [...new Set([...coachNames, ...nutritionistNames])].map(
                        (name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        )
                      )
                    : selectedTeam === '教練'
                    ? coachNames.map((name, index) => (
                        <option key={index} value={name}>
                          {name}
                        </option>
                      ))
                    : selectedTeam === '營養師'
                    ? nutritionistNames.map((name, index) => (
                        <option key={index} value={name}>
                          {name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          {filteredTeamData.map((v, i) => {
            return (
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
                        <Image
                          src={`/img/team/${v.teacher_image}`}
                          alt=""
                          width={250}
                          height={300}
                        />
                        <div>{v.teacher_type}</div>
                        <br />
                        <div>{text2jsx(v.teacher_describe)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

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

      <TOP />
    </>
  )
}
