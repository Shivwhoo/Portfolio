import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { Outlet } from 'react-router-dom'
import WanderingFly from '../components/common/WanderingFly'

function MainLayout() {
  return (
    <>
      <Navbar />
      <div style={{ animation: "breath 10s ease-in-out infinite", transformOrigin: "center top" }}>
        <Outlet />
        <WanderingFly />
        <Footer />
      </div>
    </>
  )
}

export default MainLayout
