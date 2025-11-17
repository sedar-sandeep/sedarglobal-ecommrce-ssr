import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { admitad_utm_source_url } from 'src/Admitad/AdmitadIndex';

const LinkComponent = ({
    children,
    className,
    skipLocaleHandling,
    target,
    ...rest
}) => {
    const router = useRouter();
    const locale = rest.locale || router.query.locale || '';

    let href = rest.href || router.asPath;

    let utm_source = router.query.utm_source ? router.query.utm_source : false;
    let tagtag_uid = router.query.tagtag_uid ? router.query.tagtag_uid : false;
    let admitad_utm = admitad_utm_source_url() && admitad_utm_source_url().length > 15 ? true : false;

    // If href is external, skip locale handling
    if (href.indexOf('http') === 0) skipLocaleHandling = true;

    // Prepend locale if needed
    if (locale && !skipLocaleHandling) {
        href = href
            ? `/${locale}${href}`
            : router.pathname.replace('[locale]', locale);
    }

    // External link
    if (href && (href.indexOf('http://') === 0 || href.indexOf('https://') === 0)) {
        return (
            <Link className={className} href={href} target="_blank" rel="noreferrer" legacyBehavior>
                <a className={className}>{children}</a>
            </Link>
        );
    }
    // Internal link with Admitad UTM handling
    else if (utm_source && tagtag_uid && admitad_utm && href) {
        let hrefArray = href.split('?');
        let url = hrefArray[0];
        let params = hrefArray[1] || "";

        let urlParams = url + "?";
        if (params) urlParams += params;

        // Only add utm_source if it does not exist
        if (!params.includes('utm_source')) {
            urlParams += (params ? "&" : "") + `utm_source=${router.query.utm_source}`;
        }

        // Only add tagtag_uid if it does not exist
        if (!params.includes('tagtag_uid')) {
            urlParams += (params ? "&" : "") + `tagtag_uid=${router.query.tagtag_uid}`;
        }

        return (
            <Link className={className} href={urlParams} target={target ? "_blank" : "_self"} legacyBehavior>
                <a className={className} {...rest}>{children}</a>
            </Link>
        );
    }
    // Default internal link
    else {
        return (
            <Link href={href} legacyBehavior>
                <a className={className}>{children}</a>
            </Link>
        );
    }
};

export default LinkComponent;
