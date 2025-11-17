import React from 'react'
import Script from "next/script";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from 'next-i18next.config';
import axios from 'axios';
import { detect_country } from '@utils/i18n';
import { useRouter } from 'next/router';
import Head from 'next/head';
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

    const response = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}api/ShippingPage.json`);


    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
            // Will be passed to the page component as props
            page_data: response?.data,
        },
    };
}


function Payment(props) {
    const router = useRouter();
    <Head>
        <CanonicalTag router={router} />
    </Head>
    return (
        <div>
            <Script id="device_fingerprint" type="text/javascript" >
                {
                    `var io_bbout_element_id = 'device_fingerprint’;//the input id will be used to collect the device fingerprint value
                     var io_install_stm = false;
                     var io_exclude_stm = 0;//prevent the iovation Active X control from running on either Windows
                     var io_install_flash = false;
                     var io_enable_rip = true;// collect real ip information
                    `
                }
            </Script>
            <Script type="text/javascript"
                strategy="beforeInteractive"
                src="https://mpsnare.iesnare.com/snare.js"
            />
            {
                props?.page_data && props?.page_data?.data?.children && props?.page_data?.data?.children.map((data, index) => {
                    return (
                        <React.Fragment key={index}>
                            <ImportDynamicComponent url={data?.data?.subreddit}  {...data?.data} />
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
}

export default Payment