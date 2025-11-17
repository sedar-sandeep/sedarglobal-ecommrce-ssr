import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import LinkComponent from '@components/Link';
import { useTranslation } from 'next-i18next';
import Tiles from './tiles';
import { Col, Row } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const referencesliderconfig = {
  loop: false,
  slidesPerView: 5,
  autoHeight: false,
  spaceBetween: 10,
  watchSlidesProgress: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    767: {
      slidesPerView: 6,
      spaceBetween: 10,
    },
  }
};

const BlogPage = (props) => {
  const { t } = useTranslation("common");

  return (
    <section className="BlogPage midcontainer" style={{width:"100%",overflow: 'hidden'}}>
      <Row>
        <Col className="px-5 pt-5">
          <Breadcrumb>
            <Breadcrumb.Item href={'/'}>
              {t('home')}
            </Breadcrumb.Item>
            {props?.breadcrumb && Object.entries(props?.breadcrumb)?.map((value, key) => {
              return (
                <Breadcrumb.Item href={`${value[1]}`} key={`post-${key}`}>
                  {value[0]}
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
        </Col>
      </Row>

      <Row className="p-3">
        <Col><p className="fs-1 fw-bolder">{props.title}</p></Col>
        <Col className="position-relative">
          <Swiper
            {...referencesliderconfig}
            className="position-absolute bottom-0 end-0 col-12"
          >
            {props.CHILD.map((value, key) => {
              return (
                <SwiperSlide key={`slide-${key}`}>
                  <LinkComponent href={`blog/${value.link_url}`}>
                    {value.title}
                  </LinkComponent>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Col>
      </Row>

      <style dangerouslySetInnerHTML={{
        __html: `
          @media (max-width: 576px) {
            .tile-wrapper {
              width: calc(50% - 10px) !important;
            }
          }
        `
      }} />

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'flex-start',
          width: '100%',
          boxSizing: 'border-box',
          paddingLeft: '10px'
        }}
      >
        {props?.CHILD?.flatMap((value) =>
          value?.SUB_CHILD?.map((row, key) => (
            <div
              key={`tile-${key}`}
              className="tile-wrapper"
              style={{
                width: 'calc(25% - 10px)',
                marginBottom: '20px',
                boxSizing: 'border-box',
              }}
            >
              <Tiles
                {...row}
                category_link={value.link_url}
                category_title={value.title}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default BlogPage;