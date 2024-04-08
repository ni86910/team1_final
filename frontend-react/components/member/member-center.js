import React from 'react'
import style from '@/styles/member-center.module.scss'
import SideBar from '@/styles/m-sidebar.module.scss'
import Image from 'next/image'
import Link from 'next/link'
/* React-Bootstrap */
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
/* React-icon */
import { ImTruck } from 'react-icons/im'
import { FaHourglassStart, FaCoins } from 'react-icons/fa'
import { BsBookmarkHeartFill } from 'react-icons/bs'
import { AiFillSchedule } from 'react-icons/ai'
import { FaSackDollar, FaAddressCard } from 'react-icons/fa6'
import { MdChangeCircle } from 'react-icons/md'

export default function MemberCenterPage() {
  // 上傳圖像
  const handleFileUpload = () => {
    document.getElementById('file0').click() // 點擊隱藏的檔案輸入欄位
  }

  return (
    <>
      <section className={SideBar['member-center-container']}>
        {/* Side Bar Begin */}

        <Navbar className={SideBar['m-sidebar']}>
          <Container className={SideBar['m-container']}>
            <Navbar.Brand href="#member-center" className={SideBar['text-h4']}>
              會員中心
            </Navbar.Brand>
            <Nav className={`me-auto ${SideBar['nav-side']}`}>
              <Link className={SideBar['Nav-link']} href="#profile">
                個人資料
              </Link>
              <Link className={SideBar['Nav-link']} href="#order">
                我的訂單
              </Link>
              <Link className={SideBar['Nav-link']} href="#course-records">
                課程紀錄
              </Link>
              <Link className={SideBar['Nav-link']} href="#points">
                我的點數
              </Link>
              <Link className={SideBar['Nav-link']} href="#favorite">
                我的收藏
              </Link>
              <Link className={SideBar['Nav-link']} href="#logout">
                登出
              </Link>
            </Nav>
          </Container>
        </Navbar>
        {/* Side Bar End */}

        {/* Member Center Start */}
        <Container className={style['member-section']}>
          <Container>
            <Row>
              <Col className={style['title']}>會員中心</Col>
            </Row>
          </Container>
          {/* Stack the columns on mobile by making one full-width and the other half-width */}
          <Row className={style['profile']}>
            <Col className={style['self-pic']}>
              <Image
                src="/img/member/profile-dog.png"
                width={150}
                height={100}
                alt="selfie"
                className={style['profile-img']}
              />
              <button
                className={style['upload-text']}
                onClick={handleFileUpload}
              >
                <MdChangeCircle /> 更換頭像
                <input
                  type="file"
                  id="file0"
                  multiple="multiple"
                  style={{ display: 'none' }}
                />
              </button>
            </Col>
            <Col className={style['member-describe']}>
              潮州土狗
              <div className={style['member-fit']}>菲特友會員</div>
              <div className={style['member-date']}>永久效期</div>
            </Col>
            <Col className="col-6 col-md-4">
              <Image
                src="/img/member/member-card.png"
                width={280}
                height={130}
                alt="member-card"
              />
            </Col>
          </Row>
          {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
          <Row className={style['list']}>
            <Col className={style['list-text']}>
              1
              <div className={style['icon-box']}>
                待出貨
                <FaHourglassStart className={style['glasshour']} />
              </div>
            </Col>
            <Col className={style['list-text']}>
              2
              <div className={style['icon-box']}>
                已出貨
                <ImTruck className={style['truck']} />
              </div>
            </Col>
            <Col className={style['list-text']}>
              <a className={style['btn']} href="order.html">
                查看訂單
              </a>
            </Col>
          </Row>
          <Row className={style['list']}>
            <Col className={style['list-text']}>
              <a className={style['a-color']} href="profile.html">
                <FaAddressCard className={style['user-icons']} />
              </a>
              基本資料
            </Col>
            <Col className={style['list-text']}>
              <a className={style['a-color']} href="favorite.html">
                <BsBookmarkHeartFill className={style['icons']} />
              </a>
              我的收藏
            </Col>
            <Col className={style['list-text']}>
              <a className={style['a-color']} href="course-records.html">
                <AiFillSchedule className={style['class-icons']} />
              </a>
              課程評價
            </Col>
          </Row>
          <Row className={style['list']}>
            <Col className={style['list-text']}>
              50
              <div>
                總點數
                <FaSackDollar className={style['icons']} />
              </div>
            </Col>
            <Col className={style['list-text']}>
              -20
              <div>
                已使用
                <FaCoins className={style['icons']} />
              </div>
            </Col>
            <Col className={style['list-text']}>
              <a className={style['btn']} href="points.html">
                查看點數
              </a>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}
