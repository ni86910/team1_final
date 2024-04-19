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

export default function FavClassTab() {
  const router = useRouter()
  const { auth } = useAuth()

  const { allClassFav } = useClassFav()
  const removeFavToast = () => toast.success('移除收藏')
  // 刪除
  const removeFav = (class_schedule_id) => {
    const url = `${API_SERVER}/class/remove-fav`
    try {
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // 設定 Content-Type 為 JSON
        },
        body: JSON.stringify({
          member_id: auth.member_id,
          class_schedule_id: class_schedule_id,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          console.log('刪除結果', data)
          removeFavToast()
        })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div style={{ maxHeight: '500px', overflow: 'auto' }}>
        <Table striped bordered hover className={`mt-4 ${style['a-tab']}`}>
          <thead style={{ position: 'sticky', top: 0 }}>
            <tr>
              <th>課程名稱</th>
              <th>開課場館</th>
              <th>開課時間</th>
              <th>收藏時間</th>

              <th>
                <FaHeart />
              </th>
            </tr>
          </thead>
          <tbody>
            {!allClassFav ? (
              <></>
            ) : (
              allClassFav.map((v, i) => (
                <tr key={v.fav_id}>
                  <td>{v.class_name}</td>
                  <td>{v.gym_name}</td>
                  <td>{v.start_time}</td>
                  <td>{v.fav_time}</td>
                  <td>
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        removeFav(v.class_schedule_id)
                        router.push(
                          {
                            pathname: '/member/favorite',
                          },
                          undefined,
                          { scroll: false }
                        )
                      }}
                    >
                      <FaHeart />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </>
  )
}
