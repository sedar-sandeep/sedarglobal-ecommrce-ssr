import React, { useEffect, useState, useContext } from 'react';
//import parse from 'html-react-parser';
import ApiDataService from '../../../services/ApiDataService';
import { ShippingContext } from "../ShippingPage";
//import GoogleAnalytics from '../../../services/GoogleAnalytics';
import { Col, Row} from "react-bootstrap";
import { cn_iso, ccy_code } from '@utils/i18n';
import { useTranslation } from 'next-i18next';
import { LazyLoadImage } from "react-lazy-load-image-component";
let pay_img = "/assets/images/payment/";


const PointsPayPayment = () => {

    const { t } = useTranslation('common');

    const [api_data, set_apiData] = useState(false);
    const [loading_btn, setLoading_btn] = useState(false);
    const [errorMgs, setErrorMgs] = useState(false);
    const { shipping_state } = useContext(ShippingContext);
    const [variant, setVariant] = useState('danger');
    const [merchant_code, setMerchant_code] = useState(false);
    const [pointspay_url, setPointspay_url] = useState(false);

    useEffect(() => {
        if (['EG'].indexOf(cn_iso) == -1 && ['EGP'].indexOf(ccy_code) == -1 && shipping_state.price_array && Number(shipping_state.price_array.SOL_GROSS_VALUE) > 0) {
            CheckOutFun();
        }
    }, [shipping_state.price_array]);

    if (['EG'].indexOf(cn_iso) != -1 && ['EGP'].indexOf(ccy_code) != -1) {
        console.log(cn_iso, ccy_code)
        return false;
    }


    const CheckOutFun = () => {
        ApiDataService.post("payment/pointsPay", {})
            .then((response) => {
                let res_data = response.data;
                setLoading_btn(false);
                // GoogleAnalytics.addPaymentInfo(shipping_state.header_info, shipping_state.order_list, 'Tabby Payment');
                console.log(res_data, "pointsPay");
                if (res_data["return_status"] == 0 && res_data["error_message"] != "error" && res_data["result"] && res_data["result"]["links"] && res_data["result"]["id"]) {
                    set_apiData(res_data["result"]);
                    setMerchant_code(res_data.merchant_code);
                    setPointspay_url(res_data.pointspay_url);
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
            {api_data && api_data.links && api_data.links[0] && merchant_code && pointspay_url ? (
                <Col>
                    <Row>
                        <Col sm={12} className="text-start px-2 p-sm-1">

                            <label htmlFor="PointPay">
                                <a id="paylaterButton" href={api_data.links[0]['href']} style={{ background: "none" }} className="py-3 px-2 d-block fs-6 text-dark" title={api_data.links[0]['rel']}>
                                    <span> {t("points_pay_payment")} </span>
                                    <span>
                                        {/* <img src={`${pointspay_url}checkout/user/btn-img-v2?s=${merchant_code}&is=245x40&l=${langName}`} alt="sedarglobal" /> */}
                                        <LazyLoadImage
                                            className="img-fluid"
                                            src={`${pay_img}Etihad_GuestPay_logo_21-9.png`}
                                            alt="Mada"
                                            width="126"
                                            height="115"
                                        />

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

export default PointsPayPayment;