import React from 'react'
import Image from 'next/image'
import {
  FaClock,
  FaPhone,
  FaEnvelope,
  FaLine,
  FaFacebookSquare,
} from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer-about">
              <div className="footer-logo">
                <a href="#">
                  <img src="/img/navbar-template/FITS U_RESIZE.png" alt="" />
                </a>
              </div>
              <p>您的健康好朋友 - 飛特友，健康生活一步到位。</p>
              <a href="#">
                <img src="/img/navbar-template/payment.png" alt="" />
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer-widget">
              <ul>
                <li>
                  <FaClock />
                  <span style={{ marginLeft: '8px' }}>AM 8:00 ~ PM 17:00</span>
                </li>
                <li>
                  <FaPhone />
                  <span style={{ marginLeft: '8px' }}>07-789-987</span>
                </li>
                <li>
                  <FaEnvelope />
                  <span style={{ marginLeft: '8px' }}>FitsU_789@gmail.com</span>
                </li>
                <li>
                  <FaLine />
                  <span style={{ marginLeft: '8px' }}>@FitsU_789</span>
                </li>
                <li>
                  <FaFacebookSquare />
                  <span style={{ marginLeft: '6px' }}>Fits U 健康平台</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div className="footer-widget">
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
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div className="footer-widget">
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
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div className="footer-widget">
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
        </div>
      </div>
    </footer>
  )
}
