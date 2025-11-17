import React, { useState, useEffect, Suspense } from 'react'
import { Col, Row } from 'react-bootstrap';
import parse from 'html-react-parser';
import { isMobile } from "react-device-detect";
import LinkComponent from '@components/Link';
import { useTranslation } from 'next-i18next';
import LandingPrePage from '../../Preloader/LandingPrePage';
import { WindowResize } from '@utils/windowResize';

const arabic_country_name = {
    'Global': 'عالمي',
    'Egypt': 'مصر',
    'Oman': 'عمان',
    'Saudi': 'سعودي ',
    'Qatar': 'دولة قطر',
    'Bahrain': 'البحرين',
    'UAE': 'المتحدة',
    'Kuwait': 'الكويت'
}


const CountryList = (props) => {
    let child_len = props.CHILD && props.CHILD.length ? props.CHILD.length - 1 : 0;
    const [activeLangData, setActiveLangData] = useState(false);
    const [loader, setLoader] = useState(false);
    const { t } = useTranslation('common');
    let is_Mobile = props.isMobile ? props.isMobile : isMobile;

    const [width, height] = WindowResize();
    const showLangFun = (data) => {
        setActiveLangData(data);
        console.log(width, height);
        // alert(width);
        // alert(height);

    }
    useEffect(() => {
        setLoader(true);
    }, []);
    return (
        <Suspense fallback={<LandingPrePage />}>
            {loader ?
                <section className="country_list">
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={8} >
                            <Row className="country_icon">
                                {props.CHILD && props.CHILD.map((data, index) => {
                                    if (index != child_len) {
                                        return (
                                            <div key={index} className={activeLangData?.title == data.title ? 'active country_a' : 'country_a'}>
                                                <Col sm={12} className="img_text" onClick={() => showLangFun(data)} >
                                                    <Row>
                                                        <Col sm={5} className="cniso_img">
                                                            <LinkComponent href={is_Mobile ? 'javascript:void(0)' : data.link_url}>
                                                                <img
                                                                    className="country_icon_img"
                                                                    src={data.image_path}
                                                                    width={32}
                                                                    height={32}
                                                                    quality={100}
                                                                />
                                                                <img
                                                                    className="hove_img"
                                                                    src={data.image_path_portrait}
                                                                    width={32}
                                                                    height={32}
                                                                    quality={100}
                                                                />
                                                            </LinkComponent>
                                                        </Col>
                                                        <Col sm={7} className="cniso_text">
                                                            {is_Mobile ?
                                                                <>
                                                                    <p className='arabic'>{arabic_country_name[data.title]}</p>
                                                                    <p>{data.title}</p>
                                                                </>
                                                                :
                                                                <div>{parse(data.description)}</div>
                                                            }
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                {activeLangData && is_Mobile && data.SUB_CHILD && activeLangData.title == data.title ?

                                                    <Col className="mobile_view">
                                                        <Row className="mobile_text_link">
                                                            {data.SUB_CHILD.map((sub_data, sub_key) => {
                                                                return (
                                                                    <LinkComponent href={sub_data.link_url} key={sub_key} className={sub_data.class_name}>
                                                                        {sub_data.link_title ? sub_data.link_title : sub_data.title}
                                                                    </LinkComponent>
                                                                )
                                                            })
                                                            }
                                                        </Row>
                                                    </Col>


                                                    : ''}
                                            </div>
                                        )
                                    }
                                })}
                            </Row>
                        </Col>
                        {props.CHILD && child_len > 0 && <Col xs={12} sm={12} md={12} lg={3} className="country_icon_global">
                            <div className='country_a'>
                                <Col sm={12} className="img_text">
                                    <Row>
                                        <Col sm={5} className="cniso_img auto">
                                            <LinkComponent href={props.CHILD[child_len].link_url} >
                                                <img
                                                    className="country_icon_img "
                                                    src={props.CHILD[child_len].image_path}
                                                    width={32}
                                                    height={32}
                                                    quality={100}
                                                />
                                                <img
                                                    className="hove_img"
                                                    src={props.CHILD[child_len].image_path_portrait}
                                                    width={32}
                                                    height={32}
                                                    quality={100}
                                                />
                                            </LinkComponent>
                                        </Col>

                                        <Col sm={7} className="cniso_text auto">
                                            <div>{parse(props.CHILD[child_len].description)}</div>
                                        </Col>
                                    </Row>
                                </Col>
                            </div>

                        </Col>}
                    </Row>
                </section>
                : <LandingPrePage />
            }
        </Suspense>
    );
};
export default CountryList;