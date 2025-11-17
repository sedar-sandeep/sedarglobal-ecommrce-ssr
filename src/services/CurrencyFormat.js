import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import ApiDataService from './ApiDataService';
import { siteDetail, ccy_code } from '@utils/i18n';
import { useTranslation } from 'next-i18next';


const CurrencyFormat = (props) => {
    const { t } = useTranslation("common");
    let site_data11 = siteDetail ? JSON.parse(siteDetail) : siteDetail; //props?.menus_state && props?.menus_state?.siteDetail;
    const [site_info, setSite_info] = useState(site_data11);

    let show_decimal11 = site_data11 && site_data11.show_decimals ? site_data11.show_decimals : 0;
    let round_off22 = site_data11 && site_data11.decimals && site_data11.decimals >= 0 ? parseInt(site_data11.decimals) : 0;
    let currency33 = site_data11 && site_data11.price_ccy_code ? site_data11.price_ccy_code : ccy_code;

    const [show_decimal, setShow_decimal] = useState(show_decimal11);
    const [round_off, setRound_off] = useState(round_off22);
    const [currency, setCurrency] = useState(currency33);

    let value = props.value ? Number(props.value) : 0;
    let class_name = props.className ? props.className : '';

    useEffect(() => {
        if (site_info == undefined || site_info.show_decimals == undefined) {
            console.log('CurrencyFormat', site_info);
            ApiDataService.getAll('fetch/country_lov')
                .then(response => {
                    let res_data = response.data;
                    if (res_data.error_message == "Success" && res_data.return_status == 0 && res_data.COMMON[0]) {
                        let site_data = res_data.COMMON[0];
                        setSite_info(site_data);
                        props && props.menuitemlist && props.menuitemlist('SITE_DETAIL', site_data);

                        setShow_decimal(site_data.show_decimals);
                        setRound_off(site_data.decimals && site_data.decimals >= 0 ? parseInt(site_data.decimals) : 0);
                        setCurrency(site_data.price_ccy_code);
                    }
                })
        }
    }, [props, site_info]);


    let currency_code = props.currency_code ? props.currency_code : currency;

    let ammount = value.toFixed(show_decimal);
    if (round_off == 0) {
        ammount = Math.round(value).toFixed(show_decimal);
    } else if (round_off > 0) {
        let val = Number(value.toFixed(round_off));
        ammount = val.toFixed(show_decimal);
    } else {
        ammount = value.toFixed(show_decimal);
    }
    return (
        <>

            {currency_code == 'AED' ?
                <span className={class_name ? class_name + ' currency_code AED_Regular' : "currency_code AED_Regular"}>D </span>
                : currency_code == 'SAR' ? <span className={class_name ? class_name + ' currency_code SAR_Regular' : "currency_code SAR_Regular"}> </span>
                    : <span className={class_name ? class_name + ' currency_code' : "currency_code"}>{props?.prefix && props?.prefix.length > 1 ? t(props.prefix.trim()) : t(currency_code)} </span>
            }
            <span className={class_name ? class_name + ' currency_value' : "currency_value"}>
                {/* {round_off == 0 ? Math.round(value).toFixed(show_decimal) : value.toFixed(show_decimal)} */}
                {new Intl.NumberFormat().format(ammount)}
            </span>

        </>
    )

}




export default (CurrencyFormat);