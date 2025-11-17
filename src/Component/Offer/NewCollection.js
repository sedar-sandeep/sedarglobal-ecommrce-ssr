import React, { useState } from 'react';
// import "./Offer.scss";
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs } from "swiper";
import { ImageComponent } from '@components/image';

import LinkComponent from "@components/Link";
import parse from 'html-react-parser';
import { RiArrowRightSLine } from 'react-icons/ri';
import CircleLoader from '../LoaderComponent/CircleLoader';
import { useTranslation } from 'next-i18next';


const NewCollection = (props) => {
    const { t } = useTranslation('common')
    const [animation, setAnimation] = useState('all 0.5s');
    const [progress, setProgress] = useState(0);
    const [modalShow, setModalShow] = React.useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);


    const collectionslider = {
        loop: true,
        autoHeight: false, //enable auto height
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            992: {
                slidesPerView: 1,
                spaceBetween: 0,
            }
        },
        navigation: {
            nextEl: '#NewCollection #collectionNext',
            prevEl: '#NewCollection #collectionPrev',
        },
        effect: 'slide',
        initialSlide: 1,
        observer: true,
        observeParents: true,
        loopAdditionalSlides: 1
    };

    return (
        <section id="NewCollection">
            <Container className="offerCollection pt-5 mt-sm-5 mb-5">
                <Row className="offerCollectionrow">
                    <Col sm={12} lg={6} xl={5} className="offerCollection-text d-none d-sm-block">
                        <div className='px-4'>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={1}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                loop={true}
                                simulateTouch={false}
                                allowTouchMove={false}
                            >
                                {props?.CHILD && props?.CHILD.length > 0 && props?.CHILD.map((slideContent, index) => {
                                    return (
                                        <SwiperSlide key={index} >
                                            <>

                                                <div className="d-none d-sm-block w-100">
                                                    <h6 className="offer-title border-start border-end-0 border-2 border-warning ps-3 ps-lg-4 ">{slideContent.title ? slideContent.title : 'New collections'}</h6>
                                                    <div className="py-2 pb-lg-5" sm={12}>
                                                        {slideContent.description ? parse(slideContent.description) : ''}
                                                    </div>
                                                    <Col className="shop-link ps-4 pb-3" xs={6} sm={6} md={12}>
                                                        <LinkComponent href={slideContent.link_url ? slideContent.link_url : '#'} className="border-bottom  border-2 border-warning pb-1">
                                                            {slideContent.link_title ? slideContent.link_title : ''}
                                                        </LinkComponent>
                                                    </Col>
                                                </div>
                                                <Row className="px-3 mt-2 d-sm-none">
                                                    <Col xs={8} >
                                                        <h6 className="offer-title border-start border-end-0 border-2 border-warning ps-3 ps-lg-4 text-start">{slideContent.title ? slideContent.title : 'New collections'}</h6>
                                                    </Col>
                                                    <Col className="shop-link-mobile text-end align-middle" xs={4}>
                                                        <LinkComponent href={slideContent.link_url} className="border-bottom  border-2 border-warning pb-1">
                                                            {t('View_All')}
                                                        </LinkComponent>
                                                    </Col>
                                                    <div>
                                                        <div className="py-2 px-0 pb-lg-5" sm={12}>
                                                            {slideContent.description ? parse(slideContent.description) : ''}
                                                        </div>
                                                    </div>
                                                </Row>
                                            </>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    </Col>
                    <Col sm={12} lg={6} xl={{ span: 5, offset: 1 }} className="position-relative mr-0">
                        <div>
                            <Swiper
                                modules={[FreeMode, Navigation, Thumbs]}
                                onSlideNextTransitionEnd={(swiper) => {
                                    let currentItem = swiper.activeIndex - 2
                                    let average = currentItem / props?.CHILD?.length * 100
                                    setProgress(Math.abs(average))
                                }}
                                onSlidePrevTransitionEnd={(swiper) => {
                                    let currentItem = swiper.activeIndex;
                                    let average = currentItem / props?.CHILD?.length * 100
                                    setProgress(Math.abs(average))
                                }}

                                {...collectionslider}
                                className={props?.CHILD && props.CHILD.length > 1 ? `offerCollectionSlider multislide` : `offerCollectionSlider`}
                                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            >
                                {props.CHILD && props?.CHILD.length > 0 && props.CHILD.map((slideContent, index) => {
                                    return (
                                        <SwiperSlide key={index} >
                                            <div className="d-sm-none px-1 mt-2">
                                                <Row className="offerCollection-text">
                                                    <Col xs={7}>
                                                        <h6 className="offer-title border-start border-end-0 border-2 border-warning ps-3 ps-lg-4 text-start">{slideContent.title ? slideContent.title : 'New collections'}</h6>
                                                    </Col>
                                                    <Col xs={5}>
                                                        <div className="shop-link-mobile text-end align-middle p-0">
                                                            <LinkComponent href={slideContent.link_url} className="border-end  border-2 border-warning pb-1">
                                                                {t('View_All')}
                                                                <RiArrowRightSLine className="text-dark mb-1 me-1" size={18} role="button" />
                                                            </LinkComponent>
                                                        </div>
                                                    </Col>

                                                    {slideContent.description &&
                                                        <div className="py-2 px-0 pb-lg-5" sm={12}>
                                                            {/* {slideContent.description ? parse(slideContent.description) : ''} */}
                                                            {slideContent.description.length < 100 ?
                                                                parse(slideContent.description)
                                                                :
                                                                <> <>{parse(slideContent.description.substring(0, 100))} </> <span onClick={() => setModalShow({ modal: true, title: slideContent.title, desc: slideContent.description })}><p className='shop-link-mobile'><a>{"More"}</a></p></span></>
                                                            }
                                                        </div>
                                                    }
                                                </Row>
                                            </div>

                                            <picture>
                                                <source media="(max-width: 575.98px)" srcSet={slideContent.image_path_portrait} />
                                                <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={slideContent.image_path_landscape} />
                                                <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={slideContent.image_path_03} />
                                                <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={slideContent.image_path_02} />
                                                <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={slideContent.image_path_01} />
                                                <img src={slideContent.image_path} alt={slideContent.image_alt_seo} className="w-100 img-fluid" width="auto" height="auto" />
                                            </picture>


                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    </Col>
                    <Col sm={12} lg={6} xl={1}>
                        <div className="sliderNavigation d-none d-xl-block float-end">
                            <div className="swiper-next" id="collectionNext">
                                <CircleLoader action={1} animation={animation} progress={progress} activeColor="#FDCC5D" color="#ccc" />
                            </div>
                            <div className="swiper-prev" id="collectionPrev">
                                <CircleLoader action={-1} animation={animation} progress={progress} activeColor="#ccc" color="#FDCC5D" />
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
            <MoreData
                show={modalShow.modal}
                onHide={() => setModalShow(false)}
                data={modalShow && modalShow}
            />
        </section>
    );
}

const MoreData = (props) => {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.data.title && props.data.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.data.desc && parse(props.data.desc)}
            </Modal.Body>
        </Modal>
    );
}

NewCollection.propTypes = {};

NewCollection.defaultProps = {};

export default NewCollection;
