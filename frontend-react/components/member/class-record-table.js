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
  const { allBook, checkRemoveBook } = useClassFav()

  // 建立訂單用，格式參考主控台由伺服器回傳
  const [order, setOrder] = useState({})

  // {
  //   amount: quantity1 * price1 + quantity2 * price2,
  //   products: [
  //     {
  //       id: 1,
  //       name: '測試商品1',
  //       quantity: quantity1,
  //       price: price1,
  //     },
  //     {
  //       id: 2,
  //       name: '測試商品2',
  //       quantity: quantity2,
  //       price: price2,
  //     },
  //   ],
  // }

  // 建立訂單，送至server建立訂單，packages與order id由server產生
  const createOrder = async (
    money,
    class_schedule_id,
    class_name,
    class_fee
  ) => {
    const url = `${API_SERVER}/line-pay/create-order`
    // 送至server建立訂單，packages與order id由server產生
    // products將會組合在packages屬性之下
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: `${auth.member_id}`,
        amount: money,
        products: [
          {
            id: class_schedule_id,
            name: class_name,
            quantity: 1,
            price: class_fee,
          },
        ],
      }),
    })
    const result = await res.json()

    console.log('result', result) //訂單物件格式(line-pay專用)

    if (result.status === 'success') {
      toast.success('已成功建立訂單')
      setOrder(result.data.order)
    }
  }

  return (
    <>
      <Toaster position="top-center" />
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
                          <Link
                            href=""
                            onClick={(e) => {
                              e.preventDefault()
                              createOrder(
                                v.class_fee,
                                v.class_schedule_id,
                                v.class_name +
                                  '-' +
                                  v.gym_name +
                                  '-開始時間:' +
                                  v.start_time,
                                v.class_fee
                              )
                            }}
                          >
                            {/* money,
    class_schedule_id,
    class_name,
    class_fee */}
                            前往付款
                          </Link>
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
