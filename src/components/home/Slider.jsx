import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

function Slider() {
  return (
    <div className="w-full overflow-hidden mb-6 md:mb-10">
      <Splide
        options={{
          arrows: false,
          autoplay: true,
          interval: 2500,
          type: "loop",
          rewind: true,
          width: "100%",
        }} 
        aria-label="Hero Section Slider"
      >
        <SplideSlide>
          <img className='w-full h-[180px] sm:h-[300px] md:h-[420px] lg:h-[500px] object-fill' src="https://quick-commerce-project.netlify.app/hero-section-slider/banner-1.jpg" alt="Banner 1"/>
        </SplideSlide>
        <SplideSlide>
          <img className='w-full h-[180px] sm:h-[300px] md:h-[420px] lg:h-[500px] object-fill' src="https://quick-commerce-project.netlify.app/hero-section-slider/banner-2.jpg" alt="Banner 2"/>
        </SplideSlide>
        <SplideSlide>
          <img className='w-full h-[180px] sm:h-[300px] md:h-[420px] lg:h-[500px] object-fill' src="https://quick-commerce-project.netlify.app/hero-section-slider/banner-4.jpg" alt="Banner 4"/>
        </SplideSlide>
        <SplideSlide>
          <img className='w-full h-[180px] sm:h-[300px] md:h-[420px] lg:h-[500px] object-fill' src="https://quick-commerce-project.netlify.app/hero-section-slider/banner-3.jpg" alt="Banner 3"/>
        </SplideSlide>
      </Splide>
    </div>
  )
}

export default Slider;
