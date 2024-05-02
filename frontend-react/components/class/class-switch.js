import React from 'react'
import style from '@/styles/class-switch.module.scss'
import { useRouter } from 'next/router'

export default function ClassSwitch({ setTab, tab }) {
  const router = useRouter()

  return (
    <div className={style['switch']}>
      <div
        onClick={() => {
          setTab('left')
          router.push(
            {
              pathname: router.pathname,
              query: { ...router.query, tab: 'left' },
            },
            undefined,
            { scroll: false }
          )
          router.query.tab = tab
        }}
        // onKeyPress={() => {}}
        role="presentation"
        // tabIndex="0"
        className={style[tab == 'left' ? 'on' : 'off']}
      >
        課程列表
      </div>
      <div
        onClick={() => {
          setTab('right')
          router.push(
            {
              pathname: router.pathname,
              query: { ...router.query, tab: 'right' },
            },
            undefined,
            { scroll: false }
          )
          router.query.tab = tab
        }}
        role="presentation"
        className={style[tab == 'right' ? 'on' : 'off']}
      >
        課表查詢
      </div>
    </div>
  )
}
