import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from 'next-i18next.config';
import Header from 'src/Component/Header/Header';
import Footer from 'src/Component/Footer/Footer';
import { ImportDynamicComponent } from '@components/importDynamicComponent';
import { countries_url_path } from '@utils/countriesData';
import axiosInstance from '@utils/axios';
import { detect_country } from '@utils/i18n';
import axios from 'axios';
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
    const response = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}api/PaymentPage.json`);

    const siteId = process.env.NEXT_PUBLIC_SITE_ID

    const headerRes = await axiosInstance.get(`header/first?site=${siteId}&lang=${lang}&country=${country}&visitorId=${visitor}&userId=${user}&content=header&slug_url=header&cn_iso=${cn_iso}&detect_country=${detect_country}&page_name=${context.query.page_name}`);

    const footerRes = await axiosInstance.get(`footer/first?site=${siteId}&lang=${lang}&country=${country}&content=footer&slug_url=footer&cn_iso=${cn_iso}`);

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common'], nextI18NextConfig)),
            // Will be passed to the page component as props
            successData: response?.data,
            headerData: headerRes?.data,
            footerData: footerRes?.data,
        },
    };
}


function SuccessPage(props) {
    return (
        <div>
            {/* <Client> */}
            <Header props={props.headerData} />
            {/* </Client> */}
            {/* <Suspense fallback={<HomeSkeleton />}> */}
            {
                props?.successData && props?.successData?.data?.children && props?.successData?.data?.children.map((data, index) => {
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

export default SuccessPage