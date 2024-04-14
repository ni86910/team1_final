import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import style from '@/styles/jack-use/button.module.css'
import Swiper from '@/components/article/swiper/swiper'
import Image from 'next/image'
import Link from 'next/link'
import { ARTICLE_ITEM } from '@/configs/index'

export default function Article() {
  const [artData, setArtData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('全部文章') // 默认选中全部文章
  const router = useRouter()

  useEffect(() => {
    fetch(ARTICLE_ITEM, { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        setArtData(data)
      })
    if (router.query.article) {
      // console.log(router.query.article)
      setSelectedCategory(router.query.article)
    }
  }, [router.isReady])

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value
    setSelectedCategory(selectedValue) // 更新选择的区域

    // 更新 URL 参数
    router.push(
      {
        pathname: '/article',
        query: { article: selectedValue },
      },
      undefined,
      { scroll: false }
    )
  }

  const filteredArtData = artData.filter((item) => {
    return (
      selectedCategory === '全部文章' || item.article_item === selectedCategory
    ) // 根据选择的区域进行过滤
  })
  console.log(router.query.article)

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="mt-4 text-center" style={{ marginTop: 20 }}>
            <Swiper />
          </div>

          <h4 className="mt-4 text-center">文章內容</h4>

          <p className="mt-4 text-center">
            我們提供最新、最實用的健身相關知識。
          </p>
        </div>
        <form
          action="get"
          className="row justify-content-center"
          style={{ marginBottom: 20 }}
        >
          <div className="col-auto">
            <select
              name="select"
              id="select"
              className={style['select']}
              data-type="select"
              data-width="medium"
              value={selectedCategory}
              onChange={handleSelectChange}
            >
              <option value="全部文章">全部文章</option>
              <option value="運動健身">運動健身</option>
              <option value="健康飲食">健康飲食</option>
            </select>
          </div>
        </form>

        <div className="row" style={{ marginBottom: 20 }}>
          {filteredArtData.map((v, i) => {
            return (
              <>
                <div key={i} className="col-4" style={{ marginTop: 20 }}>
                  <div className="card" style={{ height: 400 }}>
                    <div className="card-body">
                      <p className="card-text">{v.article_item}</p>
                      <Image
                        src={`/img/article/${v.article_image}`}
                        alt=""
                        style={{ marginBottom: 10 }}
                        width={300}
                        height={200}
                      />

                      <Link href={`/article/${v.article_id}`}>
                        <h5 className="card-title" style={{ color: 'black' }}>
                          {v.title}
                        </h5>
                      </Link>
                      <p className="card-text">發表日期: {v.post_date}</p>
                      <p className="card-text">作者: {v.teacher_name}</p>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}
