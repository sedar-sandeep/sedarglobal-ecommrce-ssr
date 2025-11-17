import React, { useState, useEffect, useRef, useCallback, createRef, Suspense } from 'react';
import { connect } from "react-redux";
import { useTranslation } from 'next-i18next';
import { Col, Row, Container } from 'react-bootstrap';
import MaterialCard from '../MaterialList/MaterialCard';

import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper";
import CircleLoader from '../LoaderComponent/CircleLoader';
import OfferItemList from '../../Preloader/OfferItemList'
import { langName } from '@utils/i18n';
import parse from 'html-react-parser';

const Index = (props) => {

    const { t } = useTranslation('common');
    const [animation, setAnimation] = useState('all 3s');
    const [progress, setProgress] = useState(0);
    const [loader, setLoader] = useState(false)

    let product_list = props.CHILD ? props.CHILD : [];

    const [state, setState] = useState({
        show: false,
        item: false,
        divGrid: 4,
        active_item_id: false
    });


    const ProductMaterialSimilarSlideConfig = {
        loop: false,
        slidesPerView: 4,
        spaceBetween: 30,
        autoHeight: false, //enable auto height          
        observer: true,
        observeParents: true,
        showsPagination: false,
        /*  navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          },*/
        breakpoints: {
            // when window width is >= 320px
            0: {
                slidesPerView: 2.25,
                spaceBetween: 10,
            },
            400: {
                slidesPerView: 2.25,
                spaceBetween: 10,
            },
            // when window width is >= 480px
            576: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            // when window width is >= 640px
            816: {
                slidesPerView: 4,
                spaceBetween: 30,
            }
        },

        pagination: { "clickable": true, dynamicBullets: true }
    }

    const handleShow = (data) => {
        setState({ ...state, show: true, item: data, active_item_id: activeImage[data.SFI_CODE] });
    }
    const handleClose = () => {
        // dispatch(priceReset());
        setState({ ...state, show: false, item: '' });
    }

    let sliderRef = useRef([]);
    sliderRef.current = product_list.map((_, i) => sliderRef.current[i] ?? createRef());

    const handlePrev = useCallback((i) => {
        if (sliderRef.current && sliderRef.current[i] && sliderRef.current[i].current && sliderRef.current[i].current.swiper) {
            sliderRef.current[i].current.swiper.slidePrev();
        }
    }, []);

    const handleNext = useCallback((i) => {
        if (sliderRef.current && sliderRef.current[i] && sliderRef.current[i].current && sliderRef.current[i].current.swiper) {
            sliderRef.current[i].current.swiper.slideNext();
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoader(true)
        }, 300);
    }, [])


    return (
        <section id='OfferSection'>
            <Suspense fallback={<OfferItemList />}>

                <Container className="Offer pb-4">
                    <Col className="MaterialList" id="material_list">
                        {product_list && product_list.map((pro_list, k) => {
                            let pro_mat_list = pro_list.MATERIAL_LIST && pro_list.MATERIAL_LIST[0] ? pro_list.MATERIAL_LIST[0] : false;
                            {
                                return (
                                    loader ?
                                        <Row className="materialgridlist px-2 offer_product_slide" key={k}>
                                            {pro_mat_list && pro_mat_list[k] ? <Row>
                                                <Col md={12} className="heading offer-heading" key={k}>

                                                    <Col className="pro_mat_title">
                                                        <h2>{pro_list.title}</h2>
                                                    </Col>
                                                    <Col className="view_all">
                                                        <a href={pro_list.link_url} target='_blank'>{pro_list.link_title ? pro_list.link_title : t('View_All')}</a>
                                                    </Col>
                                                </Col>
                                                <Row>
                                                    <Col className="mb-3 p-0">{parse(`${pro_list?.description || ''}`)}</Col>
                                                </Row>
                                            </Row> : <OfferItemList key={k} />}

                                            <Swiper modules={[Virtual]} {...ProductMaterialSimilarSlideConfig} key={k} ref={sliderRef.current[k]}>
                                                {pro_mat_list && pro_mat_list.map((data, index) => {
                                                    return (
                                                        <Col key={index}>
                                                            <SwiperSlide key={index} >
                                                                <div className="materialgridlistitem">
                                                                    <MaterialCard
                                                                        {...data}
                                                                        data={pro_mat_list}
                                                                        state={state}
                                                                        setLoader={setLoader}
                                                                        handleShow={handleShow}
                                                                        handleClose={handleClose}
                                                                        category_slug={pro_list.link_url}
                                                                        key={index}
                                                                        offer_product={'Y'}
                                                                    />
                                                                </div>
                                                            </SwiperSlide>
                                                        </Col>

                                                    )
                                                })
                                                }

                                            </Swiper>

                                            <Col className="arrow_navigation d-none d-xl-block">
                                                {langName == 'ar' ? <>
                                                    <div class="swiper-button-next" onClick={() => { handlePrev(k) }}>
                                                        <CircleLoader animation={animation} progress={progress} strokeWidth={2} size={45} />
                                                    </div>
                                                    <div class="swiper-button-prev" onClick={() => { handleNext(k) }}>
                                                        <CircleLoader animation={animation} progress={progress} strokeWidth={2} size={45} action={-1} />
                                                    </div>
                                                </> :
                                                    <>
                                                        <div class="swiper-button-prev" onClick={() => { handlePrev(k) }}>
                                                            <CircleLoader animation={animation} progress={progress} action={-1} strokeWidth={2} size={45} />
                                                        </div>
                                                        <div class="swiper-button-next" onClick={() => { handleNext(k) }}>
                                                            <CircleLoader animation={animation} progress={progress} strokeWidth={2} size={45} />
                                                        </div>
                                                    </>
                                                }
                                            </Col>
                                        </Row>
                                        : <OfferItemList key={k} />
                                )

                            }
                        })}

                    </Col>
                </Container>
            </Suspense>
        </section>

    )

}


const mapStateToProps = (state) => ({ user_state: state.UserReducer, menus_state: state.MenusItemReduser });
const mapDispatchToProps = (dispatch) => {
    return {
        user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Index);