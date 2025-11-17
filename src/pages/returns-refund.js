import nextI18nextConfig from 'next-i18next.config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { pageAPI } from '@utils/apis';
import Layout from '@components/Layout';

export async function getStaticProps(context) {
    const { locale } = context;
    let data = {
        pageName: 'returns_refund',
        country: locale && locale?.split('-')[0] || 'global',
        lang: locale && locale?.split('-')[1] || 'en',
        locale: locale
    }

    const pageData = await pageAPI(data);

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
            ...pageData
        },
        revalidate: parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_ONE_WEEK) || 3600,
    };
}


function ReturnsRefund(props) {
    return (
        <div>
            <Layout {...props} />
        </div>
    )
}

export default ReturnsRefund
