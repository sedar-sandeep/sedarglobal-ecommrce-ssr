import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'js-cookie';
import { countries_lang } from '@utils/countriesData';
import { OnlineStoreText } from '@utils/OnlineStoreText';
import { eng, globalen, geo } from '@utils/constant';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

function MyVerticallyCenteredModal(props) {
    const { t } = useTranslation("common")
    const { asPath } = useRouter();
    let api_cn_iso = Cookies?.get('sedar_geo') || geo;
    let defaultLocalPath = Cookies?.get('defaultLocalPath') || globalen;
    let langName = Cookies?.get('i18next') || eng;



    let countryName = langName == 'ar' ? OnlineStoreText[api_cn_iso]?.ar : OnlineStoreText[api_cn_iso]?.en;
    let iso = langName == 'ar' ? OnlineStoreText[api_cn_iso]?.isoar : OnlineStoreText[api_cn_iso]?.isoen?.toUpperCase();

    if (defaultLocalPath == undefined || defaultLocalPath == 'undefined-en' || defaultLocalPath == 'undefined-ar') {
        defaultLocalPath = defaultLocalPath == 'undefined-ar' ? 'global-ar' : 'global-en';
    }

    console.log(countryName,iso,'countryName');

    return (
        <Modal
            {...props}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={'text-center'}
        >
            <Modal.Body className={'shadow p-3 pt-5 bg-body rounded'}>
                {OnlineStoreText && OnlineStoreText[api_cn_iso]?.en ?
                    <h1>{t('we_noticed', { country: countryName })}</h1>
                    : ''}

                <Row>
                    <Col className={`p-3 pt-5`} onClick={() => Cookies.set("countryPopup", false, { maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_ONE_WEEK })}>
                        <Row>
                            <Col className={`mb-2`} xs md={6}>
                                <Button
                                    style={{
                                        font: 'normal normal normal 15px / 35px Helvetica-Neue-Medium',
                                        letterSpacing: '0px',
                                        color: '#000',
                                        backgroundColor: '#ffd560',
                                        border: 'transparent',
                                        width: '100%'
                                    }}
                                >
                                    <a href={`/${defaultLocalPath}${asPath}`} style={{ color: '#000' }}>
                                        {t('visit_website', { country: iso || 'GLOBAL' })}
                                    </a>
                                </Button>
                            </Col>
                            <Col className={`mb-2`} xs md={6}>
                                <Button
                                    onClick={props.onHide}
                                    style={{
                                        font: 'normal normal normal 15px / 35px Helvetica-Neue-Medium',
                                        letterSpacing: '0px',
                                        color: '#ffffff',
                                        backgroundColor: '#2b2b2b',
                                        border: 'transparent',
                                        width: '100%'
                                    }}
                                >
                                    <span>
                                        {t('stay_on_this_site')}
                                    </span>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="d-inline px-5 py-4">
                <Col xs={12} className="mb-3">
                    {t('or_please_select_your_country_below')}
                </Col>
                <Col xs={12}>
                    <Row className={`justify-content-center`}>
                        {Object.values(countries_lang[0][langName]).map((row, index) => {
                            return (
                                <Col key={index} xs={3} md={3} lg={2} className={`my-2`}>
                                    <a href={`/${row.code}-${row.lang}`}>
                                        <img src={row.path} alt="" className="rounded-circle img-thumbnail" width={50} height={50} />
                                    </a>
                                </Col>
                            )
                        })}
                    </Row>
                </Col>
            </Modal.Footer>
        </Modal>
    );
}

const CountryModal = () => {
    const [modalShow, setModalShow] = React.useState(true);

    React.useEffect(() => {
        const nextElement = document.getElementById('__next');
        if (nextElement) {
            const filter = modalShow ? "filter:blur(5px)" : "filter:(0px)";
            nextElement.setAttribute('style', filter);
        }
    }, [modalShow]);
    return (
        <>
            {/* <Button variant="primary" onClick={() => setModalShow(true)}>
                Launch vertically centered modal
            </Button> */}

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default CountryModal