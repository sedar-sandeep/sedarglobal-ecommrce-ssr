import React from 'react';
// import './AboutReferenceSlider.scss';

import { Container, Col, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";

import parse from 'html-react-parser';
import LinkComponent from '@components/Link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

SwiperCore.use([Virtual, Navigation, Pagination]);


const referencesliderconfig = {
  observer: true,
  observeParents: true,
  loop: false,
  slidesPerView: 3,
  autoHeight: false, //enable auto height
  spaceBetween: 25,
  pagination: { clickable: true },
  breakpoints: {
    // when window width is >= 320px
    0: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    // when window width is >= 480px
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    767: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  }
};


const AboutReferenceSlider = (props) => {
  if (props.CHILD == undefined) {
    return false;
  }

  return (
    <section className="AboutReferenceSlider pt-3 pt-md-5 mt-md-5 mb-3 mb-md-5">

      <Container className="max-content">
        <Row>
          <Col sm={12} className="col-first">
            <Swiper {...referencesliderconfig} className="AboutReferenceSwiper">
              {props.CHILD.map((slideContent, index) => {
                return (
                  <SwiperSlide key={index} virtualIndex={index}>
                    <LinkComponent href={slideContent.link_url ? slideContent.link_url : '#'}>
                      <picture>
                        <source media="(max-width: 575.98px)" srcSet={slideContent.image_path_portrait} />
                        <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={slideContent.image_path_landscape} />
                        <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={slideContent.image_path_03} />
                        <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={slideContent.image_path_02} />
                        <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={slideContent.image_path_01} />
                        <LazyLoadImage effect="" src={slideContent.image_path} alt={slideContent.image_alt_seo} width="auto" height="auto" />
                      </picture>
                      <div className="Bannertxtbox">
                        {/* <p>“  <span className="spacialtxt">A unique approach</span>—Handlesthe full remodel from start to finish “</p> */}

                        {slideContent.description ? parse(slideContent.description) : ''}
                      </div>
                    </LinkComponent>

                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Col>
        </Row>
      </Container>
    </section>
  );

}



AboutReferenceSlider.propTypes = {};

AboutReferenceSlider.defaultProps = {};

export default AboutReferenceSlider;
