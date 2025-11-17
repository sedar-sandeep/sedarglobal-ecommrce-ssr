import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri'
import { Button, Form, InputGroup } from 'react-bootstrap';

import LinkComponent from '@components/Link';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useTranslation } from 'next-i18next';
import ApiDataService from 'src/services/ApiDataService';

const API_LOCATION = `${process.env.NEXT_PUBLIC_API_URL}fetch/search`;

const Searchbox = (props) => {
    const { t } = useTranslation('common');
    const [options, setOptions] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const handleSearch = (query) => {
        setIsLoading(true);
        ApiDataService.getwithSlug(API_LOCATION + `?q=${query}`)
            .then(response => {
                const options = response.data.result.map((i) => ({
                    url: i.SEARCH_LINK,
                    product: i.PRODUCT,
                    content: i.SEARCH_CONTENT,
                }));

                setOptions(options);
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="searchbar d-none d-md-block">
            <div className="max_content">
                <div className="searchbar_form mt-1 mb-3">

                    <Form.Group>
                        <InputGroup >
                            <InputGroup.Text style={{ backgroundColor: 'transparent', borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, borderBottom: '1px solid rgb(219 218 218)' }}><RiSearchLine size={24} color={'rgba(44, 44, 44, 0.83)'} /></InputGroup.Text>
                            <AsyncTypeahead id="SearchProduct"
                                isLoading={isLoading} labelKey="content" size="sm" minLength={2} onSearch={handleSearch} options={options}
                                placeholder={t("SearchProduct")} style={{ borderBottom: '1px solid rgb(219 218 218)' }} renderMenuItemChildren={(option, props) => {
                                    return (
                                        <>
                                            <LinkComponent href={'/' + option.url} className="custom-link">
                                                {option.product == option.content ? (
                                                    <>
                                                        {option.content}
                                                    </>
                                                ) : (
                                                    <>
                                                        {option.content} {option.product != null ? t('in') + ' ' + option.product : ''}
                                                    </>
                                                )}
                                            </LinkComponent>

                                        </>
                                    )
                                }}
                            />

                        </InputGroup>
                    </Form.Group>
                    {/* <RiSearchLine size={24} color={'rgba(44, 44, 44, 0.83)'} /> */}

                </div>
            </div>
        </div>
    );
}

export default Searchbox;