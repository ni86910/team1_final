import { useState, useEffect } from 'react'
import style from '@/styles/jack-use/button.module.css'
import styles from '@/styles/jack-use/table.module.css'
import TOP from '@/components/TOPbutton/top'
import Image from 'next/image'
import ArticleFav from '@/components/article/bookmark/article-fav'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth-context'
import { API_SERVER } from '@/configs/index'
import Swal from 'sweetalert2'

export default function ArticleDetail() {
  const router = useRouter()
  const { auth } = useAuth()

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
    message: [],
  })

  const [artformData, setArtformdata] = useState({
    article_id: 0,
    message_name: '',
    message_email: '',
    message_content: '',
  })

  //文章分段
  const text2jsx = (text) => {
    return text.split('\n\n').map((v, i) => (
      <div className="article-section" key={i}>
        {v.split('\n').map((v2, i2) => (
          <div className="article-p" key={`${i}-${i2}`}>
            {v2}
          </div>
        ))}
      </div>
    ))
  }

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

  const handleChange = (e) => {
    setArtformdata({
      ...artformData,
      [e.target.name]: e.target.value,
      article_id: artInfo.article_id,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 數據驗證：確保所有必填內容不為空白
    if (
      !artformData.message_name ||
      !artformData.message_email ||
      !artformData.message_content
    ) {
      // alert('請完整填寫所有必填字段。')
      Swal.fire('請完整填寫所有必填字段!')
      return
    }

    try {
      const response = await fetch(`${API_SERVER}/article/:article_id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(artformData),
      })

      if (response.ok) {
        // alert('表單提交成功！')
        Swal.fire('表單提交成功！')
        e.target.reset()
      } else {
        // alert('表單提交失敗，請稍後再試。')
        Swal.fire('表單提交失敗，請稍後再試！')
        console.error('Failed to submit form')
      }
      console.log(artformData)
    } catch (error) {
      // alert('提交過程中出現錯誤，請稍後再試。')
      Swal.fire('提交過程中出現錯誤，請稍後再試。')
      console.error('Error submitting form:', error)
    }
  }

  // 檢查收藏按鈕是否被點擊，用來更新favInfo 的依據
  const [toggleBtn, setToggleBtn] = useState(true)

  // 儲存收藏資料
  const [favInfo, setFavInfo] = useState({
    member_id: 0,
    article_id: 0,
    alreadyFav: false,
  })
  // 抓收藏資料
  useEffect(() => {
    // 取得會員id
    // const member_data = JSON.parse(localStorage.getItem('Fit_U-auth'))
    const member_id = auth.member_id
    const article_id = router.query.article_id
    console.log('router.query', router.query)
    const url = `${API_SERVER}/article/get-fav?member_id=${member_id}&article_id=${article_id}`

    try {
      fetch(url, {
        method: 'GET', // 可以是 GET、POST、PUT、DELETE 等
        headers: {
          'Content-Type': 'application/json', // 設定 Content-Type 為 JSON
        },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log('收藏資訊', data)
          setFavInfo(data)
        })
    } catch (e) {
      console.log(e)
    }
  }, [toggleBtn, router.isReady])

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
            <div className="col" style={{ marginBottom: 15 }}>
              <ArticleFav
                favInfo={favInfo}
                setToggleBtn={setToggleBtn}
                toggleBtn={toggleBtn}
              />
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <style jsx>{`
                .image-container {
                  max-width: 100%;
                  max-height: 100%; /* 調整圖片的最大高度 */
                }
              `}</style>
              <div className="image-container">
                <Image
                  src={`/img/article/${artInfo.article_image}`}
                  alt=""
                  width={900}
                  height={400}
                />
              </div>
            </div>
            <div className="mt-4" style={{ lineHeight: 2.5 }}>
              {text2jsx(artInfo.content)}
            </div>

            <p className="mt-4">作者: {artInfo.teacher_name}</p>
          </div>

          <h4 className="mt-4">留言板</h4>
          <>
            {/* 檢查 artInfo.message 是否為空，如果為空，顯示空表格或提示消息 */}
            {artInfo.message.length === 0 ? (
              <>
                <div className="row">
                  <div className="mt-4 text-center">
                    <table className={styles['my-table']}>
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">留言者姓名</th>
                          <th scope="col">Message</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* 在這裡顯示提示消息，例如 "目前沒有留言。" */}
                        <tr>
                          <td colSpan="3">目前沒有留言。</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="row">
                <div className="mt-4 text-center">
                  <table className={styles['my-table']}>
                    <thead>
                      <tr>
                        <th scope="col">留言者ID</th>
                        <th scope="col">留言者姓名</th>
                        <th scope="col">Message</th>
                      </tr>
                    </thead>
                    {/* 在這裡進行 artInfo.message 的 map 迭代 */}
                    {artInfo.message.map((v, i) => (
                      <tbody key={i}>
                        <tr>
                          <td>{v.message_id}</td>
                          <td>{v.message_name}</td>
                          <td>{v.message_content}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            )}
          </>

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
              {/* 使用 mx-auto 使其水平置中 */}
              <div className="contact__form">
                <form action="post" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        name="message_name"
                        className="form-control"
                        placeholder="Name"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col">
                      <input
                        type="email"
                        name="message_email"
                        className="form-control"
                        placeholder="Email"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        name="message_content"
                        className="form-control"
                        placeholder="Message"
                        onChange={handleChange}
                        rows={4}
                      />
                      <div className="text-center" style={{ marginBottom: 15 }}>
                        <button type="reset" className={style['site-btn']}>
                          重新填寫
                        </button>
                      </div>
                      <div className="text-center" style={{ marginBottom: 15 }}>
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
      <TOP />
    </>
  )
}
