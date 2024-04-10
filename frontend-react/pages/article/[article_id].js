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
            <h4 className="mt-4 text-center">
              {/* 靠運動預防肌少症 放下啞鈴比舉起啞鈴更有效？ */}
              {artInfo.title}
            </h4>
            <p className="mt-4">{artInfo.post_date} | 新手專區 | 徒手訓練</p>
            <div className="col">
              <BookMark />
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <Image
                src="/img/article/oldman.jpg"
                alt=""
                width={900}
                height={550}
              />
              <p className="mt-4">{artInfo.content}</p>
            </div>
            <h5 className="mt-4" style={{ marginTop: 20, marginBottom: 20 }}>
              離心運動 centrifugal exercise
            </h5>
            <p className="mt-4">
              {/* 肌肉收縮分為離心收縮與向心收縮。以啞鈴訓練為例，當我們舉啞鈴時，肌肉產生的力量大於外在負荷的力量才能舉起它，此時肌肉是向心收縮；當我們放下啞鈴，也就是順著地心引力的施力過程，肌肉收縮的力量小於外在負荷所施與的力量，讓肌肉因離心收縮而延展中受到破壞，破壞程度比向心收縮劇烈，能達到最好的肌肉生長效果。離心運動正是針對肌肉離心收縮所設計的訓練方式。（資料來源／恆耀健康科技） */}
            </p>
            <h5 className="mt-4" style={{ marginTop: 20, marginBottom: 20 }}>
              漸進式阻力訓練 progressive resistance training
            </h5>
            <p className="mt-4">
              {/* 這是一種力量訓練方法，以對抗某種阻力的方式鍛鍊肌肉，施加阻力強度隨著訓練者的肌力增強而不斷逐漸增加。可利用運動訓練器械、自由重量或彈力帶等進行中度至高強度的訓練。
              以往的研究紛紛指出，針對身體的大肌群施以低至中等強度漸進式阻力訓練，例如步行、使用橢圓機、騎自行車等有氧運動，便足夠誘發肌力進步；若肌少症老年人進行高強度阻力訓練，則可獲得最大程度的肌力進步及肌肉質量提升。 */}
            </p>
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
