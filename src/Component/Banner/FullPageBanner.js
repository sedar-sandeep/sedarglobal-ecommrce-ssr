import React, { useState, useEffect, Suspense } from 'react';
import { isMobile } from "react-device-detect";
import { Swiper, SwiperSlide } from "swiper/react";
import { Col, Row } from 'react-bootstrap';
import ApiDataService from '../../services/ApiDataService';
// Import Swiper styles
import "swiper/css";
import WelcomeMessage from "../LandingPage/WelcomeMessage";
import { WindowResize } from '@utils/windowResize';
import LinkComponent from '@components/Link';
import { IconComponent, ImageComponent } from '@components/image';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LandingPrePage from '../../Preloader/LandingPrePage';

const FullPageBanner = (props) => {

    const [width, height] = WindowResize();

    return (
        <Suspense fallback={<LandingPrePage />}>
            {props.CHILD ?
                <section className="landing_page">
                    <HeaderInfo {...props} />
                    <Row>
                        <Col>
                            <Swiper className="full_banner" style={{ height: height }}>
                                {props.CHILD && props.CHILD.map((slideContent, index) => {
                                    return (
                                        <SwiperSlide key={index}>

                                            <picture>
                                                <source media="(max-width: 575.98px)" srcSet={slideContent.image_path_portrait} />
                                                <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={slideContent.image_path_landscape} />
                                                <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={slideContent.image_path_03} />
                                                <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={slideContent.image_path_02} />
                                                <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={slideContent.image_path_01} />
                                                <LazyLoadImage effect="" src={slideContent.image_path} alt={slideContent.image_alt_seo} className="imsg" width="auto" height='auto' style={{ height: height, width: width }} />
                                            </picture>
                                            {/* <img
                                        src={slideContent.image_path && slideContent.image_path}
                                    /> */}
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </Col>
                        <WelcomeMessage />
                    </Row>
                </section>
                : <LandingPrePage />
            }
        </Suspense>
    );
};

const HeaderInfo = (props) => {
    const [listData, setListData] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    let is_Mobile = props.isMobile ? props.isMobile : isMobile;
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    const headerDataFun = () => {
        let param = { content: 'Contact Info', lang: 'en' };
        ApiDataService.getAll("header/getHeaderData", param)
            .then(response => {
                let res_data = response.data;
                setListData(res_data.result);
                console.log(res_data.result, 'getHeaderData');
            }).catch(e => {
                console.log(e, 'Error');
            });
    }

    useEffect(() => {
        headerDataFun();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <Row className={scrollPosition > 10 ? 'header_info fixed_header' : 'header_info'}>
            <Col className="fixed_logo">
                <LazyLoadImage
                    classprops="nexticon"
                    src="assets/images/Sedar_Logo_Horiz_both_white.png"
                    width={192}
                    // height={42}
                    quality={100}
                /><span>&nbsp;&nbsp;</span>

            </Col>
            <Col className="mobile_fixed_logo">
                <LazyLoadImage
                    classprops="nexticon"
                    src="assets/images/brand/Sedar_Logo_white.png"
                    width={72}
                    // height={10}
                    quality={100}
                />
            </Col>
            <Col className="tel_email_info">
                <ul className="info_ul">
                    {listData && listData[1] &&
                        <li className="tel_email">
                            <LinkComponent href={listData[1].link_url}>
                                <IconComponent
                                    src={scrollPosition > 10 || is_Mobile ? listData[1].image_path : listData[1].sh_icon_path_02}
                                    alt={listData[1]?.image_alt_seo || 'Sedar Global'}
                                    width={17}
                                    height={12}
                                    content={listData[1].content}
                                />
                            </LinkComponent>
                        </li>
                    }
                    {listData && listData[2] &&
                        <li className="tel_email">
                            <LinkComponent href={listData[2].link_url}>
                                <IconComponent
                                    src={scrollPosition > 10 || is_Mobile ? listData[2].image_path : listData[2].sh_icon_path_02}
                                    alt={listData[2]?.image_alt_seo || 'Sedar Global'}
                                    width={17}
                                    height={12}
                                    content={listData[2].content}
                                />
                            </LinkComponent>
                        </li>
                    }
                </ul>
            </Col>
        </Row>
    )
}

export default FullPageBanner;