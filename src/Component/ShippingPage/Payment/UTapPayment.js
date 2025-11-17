import React, { useEffect, useState, useContext } from 'react';
import parse from 'html-react-parser';
import ApiDataService from '../../../services/ApiDataService';
import { ShippingContext } from "../ShippingPage";
import GoogleAnalytics from '../../../services/GoogleAnalytics';
import { Col, Alert, Row, Form, Accordion } from "react-bootstrap";
import { langName, cn_iso, ccy_code } from '@utils/i18n';
import { useTranslation } from 'next-i18next'
let pay_img = "/assets/images/payment/";


const UTapPayment = (props) => {

    return false;

    const { t } = useTranslation('common');
    const [api_data, set_apiData] = useState(false);
    const [loading_btn, setLoading_btn] = useState(false);
    const [errorMgs, setErrorMgs] = useState(false);
    const { shipping_state } = useContext(ShippingContext);
    const [variant, setVariant] = useState('danger');

    useEffect(() => {
        if (['AE'].indexOf(cn_iso) >= 0 && ['AED'].indexOf(ccy_code) >= 0 && shipping_state.price_array && Number(shipping_state.price_array.SOL_GROSS_VALUE) > 0) {
            CheckOutFun();
        }
    }, [shipping_state.price_array]);

    if (['AE'].indexOf(cn_iso) == -1 && ['AED'].indexOf(ccy_code) == -1) {
        console.log(cn_iso, ccy_code)
        return false;
    }

    const CheckOutFun = () => {
        console.log('CheckOutFun..', api_data);
        ApiDataService.post("payment/uTapPayment", {})
            .then((response) => {
                let res_data = response.data;
                setLoading_btn(false);
                // GoogleAnalytics.addPaymentInfo(shipping_state.header_info, shipping_state.order_list, 'Tabby Payment');
                console.log(res_data, "CheckOutFun2222", res_data["result"]["SMSLink"]);
                if (res_data["return_status"] == "0" && res_data["error_message"] != "error" && res_data["result"] && res_data["result"]["SMSLink"] && res_data["result"]["Txn_ID"]) {
                    set_apiData(res_data["result"]);
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
            {api_data && api_data.SMSLink && api_data.MessageContent ? (
                <Col>
                    <Row>
                        <Col sm={12} className="text-start px-2 p-sm-1">
                            <label htmlFor="PointPay">
                                <a id="paylaterButton" href={api_data.SMSLink} style={{ background: "none" }} className="py-3 px-2 d-block fs-6 text-dark" title={api_data.MessageContent}>
                                    <span> {t("UTapPayment")} </span>
                                    <span> <img src={pay_img + "Utapwhitebgwithmswipe.c3970fd3.png"} alt="sedarglobal" style={{ width: '158px' }} />
                                    </span>
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

export default UTapPayment;