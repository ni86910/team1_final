import React from 'react'
import style from '@/styles/jack-use/button.module.css'

export default function ArticleDetail() {
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
                  <span>
                    健康小知識 &gt; 訓練專區 &gt; 靠運動預防肌少症
                    放下啞鈴比舉起啞鈴更有效？
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      {/* Article Section Begin */}
      <div className="container">
        <div className="row">
          <h4 className="mt-4 text-center">
            靠運動預防肌少症 放下啞鈴比舉起啞鈴更有效？
          </h4>
          <p className="mt-4">2024.03.20 | 新手專區 | 徒手訓練</p>
        </div>
        <div className="row">
          <div className="col text-center">
            <p className="mt-4">
              長期以來，運動訓練都被視為預防肌少症 (Sarcopenia)
              的重要方法，但你知道哪種肌力訓練方式更能有效地增強肌力嗎？一項
              2016
              年發表的研究發現，離心阻力運動對老年人的心肺需求較少，而且可能比以往許多研究關注的「漸進式阻力訓練」更能強化老人的肌肉組織、產生更多膠原蛋白，進一步強化關節、減少傷害。
            </p>
            <img
              src="/img/article/oldman.jpg"
              alt=""
              style={{ width: 900 }}
              height="500px"
            />
          </div>
          <h5 className="mt-4" style={{ marginTop: 20, marginBottom: 20 }}>
            離心運動 centrifugal exercise
          </h5>
          <p className="mt-4">
            肌肉收縮分為離心收縮與向心收縮。以啞鈴訓練為例，當我們舉啞鈴時，肌肉產生的力量大於外在負荷的力量才能舉起它，此時肌肉是向心收縮；當我們放下啞鈴，也就是順著地心引力的施力過程，肌肉收縮的力量小於外在負荷所施與的力量，讓肌肉因離心收縮而延展中受到破壞，破壞程度比向心收縮劇烈，能達到最好的肌肉生長效果。離心運動正是針對肌肉離心收縮所設計的訓練方式。（資料來源／恆耀健康科技）
          </p>
          <h5 className="mt-4" style={{ marginTop: 20, marginBottom: 20 }}>
            漸進式阻力訓練 progressive resistance training
          </h5>
          <p className="mt-4">
            這是一種力量訓練方法，以對抗某種阻力的方式鍛鍊肌肉，施加阻力強度隨著訓練者的肌力增強而不斷逐漸增加。可利用運動訓練器械、自由重量或彈力帶等進行中度至高強度的訓練。
            以往的研究紛紛指出，針對身體的大肌群施以低至中等強度漸進式阻力訓練，例如步行、使用橢圓機、騎自行車等有氧運動，便足夠誘發肌力進步；若肌少症老年人進行高強度阻力訓練，則可獲得最大程度的肌力進步及肌肉質量提升。
          </p>
        </div>
        <p className="mt-4">※文章授權轉載自《運動星球》網站</p>
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
      {/* Article Section End */}
    </>
  )
}
