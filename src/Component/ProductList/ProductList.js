import React, { useState, useEffect } from 'react';
// import './ProductList.scss';

import { Col, Row, Breadcrumb, Accordion, Container, Button } from 'react-bootstrap';
import Skeleton from "react-loading-skeleton";
import CurrencyFormat from '../../services/CurrencyFormat';
import parse, { domToReact } from 'html-react-parser';
import ProductListThumbSlider from "../ProductListThumbSlider/ProductListThumbSlider";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ToolsAndinstructionsModal from '../ToolsAndinstructions/ToolsAndinstructionsModal';
import { useDispatch, useSelector } from "react-redux";
import CategoryBanner from "../categoryBanner/categoryBanner";
import { useRouter } from 'next/router';
import cookies from 'js-cookie';
import { countryName, langName } from '@utils/i18n';
import { useTranslation } from 'next-i18next';
import LinkComponent from '@components/Link';
import dynamic from 'next/dynamic';
import PlpShema from "@components/PlpSchema";
const ContactUsModal = dynamic(() => import('../Modals/ContactUsModal'), { ssr: false });

const TabbyPromoMgs = dynamic(() => import('src/PaymentGateway/Tabby/TabbyPromoMgs'), {
  ssr: false,
})
const TamaraWidget = dynamic(() => import('src/PaymentGateway/Tamara/TamaraWidget'), {
  ssr: false,
})


const site = cookies.get('siteDetail');
let cn_iso = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).primary_ref_cn_iso ? JSON.parse(site).primary_ref_cn_iso : '';

const site_id = process.env.NEXT_PUBLIC_SITE_ID; //100001;
const lang = langName //i18next.language; //'en';
const country = countryName;

const API_LOCATION = process.env.NEXT_PUBLIC_LOCAL_API_URL + 'product/';
const API_PATH = `?site=${site_id}&lang=${lang}&country=${country}&content=product_category_listing&cn_iso=${cn_iso}`; //'?site=${process.env.NEXT_PUBLIC_SITE_ID}&lang=en&country=uae&content=product_category_listing';

let decimalPoints = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_decimals >= 0 ? parseInt(JSON.parse(site).show_decimals) : 0;


const ProductList = (props) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { locale } = router;
  const [modalShow, setModalShow] = useState(false);
  const [modalShowdata, setModalShowdata] = useState(false);

  const listing = props && props?.LISTING?.length && props?.LISTING;
  const breadcrumb = props && props?.BREADCRUMB?.length && props?.BREADCRUMB;
  const banner = props && props?.banner;
  const isLoaded = useSelector(store => store.products.isLoaded);

  const [ContactUsModalOpen, setContactUsModalOpen] = useState(false);


  if (isLoaded) {
    return (
      <>
        <Row className="my-3">
          <Col sm={6}>
            <Skeleton count={1} height={400} />
          </Col>
          <Col sm={6}>
            <Skeleton count={9} height={40} />
          </Col>
        </Row>
        <Row className="my-3">
          <Col sm={6}>
            <Skeleton count={1} height={400} />
          </Col>
          <Col sm={6}>
            <Skeleton count={9} height={40} />
          </Col>
        </Row>
        <Row className="my-3">
          <Col sm={6}>
            <Skeleton count={1} height={400} />
          </Col>
          <Col sm={6}>
            <Skeleton count={9} height={40} />
          </Col>
        </Row>
        {/* {isLoaded && !isLoaded ?
          <div className="loaderItem">
            <img className="img-fluid" src={`/assets/images/Customization/dancingloader.gif`} alt="sedar images" />
          </div> : ''
        } */}
      </>
    );
  } else {
    return (
      <>
        {ContactUsModalOpen && <ContactUsModal show={ContactUsModalOpen} onHide={() => setContactUsModalOpen(false)} formType="U" slug_url="free-consultation1" form_name="upholsteryForm" hideField="No" />}
        {listing &&
          <PlpShema listings={listing} total_listings={listing.length} router={router} banner={props?.banner?.BANNER || {}} page='product' />
        }
        <CategoryBanner {...banner || ''} />
        {/* </Col>
        </Row> */}
        {/* <Col sm={3}>
              <FilterSidebar {...Props} />
            </Col> */}

        {/* <Col> */}
        <div className="ProductList" >
          <Container>
            <Row className="d-none d-md-flex" >
              <Col>
                <Breadcrumb>
                  {/* {breadcrumb && breadcrumb.LINK_PATH && ( */}
                  <Breadcrumb.Item href={`/${locale}`}>{t("Home")}</Breadcrumb.Item>
                  {/* )} */}

                  {breadcrumb && breadcrumb.LINK_PATH && (
                    <Breadcrumb.Item linkProps={{ to: `/${breadcrumb.PARENT_LINK_URL}` }}> {breadcrumb.LINK_PATH?.split('/')[1]}
                    </Breadcrumb.Item>
                  )}

                  {breadcrumb && breadcrumb.PARENT_LINK_URL && (
                    <Breadcrumb.Item active>{breadcrumb.LINK_PATH?.split('/')[2]}</Breadcrumb.Item>)}
                </Breadcrumb>
              </Col>
            </Row>


            <Col className="ProductListCardView">
              {listing && listing.map((data) => (
                data.INFO && data.INFO.map((product, index) => {
                  return (

                    <div className="card mb-4" key={index}>
                      <div className="card-body">
                        <Row>
                          <Col sm={12} md={12} lg={6} xl={6}>
                            <div className="productimgslider" >
                              <ProductListThumbSlider data={data.GALLERY} link={product.link_url} {...data} />
                            </div>
                          </Col>
                          <Col className="nopadding" sm={12} md={12} lg={6} xl={6}>

                            <div className="productdetails">
                              <Row>
                                <Col xs={product.price_from > 0 ? 6 : 12} lg={12} xl={product.price_from > 0 ? 6 : 12}>
                                  <div className="productName mb-2">
                                    <h2>{product.tooltip}</h2>
                                  </div>
                                </Col>
                                {product.price_from > 0 && (
                                  <Col xs={6} sm={6} md={6} lg={12} xl={6}>
                                    <div className="productPrice">
                                      <p className="pricelabel">{t('PricesFrom')} </p>
                                      <p className="price">
                                        <CurrencyFormat
                                          value={product.price_from}
                                          displayType={'text'}
                                          thousandSeparator={true}
                                          decimalScale={decimalPoints}
                                          fixedDecimalScale={decimalPoints > 0 ? true : false}
                                          isNumericString={decimalPoints > 0 ? false : true}
                                          prefix={'AED '} />
                                      </p>
                                      {product.old_price > 0 && ['EGP'].indexOf(props.SFP_CCY_CODE) == -1 && (
                                        <p className="pricesave">
                                          <del>
                                            <CurrencyFormat
                                              value={product.old_price}
                                              displayType={'text'}
                                              thousandSeparator={true}
                                              decimalScale={decimalPoints}
                                              fixedDecimalScale={decimalPoints > 0 ? true : false}
                                              isNumericString={decimalPoints > 0 ? false : true}
                                              prefix={'AED '} />
                                          </del>
                                          {product.offer_badge > 0 && (<span> {t('save_up_to', { offer_badge: product.offer_badge })}</span>)}
                                        </p>
                                      )}
                                    </div>

                                  </Col>
                                )}
                                <Col sm={12}><TabbyPromoMgs tab_name={product.id} amount={product.price_from} key={index} /></Col>
                                <Col sm={12}> <TamaraWidget tab_name={product.id} amount={product.price_from} key={index} inline_type="2" /> </Col>
                              </Row>
                              <hr className="d-none d-md-block" />
                              <Row>
                                <Col>
                                  <div className="shortfeatures">
                                    <div className="d-none d-md-block">
                                      {/* {product.features ? parse(product.features) : ''} */}
                                      {product.features ?
                                        parse(product.features, {
                                          replace: domNode => {

                                            if (domNode.name && domNode.children && domNode.name == 'h1') {
                                              return <h2>{domToReact(domNode?.children)}</h2>
                                            }
                                          }
                                        })
                                        : ''}

                                    </div>
                                    <div className="d-md-none py-2">
                                      <>
                                        <Accordion flush>
                                          <Accordion.Item eventKey="0">
                                            <Accordion.Header className="border-top border-bottom" size="lg"> {t('FeaturesBenefits')} </Accordion.Header>
                                            <Accordion.Body>
                                              {product.features ?
                                                parse(product.features, {
                                                  replace: domNode => {

                                                    if (domNode.name && domNode.children && domNode.name == 'h1') {
                                                      return <h2>{domToReact(domNode?.children)}</h2>
                                                    }
                                                  }
                                                })
                                                : ''}
                                            </Accordion.Body>
                                          </Accordion.Item>
                                        </Accordion>

                                      </>
                                    </div>
                                  </div>

                                </Col>
                              </Row>
                              <hr className="d-none d-md-block" />
                              <div className="quickstep">
                                <Row>
                                  {data.INSTRUCTION && data.INSTRUCTION.map((row, key) => (
                                    <Col sm={6} key={key} onClick={() => { setModalShow(true); setModalShowdata({ row, ...data }) }}>
                                      <div className="quickstepcontent">
                                        <LazyLoadImage effect="" className="img-fluid" src={row.image_path} alt={row.desc} width="auto" height="auto" />
                                        <p>{row.desc}</p>
                                      </div>
                                    </Col>
                                  ))}

                                  {/* <Col sm={6}>
                                              <div className="quickstepcontent">
                                                <img className="img-fluid" src={`/assets/icon/surface1@2x.png`} alt="sedarglobal" />
                                                <p> Measurement Instructions</p>
                                              </div>
                                            </Col>
                                            <Col sm={6}>
                                              <div className="quickstepcontent">
                                                <img className="img-fluid" src={`/assets/icon/3003627@2x.png`} alt="sedarglobal" />
                                                <p>Installation Instructions</p>
                                              </div>

                                            </Col>
                                            <Col sm={6}>
                                              <div className="quickstepcontent">
                                                <img className="img-fluid" src={`/assets/icon/561135@2x.png`} alt="sedarglobal" />
                                                <p> Operating Instructions</p>
                                              </div>

                                            </Col> */}
                                </Row>

                              </div>


                              <Row className="product_button py-md-2">
                                {['uae'].indexOf(country) == 0 && product.desc == 'Upholstery' && (
                                  <Col xs={12} sm={12} xl={6} className="p-2 pe-1 p-sm-2 pe-xl-1 w400" >

                                    <Button
                                      className="btn btn-primary w-100 btn_one mb-2 mb-md-3 border-0 rounded-0"
                                      onClick={() => {
                                        setContactUsModalOpen(true);
                                      }}>
                                      {' '}
                                      {t('BookFreeUpholstery')}
                                    </Button>
                                  </Col>
                                )}  {['global', 'egy'].indexOf(country) == -1 && product.desc != 'Upholstery' && (
                                  <Col xs={12} sm={12} xl={6} className="p-2 pe-1 p-sm-2 pe-xl-1 w400" >
                                    <LinkComponent className="btn btn-primary w-100 btn_one mb-2 mb-md-3 border-0 rounded-0" href={"/free-consultation?product_type=" + product.desc}><a>{t('BookFreeMeasurement')}</a></LinkComponent>
                                  </Col>
                                )}
                                {product.customization_yn == 'Y' && (
                                  <Col xs={6} sm={12} xl={6} className="p-2 ps-1 p-sm-2 ps-xl-1 w400 d-none d-sm-block">
                                    <LinkComponent className="btn btn-primary w-100 btn_two mb-2 mb-md-3 border-0 rounded-0" href={`${product.link_url}/customize`}>
                                      <a>{t('CustomizeAndBuy')}</a>
                                    </LinkComponent>
                                  </Col>
                                )}
                                {product.browse_collection_yn == 'Y' && product.customization_yn != 'Y' && (
                                  <Col sm={6} className="p-2 btn_singleCol">
                                    <LinkComponent className="btn btn-primary w-100 mb-3 mb-md-3 btn_single border-0 rounded-0" href={`/contact`}>
                                      <a>{t('ContactUs')}</a>
                                    </LinkComponent>
                                  </Col>
                                )}
                                {product.browse_collection_yn != 'Y' && product.customization_yn != 'Y' && (
                                  <Col sm={6} className="p-2 btn_singleCol">
                                    <LinkComponent className="btn btn-primary w-100 mb-3 mb-md-3 btn_single border-0 rounded-0" href={`/contact`}>
                                      <a>{t('ContactUs')}</a>
                                    </LinkComponent>
                                  </Col>
                                )}
                                {product.browse_collection_yn != 'Y' && product.customization_yn == 'Y' && (
                                  <Col sm={12} className="p-2 btn_singleCol">
                                    <LinkComponent className="btn btn-primary w-100 mb-3 mb-md-3 btn_single border-0 rounded-0" href={`/contact`}>
                                      <a>{t('ContactUs')}</a>
                                    </LinkComponent>
                                  </Col>
                                )}
                                {product.browse_collection_yn == 'Y' && (
                                  <Col sm={12} className="p-2 btn_singleCol">
                                    <LinkComponent className="btn btn-primary w-100 mb-3 mb-md-3 btn_single border-0 rounded-0" href={product.link_url}>
                                      <span className="d-sm-none">{t('BrowseAndBuy')} </span> <span className="d-none d-sm-block">{t('BrowseCollections')}</span>
                                    </LinkComponent>
                                    {/* <button className="btn btn-primary w-100 mt-3 btn_single" type="button">Browse Collections</button> */}
                                  </Col>
                                )}
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  )
                })
              ))}
            </Col>
          </Container>
        </div >
        {/*   */}

        < ToolsAndinstructionsModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={modalShowdata}
        />
      </>
    )
  }
}




export default ProductList;
