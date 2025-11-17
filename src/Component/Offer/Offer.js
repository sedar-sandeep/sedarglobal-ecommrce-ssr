import React from "react";

import { Container, Col, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual, Navigation, Pagination } from "swiper";
import { RiArrowRightSLine } from 'react-icons/ri';

// import "./Offer.scss";

import { useTranslation } from 'next-i18next';
import LinkComponent from "@components/Link";

const Offer = (props) => {
  const { t } = useTranslation('common')

  const offersliderconfig = {
    observer: true,
    observeParents: true,
    loop: false,
    slidesPerView: 3,
    autoHeight: false, //enable auto height   
    spaceBetween: 25,
    breakpoints: {
      // when window width is >= 320px
      0: {
        slidesPerView: 1.3,
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
    }
  };



  const OfferSectionstyle = {
    backgroundImage: "url('" + `/assets/images/Mask%20Group%2099.png` + "')",
    backgroundPosition: 'right',
    backgroundPositionY: 'center',
    backgroundSize: '60%',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  };


  return (
    <>
      <section id="OfferSection" className="" style={OfferSectionstyle}>
        <Container className="Offer pb-4">
          <Row className="heading offer-heading">
            <div className="space-33"></div>
            <Col>
              <h6 className="offer-title border-start border-2 border-warning ps-3 ps-lg-4">{props.title}</h6>
            </Col>
            <Col sm={4} className="" xs={3}>
              <>
                {/* <LinkComponent href={"/"} className="offer-title-all align-middle float-end  d-none d-sm-block  border-bottom border-2 border-warning pb-1">
                  {props.link_title ? props.link_title : t('View_All_Offers')}
                </LinkComponent>
                <LinkComponent href={"/"} className="offer-title-all-mobile text-nowrap align-middle d-block d-sm-none float-end ">
                  {t('View_All')} <RiArrowRightSLine className="text-dark mb-1" size={18} role="button" />
                </LinkComponent> */}
              </>
            </Col>
          </Row>

          <Row>
            <Col sm={12} className="offerslider">
              <div>
                <Swiper modules={[Virtual, Navigation, Pagination]} {...offersliderconfig} className="" >
                  {props.CHILD && props.CHILD.map((slideContent, index) => {

                    return (
                      <SwiperSlide key={index} >
                        {slideContent.link_title && slideContent.link_url ? <a href={slideContent.link_url} className="slider-text">
                          {slideContent.link_title}
                        </a> : ''}
                        <picture>
                          <source media="(max-width: 575.98px)" srcSet={slideContent.image_path_portrait} />
                          <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={slideContent.image_path_landscape} />
                          <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={slideContent.image_path_03} />
                          <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={slideContent.image_path_02} />
                          <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={slideContent.image_path_01} />
                          <img src={slideContent.image_path} alt={slideContent.image_alt_seo} className="w-100" width="auto" height="auto" />
                        </picture>

                        {/* <div className="overly-color"></div> */}
                        {/* <div className="slider-text"> <p> {slideContent.title && slideContent.title} </p> </div> */}

                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </Col>
          </Row>


        </Container>
      </section>
    </>
  );
};

Offer.propTypes = {};

Offer.defaultProps = {};

export default Offer;
