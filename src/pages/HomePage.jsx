import React from 'react'
import ParallexBanner from '../components/home/ParallexBanner'
import Slider from '../components/home/Slider'

function HomePage() {
  return (
    <div className='p-5'>
      <Slider/>
      <ParallexBanner/>
    </div>
  )
}

export default HomePage