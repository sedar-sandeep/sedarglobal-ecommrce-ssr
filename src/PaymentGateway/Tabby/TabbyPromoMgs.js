import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { cn_iso, langName } from '@utils/i18n';
import Script from "next/script";

const TabbyPromoMgs = (props) => {

    const site = Cookies.get('siteDetail');
    let ccy_code = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_ccy_code ? JSON.parse(site).show_ccy_code : 'AED';
    //console.log(props.tab_name, 'Tabby11');
    useEffect(() => {
        if (typeof window !== "undefined" && typeof window.TabbyPromo !== "undefined" && typeof new window.TabbyPromo !== "undefined") {

            new window.TabbyPromo({
                selector: '#tabby_' + props.tab_name, // required, content of tabby Promo Snippet will be placed in element with that selector
                currency: ccy_code, // required, currency of your product
                price: props.amount, // required, price or your product
                installmentsCount: 4, // Optional - custom installments number for tabby promo snippet (if not downpayment + 3 installments)
                lang: langName && ['en', 'ar'].indexOf(langName) >= 0 ? langName : 'en',// optional, language of snippet and popups, if the property is not set, then it is based on the attribute 'lang' of your html tag
                // source: 'product', // optional, snippet placement; `product` for product page and `cart` for cart page
                //  api_key: 'pk_92c99761-2b28-4a51-a560-43c4e4eb2d59', // optional, public key which identifies your account when communicating with tabby
                publicKey: "pk_92c99761-2b28-4a51-a560-43c4e4eb2d59"

            });

        }
    }, [props.amount, ccy_code, props.tab_name]);

    if (props.amount == 0 || props.amount == '' || ['AE', 'SA'].indexOf(cn_iso) == -1 || ['AED', 'SAR'].indexOf(ccy_code) == -1) {
        return false;
    }

    return (
        <>
            <Col className="tabystyle my-3" id={'tabby_' + props.tab_name}></Col>
        </>
    )
}

export default TabbyPromoMgs;