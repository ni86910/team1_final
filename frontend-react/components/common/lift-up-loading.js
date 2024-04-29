import React, { useEffect, useState } from 'react'
import style from '@/styles/lift-up-loading.module.scss'
import { FaDumbbell } from 'react-icons/fa6'

export default function LiftUpLoading() {
  return (
    <>
      <div className={style['cover']}>
        <div className={style['icon']}>
          <FaDumbbell />
        </div>
        <span className={style['text']}>LOADING...</span>
      </div>
    </>
  )
}
