import React, { useState } from 'react';
// import './FranchiseSupport.scss';

import { Virtual, Navigation, Pagination, Autoplay } from "swiper";

import { Container } from 'react-bootstrap';
import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import CircleLoader from '../LoaderComponent/CircleLoader';
import { Swiper, SwiperSlide } from 'swiper/react';




const FranchiseSupport = (props) => {
  const [animation, setAnimation] = useState('all 3s');
  const [progress, setProgress] = useState(0);
  if (props.CHILD == undefined) {
    
    return false;
  }

  const FranchiseSupportconfig = {
    observer: true,
    observeParents: true,
    loop: true,
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '#support-next',
      prevEl: '#support-prev'
    },
    pagination: { clickable: true },
    modules: [Virtual, Navigation, Pagination, Autoplay],
    breakpoints: {
      // when window width is >= 320px
      0: {
        slidesPerView: 1.3,
        pagination: false
      },
      768: {
        slidesPerView: 4,
        pagination: false
      },
      1200: {
        slidesPerView: 4,
        pagination: { clickable: true },
      },

    },
    autoplay: {
      "delay": 4000,
      "disableOnInteraction": false,
    },
    onSlideChangeTransitionStart: () => { setAnimation('all 0s'); setProgress(0) },
    onSlideChangeTransitionEnd: () => { setAnimation('all 4s'); setProgress(100) },
  };
  return (
    <>
      <section className="FranchiseSupport max1920">
        <div className="FranchiseSupport-content">
          <div className="heading max-content">
            {props.description ? parse(props.description) : ''}
          </div>
          <div className="FranchiseSupport-carousel pt-3 pt-sm-5">
            <Container fluid className="main_div">
              <div className="main_width">
                <Swiper {...FranchiseSupportconfig} className="FranchiseSupportSwiper">
                  {props.CHILD.map((data, index) => {
                    return (
                      data.image_path ?  (
                      <SwiperSlide key={index} virtualIndex={index}>
                        <picture>
                          <source media="(max-width: 575.98px)" srcSet={data.image_path_portrait} />
                          <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={data.image_path_landscape} />
                          <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={data.image_path_03} />
                          <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={data.image_path_02} />
                          <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={data.image_path_01} />
                          <LazyLoadImage effect="" src={data.image_path} alt={data.image_alt_seo} className="" width="auto" height="auto" />
                        </picture>

                        {data.description ?
                          <div className="overly-text" style={{ backgroundColor: '#fdcc5d' }}>
                            <div className="text-block">
                              {parse(data.description)}
                              {/* <h5>Marketing and advertising</h5>
                            <p>Strong franchise systems help franchisees minimize overhead costs. They seek competitive bids from suppliers and negotiate advantageous pricing for goods and products needed in the business.Strong franchise systems help franchisees</p>
                             */}
                            </div>
                          </div>
                          : ''}
                        </SwiperSlide>
                      ) : ''
                    )
                    
                  })
                  }
                </Swiper>
              </div>
            </Container>
          </div>
        </div>
        <div className="sliderNavigation max-content d-none d-lg-flex">
          <div className="swiper-prev" id="support-prev"><LazyLoadImage effect="" src={`/assets/icon/leftarrow.png`} alt="2" className="nexticon" width="auto" height="auto" /></div>
          <div className="swiper-next" id="support-next"> <CircleLoader animation={animation} progress={progress} /></div>

        </div>

      </section>

    </>
  )
}

FranchiseSupport.propTypes = {};

FranchiseSupport.defaultProps = {};

export default FranchiseSupport;
