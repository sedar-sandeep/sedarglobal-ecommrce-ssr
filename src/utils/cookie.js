import Cookies from 'js-cookie';
import shortid from 'shortid';

export const getDefaultLocalePath = async () => {
  const defaultLocalPath = await Cookies.get('defaultLocalPath');
  if (defaultLocalPath) {
    const defaultLocalPathData = defaultLocalPath;
    return defaultLocalPathData;
  }

  return null;
};

export const getCountry = async () => {
  const country = await Cookies.get('country');

  if (country) {
    const countryData = country;
    return countryData;
  }

  return null;
};

export const getLanguage = async () => {
  const language = await Cookies.get('i18next');

  if (language) {
    const languageData = language;
    return languageData;
  }

  return null;
};

export const getCNISO = async () => {
  const CNISO = await Cookies.get('cn_iso');

  if (CNISO) {
    const CNISOData = JSON.parse(CNISO);
    return CNISOData;
  }

  return null;
};

export const getCCYCode = async () => {
  const CCYCode = await Cookies.get('siteDetail');

  if (CCYCode) {
    const CCYCodeData = CCYCode?.show_ccy_code;
    return CCYCodeData;
  }

  return null;
};

export const getCCYDecimals = async () => {
  const CCYDecimals = await Cookies.get('siteDetail');

  if (CCYDecimals) {
    const CCYDecimalsData = CCYDecimals?.decimals;
    return CCYDecimalsData;
  }

  return null;
};

export const getDetectCountry = async () => {
  const detectCountry = await Cookies.get('GEOLOCATION');

  if (detectCountry) {
    const detectCountryData = JSON.parse(detectCountry)?.country_code;
    return detectCountryData;
  }

  return null;
};

export const getVisitorID = async () => {
  let genrateVistId = shortid.generate(Date());
  let expiresTime = 24 * 60 * 60;
  let visitor = Cookies.get('visitorId');

  if (visitor == undefined) {
    Cookies.set('visitorId', genrateVistId, { expires: expiresTime });
    visitor = genrateVistId;
  }

  const visitorID = await Cookies.get('visitorId');

  if (visitorID) {
    const visitorIDData = visitorID;
    return visitorIDData;
  }

  return null;
};

export const setSiteDetails = async (siteDetail) => {
  Cookies.set('siteDetail', JSON.stringify(siteDetail));
};

export const getSiteDetail = async () => {
  const siteDetail = await Cookies.get('siteDetail');
  if (siteDetail && siteDetail != undefined && siteDetail != 'undefined') {
    const siteDetailData = JSON.parse(siteDetail);
    return siteDetailData;
  }

  return null;
};

export const getUserID = async () => {
  const userID = await Cookies.get('USER_ID');

  if (userID) {
    const userIDData = userID;
    return userIDData;
  }

  return null;
};

export const getGeoLocation = async () => {
  const geoLocation = await Cookies.get('GEOLOCATION');

  if (geoLocation) {
    const geoLocationData = JSON.parse(geoLocation);
    return geoLocationData;
  }

  return null;
};