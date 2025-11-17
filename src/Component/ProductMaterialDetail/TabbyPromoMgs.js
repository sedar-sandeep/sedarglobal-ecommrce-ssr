
import { langName } from '@utils/i18n';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';


const TabbyPromoMgs = (props) => {

    const site = Cookies.get('siteDetail') || 'undefined';
    let ccy_code = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_ccy_code ? JSON.parse(site).show_ccy_code : '';
    let CN_ISO = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).primary_ref_cn_iso ? JSON.parse(site).primary_ref_cn_iso : 'AE';

    useEffect(() => {
        new TabbyPromo({
            selector: '#tabby_' + props.tab_name, // required, content of tabby Promo Snippet will be placed in element with that selector
            currency: ccy_code, // required, currency of your product
            price: props.amount, // required, price or your product
            installmentsCount: 4, // Optional - custom installments number for tabby promo snippet (if not downpayment + 3 installments)
            lang: langName, // optional, language of snippet and popups, if the property is not set, then it is based on the attribute 'lang' of your html tag
            // source: 'product', // optional, snippet placement; `product` for product page and `cart` for cart page
            // api_key: 'pk_test_09859ac7-623c-4ef1-8a6e-4d1c058b2590' // optional, public key which identifies your account when communicating with tabby

        });
    }, [])

    if (props.amount == 0 || props.amount == '' || CN_ISO != 'AE' || ccy_code != 'AED') {
        return false;
    }

    return (
        <div className="tabystyle my-3" id={'tabby_' + props.tab_name}>aad</div>
    )
}

export default TabbyPromoMgs;