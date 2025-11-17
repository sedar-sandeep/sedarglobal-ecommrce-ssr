import React from 'react'
import Header from 'src/Component/Header/Header';
import Footer from 'src/Component/Footer/Footer';
import axiosInstance from '@utils/axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from 'next-i18next.config';
import { isMobile } from "react-device-detect";
import { ImportDynamicComponent } from '@components/importDynamicComponent';
import { countries_url_path } from '@utils/countriesData';
import { wrapper } from 'src/Redux-Config/Stores/Store';
import { detect_country } from '@utils/i18n';


function CurtainsAndBlinds(props) {
    const { firstData } = props;
    console.log(props, 'firstData11');

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

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const { locale, req, res, query } = context;

    let country = locale && locale?.split('-')[0] || 'global';
    let lang = locale && locale?.split('-')[1] || 'en';
    const cn_iso = locale && countries_url_path[locale] ? countries_url_path[locale]?.country_code : 'XX';
    const user = '';
    const visitor = "";
    const siteID = process.env.NEXT_PUBLIC_SITE_ID;


    let header_url = `header/first?site=${siteID}&lang=${lang}&country=${country}&visitorId=${visitor}&userId=${user}&content=header&slug_url=header&cn_iso=${cn_iso}&detect_country=${detect_country}&page_name=curtains_and_blinds`;
    let footer_url = `footer/first?site=${siteID}&lang=${lang}&country=${country}&content=footer&slug_url=footer&cn_iso=${cn_iso}`;
    let content_url = `content/first?site=${siteID}&lang=${lang}&country=${country}&content=curtains_and_blinds&visitorId=${visitor}&userId=${user}&cn_iso=${cn_iso}&_limit=20&_page=0`;

    let headerRes = await axiosInstance.get(header_url);
    let footerRes = await axiosInstance.get(footer_url);
    let contentRes = await axiosInstance.get(content_url);

    let cache_time = query.cache_time ? query.cache_time : 1500;
    res.setHeader(
        "Cache-Control",
        `s-maxage=${cache_time}, stale-while-revalidate`
    );
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
            firstData: contentRes?.data,
            headerData: headerRes?.data,
            footerData: footerRes?.data,
            headTest: req.headers,
            url_list: [header_url, footer_url, content_url]
        },
    };
})


export default CurtainsAndBlinds
