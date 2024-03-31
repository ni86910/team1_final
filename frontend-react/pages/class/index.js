import React from 'react'
// import Navbar from '@/components/common/navbar'
// import Footer from '@/components/common/footer'
import ClassSchedule from '@/components/class/class-schedule'
import ClassSwitch from '@/components/class/class-switch'
import ClassIntro from '@/components/class/class-intro'

import Head from 'next/head'

export default function Class() {
  return (
    <>
      <Head>
        <title>課程專區</title>
      </Head>
      <hr />
      <ClassSwitch />
      <div style={{ display: 'flex', width: '200%', position: '' }}>
        <ClassIntro />
        <ClassSchedule />
      </div>
    </>
  )
}
