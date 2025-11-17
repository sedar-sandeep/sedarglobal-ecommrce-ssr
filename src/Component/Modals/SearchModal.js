import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { RiSearchLine } from 'react-icons/ri'
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import ApiDataService from '../../services/ApiDataService';
import { useTranslation } from 'next-i18next';
import LinkComponent from '@components/Link';

const API_LOCATION = `${process.env.NEXT_PUBLIC_API_URL}fetch/search`;

const SearchModal = (props) => {
  const { t } = useTranslation('common');
  
  const [singleSelections, setSingleSelections] = useState([]);
  let searchList = ['Product', 'Blinds', 'Blinds', 'Blinds', 'Blinds', 'Blinds', 'Blinds', 'Blinds', 'Blinds', 'Blinds', 'Blinds', 'Blinds', 'Blinds', 'Blinds', 'Blinds', 'Blinds']

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const filterBy = () => true;

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
        //console.log(error);
      });
  };

  return (
    <>

      <Modal {...props}
        aria-labelledby="example-custom-modal-styling-title"
        dialogClassName="w-100 SearchModal m-0"
        centered>
        <div className="close-button" onClick={props.onHide}> ✕ </div>
        <Modal.Body>
          <div className='SearchModal-wrapper'>
            <div className="searchbar">
              <div className="searchbar_form">
                <RiSearchLine size={40} color={`#fff`} />
                {/* <input className="searchicon_inp ps-3" type="text" placeholder="Search" /> */}
                {/* <Typeahead
                  id="searchList-mobile-typeahead-id"
                  onChange={setSingleSelections}
                  options={searchList}
                  placeholder={t("SearchProduct")}
                  selected={singleSelections}
                  className="searchicon_inp ps-3"
                /> */}


                <AsyncTypeahead
                  id="SearchProduct"
                  className="searchicon_inp ps-3 bg-transparent"
                  filterBy={filterBy}
                  isLoading={isLoading}
                  labelKey="content"
                  minLength={2}
                  onSearch={handleSearch}
                  options={options}
                  placeholder={t("SearchProduct")}
                  renderMenuItemChildren={(option, props) => (
                    <LinkComponent href={`${option.url}${option.product != null ? '?product=' + option.product : ''}`} className="custom-link">
                      {option.product == option.content ? (
                        <>
                          {option.content}
                        </>
                      ) : (
                        <>
                          {option.content} {option.product != null ? t('in') + ' ' + option.product : ''}aa
                        </>
                      )}
                    </LinkComponent>

                  )}
                />
              </div>
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </>

  );
}
SearchModal.propTypes = {};

SearchModal.defaultProps = {};

export default SearchModal;
