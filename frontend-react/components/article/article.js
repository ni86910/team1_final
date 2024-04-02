import React from 'react'
import ImageSlider from '../src/ImageSlider'
import Image from 'next/image'
import { FaSearch } from 'react-icons/fa'

export default function Article() {
  return (
    <>
      {/* Breadcrumb Section Begin */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>健康小知識</h4>
                <div className="breadcrumb__links">
                  <a href="./index.html">首頁</a>
                  <span>健康小知識</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <ImageSlider />
          </div>
        </div>
      </div>
      {/* carousel End*/}

      {/* Article Section Begin */}
      <div className="container">
        <div className="article-container">
          <div className="item">
            <a href="#health-diet">健康飲食</a>
          </div>
          <div className="item">
            <a href="#weight loss">減重管理</a>
          </div>
          <div className="item">
            <a href="#sport">運動健身</a>
          </div>
          <div className="navbar search">
            <div className="search-container">
              <form className="d-flex">
                <input
                  className="form-control me-2 search-border"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn" type="submit">
                  <FaSearch />
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <h4 className="mt-4 text-center">文章分類</h4>
          <p className="mt-4 text-center">
            我們提供最新、最實用的健身相關知識。
          </p>
        </div>
        <div className="row">
          <div
            className="card col border-0"
            style={{ backgroundColor: '#E6E6E6' }}
          >
            <Image
              src="/img/article/food.png"
              className="card-img-top"
              alt="..."
              style={{ width: 'auto', height: 'auto' }}
              width={300}
              height={200}
            />
          </div>
          <div
            className="card col border-0"
            style={{ backgroundColor: '#E6E6E6' }}
          >
            <div className="card-body">
              <p>2024.01.22 | 運動健身</p>
              <h3 className="article-title">
                活用漸進式負荷訓練技巧讓初學者的增肌之路變得更加快速
              </h3>
              <p className="article-next">
                <a href="article/detail-index">+ 前往文章</a>
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <h4 id="health-diet" className="mt-4">
            健康飲食
          </h4>
        </div>
        <div className="row" style={{ marginTop: 20 }}>
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <Image
                  src="/img/article/food.png"
                  alt=""
                  style={{ marginBottom: 10 }}
                  width={300}
                  height={200}
                />
                <a href="#">
                  <h5 className="card-title">
                    月經失調、體重暴增？瘦不下來竟是多囊惹的禍！
                  </h5>
                </a>
                <p className="card-text">2024.03.21 |營養新知</p>
                <p className="card-text">作者： xxx 營養師</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <Image
                  src="/img/article/photo-sport.png"
                  alt=""
                  style={{ marginBottom: 10 }}
                  width={300}
                  height={200}
                />
                <a href="#">
                  <h5 className="card-title">
                    甜食控注意！糖上癮恐睡不著、心情差、慢性發炎
                  </h5>
                </a>
                <p className="card-text">2024.03.21 |營養新知</p>
                <p className="card-text">作者： xxx 營養師</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <Image
                  src="/img/article/salad.png"
                  alt=""
                  style={{ marginBottom: 10 }}
                  width={300}
                  height={200}
                />
                <a href="">
                  <h5 className="card-title">
                    女性必知減重荷爾蒙: 沒搞懂這些激素，月經減重不會瘦!
                  </h5>
                </a>
                <p className="card-text">2024.03.21 |營養新知</p>
                <p className="card-text">作者： xxx 營養師</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <h4 id="weight loss" className="mt-4">
            減重管理
          </h4>
        </div>
        <div className="row">
          <h4 id="sport" className="mt-4">
            運動健身
          </h4>
        </div>
      </div>
      {/* Article Section End */}
    </>
  )
}
