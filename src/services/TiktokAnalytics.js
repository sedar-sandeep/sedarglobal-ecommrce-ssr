import { cn_iso } from '@utils/i18n';
import Cookies from 'js-cookie';
const site_url = process.env.NEXT_PUBLIC_SITE_URL; //100001;

class TiktokAnalytics {

    constructor() {
        const site = Cookies.get('siteDetail') || "undefined";
        this.ccy_code = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_ccy_code ? JSON.parse(site).show_ccy_code : 'AED';
        this.CN_ISO = cn_iso;
        if (typeof ttq == "undefined" || typeof ttq.track == "undefined") {
            // safe to use the function
            console.log('TiktokAnalytics...', site_url, typeof ttq);
            return false;
        }
        console.log('TiktokAnalytics...', site_url, typeof ttq);
        return false;
    }

    viewItemList(order_list) {
        if (site_url == 'www.sedarglobal.com' && order_list && order_list.length) {
            let gtag_items = [];
            order_list.length > 0 && order_list.forEach((item, index) => {
                let discount_price = Number(item.OLD_PRICE) - Number(item.PRICE);
                gtag_items.push({
                    item_id: item.SFI_CODE,
                    item_name: item.SFI_DESC,
                    affiliation: "sedarglobal.com",
                    // currency: this.ccy_code,
                    discount: discount_price ? discount_price : 0,
                    index: index,
                    item_brand: item.BRAND_DESC,
                    item_category: item.SPI_LINK_URL,
                    item_list_id: item.SPI_PR_ITEM_CODE,
                    item_list_name: item.SPI_DESC_EN,
                    item_variant: item.SFI_COLLECTION_DESC,
                    price: Number(item.PRICE),
                    quantity: 1
                });

            });

            if (order_list.length > 0) {
                ttq.track("view_item_list", {
                    item_list_id: order_list && order_list[0] ? order_list[0]['SPI_PR_ITEM_CODE'] : '',
                    item_list_name: order_list && order_list[0] ? order_list[0]['item.SPI_DESC_EN'] : '',
                    contents: gtag_items
                });
            }
        }

    }
    selectItem(item) {

        if (site_url == 'www.sedarglobal.com' && item && item.PRICE && item.SFI_CODE) {

            let discount_price = Number(item.OLD_PRICE) - Number(item.PRICE);
            ttq.track("select_item", {
                item_list_id: item.SPI_PR_ITEM_CODE,
                item_list_name: item.SPI_DESC_EN,
                currency: this.ccy_code,
                contents: [
                    {
                        item_id: item.SFI_CODE,
                        item_name: item.SFI_DESC,
                        affiliation: "sedarglobal.com",
                        // currency: this.ccy_code,
                        discount: discount_price ? Number(discount_price) : 0,
                        index: 0,
                        item_brand: item.BRAND_DESC,
                        item_category: item.SPI_LINK_URL,
                        item_list_id: item.SPI_PR_ITEM_CODE,
                        item_list_name: item.SPI_DESC_EN,
                        item_variant: item.SFI_COLLECTION_DESC,
                        price: Number(item.PRICE),
                        quantity: 1
                    }
                ]
            });
            console.log('gtag...select_item', site_url);
        }

    }
    viewSingleItem(item) {

        if (site_url == 'www.sedarglobal.com' && item && item.PRICE && item.SFI_CODE) {
            let discount_price = Number(item.OLD_PRICE) - Number(item.PRICE);
            ttq.track("view_item", {
                currency: this.ccy_code,
                value: Number(item.PRICE),
                contents: [
                    {
                        item_id: item.SFI_CODE,
                        item_name: item.SFI_DESC,
                        affiliation: "sedarglobal.com",
                        // currency: this.ccy_code,
                        discount: discount_price ? Number(discount_price) : 0,
                        index: 0,
                        item_brand: item.BRAND_DESC,
                        item_category: item.SPI_LINK_URL,
                        item_list_id: item.SPI_PR_ITEM_CODE,
                        item_list_name: item.SPI_DESC_EN,
                        item_variant: item.SFI_COLLECTION_DESC,
                        price: Number(item.PRICE),
                        quantity: 1
                    }
                ]
            });
        }

    }
    addToCart(item, state = false) {
        if (site_url == 'www.sedarglobal.com' && item && item.PRICE && item.SFI_CODE) {
            let discount_price = Number(item.OLD_PRICE) - Number(item.PRICE);
            ttq.track("AddToCart", {
                currency: this.ccy_code,
                value: state && state.price_array ? Number(state.price_array.SOL_VALUE) : Number(item.PRICE),
                contents: [
                    {
                        card_type: 'Quick By',
                        item_id: item.SFI_CODE,
                        item_name: item.SFI_DESC,
                        affiliation: "sedarglobal.com",
                        //  currency: this.ccy_code,
                        discount: discount_price ? Number(discount_price) : 0,
                        index: 0,
                        item_brand: item.BRAND_DESC,
                        item_category: item.SPI_LINK_URL,
                        item_list_id: item.SPI_PR_ITEM_CODE,
                        item_list_name: item.SPI_DESC_EN,
                        item_variant: item.SFI_COLLECTION_DESC,
                        price: Number(item.PRICE),
                        quantity: state && state.product_info ? state.product_info.count : 1
                    }
                ]
            });
            console.log('TiktokAnalytics...', site_url, 'AddToCart');
        }
    }
    addToCartCustomizeGoogle(item) {
        if (site_url == 'www.sedarglobal.com' && item && item.steps) {

            ttq.track("AddToCart", {
                currency: this.ccy_code,
                value: item.price_array ? Number(item.price_array.SOL_VALUE) : 0,
                contents: [
                    {
                        card_type: 'Customize',
                        item_id: item.steps['MATERIAL_SELECTION'] && item.steps['MATERIAL_SELECTION']['material_info'] ? item.steps['MATERIAL_SELECTION']['material_info']['SII_CODE'] : '',
                        item_name: item.steps['MATERIAL_SELECTION'] && item.steps['MATERIAL_SELECTION']['material_info'] ? item.steps['MATERIAL_SELECTION']['material_info']['SII_ITEM_ID'] : '',
                        affiliation: "sedarglobal.com",
                        // currency: this.ccy_code,
                        index: 0,
                        item_brand: item.steps['MATERIAL_SELECTION'] && item.steps['MATERIAL_SELECTION']['material_info'] ? item.steps['MATERIAL_SELECTION']['material_info']['SII_BR_DESC'] : '',
                        item_variant: item.steps['MATERIAL_SELECTION'] && item.steps['MATERIAL_SELECTION']['material_info'] ? item.steps['MATERIAL_SELECTION']['material_info']['SII_COLLECTION_CODE'] : '',
                        item_list_name: item.product_info ? item.product_info.SPI_DESC : '',
                        item_category: item.product_info ? item.product_info.SC_DESC : '',
                        price: item.price_array ? Number(item.price_array.SOL_VALUE) : 0,
                        quantity: item.product_info ? Number(item.product_info.count) : 1
                    }
                ]
            });
            console.log('TiktokAnalytics...', site_url, 'AddToCart11');
        }
    }
    viewCart(order_list, total_price) {
        if (site_url == 'www.sedarglobal.com' && order_list.length > 0) {
            let gtag_items = [];
            order_list.length > 0 && order_list.forEach((item, index) => {

                gtag_items.push({
                    item_id: item.brand_info && item.brand_info.SII_CODE ? item.brand_info.SII_CODE : '',
                    item_name: item.PRODUCT_DESC,
                    affiliation: "sedarglobal.com",
                    //currency: this.ccy_code,
                    index: index,
                    item_brand: item.brand_info && item.brand_info.SII_BR_DESC ? item.brand_info.SII_BR_DESC : '',
                    item_category: item.SPI_CATEGORY,
                    price: Number(item.SOL_VALUE),
                    quantity: Number(item.SOL_QTY),
                });

            })

            if (order_list.length > 0) {
                ttq.track("view_cart", {
                    currency: this.ccy_code,
                    value: Number(total_price.SOL_VALUE),
                    contents: gtag_items
                });
            }
        }

    }
    removeFromCart(item) {
        if (site_url == 'www.sedarglobal.com' && item && item.PRODUCT_DESC) {
            ttq.track("remove_from_cart", {
                currency: this.ccy_code,
                value: Number(item.SOL_VALUE),
                contents: [
                    {
                        item_id: item.brand_info && item.brand_info.SII_CODE ? item.brand_info.SII_CODE : '',
                        item_name: item.PRODUCT_DESC,
                        affiliation: "sedarglobal.com",
                        // currency: this.ccy_code,
                        index: 0,
                        item_brand: item.brand_info && item.brand_info.SII_BR_DESC ? item.brand_info.SII_BR_DESC : '',
                        item_category: item.SPI_CATEGORY,
                        price: Number(item.SOL_VALUE),
                        quantity: Number(item.SOL_QTY),
                    }
                ]
            });
        }

    }

    purchase(header_result, line_result, user_data) {

        if (site_url == 'www.sedarglobal.com' && line_result.length > 0) {
            let gtag_items = [];

            line_result.length > 0 && line_result.forEach((item, index) => {
                let discount_price = Number(item.SOL_OLD_PRICE) - Number(item.SOL_PRICE);

                gtag_items.push({
                    item_id: item.brand_info && item.brand_info.SII_CODE ? item.brand_info.SII_CODE : '',
                    item_name: item.PRODUCT_DESC,
                    affiliation: "sedarglobal.com",
                    coupon: header_result.SOH_PROMO_CODE,
                    // currency: this.ccy_code,
                    discount: discount_price ? Number(discount_price) : 0,
                    index: index,
                    item_brand: item.brand_info && item.brand_info.SII_BR_DESC ? item.brand_info.SII_BR_DESC : '',
                    item_category: item.SPI_CATEGORY,
                    price: Number(item.SOL_PRICE),
                    quantity: Number(item.SOL_QTY),
                });

            });

            ttq.track('Purchase', {
                contents: gtag_items,
                transaction_id: header_result.SOH_TXN_NO,
                affiliation: "sedarglobal.com",
                mobile: user_data && user_data.user_info && user_data.user_info.cust_mobile_no ? user_data.user_info.cust_mobile_no : '',
                email: user_data && user_data.user_info && user_data.user_info.cust_email_id ? user_data.user_info.cust_email_id : '',
                value: header_result.SOH_NET_VALUE ? Number(header_result.SOH_NET_VALUE) : 0,
                tax: header_result.SOH_TAX_VALUE ? Number(header_result.SOH_TAX_VALUE) : 0,
                shipping: header_result.SOH_SHIP_VALUE ? Number(header_result.SOH_SHIP_VALUE) : 0,
                currency: header_result.SOH_CCY_CODE,
                coupon: header_result.SOH_PROMO_CODE ? header_result.SOH_PROMO_CODE : ''
            })

            console.log('Purchase', gtag_items);

        }
    }
    beginCheckout(line_result, total_price) {


        if (site_url == 'www.sedarglobal.com' && line_result.length > 0) {
            // console.log(line_result, total_price, 'begin_checkout');
            let gtag_items = [];
            line_result.length > 0 && line_result.forEach((item, index) => {
                let discount_price = Number(item.SOL_OLD_PRICE) - Number(item.SOL_PRICE);

                gtag_items.push({
                    item_id: item.brand_info && item.brand_info.SII_CODE ? item.brand_info.SII_CODE : '',
                    item_name: item.PRODUCT_DESC,
                    affiliation: "sedarglobal.com",
                    // currency: this.ccy_code,
                    discount: discount_price ? Number(discount_price) : 0,
                    index: index,
                    item_brand: item.brand_info && item.brand_info.SII_BR_DESC ? item.brand_info.SII_BR_DESC : '',
                    item_category: item.SPI_CATEGORY,
                    price: Number(item.SOL_PRICE),
                    quantity: Number(item.SOL_QTY),
                });

            });

            ttq.track("begin_checkout", {
                currency: this.ccy_code,
                value: Number(total_price.SOL_VALUE),
                contents: gtag_items
            });

        }
        return true;
    }
    addShippingInfo(header_result, line_result) {

        if (site_url == 'www.sedarglobal.com' && line_result.length > 0) {
            let gtag_items = [];
            line_result.length > 0 && line_result.forEach((item, index) => {
                let discount_price = Number(item.SOL_OLD_PRICE) - Number(item.SOL_PRICE);

                gtag_items.push({
                    item_id: item.brand_info && item.brand_info.SII_CODE ? item.brand_info.SII_CODE : '',
                    item_name: item.PRODUCT_DESC,
                    affiliation: "sedarglobal.com",
                    coupon: header_result.SOH_PROMO_CODE,
                    //currency: this.ccy_code,
                    discount: discount_price ? Number(discount_price) : 0,
                    index: index,
                    item_brand: item.brand_info && item.brand_info.SII_BR_DESC ? item.brand_info.SII_BR_DESC : '',
                    item_category: item.SPI_CATEGORY,
                    price: Number(item.SOL_PRICE),
                    quantity: Number(item.SOL_QTY),
                });

            });

            ttq.track("add_shipping_info", {
                shipping_tier: "sedarglobal.com",
                value: Number(header_result.SOH_NET_VALUE),
                tax: header_result.SOH_TAX_VALUE ? Number(header_result.SOH_TAX_VALUE) : 0,
                shipping: header_result.SOH_SHIP_VALUE ? Number(header_result.SOH_SHIP_VALUE) : 0,
                currency: header_result.SOH_CCY_CODE,
                coupon: header_result.SOH_PROMO_CODE,
                contents: gtag_items
            });

        }
    }
    deliverInfo(header_result, line_result) {

        if (site_url == 'www.sedarglobal.com' && line_result.length > 0) {

            let gtag_items = [];
            line_result.length > 0 && line_result.forEach((item, index) => {

                let discount_price = Number(item.SOL_OLD_PRICE) - Number(item.SOL_PRICE);
                gtag_items.push({
                    item_id: item.brand_info && item.brand_info.SII_CODE ? item.brand_info.SII_CODE : '',
                    item_name: item.PRODUCT_DESC,
                    affiliation: "sedarglobal.com",
                    coupon: header_result.SOH_PROMO_CODE,
                    // currency: this.ccy_code,
                    discount: discount_price ? Number(discount_price) : 0,
                    index: index,
                    item_brand: item.brand_info && item.brand_info.SII_BR_DESC ? item.brand_info.SII_BR_DESC : '',
                    item_category: item.SPI_CATEGORY,
                    price: Number(item.SOL_PRICE),
                    quantity: Number(item.SOL_QTY),
                });

            });

            ttq.track("delivery_info", {
                shipping_tier: header_result.SOH_CARRIER_CODE == 'DO03' ? 'Click & Collect' : "Delivery",
                value: Number(header_result.SOH_NET_VALUE),
                tax: header_result.SOH_TAX_VALUE ? Number(header_result.SOH_TAX_VALUE) : 0,
                shipping: header_result.SOH_SHIP_VALUE ? Number(header_result.SOH_SHIP_VALUE) : 0,
                currency: header_result.SOH_CCY_CODE,
                coupon: header_result.SOH_PROMO_CODE,
                contents: gtag_items
            });

        }
    }

    addPaymentInfo(header_result, line_result, payment_type) {

        if (site_url == 'www.sedarglobal.com' && line_result && line_result.length > 0) {

            let gtag_items = [];
            line_result.length > 0 && line_result.forEach((item, index) => {

                let discount_price = Number(item.SOL_OLD_PRICE) - Number(item.SOL_PRICE);
                gtag_items.push({
                    item_id: item.brand_info && item.brand_info.SII_CODE ? item.brand_info.SII_CODE : '',
                    item_name: item.PRODUCT_DESC,
                    affiliation: "sedarglobal.com",
                    coupon: header_result.SOH_PROMO_CODE,
                    // currency: this.ccy_code,
                    discount: discount_price ? Number(discount_price) : 0,
                    index: index,
                    item_brand: item.brand_info && item.brand_info.SII_BR_DESC ? item.brand_info.SII_BR_DESC : '',
                    item_category: item.SPI_CATEGORY,
                    price: Number(item.SOL_PRICE),
                    quantity: Number(item.SOL_QTY),
                });

            });

            ttq.track("add_payment_info", {
                payment_type: payment_type,
                value: Number(header_result.SOH_NET_VALUE),
                tax: header_result.SOH_TAX_VALUE ? Number(header_result.SOH_TAX_VALUE) : 0,
                shipping: header_result.SOH_SHIP_VALUE ? Number(header_result.SOH_SHIP_VALUE) : 0,
                currency: header_result.SOH_CCY_CODE,
                coupon: header_result.SOH_PROMO_CODE,
                contents: gtag_items
            });

        }
    }

}

export default new TiktokAnalytics();
