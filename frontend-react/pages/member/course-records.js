import React from 'react'
import { useAuth } from '@/context/auth-context'
import NotLogin from '@/components/common/not-login'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
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

export default function CourseRecords() {
  const router = useRouter()
  const { logout } = useAuth()
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
                className={SideBar['logout-Nav-link']}
                href={'#'}
                onClick={(e) => {
                  logout()
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
      <NotLogin />
    </>
  )
}
