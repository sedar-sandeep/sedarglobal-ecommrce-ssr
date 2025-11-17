import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { useSelector, useDispatch, useStore } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { Container, Row, Col, Accordion, Card, AccordionContext, useAccordionButton, Form, Dropdown } from 'react-bootstrap';
import { BiSortAlt2, BiFilterAlt } from 'react-icons/bi';
import InputRange from 'react-input-range-rtl';
import { countryName, langName } from "@utils/i18n";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import LinkComponent from "@components/Link";
import { useTranslation } from "next-i18next";
import { isMobile } from "react-device-detect";
const CategoryBanner = dynamic(() => import(`../categoryBanner/categoryBanner`), {
  ssr: true
});

const FilterProduct = dynamic(() => import(`../OffcanvasMenus/FilterProduct`));

const SortProductItem = dynamic(() => import(`../Modals/SortProductItem`));

const MaterialList = dynamic(() => import(`../MaterialList/MaterialList`), {
  ssr: true,
  // loading: () =>
  //   <div>
  //     <HomeSkeleton />
  //   </div>
});

const site = Cookies.get('siteDetail');
let ccy_code = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_ccy_code ? JSON.parse(site).show_ccy_code : '';


function CustomToggle({ children, eventKey, callback }) {
  const currentEventKey = React.useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  return (
    <div onClick={decoratedOnClick}>
      {children}
      <span className={`iconcollapse ${langName === 'ar' ? 'float-start' : 'float-end'}`}>
        {currentEventKey.activeEventKey.indexOf(eventKey) != -1 ? "-" : "+"}
      </span>
    </div>

  );
}


function ItemFilterSidebar(props) {
  // const { isMOBILE, isTABLET, isLAPTOP, isDESKTOP } = useDevice();
  console.log(props,'ItemFilterSidebar');

  const { filterList, banner } = props;
  const { t } = useTranslation("common");
  const store = useSelector(store => store.filter);

  const checkbox = filterList?.CHECKBOX || [];
  const lov = filterList?.MAIN_CATEGORY || [];
  const filters = filterList?.FILTERS || [];
  const product = filterList?.PRODUCT || [];

  const siteDetail = useSelector(store => store.MenusItemReduser.siteDetail);

  let express_days = siteDetail != undefined && siteDetail != 'undefined' && siteDetail.express_days != 'undefined' ? siteDetail.express_days : 0;
  let ondemand_days = siteDetail != undefined && siteDetail != 'undefined' && siteDetail.ondemand_days != 'undefined' ? siteDetail.ondemand_days : 0;
  let instock_days = siteDetail != undefined && siteDetail != 'undefined' && siteDetail.instock_days != 'undefined' ? siteDetail.instock_days : 0;

  var datapush = [];
  var datapush_value = [];
  var filterpush = [];
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = useRouter();
  const { slug } = query;

  // const { setShow } = useLoader();
  const category_slug = slug && slug[0] ? slug[0] : undefined;
  const sub_category_slug = slug && slug[1] ? slug[1] : undefined;

  let history = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [comLoaded, setComIsLoaded] = useState(false);

  const [checkedValues, setCheckedValues] = useState([]);

  const [showside, setShowside] = useState(false);
  const handleClose = () => setShowside(false);
  const toggleShow = () => setShowside((s) => !s);

  const [modalShow, setModalShow] = React.useState(false);

  const [size, set_sizeWH] = useState({
    min_width: 0,
    max_width: 0,
    min_height: 0,
    max_height: 0,
  });
  const [isValid, setIsValid] = useState(true);
  const [min_size, set_minSize] = useState(0);
  const [max_size, set_maxSize] = useState(0);
  const [minMax_value, set_value] = useState({
    min: 0,
    max: 250,
  });
  const defaultItem = 6;
  const [showAllItem, setShowAllItem] = useState(defaultItem);
  let searchParams = new URLSearchParams(typeof window !== "undefined" && window.location ? window.location.search : "");


  for (var key of searchParams?.keys()) {
    datapush[key] = searchParams?.getAll(key)[0].split('|');
    filterpush.push(key.replace(' ', '_'));
    if (datapush[key] != undefined) {
      datapush_value.push(datapush[key].filter(Boolean).join(','))
    }
  }
  const handlePrice = (value) => {
    set_value(value);
  }


  useEffect(() => {
    if (filters) {
      filters.filter((item) => {
        if (item.SFT_CODE == '013') {
          set_value({
            min: parseInt(item.TAGS[0].MIN_PRICE),
            max: parseInt(item.TAGS[0].MAX_PRICE),
          });
        } else if (item.SFT_CODE == '012') {
          console.log(item)
          setTimeout(() => {
            let size_min_width = item.TAGS[0].MIN_WIDTH != undefined ? parseInt(item.TAGS[0].MIN_WIDTH) : 0;
            let size_max_width = item.TAGS[0].MAX_WIDTH != undefined ? parseInt(item.TAGS[0].MAX_WIDTH) : 0;
            let size_min_height = item.TAGS[0].MIN_HEIGHT != undefined ? parseInt(item.TAGS[0].MIN_HEIGHT) : 0;
            let size_max_height = item.TAGS[0].MAX_HEIGHT != undefined ? parseInt(item.TAGS[0].MAX_HEIGHT) : 0;
            let width_standard = item.TAGS[0].SPI_WIDTH_STANDARD != undefined ? parseInt(item.TAGS[0].SPI_WIDTH_STANDARD) : 0;
            let height_standard = item.TAGS[0].SPI_HEIGHT_STANDARD != undefined ? parseInt(item.TAGS[0].SPI_HEIGHT_STANDARD) : 0;
            set_sizeWH({
              min_width: size_min_width,
              max_width: size_max_width,
              min_height: size_min_height,
              max_height: size_max_height,
            });


            set_minSize(width_standard);
            set_maxSize(height_standard);
            let searchParams = new URLSearchParams(typeof window !== "undefined" && window.location ? window.location.search : "");
            if (router.query.min != undefined && router.query.max != undefined) {
              set_minSize(parseInt(router.query.min));
              set_maxSize(parseInt(router.query.max));
            } else {
              if (sub_category_slug != 'mural-wallpaper') {
                searchParams.set('min', width_standard);
                searchParams.set('max', height_standard);
              }
            }

          }, 3000);


        }
      });
    }

  }, [filters]);

  const size_filtercomplete = (value, type) => {
    let pathname = typeof window !== "undefined" && window.location ? window.location.pathname : ""
    let searchParams = new URLSearchParams(typeof window !== "undefined" && window.location ? window.location.search : "");
    if (type == 'min') {
      searchParams.set('min', value);
      searchParams.set('max', max_size);
      datapush[type] = [value];
    }
    if (type == 'max') {
      searchParams.set('min', min_size);
      searchParams.set('max', value);
      datapush[type] = [value];
    }

    // useLoader(false);
    //router.push(pathname + '?' + searchParams, undefined, { scroll: false });


    if (category_slug == 'curtains-and-drapes' || category_slug == 'wallpaper' || category_slug == 'folding-doors') {
      router.push(pathname + '?' + searchParams, undefined, { scroll: false });
    } else if (typeof window !== "undefined" && window.location) {
      window.history.replaceState({}, '', pathname + '?' + searchParams);
    }

  }

  const ContentLoader = () => {
    return (
      <Row>
        <Col xs={9}>
          <Skeleton count={10} height={'4vh '} />
        </Col>
        <Col xs={3}>
          <Skeleton count={10} height={'4vh '} />
        </Col>
      </Row>
    )
  }

  if (isLoaded) {
    return (
      <>
        <ContentLoader />
      </>
    );
  } else {

    const handleChecked = (itemIndex, newsChecked) => {
      const updatedListOfCheckbox = [...checkbox];
      updatedListOfCheckbox[itemIndex].is_checked = newsChecked;
      //setcheckbox(updatedListOfCheckbox);

      const slug_url = updatedListOfCheckbox[itemIndex].slug_url;
      let newCheckedValues = checkedValues.filter(item => item !== slug_url);
      if (updatedListOfCheckbox[itemIndex].is_checked) newCheckedValues.push(slug_url);

      if (slug_url == sub_category_slug) {
        const index = newCheckedValues.indexOf(sub_category_slug);
        if (index == -1) {
          newCheckedValues.splice(index, 1);
        }
        return false;
      } else {
        sub_category_slug.split('--').filter((item) => {
          if (item !== slug_url) {
            newCheckedValues.push(item)
          }
        })
      }

      history.push(newCheckedValues.join('--'))


    };

    const handleTagChecked = (filter, value, row, product = 0) => {

      let key = product ? product : filter;
      let pathname = typeof window !== "undefined" && window.location ? window.location.pathname : ""
      let searchParams = new URLSearchParams(typeof window !== "undefined" && window.location ? window.location.search : "");
      if (searchParams.get('page') == 1) {
        searchParams.delete('page');
      }
      if (searchParams.get(key)) {
        if (datapush[key]) {
          let i = datapush[key].indexOf(value.DESCRIPTION_EN);
          if (i !== -1) {
            datapush[key].splice(i, 1);
          } else {
            datapush[key].push(value.DESCRIPTION_EN);
          }

        } else {
          datapush[key] = [value.DESCRIPTION_EN];
        }

        setComIsLoaded(!comLoaded);
        if (datapush[key].length == 0) {
          searchParams.delete(key);
          // searchParams.delete(id);
        } else {

          searchParams.set(key, datapush[key].join('|'));
        }
      } else {
        datapush[key] = [value.DESCRIPTION_EN];
        searchParams.append(key, value.DESCRIPTION_EN);
      }
      for (var keys of searchParams.keys()) {
        filterpush.push(keys.replace(' ', '_'));
        datapush[keys] != undefined ? datapush_value.push(datapush[keys].filter(Boolean).join(',')) : [];
      }
      window.history.replaceState({}, '', pathname + '?' + searchParams);
      router.push(pathname + '?' + searchParams, undefined, { scroll: false });
      setShowside(false);
    }

    const clearAll = () => {
      let pathname = typeof window !== "undefined" && window.location ? window.location.pathname : ""
      datapush.push();
      filterpush.push();
      datapush_value.push()
      router.push(pathname, undefined, { scroll: false });
    }

    let leaderQty = Number((min_size * max_size / 10000));
    leaderQty = Math.round(leaderQty * 100) / 100;

    const filter_subCategory = product && product.filter(product => {
      return product.SC_SHOW_IN_FILTER_YN === 'Y';
    });



    const minOptions = [];
    for (let i = size.min_width > 1 ? size.min_width : 0; i <= size.max_width; i += 5) {
      minOptions.push(<option key={i} value={i}>{i}</option>);
    }

    const maxoptions = [];
    for (let i = size.min_height > 1 ? size.min_height : 0; i <= size.max_height; i += 5) {
      maxoptions.push(<option key={i} value={i}>{i}</option>);
    }

    return (
      <>
        {/* <Row>
          <Col> */}
        <CategoryBanner {...banner || ''} />
        {/* </Col>
        </Row> */}

        {isMobile && (
          <Row xs={12} sm={12} className="mb-1 border-bottom border-top position-sticky" style={{ zIndex: "13", top: "99px", margin: 0 }}>
            <Col>
              <Row className="d-flex text-center border-bottom bg-light" role="button" >

                <Col xs={6} className="py-3 border-end" onClick={() => setModalShow(true)}>
                  <span className="align-middle"> <BiSortAlt2 /> {t("Sort")}</span>
                </Col>
                <Col xs={6} className="py-3" onClick={toggleShow}>
                  <span className="align-middle"> <BiFilterAlt /> {t('Filter')} </span>
                </Col>
                {showside &&
                  <FilterProduct
                    showside={showside}
                    onHide={handleClose}
                    handleTagChecked={handleTagChecked}
                    handleChecked={handleChecked}
                    clearAll={clearAll}
                    datapush={datapush}
                    set_minSize={set_minSize}
                    set_maxSize={set_maxSize}
                    handlePrice={handlePrice}
                    min_size={min_size}
                    max_size={max_size}
                    ccy_code={ccy_code}
                    filter_subCategory={filter_subCategory}
                    size_filtercomplete={size_filtercomplete}
                    siteDetail={siteDetail}
                    {...filterList}
                    size={size}
                    minMax_value={minMax_value}
                  // key={key}
                  />
                }
                {modalShow &&
                  <SortProductItem show={modalShow} onHide={() => setModalShow(false)} {...filterList} handleTagChecked={handleTagChecked} />
                }

              </Row>

              {/*
              <Row>
              {filters && filters.map((filter, key) => {
                if (filter.SFT_CODE == '012') {

                  
                  
                  return (
                    <Card key={1} className="border-0">
                      <Card.Body className="pt-0 pb-0">
                        {filter.SIZE_FILTER_BY == 'RANGE' ? (
                          <Row>
                            <Col xs={6} sm={6} md={6} xl={6} className="mb-2" >
                              <small>{category_slug == 'wallpaper' ? t("wall_Width") : t("Width")}</small>
                               
                              <Form.Select name="m_width" value={min_size} onChange={(e) => { set_minSize(e.target.value), size_filtercomplete(e.target.value, 'min') }}>
                                {minOptions}
                              </Form.Select>
                            </Col>
                            <Col xs={6} sm={6} md={6} xl={6} className="mb-2" >
                              <small>{category_slug == 'wallpaper' ? t("wall_Height") : t("Height")} </small>
                                <Form.Select name="m_width" value={max_size} onChange={(e) => { set_maxSize(e.target.value), size_filtercomplete(e.target.value, 'max') }}>
                                  {maxoptions}
                                </Form.Select>

                            </Col>
                          </Row>
                        ) :
                          ('')
                        }
                      </Card.Body>

                    </Card>
                  );
                }
              })}
              </Row>
            */}
            </Col>
          </Row>
        )}

        <Container className="productPage">
          <Row>
            {!isMobile && (
              <Col className="FilterSidebar pb-4 d-none d-md-block foritemfiltersidebar h-100" md={3}>
                <Row className="filterheading">
                  <Col>
                    <div className="filterhead">
                      <h3 className="py-2">
                        {t('Filter')}
                      </h3>
                    </div>
                  </Col>
                  <Col>
                    <span className={`ClearAll pt-2 ${langName === 'ar' ? 'float-start' : 'float-end'}`} onClick={clearAll} role="button">
                      {t('ClearAll')}
                    </span>
                  </Col>
                </Row>
                {/* <Row>
                <Col className="result" >
                  <p>{parse(t('ofResults', { show_page: show_page, total_listings: total_listings }))} </p>
                </Col>
              </Row> */}
                <Row>
                  <Col>
                    <Accordion defaultActiveKey={[0, 1, 2, 3, 4, 5, 6, 7, 8]} className="footercollapse" alwaysOpen>
                      {filters && filters.map((filter, key) => {
                        if (filter.SFT_CODE == '012') {
                          return (
                            <Card key={1}>
                              <Card.Header>
                                <CustomToggle eventKey={1}>{filter.DESCRIPTION} </CustomToggle>
                              </Card.Header>
                              <Accordion.Item eventKey={1}>
                                <Accordion.Body className="pb-2">
                                  <Card.Body>
                                    {filter.SIZE_FILTER_BY == 'RANGE' ? (
                                      <Row style={{ width: "96%" }}>
                                        <Col sm={12} md={12} xl={6} className="my-2">
                                          <label className="mb-2 rangefilter text-dark">{category_slug == 'wallpaper' ? t("wall_Width") : t("Width")} </label>
                                          <InputRange
                                            step={5}
                                            maxValue={size.max_width ? size.max_width : 100}
                                            minValue={size.min_width ? size.min_width : 10}
                                            formatLabel={value => `${value} ${t("cm")}`}
                                            value={min_size ? min_size : 50}
                                            onChange={(value) => set_minSize(value)}
                                            onChangeComplete={(value) => size_filtercomplete(value, 'min')}
                                            direction={langName === 'ar' ? 'rtl' : 'ltr'}
                                          />
                                        </Col>
                                        <Col sm={12} md={12} xl={6} className="my-2">
                                          <label className="mb-2 rangefilter text-dark">{category_slug == 'wallpaper' ? t("wall_Height") : t("Height")} </label>
                                          <InputRange
                                            step={5}
                                            maxValue={size.max_height ? size.max_height : 100}
                                            minValue={size.min_height ? size.min_height : 10}
                                            formatLabel={value => `${value} ${t("cm")}`}
                                            value={max_size ? max_size : 50}
                                            onChange={(value) => set_maxSize(value)}
                                            onChangeComplete={(value) => size_filtercomplete(value, 'max')}
                                            direction={langName === 'ar' ? 'rtl' : 'ltr'}
                                          />
                                        </Col>
                                      </Row>
                                    ) :
                                      (filter.TAGS && filter.TAGS.map((type) => (
                                        type.SPI_WIDTH_STANDARD && type.SPI_WIDTH_STANDARD.map((val, key) => {
                                          let prodDesc = datapush['size'] && datapush['size'].indexOf(val + ',' + type.SPI_HEIGHT_STANDARD[key]) >= 0 ? true : false;
                                          return (
                                            <Form.Check id={`check-api-${val}`} className="filtercheckbox" key={key}>
                                              <div className="d-flex align-items-center">
                                                <Form.Check.Input type="checkbox" onChange={() => handleTagChecked('size', { DESCRIPTION_EN: `${val},${type.SPI_HEIGHT_STANDARD[key]}` }, key)} checked={prodDesc} />
                                                <Form.Check.Label>{`${val} * ${type.SPI_HEIGHT_STANDARD[key]} ${t("cm")}`}</Form.Check.Label>



                                              </div>
                                            </Form.Check>
                                          )
                                        })
                                      ))
                                      )
                                    }
                                  </Card.Body>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Card>
                          );
                        }
                        else if (filter.SFT_CODE == '014') {
                          return (
                            <Card key={key}>
                              <Card.Header>
                                <CustomToggle eventKey={key + 2}>{filter.DESCRIPTION}</CustomToggle>
                              </Card.Header>
                              <Accordion.Item eventKey={key + 2} key={key}>
                                <Accordion.Body>
                                  <Card.Body>
                                    {filter.TAGS &&
                                      filter.TAGS.slice(0, showAllItem).map((type, tagkey) => {
                                        let prodDesc = datapush[filter.DESCRIPTION_EN] && datapush[filter.DESCRIPTION_EN].indexOf(type.DESCRIPTION_EN) >= 0 ? true : false;
                                        if (type.STG_SYS_ID == '324168' && express_days > 0) {
                                          return (

                                            <Form.Check id={`check-api-${type.DESCRIPTION}`} className="filtercheckbox" key={tagkey}>
                                              <div className="d-flex">
                                                <Form.Check.Input type="checkbox" onChange={() => handleTagChecked(filter.DESCRIPTION_EN, type, key)} checked={prodDesc} />
                                                <Form.Check.Label>{`${type.DESCRIPTION}`} </Form.Check.Label>
                                              </div>
                                            </Form.Check>

                                          )
                                        } else if (type.STG_SYS_ID == '324169' && instock_days > 0) {
                                          return (

                                            <Form.Check id={`check-api-${type.DESCRIPTION_EN}`} className="filtercheckbox" key={tagkey}>
                                              <div className="d-flex align-items-center">
                                                <Form.Check.Input type="checkbox" onChange={() => handleTagChecked(filter.DESCRIPTION_EN, type, key)} checked={prodDesc} />
                                                <Form.Check.Label>{`${type.DESCRIPTION}`} </Form.Check.Label>
                                              </div>
                                            </Form.Check>

                                          )
                                        } else if (type.STG_SYS_ID == '324170' && ondemand_days > 0) {
                                          return (

                                            <Form.Check id={`check-api-${type.DESCRIPTION_EN}`} className="filtercheckbox" key={tagkey}>
                                              <div className="d-flex align-items-center">
                                                <Form.Check.Input type="checkbox" onChange={() => handleTagChecked(filter.DESCRIPTION_EN, type, key)} checked={prodDesc} />
                                                <Form.Check.Label>{`${type.DESCRIPTION}`} </Form.Check.Label>
                                              </div>
                                            </Form.Check>

                                          )
                                        }

                                      })}
                                    {filter.TAGS && filter.TAGS.length > 6 && showAllItem != filter.TAGS.length ? <> <h6 className="text-warning bold ps-4 py-3" onClick={() => setShowAllItem(filter.TAGS.length)}><u>{t("More")} </u>  </h6> </> : filter.TAGS.length > 6 ? <> <h6 className="text-warning bold ps-4 py-3" onClick={() => setShowAllItem(defaultItem)}> <u>{t("Less")}</u> </h6> </> : ''}
                                  </Card.Body>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Card>
                          );
                        } else {
                          return ('');
                        }
                      }
                      )
                      }


                      <Card>
                        <Card.Header>
                          <CustomToggle eventKey={2}>{t('Products')} </CustomToggle>
                        </Card.Header>
                        <Accordion.Item eventKey={2}>
                          <Accordion.Body>
                            <Card.Body>
                              <div className="filtercontent">
                                <Form>
                                  <Form.Group>
                                    <Form.Label className="contentheading"> {t('ProductCategory')}</Form.Label>

                                    <Dropdown className="pb-3">
                                      <Dropdown.Toggle id="dropdown-basic" className="category_slug" variant="light">
                                        {lov && lov.filter(category => category.SC_LINK_URL == category_slug).map(row => (
                                          row.DESCRIPTION
                                        ))}
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        {lov && lov.map((i, key) => (
                                          <Dropdown.ItemText key={key}>
                                            {/* <LinkComponent href={i.slug_url} > */}
                                            <LinkComponent href={i.SC_REDIRECT_TO == 'OTHER' ? i.SC_REDIRECT_URL : i.SC_LINK_URL} >
                                              {i.DESCRIPTION}
                                            </LinkComponent>
                                          </Dropdown.ItemText>
                                        ))}
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </Form.Group>

                                  {lov && lov.filter(category => category.SC_LINK_URL == category_slug).map((row) =>
                                  (row && row.CATEGORY.map((type, key) => (
                                    <Form.Check id={`check-api-${type.DESCRIPTION}`} className="filtercheckbox" key={key}>
                                      <div >
                                        <LinkComponent href={type.SC_REDIRECT_TO == 'OTHER' ? type.SC_REDIRECT_URL : `${category_slug}/${type.SC_LINK_URL}`} className="d-flex align-items-center" >
                                          <Form.Check.Input type="checkbox" checked={type.SC_LINK_URL == sub_category_slug ? true : false} defaultChecked={type.SC_LINK_URL == sub_category_slug ? true : false} />
                                          <Form.Check.Label>{type.DESCRIPTION}</Form.Check.Label>
                                        </LinkComponent>

                                      </div>
                                    </Form.Check>
                                  ))
                                  )
                                  )}

                                </Form>
                              </div>
                            </Card.Body>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Card>

                      {filter_subCategory && filter_subCategory.length > 0 ? (
                        <Card>
                          <Card.Header>
                            <CustomToggle eventKey={3}>{t('SubCategory')} </CustomToggle>
                          </Card.Header>
                          <Accordion.Item eventKey={3}>
                            <Accordion.Body>
                              <Card.Body>
                                <div className="filtercontent">
                                  <Form>
                                    {product && product.map((row, key) => {
                                      let prodDesc = datapush['product'] && datapush['product'].indexOf(row.DESCRIPTION_EN) >= 0 ? true : false;
                                      if (row.SC_SHOW_IN_FILTER_YN == 'Y') {
                                        return (
                                          <Form.Check id={`check-api-${row.DESCRIPTION}`} className="filtercheckbox" key={key}>
                                            <div className="d-flex align-items-center">
                                              <Form.Check.Input type="checkbox" onChange={() => handleTagChecked(row.SC_DESC, row, key, 'product')} checked={prodDesc} />
                                              <Form.Check.Label>{row.DESCRIPTION} {prodDesc}</Form.Check.Label>
                                            </div>
                                          </Form.Check>

                                        )
                                      } else {
                                        return ('');
                                      }
                                    })}

                                  </Form>
                                </div>
                              </Card.Body>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Card>
                      ) : ('')}

                      {filters && filters.map((filter, key) => {
                        if (filter.SFT_CODE != '010' && filter.SFT_CODE != '012' && filter.SFT_CODE != '013' && filter.SFT_CODE != '014') {
                          return (
                            <Card key={key}>
                              <Card.Header>
                                <CustomToggle eventKey={key + 2}>{filter.DESCRIPTION}</CustomToggle>
                              </Card.Header>
                              <Accordion.Item eventKey={key + 2} key={key}>
                                <Accordion.Body>
                                  <Card.Body>
                                    {filter.TAGS &&
                                      filter.TAGS.slice(0, showAllItem).map((type, tagkey) => {
                                        let prodDesc = datapush[filter?.DESCRIPTION_EN] && datapush[filter?.DESCRIPTION_EN]?.indexOf(type?.DESCRIPTION_EN) >= 0 ? true : false;

                                        return (
                                          <Form.Check id={`check-api-${type.DESCRIPTION_EN}`} className="filtercheckbox" key={tagkey}>
                                            <div className="d-flex align-items-center">
                                              <Form.Check.Input type="checkbox" onChange={() => handleTagChecked(filter.DESCRIPTION_EN, type, key)} checked={prodDesc} />
                                              <Form.Check.Label>{type.DESCRIPTION}</Form.Check.Label>
                                            </div>
                                          </Form.Check>
                                        )
                                      })}
                                    {filter.TAGS.length > 6 && showAllItem != filter.TAGS.length ? <> <h6 className="text-warning bold ps-4 py-3" onClick={() => setShowAllItem(filter.TAGS.length)}><u>{t("More")} </u>  </h6> </> : filter.TAGS.length > 6 ? <> <h6 className="text-warning bold ps-4 py-3" onClick={() => setShowAllItem(defaultItem)}> <u>{t("Less")}</u> </h6> </> : ''}
                                  </Card.Body>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Card>
                          )
                        } else if (filter.SFT_CODE == '013') {
                          return (
                            <Card key={key}>
                              <Card.Header>
                                <CustomToggle eventKey={key + 4}>{filter.DESCRIPTION} </CustomToggle>
                              </Card.Header>
                              <Accordion.Item eventKey={key + 4}>
                                <Accordion.Body>
                                  <Card.Body >
                                    <Row style={{ width: "96%" }}><Col>
                                      <InputRange
                                        maxValue={filter.TAGS && filter.TAGS[0] && filter.TAGS[0].MAX_PRICE ? parseInt(filter.TAGS[0].MAX_PRICE) : 100}
                                        minValue={filter.TAGS & filter.TAGS[0] && filter.TAGS[0].MIN_PRICE ? parseInt(filter.TAGS[0].MIN_PRICE) : 10}
                                        formatLabel={value => `${value} ${ccy_code}`}
                                        value={minMax_value ? minMax_value : 50}
                                        onChange={(value) => handlePrice(value)}
                                        onChangeComplete={value => console.log(value, 'value')}
                                      />
                                    </Col>
                                    </Row>
                                  </Card.Body>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Card>
                          );
                        }
                      }
                      )}

                    </Accordion>

                  </Col>
                </Row>
              </Col>
            )}
            <Col md={isMobile ? 12 : 9}>
              <MaterialList materialList={props.materialList} {...props} category_slug={category_slug} sub_category_slug={sub_category_slug} size_filter_value={(category_slug == 'curtains-and-drapes' || category_slug == 'wallpaper' || category_slug == 'folding-doors') ? 0 : (leaderQty)} filters={datapush} handleTagChecked={handleTagChecked} comLoaded={comLoaded} setShowside={() => setShowside(false)} />
            </Col>
          </Row>
        </Container>


      </>
    )
  }
}

export default ItemFilterSidebar;
