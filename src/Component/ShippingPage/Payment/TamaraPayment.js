import React, { useEffect, useState, useContext } from 'react';
import ApiDataService from '../../../services/ApiDataService';
import { ShippingContext } from "../ShippingPage";
import { useTranslation } from 'next-i18next'
import { Col, Alert, Row, Form, Accordion } from "react-bootstrap";
import { ccy_code, cn_iso } from '@utils/i18n';


const TamaraPayment = (props) => {

    const { t } = useTranslation('common');

    const [tamara_data, setTamara_data] = useState(false);
    const [loading_btn, setLoading_btn] = useState(false);
    const [errorMgs, setErrorMgs] = useState(false);
    const { shipping_state } = useContext(ShippingContext);
    const [variant, setVariant] = useState('danger');

    useEffect(() => {
        if (['AE', 'SA'].indexOf(cn_iso) == -1 || ['AED', 'SAR'].indexOf(ccy_code) == -1) {
            console.log(cn_iso, ccy_code)
            // return false;
        } else if (shipping_state.price_array && Number(shipping_state.price_array.SOL_GROSS_VALUE) > 0) {
            tamaraCheckOutFun();
        }
    }, [shipping_state.price_array]);

    if (['AE', 'SA'].indexOf(cn_iso) == -1 && ['AED', 'SAR'].indexOf(ccy_code) == -1) {
        console.log(cn_iso, ccy_code)
        return false;
    }
    const tamaraCheckOutFun = () => {
        ApiDataService.post("payment/tamara", {})
            .then((response) => {
                let res_data = response.data;
                setLoading_btn(false);
                // GoogleAnalytics.addPaymentInfo(shipping_state.header_info, shipping_state.order_list, 'Tabby Payment');
                console.log(res_data, "tamara55");
                if (res_data["return_status"] == 0 && res_data["error_message"] != "error" && res_data["result"] && res_data["result"]["redirectUrl"] && res_data["result"]["tamaraOrderId"]) {
                    setTamara_data(res_data["result"]);
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
            {tamara_data && tamara_data.redirectUrl ? (
                <Col style={{ borderBottom: "1px solid #61616185" }}>
                    <Row>
                        <Col sm={12} className="text-start px-2 p-sm-1">

                            <label htmlFor="installments">
                                <a id="paylaterButton" href={tamara_data.redirectUrl} style={{ background: "none" }} className="py-3 px-2 d-block text-center fs-6 text-dark" >
                                    <span> {t("tamara_payment")} </span> <span> <img style={{ width: "72px" }} className="" src={`/assets/images/payment/tamara_logo1.png`} alt="sedarglobal" width="72" height="auto" /></span>
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

export default TamaraPayment;