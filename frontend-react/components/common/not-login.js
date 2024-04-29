import React, { useEffect } from 'react'
import style from '@/styles/not-login.module.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth-context'

export default function NotLogin() {
  const { auth } = useAuth()
  const router = useRouter()
  useEffect(() => {
    // 等0.3秒後再判斷
    setTimeout(() => {
      let timerInterval
      if (auth.member_id === 0) {
        Swal.fire({
          title: '請先登入!',
          html: '將在 <b></b> 秒後回到登入頁.',
          timer: 3000,
          timerProgressBar: true,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
            const timer = Swal.getPopup().querySelector('b')
            timerInterval = setInterval(() => {
              timer.textContent = Math.ceil(+`${Swal.getTimerLeft()}` / 1000)
            }, 100)
            if (auth.member_id) {
              Swal.stopTimer()
            }
          },
          willClose: () => {
            clearInterval(timerInterval)
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            // console.log('I was closed by the timer')
            router.push('/member/login')
          }
        })
      }
    }, 500)
  }, [auth])
  return (
    <>
      <div className={style['container']}></div>
    </>
  )
}
