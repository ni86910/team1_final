import React, { useState } from 'react'
import style from '@/styles/jack-use/accordion.module.css'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa6'

export default function MyAccordion({ question, answer }) {
  const [show, setShow] = useState(false)

  // 處理點擊事件的函數
  const handleHeaderClick = () => {
    setShow(!show)
  }

  return (
    <div className={style['accordion-container']}>
      <div
        //  role="presentation" 在div 設定onClick需要加這段
        role="presentation"
        className={`${style['accordion-header']} ${
          show ? style['active'] : ''
        }`}
        onClick={handleHeaderClick}
      >
        {question}
        <div className={style['accordion-btn']}>
          {show ? <FaAngleUp /> : <FaAngleDown />}
        </div>
      </div>
      {show && <p className={style['answers']}>{answer}</p>}
    </div>
  )
}
