import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Swiper, SwiperSlide } from "swiper/react";
import parse from 'html-react-parser';

// Import Swiper styles
import SwiperCore, {
  Pagination
} from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination]);


const ProductMaterialAboutProduct = (props) => {

  const ProductMaterialAboutProductSliderConfig = {
    loop: false,
    slidesPerView: 2,
    spaceBetween: 50,
    autoHeight: false, //enable auto height          
    observer: true,
    observeParents: true,
  }

  return (
    <div className="ProductMaterialAboutProduct">
      <Row>
        <Col sm={12} className="heading-section">
          <h3>{props.SHP_DESC}</h3>
        </Col>
        <Col sm={12}>
          <Swiper {...ProductMaterialAboutProductSliderConfig} className="order_sample" spaceBetween={30} pagination={{ "clickable": true }}>
            {props['CHILD'] && props['CHILD'].map((row, key) => (
              <SwiperSlide key={key}>
                <div className="slide-box">
                  <LazyLoadImage effect="" className="img-fluid" src={row.SHP_FILE_PATH} alt={row.SHP_DESC} width="auto" height="auto" />
                  <div className="slide-text">
                    {row.SHP_HTML && parse(row.SHP_HTML)}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
      </Row>

    </div>
  );
}




export default ProductMaterialAboutProduct;
