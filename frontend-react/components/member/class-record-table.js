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
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default function ClassRecordTable() {
  const router = useRouter()
  const { auth } = useAuth()
  const { allBook, checkRemoveBook } = useClassFav()
  const [tradingBookId, setTradingBookId] = useState(0)

  // 建立訂單用，格式參考主控台由伺服器回傳
  const [order, setOrder] = useState({})

  // confirm回來用的，在記錄確認之後，line-pay回傳訊息與代碼，例如
  // {returnCode: '1172', returnMessage: 'Existing same orderId.'}
  const [result, setResult] = useState({
    returnCode: '',
    returnMessage: '',
  })
  // 載入狀態(控制是否顯示載入中的訊息，和伺服器回傳時間點未完成不同步的呈現問題)
  const [isLoading, setIsLoading] = useState(true)

  // 建立訂單，送至server建立訂單，packages與order id由server產生
  const createOrder = async (
    money,
    class_schedule_id,
    class_name,
    class_fee,
    book_id
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
        book_id: book_id,
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
      setOrder(result.data.order)
      console.log('order', order)
      // goToLinePayAlert()
    }
  }
  // 建立訂單後出現付款通知
  const goToLinePayAlert = () => {
    Swal.fire({
      title: '將前往Line Pay完成付款流程',
      allowOutsideClick: false,
      icon: 'info',
      confirmButtonColor: '#EB6234',
      confirmButtonText: '確認',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('導向Line Pay頁面')
        goLinePay()
      }
    })
  }

  // 導向至LINE Pay付款頁面
  const goLinePay = () => {
    // 先連到node伺服器後，導向至LINE Pay付款頁面
    console.log('order', order)
    window.location.href = `${API_SERVER}/line-pay/reserve?orderId=${order.orderId}`
  }

  // 確認交易，處理伺服器通知line pay已確認付款，為必要流程
  const handleConfirm = async (transactionId, tradingBookId) => {
    const r = await fetch(
      `${API_SERVER}/line-pay/confirm?transactionId=${transactionId}&book_id=${tradingBookId}`
    )
    const res = await r.json()
    console.log('res.data', res)
    if (res.status === 'success') {
      toast.success('付款成功')
    } else {
      toast.error('付款失敗')
    }
    if (res.data) {
      setResult(res.data)
    }
    // 處理完畢，關閉載入狀態
    setIsLoading(false)
  }

  // 付款完成後，新增點數
  const addPoint = async () => {
    const url = `${API_SERVER}/class/add-point`
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/JSON' },
      body: JSON.stringify({
        transaction_id: router.query.transactionId,
      }),
    })
    const result = await r.json()
    console.log('點數新增結果', result)
  }

  // confirm回來用的
  useEffect(() => {
    if (router.isReady) {
      // 這裡確保能得到router.query值
      console.log(router.query)
      // http://localhost:3000/order?transactionId=2022112800733496610&orderId=da3b7389-1525-40e0-a139-52ff02a350a8
      // 這裡要得到交易id，處理伺服器通知line pay已確認付款，為必要流程
      // TODO: 除非為不需登入的交易，為提高安全性應檢查是否為會員登入狀態
      const { transactionId, orderId } = router.query

      // 如果沒有帶transactionId或orderId時，導向至首頁(或其它頁)
      if (!transactionId || !orderId) {
        // 關閉載入狀態
        setIsLoading(false)
        // 不繼續處理
        return
      }

      // 向server發送確認交易api
      handleConfirm(transactionId, tradingBookId)
    }

    // eslint-disable-next-line
  }, [router.isReady])

  // order改變就去付款
  useEffect(() => {
    if (order.orderId) goToLinePayAlert()
  }, [order])

  useEffect(() => {
    // 重刷一下頁面 更新預約資料
    if (router.query.transactionId) {
      //TODO: 這裡要執行 加點數動作
      addPoint()
      //TODO: 要有loading畫面  阻止使用者作其他操作
      setTimeout(() => {
        router.push(
          {
            pathname: '/member/course-records',
          },
          undefined,
          { scroll: false }
        )
      }, 1000)
    }
  }, [router])

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
                      {(() => {
                        if (v.status === 'paid') {
                          return '已付款'
                        } else if (v.status === 'pending') {
                          return '付款進行中'
                        } else if (v.status === null) {
                          return (
                            <>
                              <Link
                                href=""
                                onClick={(e) => {
                                  e.preventDefault()
                                  // setTradingBookId(v.book_id)
                                  createOrder(
                                    v.class_fee,
                                    v.class_schedule_id,
                                    v.class_name +
                                      '-' +
                                      v.gym_name +
                                      '-開始時間:' +
                                      v.start_time,
                                    v.class_fee,
                                    v.book_id
                                  )
                                }}
                              >
                                前往付款
                              </Link>
                            </>
                          )
                        }
                      })()}
                    </td>
                    <td>
                      {v.status ? (
                        <span>請洽客服</span>
                      ) : (
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
                      )}
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
