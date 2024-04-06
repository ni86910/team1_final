import React from 'react'
import Link from 'next/link'
/* My module.scss */
import style from '@/styles/points.module.scss'
import SideBar from '@/styles/m-sidebar.module.scss'
/* React-Bootstrap */
import {
  Table,
  Nav,
  Navbar,
  Container,
  Row,
  Col,
  Tab,
  Tabs,
} from 'react-bootstrap'
/* React-icon */

export default function PointsPage() {
  return (
    <>
      <section className={SideBar['member-center-container']}>
        {/* Side Bar Begin */}
        <Navbar className={SideBar['m-sidebar']}>
          <Container className={SideBar['m-container']}>
            <Navbar.Brand href="#profile" className={SideBar['text-h4']}>
              我的點數
            </Navbar.Brand>
            <Nav className={`me-auto ${SideBar['nav-side']}`}>
              <Link className={SideBar['Nav-link']} href="#member-center">
                會員中心
              </Link>
              <Link className={SideBar['Nav-link']} href="#profile">
                個人資料
              </Link>
              <Link className={SideBar['Nav-link']} href="#order">
                我的訂單
              </Link>
              <Link className={SideBar['Nav-link']} href="#course-records">
                課程紀錄
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

        {/* Points Start */}
        <Container className={style['point-section']}>
          <Container>
            <Row>
              <Col className={style['point-title']}>會員點數專區</Col>
            </Row>
          </Container>
          {/* First Point Container Start */}
          <Row className={style['point-first-row']}>
            <Col className={style['point-left']}>
              <div className={style['points-number']}>50</div>
              <div>我的點數</div>
            </Col>

            <Col className={style['point-right']}>
              <div className={style['points-number']}>70</div>
              <div>評論點數</div>
            </Col>
          </Row>
          {/* First Point Container End */}

          {/* Second Point Container Start */}
          <Row className={style['point-second-row']}>
            <Col>
              {' '}
              <Tabs
                defaultActiveKey="points"
                id="justify-tab-example"
                className={`mb-3 ${['Tabs-color']}`}
                justify
              >
                <Tab eventKey="points" title="點數紀錄">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <td width={300}>
                          <span>日期</span>
                        </td>
                        <td width={300}>
                          <span>類型</span>
                        </td>
                        <td>
                          <span>紅利點數</span>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2024/02/17 18:00</td>
                        <td>評價課程</td>
                        <td>
                          <span>
                            <span points="10" class="PointValue">
                              <span>+10</span>
                            </span>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>2022/02/17 15:00</td>
                        <td>評價課程</td>
                        <td>
                          <span>
                            <span points="20" class="PointValue">
                              <span>+20</span>
                            </span>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>2023/11/29 23:59</td>
                        <td>購物折抵</td>
                        <td>
                          <span>
                            <span
                              points="-8"
                              class="PointValue"
                              style={{ color: 'red' }}
                            >
                              <span>-8</span>
                            </span>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab>
                <Tab eventKey="remark" title="使用紀錄">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <td width={300}>
                          <span>日期</span>
                        </td>
                        <td width={300}>
                          <span>訂單編號</span>
                        </td>
                        <td>
                          <span>使用點數</span>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2024/02/17 18:00</td>
                        <td>TGFDEWK025884</td>
                        <td>
                          <span>
                            <span points="-19" style={{ color: 'red' }}>
                              <span>-19</span>
                            </span>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>2023/11/29 23:59</td>
                        <td>TGFDEWK057747</td>
                        <td>
                          <span>
                            <span points="-8" style={{ color: 'red' }}>
                              <span>-8</span>
                            </span>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab>
              </Tabs>
            </Col>
          </Row>
          {/* Second Point Container Start */}
        </Container>
      </section>
    </>
  )
}
