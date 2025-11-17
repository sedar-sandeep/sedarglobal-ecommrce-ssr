import dynamic from "next/dynamic";
import { useRouter } from 'next/router';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from 'next-i18next.config';
import axiosInstance from '@utils/axios';
import { ImportDynamicComponent } from '@components/importDynamicComponent';
import { isMobile } from "react-device-detect";
import { detect_country, userId } from '@utils/i18n';
import { countries_url_path } from '@utils/countriesData';
import SeoHeader from '@components/seoHeader';
import CanonicalTag from 'src/components/canonicalTag';

const Header = dynamic(() => import("src/Component/Header/Header"));
const Footer = dynamic(() => import("src/Component/Footer/Footer"));

export async function getStaticProps(context) {
  const { locale } = context;
  let country = locale && locale?.split('-')[0] || 'global';
  let lang = locale && locale?.split('-')[1] || 'en';
  const cn_iso = locale && countries_url_path[locale] ? countries_url_path[locale]?.country_code : 'XX'; //req?.headers['x-vercel-ip-country'] || req.cookies['cn_iso'];

  const user = '';
  const visitor = "";
  const siteID = process.env.NEXT_PUBLIC_SITE_ID;


  let landing_page_url = `content/first?site=${siteID}&lang=${lang}&country=&content=landing_page&visitorId=${visitor}&page_name=homepage&cn_iso=${cn_iso}`;
  let homepage_url = `content/first?site=${siteID}&lang=${lang}&country=${country}&content=homepage&visitorId=${visitor}&userId=${user}&cn_iso=${cn_iso}`;
  let footer_url = `footer/first?site=${siteID}&lang=${lang}&country=${country}&content=footer&slug_url=footer&cn_iso=${cn_iso}`;
  let header_url = `header/first?site=${siteID}&lang=${lang}&country=${country}&visitorId=${visitor}&userId=${user}&content=header&slug_url=header&cn_iso=${cn_iso}&detect_country=${detect_country}&page_name=${locale == 'default' ? 'landing_page' : 'homepage'}`;

  const [landingPageResponses, response, footerRes, headerRes] = await Promise.all([
    axiosInstance.get(landing_page_url),
    axiosInstance.get(homepage_url),
    axiosInstance.get(footer_url),
    axiosInstance.get(header_url)
  ]);

  // console.log('landing_page_url',landing_page_url,homepage_url,footer_url,header_url);
  // Return the data as props
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
      landingPageResponse: landingPageResponses?.data,
      firstData: response?.data,
      headerData: headerRes?.data,
      footerData: footerRes?.data,
      users: user,
      visitor: visitor,
      userId: userId,
      url_list: [landing_page_url, homepage_url, footer_url, header_url]
    },
    // Enable ISR with a revalidation time (in seconds)
    revalidate: 60, // This will revalidate and update the page every 60 seconds
  };
}

function Home(props) {
  console.log(props, 'Home')
  const { locale } = useRouter();
  const router = useRouter();

  const { firstData, landingPageResponse } = props;
  if (locale == "default") {
    return (
      <React.Fragment>
        {/* <Header props={props.headerData} /> */}
        <SeoHeader
          data={landingPageResponse?.result}
          router={router}
        />
        <CanonicalTag router={router} pagetype="" hrefLang={landingPageResponse?.result?.SEO?.hreflang || ''} />
        {
          landingPageResponse?.result && landingPageResponse?.result?.COMPONENT && landingPageResponse?.result?.COMPONENT.map((data, index) => (
            <React.Fragment key={index}>
              <ImportDynamicComponent url={data.PARENT.component_url}  {...data.PARENT} isMobile={props?.user_agent} />
            </React.Fragment>
          ))
        }
        <Footer props={props.footerData} />
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Header props={props.headerData} />
        {
          firstData?.result && firstData?.result?.COMPONENT && firstData?.result?.COMPONENT.map((data, index) => (
            <React.Fragment key={index}>
              <ImportDynamicComponent url={data.PARENT.component_url}  {...data.PARENT} isMobile={isMobile} />
            </React.Fragment>
          ))
        }
        <Footer props={props.footerData} />
      </React.Fragment>
    )
  }

}

export default Home;