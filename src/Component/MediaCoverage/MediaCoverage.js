import React from 'react';
// import './MediaCoverage.scss';
import { Container, Col, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";


import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';
SwiperCore.use([Virtual, Navigation, Pagination]);


// const referenceslider = [
//   {
//     id: "0",
//     imgPath: `/assets/images/fast-company-1white.png`,
//     alt: "sedar slider",
//     slidetxt: 'A unique approach—Handles the full remodel from start to finish'

//   },
//   {
//     id: "1",
//     imgPath: `/assets/images/servicenow-1whtie.png`,
//     alt: "sedar slider",
//     slidetxt: 'A unique approach—Not like your typical general contractor'

//   },
//   {
//     id: "3",
//     imgPath: `/assets/images/ business-insider-2white.png `,
//     alt: "sedar slider",
//     slidetxt: 'New Technology—Technology driven home - renovations'

//   },
// ];


const referencesliderconfig = {
  observer: true,
  observeParents: true,
  loop: true,
  slidesPerView: 3,
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
      spaceBetween: 40,
    },
  },

};

const MediaCoverage = (props) => (
  <section className="MediaCoverage py-5 px-3">
    <Container className="max-content">
      <Row>
        <Col sm={12} className="heading py-3">
          {props.description ? parse(props.description) : ''}
        </Col>
      </Row>
      <Row>
        <Col sm={12} className="col-first">
          <Swiper {...referencesliderconfig} className="MediaCoverageSwiper">
            {props.CHILD && props.CHILD.map((data, index) => {
              return (
                <SwiperSlide key={index} virtualIndex={index}>
                  <picture>
                    <source media="(max-width: 575.98px)" srcSet={data.image_path_portrait} />
                    <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={data.image_path_landscape} />
                    <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={data.image_path_03} />
                    <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={data.image_path_02} />
                    <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={data.image_path_01} />
                    <LazyLoadImage effect="" src={data.image_path} alt={data.image_alt_seo} className="imsg" width="auto" height="auto" />
                  </picture>
                  <div className="Bannertxtbox">
                    {data.description ? parse(data.description) : ''}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Col>
      </Row>
    </Container>
  </section>
);

MediaCoverage.propTypes = {};

MediaCoverage.defaultProps = {};

export default MediaCoverage;
