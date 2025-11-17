import React from 'react';
// import './OurProjetSlider.scss';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Container, Row, Col } from "react-bootstrap";

import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import LinkComponent from '@components/Link';

const OurProjetSlider = (props) => {
  const stylethree = {
    backgroundImage: "url('" + `/assets/images/Mask Group 270.png` + "')",
    backgroundColor: "#A4A08B",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left bottom'


  }
  const OurProjetSliderConfig = {
    observer: true,
    observeParents: true,
    spaceBetween: 0,
    pagination: {
      clickable: true
    },
    navigation: true,
    slidesPerView: 1,
  }
  return (

    <div className="OurProjetSlider max1920">
      <Container fluid>
        <Row>
          <Col lg={6} className="col-first p-md-0" style={stylethree}>
            <div className="boxText px-4 px-lg-5 px-sm-2">
              <h5>{props.title}</h5>
              <div className="pt-4">{props.description ? parse(props.description) : ''}</div>
              <LinkComponent href={props.link_url}>{props.link_title}</LinkComponent>

            </div>
          </Col>
          <Col lg={6} className="col-second p-0">
            <Swiper
              {...OurProjetSliderConfig}
            >
              {props.CHILD && props.CHILD.map((slideContent, index) => {

                return <SwiperSlide key={index}>
                  {/* <img src={slideContent.image_path} alt={slideContent.image_alt_seo} className="img-fluid" /> */}
                  <picture>
                    <source media="(max-width: 575.98px)" srcSet={slideContent.image_path_portrait} />
                    <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={slideContent.image_path_landscape} />
                    <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={slideContent.image_path_03} />
                    <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={slideContent.image_path_02} />
                    <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={slideContent.image_path_01} />
                    <LazyLoadImage effect="" src={slideContent.image_path} alt={slideContent.image_alt_seo} className="imsg" width="auto" height="auto" />
                  </picture>
                </SwiperSlide>;
              })}
              {/* <SwiperSlide><img className="img-fluid" src={`/assets/images/customized embroidery.png`} alt="sedarglobal" /></SwiperSlide>
              <SwiperSlide><img className="img-fluid" src={`/assets/images/customized embroidery.png`} alt="sedarglobal" /></SwiperSlide> */}
            </Swiper>
          </Col>
        </Row>
      </Container>


    </div>
  )
}

OurProjetSlider.propTypes = {};

OurProjetSlider.defaultProps = {};

export default OurProjetSlider;
