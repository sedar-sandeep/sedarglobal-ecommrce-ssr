import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from 'next-i18next.config';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import CanonicalTag from '@components/canonicalTag';
import { ImportDynamicComponent } from '@components/importDynamicComponent';
import { setCookie } from 'cookies-next';
import shortid from 'shortid';

export async function getServerSideProps(context) {
    const { locale, req, res } = context;

    let genrateVistId = shortid.generate(Date());

    if (!context.req.cookies['visitorId']) {
        setCookie('visitorId', genrateVistId, { req, res, maxAge: 24 * 60 * 60 * 365});
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


function ClickCollect(props) {
    const router = useRouter();
    <Head>
        <CanonicalTag router={router} />
    </Head>
    return (
        <div>
            {
                props?.page_data && props?.page_data?.data?.children && props?.page_data?.data?.children.map((data, index) => {
                    return (

                        <React.Fragment key={index}>
                            {/* {data?.data?.subreddit} */}
                            <ImportDynamicComponent url={data?.data?.subreddit}  {...data?.data} />
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
}

export default ClickCollect