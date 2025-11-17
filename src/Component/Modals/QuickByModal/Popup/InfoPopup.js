import React from 'react';
import { Modal } from 'react-bootstrap';
import { Swiper } from 'swiper/react';


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
      <Modal.Body >
        <div className="close-button" style={{ float: 'right' }}>
          <button type="button " className="btn-close btn-sm" onClick={() => props.onHide()} style={{ fontSize: '18px' }}></button>
        </div>
        <Swiper {...InfoPopupSlideConfig}
        >

          {/* {props.SPS_INFO_IMAGE_PATH ? props.SPS_INFO_IMAGE_PATH.map((data, index) => {
            return (
              <SwiperSlide key={index}>
                <LazyLoadImage effect="" src={data} width="100%" />
              </SwiperSlide>
            )
          })
            : ''} */}
        </Swiper>
        <div className="p-3">
          <h5>{props.sps_desc}</h5>
          <div className="fs-6 py-2">
            {props.sps_more ? parse(props.sps_more) : ''}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default InfoPopup;
