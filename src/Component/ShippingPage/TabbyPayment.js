import React, { useEffect, useState, useContext } from 'react';
import parse from 'html-react-parser';
import ApiDataService from '../../services/ApiDataService';
import { ShippingContext } from "./ShippingPage";
import { useTranslation } from 'next-i18next'
import { langName, cn_iso } from '@utils/i18n';
import GoogleAnalytics from '../../services/GoogleAnalytics';
import { Col, Alert, Row, Form, Accordion } from "react-bootstrap";




const TabbyPayment = (props) => {

    const { t } = useTranslation('common');
    const site = localStorage.getItem('siteDetail');

    let ccy_code = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_ccy_code ? JSON.parse(site).show_ccy_code : '';
    let CN_ISO = cn_iso;

    const [tabby_url, setTabby_url] = useState(false);
    const [loading_btn, setLoading_btn] = useState(false);
    const [errorMgs, setErrorMgs] = useState(false);
    const { shipping_state } = useContext(ShippingContext);
    const [variant, setVariant] = useState('danger');

    useEffect(() => {
        if (['AE', 'SA'].indexOf(CN_ISO) == -1 && ['AED', 'SAR'].indexOf(ccy_code) == -1) {
            console.log(CN_ISO, ccy_code)
            //  return false;
        } else if (shipping_state.price_array && Number(shipping_state.price_array.SOL_GROSS_VALUE) > 0) {
            tabbyPage();
        }

    }, [shipping_state.price_array]);

    if (['AE', 'SA'].indexOf(CN_ISO) == -1 && ['AED', 'SAR'].indexOf(ccy_code) == -1) {
        console.log(CN_ISO, ccy_code)
        return false;
    }

    const tabbyPage = () => {
        ApiDataService.post("payment/tabbyPage", {})
            .then((response) => {
                let res_data = response.data;
                setLoading_btn(false);
                //  GoogleAnalytics.addPaymentInfo(shipping_state.header_info, shipping_state.order_list, 'Tabby Payment');
                // console.log(res_data, "tabby");
                if (res_data["curl_response"] && res_data["curl_response"]["status"] != "error" && res_data["curl_response"]["configuration"] && res_data["curl_response"]["configuration"]["available_products"]) {
                    setTabby_url(res_data["curl_response"]["configuration"]["available_products"]);
                } else if (res_data["curl_response"]) {
                    setErrorMgs(res_data["curl_response"]["error"]);
                } else {
                    setErrorMgs(res_data.error_message);
                }
            })
            .catch((e) => {
                setLoading_btn(false);
                setErrorMgs(e.message);
                setVariant("danger");
            });
    };


    return (
        <>
            {tabby_url &&
                tabby_url.installments &&
                tabby_url.installments[0].web_url ? (
                <Col style={{ borderBottom: "1px solid #61616185" }}>
                    <Row>
                        <Col sm={12} className="text-start px-2 p-sm-1">

                            <label htmlFor="installments">
                                <a id="paylaterButton" href={tabby_url.installments[0].web_url} style={{ background: "none", }} className="button__disabled btn-primary text-dark py-3 px-2 d-block text-center fs-6" >
                                    <span> {t("Payininstallmentswithtabby")} </span> <span> <img style={{ width: "56px" }} className="" src={`/assets/images/tabby.png`} alt="sedarglobal" width="56" height="auto" /></span>
                                </a>
                            </label>
                        </Col>
                    </Row>
                </Col>
            ) : (
                ""
            )}
        </>
    )

}

export default TabbyPayment;