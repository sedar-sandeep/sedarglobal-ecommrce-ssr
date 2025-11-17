import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Navigation, Pagination, Autoplay } from "swiper";
import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CircleLoader from '../LoaderComponent/CircleLoader';


const Franchisevisionslider = (props) => {
  const [animation, setAnimation] = useState('all 3s');
  const [progress, setProgress] = useState(0);
  const Franchisevisionsliderconfig = {
    observer: true,
    observeParents: true,
    loop: false,
    slidesPerView: 2,
    autoHeight: false, //enable auto height 
    navigation: {
      nextEl: '#vision-next',
      prevEl: '#vision-prev'
    },
    modules: [Virtual, Navigation, Pagination, Autoplay],

    breakpoints: {
      // when window width is >= 320px
      0: {
        slidesPerView: 1,
        pagination: {
          clickable: true
        },
      },
      768: {
        slidesPerView: 2,
        pagination: false

      },

    },
    autoplay: {
      "delay": 4000,
      "disableOnInteraction": false,
    },
    onSlideChangeTransitionStart: () => { setAnimation('all 0s'); setProgress(0) },
    onSlideChangeTransitionEnd: () => { setAnimation('all 4s'); setProgress(100) },
  };
  if (props.CHILD == undefined) {
    
    return false;
  }

  return (
    <section className="Franchisevisionslider">
      <Container className="max-content">
        <Row>
          <Col sm={12} className="videoFrame position-relative">
            <Swiper {...Franchisevisionsliderconfig} className="FranchisevisionSwiper" pagination={{ clickable: true }}>
              {props.CHILD.map((data, index) => {
                return (
                  <SwiperSlide key={index} virtualIndex={index}>
                    <Row className="swiperslide-Row">
                      <Col sm={12} className="swiperslide" >
                        <picture>
                          <source media="(max-width: 575.98px)" srcSet={data.image_path_portrait} />
                          <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={data.image_path_landscape} />
                          <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={data.image_path_03} />
                          <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={data.image_path_02} />
                          <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={data.image_path_01} />
                          <LazyLoadImage effect="" src={data.image_path} alt={data.image_alt_seo} className="imsg" width="auto" height="auto" />
                        </picture>
                      </Col>
                      <Col sm={12} className="swiperslide" >
                        <div className="slidetext1">
                          {data.description ? parse(data.description) : ''}
                        </div>
                      </Col>
                    </Row>

                  </SwiperSlide>
                )
              })
              }

            </Swiper>
            <div className="sliderNavigation d-none d-lg-flex d-xxl-block">
              <div className="swiper-prev" id="vision-prev"><LazyLoadImage effect="" src={`/assets/icon/leftarrow.png`} alt="2" width="auto" height="auto" /></div>
              <div className="swiper-next" id="vision-next"> <CircleLoader animation={animation} progress={progress} /></div>
            </div>
          </Col>
        </Row>

      </Container>
    </section>
  );
}
Franchisevisionslider.propTypes = {};

Franchisevisionslider.defaultProps = {};

export default Franchisevisionslider;
