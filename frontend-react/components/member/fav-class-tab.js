import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { Table } from 'react-bootstrap'
import style from '@/styles/favorite.module.scss'
import { useAuth } from '@/context/auth-context'
import { API_SERVER } from '@/configs'

export default function FavClassTab() {
  const classScheduleFavorites = [
    { class_id: 1, class_name: '課程1', class_img: '圖片1' },
    { class_id: 2, class_name: '課程2', class_img: '圖片2' },
    // 其他課程收藏項目...
  ]
  const { auth } = useAuth()

  const [allClassFav, setAllClassFav] = useState([])

  useEffect(() => {
    const url = `${API_SERVER}/class/member_all_fav?member_id=${auth.member_id}`
    try {
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          setAllClassFav(data)
        })
    } catch (e) {
      console.log(e)
    }
  }, [])
  console.log(auth)

  return (
    <>
      <Table striped bordered hover className={`mt-4 ${style['a-tab']}`}>
        <thead>
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
                  <FaHeart />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  )
}
