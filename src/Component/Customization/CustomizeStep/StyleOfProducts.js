import React, { useState, useEffect, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import InfoPopup from "./InfoPopup";
import SubStepImport from '../SubStepImport';
import { CustomizationContext } from '../CustomizationProduct'
import { Swiper, SwiperSlide } from 'swiper/react';

import LinkComponent from '@components/Link';


// import Swiper core and required modules
import { Autoplay, Pagination, Navigation, Virtual } from 'swiper';
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';

// install Swiper modules


const InfoLink = (props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <LazyLoadImage effect="" role="button" onClick={() => setModalShow(true)} src={`/assets/images/Customization/info.png`} className={`img-fluid ` + props.className} alt="sedarglobal" width="auto" height="auto" />
      <InfoPopup show={modalShow} onHide={() => setModalShow(false)} {...props} />
    </>
  )
}
const StyleOfProducts = (props) => {

  const [selected, setSelected] = useState();
  const [stepArray, setStepArray] = useState();
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);

  const optionFun = (val) => {
    setSelected(val.SPS_CODE);
    setStepArray(val);
    customizeDispatch(val);
  }

  useEffect(() => {
    props.SUB_CHILD.map((data) => {
      data.SPS_VALUE_DEFAULT == 'Y' ? setTimeout(optionFun(data), 2500) : '';
    })
  }, []);

  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  if (props.SUB_CHILD == undefined || props.SUB_CHILD.length == 0) {

    return false;
  }

  const SliderParams = {
    loop: true,
    slidesPerView: 3,
    navigation: {
      prevEl: navigationPrevRef.current,
      nextEl: navigationNextRef.current,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    observer: true,
    observeParents: true,
    spaceBetween: 10,
    modules: [Virtual, Navigation, Pagination, Autoplay],
    breakpoints: {
      // when window width is >= 320px
      0: {

        slidesPerView: 1,
      },
      360: {

        slidesPerView: 2,
      },
      // when window width is >= 480px
      576: {
        spaceBetween: 10,
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
      // when window width is >= 640px

    }

  }


  return (
    <div className="SizeAndMount StyleOfProduct">
      <Row className="step-heading">

        <Col xs={7}><h5>{props.SPS_DESC}</h5></Col>
        <Col xs={5}>
          <div className="sliderNavigation d-flex justify-content-end">
            <div className="swiper-prev pe-3" ref={navigationPrevRef} ><ImArrowLeft2 /></div>
            <div className="swiper-next ps-3" ref={navigationNextRef}> <ImArrowRight2 /></div>
          </div>
        </Col>
      </Row>
      <div className="LiningOption">
        <Row>
          <Col sm={12}>
            <Row>

              <Swiper  {...SliderParams} >
                {props.SUB_CHILD && props.SUB_CHILD.map((data, index) => {
                  let active_cls = data.SPS_CODE == selected ? 'mountgrid active' : 'mountgrid';
                  return (
                    <SwiperSlide key={index} virtualIndex={index}>
                      <Col xs={12} className="mb-2">
                        <div className={active_cls}>
                          <LinkComponent to={`${data.LINK_PATH}/customize`}>
                            <LazyLoadImage src={data.SPS_IMAGE_PATH} className="img-fluid" alt={data.image_alt_seo} role="button" width="auto" height="auto" />
                          </LinkComponent>

                          <p className="py-2">{data.SPS_DESC} {data.SPS_MORE && <InfoLink className="px-1" {...data} />}</p>
                          {data.SPS_CODE == selected ?
                            <div className="selected-icon">
                              <LazyLoadImage effect="" src={`/assets/images/Customization/Group23632.png`} className="img-fluid" alt={data.image_alt_seo} width="auto" height="auto" />
                            </div>
                            :
                            ''}
                        </div>
                      </Col>
                    </SwiperSlide>

                  )
                })
                }
                <div className="sliderNavigation d-none d-lg-flex justify-content-end">
                  <div className="swiper-prev pe-3" ><ImArrowLeft2 /></div>
                  <div className="swiper-next ps-3"> <ImArrowRight2 /></div>
                </div>
              </Swiper>
            </Row>
          </Col>
          <Col sm={12}>
            {props.SUB_CHILD.map((data, index) => {
              if (data.SUB_CHILD && data.SUB_CHILD[0] && stepArray && data.SUB_CHILD[0].SPS_SPS_SYS_ID == stepArray.SPS_SYS_ID) {
                return (
                  <div key={index}>
                    <SubStepImport {...data} />
                  </div>
                )
              }
            })
            }
          </Col>
        </Row>
      </div>
    </div>
  )
}

StyleOfProducts.propTypes = {};

StyleOfProducts.defaultProps = {};

export default StyleOfProducts;
