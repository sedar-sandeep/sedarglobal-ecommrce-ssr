import Head from 'next/head';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import { useStore, Provider } from 'react-redux';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import { appWithTranslation } from 'next-i18next';
import { useTranslation } from 'next-i18next';
import { HydrationProvider } from 'react-hydration-provider';
import { wrapper } from "../Redux-Config/Stores/Store";
import LoaderProvider from '@provider/loader/loaderProvider';
import { ReTagHomePage } from 'src/Admitad/AdmitadIndex';
import { langName } from '@utils/i18n';
import { cn_iso, countryName } from '@utils/i18n';
import { OnlineStoreText } from '@utils/OnlineStoreText';
import ErrorBoundary from '../components/ErrorBoundary'
import CookiePopup from "src/Component/CookiePolicy/CookiePopup";

import '../../styles/globals.scss';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-loading-skeleton/dist/skeleton.css';
import "react-bootstrap-typeahead/css/Typeahead.scss";
import "react-datepicker/dist/react-datepicker.css";
import 'react-input-range/lib/css/index.css';
import '../../styles/bootstrapTheme/font.scss';

const WhatsAppChat = dynamic(() => import('@components/WhatsAppChat'), { ssr: false });
const ElevenLabsChat = dynamic(() => import('@components/ElevenLabsChat'), { ssr: false });
//const CountryModal = dynamic(() => import('@components/countryModal'), { ssr: false });
//const FreshChat = dynamic(() => import('@components/FreshChat'), { ssr: false });
//  const ZohoSalesChat = dynamic(() => import('@components/ZohoSalesChat'), { ssr: false });
// const GallaBoxChat = dynamic(() => import('@components/GallaBoxChat'), { ssr: false });


const langCode = langName === 'ar';
if (langCode) {
  import('bootstrap/dist/css/bootstrap.rtl.min.css');
  import('../../styles/bootstrapTheme/theme_RTL.scss');
}


const MyApp = (props) => {
  const { i18n, t } = useTranslation();
  const { locale } = useRouter();
  const router = useRouter();
  const store = useStore((state) => state);
  let customWidget = locale && locale?.indexOf("-ar") !== -1 ? "left" : "right";

  let client_ip = Cookies.get('client_ip');
  let api_cn_iso = Cookies.get('sedar_geo');
  let api_countryName = langName == 'ar' ? OnlineStoreText[api_cn_iso]?.ar : OnlineStoreText[api_cn_iso]?.en;

  // console.log(countryName, api_countryName, client_ip, 'countryName');

  React.useEffect(() => {
    document.body.dir = locale?.indexOf("-ar") !== -1 ? "rtl" : "ltr";
  }, [i18n, locale]);

  const [minHeight, setMinHeight] = React.useState(typeof window !== "undefined" && document.body.clientHeight - 180);
  const [popup, showPopup] = React.useState(false);
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  React.useEffect(() => {
    typeof window !== "undefined" && window.addEventListener('resize', setMinHeight(typeof window !== "undefined" && document?.body?.clientHeight - 180));
    // FreshChat();
  }, []);

  React.useEffect(() => {
    if (['AE', 'SA'].indexOf(cn_iso) >= 0) {
      window.tamaraWidgetConfig = {
        lang: langName && ['en', 'ar'].indexOf(langName) >= 0 ? langName : 'en',
        country: cn_iso ? cn_iso : 'AE',
        publicKey: '97c7ced2-7d9a-4129-bbe0-b3053a3d832e'
      }
    }
  }, [langName, cn_iso]);

  React.useEffect(() => {
    ReTagHomePage();
  }, [router]);

  React.useEffect(() => {
    let defaultLocalPath = Cookies.get('defaultLocalPath')?.split('-')[0] || '';
    if (typeof window !== "undefined" && window.location.pathname.indexOf('/customize') >= 0) {
      // console.log("hello")
      document.body.classList.add('custom_fc_frame_move_position');
    } else {
      document.body.classList.remove('custom_fc_frame_move_position');
      // console.log("hello1")
    }

    setTimeout(() => {
      // console.log(Cookies.get('countryPopup'), locale.split('-')[0] != defaultLocalPath.split('-')[0])
      if (locale != 'default' && locale?.split('-')[0] != defaultLocalPath && Cookies.get('countryPopup') == undefined) {
        Cookies.set('countryPopup', 1, {
          maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES,
        })
        showPopup(true)
      }
    }, [500]);



  }, [router, locale])


  return (
    <Provider store={store}>
      <React.Fragment>
        <Head>

          <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1' />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="theme-color" content="white" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="Sedar Global" />


        </Head>
        {/*{locale != 'default' && <FreshChat align={customWidget} />}*/}
        {/* {locale != 'default' && ['KW'].indexOf(cn_iso) == -1 && <ZohoSalesChat align={customWidget} />}  */}
        {/* {locale != 'default' && ['KW'].indexOf(cn_iso) == -1 && <GallaBoxChat align={customWidget} />} */}

        {locale != 'default' && <WhatsAppChat />}
        {locale != 'default' && <ElevenLabsChat />}

        <ThemeProvider dir={locale?.indexOf("-ar") !== -1 ? "rtl" : "ltr"}>
          {/* {popup ? (
            <CountryModal />
          ) : ''} */}
          <LoaderProvider>
            <HydrationProvider>
              <CookiePopup />
              <ErrorBoundary>
                {getLayout(<Component {...pageProps} />)}
              </ErrorBoundary>
            </HydrationProvider>
          </LoaderProvider>
        </ThemeProvider>
        <div className='d-none we_noticed'>{t('we_noticed', { country: api_countryName || countryName })}</div>
      </React.Fragment>
    </Provider>
  );

};

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
};

export default wrapper.withRedux(appWithTranslation(MyApp));
