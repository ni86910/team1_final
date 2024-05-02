import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Swal from 'sweetalert2'

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
  const router = useRouter()
  const { logout } = useAuth()

  const [accordionOpen, setAccordionOpen] = useState(null)

  const handleAccordionToggle = (eventKey) => {
    if (accordionOpen === eventKey) {
      setAccordionOpen(null)
    } else {
      setAccordionOpen(eventKey)
    }
  }

  return (
    <>
      <section className={SideBar['member-center-container']}>
        {/* Side Bar Begin */}
        <Navbar className={SideBar['m-sidebar']}>
          <Container className={SideBar['m-container']}>
            <Navbar.Brand
              // href="/member/order"
              className={SideBar['text-h4']}
            >
              我的訂單
            </Navbar.Brand>
            <Nav className={`me-auto ${SideBar['nav-side']}`}>
              <Link
                className={SideBar['Nav-link']}
                href="/member/member-center"
              >
                會員中心
              </Link>
              <Link className={SideBar['Nav-link']} href="/member/profile">
                個人資料
              </Link>
              <Link
                className={SideBar['Nav-link']}
                href="/member/course-records"
              >
                課程紀錄
              </Link>
              <Link className={SideBar['Nav-link']} href="/member/points">
                我的點數
              </Link>
              <Link className={SideBar['Nav-link']} href="/member/favorite">
                我的收藏
              </Link>
              <Link
                className={SideBar['logout-Nav-link']}
                href={'#'}
                onClick={(e) => {
                  Swal.fire({
                    title: '確定登出嗎?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#EB6234',
                    cancelButtonColor: 'black',
                    confirmButtonText: '確定',
                    cancelButtonText: '取消',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      logout()
                      setTimeout(() => {
                        Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: '登出成功',
                          showConfirmButton: false,
                          timer: 2000,
                        })
                      }, 200)
                      router.push('/member/login')
                    }
                  })
                }}
              >
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
                  <div className="p-2 ms-auto">貨到付款</div>
                  <div className="p-2">訂購日期: 2024-05-02</div>
                </Stack>
                <Stack>
                  <div className="p-2">訂單編號：FTU000010</div>
                  <div className="p-2">訂購總額： NT$2,700</div>
                </Stack>
              </Col>

              <Accordion
                className={style['first-accordion']}
                activeKey={accordionOpen}
              >
                <Accordion.Item eventKey="1">
                  <Accordion.Header onClick={() => handleAccordionToggle('1')}>
                    <div className={style['header-text']}>4項商品</div>
                  </Accordion.Header>
                  <Accordion.Body className={style['accordion-body']}>
                    <Image
                      src="/img/products/product_gym_06_00_00.webp"
                      width={100}
                      height={100}
                      alt="selfie"
                      className={style['products-img']}
                    />
                    <Stack>
                      <div className="p-2">商品名稱: 柔軟壺鈴 4kg</div>
                      <div className="p-2">規格: F</div>
                      <div className="p-2">2024-05-02 訂單成立</div>
                    </Stack>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Row>
          </Container>
          {/* First order Container End */}

          {/* Second order Container Start */}
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
                  <div className="p-2 ms-auto">LINEPAY</div>
                  <div className="p-2">訂購日期: 2024-04-26</div>
                </Stack>
                <Stack>
                  <div className="p-2">訂單編號：FTU000009</div>
                  <div className="p-2">訂購總額： NT$3,999</div>
                </Stack>
              </Col>

              <Accordion
                className={style['first-accordion']}
                activeKey={accordionOpen}
              >
                <Accordion.Item eventKey="2">
                  <Accordion.Header onClick={() => handleAccordionToggle('2')}>
                    <div className={style['header-text']}>1項商品</div>
                  </Accordion.Header>
                  <Accordion.Body className={style['accordion-body']}>
                    <Image
                      src="/img/products/product_yoga_12_00_00.webp"
                      width={100}
                      height={100}
                      alt="selfie"
                      className={style['products-img']}
                    />
                    <Stack>
                      <div className="p-2">商品名稱: 大號泡棉瑜珈磚</div>
                      <div className="p-2">規格: 紫色</div>
                      <div className="p-2">2024-02-06 取貨完成</div>
                    </Stack>
                  </Accordion.Body>
                  <div className={style['straight-line']} />
                  <Accordion.Body className={style['accordion-body']}>
                    <Image
                      src="/img/products/product_acc_01_00_00.jpg"
                      width={100}
                      height={100}
                      alt="selfie"
                      className={style['products-img']}
                    />
                    <Stack>
                      <div className="p-2">
                        商品名稱: 中階舒適止滑重訓手套 (S ~ XL)
                      </div>
                      <div className="p-2">規格: M</div>
                      <div className="p-2">2024-02-06 取貨完成</div>
                    </Stack>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Row>
          </Container>
          {/* Second order Container Start */}
        </Container>
      </section>
    </>
  )
}
