import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import style from '@/styles/home.module.scss'
import { API_SERVER } from '@/configs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FaAnglesRight, FaLocationDot } from 'react-icons/fa6'
import Marquee from 'react-fast-marquee'
import Link from 'next/link'
import ProductBox from '@/components/home/product-box'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  // 控制課程圖片
  const [img, setImg] = useState('yoga01.jpg')
  // 控制river 流動
  const [flow, setFlow] = useState(true)

  // 紀錄目前選擇的縣市
  const [city, setCity] = useState(0)

  // 紀錄該縣市裡面有的場館
  const [gymList, setGymList] = useState([])

  // 記錄選中的場館
  const [gymName, setGymName] = useState(router.query.gym_name || '')

  const [gymIndex, setGymIndex] = useState(0)

  // 紀錄地圖是否loading
  const [loading, setLoading] = useState(true)

  //state改變就router.push
  useEffect(() => {
    // 改變前端路由
    router.push(
      {
        query: { ...router.query, city: city, gym_name: gymName },
      },
      undefined,
      { scroll: false }
    )

    // 抓資料
    // const url = `${API_SERVER}/class/city${location.search}`
    const url = `${API_SERVER}/class/city?city=${city}&gym_name=${gymName}`
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        console.log('gymList', data)
        setGymList(data)
      })
  }, [city, gymName])

  return (
    <>
      <Head>
        <title>FITS U 健康管理平台</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <section className={style['banner-section']}>
          <div className={style['img-box']}>
            <Image
              src={`${API_SERVER}/imgs/home/unsplash_9dzWZQWZMdE2.jpg`}
              fill
              alt=""
            />
          </div>

          <div className={style['content']}>
            <div className={style['slogan']}>健康生活一步到位</div>
            <div className={style['button']}>立即體驗</div>
          </div>
        </section>
        <section className={style['class-section']}>
          <div className={style['class-container']}>
            <div className={style['section-name']}>
              <h1>課程介紹</h1>
            </div>
            <div className={style['content-box']}>
              <div className={style['img-part']}>
                <Image
                  src={`${API_SERVER}/imgs/class/class-page/${img}`}
                  alt=""
                  fill
                />
                <div className={style['cover']}></div>
              </div>
              <div className={style['list-part']}>
                <div className={style['classes']}>
                  <h5>靜態課程</h5>
                  <ul>
                    <li
                      onMouseEnter={() => {
                        setImg('yoga10.jpg')
                      }}
                    >
                      <h2>陰陽瑜珈</h2>
                      <div className={style['content-container']}>
                        <div className={style['content']}>
                          <div className={style['content-head']}>課程時長</div>
                          <div className={style['content-body']}>2小時</div>
                        </div>
                        <div className={style['content']}>
                          <div className={style['content-head']}>運動強度</div>
                          <div className={style['content-body']}>低</div>
                        </div>
                        <div
                          className={style['button']}
                          role="presentation"
                          onClick={() => {
                            router.push('/class/10')
                          }}
                        >
                          了解更多
                        </div>
                      </div>
                      <div className={style['rwd-image']}>
                        <Image
                          src={`${API_SERVER}/imgs/class/class-page/yoga10.jpg`}
                          alt=""
                          fill
                        />
                      </div>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setImg('yoga14.jpg')
                      }}
                    >
                      <h2>療癒瑜珈</h2>
                      <div className={style['content-container']}>
                        <div className={style['content']}>
                          <div className={style['content-head']}>課程時長</div>
                          <div className={style['content-body']}>2小時</div>
                        </div>
                        <div className={style['content']}>
                          <div className={style['content-head']}>運動強度</div>
                          <div className={style['content-body']}>低</div>
                        </div>
                        <div
                          className={style['button']}
                          role="presentation"
                          onClick={() => {
                            router.push('/class/14')
                          }}
                        >
                          了解更多
                        </div>
                      </div>
                      <div className={style['rwd-image']}>
                        <Image
                          src={`${API_SERVER}/imgs/class/class-page/yoga14.jpg`}
                          alt=""
                          fill
                        />
                      </div>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setImg('yoga03.jpg')
                      }}
                    >
                      <h2>串聯瑜珈</h2>
                      <div className={style['content-container']}>
                        <div className={style['content']}>
                          <div className={style['content-head']}>課程時長</div>
                          <div className={style['content-body']}>2小時</div>
                        </div>
                        <div className={style['content']}>
                          <div className={style['content-head']}>運動強度</div>
                          <div className={style['content-body']}>低</div>
                        </div>
                        <div
                          className={style['button']}
                          role="presentation"
                          onClick={() => {
                            router.push('/class/3')
                          }}
                        >
                          了解更多
                        </div>
                      </div>
                      <div className={style['rwd-image']}>
                        <Image
                          src={`${API_SERVER}/imgs/class/class-page/yoga03.jpg`}
                          alt=""
                          fill
                        />
                      </div>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setImg('yoga09.jpg')
                      }}
                    >
                      <h2>流動瑜珈</h2>
                      <div className={style['content-container']}>
                        <div className={style['content']}>
                          <div className={style['content-head']}>課程時長</div>
                          <div className={style['content-body']}>2小時</div>
                        </div>
                        <div className={style['content']}>
                          <div className={style['content-head']}>運動強度</div>
                          <div className={style['content-body']}>低</div>
                        </div>
                        <div
                          className={style['button']}
                          role="presentation"
                          onClick={() => {
                            router.push('/class/9')
                          }}
                        >
                          了解更多
                        </div>
                      </div>
                      <div className={style['rwd-image']}>
                        <Image
                          src={`${API_SERVER}/imgs/class/class-page/yoga09.jpg`}
                          alt=""
                          fill
                        />
                      </div>
                    </li>
                  </ul>
                </div>
                <div className={style['classes']}>
                  <h5>心肺訓練課程</h5>
                  <ul>
                    <li
                      onMouseEnter={() => {
                        setImg('aerobic03.jpg')
                      }}
                    >
                      <h2>基礎有氧</h2>
                      <div className={style['content-container']}>
                        <div className={style['content']}>
                          <div className={style['content-head']}>課程時長</div>
                          <div className={style['content-body']}>2小時</div>
                        </div>
                        <div className={style['content']}>
                          <div className={style['content-head']}>運動強度</div>
                          <div className={style['content-body']}>中</div>
                        </div>
                        <div
                          className={style['button']}
                          role="presentation"
                          onClick={() => {
                            router.push('/class/21')
                          }}
                        >
                          了解更多
                        </div>
                      </div>
                      <div className={style['rwd-image']}>
                        <Image
                          src={`${API_SERVER}/imgs/class/class-page/aerobic03.jpg`}
                          alt=""
                          fill
                        />
                      </div>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setImg('aerobic04.jpg')
                      }}
                    >
                      <h2>爵士有氧</h2>
                      <div className={style['content-container']}>
                        <div className={style['content']}>
                          <div className={style['content-head']}>課程時長</div>
                          <div className={style['content-body']}>2小時</div>
                        </div>
                        <div className={style['content']}>
                          <div className={style['content-head']}>運動強度</div>
                          <div className={style['content-body']}>中</div>
                        </div>
                        <div
                          className={style['button']}
                          role="presentation"
                          onClick={() => {
                            router.push('/class/22')
                          }}
                        >
                          了解更多
                        </div>
                      </div>
                      <div className={style['rwd-image']}>
                        <Image
                          src={`${API_SERVER}/imgs/class/class-page/aerobic04.jpg`}
                          alt=""
                          fill
                        />
                      </div>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setImg('aerobic09.jpg')
                      }}
                    >
                      <h2>基礎階梯</h2>
                      <div className={style['content-container']}>
                        <div className={style['content']}>
                          <div className={style['content-head']}>課程時長</div>
                          <div className={style['content-body']}>2小時</div>
                        </div>
                        <div className={style['content']}>
                          <div className={style['content-head']}>運動強度</div>
                          <div className={style['content-body']}>中</div>
                        </div>
                        <div
                          className={style['button']}
                          role="presentation"
                          onClick={() => {
                            router.push('/class/27')
                          }}
                        >
                          了解更多
                        </div>
                      </div>
                      <div className={style['rwd-image']}>
                        <Image
                          src={`${API_SERVER}/imgs/class/class-page/aerobic09.jpg`}
                          alt=""
                          fill
                        />
                      </div>
                    </li>
                  </ul>
                </div>
                <div className={style['classes']}>
                  <h5>舞蹈課程</h5>
                  <ul>
                    <li
                      onMouseEnter={() => {
                        setImg('dance01.jpg')
                      }}
                    >
                      <h2>ZUMBA</h2>
                      <div className={style['content-container']}>
                        <div className={style['content']}>
                          <div className={style['content-head']}>課程時長</div>
                          <div className={style['content-body']}>2小時</div>
                        </div>
                        <div className={style['content']}>
                          <div className={style['content-head']}>運動強度</div>
                          <div className={style['content-body']}>高</div>
                        </div>
                        <div
                          className={style['button']}
                          role="presentation"
                          onClick={() => {
                            router.push('/class/30')
                          }}
                        >
                          了解更多
                        </div>
                      </div>
                      <div className={style['rwd-image']}>
                        <Image
                          src={`${API_SERVER}/imgs/class/class-page/dance01.jpg`}
                          alt=""
                          fill
                        />
                      </div>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setImg('dance03.jpg')
                      }}
                    >
                      <h2>美式嘻哈</h2>
                      <div className={style['content-container']}>
                        <div className={style['content']}>
                          <div className={style['content-head']}>課程時長</div>
                          <div className={style['content-body']}>2小時</div>
                        </div>
                        <div className={style['content']}>
                          <div className={style['content-head']}>運動強度</div>
                          <div className={style['content-body']}>高</div>
                        </div>
                        <div
                          className={style['button']}
                          role="presentation"
                          onClick={() => {
                            router.push('/class/32')
                          }}
                        >
                          了解更多
                        </div>
                      </div>
                      <div className={style['rwd-image']}>
                        <Image
                          src={`${API_SERVER}/imgs/class/class-page/dance03.jpg`}
                          alt=""
                          fill
                        />
                      </div>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setImg('dance05.jpg')
                      }}
                    >
                      <h2>流行爵士</h2>
                      <div className={style['content-container']}>
                        <div className={style['content']}>
                          <div className={style['content-head']}>課程時長</div>
                          <div className={style['content-body']}>2小時</div>
                        </div>
                        <div className={style['content']}>
                          <div className={style['content-head']}>運動強度</div>
                          <div className={style['content-body']}>高</div>
                        </div>
                        <div
                          className={style['button']}
                          role="presentation"
                          onClick={() => {
                            router.push('/class/34')
                          }}
                        >
                          了解更多
                        </div>
                      </div>
                      <div className={style['rwd-image']}>
                        <Image
                          src={`${API_SERVER}/imgs/class/class-page/dance05.jpg`}
                          alt=""
                          fill
                        />
                      </div>
                    </li>
                    <li
                      onClick={() => {
                        router.push('/class')
                      }}
                      role="presentation"
                      className={style['check-classes']}
                    >
                      <span>
                        <FaAnglesRight />
                      </span>
                      <h3>查看所有課程</h3>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={style['place-section']}>
          <h1>尋找附近的運動地點</h1>
          <div className={style['place-container']}>
            <div className={style['left']}>
              <select
                className="form-select form-select-lg mb-3"
                aria-label=".form-select-lg example"
                defaultValue="0"
                value={city}
                onChange={(e) => {
                  setGymIndex(0)
                  setGymName(0)
                  setLoading(true)
                  setTimeout(() => {
                    setLoading(false)
                  }, 1000)
                  setCity(e.target.value)
                }}
              >
                <option value="0" disabled>
                  請選擇區域
                </option>
                <option value="臺北市">臺北市</option>
                <option value="新北市">新北市</option>
                <option value="臺中市">臺中市</option>
                <option value="臺南市">臺南市</option>
                <option value="高雄市">高雄市</option>
              </select>
              {!gymList ? (
                <></>
              ) : (
                <ul>
                  {gymList.map((v, i) => {
                    return (
                      <li
                        // data-bs-toggle="modal"
                        // data-bs-target="#exampleModal"
                        key={i}
                        role="presentation"
                        // className={gymIndex === i ? style['selected-gym'] : ''}
                        onClick={() => {
                          setGymIndex(i)
                          setLoading(true)
                          setTimeout(() => {
                            setLoading(false)
                          }, 1000)
                          router.push(
                            {
                              query: {
                                ...router.query,
                                gym_name: v.gym_name,
                              },
                            },
                            undefined,
                            { scroll: false }
                          )
                        }}
                      >
                        <span>{v.gym_name}</span>
                      </li>
                    )
                  })}
                  <li
                    role="presentation"
                    className={style['all-gym']}
                    onClick={() => {
                      router.push({
                        pathname: '/gym',
                        query: {
                          ...router.query,
                          gym: city,
                        },
                      })
                    }}
                  >
                    <span className={style['icon']}>
                      <FaAnglesRight />
                    </span>
                    <span className={style['text']}>查看所有場館</span>
                  </li>
                </ul>
              )}
            </div>
            <div className={style['right']}>
              <div
                className={
                  loading
                    ? `${style['iframe-cover']} ${style['show']}`
                    : `${style['iframe-cover']}`
                }
              >
                <div className={style['pin']}>
                  <FaLocationDot />
                </div>
                <div className={style['plate']}></div>
              </div>
              {!gymList[0] ? (
                <></>
              ) : (
                <>
                  <iframe
                    title="1"
                    className={style['iframe']}
                    src={gymList[gymIndex].gym_position}
                    width={500}
                    height={500}
                    style={{
                      // border: '5px solid black',
                      borderRadius: '0px 900px 900px 900px',
                    }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </>
              )}
            </div>
          </div>
        </section>
        <section className={style['river-section']}>
          <Image
            className={style['bg-image']}
            src={`${API_SERVER}/imgs/home/section-3.jpg`}
            alt=""
            fill
          />
          <div className={style['river-container']}>
            <div
              onMouseEnter={() => {
                setFlow(false)
              }}
              onMouseLeave={() => {
                setFlow(true)
              }}
              className={style['image-a']}
            >
              <ProductBox which={true} />
              <div
                className={style['text']}
                role="presentation"
                onClick={() => {
                  router.push('/product')
                }}
              >
                <span>探索商城</span>
              </div>
            </div>
            <div
              onMouseEnter={() => {
                setFlow(false)
              }}
              onMouseLeave={() => {
                setFlow(true)
              }}
              className={style['image-b']}
            >
              <ProductBox which={false} />
              <div
                className={style['text']}
                role="presentation"
                onClick={() => {
                  router.push('/product')
                }}
              >
                <span>探索商城</span>
              </div>
            </div>

            <Marquee
              className={style['river-a']}
              speed={80}
              play={flow}
              direction={'left'}
            >
              <span className={style['orange']}>FIT-U 健康商城</span>
              <span>FIT-U 健康商城</span>
            </Marquee>
            <Marquee
              className={style['river-b']}
              speed={80}
              play={flow}
              direction={'right'}
            >
              <span className={style['orange']}>壺鈴</span>
              <span>瑜珈磚</span>
              <span className={style['orange']}>啞鈴</span>
              <span>彈力帶</span>
              <span className={style['orange']}>乳清蛋白</span>
              <span>瑜珈墊</span>
            </Marquee>
            <Link href={'/product'} className={style['rwd-click']}>
              探索商城
              <span>
                <FaAnglesRight />
              </span>
            </Link>
          </div>

          {/* <!-- Modal --> */}
          {/* <div
            className={'modal fade'}
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            // style={{ display: 'none' }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5
                    className="modal-title"
                    id="exampleModalLabel"
                    style={{ fontWeight: '600', fontSize: '24px' }}
                  >
                    {!gymList[0] ? '' : gymList[gymIndex].gym_name}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div
                  className="modal-body"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {!gymList[0] ? (
                    <></>
                  ) : (
                    <>
                      <iframe
                        title="1"
                        className={style['iframe']}
                        src={gymList[gymIndex].gym_position}
                        width={300}
                        height={500}
                        style={
                          {
                            // border: '5px solid black',
                            // borderRadius: '0px 900px 900px 900px',
                          }
                        }
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div> */}

          {/* <!-- Modal --> */}
        </section>
      </>
    </>
  )
}
