import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import parse from 'html-react-parser';
import ApiDataService from '../../services/ApiDataService';
import { browserName, browserVersion } from "react-device-detect";
import { useTranslation } from 'next-i18next';
import CookieConsent, {

    getCookieConsentValue,

    Cookies,

} from "react-cookie-consent";
import { initGA } from "../../utils/ga-utils";

const CookiePopup = (props) => {
    const { t } = useTranslation("common")
    const [cookieVal, setCookieVal] = useState();
    const [cookie_data, setCookie_data] = useState();
    const [show, setShow] = useState(false);
    const getCookiesData = () => {

        ApiDataService.getAll("content/first", { content: 'cookie_policy' })
            .then(response => {
                let res_data = response.data;
                let len = res_data.result && res_data.result.COMPONENT ? res_data.result.COMPONENT.length : 0;
                if (len > 0 && res_data.result && res_data.result.COMPONENT) {
                    setCookie_data(res_data.result.COMPONENT[len - 1]);
                }
            }).catch(e => {
                console.log(e);

            });
    }


    // Create cookie
    const setCookie = (cname, cvalue, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    // Delete cookie
    const deleteCookie = (cname) => {
        const d = new Date();
        d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=;" + expires + ";path=/";
    }

    // Read cookie
    const getCookie = (cname) => {
        try {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie?.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    // return c.substring(name.length, c.length);
                    return false;
                }
            }
            return true;
        }
        catch (err) {
            console.log(err, 'decodeURIComponent');
            deleteCookie(cname);
            return true;
        }
    }

    // Set cookie consent
    const acceptCookieConsent = () => {
        handleAcceptCookie();
        deleteCookie('sedarGlobal_cookie_consent');
        setCookie('sedarGlobal_cookie_consent', 1, 30);
        setCookieVal(false);
        Cookies.set("CookieConsent", "true", { path: "/", expires: 1, sameSite: "Lax" });

    }
    useEffect(() => {
        getCookiesData();
        setCookieVal(getCookie("sedarGlobal_cookie_consent"));

        if (browserName == 'Chrome' && browserVersion < 32) {
            setShow(true);
        } else if (browserName == 'Edge' && browserVersion < 18) {
            setShow(true);
        } else if (browserName == 'Safari' && browserVersion < 16) {
            setShow(true);
        } else if (browserName == 'Firefox' && browserVersion < 65) {
            setShow(true);
        } else if (browserName == 'Opera' && browserVersion < 19) {
            setShow(true);
        } else if (browserName == 'IE') {
            setShow(true);
        } else {
            setShow(false);
        }

    }, []);


    const BrowserVersionPopup = () => {

        return (
            <div className="CookiePopup">
                {/* <Col>
                    <Alert show={show} className="justify-content-center">
                        {browserDetail}
                        <hr />
                        <div className="d-flex justify-content-center">
                            <Button onClick={() => setShow(false)} variant="outline-success">
                                Close
                            </Button>
                        </div>
                    </Alert>

                </Col> */}
                <Alert show={show} className="justify-content-center" style={{ backgroundColor: '#fff', borderColor: '#fff', color: '#000' }}>
                    <Row className='cookieNotice'>
                        <Col>
                            <Col>
                                <Col sm={12}>
                                    <p style={{ textAlign: "center" }}>
                                        {t('your_current_browser_may_be_outdated')}
                                    </p>
                                </Col>

                                <Col sm={12}>
                                    <div className="btn-wrap color-button" style={{ margin: '10px auto 0', width: '210px' }}>
                                        <button className="btn accept-button" onClick={() => setShow(false)} >{t('Close')}</button>
                                    </div>
                                </Col>
                            </Col>
                        </Col>
                    </Row>
                </Alert>
            </div>
        )

    }

    const handleAcceptCookie = () => {

        initGA("G-20ZHK7ZNYB");

    };
    const handleDeclineCookie = () => {
        setCookieVal(false);

        //remove google analytics cookies

        Cookies.remove("_ga");

        Cookies.remove("_gat");

        Cookies.remove("_gid");

    };
    React.useEffect(() => {

        const isConsent = getCookieConsentValue();

        if (isConsent === "true") {

            handleAcceptCookie();

        }

    }, []);
    return (
        <>
            {cookieVal && cookie_data && cookie_data.PARENT ? <div className="CookiePopup">
                <Row className='cookieNotice'>
                    <Col>
                        <Col>
                            <Col sm={12}>
                                <p style={{ textAlign: "center" }}>
                                    {cookie_data && cookie_data.PARENT ? parse(cookie_data.PARENT.description) : ''}
                                </p>
                            </Col>

                            <Col sm={12} className="d-flex justify-content-center">
                                <div className="btn-wrap color-button mx-2 mt-3" style={{ width: '210px' }}>
                                    <button className="btn accept-button" onClick={acceptCookieConsent}>{t('Accept')}</button>
                                </div>
                                <div className="btn-wrap color-button mx-2 mt-3" style={{ width: '210px' }}>
                                    <button className="btn accept-button" onClick={handleDeclineCookie}>{t('Close')}</button>
                                </div>
                            </Col>

                        </Col>
                    </Col>
                </Row>
            </div> : ''}

            {/* <BrowserVersionPopup /> */}

        </>
    )
}


CookiePopup.propTypes = {};

CookiePopup.defaultProps = {};

export default CookiePopup;
