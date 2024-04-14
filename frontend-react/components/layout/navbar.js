import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  FaRegHeart,
  FaUser,
  FaBasketShopping,
  FaRegClock,
  FaStore,
} from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'

export default function Navbar() {
  const [offcanvas, setOffcanvas] = useState('')

  const openCanvasHandler = () => {
    offcanvas == 'active' ? setOffcanvas('') : setOffcanvas('active')
  }

  return (
    <>
      {/* Offcanvas Menu Begin */}
      <div
        className={`offcanvas-menu-overlay ${offcanvas}`}
        onClick={openCanvasHandler}
        onKeyPress={() => {}}
        role="button"
        tabIndex="0"
      />
      <div className={`offcanvas-menu-wrapper ${offcanvas}`}>
        <div className="offcanvas__option">
          <div className="offcanvas__links">
            <a href="/pages/member/register">註冊</a>
            <a href="#">常見問題</a>
          </div>
          <div className="offcanvas__top__hover">
            <span>
              會員專區 <i className="arrow_carrot-down" />
            </span>
            <ul>
              <li>會員資料</li>
              <li>預約課程一覽</li>
              <li>歷史訂單</li>
              <li>登出</li>
            </ul>
          </div>
        </div>
        <div className="offcanvas__nav__option">
          <Link href="#" className="search-switch">
            <Image
              src="/img/navbar-template/icon/search_w.png"
              width={19}
              height={19}
              alt=""
            />
          </Link>
          <Link href="#">
            <FaRegHeart />
          </Link>
          <Link href="#">
            <Image
              src="/img/navbar-template/icon/cart.png"
              width={19}
              height={19}
              alt=""
            />
            <span>1</span>
          </Link>
          <div className="quantity">共 1 件商品</div>
        </div>
        <div id="mobile-menu-wrap" />
        <div className="offcanvas__text">
          <p>現在加入菲特友，開啟專屬您的運動計畫!</p>
        </div>
      </div>
      {/* Offcanvas Menu End */}
      {/* Header Section Begin */}
      <header className="header">
        <div className="header-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7">
                <div className="header-top-left">
                  <p>現在加入菲特友，即享課程體驗優惠!</p>
                </div>
              </div>
              <div className="col-lg-6 col-md-5">
                <div className="header-top-right">
                  <div className="header-top-links">
                    <Link
                      href="/member/login"
                      style={{ color: '#EB6234', fontSize: 14 }}
                    >
                      登入會員
                    </Link>
                    <span style={{ color: '#cccccc', fontSize: 14 }}>
                      還不是會員?
                    </span>{' '}
                    <Link href="/member/register" style={{ fontSize: 14 }}>
                      註冊
                    </Link>
                  </div>
                  <div className="header-top-hover">
                    <span style={{ fontSize: 14 }}>
                      會員專區 <i className="arrow_carrot-down" />
                    </span>
                    <ul>
                      <li>會員資料</li>
                      <li>訂單紀錄</li>
                      <li>登出</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <div className="header_logo">
                <Link href="#">
                  <Image
                    src="/public_img/FITS U_RESIZE.png"
                    alt=""
                    width={180}
                    height={108}
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 align-self-center d-flex justify-content-between">
              <nav className="header-menu mobile-menu">
                <ul>
                  <li>
                    <Link href="#">
                      課程預約 <FaRegClock />
                    </Link>
                  </li>
                  <li className="active">
                    <Link href="#">
                      健康商城 <FaStore />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      了解更多 <IoIosArrowDown />
                    </Link>
                    <ul className="dropdown">
                      <li>
                        <Link href="#">健康小知識</Link>
                      </li>
                      <li>
                        <Link href="#">常見問題</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link href="#">
                      關於我們 <IoIosArrowDown />
                    </Link>
                    <ul className="dropdown">
                      <li>
                        <Link href="#">團隊介紹</Link>
                      </li>
                      <li>
                        <Link href="#">場地一覽</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-2 col-md-2 d-flex justify-content-end">
              <div className="header-nav-option">
                <Link href="#">
                  <FaRegHeart />
                </Link>
                <Link href="#">
                  <FaUser />
                </Link>
                <Link href="#">
                  <FaBasketShopping /> <span>1</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="canvas-open">
            <i className="fa fa-bars" />
          </div>
        </div>
      </header>
      {/* Header Section End */}
      {/* Breadcrumb Section Begin */}
      <section className={`breadcrumb-option`}>
        <div className={`container`}>
          <div className={`row`}>
            <div className={`col-lg-12`}>
              <div className={`breadcrumb-text`}>
                <h4>健康商城</h4>
                <div className={`breadcrumb-links`}>
                  <Link href="#">首頁</Link>
                  <span>所有商品</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
    </>
  )
}
