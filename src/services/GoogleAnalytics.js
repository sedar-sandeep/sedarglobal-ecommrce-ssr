import { cn_iso } from '@utils/i18n';
import Cookies from 'js-cookie';
const site_url = 'www.sedarglobal.com';//process.env.NEXT_PUBLIC_SITE_URL; 

class GoogleAnalytics {

    constructor() {
        const site = Cookies.get('siteDetail') || "undefined";
        this.ccy_code = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_ccy_code ? JSON.parse(site).show_ccy_code : 'AED';
        this.CN_ISO = cn_iso;
        if (typeof gtag == "undefined") {
            // safe to use the function
            console.log('gtag...', site_url);
            return false;
        }
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
                gtag("event", "view_item_list", {
                    item_list_id: order_list && order_list[0] ? order_list[0]['SPI_PR_ITEM_CODE'] : '',
                    item_list_name: order_list && order_list[0] ? order_list[0]['item.SPI_DESC_EN'] : '',
                    items: gtag_items
                });


                fbq("track", "view_item_list", {
                    item_list_id: order_list && order_list[0] ? order_list[0]['SPI_PR_ITEM_CODE'] : '',
                    item_list_name: order_list && order_list[0] ? order_list[0]['item.SPI_DESC_EN'] : '',
                    items: gtag_items
                });
            }
        }
    }
    selectItem(item) {

        if (site_url == 'www.sedarglobal.com' && item && item.PRICE && item.SFI_CODE) {

            let discount_price = Number(item.OLD_PRICE) - Number(item.PRICE);
            gtag("event", "select_item", {
                item_list_id: item.SPI_PR_ITEM_CODE,
                item_list_name: item.SPI_DESC_EN,
                currency: this.ccy_code,
                items: [
                    {
                        item_id: item.SFI_CODE,
                        item_name: item.SFI_DESC,
                        affiliation: "sedarglobal.com",
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


            fbq("track", "select_item", {
                item_list_id: item.SPI_PR_ITEM_CODE,
                item_list_name: item.SPI_DESC_EN,
                currency: this.ccy_code,
                items: [
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
    viewSingleItem(item) {

        if (site_url == 'www.sedarglobal.com' && item && item.PRICE && item.SFI_CODE) {
            let discount_price = Number(item.OLD_PRICE) - Number(item.PRICE);
            gtag("event", "view_item", {
                currency: this.ccy_code,
                value: Number(item.PRICE),
                items: [
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


            fbq("track", "view_item", {
                currency: this.ccy_code,
                value: Number(item.PRICE),
                items: [
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
            gtag("event", "add_to_cart", {
                currency: this.ccy_code,
                value: state && state.price_array ? Number(state.price_array.SOL_VALUE) : Number(item.PRICE),
                items: [
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

            fbq("track", "add_to_cart", {
                currency: this.ccy_code,
                value: state && state.price_array ? Number(state.price_array.SOL_VALUE) : Number(item.PRICE),
                items: [
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
        }
    }
    addToCartCustomizeGoogle(item) {
        if (site_url == 'www.sedarglobal.com' && item && item.steps) {

            gtag("event", "add_to_cart", {
                currency: this.ccy_code,
                value: item.price_array ? Number(item.price_array.SOL_VALUE) : 0,
                items: [
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
                        price: item.price_array ? Number(item.price_array.SOL_PRICE) : 0,
                        quantity: item.product_info ? Number(item.product_info.count) : 1
                    }
                ]
            });

            fbq("track", "add_to_cart", {
                currency: this.ccy_code,
                value: item.price_array ? Number(item.price_array.SOL_VALUE) : 0,
                items: [
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
                        price: item.price_array ? Number(item.price_array.SOL_PRICE) : 0,
                        quantity: item.product_info ? Number(item.product_info.count) : 1
                    }
                ]
            });
        }
    }
    viewCart(order_list, total_price) {
        if (site_url == 'www.sedarglobal.com' && order_list.length > 0) {
            let gtag_items = [];
            order_list.length > 0 && order_list.forEach((item, index) => {

                let discount_price = Number(item.SOL_OLD_PRICE) - Number(item.SOL_PRICE);

                gtag_items.push({
                    item_id: item.brand_info && item.brand_info.SII_CODE ? item.brand_info.SII_CODE : '',
                    item_name: item.PRODUCT_DESC,
                    affiliation: "sedarglobal.com",
                    discount: discount_price ? Number(discount_price) : 0,
                    index: index,
                    item_brand: item.brand_info && item.brand_info.SII_BR_DESC ? item.brand_info.SII_BR_DESC : '',
                    item_category: item.SPI_CATEGORY,
                    price: Number(item.SOL_PRICE),
                    quantity: Number(item.SOL_QTY),
                });

            })

            if (order_list.length > 0) {
                gtag("event", "view_cart", {
                    currency: this.ccy_code,
                    value: Number(total_price.SOL_VALUE),
                    items: gtag_items
                });

                fbq("track", "view_cart", {
                    currency: this.ccy_code,
                    value: Number(total_price.SOL_VALUE),
                    items: gtag_items
                });
            }
        }
    }
    removeFromCart(item) {
        if (site_url == 'www.sedarglobal.com' && item && item.PRODUCT_DESC) {
            let discount_price = Number(item.SOL_OLD_PRICE) - Number(item.SOL_PRICE);
            gtag("event", "remove_from_cart", {
                currency: this.ccy_code,
                value: Number(item.SOL_VALUE),
                items: [
                    {
                        item_id: item.brand_info && item.brand_info.SII_CODE ? item.brand_info.SII_CODE : '',
                        item_name: item.PRODUCT_DESC,
                        affiliation: "sedarglobal.com",
                        discount: discount_price ? Number(discount_price) : 0,
                        index: 0,
                        item_brand: item.brand_info && item.brand_info.SII_BR_DESC ? item.brand_info.SII_BR_DESC : '',
                        item_category: item.SPI_CATEGORY,
                        price: Number(item.SOL_PRICE),
                        quantity: Number(item.SOL_QTY),
                    }
                ]
            });


            fbq("track", "remove_from_cart", {
                currency: this.ccy_code,
                value: Number(item.SOL_VALUE),
                items: [
                    {
                        item_id: item.brand_info && item.brand_info.SII_CODE ? item.brand_info.SII_CODE : '',
                        item_name: item.PRODUCT_DESC,
                        affiliation: "sedarglobal.com",
                        discount: discount_price ? Number(discount_price) : 0,
                        index: 0,
                        item_brand: item.brand_info && item.brand_info.SII_BR_DESC ? item.brand_info.SII_BR_DESC : '',
                        item_category: item.SPI_CATEGORY,
                        price: Number(item.SOL_PRICE),
                        quantity: Number(item.SOL_QTY),
                    }
                ]
            });
        }
    }

    purchase(header_result, line_result, user_data) {

        console.log(header_result, line_result, user_data, 'dataLayer', site_url);

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
            let cart_val = header_result.SOH_NET_VALUE ? Number(header_result.SOH_NET_VALUE) : 0;
            let tax_info = this.textCalculation(cart_val);


            dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
            dataLayer.push({
                event: "purchase",
                ecommerce: {
                    transaction_id: header_result.SOH_TXN_NO,
                    affiliation: "sedarglobal.com",
                    mobile: user_data && user_data.user_info && user_data.user_info.cust_mobile_no ? user_data.user_info.cust_mobile_no : '',
                    email: user_data && user_data.user_info && user_data.user_info.cust_email_id ? user_data.user_info.cust_email_id : '',
                    value: tax_info && tax_info.priceExcludingTax ? Number(tax_info.priceExcludingTax) : 0,
                    tax: tax_info && tax_info.taxAmount ? Number(tax_info.taxAmount) : 0,
                    shipping: header_result.SOH_SHIP_VALUE ? Number(header_result.SOH_SHIP_VALUE) : 0,
                    currency: header_result.SOH_CCY_CODE,
                    coupon: header_result.SOH_PROMO_CODE ? header_result.SOH_PROMO_CODE : '',
                    items: gtag_items
                }
            });

            //console.log(dataLayer, 'dataLayer');

            fbq('track', 'Purchase', {
                transaction_id: header_result.SOH_TXN_NO,
                affiliation: "sedarglobal.com",
                mobile: user_data && user_data.user_info && user_data.user_info.cust_mobile_no ? user_data.user_info.cust_mobile_no : '',
                email: user_data && user_data.user_info && user_data.user_info.cust_email_id ? user_data.user_info.cust_email_id : '',
                value: tax_info && tax_info.priceExcludingTax ? Number(tax_info.priceExcludingTax) : 0,
                tax: tax_info && tax_info.taxAmount ? Number(tax_info.taxAmount) : 0,
                shipping: header_result.SOH_SHIP_VALUE ? Number(header_result.SOH_SHIP_VALUE) : 0,
                currency: header_result.SOH_CCY_CODE,
                coupon: header_result.SOH_PROMO_CODE ? header_result.SOH_PROMO_CODE : '',
                items: gtag_items
            });

            // console.log(fbq, 'dataLayer111');
        }
    }
    beginCheckout(line_result, total_price) {


        if (site_url == 'www.sedarglobal.com' && line_result.length > 0) {
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

            gtag("event", "begin_checkout", {
                currency: this.ccy_code,
                value: Number(total_price.SOL_VALUE),
                items: gtag_items
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
                    discount: discount_price ? Number(discount_price) : 0,
                    index: index,
                    item_brand: item.brand_info && item.brand_info.SII_BR_DESC ? item.brand_info.SII_BR_DESC : '',
                    item_category: item.SPI_CATEGORY,
                    price: Number(item.SOL_PRICE),
                    quantity: Number(item.SOL_QTY),
                });

            });
            let cart_val = header_result.SOH_NET_VALUE ? Number(header_result.SOH_NET_VALUE) : 0;
            let tax_info = this.textCalculation(cart_val);

            gtag("event", "add_shipping_info", {
                shipping_tier: "sedarglobal.com",
                value: tax_info && tax_info.priceExcludingTax ? Number(tax_info.priceExcludingTax) : 0,
                tax: tax_info && tax_info.taxAmount ? Number(tax_info.taxAmount) : 0,
                shipping: header_result.SOH_SHIP_VALUE ? Number(header_result.SOH_SHIP_VALUE) : 0,
                currency: header_result.SOH_CCY_CODE,
                coupon: header_result.SOH_PROMO_CODE,
                items: gtag_items
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

            let cart_val = header_result.SOH_NET_VALUE ? Number(header_result.SOH_NET_VALUE) : 0;
            let tax_info = this.textCalculation(cart_val);

            gtag("event", "delivery_info", {
                shipping_tier: header_result.SOH_CARRIER_CODE == 'DO03' ? 'Click & Collect' : "Delivery",
                value: tax_info && tax_info.priceExcludingTax ? Number(tax_info.priceExcludingTax) : 0,
                tax: tax_info && tax_info.taxAmount ? Number(tax_info.taxAmount) : 0,
                shipping: header_result.SOH_SHIP_VALUE ? Number(header_result.SOH_SHIP_VALUE) : 0,
                currency: header_result.SOH_CCY_CODE,
                coupon: header_result.SOH_PROMO_CODE,
                items: gtag_items
            });


            fbq("track", "delivery_info", {
                shipping_tier: header_result.SOH_CARRIER_CODE == 'DO03' ? 'Click & Collect' : "Delivery",
                value: tax_info && tax_info.priceExcludingTax ? Number(tax_info.priceExcludingTax) : 0,
                tax: tax_info && tax_info.taxAmount ? Number(tax_info.taxAmount) : 0,
                shipping: header_result.SOH_SHIP_VALUE ? Number(header_result.SOH_SHIP_VALUE) : 0,
                currency: header_result.SOH_CCY_CODE,
                coupon: header_result.SOH_PROMO_CODE,
                items: gtag_items
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

            let cart_val = header_result.SOH_NET_VALUE ? Number(header_result.SOH_NET_VALUE) : 0;
            let tax_info = this.textCalculation(cart_val);

            gtag("event", "add_payment_info", {
                payment_type: payment_type,
                value: tax_info && tax_info.priceExcludingTax ? Number(tax_info.priceExcludingTax) : 0,
                tax: tax_info && tax_info.taxAmount ? Number(tax_info.taxAmount) : 0,
                shipping: header_result.SOH_SHIP_VALUE ? Number(header_result.SOH_SHIP_VALUE) : 0,
                currency: header_result.SOH_CCY_CODE,
                coupon: header_result.SOH_PROMO_CODE,
                items: gtag_items
            });


            fbq("track", "add_payment_info", {
                payment_type: payment_type,
                value: tax_info && tax_info.priceExcludingTax ? Number(tax_info.priceExcludingTax) : 0,
                tax: tax_info && tax_info.taxAmount ? Number(tax_info.taxAmount) : 0,
                shipping: header_result.SOH_SHIP_VALUE ? Number(header_result.SOH_SHIP_VALUE) : 0,
                currency: header_result.SOH_CCY_CODE,
                coupon: header_result.SOH_PROMO_CODE,
                items: gtag_items
            });

        }
    }

    textCalculation(totalPrice) {

        let site_info = Cookies.get('siteDetail') || "undefined";
        let taxRate = site_info != 'undefined' && site_info && JSON.parse(site_info) != null && JSON.parse(site_info).SCN_TAX_PRCT ? Number(JSON.parse(site_info).SCN_TAX_PRCT) : 0;
        console.log(site_info, 'TaxAmount11', taxRate);

        let taxRate_per = taxRate / 100;
        // Calculate price excluding tax
        let priceExcludingTax = totalPrice / (1 + taxRate_per);
        // Calculate tax amount
        let taxAmount = totalPrice - priceExcludingTax;

        console.log("TaxAmount: " + taxAmount.toFixed(2), priceExcludingTax.toFixed(2)); // 18.29

        return { taxAmount: taxAmount.toFixed(2), priceExcludingTax: priceExcludingTax.toFixed(2) };

    }


    enquiryFBQ(txn_no, con_type, data) {

        if (site_url == 'www.sedarglobal.com' && con_type && txn_no) {

            fbq("track", con_type, {
                txn_no: txn_no,
                enquiry_name: con_type,
                ...data
            });
        }
    }
}

export default new GoogleAnalytics();