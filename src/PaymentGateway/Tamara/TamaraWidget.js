import { cn_iso } from '@utils/i18n';
import Cookies from 'js-cookie';
import React, { useEffect, useState, useContext } from 'react';
import { Col } from "react-bootstrap";



const TamaraWidget = (props) => {

    const site = Cookies.get('siteDetail');
    let ccy_code = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_ccy_code ? JSON.parse(site).show_ccy_code : 'AED';

    useEffect(() => {
        typeof window != "undefined" && window.TamaraWidgetV2 ? window.TamaraWidgetV2.refresh() : '';
    }, [props.amount]);

    if (props.amount == 0 || props.amount == '' || ['AE', 'SA'].indexOf(cn_iso) == -1 || ['AED', 'SAR'].indexOf(ccy_code) == -1) {
        return false;
    }

    return (
        <>
            <tamara-widget type="tamara-summary" amount={props.amount} inline-type={props.inline_type ? props.inline_type : 2}></tamara-widget>

        </>
    );
}

export default TamaraWidget;

