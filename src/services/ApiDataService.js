// import { countryName, langName, visitorId, cn_iso } from '../i18n';
import http from "../services/http-common";
import { cn_iso, countryName, detect_country, langName, visitorId } from "@utils/i18n";
import axiosInstance from "@utils/axios";
import Cookies from "js-cookie";

const site_id = process.env.NEXT_PUBLIC_SITE_ID; //100001;
const qs = require('qs');

class ApiDataService {

  constructor() {

    this.site = Cookies.get('siteDetail') ? Cookies.get('siteDetail') : 'undefined';
    this.geolocation = Cookies.get('GEOLOCATION') || "undefined";

    this.decimals = this.site != 'undefined' && this.site && JSON.parse(this.site) != null && JSON.parse(this.site).decimals > 0 ? JSON.parse(this.site).decimals : 0;
    this.ccy_code = this.site != 'undefined' && this.site && JSON.parse(this.site) != null && JSON.parse(this.site).show_ccy_code ? JSON.parse(this.site).show_ccy_code : '';
    this.cn_iso = cn_iso ? cn_iso : '';

    this.detect_country = this.geolocation != 'undefined' && JSON.parse(this.geolocation) != null && JSON.parse(this.geolocation).country_code ? JSON.parse(this.geolocation).country_code : '';

    this.config = {
      site: site_id, lang: langName, country: countryName, visitorId: visitorId, currency: this.ccy_code, ccy_decimal: this.decimals, cn_iso: this.cn_iso, detect_country: this.detect_country
    };

  }

  getAll(path, param = '') {
    // const cn_iso = Cookies.get('cn_iso') || "XX";
    const country = countryName;//Cookies.get('country') || "global";
    const userId = param.userId && param.userId != undefined ? param.userId : Cookies.get('USER_ID') == undefined ? '0' : Cookies.get('USER_ID');

    let path_url = path + '?lang=' + langName + '&site=' + site_id + '&country=' + country + '&visitorId=' + visitorId + '&userId=' + userId + '&currency=' + this.ccy_code + '&ccy_decimal=' + this.decimals + '&cn_iso=' + cn_iso + '&detect_country=' + this.detect_country;
    if (param != '') {
      path_url = path + '?lang=' + langName + '&site=' + site_id + '&country=' + country + '&visitorId=' + visitorId + '&userId=' + userId + '&currency=' + this.ccy_code + '&ccy_decimal=' + this.decimals + '&cn_iso=' + cn_iso + '&detect_country=' + this.detect_country + '&' + qs.stringify(param);
    }
    return axiosInstance.get(path_url);
  }

  getwithSlug(path, param = '') {
    const country = countryName;//Cookies.get('country') || "global";
    const userId = param.userId && param.userId != undefined ? param.userId : Cookies.get('USER_ID') == undefined ? '0' : Cookies.get('USER_ID');

    let path_url = path + '&lang=' + langName + '&site=' + site_id + '&country=' + country + '&visitorId=' + visitorId + '&userId=' + userId + '&currency=' + this.ccy_code + '&ccy_decimal=' + this.decimals + '&cn_iso=' + this.cn_iso + '&detect_country=' + this.detect_country;
    if (param != '') {
      path_url = path + '&lang=' + langName + '&site=' + site_id + '&country=' + country + '&visitorId=' + visitorId + '&userId=' + userId + '&currency=' + this.ccy_code + '&ccy_decimal=' + this.decimals + '&cn_iso=' + this.cn_iso + '&detect_country=' + this.detect_country + '&' + qs.stringify(param);
    }
    return http.get(path_url);
  }

  get(path, id) {
    return http.get(`${path}${id}`);
  }
  post(path, data) {
    let client_ip = Cookies.get('client_ip');
    let front_url = '';

    let userId = data.userId ? data.userId : Cookies.get('USER_ID');
    userId = userId == undefined ? 0 : userId
    if (typeof window !== "undefined" && window && window.location && window.location.href) {
      front_url = window.location.href;
    }

    let param = { ...data, ...this.config, 'userId': userId, 'client_ip': client_ip, front_url: front_url };
    return http.post(path, qs.stringify(param));
  }

  create(path, data) {
    const userId = Cookies.get('USER_ID') == undefined ? '0' : Cookies.get('USER_ID');
    let param = { ...data, ...this.config, 'userId': userId, };
    return http.post(path, qs.stringify(param));
  }

  update(path, id, data) {
    const userId = Cookies.get('USER_ID') == undefined ? '0' : Cookies.get('USER_ID');
    let param = { ...data, ...this.config, 'userId': userId, };
    return http.put(`${path}${id}`, qs.stringify(param));
  }

  delete(path, param = '') {
    const userId = Cookies.get('USER_ID') == undefined ? '0' : Cookies.get('USER_ID');
    let country = Cookies.get('country') || "global"
    let path_url = path + '?lang=' + langName + '&site=' + site_id + '&country=' + country + '&visitorId=' + visitorId + '&userId=' + userId + '&currency=' + this.ccy_code + '&ccy_decimal=' + this.decimals + '&cn_iso=' + this.cn_iso;
    if (param != '') {
      path_url = path + '?lang=' + langName + '&site=' + site_id + '&country=' + country + '&visitorId=' + visitorId + '&userId=' + userId + '&currency=' + this.ccy_code + '&ccy_decimal=' + this.decimals + '&cn_iso=' + this.cn_iso + '&' + qs.stringify(param);
    }
    console.log(path_url, 'path_url');
    // let data = { 'lang': langName, 'site': site_id, 'country': countryName };
    return http.delete(`${path_url}`);
  }

  deleteAll(path) {
    return http.delete(`${path}`);
  }

  findByTitle(path, title) {
    return http.get(`${path}?title=${title}`);
  }
}

export default new ApiDataService();
