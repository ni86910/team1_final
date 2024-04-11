import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
/* My module.scss */
import style from '@/styles/order.module.scss'
import SideBar from '@/styles/m-sidebar.module.scss'
/* React-Bootstrap */
import {
  Nav,
  Navbar,
  Container,
  Row,
  Col,
  Stack,
  Accordion,
} from 'react-bootstrap'
/* React-icon */

export default function OrderPage() {
  return (
    <>
      <section className={SideBar['member-center-container']}>
        {/* Side Bar Begin */}
        <Navbar className={SideBar['m-sidebar']}>
          <Container className={SideBar['m-container']}>
            <Navbar.Brand href="#order" className={SideBar['text-h4']}>
              我的訂單
            </Navbar.Brand>
            <Nav className={`me-auto ${SideBar['nav-side']}`}>
              <Link className={SideBar['Nav-link']} href="#member-center">
                會員中心
              </Link>
              <Link className={SideBar['Nav-link']} href="#profile">
                個人資料
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

        {/* Order Start */}
        <Container className={style['order-section']}>
          <Container>
            <Row>
              <Col className={style['order-title']}>會員訂單專區</Col>
            </Row>
          </Container>
          {/* First order Container Start */}
          <Container>
            <Row className={style['order-first-Row']}>
              <Col className={style['order-first-col']}>
                <Stack direction="horizontal" gap={3}>
                  <div className="p-2">
                    <Image
                      src="/img/member/7-11.jpg"
                      width={23}
                      height={23}
                      alt="7-11"
                      className={style['jpg7-11']}
                    />
                    7-11取貨
                  </div>
                  <div className="p-2 ms-auto">信用卡3期 0利率</div>
                  <div className="p-2">訂購日期: 2024-01-02</div>
                </Stack>
                <Stack>
                  <div className="p-2">購物車編號：TG240127AA00TT</div>
                  <div className="p-2">訂購總額： NT$1,999</div>
                </Stack>
              </Col>

              <Accordion
                defaultActiveKey="0"
                className={style['first-accordion']}
              >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <div className={style['header-text']}>1項商品</div>
                  </Accordion.Header>
                  <Accordion.Body className={style['accordion-body']}>
                    <Image
                      src="/img/member/profile-dog.png"
                      width={100}
                      height={100}
                      alt="selfie"
                      className={style['products-img']}
                    />
                    <Stack>
                      <div className="p-2">商品名稱: 屏東 / 黑法鬥</div>
                      <div className="p-2">規格: 黑/5歲</div>
                      <div className="p-2">2024/02/06 取貨完成</div>
                    </Stack>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Row>
          </Container>
          {/* First order Container End */}

          {/* Second order Container Start */}

          {/* Second order Container Start */}
        </Container>
      </section>
    </>
  )
}
