import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'

export default function MyAccordion({ question, answer }) {
  return (
    // <div className={style['accordion-container']}>
    //   <div
    //     //  role="presentation" 在div 設定onClick需要加這段
    //     role="presentation"
    //     className={`${style['accordion-header']} ${
    //       show ? style['active'] : ''
    //     }`}
    //     onClick={handleHeaderClick}
    //   >
    //     {question}
    //     <div className={style['accordion-btn']}>
    //       {show ? <FaAngleUp /> : <FaAngleDown />}
    //     </div>
    //   </div>
    //   {show && <p className={style['answers']}>{answer}</p>}
    // </div>
    <Accordion defaultActiveKey={[]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{question}</Accordion.Header>
        <Accordion.Body>{answer}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
