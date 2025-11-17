import * as React from 'react';
import { countries_url_path } from '@utils/countriesData';
import axios from 'axios';
import { detect_country } from '@utils/i18n';
import Footer from 'src/Component/Footer/Footer';
import Header from 'src/Component/Header/Header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import axiosInstance from '@utils/axios';
import { ImportDynamicComponent } from '@components/importDynamicComponent';
import { setCookie, deleteCookie } from 'cookies-next';
import nextI18nextConfig from 'next-i18next.config';
import shortid from 'shortid';


export async function getServerSideProps(context) {
    // const { locale } = context;
    const { locale, req, res } = context;
    let genrateVistId = shortid.generate(Date());
    if (!context.req.cookies['visitorId']) {
        setCookie('visitorId', genrateVistId, { req, res, maxAge: 24 * 60 * 60 });
    }


    let country = locale && locale?.split('-')[0] || 'global';
    let lang = locale && locale?.split('-')[1] || 'en';
    const cn_iso = locale && countries_url_path[locale] ? countries_url_path[locale]?.country_code : 'XX';
    const user = req.cookies['USER_ID'] || 0;
    const visitor = req.cookies['visitorId'] || genrateVistId;
    // PageData
    const cartResponse = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}api/Tracking.json`);

    const headerRes = await axiosInstance.get(`header/first?site=${process.env.NEXT_PUBLIC_SITE_ID}&lang=${lang}&country=${country}&visitorId=${visitor}&userId=${user}&content=header&slug_url=header&cn_iso=${cn_iso}&detect_country=${detect_country}&page_name=tracking`);

    const footerRes = await axiosInstance.get(`footer/first?site=${process.env.NEXT_PUBLIC_SITE_ID}&lang=${lang}&country=${country}&content=footer&slug_url=footer&cn_iso=${cn_iso}`);

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
            // Will be passed to the page component as props
            cartResponse: cartResponse?.data,
            headerData: headerRes?.data,
            footerData: footerRes?.data,
            headRes: `header/first?site=${process.env.NEXT_PUBLIC_SITE_ID}&lang=${lang}&country=${country}&visitorId=${visitor}&userId=${user}&content=header&slug_url=header&cn_iso=${cn_iso}&detect_country=${detect_country}&page_name=tracking`
        },
    };

}

function Tracking(props) {
    //const { cartResponse } = props;
    //  console.log(props, 'carthead',cartResponse)
    return (
        <React.Fragment>
            <div>
                <Header props={props.headerData} />
                {
                    props?.cartResponse && props?.cartResponse?.data?.children && props?.cartResponse?.data?.children.map((data, index) => {
                        return (
                            <React.Fragment key={index}>
                                <ImportDynamicComponent url={data?.data?.subreddit}  {...data?.data} />
                            </React.Fragment>
                        )
                    })
                }

                <Footer props={props.footerData} />
            </div>
        </React.Fragment>
    )
}
export default Tracking;