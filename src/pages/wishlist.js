import React from 'react'
import Header from 'src/Component/Header/Header';
import Footer from 'src/Component/Footer/Footer';
import axiosInstance from '@utils/axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from 'next-i18next.config';
import axios from 'axios';
import { detect_country } from '@utils/i18n';
import Head from 'next/head';
import CanonicalTag from '@components/canonicalTag';
import { useRouter } from 'next/router';
import { ImportDynamicComponent } from '@components/importDynamicComponent';
import { countries_url_path } from '@utils/countriesData';
import { setCookie } from 'cookies-next';
import shortid from 'shortid';

export async function getServerSideProps(context) {
    const { locale, req, res } = context;

    let genrateVistId = shortid.generate(Date());

    if (!context.req.cookies['visitorId']) {
        setCookie('visitorId', genrateVistId, { req, res, maxAge: 24 * 60 * 60 * 365 });
    }

    let country = locale && locale?.split('-')[0] || 'global';
    let lang = locale && locale?.split('-')[1] || 'en';
    const cn_iso = context.locale && countries_url_path[context.locale] ? countries_url_path[context.locale]?.country_code : 'XX';
    const user = context.req.cookies['USER_ID'] || 0;
    const visitor = context.req.cookies['visitorId'] || genrateVistId;

    const response = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}api/WishList.json`);
    const siteId = process.env.NEXT_PUBLIC_SITE_ID

    const headerRes = await axiosInstance.get(`header/first?site=${process.env.NEXT_PUBLIC_SITE_ID}&lang=${lang}&country=${country}&visitorId=${visitor}&userId=${user}&content=header&slug_url=header&cn_iso=${cn_iso}&detect_country=${detect_country}&page_name=wishlist`);

    const footerRes = await axiosInstance.get(`footer/first?site=${process.env.NEXT_PUBLIC_SITE_ID}&lang=${lang}&country=${country}&content=footer&slug_url=footer&cn_iso=${cn_iso}`);

    context.res.setHeader(
        "Cache-Control",
        "public, s-maxage=604800, stale-while-revalidate=604799"
    );

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common'], nextI18nextConfig)),
            // Will be passed to the page component as props
            wishListData: response?.data,
            headerData: headerRes?.data,
            footerData: footerRes?.data,
        },
    };
}


function WishListPage(props) {
    const router = useRouter();
    <Head>
        <CanonicalTag router={router} />
    </Head>
    return (
        <div>
            {/* <Client> */}
            <Header props={props.headerData} />
            {/* </Client> */}
            {/* <Suspense fallback={<HomeSkeleton />}> */}
            {
                props?.wishListData && props?.wishListData?.data?.children && props?.wishListData?.data?.children.map((data, index) => {
                    return (
                        <React.Fragment key={index}>
                            <ImportDynamicComponent url={data?.data?.subreddit}  {...data?.data} />
                        </React.Fragment>
                    )
                })
            }
            {/* </Suspense> */}
            <Footer props={props.footerData} />
        </div>
    )
}

export default WishListPage