import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import axiosInstance from '@utils/axios';
import nextI18nextConfig from 'next-i18next.config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Header from 'src/Component/Header/Header';
import Footer from 'src/Component/Footer/Footer';
import { ccy_code, ccy_decimals, detect_country, visitorId } from '@utils/i18n';
import { ImportDynamicComponent } from '@components/importDynamicComponent';
import { countries_url_path } from '@utils/countriesData';
import { setCookie } from 'cookies-next';
import shortid from 'shortid';
const site_id = process.env.NEXT_PUBLIC_SITE_ID;

export async function getServerSideProps(context) {
    const { locale, req, res, resolvedUrl } = context;
    if (resolvedUrl.startsWith('/product/')) {
        const urlWithoutQuery = resolvedUrl.split('?')[0];
        const newUrl = urlWithoutQuery.replace(/^\/product/, '');

        const category_slug = newUrl.startsWith('/') ? newUrl.slice(1) : newUrl;

        return {
            redirect: {
                destination: `/${locale}/${category_slug}`,
                permanent: true,
            },
        };
    }
    let genrateVistId = shortid.generate(Date());

    if (!context.req.cookies['visitorId']) {
        setCookie('visitorId', genrateVistId, { req, res, maxAge: 24 * 60 * 60 * 365 });
    }

    let country = locale && locale?.split('-')[0] || 'global';
    let lang = locale && locale?.split('-')[1] || 'en';
    const cn_iso = context.locale && countries_url_path[context.locale] ? countries_url_path[context.locale]?.country_code : 'XX';
    const user = context.req.cookies['USER_ID'] || 0;
    const visitor = context.req.cookies['visitorId'] || genrateVistId;

    const Query = context.query && Object.keys(context.query).map((key) => key != 'slug' ? `${key}` : "").join('&') || 0;

    const category_slug = context?.query?.slug && context?.query?.slug.length > 0 ? context?.query?.slug[0] : 'undefined';
    const sub_category_slug = context?.query?.slug && context?.query?.slug.length > 0 ? context?.query?.slug[1] : 'undefined';
    let product_url = `product/third?site=${site_id}&lang=${lang}&country=${country}&content=product_category_listing&cn_iso=${cn_iso}&category_redirect_type=product&category_slug=${category_slug}&slug_url=${sub_category_slug}&filters=${Query}&visitorId=${visitor}&userId=${user}&currency=${ccy_code}&ccy_decimal=${ccy_decimals}&detect_country=${detect_country}`;
    const response = await axiosInstance.get(product_url).catch((error) => {
        console.error('Product API Error:', error);
        return { data: { result: [] } };
    });
    if (response?.data?.result?.length == 0) {
        console.log('ProductPage222', locale);
        if (locale == 'default') {
            return {
                redirect: {
                    destination: `/`,
                    permanent: true,
                },
            }
        } else if (category_slug) {
            console.log('ProductPage444', category_slug);
            return {
                redirect: {
                    destination: `/${locale}/${category_slug}`,
                    permanent: true,
                },
            }
        } else {
            return {
                redirect: {
                    destination: `/${locale}`,
                    permanent: true,
                },
            }
        }
    } else if (response.data && response.data.result && response.data.result.COMPONENT && response.data.result.COMPONENT[0] && response.data.result.COMPONENT[0]['PARENT'] && response.data.result.COMPONENT[0]['PARENT']['BREADCRUMB'] && response.data.result.COMPONENT[0]['PARENT']['BREADCRUMB']['PRD_REDIRECT_TO'] == 'COLLECTION') {
        return {
            redirect: {
                destination: `/${locale}/${category_slug}`,
                permanent: true,
            },
        }
    }
    let header_url = `header/first?site=${site_id}&lang=${lang}&country=${country}&visitorId=${visitor}&userId=${user}&content=header&slug_url=header&cn_iso=${cn_iso}&detect_country=${detect_country}&seo_type=PRODUCT&page_name=${context?.query?.slug && context?.query?.slug.length > 0 ? context?.query?.slug.pop(1) : ""}`
    let footer_url = `footer/first?site=${site_id}&lang=${lang}&country=${country}&content=footer&slug_url=footer&cn_iso=${cn_iso}`

    const headerRes = await axiosInstance.get(header_url).catch((error) => {
        console.error('Header API Error:', error);
        return { data: null };
    });

    let pro_json_url = `${process.env.NEXT_PUBLIC_LOCAL_API_URL}api/products.json`;
    const Productres = await axiosInstance.get(pro_json_url).catch((error) => {
        console.error('Product JSON API Error:', error);
        return { data: null };
    });

    const footerRes = await axiosInstance.get(footer_url).catch((error) => {
        console.error('Footer API Error:', error);
        return { data: null };
    });

    const api_first = `material/first`;
    const url = `?site=${site_id}&lang=${lang}&country=${country}&content=product_category_listing&slug_url=${sub_category_slug}&category_slug=${category_slug}&currency=${ccy_code}&ccy_decimal=${ccy_decimals}&cn_iso=${cn_iso}`;
    const bannerRes = await axiosInstance.get(`${api_first}${url}`).catch((error) => {
        console.error('Banner API Error:', error);
        return { data: null };
    });


    context.res.setHeader(
        "Cache-Control",
        "s-maxage=3600, stale-while-revalidate"
    );


    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common'], nextI18nextConfig)),
            // Will be passed to the page component as props
            bannerRes: bannerRes?.data || [],
            curtainDrapData: response?.data,
            productData: Productres?.data,
            headerData: headerRes?.data,
            footerData: footerRes?.data,
        },
    };
}


export default function Curtains(props) {
    const router = useRouter();
    const { locale } = router;
    return (
        <React.Fragment>

            <Header props={props.headerData} />
            <div>
                {
                    props?.curtainDrapData?.result && props?.curtainDrapData?.result?.COMPONENT && props?.curtainDrapData?.result?.COMPONENT.map((data, index) => (
                        <React.Fragment key={index}>
                            <ImportDynamicComponent url={data.PARENT.component_url}  {...data.PARENT} banner={props?.bannerRes?.result} />
                        </React.Fragment>
                    ))
                }
            </div>
            <Footer props={props.footerData} />
        </React.Fragment>
    )
}
