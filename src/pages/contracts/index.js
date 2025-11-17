import React from 'react'
import Header from 'src/Component/Header/Header';
import Footer from 'src/Component/Footer/Footer';
import axiosInstance from '@utils/axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from 'next-i18next.config';
import { detect_country } from '@utils/i18n';
import CanonicalTag from '@components/canonicalTag';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ImportDynamicComponent } from '@components/importDynamicComponent';
import { countries_url_path } from '@utils/countriesData';
import { setCookie } from 'cookies-next';
import shortid from 'shortid';

export async function getServerSideProps(context) {
    const { locale, req, res, query } = context;

    let genrateVistId = shortid.generate(Date());

    if (!context.req.cookies['visitorId']) {
        setCookie('visitorId', genrateVistId, { req, res, maxAge: 24 * 60 * 60 * 365 });
    }

    let country = locale && locale?.split('-')[0] || 'global';
    let lang = locale && locale?.split('-')[1] || 'en';
    const cn_iso = context.locale && countries_url_path[context.locale] ? countries_url_path[context.locale]?.country_code : 'XX';
    const user = context.req.cookies['USER_ID'] || 0;
    const visitor = context.req.cookies['visitorId'] || genrateVistId;

    const siteId = process.env.NEXT_PUBLIC_SITE_ID
    const slug_url = query && query.slug && query.slug[0] ? query.slug[0] : "";
    const response = await axiosInstance.get(`v2/homepage/first?content=contracts&locale=${locale}`);

    const headerRes = await axiosInstance.get(`header/first?site=${siteId}&lang=${lang}&country=${country}&visitorId=${visitor}&userId=${user}&content=header&slug_url=header&cn_iso=${cn_iso}&detect_country=${detect_country}&page_name=contracts`);

    const footerRes = await axiosInstance.get(`footer/first?site=${siteId}&lang=${lang}&country=${country}&content=footer&slug_url=footer&cn_iso=${cn_iso}`);
    context.res.setHeader(
        "Cache-Control",
        "public, s-maxage=60, stale-while-revalidate=59"
    );

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common'], nextI18nextConfig)),
            slugData: response?.data,
            headerData: headerRes?.data,
            footerData: footerRes?.data,
            home_url: `v2/homepage/first?content=contracts&locale=${locale}`
            // Will be passed to the page component as props
        },
    };
}

function Contracts(props) {

    console.log(props, 'Contracts2125');
    const router = useRouter();
    <Head>
        <CanonicalTag router={router} />
    </Head>
    return (
        <div>
            <Header props={props.headerData} />
            <div>
                {
                    props.slugData?.result && props.slugData?.result?.COMPONENT && props.slugData?.result?.COMPONENT.map((data, index) => (
                        <React.Fragment key={index}>
                            <ImportDynamicComponent url={data.PARENT.component_url}  {...data.PARENT} />
                        </React.Fragment>
                    ))
                }
            </div>
            <Footer props={props.footerData} />
        </div>
    )
}

export default Contracts