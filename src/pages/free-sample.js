import React from 'react'
import Header from 'src/Component/Header/Header';
import Footer from 'src/Component/Footer/Footer';
import axiosInstance from '@utils/axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from 'next-i18next.config';
import { ccy_decimals, detect_country } from '@utils/i18n';
import Head from 'next/head';
import { useRouter } from 'next/router';
import CanonicalTag from '@components/canonicalTag';
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
    const cn_iso = locale && countries_url_path[locale] ? countries_url_path[locale]?.country_code : 'XX';
    const site = context.req.cookies['siteDetail'] || "undefined";

    const user = req.cookies['USER_ID'] || 0;
    const visitor = req.cookies['visitorId'] || genrateVistId;
    const ccy_code = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_ccy_code ? JSON.parse(site).show_ccy_code : 'AED';

    const siteId = process.env.NEXT_PUBLIC_SITE_ID

    let category, modal, material, category_slug, filterRes;
    let freesampleMaterialData = [];

    const freeSampleCategory = await axiosInstance.get(`freesample/category?lang=${lang}&site=${process.env.NEXT_PUBLIC_SITE_ID}&country=${country}&visitorId=${visitor}&userId=${user}&currency=${ccy_code}&ccy_decimal=${ccy_decimals}&cn_iso=${cn_iso}&detect_country=${detect_country}`)


    category = freeSampleCategory.data.result;
    modal = freeSampleCategory.data.result[0]['product'];
    category_slug = freeSampleCategory.data.result[0].link_url;

    if (context?.query && context?.query?.slug_url || context?.query?.category_slug) {
        material = {
            'slug_url': context?.query?.slug_url,
            'category_slug': context?.query?.category_slug,
            'type': 'free_sample',
            'page_number': 0,
            'product_name': freeSampleCategory.data.result[0]['product'][0].desc
        };
    } else {
        material = {
            'slug_url': freeSampleCategory.data.result[0]['product'][0].link_url,
            'category_slug': freeSampleCategory.data.result[0].link_url,
            'type': 'free_sample',
            'page_number': 0,
            'product_name': freeSampleCategory.data.result[0]['product'][0].desc
        };
    }


    if (material.type && material.type == 'free_sample') {
        const Query = context.query && Object.keys(context.query).map((key) => key != 'slug' ? `${key}` : "").join('&') || "";
        const QueryKeysValues = context.query && Object.entries(context.query).map(([key, value]) => key != "slug" ? `${key}:${value}` : "").join('&') || "";
        const pageNumber = context.query && context.query.page ? context.query.page : 0;
        try {

            const querySearch = `site=${process.env.NEXT_PUBLIC_SITE_ID}&lang=${lang}&country=${country}&visitorId=${visitor}&userId=${user}&currency=${ccy_code}&ccy_decimal=${ccy_decimals}&cn_iso=${cn_iso}`

            // const API_PATH = `material/third?site=${process.env.NEXT_PUBLIC_SITE_ID}&lang=${lang}&country=${country}&content=item_info_listing`;

            // const url = `${API_PATH}&slug_url=${material.category_slug}&category_slug=${''}&product_slug=${material.slug_url}&_limit=21&${querySearch}&_page=${pageNumber}&filters=${Query}&filter_values=${material.category_slug}&${material.category_slug}&${material.slug_url}&${QueryKeysValues}&type=${material.type}`;

            const api_second = `material/second`;
            const api_third = `material/third`;

            const url = `?site=${process.env.NEXT_PUBLIC_SITE_ID}&lang=${lang}&country=${country}&content=item_info_listing&&slug_url=${material.category_slug}&category_slug=${''}&product_slug=${material.slug_url}&_limit=21&${querySearch}&_page=${pageNumber}&filters=${Query}&filter_values=${material.category_slug}&${material.category_slug}&${material.slug_url}&${QueryKeysValues}&type=${material.type}`;


            await axiosInstance.get(`${api_third}${url}`).then((response) => {
                freesampleMaterialData = response?.data
                // if (response.result.PRODUCT && response.result.PRODUCT.length > 0) {
                // store.dispatch(addNewfilter(response.result));
                // }
            });

            await axiosInstance.get(`${api_second}${url}`).then((response) => {
                filterRes = response?.data
            });

        } catch (e) {
            console.log(e)
        }
    }

    const response = await axiosInstance.get(`content/first?site=${process.env.NEXT_PUBLIC_SITE_ID}&lang=${lang}&country=${country}&content=free_sample&visitorId=${visitor}&userId=${user}&cn_iso=${cn_iso}`);

    const headerRes = await axiosInstance.get(`header/first?site=${process.env.NEXT_PUBLIC_SITE_ID}&lang=${lang}&country=${country}&visitorId=${visitor}&userId=${user}&content=header&slug_url=header&cn_iso=${cn_iso}&detect_country=${detect_country}&page_name=free_sample`);

    const footerRes = await axiosInstance.get(`footer/first?site=${process.env.NEXT_PUBLIC_SITE_ID}&lang=${lang}&country=${country}&content=footer&slug_url=footer&cn_iso=${cn_iso}`);

    context.res.setHeader(
        "Cache-Control",
        "public, s-maxage=86400, stale-while-revalidate=86399"
    );

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
            filterRes: filterRes || [],
            freeSampleData: response?.data,
            headerData: headerRes?.data,
            footerData: footerRes?.data,
            freesampleMaterialData: freesampleMaterialData
            // Will be passed to the page component as props
        },
        // revalidate: 60,
    };
}

function FreeSamplePage(props) {
    const router = useRouter();
    <Head>
        <CanonicalTag
            router={router}
        />
    </Head>

    return (
        <div>
            {/* <Client> */}
            <Header props={props.headerData} />
            {/* </Client> */}
            {/* <Suspense fallback={<HomeSkeleton />}> */}
            <div>
                {
                    props.freeSampleData?.result && props.freeSampleData?.result?.COMPONENT && props.freeSampleData?.result?.COMPONENT.map((data, index) => (
                        <React.Fragment key={index}>
                            <ImportDynamicComponent filterList={props.filterRes.result} materialList={props?.freesampleMaterialData?.result} url={data.PARENT.component_url} {...props}  {...data.PARENT} />
                        </React.Fragment>
                    ))
                }
            </div>
            {/* </Suspense> */}
            <Footer props={props.footerData} />
        </div>
    )
}

export default FreeSamplePage