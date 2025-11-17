import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Virtual, Navigation, Pagination, Lazy } from 'swiper';



import { Container, Modal } from 'react-bootstrap';


SwiperCore.use([Virtual, Navigation, Pagination, Lazy]);


const ProjectImageGalleryPopup = (props) => {

  const Projectimagesliderparams = {
    loop: true,
    slidesPerView: 1,
    autoHeight: false, //enable auto height
    //effect: 'fade',
    navigation: true,
    lazy: true,
    observer: true,
    observeParents: true,
    spaceBetween: 0,

  }


  const [slidenumber, setslidenumber] = useState('1')
  return (
    <Modal {...props}
      dialogClassName="ProjectImageGalleryPopup"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <div className="close-button" role="button" onClick={props.onHide}> ✕ </div>
      <Modal.Body>
        <Swiper {...Projectimagesliderparams} onSlideChange={(swiper) => { setslidenumber(swiper.realIndex + 1) }} pagination={{
          "type": "fraction"
        }}>
          {props.CHILD && props.CHILD.map((slideContent, index) => {

            return <SwiperSlide key={index} virtualIndex={index}>
              <img data-src={slideContent.image_path} alt={slideContent.image_alt_seo} className="img-fluid swiper-lazy" width="auto" height="auto" />
              <div className="swiper-lazy-preloader"></div>
            </SwiperSlide>;

          })}
        </Swiper>
      </Modal.Body>

    </Modal>
  )
}


ProjectImageGalleryPopup.propTypes = {};

ProjectImageGalleryPopup.defaultProps = {

};

export default ProjectImageGalleryPopup;
