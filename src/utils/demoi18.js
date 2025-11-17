import cookies from 'js-cookie'
import { useRouter } from 'next/router';
import * as React from 'react';
import shortid from 'shortid';
import { countries_url_path, countries } from './countriesData';

export const I18NextConfig = () => {
    const { pathname } = useRouter();
    const [visiterID, setVisiterID] = React.useState(cookies.get("visitorId"));
    const [langName, setLangName] = React.useState(cookies.get('i18next'));
    const [defaultLocalePath, setDefaultLocalePath] = React.useState("global-EN");
    const [userID, setUserID] = React.useState(cookies.get("userId"));
    const [siteDetail, setSiteDetail] = React.useState("");
    const [genrate_vistId] = React.useState(shortid.generate(Date()));
    const [expires_time] = React.useState(24 * 60 * 60);
    const [countryName, setCountryName] = React.useState(cookies.get("country"));


    // React.useEffect(() => {
    //     if (!cookies.get("visitorId")) {
    //         cookies.set('visitorId', genrate_vistId, { expires: expires_time });
    //         let getvisiterID = cookies.get('visitorId');
    //         setVisiterID(getvisiterID);
    //     }
    // }, [visiterID]);

    // React.useEffect(() => {
    //     if (!cookies.get("userId")) {
    //         cookies.set('country', "uae");
    //         let getuserID = cookies.get('userId') || 0;
    //         setUserID(getuserID);
    //     }
    // }, [userID]);


    return {
        visiterID,
        langName,
        defaultLocalePath,
        userID,
        siteDetail,
        countryName
    }
};