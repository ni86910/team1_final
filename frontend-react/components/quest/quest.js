import React, { useState } from 'react'
import Myaccordion from '../accordion/Myaccordion'
import { questions } from '@/pages/api/accordion-data-quest'
import Link from 'next/link'
import TOP from '@/components/TOPbutton/top'

export default function Quest() {
  const [data, setData] = useState(questions)
  return (
    <>
      {/* Breadcrumb Section Begin */}
      {/* <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>常見問題</h4>
                <div className="breadcrumb__links">
                  <Link href="./index.html">首頁</Link>
                  <span>常見問題</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* Header Section End */}
      {/* main Section begin*/}
      <div className="container">
        <div className="row">
          <h3 className="mt-4 text-center">常見問題</h3>
          <h5 className="mt-4 text-center" style={{ marginBottom: 20 }}>
            請透過下方分類快速找尋您的疑問，若仍無法獲得解答，您可以透過聯繫我們單元，直接與我們聯繫！
          </h5>
        </div>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link
              className="nav-link"
              style={{ color: 'black' }}
              aria-current="page"
              href="/quest"
            >
              場館相關
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={{ color: 'black' }}
              href="/quest/index-coach"
            >
              教練相關
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={{ color: 'black' }}
              href="/quest/index-all"
            >
              其他問題
            </Link>
          </li>
        </ul>
        <div className="row">
          {data.map((curElem) => {
            const { id } = curElem
            return <Myaccordion key={id} {...curElem} />
          })}
        </div>
      </div>
      {/* main Section end */}
      <TOP />
    </>
  )
}
