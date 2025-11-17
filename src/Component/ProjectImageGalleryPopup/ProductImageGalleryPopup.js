import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Container, Modal } from 'react-bootstrap';
//import { MdOutlineSubject } from 'react-icons/md';
//import { LazyLoadImage } from 'react-lazy-load-image-component';


const ProductImageSliderParams = {
  loop: false,
  slidesPerView: 1,
  autoHeight: false, //enable auto height
  //effect: 'fade',
  navigation: true,
  // lazy: true,
  observer: true,
  observeParents: true,
  spaceBetween: 0,

}


const ProductImageGalleryPopup = (props) => {
  const [slidenumber, setslidenumber] = useState('1');
  return (
    <>
      <Modal {...props}
        className="ImageGalleryPopup"
        dialogClassName="ProductImageGalleryPopup ProjectImageGalleryPopup"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <div className="close-button" onClick={props.onHide}> ✕ </div>
        <Modal.Body>
          <Swiper {...ProductImageSliderParams} onSlideChange={(swiper) => setslidenumber(swiper.realIndex + 1)} pagination={{
            "type": "fraction"
          }}>

            {props.gallery && props.gallery.map((row, key) => (
              <SwiperSlide key={key}>
                <img src={row.SLI_IMAGE_PATH} alt="sedarglobal" className="img-fluid swiper-lazy" width="auto" height="auto" />

              </SwiperSlide>
            ))}

          </Swiper>
        </Modal.Body>

      </Modal>
    </>


  )
}




ProductImageGalleryPopup.propTypes = {};

ProductImageGalleryPopup.defaultProps = {

};

export default ProductImageGalleryPopup;
