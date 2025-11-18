import React, { useEffect } from 'react'
import Header from 'src/Component/Header/Header';
import Footer from 'src/Component/Footer/Footer';
import axiosInstance from '@utils/axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from 'next-i18next.config';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ImportDynamicComponent } from '@components/importDynamicComponent';
import { countries_url_path } from '@utils/countriesData';
import { wrapper } from 'src/Redux-Config/Stores/Store';
import { ccy_decimals } from '@utils/i18n';
import Script from "next/script";
import { detect_country } from '@utils/i18n';
import shortid from 'shortid';
import { setCookie } from 'cookies-next';
const site_id = process.env.NEXT_PUBLIC_SITE_ID;
const local_url = process.env.NEXT_PUBLIC_LIVE_API_URL;

function ProductList(props) {

    console.log(props, 'ProductList');
    const router = useRouter();
    const { slug } = router.query;
    const { materialCardRes, filterRes, bannerRes, pagetype } = props;

    // --- FIX: Always call useEffect, but conditionally redirect ---
    const hasRequiredData =
        props?.ProductDetailData &&
        props?.ProductDetailData?.data?.children &&
        props?.ProductsDetailsData?.result?.COMPONENT?.[0]?.PARENT?.LISTING?.[0];

    /* useEffect(() => {
         if (
             slug &&
             !slug.includes("customize") &&
             slug.length <= 5 &&
             !hasRequiredData
         ) {
             router.push('/');
         }
     }, [hasRequiredData, router, slug]);*/

    if (slug.length <= 2 && !slug.includes("customize")) {
        if (pagetype == 'PRODUCT') {
            return (
                <div>
                    <Header props={props.headerData} pagetype={pagetype} />
                    {
                        materialCardRes?.result && materialCardRes?.result?.COMPONENT && materialCardRes?.result?.COMPONENT.map((data, index) => (
                            <React.Fragment key={index}>
                                <ImportDynamicComponent url={data.PARENT.component_url}  {...data.PARENT} banner={bannerRes?.result} />
                            </React.Fragment>
                        ))
                    }
                    <Footer props={props.footerData} />
                </div>
            )
        } else {
            return (
                <div>
                    {/* <Script
                    type="text/javascript"
                    strategy="beforeInteractive"
                    src="https://checkout.tabby.ai/integration.js"
                />
                <Script
                    type="text/javascript"
                    strategy="beforeInteractive"
                    src="https://checkout.tabby.ai/tabby-promo.js"
                /> */}
                    <Script
                        type="text/javascript"
                        strategy="beforeInteractive"
                        src="https://cdn.tamara.co/widget-v2/tamara-widget.js"
                    />
                    <Header props={props.headerData} />
                    {
                        props?.blogData && props?.blogData?.data?.children && props?.blogData?.data?.children.map((data, index) => {
                            //console.log(data?.data?.subreddit);
                            return (
                                <React.Fragment key={index}>
                                    <ImportDynamicComponent materialList={materialCardRes.result} filterList={filterRes.result} banner={bannerRes && bannerRes.result ? bannerRes.result : []} url={data?.data?.subreddit}  {...data?.data} />
                                </React.Fragment>
                            )
                        })
                    }

                    <Footer props={props.footerData} />
                </div>
            )
        }

    } else if (!slug.includes("customize") && slug.length <= 5) {
        if (!hasRequiredData) return null;

        return (
            <div>
                <Script
                    type="text/javascript"
                    strategy="beforeInteractive"
                    src="https://checkout.tabby.ai/integration.js"
                />
                <Script
                    type="text/javascript"
                    strategy="beforeInteractive"
                    src="https://checkout.tabby.ai/tabby-promo.js"
                />
                <Script
                    type="text/javascript"
                    strategy="beforeInteractive"
                    src="https://cdn.tamara.co/widget-v2/tamara-widget.js"
                />

                <Header props={props.headerData} />
                {
                    props?.ProductDetailData && props?.ProductDetailData?.data?.children && props?.ProductDetailData?.data?.children.map((data, index) => {
                        // console.log(data?.data?.subreddit);
                        return (
                            <React.Fragment key={index}>
                                <ImportDynamicComponent ProductsDetailsData=
                                    {
                                        props?.ProductsDetailsData?.result && props?.ProductsDetailsData?.result?.COMPONENT && props?.ProductsDetailsData?.result?.COMPONENT?.length > 0 ? props?.ProductsDetailsData?.result?.COMPONENT[0]?.PARENT : []
                                    } url={data?.data?.subreddit} specificationData={props?.specificationData?.result} {...data?.data} />
                            </React.Fragment>
                        )
                    })
                }

                <Footer props={props.footerData} />
            </div>
        )
    } else if (slug.includes("customize") && slug.length <= 7) {
        console.log('IF33', props);
        return (
            <div>
                {
                    props?.customizeData?.result && props?.customizeData?.result?.COMPONENT && props?.customizeData?.result?.COMPONENT.map((data, index) => {
                        //console.log(data.PARENT.component_url);
                        return (
                            <React.Fragment key={index}>
                                <ImportDynamicComponent url={data.PARENT.component_url}  {...data.PARENT} />
                            </React.Fragment>
                        )
                    })
                }
            </div>
        )
    }
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    try {
        const { locale, req, res, query } = context;
        let country = locale && locale?.split('-')[0] || 'global';
        let lang = locale && locale?.split('-')[1] || 'en';
        const cn_iso = locale && countries_url_path[locale] ? countries_url_path[locale]?.country_code : 'XX';
        const ccy_code = locale && countries_url_path[locale] ? countries_url_path[locale]?.ccy_code : 'USD';
        const user = req.cookies['USER_ID'] || 0;
        let genrateVistId = shortid.generate(Date());
        if (!req.cookies['visitorId']) {
            setCookie('visitorId', genrateVistId, { req, res, maxAge: 24 * 60 * 60 * 365 });
        }
        const visitor = req.cookies['visitorId'] || genrateVistId;
        //const detect_country = req.cookies['detect_country'] || "global";

        const query_pram = query && Object.keys(query).map((key) => key != 'slug' ? `${key}` : 'undefined');
        const QueryValues = query && Object.entries(query).map(([key, value]) => key != "slug" ? `${value.indexOf("|") !== -1 ? value.replace(/\|/g, ',') : value}` : 'undefined');
        const QueryKeysValues = query && Object.entries(query).map(([key, value]) => key != "slug" ? `${key}=${value}` : '');
        const customization_slug_url = query && query.slug && query.slug[2] ? query.slug[2] : "";
        const pageNumber = query && query.page && query.page != 1 ? query.page : 0;
        const fromPage = pageNumber < 1 ? 0 : pageNumber * 21 - 21;
        const category_slug = query?.slug && query?.slug.length && query?.slug[0] || 'undefined';
        const sub_category_slug = query?.slug && query?.slug.length && query?.slug[1] || 'undefined';

        let materialCardRes = '';
        let filterRes = '';
        let bannerRes = '';
        let ProductsDetailsData = '';
        let surl = '';
        let specificationDataRes = '';
        let page_back_slug = '';
        let pagetype = 'BROWSE_COLLECTION';

        if (!context?.query?.slug?.includes("customize") && context?.query?.slug?.length <= 2) {
            try {

                const api_first = `material/first`;
                const api_second = `material/second`;
                const api_third = `material/third`;
                const url = `?site=${site_id}&lang=${lang}&country=${country}&content=item_info_listing&slug_url=${sub_category_slug}&category_slug=${category_slug}&_limit=21&currency=${ccy_code}&ccy_decimal=${ccy_decimals}&cn_iso=${cn_iso}&_page=${fromPage}&filters=${query_pram}&filter_values=${QueryValues}&${QueryKeysValues ? QueryKeysValues.join('&') : ''}`;
                surl = url;
                await axiosInstance.get(`${api_first}${url}`).then((res) => {
                    bannerRes = res?.data
                }).catch((error) => {
                    console.error('Banner API Error:', error);
                    bannerRes = null;
                });

                console.log(bannerRes && bannerRes.result, 'PRODUCT');
                console.log(url, 'PRODUCTurl');
                if (bannerRes && bannerRes.result) {
                    if (bannerRes?.result?.BANNER?.SC_REDIRECT_TO == 'PRODUCT') {
                        pagetype = 'PRODUCT';
                        let product_url = `product/third?site=${site_id}&lang=${lang}&country=${country}&content=product_category_listing&cn_iso=${cn_iso}&category_redirect_type=product&category_slug=${category_slug}&slug_url=${sub_category_slug}&filters=${query_pram}&visitorId=${visitor}&userId=${user}&currency=${ccy_code}&ccy_decimal=${ccy_decimals}&detect_country=${detect_country}`;

                        console.log(product_url, 'PRODUCT1111');
                        await axiosInstance.get(product_url).then((res2) => {
                            materialCardRes = res2?.data
                        }).catch((error) => {
                            console.error('Product API Error:', error);
                            materialCardRes = null;
                        });
                        if (materialCardRes?.result?.length == 0) {
                            console.log('ProductPage222', locale);
                            if (locale == 'default') {
                                return {
                                    redirect: {
                                        destination: `/`,
                                        permanent: true,
                                    },
                                }
                            } else if (category_slug) {
                                console.log('ProductPage444', materialCardRes);
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
                        } else if (materialCardRes && materialCardRes?.result && materialCardRes?.result?.COMPONENT && materialCardRes?.result?.COMPONENT[0] && materialCardRes?.result?.COMPONENT[0]['PARENT'] && materialCardRes?.result?.COMPONENT[0]['PARENT']['BREADCRUMB'] && materialCardRes?.result?.COMPONENT[0]['PARENT']['BREADCRUMB']['PRD_REDIRECT_TO'] == 'COLLECTION') {
                            return {
                                redirect: {
                                    destination: `/${locale}/${category_slug}`,
                                    permanent: true,
                                },
                            }
                        }

                    } else {
                        await axiosInstance.get(`${api_second}${url}`).then((res1) => {
                            filterRes = res1?.data;
                        }).catch((error) => {
                            console.error('Filter API Error:', error);
                            filterRes = null;
                        });
                        await axiosInstance.get(`${api_third}${url}`).then((res2) => {
                            materialCardRes = res2?.data
                        }).catch((error) => {
                            console.error('Material Card API Error:', error);
                            materialCardRes = null;
                        });
                    }
                }
                if (filterRes && filterRes?.result && (filterRes?.result?.PRODUCT?.length == 0 || filterRes?.result?.CSP != undefined)) {
                    if (locale == 'default') {
                        return {
                            redirect: {
                                destination: `/`,
                                statusCode: 301,
                            },
                        }
                    } else {
                        return {
                            redirect: {
                                destination: `/${locale}`,
                                statusCode: 301,
                            },
                        }
                    }
                }

            } catch (e) {
                console.log(e, '<= 2')
            }
        }


        if (!context?.query?.slug?.includes("customize") && context?.query?.slug?.length >= 3 && context?.query?.slug?.length <= 5) {
            try {
                const querySearch = `site=${site_id}&lang=${lang}&country=${country}&currency=${ccy_code}&ccy_decimal=${ccy_decimals}&cn_iso=${cn_iso}`; //&visitorId=${visitor}&userId=${user}
                const product_slug = context?.query?.slug && context?.query?.slug.length && context?.query?.slug[2] || 'undefined';
                const item_slug = context?.query?.slug && context?.query?.slug.length && context?.query?.slug[3] || 'undefined';
                const API_PATH = `material/detail?content=item_detail&${querySearch}`;
                const url = `${API_PATH}&category_url=${category_slug}&sub_category_url=${sub_category_slug}&slug_url=${product_slug}&item=${item_slug}&family=${context && context.query && context.query.family ? context.query.family : ''}`;
                const specification_url = `material/item_specification?content=item_specification&slug_url=${product_slug}&item=${item_slug}&`;

                surl = url;
                await axiosInstance.get(`${url}`).then((response) => {
                    ProductsDetailsData = response?.data
                }).catch((error) => {
                    console.error('Product Details API Error:', error);
                    ProductsDetailsData = null;
                });
                await axiosInstance.get(`${specification_url}${querySearch}`).then((response) => {
                    specificationDataRes = response?.data
                }).catch((error) => {
                    console.error('Specification API Error:', error);
                    specificationDataRes = null;
                });
                console.log(ProductsDetailsData.result.COMPONENT[0].PARENT, 'ProductsDetailsData');
                if ((ProductsDetailsData?.result?.COMPONENT?.[0]?.PARENT?.LISTING ?? []).length === 0) {
                    if (locale == 'default') {
                        return {
                            redirect: {
                                destination: `/`,
                                statusCode: 301,
                            },
                        }
                    } else {
                        return {
                            redirect: {
                                destination: `/${locale}`,
                                statusCode: 301,
                            },
                        }
                    }
                }

            } catch (e) {
                console.log(e, '<= 5')
            }
        }
        const slug = context?.query?.slug;
        let collectionResponse, collectionDetailResponse, customizationRes, seo_type;
        let cache_time = query.cache_time ? query.cache_time : 3600;
        let page_name = context?.query?.slug[context?.query?.slug.length - 1] ? context?.query?.slug[context?.query?.slug.length - 1] : '';
        page_back_slug = context?.query?.slug[context?.query?.slug.length - 2] ? context?.query?.slug[context?.query?.slug.length - 2] : 'undefined';
        let customization_url = '';
        if (slug.length <= 2 && !slug.includes("customize")) {
            // console.log(context, 'stringify');

            collectionResponse = await axios.get(`${local_url}api/browsecollection.json`).catch((error) => {
                console.error('Collection API Error:', error);
                return { data: null };
            });
            seo_type = 'PRODUCT';
            // page_name = '1';
            res.setHeader(
                "Cache-Control",
                `s-maxage=${cache_time}, stale-while-revalidate`
            );
        } else if (!slug.includes("customize") && slug.length <= 5) {
            // page_name = slug[2];
            collectionDetailResponse = await axios.get(`${local_url}api/ProductMaterialDetail.json`).catch((error) => {
                console.error('Collection Detail API Error:', error);
                return { data: null };
            });
            seo_type = 'ITEM';
            // page_name = '2';
            res.setHeader(
                "Cache-Control",
                `s-maxage=${cache_time}, stale-while-revalidate`
            );
        } else if (slug.includes("customize") && slug.length <= 7) {
            const sys_id = slug && slug.length === 7 ? slug[6] : 0;
            page_name = slug[2];
            customization_url = `customization/getSteps?site=${site_id}&lang=${lang}&country=${country}&content=customization&visitorId=${visitor}&userId=${user}&category_url=${category_slug}&slug_url=${customization_slug_url}&sys_id=${sys_id}`;
            console.log(customization_url);
            customizationRes = await axiosInstance.get(`customization/getSteps?site=${site_id}&lang=${lang}&country=${country}&content=customization&visitorId=${visitor}&userId=${user}&category_url=${category_slug}&slug_url=${customization_slug_url}&sys_id=${sys_id}`).catch((error) => {
                console.error('Customization API Error:', error);
                return { data: null };
            });
            if (customizationRes?.data?.result?.COMPONENT[0]?.PARENT.CHILD?.return_status == '-1') {
                if (locale == 'default') {
                    return {
                        redirect: {
                            destination: `/`,
                            statusCode: 301,
                        },
                    }
                } else {
                    return {
                        redirect: {
                            destination: `/${locale}`,
                            statusCode: 301,
                        },
                    }
                }
            }

        } else {
            if (locale == 'default') {
                return {
                    redirect: {
                        destination: `/`,
                        statusCode: 301,
                    },
                }
            } else {
                return {
                    redirect: {
                        destination: `/${locale}`,
                        statusCode: 301,

                    },
                }
            }
        }


        let header_url = `header/first?site=${site_id}&lang=${lang}&country=${country}&visitorId=${visitor}&userId=${user}&content=header&slug_url=header&cn_iso=${cn_iso}&detect_country=${detect_country}&page_name=${page_name}&seo_type=${seo_type}&page_back_slug=${page_back_slug}`;
        let footer_url = `footer/first?site=${site_id}&lang=${lang}&country=${country}&content=footer&slug_url=footer&cn_iso=${cn_iso}`;

        const headerRes = await axiosInstance.get(header_url).catch((error) => {
            console.error('Header API Error:', error);
            return { data: null };
        });
        const footerRes = await axiosInstance.get(footer_url).catch((error) => {
            console.error('Footer API Error:', error);
            return { data: null };
        });
        console.log(header_url, 'header_url console');
        return {
            props: {
                ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
                // Will be passed to the page component as props
                materialCardRes: materialCardRes || [],
                filterRes: filterRes || [],
                bannerRes: bannerRes || [],
                customizeData: customizationRes?.data || [],
                blogData: collectionResponse?.data || [],
                ProductDetailData: collectionDetailResponse?.data || [],
                ProductsDetailsData: ProductsDetailsData || [],
                headerData: headerRes?.data,
                footerData: footerRes?.data,
                specificationData: specificationDataRes || [],
                surl: [header_url, footer_url, surl, customization_url],
                pagetype: pagetype
                //  headTest: req.headers
            },
        };
    } catch (e) {
        console.log(e, '<= main')
    }
});

// export const config = {
//     maxDuration: 2,
// };

export default ProductList