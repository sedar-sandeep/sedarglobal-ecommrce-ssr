import nextI18nextConfig from 'next-i18next.config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import axiosInstance from '@utils/axios';
import Layout from '@components/Layout';
import { detect_country } from '@utils/i18n';
import { countries_url_path } from '@utils/countriesData';
import axios from 'axios';

export async function getStaticProps(context) {
  const { locale } = context;

  const country = locale?.split('-')[0] || 'global';
  const lang = locale?.split('-')[1] || 'en';
  const cn_iso = countries_url_path[locale]
    ? countries_url_path[locale]?.country_code
    : 'XX';
  const site_id = process.env.NEXT_PUBLIC_SITE_ID;

  // URLs (same as before)
  const pageUrl = `https://www.sedarglobal.com/api/Findyourlocation.json`;
  const header_url = `header/first?site=${site_id}&lang=${lang}&country=${country}&visitorId=&userId=&content=header&slug_url=header&cn_iso=${cn_iso}&detect_country=${detect_country}&page_name=find_your_store`;
  const footer_url = `footer/first?site=${site_id}&lang=${lang}&country=${country}&content=footer&slug_url=footer&cn_iso=${cn_iso}`;

  try {
    // Fetch all data directly (no pageAPI)
    const [pageRes, headerRes, footerRes] = await Promise.all([
      axios.get(pageUrl), // full URL (external)
      axiosInstance.get(header_url), // from same API base
      axiosInstance.get(footer_url),
    ]);

    const pageData = pageRes?.data?.data?.children ?? null;
    const headerData = headerRes?.data ?? null;
    const footerData = footerRes?.data ?? null;

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
        headerData,
        footerData,
        page: pageData,
        url_list: [pageUrl, header_url, footer_url],
      },
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_ONE_WEEK) || 3600,
    };
  } catch (error) {
    console.error('FindStore Fetch Error:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
        headerData: null,
        footerData: null,
        page: null,
        error: error.message || 'Failed to fetch page data',
      },
      revalidate: 3600,
    };
  }
}

function FindStore(props) {
  return (
    <div>
      <Layout {...props} />
    </div>
  );
}

export default FindStore;
