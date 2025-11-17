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
    const slug_url = query.slug.pop() || "";
    const response = await axiosInstance.get(`v2/homepage/first?content=blog&locale=${locale}&slug_url=${slug_url}`);

    const headerRes = await axiosInstance.get(`header/first?site=${siteId}&lang=${lang}&country=${country}&visitorId=${visitor}&userId=${user}&content=header&slug_url=header&cn_iso=${cn_iso}&detect_country=${detect_country}&page_name=${slug_url || 'blog'}`);

    const footerRes = await axiosInstance.get(`footer/first?site=${siteId}&lang=${lang}&country=${country}&content=footer&slug_url=footer&cn_iso=${cn_iso}`);
    if (response && response?.data && response?.data?.result && response?.data?.result?.COMPONENT == undefined) {
        return {
            redirect: {
                destination: `/blog`,
                permanent: true,
            },
        }
    }
    
    context.res.setHeader(
        "Cache-Control",
        "public, s-maxage=60, stale-while-revalidate=59"
    );

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common'], nextI18nextConfig)),
            pageData: response?.data,
            headerData: headerRes?.data,
            footerData: footerRes?.data,
            slug: slug_url
        },
    };
}

function ProjectSlug(props) {

    const router = useRouter();

    <Head>
        <CanonicalTag router={router} />
    </Head>

    return (
        <div>
            <Header props={props.headerData} />
            <div>
                {
                    props.pageData?.result && props.pageData?.result?.COMPONENT && props.pageData?.result?.COMPONENT.map((data, index) => (
                        <React.Fragment key={index}>
                            <ImportDynamicComponent url={`Component/Blog/post`}  {...data.PARENT} breadcrumb={props.pageData?.result?.BREADCRUMB || ''} />
                        </React.Fragment>
                    ))
                }
            </div>
            <Footer props={props.footerData} />
        </div>
    )
}

export default ProjectSlug