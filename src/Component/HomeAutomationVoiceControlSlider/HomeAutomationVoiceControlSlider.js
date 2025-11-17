import React, { useState } from 'react';
import HomeAutomationProductPopup from "../HomeAutomationProductPopup/HomeAutomationProductPopup";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Virtual, Navigation, Pagination, Thumbs } from 'swiper';

const HomeAutomationVoiceControlSlider = (props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [data, setData] = useState('');
  const [show, setShow] = useState(false);

  if (props.CHILD == undefined) {
    
    return false;
  }

  const VoiceControlSliderparams = {
    loop: false,
    slidesPerView: 1,
    autoHeight: false, //enable auto height    
    navigation: false,
    //watchSlidesProgress: true,
    // pagination: {
    //   clickable: true,
    //   type: 'bullets',
    //   renderBullet: function (index, className) {
    //     return '<div className="custom-nav ' + className + '"> </span> <span  className="bullet-text">' + (props.CHILD[index].title) + '</span>  <span  className="bullet-border"></div>';
    //   }
    // },
    observer: true,
    observeParents: true,
    autoplay: {
      "delay": 3000,
      "disableOnInteraction": false
    }

  }

  const thumbsparam = {
    loop: false,
    observer: true,
    observeParents: true,
    breakpoints: {
      // when window width is >= 320px
      0: {
        spaceBetween: 10,
        slidesPerView: 2,
      },
      320: {
        spaceBetween: 10,
        slidesPerView: 2,
      },
      576: {
        spaceBetween: 10,
        slidesPerView: 3,
      },
      768: {
        spaceBetween: 20,
        slidesPerView: 4,
      },
      992: {
        spaceBetween: 50,
        slidesPerView: 5,
      },
      // when window width is >= 480px    
      // when window width is >= 640px

    }
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const readMoreData = (data) => {
    data ? [setData(data[0]), handleShow()] : ''
  }
  return (
    <>
      {show ? <HomeAutomationProductPopup show={show.toString()} onHide={handleClose} data={data} /> : null}

      <section className="HomeAutomationVoiceControlSlider max1920">
        <Swiper {...VoiceControlSliderparams}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          id="main"
          modules={[Autoplay, Virtual, Navigation, Pagination, Thumbs]}
        >

          {props.CHILD.map((slideContent, index) => {
            return <SwiperSlide key={index} virtualIndex={index}>
              <img src={slideContent.image_path} alt={slideContent.image_alt_seo} className="img-fluid" onClick={() => readMoreData(slideContent.SUB_CHILD)} role="button" width="auto" height="auto" />

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
            {props.CHILD.map((slideContent, index) => {
              return <SwiperSlide key={index} virtualIndex={index} >
                <div className="custom-nav">  <p className="bullet-text pb-3 pb-lg-4">{slideContent.title}</p>  <span className="bullet-border"></span></div>
              </SwiperSlide>
            })}
          </Swiper>


        </div>
      </section>
    </>
  );
}



export default HomeAutomationVoiceControlSlider;
