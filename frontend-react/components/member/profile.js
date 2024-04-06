import React from 'react'
import Image from 'next/image'
/* My module.scss */
import style from '@/styles/profile.module.scss'
import SideBar from '@/styles/m-sidebar.module.scss'
/* React-Bootstrap */
import { Button, Nav, Navbar, Form, Container, Row, Col } from 'react-bootstrap'
/* React-icon */
import { MdChangeCircle } from 'react-icons/md'
import { FaStarOfLife } from 'react-icons/fa6'

export default function ProfilePage() {
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
          <Container>
            <Row>
              <Col className={style['title']}>會員基本資料</Col>
            </Row>
          </Container>
          {/* self-pic Start*/}
          <Row className={style['profile-first-row']}>
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

            {/* self-pic End*/}

            {/* Form Start*/}
            <Row className={style['profile']}>
              <Col className={style['profile-col']}>
                <Form className={style['profile-row']}>
                  <Form.Group
                    className={`mb-3 ${style['label-name']}`}
                    controlId="m_name"
                  >
                    <Form.Label className={style['label-text']}>
                      <FaStarOfLife className={style['icon-padding']} />
                      姓名
                    </Form.Label>
                    <Form.Control
                      style={{ borderRadius: '10px' }}
                      type="text"
                      name="m_name"
                      id="m_name"
                      placeholder="請輸入名稱"
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col className={style['profile-col']}>
                <Form className={style['profile-row']}>
                  <Form.Group
                    className={`mb-3 ${style['label-name']}`}
                    controlId="m_account"
                  >
                    <Form.Label className={style['label-text']}>
                      <FaStarOfLife className={style['icon-padding']} />
                      <div>信箱</div>
                    </Form.Label>
                    <Form.Control
                      style={{ borderRadius: '10px' }}
                      type="email"
                      name="m_account"
                      id="m_account"
                      placeholder="請輸入信箱"
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row className={style['profile']}>
              <Col className={style['profile-col']}>
                <Form className={style['profile-row']}>
                  <Form.Group
                    className={`mb-3 ${style['label-name']}`}
                    controlId="birthday"
                  >
                    <Form.Label className={style['label-text']}>
                      <FaStarOfLife className={style['icon-padding']} />
                      生日
                    </Form.Label>
                    <Form.Control
                      style={{ borderRadius: '10px' }}
                      type="date"
                      name="birthday"
                      id="birthday"
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col className={style['profile-col']}>
                <Form className={style['profile-row']}>
                  <Form.Group
                    className={`mb-3 ${style['label-name']}`}
                    controlId="mobile"
                  >
                    <Form.Label className={style['label-text']}>
                      <FaStarOfLife className={style['icon-padding']} />
                      手機
                    </Form.Label>
                    <Form.Control
                      style={{ borderRadius: '10px' }}
                      type="text"
                      name="mobile"
                      id="mobile"
                      placeholder="請輸入手機號碼 "
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Col className={style['profile-col']}>
              <Form.Group
                className={`mb-3 ${style['label-name']}`}
                controlId="address"
              >
                <Form.Label className={style['label-text']}>
                  <FaStarOfLife className={style['icon-padding']} />
                  地址
                </Form.Label>
                <Form.Control
                  style={{ borderRadius: '10px' }}
                  as="textarea"
                  rows={2}
                  name="address"
                  id="address"
                  placeholder="請輸入地址"
                />
              </Form.Group>
            </Col>
            <Row className={style['row-btn']}>
              <Col xs="auto">
                <Button
                  as="input"
                  type="submit"
                  value="確認"
                  className={style['edit-btn']}
                />
              </Col>
            </Row>
          </Row>
        </Container>
      </section>
    </>
  )
}
