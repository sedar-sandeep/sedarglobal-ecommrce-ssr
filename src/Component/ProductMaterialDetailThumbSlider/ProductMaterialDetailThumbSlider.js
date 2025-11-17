import React, { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';
import { Col, Row } from 'react-bootstrap';
import ProductImageGalleryPopup from '../ProjectImageGalleryPopup/ProductImageGalleryPopup'
import UseShareButton from '../Utility/UseShareButton';
import ApiDataService from '../../services/ApiDataService';
import { useTranslation } from 'next-i18next'
import { ImageComponent, IconComponent } from '@components/image';

SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

const ProductMaterialDetailThumbSlider = (props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [gallery, setGallery] = useState([]);
  const { t } = useTranslation('common');


  const ProductMaterialDetailThumbSliderConfig = {
    loop: false,
    observer: true,
    observeParents: true,
    pagination: { clickable: true },
    setWrapperSize: true,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
      // when window width is >= 320px
      // 1200: {
      //   spaceBetween: 60,
      //   width: 600
      // },


    }
  }


  const thumbsSliderConfig = {
    loop: false,
    observer: true,
    observeParents: true,
    spaceBetween: 10,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
      },
      // when window width is >= 480px
      576: {
        slidesPerView: 3,
      },
      767: {
        slidesPerView: 7,
      },
      992: {
        slidesPerView: 5,
      },
      1300: {
        slidesPerView: 6,
      },
      // when window width is >= 640px

    }
  }

  const [modalShowProductImage, setModalShowProductImage] = useState(false);


  const fetchGallery = () => {
    let product = props.SPI_PR_ITEM_CODE == undefined ? props?.LISTING && props.LISTING[0].SPI_PR_ITEM_CODE : props.SPI_PR_ITEM_CODE;

    if (props.ITEM_CODE) {
      ApiDataService.getwithSlug(`material/fetch_gallery/${product}/${props.ITEM_CODE}?content=gallery`)
        .then(response => {
          if (response.data.error_message == "Success") {
            setGallery(response.data.result)
          }
        })
    }
  }

  useEffect(() => {
    fetchGallery();
  }, [props.ITEM_CODE, props.ITEM_CODE]);


  return (
    <>

      <div className="ProductMaterialDetailThumbSlider">
        <p className='d-sm-flex justify-content-start recommended_mgs' style={{ fontSize: "10px !important" }}>{t('quick_view_promt_message1')}</p>

        <div className="zoom-slider">
          <Swiper {...ProductMaterialDetailThumbSliderConfig}
            id="main"
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            //controller={{ control: controlledSwiper }}
            tag="section"
            wrapperTag="ul"
            navigation={false}
          >
            {gallery && gallery.map((row, key) => (
              <SwiperSlide key={key}>
                {/* <LazyLoadImage effect="" className="img-fluid w-100" src={row.SLI_IMAGE_PATH} alt={props?.DESCRIPTION || `Sedar Global`} width="auto" height="auto" /> */}
                <ImageComponent
                  classprops={`img-fluid w-100`}
                  src={`${row.SLI_IMAGE_PATH}`}
                  width={512}
                  height={512}
                  contains={true}
                  alt={props?.DESCRIPTION || `Sedar Global`}
                  quality={85}
                />
              </SwiperSlide>
            ))}

          </Swiper>
          <div className="expand-product" >
            <div onClick={() => setModalShowProductImage(true)} rule="button" className="d-none d-md-block">
              {/* <LazyLoadImage effect="" className="img-fluid" src={`/assets/images/ProductdetailPage/expand.png`} alt={props?.DESCRIPTION || `Sedar Global`} width="auto" height="auto" /> */}
              <IconComponent
                classprops={`img-fluid`}
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}assets/images/ProductdetailPage/expand.png`}
                width={24}
                height={24}
                contains={true}
                quality={70}
              />
            </div>
            {/* <Link href="#" className="d-md-none"><a><GoHeart color="#f6f4f4" size={24} /></a></Link> */}

          </div>
          <UseShareButton />
        </div>
        <Row id="thumbs" className="px-3 px-md-0">
          <Col sm={12} className="left">
            <Swiper
              {...thumbsSliderConfig}
              onSwiper={setThumbsSwiper}
              className="d-none d-md-block"
            >

              {gallery && gallery.map((row, key) => (
                <SwiperSlide key={key}>
                  {/* <img className="img-fluid" src={row.SLI_IMAGE_PATH} alt={props?.DESCRIPTION || `Sedar Global`} width="160px" height="160px" /> */}
                  <ImageComponent
                    classprops={`img-fluid`}
                    src={`${row.SLI_IMAGE_PATH}`}
                    alt={props?.DESCRIPTION || `Sedar Global`}
                    width={512}
                    height={512}
                    contains={true}
                    quality={60}
                  />
                </SwiperSlide>
              ))}

            </Swiper>
          </Col>

        </Row>
      </div>

      {modalShowProductImage &&
        <ProductImageGalleryPopup show={modalShowProductImage} onHide={() => setModalShowProductImage(false)} gallery={gallery} />
      }
    </>
  );
}



export default ProductMaterialDetailThumbSlider;
