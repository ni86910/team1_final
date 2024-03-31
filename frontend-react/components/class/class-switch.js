import React from 'react'
import style from '@/styles/class-switch.module.scss'

export default function ClassSwitch() {
  return (
    <div className={style['switch']}>
      <div className={style['switch-left']}>課程介紹</div>
      <div className={style['switch-right']}>課表查詢</div>
    </div>
  )
}
