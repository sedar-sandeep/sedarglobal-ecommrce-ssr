import { OnlineStoreText } from '@utils/OnlineStoreText'
import { langName } from '@utils/i18n'
import { getCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';
import { countries } from '@utils/countriesData';
import { Timeout } from '@utils/timeout';
import { ImageComponent } from '@components/image/index';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { WindowResize } from '@utils/windowResize';

const default_ar_country = ['SA', 'OM'];

function LandingPage(props) {
    const [width, height] = WindowResize('landingPage');
    const { t } = useTranslation('common');
    const api_cn_iso = getCookie('sedar_geo');

    const country_info = countries[api_cn_iso] ? countries[api_cn_iso] : [];
    const search_url = typeof window !== "undefined" && window.location ? window.location.search : '';
    const home_en = country_info && country_info['code'] ? country_info['code'] + '-en' : 'global-en';
    const home_ar = country_info && country_info['code'] ? country_info['code'] + '-ar' : 'global-ar';
    const about_url_en = country_info && country_info['code'] ? country_info['code'] + '-en/about' : 'global-en/about';
    const about_url_ar = country_info && country_info['code'] ? country_info['code'] + '-ar/about' : 'global-ar/about';

    const img_url = props.CHILD && props.CHILD[0] && props.CHILD[0].image_path ? props.CHILD[0].image_path : '/assets/images/landing_page.jpg';

    return (
        <Row>

            <Col md={12} xl={6} className={'purpleJam p-0'}>
                <Image src={img_url} alt={props.title} className="cover_img" width={'100%'} style={{ height: height }} />
                <Col className="position-absolute top-3">
                    <a
                        href={langName == 'ar' ? about_url_ar + search_url : about_url_en + search_url}
                        className={`start-0 bg-light bg-opacity-75 px-3 py-4 rounded-end d-none d-xl-block`}
                    >
                        <h2 className={'px-4'}>
                            {t('About_Sedar')}
                            <FontAwesomeIcon icon={faAngleRight} className={`position-relative mt-1 ps-4`} />
                        </h2>
                    </a>
                </Col>
            </Col>
            {Timeout() ? (
                <>
                    {width < 1200 ?
                        (<>
                            <Col md={12} className={`section_two d-grid`}>
                                {home_en == 'global-en' ?
                                    <>
                                        <h1><a href={home_en + search_url}>{OnlineStoreText['get_inspired']['en']}</a></h1>
                                        <h2><a href={home_ar + search_url} className='ar'>{OnlineStoreText['get_inspired']['ar']}</a></h2>
                                    </>
                                    :
                                    <>
                                        <h1><a href={home_en + search_url}>{OnlineStoreText['get_started']['en']}</a> </h1>
                                        <h2><a href={home_ar + search_url} className='ar-bold'>{OnlineStoreText['get_started']['ar']}</a></h2>
                                    </>
                                }
                            </Col>
                            <Col md={12} className={`section_two section_two_transform d-grid`}>
                                {OnlineStoreText && OnlineStoreText[api_cn_iso] ?
                                    <Col xl={12}>
                                        <p className="fs-2">{OnlineStoreText[api_cn_iso]['en'] ? OnlineStoreText[api_cn_iso]['en'] : ''}</p>
                                        <p className='fs-2 ar-light'>{OnlineStoreText[api_cn_iso]['en'] ? OnlineStoreText[api_cn_iso]['ar'] : ''}</p>
                                    </Col>
                                    : ''}
                            </Col>
                        </>
                        )
                        :
                        (
                            <Col xl={6} className={`section_two d-grid`} style={{ height: height }}>
                                <Col xl={12} className={`pt-5`}>
                                    {home_en == 'global-en' ?
                                        <>
                                            <h1><a href={home_en + search_url}>{OnlineStoreText['get_inspired']['en']}</a></h1>
                                            <h2><a href={home_ar + search_url} className='ar'>{OnlineStoreText['get_inspired']['ar']}</a></h2>
                                        </>
                                        :
                                        <>
                                            <h1><a href={home_en + search_url}>{OnlineStoreText['get_started']['en']}</a> </h1>
                                            <h2><a href={home_ar + search_url} className='ar-bold'>{OnlineStoreText['get_started']['ar']}</a></h2>
                                        </>
                                    }
                                </Col>
                                <Col xl={12}>
                                    <a className="arror" href={default_ar_country.indexOf(api_cn_iso) >= 0 ? home_ar + search_url : home_en + search_url}>
                                        <FontAwesomeIcon icon={faAngleRight} size="5x" />
                                    </a>
                                </Col>
                                {OnlineStoreText && OnlineStoreText[api_cn_iso] ?
                                    <Col xl={12}>
                                        <p className="fs-2">{OnlineStoreText[api_cn_iso]['en'] ? OnlineStoreText[api_cn_iso]['en'] : ''}</p>
                                        <p className='fs-2 ar-light'>{OnlineStoreText[api_cn_iso]['en'] ? OnlineStoreText[api_cn_iso]['ar'] : ''}</p>
                                    </Col>
                                    : ''}

                                <Col xl={3} className='position-absolute bottom-0 space_art_img'>
                                    <ImageComponent src={'/assets/images/space_art.png'} alt={'Space Art'} width={100} height={80} />
                                </Col>
                            </Col>
                        )
                    }
                </>
            ) : ('')
            }

        </Row>
    )

};

export default LandingPage;
