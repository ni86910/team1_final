import React, { useState } from 'react'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa6'

export default function Myaccordion({ question, answer }) {
  const [show, setShow] = useState(false)
  return (
    <>
      <div className="accordion-container">
        <div className="accordion-header">
          {question}
          <button className="accordion-btn" onClick={() => setShow(!show)}>
            {show ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        </div>
        {show && <p className="answers">{answer}</p>}
      </div>
    </>
  )
}
