import { useState, useEffect } from 'react'
import ImageSlider from '../src/ImageSlider'
import Image from 'next/image'
import { FaSearch } from 'react-icons/fa'
import Link from 'next/link'
import { ARTICLE_ITEM } from '@/configs/index'

export default function Article() {
  const [artData, setArtDate] = useState([])

  useEffect(() => {
    fetch(ARTICLE_ITEM, { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        setArtDate(data)
      })
  }, [])

  // 將資料分組為每行3筆
  const groupedData = []
  for (let i = 0; i < artData.length; i += 3) {
    groupedData.push(artData.slice(i, i + 3))
  }

  return (
    <>
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
            <Link href="#health-diet">健康飲食</Link>
          </div>
          <div className="item">
            <Link href="#weight loss">減重管理</Link>
          </div>
          <div className="item">
            <Link href="#sport">運動健身</Link>
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
        {/* 以每行3筆資料的方式渲染 */}
        {groupedData.map((rowData, index) => (
          <div className="row" key={index} style={{ marginBottom: 20 }}>
            <h5 className="mt-4 article-next" style={{ marginBottom: 10 }}>
              <Link href={`#row${index}`}>
                {rowData[0].article_item}{' '}
                {/* 使用該行第一筆資料的類別作為標題 */}
              </Link>
            </h5>
            {rowData.map((article, idx) => (
              <div className="col-4" key={idx}>
                <div className="card">
                  <div className="card-body">
                    <Image
                      src="/img/article/food.png"
                      alt=""
                      style={{ marginBottom: 10 }}
                      width={300}
                      height={200}
                    />
                    <Link href="/article/{article.article_id}">
                      <h5 className="article-title">{article.title}</h5>
                    </Link>
                    <p className="card-text">發布時間：{article.post_date}</p>
                    <p className="card-text">作者： {article.teacher_name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Article Section End */}
    </>
  )
}
