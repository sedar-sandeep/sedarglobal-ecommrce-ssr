import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Swiper, SwiperSlide } from 'swiper/react';


import { Virtual, Navigation, Pagination, Autoplay } from 'swiper';

import parse from 'html-react-parser';



const InfoPopup = (props) => {
  const InfoPopupSlideConfig = {

    loop: true,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    observer: true,
    observeParents: true,
    modules: [Virtual, Navigation, Pagination, Autoplay]
  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="InfoPopup"
    >

      <Modal.Body className="p-0">
        <div className="close-button">
          <Button onClick={props.onHide}> ✕ </Button>
        </div>
        <Swiper {...InfoPopupSlideConfig}

        >

          {props.SPS_INFO_IMAGE_PATH ? props.SPS_INFO_IMAGE_PATH.map((data, index) => {
            return (
              <SwiperSlide key={index}>
                <LazyLoadImage effect="" src={data} width="100%" height="auto" />
              </SwiperSlide>
            )
          })
            : ''}
          {/* <SwiperSlide>
            <LazyLoadImage effect="" src="https://dummyimage.com/600x400/000/fff" />
          </SwiperSlide>
          <SwiperSlide>
            <LazyLoadImage effect="" src="https://dummyimage.com/600x400/8f2f8f/fff" />
          </SwiperSlide>
          <SwiperSlide>
            <LazyLoadImage effect="" src="https://dummyimage.com/600x400/000/fff" />
          </SwiperSlide>
          <SwiperSlide>
            <LazyLoadImage effect="" src="https://dummyimage.com/600x400/8f2f8f/fff" />
          </SwiperSlide> */}
        </Swiper>
        <div className="p-5">
          <h5>{props.SPS_DESC}</h5>
          {props.SPS_MORE ? parse(props.SPS_MORE) : ''}
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

InfoPopup.propTypes = {};

InfoPopup.defaultProps = {};

export default InfoPopup;
