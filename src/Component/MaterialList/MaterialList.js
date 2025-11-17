import _ from "lodash";
import React, { useState, useEffect } from 'react';
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Breadcrumb, Dropdown, Container, Form } from 'react-bootstrap';
import { useTranslation } from "next-i18next";
import Cookies from "js-cookie";
import { countryName, langName } from "@utils/i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import Material from "./Material";
import { faSquare, faTh, faThLarge } from "@fortawesome/free-solid-svg-icons/index";
import LinkComponent from "@components/Link";
import PlpShema from "@components/PlpSchema";

const site_id = process.env.NEXT_PUBLIC_SITE_ID; //100001;
const lang = langName //i18next.language; //'en';
const country = countryName;
const API_LOCATION = process.env.NEXT_PUBLIC_API_URL;
const API_PATH = API_LOCATION + `material/third?site=${site_id}&lang=${lang}&country=${country}&content=item_info_listing`;
const FILTER_API_PATH = API_LOCATION + `material/second?site=${site_id}&lang=${lang}&country=${country}&content=item_info_listing`;
const page_type = 'browse_collection';



const Pagination = (props) => {
  const { active, size, step, onClickHandler } = props;
  const showingNumbers = step * 2 + 1;
  let startNumber = 2;
  let startArrayNumber = props.step;

  let needStartDots = false;
  let needEndDots = false;

  if (active > step) {
    startArrayNumber = active - step;

    needStartDots = active > step + startNumber ? true : false;
  }

  if (size > showingNumbers) {
    {
      needEndDots = size > active + step + 1 ? true : false;

      if (size < active + step + 1) {
        startArrayNumber = size - showingNumbers;
      }
    }
  }

  let contentNumber;

  return (
    <ul className="pagination">
      {active > 1 ? (
        <li
          className="page-item prev arrow-icon"
          onClick={() => onClickHandler(active - 1)}
        >
          &#x2039;
        </li>
      ) : (
        <li className="page-item prev arrow-icon disabled">&#x2039;</li>
      )}

      {size > showingNumbers + startNumber ? (
        <>
          <li
            onClick={(e) => onClickHandler(e.currentTarget.textContent)}
            className={`page-item ${active === 1 && "active"}`}
          >
            1
          </li>

          {needStartDots && <span>....</span>}
          {_.times(showingNumbers, (i) => (
            <li
              key={i++}
              {...(contentNumber = needStartDots
                ? startArrayNumber
                : startNumber)}
              {...startNumber++}
              {...startArrayNumber++}
              className={`page-item ${active == contentNumber && "active"}`}
              onClick={(e) => onClickHandler(e.currentTarget.textContent)}
            >
              {contentNumber}
            </li>
          ))}
          {needEndDots && <span>....</span>}
          <li
            className={`page-item ${active == size && "active"}`}
            onClick={(e) => onClickHandler(e.currentTarget.textContent)}
          >
            {size}
          </li>
        </>
      ) : (
        ((startArrayNumber = 1),
          _.times(size, (i) => (
            <li
              key={i++}
              className={`page-item ${active == startArrayNumber && "active"}`}
              onClick={(e) => onClickHandler(e.currentTarget.textContent)}
            >
              {startArrayNumber++}
            </li>
          )))
      )}

      {active < size ? (
        <li
          className="page-item next arrow-icon"
          onClick={() => onClickHandler(active + 1)}
        >
          &#8250;
        </li>
      ) : (
        <li className="page-item next arrow-icon disabled">&#8250;</li>
      )}
    </ul>
  );
};

const ContentLoader = () => {
  return (
    <>
      <Row >

        <Col xs={6} sm={4}>
          <Skeleton count={1} height={400} />
        </Col>
        <Col xs={6} sm={4}>
          <Skeleton count={1} height={400} />
        </Col>
        <Col xs={6} sm={4}>
          <Skeleton count={1} height={400} />
        </Col>
        <Col xs={6} sm={4}>
          <Skeleton count={1} height={400} />
        </Col>
        <Col xs={6} sm={4}>
          <Skeleton count={1} height={400} />
        </Col>
        <Col xs={6} sm={4}>
          <Skeleton count={1} height={400} />
        </Col>
      </Row>
      <Row className="my-3">
        <Col xs={6} sm={4}>
          <Skeleton count={1} height={400} />
        </Col>
        <Col xs={6} sm={4}>
          <Skeleton count={1} height={400} />
        </Col>
        <Col xs={6} sm={4}>
          <Skeleton count={1} height={400} />
        </Col>
        <Col xs={6} sm={4}>
          <Skeleton count={1} height={400} />
        </Col>
        <Col xs={6} sm={4}>
          <Skeleton count={1} height={400} />
        </Col>
        <Col xs={6} sm={4}>
          <Skeleton count={1} height={400} />
        </Col>

      </Row>
    </>
  )
}


const NoStructure = () => (
  <>Structure Not Created....</>
)
const MaterialList = (props) => {
  const { materialList, filterList } = props;
  const { t } = useTranslation("common");
  const router = useRouter();
  const { query, locale } = router;

  const [active, setActive] = useState(1);
  const [state, setState] = useState({
    show: false,
    item: false,
    divGrid: 4
  });

  const [showloader, setshowloader] = useState(false)
  const { slug } = query;

  let sub_category_slug = slug && slug[1] || undefined;
  const listings = materialList?.MATERIAL[0] || [];
  const breadcrumb = materialList?.BREADCRUMB || '';
  const total_listings = materialList?.MATERIAL[1] || 0;
  // console.log(breadcrumb, 'breadcrumb');

  const filters = filterList?.FILTERS || [];


  const noStructure = useSelector(store => store.filter.noStructure);
  const prev_slug = typeof window !== "undefined" && window.sessionStorage && window.sessionStorage.getItem ? window.sessionStorage.getItem("prev_slug") : '';
  var datapush = [];
  var datapush_value = [];
  var filterpush = [];

  let searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");

  let pageNumber = searchParams.getAll('page')[0] == undefined ? 0 : Cookies.get('browse_country') != country ? Number(parseInt(searchParams.getAll('page')[0]) * 21 - 21) : 0;


  React.useEffect(() => {
    if (Cookies.get('browse_country') != country) {
      pageNumber = 0;
      Cookies.set('browse_country', country);
      // searchParams.set('page', 1);
      setActive(1);
      console.log(pageNumber, 'pageNumberpageNumber1')
      let pathname = typeof window !== "undefined" && window.location.pathname;
      typeof window != undefined && window.history.replaceState({}, '', pathname + '?' + searchParams);
      router.push(pathname + '?' + searchParams, undefined, { scroll: false })
    }
    props.setShowside();
    if (typeof window !== "undefined" && window.sessionStorage && prev_slug != sub_category_slug) {
      window.sessionStorage.setItem("prev_slug", sub_category_slug);
      delete router.query['page'];
      setActive(1);
      console.log(pageNumber, 'pageNumberpageNumber3')
    }
  }, [router])


  pageNumber = pageNumber == NaN ? 0 : pageNumber;

  for (var key of searchParams.keys()) {
    datapush[key] = searchParams.getAll(key)[0]?.split('|');
    //filterpush.push(key.replaceAll(' ', '_'));
    filterpush.push(key.replace(' ', '_'));
    datapush_value.push(datapush[key].filter(Boolean).join(','))
  }

  const activeHandler = (clickedActive) => {
    let pathname = location.pathname;
    const _pageNumber = parseInt(clickedActive);
    setActive(_pageNumber);

    if (_pageNumber <= 1) {
      delete router.query['page'];
      router.push({
        pathname,
        query: {
          ...router.query,
        },
        undefined,
        scroll: false
      });
    } else {

      router.push({
        pathname,
        query: {
          ...router.query,
          page: [_pageNumber]
        },
        undefined,
        scroll: false
      });
    }
  };

  useEffect(() => {
    if (props.type == 'free_sample') {
      setState({ ...state, divGrid: 3 });
    }
  }, [props]);

  useEffect(() => {
    if (showloader) {
      setshowloader(false)
    }
  }, [showloader]);

  useEffect(() => {
    if (searchParams.get('page') == null) {
      setActive(1);
      console.log(pageNumber, 'pageNumberpageNumber4')
    } else {
      console.log(pageNumber, 'pageNumberpageNumber2')
      setActive(parseInt(searchParams.get('page')));
    }
  }, [parseInt(searchParams.get('page'))]);


  const handleTagChecked = (filter, value, row, product = 0) => {
    let pathname = typeof window !== "undefined" ? window.location.pathname : ""
    router.push({
      pathname,
      query: {
        ...router.query,
        [filter]: [value.DESCRIPTION_EN]
      },
      undefined,
      scroll: false
    });
  }

  return (
    <>
      {listings &&
        <PlpShema listings={listings} total_listings={total_listings} router={router} banner={props?.banner?.BANNER || {}} />
      }
      <Col className="MaterialList" id="material_list">

        {props.type == 'free_sample' && (
          <div className="choose_product_heading">
            <hr />
            <Container fluid>
              <Row className="align-items-center">
                <Col sm={12} md={4}>
                  <h2> <span> {t("STEP_3")} : </span> {t("order_your_desired_sample")} </h2>
                </Col>
                <Col sm={4} className="d-none d-md-block">
                  <div className="selected_product">
                    <h5> <span> {props.product_name} </span></h5>
                    {total_listings > 0 && (
                      <p>{total_listings} {t("Swatches_Below")}</p>
                    )}
                  </div>
                </Col>
                <Col sm={4} className="d-none d-md-block">
                  <div className={`${lang == 'ar' ? 'float-start' : 'float-end'} sample_filter`}>
                    <Dropdown>
                      <Dropdown.Toggle variant="Light" id="dropdown-basic" className={'text-start'}>
                        {t("Color_Filter")}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>

                        {filters && filters.map((filter, key) => (
                          filter.SFT_CODE == '009' && filter.TAGS && filter.TAGS.map((i) => (
                            <Dropdown.ItemText role="button" key={key} onClick={() => handleTagChecked(filter.DESCRIPTION, i, key)}>
                              {i.DESCRIPTION}
                            </Dropdown.ItemText>
                          )
                          )
                        )
                        )}

                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Col>
              </Row>
            </Container>

            <hr />
          </div>
        )}
        {props.type != 'free_sample' && (
          <>
            <Row>
              <Col>
                <Breadcrumb>
                  {breadcrumb && (
                    <Breadcrumb.Item href={`/${locale}`}>{t("Home")}</Breadcrumb.Item>
                  )}
                  {breadcrumb.PARENT_LINK_URL && (
                    <Breadcrumb.Item linkProps={{ to: `/${breadcrumb.PARENT_LINK_URL}` }} linkAs={LinkComponent}> {breadcrumb.LINK_PATH?.split('/')[1]}</Breadcrumb.Item>
                  )}

                  {breadcrumb.PARENT_LINK_URL && (
                    <Breadcrumb.Item active>{breadcrumb.LINK_PATH?.split('/')[2]}</Breadcrumb.Item>
                  )}
                </Breadcrumb>
              </Col>
            </Row>

            <Row className="mb-2 mb-md-3 materialtopbar p-3 align-items-center d-none d-md-flex">
              <Col sm={5} md={5} lg={5} xl={4}>
                <Row className="align-items-center d-none d-md-block" >
                  <Col sm="7" className="p-md-0 px-lg-0">
                    <Dropdown className="category_slug" size="lg">
                      <Dropdown.Toggle variant="light" id="dropdown-basic" className="category_slug_toggle" size="lg">
                        {t('SortBy')}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {filters && filters.map((filter, key) => (
                          filter.SFT_CODE == '010' && filter.TAGS && filter.TAGS.map((i, rkey) => {
                            let prodDesc = datapush[filter.DESCRIPTION_EN] && datapush[filter.DESCRIPTION_EN].indexOf(i.DESCRIPTION_EN) >= 0 ? true : false;
                            return (
                              <Dropdown.ItemText role="button" key={rkey} onClick={() => handleTagChecked(filter.DESCRIPTION_EN, i, key)}>


                                <Form.Check type="checkbox" id={`check-api-${rkey}`} className="filtercheckbox" key={rkey}>
                                  <div className="d-flex align-items-center">
                                    <Form.Check.Input type="checkbox" checked={prodDesc} style={{ marginTop: 0, marginRight: '5px' }} />
                                    <Form.Check.Label>{i.DESCRIPTION}</Form.Check.Label>
                                  </div>
                                </Form.Check>
                              </Dropdown.ItemText>
                            )
                          }
                          )
                        )
                        )}
                      </Dropdown.Menu>
                    </Dropdown>

                  </Col>
                </Row>

              </Col>
              <Col className="grid-border d-none d-sm-block" sm={5} md={4} lg={3} xl={2}>
                <Row>
                  <Col sm={4} onClick={() => setState({ ...state, divGrid: 6 })} className={state.divGrid == 6 ? 'active' : ''} >
                    <FontAwesomeIcon icon={faSquare} />
                  </Col>
                  <Col sm={4} onClick={() => setState({ ...state, divGrid: 4 })} className={state.divGrid == 4 ? 'active' : ''}>
                    <FontAwesomeIcon icon={faThLarge} />
                  </Col>
                  <Col sm={4} onClick={() => setState({ ...state, divGrid: 3 })} className={state.divGrid == false ? 'active' : state.divGrid == 3 ? 'active' : ''}>
                    <FontAwesomeIcon icon={faTh} />
                  </Col>
                </Row>
              </Col>

            </Row>

          </>
        )}
        {showloader ? <ContentLoader /> : ''}

        <Material listings={listings} data={props} {...state} />

        {noStructure ? <NoStructure /> : ''}

        <Col>

          {Math.ceil(total_listings / 21) > 0 ? (
            <Pagination
              active={active}
              size={Math.ceil(total_listings / 21)}
              step={2}
              onClickHandler={activeHandler}
            />
          ) : ''}
        </Col>

      </Col>



    </>
  );
};

export default MaterialList