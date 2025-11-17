import React, { useState } from 'react';
// import './ProductSlider.scss';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Virtual, Navigation, Pagination, Lazy, Autoplay } from "swiper";
import { RiArrowRightSLine } from 'react-icons/ri';

import CircleLoader from '../LoaderComponent/CircleLoader';

SwiperCore.use([Virtual, Navigation, Pagination, Autoplay]);

import { useTranslation } from 'next-i18next';
import LinkComponent from '@components/Link';
import { ImageComponent } from '@components/image';
import parse from 'html-react-parser';


const ProductSlider = (props) => {
  const { t } = useTranslation('common');
  const [animation, setAnimation] = useState('all 0.2s');
  const [progress, setProgress] = useState(0);
  // console.log(props, 'propsprops');
  //  let text_section = props.CHILD && props.CHILD[1] ? props.CHILD[1] : [];
  let text_section = props.CHILD && props.CHILD[0] ? props.CHILD[0] : props.CHILD && props ? props : [];
  let img_section = props.CHILD && props.CHILD[1] && props.CHILD[1]['SUB_CHILD'] ? props.CHILD[1]['SUB_CHILD'] : [];


  const swiper_slider = {

    // loop: true,
    slidesPerView: 3,
    autoHeight: false, //enable auto height
    //effect: "fade",
    spaceBetween: 20,
    navigation: {
      nextEl: '.ProductSlider .swiper-next',
      prevEl: '.ProductSlider .swiper-prev'
    },
    breakpoints: {
      // when window width is >= 320px

      // when window width is >= 480px
      0: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      576: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      // when window width is >= 640px
      767: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },
    observer: true,
    observeParents: true,

  };


  const swiperSliderMobile = {
    loop: false,
    observer: true,
    observeParents: true,
    autoHeight: false, //enable auto height
    breakpoints: {
      // when window width is >= 320px
      0: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      // when window width is >= 480px
      576: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      // when window width is >= 640px
      768: {
        slidesPerView: 3,
        spaceBetween: 40
      },
    },
    autoplay: {
      "delay": 4000,
      "disableOnInteraction": false,
    },
  };

  return (
    <section className="ProductSlider pt-4 mt-2">
      <Container className="max-content">
        {!props.isMobile ? (
          <Tab.Container id="left-tabs-example" defaultActiveKey="0">
            <Row className="productslider-tab">
              <Col sm={12} className="shopby-navigation max-content-inner p-0">
                <div className="main-heading py-2">
                  <h1 className="border-start border-2 border-warning ps-3 ps-lg-4"> {text_section.title ? text_section.title : t("Products")}</h1>
                  {text_section.description && (<div className="desc"> {parse(text_section.description)} </div>)}
                </div>
                <Nav variant="pills" >
                  {img_section.map((data, index) => {
                    return (
                      <React.Fragment key={index} >
                        {data.GRAND_CHILD &&
                          <Nav.Item key={index}>

                            <Nav.Link eventKey={index}>{data.title} <p className="line-devider"></p> </Nav.Link>
                          </Nav.Item>
                        }
                      </React.Fragment>
                    );

                  })}
                </Nav>
              </Col>
              {img_section.length > 0 ?
                <Col sm={12} className="shopby-content ">
                  <Tab.Content>
                    {
                      img_section.map((data, index) => {

                        if (data.GRAND_CHILD == undefined) {
                          return false;
                        }
                        return (
                          <Tab.Pane key={index} eventKey={index} className="position-relative">

                            <Swiper {...swiper_slider}
                              onSlideNextTransitionEnd={(swiper) => {
                                let currentItem = swiper.activeIndex + 3;

                                let average = currentItem / img_section.length * 100
                                setProgress(Math.abs(average))

                              }}

                              onSlidePrevTransitionEnd={(swiper) => {
                                let currentItem = swiper.activeIndex;
                                let average = currentItem / img_section.length * 100
                                setProgress(Math.abs(average))
                              }}
                              className="max-content-inner"

                            >

                              {data.GRAND_CHILD.map((slideContent, index) => {
                                return (
                                  <React.Fragment key={index}>
                                    <SwiperSlide key={index} virtualIndex={index}>
                                      <LinkComponent href={slideContent.link_url ? slideContent.link_url : '#'}>

                                        <ImageComponent
                                          key={index}
                                          classprops="w-100"
                                          src={slideContent.image_path}
                                          alt={slideContent.image_alt_seo}
                                          width={420}
                                          height={590}
                                          title={slideContent.title}
                                        />

                                      </LinkComponent>

                                    </SwiperSlide>
                                  </React.Fragment>
                                );
                              })}
                            </Swiper>
                            <div className="sliderNavigation">
                              <div className="swiper-prev">
                                <CircleLoader action={-1} animation={animation} progress={progress} activeColor="#ccc" color="#FDCC5D" />

                              </div>
                              <div className="swiper-next">
                                <CircleLoader action={1} animation={animation} progress={progress} activeColor="#FDCC5D" color="#ccc" />
                              </div>
                            </div>
                          </Tab.Pane>
                        )
                      })
                    }

                  </Tab.Content>
                </Col>
                : ''}
            </Row>
          </Tab.Container>
        ) : (
          <Row>
            <Col sm={12}>
              <div className="main-heading py-1">
                <h2 className="border-start border-2 border-warning ps-3 ps-lg-4"> {props.title ? props.title : t_lang("Products")}</h2>
                {text_section.description && (<div className="desc"> {parse(text_section.description)} </div>)}
              </div>
              {img_section.map((data, index) => {
                if (data.GRAND_CHILD == undefined) {
                  return false;
                }


                return (
                  <div className="mobile-design" key={index}>
                    <div className="heading-section" >
                      <Row className="align-items-center">
                        <Col xs={8}><h2>{data.title}</h2></Col>
                        <Col xs={4}>
                          <LinkComponent href={data.link_url} className="mobile-viewall d-block d-sm-none text-wrap">
                            {t('View_All')}  <RiArrowRightSLine className="text-dark mb-1" size={18} role="button" />
                          </LinkComponent>
                        </Col>
                      </Row>
                    </div>
                    <div className="slider-section">
                      <Swiper {...swiperSliderMobile} className="max-content-inner" key={index}>
                        {data.GRAND_CHILD.map((slideContent, index) => {
                          return (

                            <SwiperSlide key={index} virtualIndex={index}>
                              <LinkComponent href={slideContent.link_url ? slideContent.link_url : '#'}>
                                <ImageComponent
                                  key={index}
                                  classprops="w-100"
                                  src={slideContent.image_path}
                                  alt={slideContent.image_alt_seo}
                                  width={420}
                                  height={590}
                                  title={slideContent.title}
                                />

                              </LinkComponent>

                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>
                  </div>
                )
              })
              }
            </Col>
          </Row>
        )}
      </Container>
    </section>
  )
};



export default ProductSlider;
