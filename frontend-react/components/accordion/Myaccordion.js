import React, { useState } from 'react'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa6'
import style from '@/styles/jack-use/button.module.css'

export default function Myaccordion({ question, answer }) {
  const [show, setShow] = useState(false)
  return (
    <>
      <div className="accordion">
        <div className="accordion-item">
          <div className="accordion-header">
            {question}
            <button
              className={style['accordion-btn']}
              onClick={() => setShow(!show)}
            >
              {show ? <FaAngleUp /> : <FaAngleDown />}
            </button>
          </div>
        </div>
      </div>
      {show && <p className="answers">{answer}</p>}
    </>
  )
}
