import { useEffect, useState } from 'react'
import style from '@/styles/class-book.module.scss'
import Image from 'next/image'
import dayjs from 'dayjs'
import { FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import { API_SERVER } from '@/configs'
import ClassFav from './class-fav'
import { useAuth } from '@/context/auth-context'
import Router, { useRouter } from 'next/router'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import toast, { Toaster } from 'react-hot-toast'

export default function ClassBook({
  popClassBook,
  setPopClassBook,
  bookInfo,
  participantData,
  scheduleData,
}) {
  const router = useRouter()
  //取得已登入會員 的資訊 沒登入的話auth.member_id會是0
  const { auth } = useAuth()

  // 處理預約資料
  bookInfo.year = dayjs(bookInfo.start_time).format('YYYY年M月D號') //年
  bookInfo.day = dayjs(bookInfo.start_time).format('D') //日
  bookInfo.startH = dayjs(bookInfo.start_time).format('HH:00') // start時
  bookInfo.endH = dayjs(bookInfo.end_time).format('HH:00') // end時
  bookInfo.monthWord = dayjs(bookInfo.start_time).format('MMM') // 月份英文

  // 檢查收藏按鈕是否被點擊，用來更新favInfo 的依據
  const [toggleBtn, setToggleBtn] = useState(true)

  // 儲存收藏資料
  const [favInfo, setFavInfo] = useState({
    member_id: 0,
    class_schedule_id: 0,
    alreadyFav: false,
  })

  // 預約課程
  const bookClass = () => {
    const url = `${API_SERVER}/class/book?member_id=${auth.member_id}&class_schedule_id=${bookInfo.class_schedule_id}`
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        checkPay()
      })
  }

  const checkBook = () => {
    Swal.fire({
      title: '是否要預約課程?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#EB6234',
      cancelButtonColor: 'black',
      confirmButtonText: '確定',
      cancelButtonText: '再考慮一下',
    }).then((result) => {
      if (result.isConfirmed) {
        bookClass()
      }
    })
  }

  const checkPay = () => {
    Swal.fire({
      title: '是否前往會員中心進行付款',
      // text: '預約後，將前往會員中心進行付款',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#EB6234',
      cancelButtonColor: 'black',
      confirmButtonText: '確定',
      cancelButtonText: '繼續逛逛',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/member/course-records')
      }
    })
  }

  // 抓收藏資料
  useEffect(() => {
    // 取得會員id
    // const member_data = JSON.parse(localStorage.getItem('Fit_U-auth'))
    const member_id = auth.member_id

    const class_schedule_id = bookInfo.class_schedule_id

    if (member_id && class_schedule_id) {
      const url = `${API_SERVER}/class/class_fav?member_id=${member_id}&class_schedule_id=${class_schedule_id}`

      try {
        fetch(url, {
          method: 'GET', // 可以是 GET、POST、PUT、DELETE 等
          headers: {
            'Content-Type': 'application/json', // 設定 Content-Type 為 JSON
          },
          // 把會員ID跟該開課ID放到body中 傳給後端
          // body: JSON.stringify({
          //   member_id: member_data.member_id,
          //   class_schedule_id: bookInfo.class_schedule_id,
          // }), // 將 JavaScript 物件轉換成 JSON 字串
        })
          .then((r) => r.json())
          .then((data) => {
            console.log('收藏資訊', data)
            setFavInfo(data)
          })
      } catch (e) {
        console.log(e)
      }
      console.log('bookInfo', participantData)
    }
  }, [popClassBook, toggleBtn]) // 1.有課程方塊被按到 或2.收藏按鈕被按到 時更新

  console.log('bookInfo', bookInfo)
  return (
    <>
      <Toaster position="top-center" />
      <div
        className={`${style['overlay']} ${
          style[popClassBook ? 'show-overlay' : '']
        }`}
        role="presentation"
        onClick={() => {
          setPopClassBook(false)
        }}
      ></div>
      <div
        className={`${style['card']} ${style[popClassBook ? 'show-card' : '']}`}
      >
        <Link
          href={'#'}
          className={style['close']}
          onClick={(e) => {
            e.preventDefault()
            setPopClassBook(false)
          }}
        >
          <FaTimes />
        </Link>
        <div className={style['img-box']}>
          <div className={style['img-cover']}>
            <ClassFav
              favInfo={favInfo}
              setToggleBtn={setToggleBtn}
              toggleBtn={toggleBtn}
            />
          </div>
          <Image
            src={`http://localhost:3001/imgs/class/class-page/${bookInfo.class_img}`}
            width={800}
            height={500}
            // objectFit="contain"
            layout="responsive"
            alt=""
          />
        </div>
        <div className={style['content']}>
          <h1>{bookInfo.class_name}</h1>
          <div className={style['info']}>
            <div className={style['date']}>
              <div className={style['date-thumbnail']}>
                <div className={style['week-day']}>
                  <span>{bookInfo.monthWord}</span>
                </div>
                <div className={style['day-number']}>
                  <span>{bookInfo.day}</span>
                </div>
              </div>
              <div className={style['text']}>
                <span className={style['']}>{bookInfo.year}</span>
                <p>
                  {bookInfo.startH} - {bookInfo.endH}
                </p>
              </div>
            </div>
            <div className={style['teacher']}>
              <div className={style['avatar']}></div>
              <div className={style['text']}>
                <span>{bookInfo.teacher_name}</span>
                <p>教練</p>
              </div>
            </div>
            <div className={style['place']}>
              <div className={style['place-img']}>
                <Image
                  src={'/img/navbar-template/FITSU_little.png'}
                  fill
                  alt=""
                ></Image>
              </div>
              <div className={style['text']}>
                <span>{bookInfo.gym_name}</span>
                <p>{bookInfo.gym_address}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={style['bottom']}>
          <div className={style['participant-count']}>
            {/* 判斷是否額滿 */}
            {participantData.current_participant >=
            participantData.max_participant ? (
              <>
                <span>已額滿</span>
              </>
            ) : (
              <>
                <span>
                  預約人數:{participantData.current_participant}/
                  {participantData.max_participant}
                </span>
              </>
            )}
            <br />
            <span>課程費用: {bookInfo.class_fee}</span>
          </div>
          <Link
            className={style['button']}
            // href={!auth.member_id ? '/member/login' : '#'}
            href={'#'}
            onClick={(e) => {
              e.preventDefault()
              !auth.member_id
                ? Swal.fire({
                    title: '您尚未登入',
                    text: '無法預約課程',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#EB6234',
                    cancelButtonColor: 'black',
                    confirmButtonText: '前往登入',
                    cancelButtonText: '繼續瀏覽',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      router.push('/member/login')
                    }
                  })
                : checkBook()
            }}
          >
            立即預約
          </Link>
        </div>
      </div>
    </>
  )
}
