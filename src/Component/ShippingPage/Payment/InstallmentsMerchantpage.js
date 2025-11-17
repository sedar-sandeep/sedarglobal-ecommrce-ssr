import React, { useEffect, useState, useContext } from 'react';
import $ from 'jquery';
import parse from 'html-react-parser';
import ApiDataService from '../../../services/ApiDataService';
import { ShippingContext } from "../ShippingPage";
import { useTranslation } from 'next-i18next'
import { cn_iso, siteDetail, ccy_code } from '@utils/i18n';
import { Col, Row } from "react-bootstrap";

const InstallmentsMerchantpage = () => {
    const { t } = useTranslation('common');
    const [loading_btn, setLoading_btn] = useState(false);
    const [errorMgs, setErrorMgs] = useState(false);
    const [variant, setVariant] = useState("danger");
    const [loading, setLoading] = useState(true);
    const [merchant_response, setMerchant_response] = useState({});

    if (['AE', 'SA'].indexOf(cn_iso) == -1 || ['AED', 'SAR'].indexOf(ccy_code) == -1 ) {
        console.log(cn_iso, ccy_code)
        return false;
    }



    //  const { shipping_state } = useContext(ShippingContext);

    //installments_merchantpage
    //installments
    const payfortInstallmentsMerchantpage = () => {
        ApiDataService.post("payment/merchantPage/installments", {})
            .then((response) => {
                let res_data = response.data;
                $('body').append(res_data.form);
                setLoading_btn(false);
                setMerchant_response(res_data);

                $('#payfort_payment_form input[type=submit]').click();
                //  res_data && res_data.url ? showMerchantPage(res_data.url) : ''

            })
            .catch((e) => {
                setLoading_btn(false);
                setErrorMgs(e.message);
                setVariant("danger");
                setLoading(false);
            });
    };




    return (
        <Col>
            <Row>
                <Col sm={12} className="text-start px-2 p-sm-1">
                    <label htmlFor="installments">
                        <a id="paylaterButton" onClick={payfortInstallmentsMerchantpage} style={{ background: "none" }} className="py-3 px-2 d-block text-center fs-6 text-dark" >
                            <span> {t("Payfortinstallments_payment")} </span> <span> <img style={{ width: "92px", marginTop: "-5px" }} className="" src={`/assets/images/payment/Payfortinstallments_EN.png`} alt="sedarglobal" width="92" height="auto" /></span>
                        </a>
                    </label>
                </Col>
            </Row>
        </Col>
    )
}

export default InstallmentsMerchantpage;