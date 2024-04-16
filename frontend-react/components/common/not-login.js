import React, { useEffect } from 'react'
import style from '@/styles/not-login.module.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useRouter } from 'next/router'

export default function NotLogin() {
  const router = useRouter()
  useEffect(() => {
    let timerInterval
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
  }, [])
  return (
    <>
      <div className={style['container']}></div>
    </>
  )
}
