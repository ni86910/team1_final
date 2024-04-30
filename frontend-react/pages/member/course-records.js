import { useEffect } from 'react'
import { useAuth } from '@/context/auth-context' //登出
import Image from 'next/image'
import Link from 'next/link'
/* My module.scss */
import style from '@/styles/favorite.module.scss'
import SideBar from '@/styles/m-sidebar.module.scss'
/* React-Bootstrap */
import {
  Nav,
  Navbar,
  Container,
  Row,
  Col,
  Tab,
  Tabs,
  Table,
} from 'react-bootstrap'
/* React-icon */
import ClassRecordTable from '@/components/member/class-record-table'
import { useBreadcrumb } from '@/context/breadcrumb-context'

export default function CourseRecords() {
  const { logout } = useAuth()
  // 設定麵包屑
  const { setPath, setPageName } = useBreadcrumb()

  useEffect(() => {
    setPath([{ name: '會員中心', href: '/', isEnd: true }])
    setPageName('會員中心')
  }, [])
  return (
    <>
      <section className={SideBar['member-center-container']}>
        {/* Side Bar Begin */}
        <Navbar className={SideBar['m-sidebar']}>
          <Container className={SideBar['m-container']}>
            <Navbar.Brand
              href="/member/course-records"
              className={SideBar['text-h4']}
            >
              課程紀錄
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
              <Link className={SideBar['Nav-link']} href="/member/order">
                我的訂單
              </Link>
              <Link className={SideBar['Nav-link']} href="/member/favorite">
                我的收藏
              </Link>
              <Link className={SideBar['Nav-link']} href="/member/points">
                我的點數
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

        {/* Favorite Start */}
        <Container className={style['favorite-section']}>
          <Container>
            <Row>
              <Col className={style['title']}>課程紀錄</Col>
            </Row>
          </Container>
          {/* Tabs - Favorite Start*/}
          <Row className={style['favorite-first-row']}>
            <Row>
              <Col>
                <ClassRecordTable />
              </Col>
            </Row>
            {/* self-pic End*/}
          </Row>
        </Container>
      </section>
    </>
  )
}
