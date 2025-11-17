// ...existing code...
import Cookies from 'js-cookie';
import store from "store-js";

// ==========================
// BASIC CONFIG
// ==========================
const site = Cookies.get('siteDetail');
const ccy_code = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_ccy_code
    ? JSON.parse(site).show_ccy_code
    : 'AED';

const user_email = Cookies.get('USER_EMAIL') == undefined ? '' : Cookies.get('USER_EMAIL');

const cookie_name = 'deduplication_cookie';
const days_to_store = 90;
const deduplication_cookie_value = 'admitad';
const channel_name = 'utm_source';

if (typeof window !== "undefined") {
    window.orderedItem = window.orderedItem || []; // temporary array for product items for Admitad
}

// ==========================
// UTM SOURCE HANDLING
// ==========================
let searchParams = null;
let utm_source_url = null;

if (typeof window !== "undefined") {
    searchParams = new URLSearchParams(window.location.search);
    utm_source_url = store.get('utm_source_url');
    if (searchParams && searchParams.get('utm_source') && searchParams.get('tagtag_uid')) {
        utm_source_url = 'utm_source=admitad&tagtag_uid=' + searchParams.get('tagtag_uid');
        store.set('utm_source_url', utm_source_url);
        store.set('tagtag_uid', searchParams.get('tagtag_uid'));
    }
}

// ==========================
// MAIN FUNCTIONS
// ==========================
const AdmitadIndex = () => {
    // console.log('AdmitadIndex initialized');
};

// Get "utm_source" parameter value from URL
const getSourceParamFromUri = function () {
    if (typeof window !== "undefined") {
        const pattern = channel_name + '=([^&]+)';
        const re = new RegExp(pattern);
        return (re.exec(window.location.search) || [])[1] || '';
    }
    return '';
};

// Get current cookie value — accepts optional cookie name
const getSourceCookie = function (name = cookie_name) {
    if (typeof window !== "undefined") {
        const escName = name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1');
        const matches = document.cookie.match(
            new RegExp('(?:^|; )' + escName + '=([^;]*)')
        );
        return matches ? decodeURIComponent(matches[1]) : '';
    }
    return '';
};

// ✅ FIXED FUNCTION — No duplicate cookies
const setSourceCookie = function () {
    if (typeof window !== "undefined") {
        const param = getSourceParamFromUri();
        if (!param || param === 'undefined') return;

        const existing = getSourceCookie();
        if (existing === param) {
            console.log('Cookie already exists, skipping re-set.');
            return;
        }

        // Remove any old cookie for current hostname if possible
        try {
            document.cookie = `${cookie_name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; ${location.hostname ? 'domain=' + location.hostname + ';' : ''}`;
        } catch (e) {
            // ignore
        }

        // Expiry setup
        const expiresDate = new Date(Date.now() + days_to_store * 24 * 60 * 60 * 1000);

        // Set clean cookie (omit domain if not available)
        const domainPart = (typeof location !== "undefined" && location.hostname) ? `; domain=${location.hostname}` : '';
        const cookieString = `${cookie_name}=${param}; path=/; expires=${expiresDate.toUTCString()}; SameSite=Lax${domainPart}`;
        document.cookie = cookieString;

        console.log(`✅ Cookie set once: ${cookie_name}=${param}`);
    }
};

// Set cookie only when UTM source is present — run only in browser
if (typeof window !== "undefined") {
    setSourceCookie();
}

// ==========================
// ADMITAD INTEGRATION LOGIC
// ==========================
const admitadOrderedItem = (order_list, productID = 'Non_Product') => {
    if (typeof window !== "undefined") {
        const ADMITAD = window.ADMITAD || {};
        ADMITAD.Invoice = ADMITAD.Invoice || {};

        // define broker
        const source = getSourceCookie();
        if (!source) ADMITAD.Invoice.broker = 'na';
        else if (source !== deduplication_cookie_value) ADMITAD.Invoice.broker = source;
        else ADMITAD.Invoice.broker = 'adm';

        const cat = (order_list?.SOL_ITEM_LABEL === "SAMPLE" || order_list?.SOL_ITEM_LABEL === "Non_Product" || order_list?.SOL_ITEM_LABEL === undefined)
            ? '2'
            : '1';

        orderedItem.push({
            Product: {
                productID: order_list?.brand_info?.SII_ITEM_ID || productID,
                productName: order_list?.PRODUCT_DESC || 'Non_Product',
                category: cat,
                price: order_list?.SOL_VALUE || 0,
                priceCurrency: order_list?.SOL_CCY_CODE || ccy_code,
            },
            orderQuantity: order_list?.SOL_QTY || 1,
            additionalType: 'sale',
        });
        return true;
    }
};

// ...existing code...
const admitadInvoice = (order_info, email_id) => {
    if (typeof window !== "undefined") {
        const ADMITAD = window.ADMITAD || {};
        ADMITAD.Invoice = ADMITAD.Invoice || {};
        ADMITAD.Invoice.referencesOrder = ADMITAD.Invoice.referencesOrder || [];
        ADMITAD.Invoice.accountId = email_id || user_email;

        const source = getSourceCookie();
        if (!source) ADMITAD.Invoice.broker = 'na';
        else if (source !== deduplication_cookie_value) ADMITAD.Invoice.broker = source;
        else ADMITAD.Invoice.broker = 'adm';

        ADMITAD.Invoice.referencesOrder.push({
            orderNumber: order_info?.SOH_TXN_NO || '111111',
            discountCode: order_info?.SOH_PROMO_CODE || '',
            orderedItem: orderedItem,
        });

        console.log(orderedItem, 'orderedItem', ADMITAD.Invoice.referencesOrder);
        ADMITAD.Tracking?.processPositions?.();
        window.orderedItem = [];
        store.remove('utm_source_url');
    }
};

// ==========================
// RETAGGING FUNCTIONS
// ==========================
const ReTagHomePage = () => {
    if (typeof window !== "undefined") {
        window._retag = window._retag || [];
        window._retag.push({ code: "9ce8884e1c", level: 0 });
        (function () {
            const id = "admitad-retag";
            if (document.getElementById(id)) return;
            const s = document.createElement("script");
            s.async = true;
            s.id = id;
            const r = new Date().getDate();
            s.src = (document.location.protocol === "https:" ? "https:" : "http:") + "//cdn.lenmit.com/static/js/retag.js?r=" + r;
            const a = document.getElementsByTagName("script")[0];
            a.parentNode.insertBefore(s, a);
        })();
    }
};

const ReTagCategoryPage = (ad_category) => {
    if (typeof window !== "undefined") {
        window.ad_category = ad_category;
        window._retag = window._retag || [];
        window._retag.push({ code: "9ce8884cd8", level: 1 });
        (function () {
            const id = "admitad-retag";
            if (document.getElementById(id)) return;
            const s = document.createElement("script");
            s.async = true;
            s.id = id;
            const r = new Date().getDate();
            s.src = (document.location.protocol === "https:" ? "https:" : "http:") + "//cdn.lenmit.com/static/js/retag.js?r=" + r;
            const a = document.getElementsByTagName("script")[0];
            a.parentNode.insertBefore(s, a);
        })();
    }
};

const ReTagCartPage = (ad_products) => {
    if (typeof window !== "undefined") {
        window.ad_products = ad_products;
        window._retag = window._retag || [];
        window._retag.push({ code: "9ce8884cd8", level: 3 });
        (function () {
            const id = "admitad-retag";
            if (document.getElementById(id)) return;
            const s = document.createElement("script");
            s.async = true;
            s.id = id;
            const r = new Date().getDate();
            s.src = (document.location.protocol === "https:" ? "https:" : "http:") + "//cdn.lenmit.com/static/js/retag.js?r=" + r;
            const a = document.getElementsByTagName("script")[0];
            a.parentNode.insertBefore(s, a);
        })();
    }
};

const ReTagThankYouPage = (order_id, amount, ad_products) => {
    if (typeof window !== "undefined") {
        window.ad_order = order_id;
        window.ad_amount = amount;
        window.ad_products = ad_products;

        window._retag = window._retag || [];
        window._retag.push({ code: "9ce8884cdb", level: 4 });
        (function () {
            const id = "admitad-retag";
            if (document.getElementById(id)) return;
            const s = document.createElement("script");
            s.async = true;
            s.id = id;
            const r = new Date().getDate();
            s.src = (document.location.protocol === "https:" ? "https:" : "http:") + "//cdn.lenmit.com/static/js/retag.js?r=" + r;
            const a = document.getElementsByTagName("script")[0];
            a.parentNode.insertBefore(s, a);
        })();
    }
};

// ==========================
// DEBUGGING / EXPORTS
// ==========================
if (typeof window !== "undefined") {
    const aa = getSourceCookie('admitad_uid');
    console.log('getSourceCookie', cookie_name, aa, getSourceCookie(), store.get('tagtag_uid'));
}

export const admitad_utm_source_url = () => utm_source_url;
export default AdmitadIndex;

export {
    admitadOrderedItem,
    admitadInvoice,
    ReTagHomePage,
    ReTagCategoryPage,
    ReTagCartPage,
    ReTagThankYouPage,
    getSourceCookie
};
// ...existing code...