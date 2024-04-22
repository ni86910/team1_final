import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { Table } from 'react-bootstrap'
import style from '@/styles/favorite.module.scss'
import ClassFavContext, { useClassFav } from '@/context/class-fav-context'
import { API_SERVER } from '@/configs'
import { useAuth } from '@/context/auth-context'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ClassRecordTable() {
  const router = useRouter()
  const { auth } = useAuth()
  // const [allBook, setAllBook] = useState([])
  const { allBook, checkRemoveBook } = useClassFav()

  // // 抓會員所有預約資料
  // useEffect(() => {
  //   if (auth.member_id) {
  //     const url = `${API_SERVER}/class/all-book?member_id=${auth.member_id}`
  //     try {
  //       fetch(url)
  //         .then((r) => r.json())
  //         .then((data) => {
  //           setAllBook(data)
  //           console.log(data)
  //         })
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  // }, [router.isReady, auth])

  return (
    <>
      <div style={{ maxHeight: '500px', overflow: 'auto' }}>
        <Table striped bordered hover className={`mt-4 ${style['a-tab']}`}>
          <thead style={{ position: 'sticky', top: 0 }}>
            <tr>
              <th>課程名稱</th>
              <th>開課場館</th>
              <th>開課時間</th>
              <th>付款狀態</th>
              <th>取消預約</th>
            </tr>
          </thead>
          <tbody>
            {!allBook ? (
              <>沒資料</>
            ) : (
              allBook.map((v, i) => {
                return (
                  <tr key={i}>
                    <td>{v.class_name}</td>
                    <td>{v.gym_name}</td>
                    <td>{v.start_time}</td>
                    <td>
                      {v.paid ? (
                        '已付款'
                      ) : (
                        <>
                          <Link href="">前往付款</Link>
                        </>
                      )}
                    </td>
                    <td>
                      <Link
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          checkRemoveBook(
                            auth.member_id,
                            v.class_schedule_id,
                            '/member/course-records'
                          )
                        }}
                      >
                        取消
                      </Link>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </Table>
      </div>
    </>
  )
}
