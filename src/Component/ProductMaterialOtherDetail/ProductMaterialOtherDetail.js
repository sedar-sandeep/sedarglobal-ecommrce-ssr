import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

// import './ProductMaterialOtherDetail.scss';
// import Scrollspy from "react-scrollspy";
import { Col, Container, Row, Accordion, Card, AccordionContext, useAccordionButton } from 'react-bootstrap';
// import { Link } from 'react-router-hash-link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import parse from 'html-react-parser';

// step child child

import ProductMaterialDescription from "./ProductMaterialDescription";
import ProductMaterialSimilar from "./ProductMaterialSimilar";
import ProductMaterialAboutProduct from "./ProductMaterialAboutProduct";
import ProductMaterialSpecification from "./ProductMaterialSpecification";
import { BiPlus, BiMinus } from 'react-icons/bi';
import ApiDataService from '../../services/ApiDataService';
import LinkComponent from '@components/Link';

import { useTranslation } from 'next-i18next';


const ProductMaterialOtherDetailSection = (props) => {
  const { t } = useTranslation("common");
  const backimage = `/assets/icon/2089713.png`
  return (
    <Col sm={12} className="all-detail">
      {/* {props && (
        <section id="section1">
          <ProductMaterialDescription {...props.PRODUCT_DESCRIPTION[0]} />
        </section>
      )} */}
      <section id="section2">
        <ProductMaterialSimilar {...props} />
      </section>


      {/* {props.PRODUCT_SPECIFICATION && props.PRODUCT_SPECIFICATION[0].CHILD.map((row, key) => {
        if (key == 0) {
          return (<section id={`section${key + 3}`} key={key}>{row.length > 0 && <ProductMaterialAboutProduct {...row} />}</section>);
        } else if (key == 1) {
          return (<section id={`section${key + 3}`} key={key}>{row.length > 0 && <ProductMaterialSpecification {...row} />}</section>);
        } else if (key == 2) {
          return (<section id={`section${key + 3}`} key={key}>
            <div className="more-about include-section">
              {row.length > 0 &&
                <Row>
                  <Col sm={12} className="Specification">
                    <Row>
                      <Col sm={6} className="ps-0">
                        <LazyLoadImage effect="" className="img-fluid" src={row['CHILD'][0].SHP_FILE_PATH} alt="sedarglobal" width="auto" height="auto" />
                      </Col>
                      <Col sm={6}>
                        <div className="specification-list">
                          {row['CHILD'] ? parse(row['CHILD'][0].SHP_HTML) : ''}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }
            </div>
          </section>);
        } else if (key == 3) {
          return (<section id={`section${key + 3}`} key={key}  >
            <div className="more-about">
              {row.length > 0 &&
                <Row>
                  <Col sm={12} className="Specification">
                    <Row>
                      <Col sm={6} >
                        <div className="specification-box">
                          {row['CHILD'] ? parse(row['CHILD'][0].SHP_HTML) : ''}
                        </div>
                      </Col>
                      <Col sm={6} className="text-end pe-0">
                        <LazyLoadImage effect="" className="img-fluid" src={row['CHILD'][0].SHP_FILE_PATH} alt="sedarglobal" width="auto" height="auto" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }
            </div>
          </section>);
        } else if (key == 4) {
          return (<section id={`section${key + 3}`} key={key}>
            <div className="more-about">
              <Row>
                <Col sm={12} className="Specification">
                  <Row>

                    <Col sm={6} className="text-end pe-0">
                      <LazyLoadImage effect="" className="img-fluid" src={row['CHILD'][0].SHP_FILE_PATH} alt="sedarglobal" width="auto" height="auto" />
                    </Col>
                    <Col sm={6} >
                      <div className="specification-box">
                        {row['CHILD'] ? parse(row['CHILD'][0].SHP_HTML) : ''}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </section>);
        } else if (key == 5) {

          return (<section id={`section${key + 3}`} key={key} style={{ background: "#f1eedf" }}>
            <div className="more-about">
              <Row>
                <Col sm={12} className="Specification" style={{ background: "#f1eedf" }}>
                  <Row>

                    <Col sm={6} >
                      <div className="specification-box" style={{ background: "#f1eedf" }}>
                        {row['CHILD'] ? parse(row['CHILD'][0].SHP_HTML) : ''}
                      </div>
                    </Col>
                    <Col sm={6} className="text-end pe-0">
                      <img style={{ width: "auto" }} className="img-fluid" src={row['CHILD'][0].SHP_FILE_PATH} alt="sedarglobal" width="auto" height="auto" />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </section>);
        } else if (key == 6) {
          return (<section id={`section${key + 3}`} key={key}>
            <div className="more-about">
              <Row>
                <Col sm={12} className="Specification">
                  <Row>
                    <Col className="text-end pe-0">
                      <LazyLoadImage effect="" className="img-fluid" src={row['CHILD'][0].SHP_FILE_PATH} alt="sedarglobal" width="auto" height="auto" />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </section>);
        }

      })} */}

    </Col>
  )
}
const ProductMaterialOtherDetail = (props) => {
  const { t } = useTranslation("common");
  // const API_LOCATION = process.env.NEXT_PUBLIC_BASE_URL + 'material/item_specification';
  // const API_PATH = API_LOCATION + `?content=item_specification`; //'?site=100001&lang=en&country=uae&content=item_info_listing';

  // const [item_detail, setItemDetail] = React.useState(false);
  const item_detail = props;
  // console.log(props, 'propspropsprops');


  // const reduxDispatch = useDispatch();

  // useEffect(() => {
  //   const url = API_PATH + `&slug_url=${props.SPI_LINK_URL}&item=${props.item}`;
  //   // fetchListings(url)(dispatch)
  //   ApiDataService.getwithSlug(url)
  //     .then(response => {
  //       if (response.data.error_message == "Success") {
  //         setItemDetail(response.data.result);
  //         if (response.data.result.SEO) {
  //           reduxDispatch({
  //             type: 'SEO',
  //             payload: { pageseo: response.data.result.SEO[0] },
  //           });
  //           reduxDispatch({
  //             type: 'SIMILAR_COLOR',
  //             payload: { similar_color: response.data.result.SIMILAR_COLOR },
  //           });
  //         }

  //       }
  //     })
  // }, [props.SPI_LINK_URL]);


  return (
    <>
      <section className="ProductMaterialOtherDetail d-none d-lg-block">

        <Container className="maxwidth">
          <Row>
            <Col sm={3} className="left">
              <div className="sidebar">
                <ul style={{ listStyleType: 'disc' }}>
                  {/* <li>
                    <LinkComponent href="#section1"> {t("ProductDescription")} </LinkComponent>
                  </li> */}
                  <li>
                    <LinkComponent href="#section2"> {t("SimilarColors")} </LinkComponent>
                  </li>
                  {/* {item_detail?.specificationData?.PRODUCT_SPECIFICATION && item_detail?.specificationData?.PRODUCT_SPECIFICATION[0] && item_detail?.specificationData?.PRODUCT_SPECIFICATION[0].CHILD.map((row, key) => (
                    <li key={key}>
                      <LinkComponent href={`#section${key + 3}`} >{row.SHP_DESC}</LinkComponent>
                    </li>
                  ))} */}
                </ul>
              </div>
            </Col>
            <Col sm={9} className="right">

              <ProductMaterialOtherDetailSection {...props?.specificationData} item_detail={item_detail} category_slug={props.category_slug} sub_category_slug={props.sub_category_slug} />
            </Col>
          </Row>
        </Container>
      </section>
      <ProductMaterialOtherDetailMobile {...props?.specificationData} item_detail={item_detail} />
    </>
  );
}


const ProductMaterialOtherDetailMobile = (props) => {
  const { t } = useTranslation("common");
  function CustomToggle({ children, eventKey, callback }) {
    const currentEventKey = React.useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );
    const isCurrentEventKey = currentEventKey.activeEventKey == eventKey;
    return (
      <div onClick={decoratedOnClick} className="customtoggle">
        {children} <span className="iconcollapse float-end">{isCurrentEventKey ? <BiMinus /> : <BiPlus />} </span>
      </div>

    );
  }

  return (
    <section className="ProductMaterialOtherDetail ProductMaterialOtherDetailMobile  d-lg-none">
      <Container className="maxwidth all-detail">
        <Row>
          <Col sm={12} className="p-0">

            <Accordion defaultActiveKey="0" className="pb-3">
              {/* {props && (
                <Card>
                  <Card.Header className="py-3">
                    <CustomToggle eventKey="0">{t("ProductDescription")}</CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <ProductMaterialDescription {...props.PRODUCT_DESCRIPTION[0]} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              )} */}
              <Card>
                <Card.Header className="py-3">
                  <CustomToggle eventKey="1">{t("SimilarColors")} </CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <ProductMaterialSimilar {...props} />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>


              {/* {props.PRODUCT_SPECIFICATION && props.PRODUCT_SPECIFICATION[0] && props.PRODUCT_SPECIFICATION[0].CHILD.map((data, key) => {
                key += 3
                return (
                  <Card key={key}>
                    <Card.Header className="py-3">
                      <CustomToggle eventKey={key}>{data.SHP_DESC}</CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={key}>
                      <Card.Body>
                        {key == 3 ? <ProductMaterialAboutProduct {...data} /> : ""}
                        {key == 4 ? <ProductMaterialSpecification {...data} /> : ""}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                )
              })} */}



            </Accordion>
          </Col>

        </Row>
      </Container>


    </section>
  );
}

ProductMaterialOtherDetail.propTypes = {};

ProductMaterialOtherDetail.defaultProps = {};

export default ProductMaterialOtherDetail;
