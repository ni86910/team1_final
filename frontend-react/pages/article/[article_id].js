import { useState, useEffect } from 'react'
import style from '@/styles/jack-use/button.module.css'
import Image from 'next/image'
import Link from 'next/link'
import BookMark from '@/components/article/bookmark/bookmark'
import { useRouter } from 'next/router'
import { API_SERVER } from '@/configs/index'

export default function ArticleDetail() {
  const router = useRouter()

  // 用來接收 fetch資料 的狀態
  const [artInfo, setArtInfo] = useState({
    article_id: 0,
    article_item: '',
    title: '',
    content: '',
    post_date: '',
    publish: '',
    teacher_id: '',
    teacher_name: '',
    article_image: '',
  })

  // fetch時要執行的function
  const getArticleData = async (article_id) => {
    const url = `${API_SERVER}/article/${article_id}`

    // 開始fetch
    try {
      const r = await fetch(url)
      const data = await r.json()
      // 這裡拿到的是物件
      if (typeof data === 'object' && data) {
        setArtInfo(data)
        console.log(data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // router.isReady時 就要去fetch資料
  useEffect(() => {
    if (router.isReady) {
      const { article_id } = router.query
      console.log('article_id:', article_id)
      getArticleData(article_id)
    }
  }, [router.isReady])

  return (
    <>
      {/* Article Section Begin */}
      {!artInfo ? (
        <div>loading...</div>
      ) : (
        <div className="container">
          <div className="row">
            <h4 className="mt-4 text-center">{artInfo.title}</h4>
            <p className="mt-4">
              {artInfo.post_date} | {artInfo.article_item}
            </p>
            <div className="col">
              <BookMark />
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <Image
                src={`/img/article/${artInfo.article_image}`}
                alt=""
                width={900}
                height={550}
              />
              <p className="mt-4" style={{ lineHeight: 2.5 }}>
                {artInfo.content}
              </p>
            </div>
          </div>
          <p className="mt-4">作者: {artInfo.teacher_name}</p>
          <div
            className="row"
            style={{ backgroundColor: '#E6E6E6', marginBottom: 20 }}
          >
            <div className="col-lg-12">
              <h4 className="mt-4 text-center">文章留言區</h4>
              <p className="mt-4 text-center">
                對本文章的建議以及想法，可以到底下留言告訴我們哦
              </p>
            </div>
            <div className="col-lg-6 col-md-6 mx-auto">
              {' '}
              {/* 使用 mx-auto 使其水平置中 */}
              <div className="contact__form">
                <form action="#">
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control"
                        placeholder="Message"
                        rows={4}
                        defaultValue={''}
                      />
                      <div className="text-center" style={{ marginBottom: 10 }}>
                        <button type="reset" className={style['site-btn']}>
                          重新填寫
                        </button>
                        <button type="submit" className={style['site-btn']}>
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Article Section End */}
    </>
  )
}
