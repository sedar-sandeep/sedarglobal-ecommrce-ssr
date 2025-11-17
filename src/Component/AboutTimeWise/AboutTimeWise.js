import React, { useState } from 'react';
// import parse from 'html-react-parser';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Mousewheel, Thumbs } from 'swiper';
// import './AboutTimeWise.scss';
import LinkComponent from '@components/Link';

// SwiperCore.use([Pagination, EffectFade, Mousewheel, Thumbs]);


const AboutTimeWise = (props) => {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const Sliderparams = {
    navigation: false,
    observer: true,
    observeParents: true,
    //mousewheel: true,
    loop: false,
    // autoHeight:true
    // effect: 'fade',
    // fadeEffect: {
    //   crossFade: true
    // },
    mousewheel: {
      releaseOnEdges: true,
    },
    direction: 'horizontal',
    breakpoints: {
      // when window width is >= 320px

      // when window width is >= 480px
      576: {
        direction: 'vertical',
      },

      // when window width is >= 640px

    }
  }

  const thumbsparam = {
    loop: false,
    observer: true,
    observeParents: true,
    direction: 'horizontal',
    breakpoints: {
      // when window width is >= 320px
      0: {
        spaceBetween: 10,
        slidesPerView: 5,
      },
      // when window width is >= 480px
      576: {
        spaceBetween: 10,
        slidesPerView: 5,
        direction: 'vertical',
      },
      767: {
        slidesPerView: 4,
        direction: 'vertical',
      },
      992: {
        slidesPerView: 5,
        direction: 'vertical',
      },
      // when window width is >= 640px

    }
  }

  return (
    <section id="AboutTimeWise" className="AboutTimeWise max1920">

      <Swiper {...Sliderparams}
        id="main"
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Pagination, EffectFade, Mousewheel, Thumbs]}
        //controller={{ control: controlledSwiper }}       
        slidesPerView={1}

      >
        {props.CHILD && props.CHILD.map((slideContent, index) => {

          return <SwiperSlide key={index} virtualIndex={index}>
            <LinkComponent href={slideContent.link_url ? slideContent.link_url : '#'}>
              <picture>
                <source media="(max-width: 575.98px)" srcSet={slideContent.image_path_portrait} />
                <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={slideContent.image_path_landscape} />
                <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={slideContent.image_path_03} />
                <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={slideContent.image_path_02} />
                <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={slideContent.image_path_01} />
                <img src={slideContent.image_path} alt={slideContent.image_alt_seo} className="imsg" width="auto" height="auto" />
              </picture>
            </LinkComponent>
          </SwiperSlide>
        })}
      </Swiper>
      <div id="thumbs">

        <Swiper
          {...thumbsparam}
          spaceBetween={5}
          slidesPerView={5}
          onSwiper={setThumbsSwiper}
          className="gallery-thumbs"
        >
          {/* {thumbs} */}
          {props.CHILD && props.CHILD.map((slideContent, index) => {

            return <SwiperSlide key={index} virtualIndex={index}>
              <div>{props.CHILD[index]['title']}</div>

            </SwiperSlide>
          })}
        </Swiper>


      </div>
      <div className="overly-color" style={{ Zindex: "1", width: "40%", right: "0", left: "auto", background: "transparent" }}></div>
    </section>
  )
};

export default AboutTimeWise;
