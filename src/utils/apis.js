
import axiosInstance from '@utils/axios';
import { detect_country } from '@utils/i18n';
import { countries_url_path } from '@utils/countriesData';


export async function pageAPI({ pageName, country, lang, locale, staticPage }) {
  try {
    let cn_iso = countries_url_path[locale] ? countries_url_path[locale]?.country_code : 'XX';
    const site_id = process.env.NEXT_PUBLIC_SITE_ID;

    const pageUrl = staticPage ? staticPage : `content/first?site=${site_id}&lang=${lang}&country=${country}&content=${pageName}&visitorId=&userId=&cn_iso=${cn_iso}`;
    const header_url = `header/first?site=${site_id}&lang=${lang}&country=${country}&visitorId=&userId=&content=header&slug_url=header&cn_iso=${cn_iso}&detect_country=${detect_country}&page_name=${pageName}`;
    const footer_url = `footer/first?site=${site_id}&lang=${lang}&country=${country}&content=footer&slug_url=footer&cn_iso=${cn_iso}`;

    const [response, headerRes, footerRes] = await Promise.all([
      axiosInstance.get(pageUrl),
      axiosInstance.get(header_url),
      axiosInstance.get(footer_url),
    ]);

    const safeHeaderData = headerRes?.data ?? null;
    const safeFooterData = footerRes?.data ?? null;
    const safePage = staticPage
      ? (response?.data?.data?.children ?? null)
      : (response?.data?.result?.COMPONENT ?? null);

    return {
      headerData: safeHeaderData,
      footerData: safeFooterData,
      page: safePage,
      url_list: [pageUrl, header_url, footer_url]
    };
  } catch (error) {
    console.error('PageAPI Error:', error);
    // Return fallback data structure to prevent build failures
    return {
      headerData: null,
      footerData: null,
      page: null,
      url_list: [],
      error: error.message || 'Failed to fetch page data'
    };
  }
}