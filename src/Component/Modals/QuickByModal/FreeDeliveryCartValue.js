import Cookies from "js-cookie";

const FreeDeliveryCartValue = () => {
    const site = Cookies.get('siteDetail');
    let currency = site != 'undefined'  && site && JSON.parse(site) != null && JSON.parse(site).show_ccy_code ? JSON.parse(site).show_ccy_code : '';
    let free_delivery_price = 1000;

    switch (currency) {
        case 'AED':
            free_delivery_price = 1000;
            break;
        case 'QAR':
            free_delivery_price = 1000;
            break;
        case 'OMR':
            free_delivery_price = 100;
            break;
        case 'KWD':
            free_delivery_price = 1000;
            break;
        case 'SAR':
            free_delivery_price = 1000;
            break;
        case 'USD':
            free_delivery_price = 1000;
            break;
        case 'EGP':
            free_delivery_price = 1000;
            break;
        case 'BHD':
            free_delivery_price = 100;
            break;
        default:
            free_delivery_price = 1000;
            break;
    }

    return free_delivery_price;

}

export const free_delivery_price = FreeDeliveryCartValue();