import { useState, useEffect } from 'react'
// import Navbar from '@/components/common/navbar'
// import Footer from '@/components/common/footer'
import ClassSchedule from '@/components/class/class-schedule'
import ClassSwitch from '@/components/class/class-switch'
import ClassIntro from '@/components/class/class-intro'
import ClassBook from '@/components/class/class-book'

import Head from 'next/head'

export default function Class() {
  // 決定目前分頁
  const [tab, setTab] = useState('left')

  // 決定ClassIntro跟ClassSchedule 的容器高度
  const [ContainerHeight, setContainerHeight] = useState(0)

  return (
    <>
      <Head>
        <title>課程專區</title>
      </Head>
      <ClassSwitch setTab={setTab} tab={tab} />

      <div
        style={{
          display: 'flex',
          width: '100%',
          height: `${ContainerHeight}px` || '800px',
          position: 'relative',
          overflow: 'clip',
          // 這裡overflow hidden的話 課表的sticky會沒作用
        }}
      >
        <ClassIntro setContainerHeight={setContainerHeight} tab={tab} />
        <ClassSchedule setContainerHeight={setContainerHeight} tab={tab} />
      </div>
    </>
  )
}
