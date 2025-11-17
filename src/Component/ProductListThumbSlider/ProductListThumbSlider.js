import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'swiper/swiper-bundle.css';



SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);


const ProductListThumbSlider = (data) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const gallery = data.data;

  const ProductListThumbSliderconfig = {
    observer: true,
    observeParents: true,
    breakpoints: {
      576: {
        pagination: false
      },
    }
  };
  const thumbsSliderConfig = {
    observer: true,
    observeParents: true,
  }

  return (
    <div className="ProductListThumbSlider pb-3 pb-md-1">
      <Swiper
        id="main"
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        tag="section"
        wrapperTag="ul"
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        {...ProductListThumbSliderconfig}
      >

        {gallery && gallery.map((row) => (

          <SwiperSlide key={row.id}>
            <div>
              {data.INFO && data.INFO[0].offer_badge > 0 && (
                <div className="position-absolute top-0 start-0 m-3" style={{ zIndex: '1' }}>
                  <LazyLoadImage role="button" className="img-fluid" src={`/assets/images/iconpng/Group25878.png`} alt={row.desc} width="auto" height="auto" />
                </div>
              )}
              {/* <div className="position-absolute top-0 end-0 m-4">
              <LazyLoadImage role="button" className="img-fluid" src={`/assets/images/ProductdetailPage/Path28392.png`} alt="sedarglobal" />
            </div> */}
              <LazyLoadImage effect="" className="img-fluid" src={row.image_path} alt={row.desc} width="auto" height="auto" />
            </div>
          </SwiperSlide>
        ))}

      </Swiper>

      <Swiper
        id="thumbs"
        className="d-none d-md-block"
        spaceBetween={5}
        slidesPerView={5}
        onSwiper={setThumbsSwiper}
        {...thumbsSliderConfig}
      >

        {gallery && gallery.map((row) => (
          <SwiperSlide key={row.id}>
            <LazyLoadImage effect="" className="img-fluid" src={row.image_path} alt={row.desc} width="auto" height="auto" />
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  )
}


ProductListThumbSlider.propTypes = {};

ProductListThumbSlider.defaultProps = {};

export default ProductListThumbSlider;
