import React, { useState } from 'react'

export default function Myaccordion({ question, answer }) {
  const [show, setShow] = useState(false)
  return (
    <>
      <div className="accordion">
        <div className="accordion-item">
          <div className="accordion-header">
            {question}
            <button onClick={() => setShow(!show)}>{show ? '➖' : '➕'}</button>
          </div>
        </div>
      </div>
      {show && <p className="answers">{answer}</p>}
    </>
  )
}
