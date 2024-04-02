import { useState, useEffect } from 'react'
// import Navbar from '@/components/common/navbar'
// import Footer from '@/components/common/footer'
import ClassSchedule from '@/components/class/class-schedule'
import ClassSwitch from '@/components/class/class-switch'
import ClassIntro from '@/components/class/class-intro'

import Head from 'next/head'

export default function Class() {
  // 決定目前分頁
  const [tab, setTab] = useState('left')

  // 決定ClassIntro跟ClassSchedule 的容器高度
  const [ContainerHeight, setContainerHeight] = useState('')

  return (
    <>
      <Head>
        <title>課程專區</title>
      </Head>
      <hr />
      <ClassSwitch setTab={setTab} tab={tab} />
      {/* <div style={{ width: '100%', overflow: 'hidden' }}> */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: ContainerHeight,
          position: 'relative',
        }}
      >
        <ClassIntro setContainerHeight={setContainerHeight} tab={tab} />
        <div>
          <ClassSchedule setContainerHeight={setContainerHeight} tab={tab} />
        </div>
      </div>
      {/* </div> */}
    </>
  )
}
