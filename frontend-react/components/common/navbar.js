import { useState } from 'react'
import Image from 'next/image'

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
            <a href="#">註冊</a>
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
          <a href="#" className="search-switch">
            <Image src="/img/icon/search_w.png" width={19} height={19} alt="" />
          </a>
          <a href="#">
            <Image src="/img/icon/heart.png" width={19} height={19} alt="" />
          </a>
          <a href="#">
            <Image src="/img/icon/cart.png" width={19} height={19} alt="" />
            <span>1</span>
          </a>
          <div className="quantity">共 1 件商品</div>
        </div>
        <div id="mobile-menu-wrap" />
        <div className="offcanvas__text">
          <p>現在加入菲特友，開啟專屬您的運動計畫!</p>
        </div>
      </div>
      {/* Offcanvas Menu End */}
      {/* Header Section Begin */}
      <header className="header ">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7">
                <div className="header__top__left">
                  <p>現在加入菲特友，即享課程體驗優惠!</p>
                </div>
              </div>
              <div className="col-lg-6 col-md-5">
                <div className="header__top__right">
                  <div className="header__top__links">
                    <a href="#">加入會員</a>
                    <a href="#">
                      <i className="fa-regular fa-comments" /> 常見問題
                    </a>
                  </div>
                  <div className="header__top__hover">
                    <span>
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
                <a href="#">
                  <Image
                    src="/img/FITS U_RESIZE.png"
                    width={180}
                    height={108}
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li>
                    <a href="#">
                      課程預約
                      <i className="arrow_carrot-down" />
                    </a>
                    <ul className="dropdown">
                      <li>
                        <a href="#">課程介紹</a>
                      </li>
                      <li>
                        <a href="#">線上預約</a>
                      </li>
                    </ul>
                  </li>
                  <li className="active">
                    <a href="./shop.html">健康商城</a>
                  </li>
                  <li>
                    <a href="#">
                      了解更多 <i className="arrow_carrot-down" />
                    </a>
                    <ul className="dropdown">
                      <li>
                        <a href="#">健康小知識</a>
                      </li>
                      <li>
                        <a href="#">常見問題</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">
                      關於我們
                      <i className="arrow_carrot-down" />
                    </a>
                    <ul className="dropdown">
                      <li>
                        <a href="#">團隊介紹</a>
                      </li>
                      <li>
                        <a href="#">服務項目</a>
                      </li>
                      <li>
                        <a href="#">場地一覽</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="header__nav__option">
                <a href="#" className="search-switch">
                  <Image
                    src="/img/icon/search_w.png"
                    width={19}
                    height={19}
                    alt=""
                  />
                </a>
                <a href="#">
                  <Image
                    src="/img/icon/heart_w.png"
                    width={19}
                    height={19}
                    alt=""
                  />
                </a>
                <a href="#">
                  <Image
                    src="/img/icon/user_w.png"
                    width={19}
                    height={19}
                    alt=""
                  />
                </a>
                <a href="#">
                  <Image
                    src="/img/icon/cart_w.png"
                    width={19}
                    height={19}
                    alt=""
                  />
                  <span>1</span>
                </a>
                <div className="price">共1件商品</div>
              </div>
            </div>
          </div>
          <div
            className="canvas__open"
            onClick={openCanvasHandler}
            onKeyPress={() => {}}
            role="button"
            tabIndex="0"
          >
            <i className="fa fa-bars" />
          </div>
        </div>
      </header>
      {/* Header Section End */}
    </>
  )
}
