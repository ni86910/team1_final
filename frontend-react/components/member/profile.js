import React from 'react'
import style from '@/styles/profile.module.scss'
import SideBar from '@/styles/m-sidebar.module.scss'
import Image from 'next/image'

/* React-Bootstrap */
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
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

export default function ProfilePage() {
  // 上傳圖像
  const handleFileUpload = () => {
    document.getElementById('file0').click() // 點擊隱藏的檔案輸入欄位
  }

  return (
    <>
      <section className={SideBar['center-container']}>
        {/* Side Bar Begin */}

        <Navbar className={SideBar['m-sidebar']}>
          <Container className={SideBar['m-container']}>
            <Navbar.Brand href="#profile" className={SideBar['text-h4']}>
              個人資料
            </Navbar.Brand>
            <Nav className={`me-auto ${SideBar['nav-side']}`}>
              <Nav.Link className={SideBar['Nav-link']} href="#member-center">
                會員中心
              </Nav.Link>
              <Nav.Link className={SideBar['Nav-link']} href="#order">
                我的訂單
              </Nav.Link>
              <Nav.Link className={SideBar['Nav-link']} href="#course-records">
                課程紀錄
              </Nav.Link>
              <Nav.Link className={SideBar['Nav-link']} href="#points">
                我的點數
              </Nav.Link>
              <Nav.Link className={SideBar['Nav-link']} href="#favorite">
                我的收藏
              </Nav.Link>
              <Nav.Link className={SideBar['Nav-link']} href="#logout">
                登出
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        {/* Side Bar End */}

        {/* Profile Start */}
        <Container className={style['profile-section']}>
          {/* Stack the columns on mobile by making one full-width and the other half-width */}
          <Row className={style['profile-a']}>
            <Col className={style['self-pic']}>
              <img
                src="/img/member/profile-dog.png"
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
              <div className={style['member-fit']}>菲特友會員</div>
              <div className={style['member-date']}>永久效期</div>
            </Col>
            <Col className="col-6 col-md-4">
              <img
                src="/img/member/member-card.png"
                className={style['member-card']}
              />
            </Col>
          </Row>
          {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}

          <Row className={style['profile']}>
          <Col className={style['profile-col']}>
              <Form className={style['profile-row']}>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className={style['profile']}>
            <Col className={style['profile-text']}>
              <a className={style['a-color']} href="profile.html">
                <FaAddressCard className={style['user-icons']} />
              </a>
              基本資料
            </Col>
            <Col className={style['profile-text']}>
              <a className={style['a-color']} href="favorite.html">
                <BsBookmarkHeartFill className={style['icons']} />
              </a>
              我的收藏
            </Col>
          </Row>
          <Row className={style['profile']}>
            <Col className={style['profile-text']}>
              50
              <div>
                總點數
                <FaSackDollar className={style['icons']} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}
