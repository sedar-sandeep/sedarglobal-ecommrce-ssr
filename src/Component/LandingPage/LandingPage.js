import Head from 'next/head';
import { OnlineStoreText } from '@utils/OnlineStoreText'
import { langName } from '@utils/i18n'
import { getCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { countries } from '@utils/countriesData';
import { Timeout } from '@utils/timeout';
import { ImageComponent } from '@components/image/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { WindowResize } from '@utils/windowResize';

const default_ar_country = ['SA', 'OM'];

function LandingPage(props) {


    const [width, height] = WindowResize('landingPage');
    const { t } = useTranslation('common');
    const api_cn_iso = getCookie('sedar_geo');
    console.log('api_cn_iso', api_cn_iso);

    console.log(props, 'LandingPage**', api_cn_iso)
    const country_info = countries[api_cn_iso] ? countries[api_cn_iso] : [];
    const search_url = typeof window !== "undefined" && window.location ? window.location.search : '';
    const home_en = country_info && country_info['code'] ? country_info['code'] + '-en' : 'global-en';
    const home_ar = country_info && country_info['code'] ? country_info['code'] + '-ar' : 'global-ar';
    const about_url_en = country_info && country_info['code'] ? country_info['code'] + '-en/about' : 'global-en/about';
    const about_url_ar = country_info && country_info['code'] ? country_info['code'] + '-ar/about' : 'global-ar/about';
    console.log(home_en, home_ar, 'home_enhome_ar');
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const img_url = isMobile
        ? '/assets/images/new_landing_mobile.jpg'
        : '/assets/images/new_landing_web.jpg';

    const url = process.env.NEXT_PUBLIC_LOCAL_API_URL || '';

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const previousOverflow = document.body.style.overflow;
        const previousHeight = document.body.style.height;
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        return () => {
            document.body.style.overflow = previousOverflow;
            document.body.style.height = previousHeight;
        };
    }, []);

    return (
        <>
            <div style={{ height: '100vh', overflow: 'hidden' }}>
                <Head>
                    <link rel="alternate" hreflang="x-default" href={url} />
                    <link rel="alternate" hreflang="en" href={`${url}global-en`} />
                    <link rel="alternate" hreflang="ar" href={`${url}global-ar`} />
                    <link rel="alternate" hreflang="en-bh" href={`${url}bhr-en`} />
                    <link rel="alternate" hreflang="ar-bh" href={`${url}bhr-ar`} />
                    <link rel="alternate" hreflang="en-sa" href={`${url}ksa-en`} />
                    <link rel="alternate" hreflang="ar-sa" href={`${url}ksa-ar`} />
                    <link rel="alternate" hreflang="en-ae" href={`${url}uae-en`} />
                    <link rel="alternate" hreflang="ar-ae" href={`${url}uae-ar`} />
                    <link rel="alternate" hreflang="en-om" href={`${url}omn-en`} />
                    <link rel="alternate" hreflang="ar-om" href={`${url}omn-ar`} />
                    <link rel="alternate" hreflang="en-qa" href={`${url}qat-en`} />
                    <link rel="alternate" hreflang="ar-qa" href={`${url}qat-ar`} />
                    <link rel="canonical" href={`${url}`} />
                </Head>

                {/* Top Black Header */}
                <div className="bg-black px-4 py-3 landing-header" style={{ minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Desktop logo */}
                    <div className="desktop-hide landing-desktop-logo" style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
                        <ImageComponent
                            src="/assets/images/Sedar_Logo_new.svg"
                            alt="Sedar Logo"
                            width={160}
                            height={60}
                            style={{
                                opacity: 1,
                                filter: 'drop-shadow(0 0 2px #fff)',
                                background: 'transparent',
                                display: 'block',
                            }}
                        />
                    </div>
                    {/* Mobile header: logo + whatsapp */}
                    <div className="mobile-show">
                        <div className="header-logo-row d-flex justify-content-between align-items-center" style={{ paddingLeft: 16, paddingRight: 16 }}>
                            <div className="header-logo">
                                <ImageComponent
                                    src="/assets/images/Sedar_Logo_new.svg"
                                    alt="Sedar Logo"
                                    width={200}
                                    height={80}
                                    style={{
                                        opacity: 1,
                                        filter: 'drop-shadow(0 0 2px #fff)',
                                        background: 'transparent',
                                        display: 'block',
                                    }}
                                />
                            </div>
                            <div className="header-whatsapp">
                                <a href="https://wa.me/+971502313453" target="_blank" rel="noopener noreferrer">
                                    <img
                                        src="/assets/images/flags/whatsapp.svg"
                                        alt="WhatsApp"
                                        style={{ width: 40, height: 40, filter: 'invert(1)' }}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full Background Section */}
                <div
                    className="landing-page-height position-relative d-flex flex-column justify-content-center align-items-center text-white"
                    style={{
                        backgroundImage: `url(${img_url})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'fixed',
                        // backgroundPosition: 'center',
                        // minHeight: '100vh',
                    }}
                >
                    <div className="overlay position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

                    {/* Three column CTA */}
                    <div className="container position-relative z-1" style={{ height: '100%', marginTop: "-20px" }}>
                        <div className="row text-white text-center landing-mobile-row" style={{ minHeight: '60vh', alignItems: 'center', display: 'flex' }}>
                            {/* Left: Get Started */}
                            <div className="col-md-4 d-flex justify-content-start align-items-center">
                                {home_en == 'global-en'
                                    ?
                                    <a
                                        href={home_en + search_url}
                                        className="fs-3 text-decoration-none landing-hover get-started-big"
                                        style={{ marginLeft: '0.5rem', transition: 'color 0.2s' }}
                                    >
                                        {OnlineStoreText['get_inspired']['en']}
                                        <span className="mobile-hide-arrow">
                                            {' '}<FontAwesomeIcon icon={faArrowRight} />
                                        </span>
                                    </a>
                                    : <a
                                        href={home_en + search_url}
                                        className="fs-3 text-decoration-none landing-hover get-started-big"
                                        style={{ marginLeft: '0.5rem', transition: 'color 0.2s' }}
                                    >
                                        {OnlineStoreText['get_started']['en']}
                                        <span className="mobile-hide-arrow">
                                            {' '}<FontAwesomeIcon icon={faArrowRight} />
                                        </span>
                                    </a>
                                }
                            </div>
                            {/* Middle: Story */}
                            <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
                                <a
                                    href={`/${about_url_en}`}
                                    className="fs-6 mb-1 text-white text-decoration-none landing-hover mobile-hide"
                                    style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                                >
                                    THE STORY
                                </a>
                                <a
                                    href={`/${about_url_ar}`}
                                    className="mb-0 text-white text-decoration-none landing-hover mobile-hide bullets-sides"
                                    style={{ cursor: 'pointer', fontSize: '1.25rem', transition: 'color 0.2s', fontFamily: 'Helvetica-Neue-Light-Arabic' }}
                                >
                                    قصتنا
                                </a>
                            </div>
                            {/* Right: Enter Site */}
                            <div className="col-md-4 d-flex justify-content-end align-items-center">
                                {home_en == 'global-en' ?
                                    <a
                                        href={home_ar + search_url}
                                        className="get-started-arabic fs-3 text-white text-decoration-none landing-hover"
                                        style={{ transition: 'color 0.2s', fontFamily: 'Helvetica-Neue-Light-Arabic' }}
                                    >
                                        <span className="mobile-hide-arrow" style={{ fontFamily: 'Helvetica-Neue-Light-Arabic' }}>
                                            <FontAwesomeIcon icon={faArrowRight} flip="horizontal" />
                                            &nbsp;
                                        </span>
                                        {OnlineStoreText['get_inspired']['ar']}                                </a> :
                                    <a
                                        href={home_ar + search_url}
                                        className="get-started-arabic fs-3 text-white text-decoration-none landing-hover"
                                        style={{ transition: 'color 0.2s', fontFamily: 'Helvetica-Neue-Light-Arabic' }}
                                    >
                                        <span className="mobile-hide-arrow" style={{ fontFamily: 'Helvetica-Neue-Light-Arabic' }}>
                                            <FontAwesomeIcon icon={faArrowRight} flip="horizontal" />
                                            &nbsp;
                                        </span>
                                        {OnlineStoreText['get_started']['ar']}                                    </a>
                                }
                            </div>
                        </div>
                        {/* Info bar fixed at bottom */}
                        <div
                            className="position-absolute w-100 text-white text-center landing-mobile-info"
                            style={{
                                left: 0,
                                marginTop: "-20px"
                            }}
                        >
                            <div className="d-flex justify-content-center gap-1 flex-wrap mb-2">

                                <p className="mb-1 small mobile-hide" style={{ fontWeight: 200, fontSize: width >= 992 ? '0.95rem' : '0.70rem' }}>
                                    {OnlineStoreText[api_cn_iso]?.['en'] ? OnlineStoreText[api_cn_iso]?.['en'] : 'Global'}
                                </p>
                                <p className="mb-1 small mobile-hide" style={{ fontWeight: 200, fontSize: width >= 992 ? '0.95rem' : '0.70rem', fontFamily: 'Helvetica-Neue-Light-Arabic' }}>
                                    | {OnlineStoreText[api_cn_iso]?.['ar'] ? OnlineStoreText[api_cn_iso]?.['ar'] : 'عالمي'}
                                </p>
                            </div>
                            <div className="d-flex justify-content-center gap-3 flex-wrap" style={{ fontWeight: 200, fontSize: width >= 992 ? '0.95rem' : '0.80rem' }}>
                                <span>
                                    <a href="mailto:wecare@sedarglobal.com" className="text-white text-decoration-none" style={{ fontWeight: 200 }}>
                                        <img
                                            src="/assets/images/flags/mail.svg"
                                            alt="Mail"
                                            style={{ width: 18, height: 18, verticalAlign: 'middle', marginRight: 4, filter: 'invert(1)' }}
                                        />
                                        wecare@sedarglobal.com
                                    </a>
                                </span>
                                <span>
                                    <a href={home_en + "/contact"} className="text-white text-decoration-none" style={{ fontWeight: 200 }}>
                                        <img
                                            src="/assets/images/flags/call.svg"
                                            alt="Call"
                                            style={{ width: 18, height: 18, verticalAlign: 'middle', marginRight: 4, filter: 'invert(1)' }}
                                        />
                                        {t('Contact Us')}
                                    </a>
                                </span>
                                <span className="mobile-hide">
                                    <a href={home_en + "/find-your-store"} className="text-white text-decoration-none" style={{ fontWeight: 200 }}>
                                        <img
                                            src="/assets/images/flags/location1.svg"
                                            alt="Location"
                                            style={{ width: 18, height: 18, verticalAlign: 'middle', marginRight: 4 }}
                                        />
                                        {t('Find Your Store')}
                                    </a>
                                </span>
                                <span style={{ fontWeight: 200 }}>
                                    {/* Dynamic country flag */}
                                    <img
                                        src={`/assets/images/flags/${api_cn_iso ? api_cn_iso.toLowerCase() : 'global'}.svg`}
                                        alt={api_cn_iso ? api_cn_iso : 'UAE'}
                                        style={{ width: 24, height: 16, verticalAlign: 'middle', marginRight: 4 }}
                                        onError={e => { e.target.onerror = null; e.target.src = '/assets/images/flags/global.svg'; }}
                                    />
                                    {(() => {
                                        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

                                        if (api_cn_iso === "AE") {
                                            return OnlineStoreText[api_cn_iso]?.['isoen'] || 'Global';
                                        }

                                        return OnlineStoreText[api_cn_iso]?.['en'] || 'Global';
                                    })()}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                @media (max-width: 767px) {
                    .landing-mobile-info {
                        bottom: calc(5vh + env(safe-area-inset-bottom, 0px));
                    }
                    @supports (height: 1svh) {
                        .landing-mobile-info {
                            bottom: calc(5svh + env(safe-area-inset-bottom, 0px));
                        }
                    }
                    @supports (height: 1dvh) {
                        .landing-mobile-info {
                            bottom: calc(5dvh + env(safe-area-inset-bottom, 0px));
                        }
                    }
                }
            `}</style>
        </>
    );
}

export default LandingPage;

