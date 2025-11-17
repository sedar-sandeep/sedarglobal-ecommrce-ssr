import { NextResponse } from 'next/server';
import { countries, defaultCountryPath } from '@utils/countriesData';
import { eng, geo, global, globalen } from '@utils/constant';
const PUBLIC_FILE = /\.(.*)$/;
const dev_server = ['localhost:3001', '132.1.0.105:3001'];

export const middleware = async (request) => {
  const { nextUrl, headers } = request;
  const { locale, pathname } = nextUrl;
  const url = nextUrl.clone();

  const cfIp = request.headers.get("cf-connecting-ip");
  let ip = cfIp ?? '217.165.59.84';
  console.log(cfIp, ip, 'cfIp');
  // console.log('Headers from request:');
  // for (const [key, value] of headers.entries()) {
  //   console.log(`${key}: ${value}`);
  // }
  // const raw = request.headers.get('cf-connecting-ip');
  // const forwardedIp = raw?.split(',')[0]?.trim();
  // let ip = request.ip ?? forwardedIp ?? '217.165.59.84';

  // let ip = (headers.get('True-Client-IP') && headers.get('True-Client-IP').split(',')[0]) || '217.165.59.84';
  if (dev_server.indexOf(headers.get('host')) >= 0) {
    ip = '217.165.59.84';
  }
  try {
    if (pathname.startsWith('/_next') || pathname.includes('/api/') || PUBLIC_FILE.test(pathname)) {
      return;
    }
    const getLang = locale && locale.split('-')[1] ? locale.split('-')[1] : eng;

    const response = NextResponse.next();
    const firstGeoData = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}geolocation?geo=&client_ip=${ip}&locale=${locale}`))
      .json().
      catch(async (error) => {
        console.log('site Data first fetch error', error);
      });


    let cnisos = (firstGeoData?.site_details[0]?.primary_ref_cn_iso && firstGeoData?.site_details[0]?.primary_ref_cn_iso) || geo;
    let sedar_geo = (firstGeoData?.countryCode && firstGeoData?.countryCode) || geo;
    let country_info = countries[cnisos] ? countries[cnisos].country_code : geo;

    let langName = locale?.split('-')[1] ? locale?.split('-')[1] : eng;
    let CountryName = global;

    if (locale == 'default') {
      CountryName = countries[cnisos]?.code || global;
    } else {
      CountryName = locale?.split('-')[0] || globalen;
    }


    let CNISO = countries[cnisos]?.country_code || geo;

    const setSiteDetailCookie = JSON.stringify(firstGeoData?.site_details[0] && firstGeoData?.site_details[0]) || 'undefined';
    const setCCYDECIMALSCookie = (firstGeoData?.site_details[0] && firstGeoData?.site_details[0]?.decimals) || 'undefined';
    const setCCYCODECookie = (firstGeoData?.site_details[0] && firstGeoData?.site_details[0]?.show_ccy_code) || 'undefined';

    const geoName = `${defaultCountryPath[sedar_geo]?.url || global}-${getLang}`;

    response.cookies.set('sedar_geo', sedar_geo, {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_ONE_WEEK,
    });

    response.cookies.set('siteDetail', setSiteDetailCookie, {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
      path: '/' + locale
    });
    response.cookies.set('CCYDECIMALS', setCCYDECIMALSCookie, {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
      path: '/' + locale
    });
    response.cookies.set('CCYCODE', setCCYCODECookie, {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
      path: '/' + locale
    });
    response.cookies.set('i18next', langName, {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_ONE_WEEK,
      path: '/' + locale
    });
    response.cookies.set('defaultLocalPath', geoName, {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_ONE_WEEK,
      //path: '/' + locale,
    });
    response.cookies.set('cn_iso', CNISO, {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
      //path: '/' + locale
    });
    response.cookies.set('country', CountryName, {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
      path: locale == 'default' ? '/' : '/' + locale
    });
    response.cookies.set('detect_country', cnisos, {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
      path: '/' + locale
    });
    response.cookies.set('client_ip', ip, {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
      path: '/' + locale
    });

    CountryName = CountryName == undefined || CountryName == 'undefined' ? global : CountryName;
    let URLS = `${CountryName}-${langName}`;
    if (pathname != '/' && URLS.indexOf(url.href) == -1 && locale == 'default') {
      let ValidURL = URLS.indexOf(url.href) == -1 ? true : false;
      //  console.log(ValidURL,'ValidURL',URLS,nextUrl.pathname);
      if (ValidURL) {
        return NextResponse.redirect(new URL(`/${URLS}${nextUrl.pathname}${nextUrl.search}`, url), 301);
      }
    }
    // console.log(locale, 'locale22222222');
    return response;
  } catch (error) {
    console.log('finalMiddlewareError', error);
  }
};

export const config = {
  matcher: ['/', '/((?!api|styles|_next/data|_next/static|_next/image|favicon|.well-known|auth|sitemap|robots.txt|files).*)'],
};
