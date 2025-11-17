import React, { useContext, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { HeaderContext } from '../Header/Header';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { RiArrowRightSLine } from 'react-icons/ri';
import { countryName, langName } from "@utils/i18n";
import { locales } from '@utils/countriesData';
const LanguageDropdown = (props) => {
    const { header_state } = useContext(HeaderContext);

    const [countryList, setCountryList] = useState('');
    const [languages, setLanguages] = useState('');
    const [currentLanguageCode, setCurrentLanguageCode] = useState(langName);
    const router = useRouter();

    useEffect(() => {
        setCountryList(header_state?.topbar?.CHILD?.[1]?.SUB_CHILD?.[4]?.GRAND_CHILD || []);
        setLanguages(locales);
    }, [header_state]);
    

    const changeLanguage = (lng) => {
        Cookies.set('i18next', lng);
        setCurrentLanguageCode(lng);
        const country = Cookies.get('country') || "global";
        console.log(country, 'check cntry', lng);

        router.replace(router.asPath, router.asPath, { locale: `${country}-${lng}` });
        router.events.on('routeChangeComplete', () => {
            router.reload();
        });
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic" className="dropdown-toggle btn">
                {currentLanguageCode.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {countryList &&
                    countryList.map((data, index) => (
                        <React.Fragment key={index}>
                            {data.code &&
                                data.code.toLowerCase() === countryName.toLowerCase() && (
                                    <span className="iconcollapse float-end">
                                        {currentLanguageCode === data.name ? (
                                            <RiArrowRightSLine size={25} />
                                        ) : null}
                                    </span>
                                )}
                        </React.Fragment>
                    ))}

                {/* Only execute this if languages is set and not empty */}
                {languages && languages.length > 0 ? (
                    languages.map((language, index) => (
                        <Dropdown.Item
                            key={index}
                            as="span"
                            onClick={() => changeLanguage(language.code)}
                        >
                            {language.name}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item as="span" disabled>
                        No languages available
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>

    );
};

export default LanguageDropdown;
