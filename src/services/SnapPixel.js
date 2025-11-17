import { cn_iso } from '@utils/i18n';
import Cookies from 'js-cookie';
const site_url = process.env.NEXT_PUBLIC_SITE_URL; //100001;

class SnapPixel {

    constructor() {
        console.log(site_url, 'SnapPixel');
        const site = Cookies.get('siteDetail') || "undefined";
        this.ccy_code = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_ccy_code ? JSON.parse(site).show_ccy_code : 'AED';
        this.CN_ISO = cn_iso;
        if (typeof snaptr == "undefined") {
            // safe to use the function
            //  console.log('SnapPixel...', site_url, typeof snaptr);
            return false;
        }
    }

    viewItemList(order_list, user_data = false) {
        if (site_url == 'www.sedarglobal.com' && order_list && order_list.length) {

            let gtag_items = [];
            order_list.length > 0 && order_list.forEach((item, index) => {
                // let discount_price = Number(item.OLD_PRICE) - Number(item.PRICE);
                gtag_items.push(item.SFI_CODE);
            });
            if (order_list.length > 0) {

                snaptr('track', 'PAGE_VIEW', {
                    'item_ids': gtag_items,
                    'item_category': order_list && order_list[0] ? order_list[0]['SPI_LINK_URL'] : '',
                    'uuid_c1': user_data && user_data.cust_id ? user_data.cust_id : '',
                    'user_email': user_data && user_data.cust_email_id ? user_data.cust_email_id : '',
                    'user_phone_number': user_data && user_data.cust_mobile_no ? user_data.cust_mobile_no : '',
                    'user_hashed_email': user_data && user_data.cust_email_id ? user_data.cust_email_id : '',
                    'user_hashed_phone_number': user_data && user_data.cust_phone_no ? user_data.cust_phone_no : ''
                });
            }

            console.log(gtag_items, 'gtag_items');
        }

    }
    selectItem(item, user_data = false) {

        if (site_url == 'www.sedarglobal.com' && item && item.PRICE && item.SFI_CODE) {

            // let discount_price = Number(item.OLD_PRICE) - Number(item.PRICE);
            snaptr('track', 'START_CHECKOUT', {
                'price': Number(item.PRICE),
                'currency': this.ccy_code,
                'item_ids': [item.SFI_CODE],
                'item_category': item.SPI_LINK_URL,
                'number_items': 1,
                // 'payment_info_available': 'INSERT 1/0',
                'uuid_c1': user_data && user_data.cust_id ? user_data.cust_id : '',
                'user_email': user_data && user_data.cust_email_id ? user_data.cust_email_id : '',
                'user_phone_number': user_data && user_data.cust_mobile_no ? user_data.cust_mobile_no : '',
                'user_hashed_email': user_data && user_data.cust_email_id ? user_data.cust_email_id : '',
                'user_hashed_phone_number': user_data && user_data.cust_phone_no ? user_data.cust_phone_no : ''
            })
            console.log('gtag...select_item', site_url);
        }

    }
    viewSingleItem(item, user_data = false) {

        if (site_url == 'www.sedarglobal.com' && item && item.PRICE && item.SFI_CODE) {
            //let discount_price = Number(item.OLD_PRICE) - Number(item.PRICE);
            snaptr('track', 'START_CHECKOUT', {
                'price': Number(item.PRICE),
                'currency': this.ccy_code,
                'item_ids': [item.SFI_CODE],
                'item_category': item.SPI_LINK_URL,
                'number_items': 1,
                // 'payment_info_available': 'INSERT 1/0',
                'uuid_c1': user_data && user_data.cust_id ? user_data.cust_id : '',
                'user_email': user_data && user_data.cust_email_id ? user_data.cust_email_id : '',
                'user_phone_number': user_data && user_data.cust_mobile_no ? user_data.cust_mobile_no : '',
                'user_hashed_email': user_data && user_data.cust_email_id ? user_data.cust_email_id : '',
                'user_hashed_phone_number': user_data && user_data.cust_phone_no ? user_data.cust_phone_no : ''
            })
        }

    }
    addToCart(item, state = false, user_data = false) {
        if (site_url == 'www.sedarglobal.com' && item && item.PRICE && item.SFI_CODE) {
            // let discount_price = Number(item.OLD_PRICE) - Number(item.PRICE);
            snaptr('track', 'ADD_CART', {
                'price': Number(item.PRICE),
                'currency': this.ccy_code,
                'item_ids': [item.SFI_CODE],
                'item_category': item.SPI_LINK_URL,
                'number_items': state && state.product_info ? state.product_info.count : 1,
                'uuid_c1': user_data && user_data.cust_id ? user_data.cust_id : '',
                'user_email': user_data && user_data.cust_email_id ? user_data.cust_email_id : '',
                'user_phone_number': user_data && user_data.cust_mobile_no ? user_data.cust_mobile_no : '',
                'user_hashed_email': user_data && user_data.cust_email_id ? user_data.cust_email_id : '',
                'user_hashed_phone_number': user_data && user_data.cust_phone_no ? user_data.cust_phone_no : ''
            });

        }
    }
    addToCartCustomizeGoogle(item, user_data = false) {
        if (site_url == 'www.sedarglobal.com' && item && item.steps) {

            let SFI_CODE = item.steps['MATERIAL_SELECTION'] && item.steps['MATERIAL_SELECTION']['material_info'] ? item.steps['MATERIAL_SELECTION']['material_info']['SII_CODE'] : '';
            snaptr('track', 'ADD_CART', {
                'price': Number(item.PRICE),
                'currency': this.ccy_code,
                'item_ids': [SFI_CODE],
                'item_category': item.product_info ? item.product_info.SC_DESC : '',
                'number_items': item.product_info ? Number(item.product_info.count) : 1,
                'uuid_c1': user_data && user_data.cust_id ? user_data.cust_id : '',
                'user_email': user_data && user_data.cust_email_id ? user_data.cust_email_id : '',
                'user_phone_number': user_data && user_data.cust_mobile_no ? user_data.cust_mobile_no : '',
                'user_hashed_email': user_data && user_data.cust_email_id ? user_data.cust_email_id : '',
                'user_hashed_phone_number': user_data && user_data.cust_phone_no ? user_data.cust_phone_no : ''
            });


        }
    }
    viewCart(order_list, total_price, user_data = false) {
        if (site_url == 'www.sedarglobal.com' && order_list.length > 0) {
            let gtag_items = [];
            let SOL_QTY = 0;
            order_list.length > 0 && order_list.forEach((item, index) => {

                SOL_QTY += Number(item.SOL_QTY);

                gtag_items.push(
                    item.brand_info && item.brand_info.SII_CODE ? item.brand_info.SII_CODE : '',
                );

            })

            if (order_list.length > 0) {
                snaptr('track', 'VIEW_CONTENT', {
                    'price': Number(total_price.SOL_VALUE),
                    'currency': this.ccy_code,
                    'item_ids': gtag_items,
                    'number_items': SOL_QTY,
                    'uuid_c1': user_data && user_data.cust_id ? user_data.cust_id : '',
                    'user_email': user_data && user_data.cust_email_id ? user_data.cust_email_id : '',
                    'user_phone_number': user_data && user_data.cust_mobile_no ? user_data.cust_mobile_no : '',
                    'user_hashed_email': user_data && user_data.cust_email_id ? user_data.cust_email_id : '',
                    'user_hashed_phone_number': user_data && user_data.cust_phone_no ? user_data.cust_phone_no : ''
                })



            }
        }

    }
    purchase(header_result, line_result, user_data = false) {

        if (site_url == 'www.sedarglobal.com' && line_result.length > 0) {
            let gtag_items = [];
            let number_items = 0;

            line_result.length > 0 && line_result.forEach((item, index) => {
                //  let discount_price = Number(item.SOL_OLD_PRICE) - Number(item.SOL_PRICE);
                number_items += Number(item.SOL_QTY);
                gtag_items.push(
                    item.brand_info && item.brand_info.SII_CODE ? item.brand_info.SII_CODE : ''
                );

            });

            snaptr('track', 'PURCHASE', {
                'price': header_result.SOH_NET_VALUE ? Number(header_result.SOH_NET_VALUE) : 0,
                'currency': this.ccy_code,
                'transaction_id': header_result.SOH_TXN_NO,
                'item_ids': gtag_items,
                //'item_category': 'INSERT_ITEM_CATEGORY',
                'number_items': number_items,
                'uuid_c1': user_data && user_data.cust_id ? user_data.cust_id : '',
                'user_email': user_data && user_data.cust_email_id ? user_data.cust_email_id : '',
                'user_phone_number': user_data && user_data.cust_mobile_no ? user_data.cust_mobile_no : '',
                'user_hashed_email': user_data && user_data.cust_email_id ? user_data.cust_email_id : '',
                'user_hashed_phone_number': user_data && user_data.cust_phone_no ? user_data.cust_phone_no : ''
            });

        }
    }

    login(user_data) {
        if (site_url == 'www.sedarglobal.com' && user_data) {
            snaptr('track', 'LOGIN', {
                'uuid_c1': user_data && user_data.cust_id ? user_data.cust_id : '',
                'user_email': user_data && user_data.cust_email_id ? user_data.cust_email_id : '',
                'user_phone_number': user_data && user_data.cust_mobile_no ? user_data.cust_mobile_no : '',
                'user_hashed_email': user_data && user_data.cust_email_id ? user_data.cust_email_id : '',
                'user_hashed_phone_number': user_data && user_data.cust_phone_no ? user_data.cust_phone_no : ''
            });
            console.log(user_data, 'login');
        }
    }

    signup(user_data, sign_type) {

        if (site_url == 'www.sedarglobal.com' && user_data) {
            snaptr('track', 'SIGN_UP', {
                'sign_up_method': sign_type,
                'uuid_c1': user_data && user_data.cust_id ? user_data.cust_id : '',
                'user_email': user_data && user_data.cust_email_id ? user_data.cust_email_id : '',
                'user_phone_number': user_data && user_data.cust_mobile_no ? user_data.cust_mobile_no : '',
                'user_hashed_email': user_data && user_data.cust_email_id ? user_data.cust_email_id : '',
                'user_hashed_phone_number': user_data && user_data.cust_phone_no ? user_data.cust_phone_no : ''
            });
        }
    }



}

export default new SnapPixel();

