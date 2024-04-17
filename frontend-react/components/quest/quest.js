import React, { useState } from 'react'
import Myaccordion from '../accordion/Myaccordion'
import { questions } from '@/pages/api/accordion-data-quest'
import { questions1 } from '@/pages/api/accordion-data-coach'
import { questions2 } from '@/pages/api/accordion-data-allquest'
import TOP from '@/components/TOPbutton/top'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

export default function Quest() {
  const [data, setData] = useState(questions)
  const [data1, setData1] = useState(questions1)
  const [data2, setData2] = useState(questions2)

  return (
    <>
      <Container style={{ marginBottom: 20 }}>
        <Row>
          <h3 className="mt-4 text-center">常見問題</h3>
          <h5 className="mt-4 text-center" style={{ marginBottom: 15 }}>
            請透過下方分類快速找尋您的疑問，若仍無法獲得解答，您可以透過聯繫我們單元，直接與我們聯繫！
          </h5>
        </Row>

        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" justify>
          <Tab eventKey="home" title="場館相關">
            {data.map((curElem) => {
              const { id } = curElem
              return <Myaccordion key={id} {...curElem} />
            })}
          </Tab>
          <Tab eventKey="coach" title="教練相關">
            {data1.map((curElem) => {
              const { id } = curElem
              return <Myaccordion key={id} {...curElem} />
            })}
          </Tab>
          <Tab eventKey="allquest" title="其他問題">
            {data2.map((curElem) => {
              const { id } = curElem
              return <Myaccordion key={id} {...curElem} />
            })}
          </Tab>
        </Tabs>
      </Container>

      <TOP />
    </>
  )
}
