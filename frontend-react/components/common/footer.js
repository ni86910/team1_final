import React from 'react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer__about">
              <div className="footer__logo">
                <a href="#">
                  <img src="img/FITS U_RESIZE.png" alt="" />
                </a>
              </div>
              <p>您的健康好朋友 - 飛特友，健康生活一步到位。</p>
              <a href="#">
                <img src="img/payment.png" alt="" />
              </a>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6">
            <div className="footer__widget">
              <h6>關於我們</h6>
              <ul>
                <li>
                  <a href="#">揪團簡介</a>
                </li>
                <li>
                  <a href="#">人才招募</a>
                </li>
                <li>
                  <a href="#">聯絡我們</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6">
            <div className="footer__widget">
              <h6>服務項目</h6>
              <ul>
                <li>
                  <a href="#">探索課程與場地</a>
                </li>
                <li>
                  <a href="#">成為合作夥伴</a>
                </li>
                <li>
                  <a href="#">Fits U 健康商城</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6">
            <div className="footer__widget">
              <h6>條款與聲明</h6>
              <ul>
                <li>
                  <a href="#">服務條款</a>
                </li>
                <li>
                  <a href="#">隱私權政策</a>
                </li>
                <li>
                  <a href="#">退款政策</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6">
            <div className="footer__widget">
              <h6> </h6>
              <ul>
                <li>
                  <i className="fas fa-clock"></i> AM 8:00 ~ PM 17:00
                </li>
                <li>
                  <i className="fas fa-phone"></i> 07-789-987
                </li>
                <li>
                  <i className="fas fa-envelope"></i> FitsU_789@gmail.com
                </li>
                <li>
                  <i className="fab fa-line"></i> @FitsU_789
                </li>
                <li>
                  <i className="fab fa-facebook-square"></i> Fits U 健康平台
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
