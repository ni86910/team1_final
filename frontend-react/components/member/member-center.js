import { useState } from 'react'
import { useRouter } from 'next/router'
// Hooks
import { useAuth } from '@/context/auth-context'
import { usePoints } from '@/context/points-context'
// Style
import style from '@/styles/member-center.module.scss'
import SideBar from '@/styles/m-sidebar.module.scss'
// Next
import Image from 'next/image'
import Link from 'next/link'

/* React-Bootstrap */
import { Nav, Navbar, Container, Row, Col } from 'react-bootstrap'
/* React-icon */
import { ImTruck } from 'react-icons/im'
import { FaHourglassStart } from 'react-icons/fa'
import { BsBookmarkHeartFill } from 'react-icons/bs'
import { AiFillSchedule } from 'react-icons/ai'
import { FaSackDollar, FaAddressCard } from 'react-icons/fa6'

export default function MemberCenterPage() {
  const router = useRouter()
  const { auth, logout } = useAuth()
  const { totalPoints } = usePoints()

  const [profileImage, setProfileImage] = useState(
    '/img/member/default-self.jpg'
  )

  /* 上傳圖像
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    const imageUrl = await uploadImage(file)
    if (imageUrl) {
      setProfileImage(imageUrl)
    }
  }
*/
  return (
    <>
      <section className={SideBar['member-center-container']}>
        {/* Side Bar Begin */}

        <Navbar className={SideBar['m-sidebar']}>
          <Container className={SideBar['m-container']}>
            <Navbar.Brand
              href="/member/member-center"
              className={SideBar['text-h4']}
            >
              會員中心
            </Navbar.Brand>
            <Nav className={`me-auto ${SideBar['nav-side']}`}>
              <Link className={SideBar['Nav-link']} href="/member/profile">
                個人資料
              </Link>
              <Link className={SideBar['Nav-link']} href="/member/order">
                我的訂單
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
                className={SideBar['Nav-link']}
                href="/member/logout"
                onClick={(e) => {
                  e.preventDefault()
                  logout()
                }}
              >
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
                src={profileImage}
                width={150}
                height={100}
                alt="selfie"
                className={style['profile-img']}
              />
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
              <a className={style['btn']} href="order">
                查看訂單
              </a>
            </Col>
          </Row>
          <Row className={style['list']}>
            <Col className={style['list-text']}>
              <a className={style['a-color']} href="profile">
                <FaAddressCard className={style['user-icons']} />
                基本資料
              </a>
            </Col>
            <Col className={style['list-text']}>
              <a className={style['a-color']} href="favorite">
                <BsBookmarkHeartFill className={style['icons']} />
                我的收藏
              </a>
            </Col>
            <Col className={style['list-text']}>
              <a className={style['a-color']} href="course-records">
                <AiFillSchedule className={style['class-icons']} />
                課程評價
              </a>
            </Col>
          </Row>
          <Row className={style['list']}>
            <Col className={style['list-text']}>
              {/* 會員點數context */}
              {totalPoints}
              <div>
                總點數
                <FaSackDollar className={style['icons']} />
              </div>
            </Col>
            <Col className={style['list-text']}>
              <a className={style['btn']} href="points">
                使用紀錄
              </a>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}
