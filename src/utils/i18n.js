import Cookies from 'js-cookie';
import shortid from 'shortid';
import { countries_url_path, countries } from './countriesData';

let genrateVistId = shortid.generate(Date());
if (Cookies.get('visitorId') == undefined) {
    Cookies.set('visitorId', genrateVistId, { expires: 365 });
}
let visitor_id = Cookies.get('visitorId') || "";


const geolocation = Cookies.get('GEOLOCATION');

let url_path = typeof window !== "undefined" && window.location && window.location.pathname ? window.location.pathname.split('/')[1] : false;

let country_info = countries_url_path[url_path && url_path.toLocaleLowerCase()] ? countries_url_path[url_path && url_path.toLocaleLowerCase()] : undefined;

let defaultLocale_path = "global-en";
let country_name = '';
let lang_name = 'en';
let ref_cn_iso = '';

if (country_info && country_info.code) {
    defaultLocale_path = url_path;
    country_name = country_info.code;
    lang_name = country_info.lang;
    ref_cn_iso = country_info.country_code;
} else if (Cookies.get('country')) {
    defaultLocale_path = Cookies.get('country') || 'global' + '-' + Cookies.get('i18next') || 'en';
    if (Cookies.get('country') == 'ksa') {
        defaultLocale_path = Cookies.get('country') || 'global' + '-' + Cookies.get('i18next') || 'ar';
    }

    country_name = Cookies.get('country');
    lang_name = Cookies.get('i18next');
    ref_cn_iso = Cookies.get('cn_iso');
}

let getccy_code = Cookies.get('siteDetail') ? Cookies.get('siteDetail') : '';

export const defaultLocale = defaultLocale_path
export const countryName = country_name || "global";
export const langName = lang_name || "en";
export const cn_iso = ref_cn_iso;
export const ccy_code = getccy_code != 'undefined' && getccy_code && JSON.parse(getccy_code) != null && JSON.parse(getccy_code).show_ccy_code ? JSON.parse(getccy_code).show_ccy_code : '';
export const ccy_decimals = getccy_code != 'undefined' && getccy_code && JSON.parse(getccy_code) != null && JSON.parse(getccy_code).decimals ? JSON.parse(getccy_code).decimals : 0;
export const detect_country = geolocation != 'undefined' && geolocation && JSON.parse(geolocation) != null && JSON.parse(geolocation).country_code ? JSON.parse(geolocation).country_code : '';

export const visitorId = visitor_id;
export const siteDetail = Cookies.get('siteDetail');
export const userId = Cookies.get('USER_ID') == undefined ? '0' : Cookies.get('USER_ID');


export const onError = (e) => {
    e.target.src = `/assets/images/not-available.png`;
};

