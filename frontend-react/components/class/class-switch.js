import React from 'react'
import style from '@/styles/class-switch.module.scss'

export default function ClassSwitch({ setTab, tab }) {
  return (
    <div className={style['switch']}>
      <div
        onClick={() => {
          setTab('left')
        }}
        // onKeyPress={() => {}}
        role="presentation"
        // tabIndex="0"
        className={style[tab == 'left' ? 'on' : 'off']}
      >
        課程介紹
      </div>
      <div
        onClick={() => {
          setTab('right')
        }}
        role="presentation"
        className={style[tab == 'right' ? 'on' : 'off']}
      >
        課表查詢
      </div>
    </div>
  )
}
