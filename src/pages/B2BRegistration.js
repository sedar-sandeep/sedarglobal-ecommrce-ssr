import React from 'react'
import Header from 'src/Component/Header/Header';
import Footer from 'src/Component/Footer/Footer';
import axiosInstance from '@utils/axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from 'next-i18next.config';
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

    //let genrateVistId = shortid.generate(Date());

    //if (!context.req.cookies['visitorId']) {
    //  setCookie('visitorId', genrateVistId, { req, res, maxAge: 24 * 60 * 60 });
    //}

    let country = locale && locale?.split('-')[0] || 'global';
    let lang = locale && locale?.split('-')[1] || 'en';
    const cn_iso = req.cookies['cn_iso'] || 'XX'; //locale && countries_url_path[locale] ? countries_url_path[locale]?.country_code : 'XX';
    const user = ''; //req.cookies['USER_ID'] || 0;
    const visitor = '';  //req.cookies['visitorId'] || "0Lglrav8S";
    const siteId = process.env.NEXT_PUBLIC_SITE_ID

    const response = await axiosInstance.get(`content/first?site=${siteId}&lang=${lang}&country=${country}&content=b2b_registration&visitorId=${visitor}&userId=${user}&cn_iso=${cn_iso}`);

    const headerRes = await axiosInstance.get(`header/first?site=${siteId}&lang=${lang}&country=${country}&visitorId=${visitor}&userId=${user}&content=header&slug_url=header&cn_iso=${cn_iso}&detect_country=${detect_country}&page_name=b2b_registration`);

    const footerRes = await axiosInstance.get(`footer/first?site=${siteId}&lang=${lang}&country=${country}&content=footer&slug_url=footer&cn_iso=${cn_iso}`);

    context.res.setHeader(
        "Cache-Control",
        "public, s-maxage=3600, stale-while-revalidate=3599"
    );
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
            registrationData: response?.data,

            headerData: headerRes?.data,
            footerData: footerRes?.data,
            // Will be passed to the page component as props
        },
    };
}

function PageB2BRegistration(props) {
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
            <div>
                {
                    props.registrationData?.result && props.registrationData?.result?.COMPONENT && props.registrationData?.result?.COMPONENT.map((data, index) => (
                        <React.Fragment key={index}>
                            <ImportDynamicComponent url={data.PARENT.component_url}  {...data.PARENT} />
                        </React.Fragment>
                    ))
                }
            </div>
            {/* </Suspense> */}
            <Footer props={props.footerData} />
        </div>
    )
}

export default PageB2BRegistration