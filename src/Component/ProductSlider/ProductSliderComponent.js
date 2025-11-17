import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual, Navigation, Pagination, Lazy, Autoplay } from "swiper";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import CircleLoader from '../LoaderComponent/CircleLoader';



const ProductSliderComponent = (props) => {

  const [animation, setAnimation] = useState('all 3s');
  const [progress, setProgress] = useState(0);
  const data = props.slider

  const swiper_slider = {
    observer: true,
    observeParents: true,
    loop: true,
    slidesPerView: 3,
    autoHeight: false, //enable auto height
    //effect: "fade",
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-next',
      prevEl: '.swiper-prev'
    },
    breakpoints: {

      0: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      576: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      // when window width is >= 640px
      767: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },
    // autoplay: {
    //   "delay": 4000,
    //   "disableOnInteraction": false,
    // },
    onSlideChangeTransitionStart: () => { setAnimation('all 0s'); setProgress(0) },
    onSlideChangeTransitionEnd: () => { setAnimation('all 4s'); setProgress(100) },
  };
  return (

    <>
      <Swiper
        modules={[Virtual, Navigation, Pagination, Autoplay]}
        // onSlideNextTransitionStart={(swiper) => {
        //   let currentItem = swiper.activeIndex - 2 === -1 ? data.SUB_CHILD : swiper.activeIndex - 2
        //   let average = currentItem / data.SUB_CHILD * 100
        //   setProgress(Math.abs(average))
        // }}
        // onSlidePrevTransitionStart={(swiper) => {
        //   let currentItem = swiper.activeIndex;
        //   let average = currentItem / data.SUB_CHILD * 100
        //   setProgress(Math.abs(average))
        // }}
        {...swiper_slider} className="max-content-inner" >

        {data.SUB_CHILD.map((slideContent, index) => {
          return (
            <SwiperSlide key={index} virtualIndex={index}>
                <picture>
                  <source media="(max-width: 575.98px)" srcSet={slideContent.image_path_portrait} />
                  <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={slideContent.image_path_landscape} />
                  <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={slideContent.image_path_03} />
                  <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={slideContent.image_path_02} />
                  <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={slideContent.image_path_01} />
                <LazyLoadImage src={slideContent.image_path} alt={slideContent.image_alt_seo} className="w-100" width="auto" height="auto" />
                </picture>
                <div className="overly-color"></div>
                <div className="slider-text"> <p> {slideContent.title && slideContent.title} </p> </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="sliderNavigation">
        <div className="swiper-next" >
          <CircleLoader action={1} animation={animation} progress={progress} activeColor="#FDCC5D" color="#ccc" />
        </div>
        <div className="swiper-prev" >
          <CircleLoader action={-1} animation={animation} progress={progress} activeColor="#ccc" color="#FDCC5D" />
        </div>
      </div>
    </>
  )
};



export default ProductSliderComponent;
