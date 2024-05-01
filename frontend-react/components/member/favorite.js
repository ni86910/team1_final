import React from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth-context' 
import Link from 'next/link'
import Swal from 'sweetalert2'
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
import { FaHeart } from 'react-icons/fa'
import ArtFavorite from './mem-articlefav'
import FavClassTab from './fav-class-tab'

export default function FavoritePage() {
  const router = useRouter()
  const { logout } = useAuth()

  // 假設您已經有了名為 classScheduleFavorites、productFavorites 和 articleFavorites 的收藏列表
  const classScheduleFavorites = [
    { class_id: 1, class_name: '課程1', class_img: '圖片1' },
    { class_id: 2, class_name: '課程2', class_img: '圖片2' },
    // 其他課程收藏項目...
  ]

  const productFavorites = [
    { product_id: 1, product_name: '商品1', image: '圖片1' },
    { product_id: 2, product_name: '商品2', image: '圖片2' },
    // 其他商品收藏項目...
  ]

  // const articleFavorites = [
  //   { article_id: 1, article_title: '文章1', post_date: '2024-01-01' },
  //   { article_id: 2, article_title: '文章2', post_date: '2024-02-02' },
  //   // 其他文章收藏項目...
  // ]

  return (
    <>
      <section className={SideBar['member-center-container']}>
        {/* Side Bar Begin */}
        <Navbar className={SideBar['m-sidebar']}>
          <Container className={SideBar['m-container']}>
            <Navbar.Brand
              // href="/member/favorite"
              className={SideBar['text-h4']}
            >
              我的收藏
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
              <Link
                className={SideBar['Nav-link']}
                href="/member/course-records"
              >
                課程紀錄
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
              <Col className={style['title']}>會員收藏專區</Col>
            </Row>
          </Container>
          {/* Tabs - Favorite Start*/}
          <Row className={style['favorite-first-row']}>
            <Row>
              <Col>
                <Tabs
                  defaultActiveKey="class-schedule"
                  id="favorite-tabs"
                  className={`mb-3 ${style['all-tabs']}`}
                  justify
                >
                  <Tab eventKey="class-schedule" title="課程收藏">
                    <FavClassTab />
                  </Tab>
                  <Tab eventKey="product" title="商品收藏">
                    <Table striped hover bordered className="mt-4">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>商品圖片</th>
                          <th>商品名稱</th>
                          <th>
                            <FaHeart />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {productFavorites.map((fav, index) => (
                          <tr key={fav.product_id}>
                            <td>{index + 1}</td>
                            <td>{fav.image}</td>
                            <td>{fav.product_name}</td>
                            <td>
                              <FaHeart />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab>
                  <Tab eventKey="article" title="文章收藏">
                    <ArtFavorite />
                  </Tab>
                </Tabs>
              </Col>
            </Row>
            {/* self-pic End*/}
          </Row>
        </Container>
      </section>
    </>
  )
}
