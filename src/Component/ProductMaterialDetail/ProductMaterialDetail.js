import React, { useState, useEffect } from 'react';
import Script from "next/script";
import { useSelector, useDispatch } from "react-redux";
import { Col, Container, Row, Breadcrumb, Modal, Button } from 'react-bootstrap';
import CurrencyFormat from '../../services/CurrencyFormat';
import ProductMaterialDetailThumbSlider from "../ProductMaterialDetailThumbSlider/ProductMaterialDetailThumbSlider";
import ProductMaterialOtherDetail from "../ProductMaterialOtherDetail/ProductMaterialOtherDetail";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LinkComponent from '@components/Link';
import { addToCart, removeFromCart, removeMood, priceReset } from '../../Redux-Config/Actions/index';
import Instagram from "../Instagram/Instagram";
import ToastAlert from '../AlertMessages/ToastAlert';
import parse from 'html-react-parser';
import PageLayoutContentLoader from '../../Preloader/PageLayoutContentLoader'
import MoodBoardModal from '../Modals/WishList/MoodBoard';
import ToolsAndinstructionsModal from '../ToolsAndinstructions/ToolsAndinstructionsModal';
import { Swiper, SwiperSlide } from "swiper/react";
import { addToCartFun, updateLineTable } from "../MaterialList/AddToCart";
import { connect } from "react-redux";
import { BsFillTelephoneFill } from 'react-icons/bs';

import { Pagination } from "swiper";
import ContactUsModal from '../Modals/ContactUsModal';
//import { ReTagCategoryPage } from '../../Admitad/AdmitadIndex';
import GoogleAnalytics from '../../services/GoogleAnalytics';
import SnapPixel from '../../services/SnapPixel';
import { countryName, defaultLocale, onError, langName } from '@utils/i18n';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import AddtoCartModal from '../Modals/QuickByModal/AddtoCartModal';
import DeliveryDays from '../Utility/DeliveryDays';
import { IconComponent } from '@components/image';
import PdpShema from "@components/PdpSchema";
const brand_name = ['The MET'];


const TabbyPromoMgs = dynamic(() => import('src/PaymentGateway/Tabby/TabbyPromoMgs'), {
  ssr: false,
})
const TamaraWidget = dynamic(() => import('src/PaymentGateway/Tamara/TamaraWidget'), {
  ssr: false,
})

const country = countryName;

const item_img_path = process.env.NEXT_PUBLIC_ITEM_IMG_PATH + 'laptop/';
const item_img_path_tile = process.env.NEXT_PUBLIC_ITEM_IMG_PATH + 'hover/';
const prod_img_path = process.env.NEXT_PUBLIC_PRODUCT_PATH;


const site = Cookies.get('siteDetail') || 'undefined';
let decimalPoints = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_decimals >= 0 ? parseInt(JSON.parse(site).show_decimals) : 0;


function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 30 || scrollY - lastScrollY < -30)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    }
  }, [scrollDirection]);

  return scrollDirection;
};


const ProductListCardView = (props) => {
  const router = useRouter();
  const { query, locale } = useRouter();
  const { slug } = query;

  console.log(props, 'ProductListCardView');
  const scrollDirection = useScrollDirection();
  const data = props?.LISTING[0] || {};
  const seo = props?.SEO || {};

  const { t } = useTranslation("common");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(false);
  const [MoodBoard, setMoodBoard] = useState(false);
  const [loader, setLoader] = useState(true);
  const [item_stock_status, SetItemStockStatus] = useState(false);

  const [active_item_id, setActiveItemId] = useState(data?.sfi_ref_colors_list[0]);


  let category_slug = slug && slug[0] || undefined;
  let sub_category_slug = slug && slug[1] || undefined;
  let product_slug = slug && slug[2] || undefined;
  let item_slug = slug && slug[3] || undefined;
  let line_sys_id = slug && slug[4] || undefined;



  let active_item_array = active_item_id ? active_item_id?.split('|') : false;

  const siteDe = useSelector(store => store.MenusItemReduser.siteDetail);
  const alert_message = useSelector(store => store.alert);



  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();

  const [instructionShow, setInstructionShow] = useState(false);
  const [modalShowdata, setModalShowdata] = useState(false);
  useEffect(() => {

    if (line_sys_id && line_sys_id > 0) {
      dispatch(priceReset());
      handleShow(data);
    }

    data?.sfi_ref_colors_list?.filter((row, key) => {
      let item_gallery = row?.split('|')[0];
      if (item_gallery == item_slug) {
        setActiveItemId(row);
      }
    })
    /*  if (data && data.SFP_TITLE) {
        ReTagCategoryPage(data.SFP_TITLE);//Admitad
      }*/

  }, [data?.sfi_ref_colors_list]);

  useEffect(() => {
    GoogleAnalytics.viewSingleItem(data);
    SnapPixel.viewSingleItem(data, props?.user_info);
  }, []);



  useEffect(() => {
    let item_desc = active_item_id && active_item_id?.split('|')[1] ? active_item_id?.split('|')[1]?.split('-')?.splice(1)?.join('-') : ''
    const query = new URLSearchParams(typeof window !== "undefined" ? window?.location?.search : "");
    query.set('item', item_desc);



  }, [active_item_id])

  const [ContactUsModalOpen, setContactUsModalOpen] = React.useState(false);

  useEffect(() => {
    SetItemStockStatus(active_item_array[0]);
  }, [active_item_array[0]]);




  let direct_price_yn = siteDe != undefined && siteDe && siteDe.direct_price_yn == 'Y' ? true : false;
  let show_price_yn = siteDe != undefined && siteDe && siteDe.show_price_yn;


  const handleShow = (data) => {
    setShow(true);
    setItem(data);

  }

  const handleClose = e => {
    setShow(false);
    setItem('');
  }


  let status = data?.stock_status[item_stock_status] && data?.stock_status[item_stock_status]?.split('|')[0] != 'undefined' ? data.stock_status[item_stock_status]?.split('|')[0] : 'INSTOCK';
  let status_days = data?.stock_status[item_stock_status] && data?.stock_status[item_stock_status]?.split('|')[1] != 'undefined' ? data.stock_status[item_stock_status]?.split('|')[1] : 0;


  return (
    <div className="ProductListCardView">
      {alert_message && alert_message.message ? <ToastAlert {...alert_message} /> : ''}

      <ContactUsModal
        show={ContactUsModalOpen}
        onHide={() => setContactUsModalOpen(false)}
      />

      {data &&
        <PdpShema listings={data} router={router} seoData={seo} />
      }
      <Row>
        <Col sm={12}>
          <Row>
            <Col lg={6} className="left p-0 px-sm-3">
              <div className="productimgslider" >
                <ProductMaterialDetailThumbSlider {...props.LISTING[0]} ITEM_CODE={active_item_id?.split('|')[0]} />
              </div>
              {/* mobile and desktop diffrent */}
              {data?.sfi_ref_colors_list ?
                <Col className="d-block d-lg-none pt-2 p-0 p-lg-2 color-detail">
                  <div className="heading p-3 p-sm-0">
                    <h5>{t('ChooseFabric')} <span>{active_item_id?.split('|')[5]}</span></h5>
                  </div>
                  <Col className="color_list">
                    <ul>
                      <Swiper
                        spaceBetween={5}
                        pagination={{
                          clickable: true,
                        }}
                        modules={[Pagination]}
                        loop={false}
                        breakpoints={{
                          320: {
                            slidesPerView: 7,
                          },
                          576: {
                            slidesPerView: 8,
                          },
                          767: {
                            slidesPerView: 7,
                          },
                          992: {
                            slidesPerView: 8,
                          },
                          1300: {
                            slidesPerView: 6,
                          },
                        }}
                        className="pb-1 pb-lg-3  pt-2"
                      >
                        {data.sfi_ref_colors_list && data.sfi_ref_colors_list.map((row, key) => (
                          <SwiperSlide key={key}>
                            <li className={row?.split('|')[0] == data.id ? 'active' : ''} onClick={() => { setActiveItemId(row) }}>
                              {/* <LazyLoadImage effect="blur" className={row.split('|')[0] == active_item_id.split('|')[0] ? 'color_image img-fluid active' : 'color_image img-fluid'} src={`${item_img_path_tile}${row.split('|')[0]}.webp`} alt={row.split('|')[1] || 'Sedar Global'} data-toggle="tooltip" data-html="true" title={row.split('|')[1]} width="auto" height="auto" /> */}
                              <LinkComponent href={`/${category_slug}/${sub_category_slug}/${product_slug}/${row?.split('|')[0]}`} className="w-100 mt-0 mb-2" type="button">
                                <IconComponent
                                  classprops={row?.split('|')[0] == active_item_id?.split('|')[0] ? 'color_image img-fluid active' : 'color_image img-fluid'}
                                  src={`${item_img_path_tile}${row?.split('|')[6]}`}
                                  alt={row?.split('|')[1] || 'Sedar Global'}
                                  width={36}
                                  height={36}
                                  marginLeftRight
                                  contains={true}
                                />
                              </LinkComponent>
                            </li>
                          </SwiperSlide>
                        ))}

                      </Swiper>

                    </ul>
                  </Col>


                  {data.SFI_SAMPLE_APP_YN == 'Y' && false && (
                    <div className="group-detail border-1 border-start ps-5">
                      <p>{t('Wanttohaveafeelfreesamplebeforeyoubuy')} </p>
                      <p role="button" onClick={() => setModalShow(true)} style={{ color: "#ef9c00" }} className="list_link">{t('LearnMore')} </p>

                      <ProductMaterialDetailSamplePopup
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                    </div>
                  )}
                </Col>

                : ''
              }

              {data?.INSTRUCTIONS && (
                <Col sm={12} className="d-lg-block mt-3">
                  <Row className="quickstep">
                    <Col sm={12} className="">
                      <div className="instruction  px-3">
                        <Row>
                          {data.INSTRUCTIONS.map((row, key) => (

                            <Col xs="4 px-2" key={key}>
                              <div className="quickstepcontent  media  d-block d-md-flex align-items-center" key={key} onClick={() => {
                                setInstructionShow(true); setModalShowdata({
                                  pdf_path: row.SPS_PDF_PATH ? prod_img_path + row.SPS_PDF_PATH : '',
                                  desc: row.SPS_DESC,
                                  video_path: row.SPS_VIDEO_PATH ? prod_img_path + row.SPS_VIDEO_PATH : '',
                                  image_path: data.SPI_IMAGE_PATH ? prod_img_path + data.SPI_IMAGE_PATH : '',
                                  title: data.DESCRIPTION
                                })
                              }}>
                                <LazyLoadImage effect="blur" className="img-fluid" src={prod_img_path + row.SPS_ICON} alt={row.SPS_DESC || t("sedarglobal")} width="auto" height="auto" />
                                <div className="flex-grow-1 ms-1">
                                  <p>{row.SPS_DESC}</p>
                                  {/* <a href={prod_img_path + row.SPS_PDF_PATH} className="list_link" download>{t("Download")} </a> */}
                                  <span className="list_link" style={{ font: 'normal normal normal 12px/20px Helvetica-Neue' }}>{t("Download")}</span>
                                </div>
                              </div>
                            </Col>

                          ))}
                        </Row>
                        <ToolsAndinstructionsModal
                          show={instructionShow}
                          onHide={() => setInstructionShow(false)}
                          //  image_path={}
                          data={modalShowdata} />
                      </div>
                    </Col>
                  </Row>
                </Col>
              )}
              {/* mobile and desktop diffrent */}
            </Col>
            <Col lg={6} className="right my-1 my-lg-4 my-lg-2">
              <div className="productdetails">
                {status_days > 0 && ['EGP'].indexOf(data.SFP_CCY_CODE) == -1 && (
                  <DeliveryDays status_days={status_days} status={status} />
                )}
                <Row>
                  <Col>
                    <div className="productName my-2 my-sm-2 my-lg-3">
                      {/* <p>{t("ItemCode")} : <span>{data.SFI_DESC}</span></p> */}
                      <p>{t("ItemCode")} : <span>{active_item_id?.split('|')[1]?.split('-').length > 1 ? active_item_id?.split('|')[1]?.split('-')?.splice(1)?.join('-') : active_item_id?.split('|')[1]}</span></p>
                      <h1>{data?.SFP_TITLE} - {t(active_item_id?.split('|')[5])}</h1>
                    </div>
                  </Col>
                </Row>
                {show_price_yn == 'Y' && (

                  <Row>
                    <Col>
                      <div className="productPrice">
                        <Row>
                          {data && data.PRICE > 0 && ['EGP'].indexOf(data.SFP_CCY_CODE) == -1 && (
                            <>
                              <Col xs={6} sm={data.PRICE_OLD > 0 ? 4 : 6}>
                                <p className="pricelabel">{t("PricesFrom")} </p>
                                <p className="price">
                                  <CurrencyFormat
                                    value={data.PRICE}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    decimalScale={decimalPoints}
                                    fixedDecimalScale={decimalPoints > 0 ? true : false}
                                    isNumericString={decimalPoints > 0 ? false : true}
                                    prefix={data.currency} />
                                </p>
                              </Col>
                            </>
                          )}
                          {data && Number(data.PRICE_OLD) > Number(data.PRICE) && (
                            <Col xs={6} sm={4}>
                              <p className="pricesave">
                                <del>
                                  <CurrencyFormat
                                    value={data.PRICE_OLD}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    decimalScale={decimalPoints}
                                    fixedDecimalScale={decimalPoints > 0 ? true : false}
                                    isNumericString={decimalPoints > 0 ? false : true}
                                    prefix={data.currency} />
                                </del>
                                <br />
                                {data.OFFER_PCT > 0 && (<span>{t('save_up_to', { offer_badge: data.OFFER_PCT })} </span>)}</p>
                            </Col>
                          )}
                          {direct_price_yn && data && data.SFI_SAMPLE_APP_YN == 'Y' ?

                            <FreeSample {...data} cartItems={props.cartItems} setLoader={setLoader} user_dispatch={props.user_dispatch} position="top" active_item_id={active_item_array[0]} active_item_img={data.sfi_ref_colors_item_id[active_item_array[0]]?.split('|')[7]} /> : ''

                          }
                        </Row>
                      </div>

                      {direct_price_yn && data && data.PRICE > 1 ? <TabbyPromoMgs tab_name='materialId' amount={data.PRICE} /> : ''}
                      {direct_price_yn && data && data.PRICE > 1 ? <TamaraWidget tab_name='materialId' amount={data.PRICE} inline_type="2" /> : ''}


                    </Col>
                  </Row>
                )}
                <Row>
                  <Col>
                    <div className="grid-system">
                      {data?.SFI_COLLECTION_DESC && (
                        <div className="group-detail">
                          <p> {t('Collection')} </p><h5>{data.SFI_COLLECTION_DESC}</h5>
                        </div>
                      )}
                      {data?.BRAND_IMAGE_PATH && (
                        <div className="group-detail">
                          <p>{t('Brand')} </p>
                          <LazyLoadImage effect="blur" className="img-fluid" src={data.BRAND_IMAGE_PATH} alt={data.BRAND_DESC} width="auto" height="auto" style={{ maxHeight: '50px' }} />
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>


                {/* mobile and desktop diffrent */}

                {data?.sfi_ref_colors_list ?
                  <Row>
                    {props?.INSTRUCTIONS && (
                      <Col sm={12} className="d-block d-lg-none">
                        <Row className="quickstep">
                          <Col sm={12} className="p-0">
                            <div className="instruction">
                              {props?.INSTRUCTIONS.map((row, key) => (
                                <div className="quickstepcontent media  d-block d-md-flex align-items-center" key={key} onClick={() => { setInstructionShow(true); setModalShowdata({ row, ...props, image_path: props.LISTING[0].image }) }}>
                                  <LazyLoadImage effect="blur" className="img-fluid" src={row.icon_path} alt={row.SPS_DESC || t("sedarglobal")} width="auto" height="auto" />
                                  <div className="flex-grow-1 ms-1">
                                    <p>{row.SFP_TITLE}</p>
                                    <a href={row.file_path} className="list_link" download>{t("Download")} </a>
                                  </div>
                                </div>
                              ))}

                              <ToolsAndinstructionsModal
                                show={instructionShow}
                                onHide={() => setInstructionShow(false)}
                                //  image_path={}
                                data={modalShowdata} />
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    )}


                    <Col className="select-fabric d-none d-lg-block">
                      <div className="heading">
                        <h5>{t('ChooseFabric')} <span>{t(active_item_id?.split('|')[5])}</span></h5>
                      </div>
                      <div className="febric-grid">
                        <div className="group-detail pe-3">
                          <Col>
                            <ul className="list-group list-group-horizontal">
                              {data?.sfi_ref_colors_list && data.sfi_ref_colors_list.map((row, key) => (
                                <li key={key} className={row?.split('|')[0] == data.id ? 'active' : ''} onClick={() => { setActiveItemId(row) }}>
                                  {/* <LazyLoadImage effect="blur" className={row.split('|')[0] == active_item_id.split('|')[0] ? 'color_image img-fluid active' : 'color_image img-fluid'} src={`${item_img_path_tile}${row.split('|')[0]}.webp`} alt={row.split('|')[1] || t("sedarglobal")} data-toggle="tooltip" data-html="true" title={row.split('|')[1]} width="auto" height="auto" /> */}
                                  <LinkComponent href={`/${category_slug}/${sub_category_slug}/${product_slug}/${row?.split('|')[0]}`} className="w-100 mt-0 mb-2" type="button">
                                    <IconComponent
                                      classprops={row?.split('|')[0] == active_item_id?.split('|')[0] ? 'color_image img-fluid active' : 'color_image img-fluid'}
                                      src={`${item_img_path_tile}${row?.split('|')[6]}`}
                                      alt={row?.split('|')[1] || 'Sedar Global'}
                                      width={36}
                                      height={36}
                                      marginLeftRight
                                      contains={true}
                                    />
                                  </LinkComponent>
                                </li>
                              ))}


                            </ul>
                          </Col>

                        </div>
                        {data.SFI_SAMPLE_APP_YN == 'Y' && false && (
                          <div className="group-detail border-1 border-start ps-5">
                            <p>{t('Wanttohaveafeelfreesamplebeforeyoubuy')} </p>
                            <p role="button" onClick={() => setModalShow(true)} style={{ color: "#ef9c00" }} className="list_link">{t('LearnMore')} </p>


                            <ProductMaterialDetailSamplePopup
                              show={modalShow}
                              onHide={() => setModalShow(false)}
                            />
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                  : ''
                }
                {/* mobile and desktop diffrent */}

                <Row>
                  <Col>
                    <div className="shortfeatures">
                      {data?.SPI_FEATURES ? parse(data.SPI_FEATURES) : ''}
                    </div>
                  </Col>
                </Row>
                <Row className={`${scrollDirection === "down" ? "top-24" : "top-0"} product_button d-sm-none`}>
                  {country != 'global' && data?.SPI_FREE_MEASUREMENT_YN == 'Y' && (
                    <Col xs={6} className="pe-1">
                      <LinkComponent href="/free-consultation" className="btn btn-primary w-100 btn_one mt-0 mb-2" type="button">
                        {t('BookFreeMeasurement')}</LinkComponent>
                    </Col>
                  )}
                  {['A2', 'A4'].indexOf(data?.SPI_ADD_TO_CART_TYPE) >= 0 ?
                    (
                      <Col xs={6}>
                        <Wallpaper {...data} setLoader={setLoader} item_img={active_item_array[0]} user_dispatch={props.user_dispatch} active_item_id={active_item_array[0]} cartItems={props.cartItems} active_item_img={data.sfi_ref_colors_item_id[active_item_array[0]]?.split('|')[7]} />
                      </Col>
                    ) : (
                      <>
                        {direct_price_yn && show_price_yn == 'Y' && data && ['A1', 'A3', 'A5'].indexOf(data.SPI_ADD_TO_CART_TYPE) >= 0 ? (
                          <>
                            <Col xs={data.SPI_INSTALLATION_PROVIDE_YN == 'Y' ? 6 : 12} onClick={() => dispatch(priceReset())} className="ps-1">
                              <Button className="btn btn-primary w-100 btn_two mb-2 border-0" onClick={() => {
                                handleShow(data)
                              }}>{t('Select_Options')}</Button>
                            </Col>
                            {category_slug != 'wallpaper' && data?.SPI_ALLOW_CUSTOMIZATION_YN == 'Y' && brand_name.indexOf(data.BRAND_DESC) == -1 && (
                              <Col xs={data.SPI_INSTALLATION_PROVIDE_YN == 'Y' ? 6 : 12}>
                                <LinkComponent href={`/${category_slug}/${sub_category_slug}/${product_slug}/${active_item_id?.split('|')[0]}/customize`} className="btn btn-primary w-100 btn_single mt-0 mb-3 border-0" type="button">
                                  {t('AdvancedCustomization')}</LinkComponent>
                              </Col>
                            )}
                          </>
                        ) : (
                          <Col xs={6} className="ps-1">
                            <Button className="btn btn-primary w-100 btn_two mb-2" onClick={() => setContactUsModalOpen(true)} >{t('ContactUs')}</Button>
                          </Col>
                        )}

                      </>
                    )}
                </Row>
                <Row className="product_button d-none d-sm-flex">
                  {['global', 'egy'].indexOf(country) == -1 && data?.SPI_FREE_MEASUREMENT_YN == 'Y' && (<Col sm={6}>
                    <LinkComponent href="/free-consultation" className="btn btn-primary w-100 btn_one mt-0 mb-3" type="button">
                      <LazyLoadImage effect="blur" className="img-fluid" src={`/assets/images/ProductdetailPage/surface1.png`} alt={t('BookFreeMeasurement')} width="auto" height="auto" />
                      {t('BookFreeMeasurement')}</LinkComponent>
                  </Col>
                  )}

                  {direct_price_yn && ['A2', 'A4'].indexOf(data?.SPI_ADD_TO_CART_TYPE) >= 0 && show_price_yn == 'Y' ?
                    (
                      <Col xs={6}>
                        <Wallpaper {...data} setLoader={setLoader} item_img={active_item_array[0]} user_dispatch={props.user_dispatch} active_item_id={active_item_array[0]} cartItems={props.cartItems} active_item_img={data.sfi_ref_colors_item_id[active_item_array[0]]?.split('|')[7]} />
                      </Col>
                    ) : (
                      <>
                        {direct_price_yn && show_price_yn == 'Y' && data && ['A1', 'A3', 'A5'].indexOf(data.SPI_ADD_TO_CART_TYPE) >= 0 ? (
                          <>
                            <Col xs={data.SPI_INSTALLATION_PROVIDE_YN == 'Y' ? 6 : 12} onClick={() => dispatch(priceReset())}>
                              <Button className="btn btn-primary w-100 btn_two mb-3" onClick={(e) => {
                                handleShow(data)
                              }}>
                                <LazyLoadImage effect="blur" className="img-fluid" src={`/assets/images/ProductdetailPage/shopping-cart (1).png`} alt={t('Select_Options')} width="auto" height="auto" />
                                {t('Select_Options')}
                              </Button>
                            </Col>
                            {category_slug != 'wallpaper' && data.SPI_ALLOW_CUSTOMIZATION_YN == 'Y' && brand_name.indexOf(data.BRAND_DESC) == -1 && (
                              <Col xs={data.SPI_INSTALLATION_PROVIDE_YN == 'Y' ? 6 : 12}>
                                <LinkComponent href={`/${category_slug}/${sub_category_slug}/${product_slug}/${active_item_id?.split('|')[0]}/customize`} className="btn btn-primary w-100 btn_single mt-0 mb-3 border-0" type="button">
                                  <LazyLoadImage effect="blur" className="img-fluid" src={`/assets/images/ProductdetailPage/Group 22922.png`} alt={t('AdvancedCustomization')} width="auto" height="auto" />
                                  {t('AdvancedCustomization')} </LinkComponent>
                              </Col>
                            )}
                          </>
                        ) : (
                          <Col xs={6} className="ps-1">

                            <Button className="btn btn-primary w-100 btn_two mb-2" onClick={() => setContactUsModalOpen(true)} > <BsFillTelephoneFill size={24} className="mx-2" /> {t('ContactUs')}</Button>
                          </Col>
                        )}

                      </>
                    )}
                </Row>


                {/* {direct_price_yn && data && data.SPI_PRODUCT_YN == 'Y' ? (
                  <Mood {...data} setMoodBoard={setMoodBoard} active_item_id={active_item_array[0]} active_item_img={data.sfi_ref_colors_item_id[active_item_array[0]]?.split('|')[7]} />
                ) : (<></>)} */}
              </div>
            </Col>
          </Row>

        </Col>
      </Row>
      {show ? (<AddtoCartModal loginShow={show} {...item} page_name="detail" active_item_id={active_item_id?.split('|')[0]} category_slug={category_slug} loginOnHide={() => handleClose()} active_item_img={data.sfi_ref_colors_item_id[active_item_id?.split('|')[0]]?.split('|')[7]} />) : ('')}
      {/* {MoodBoard.show ? (<MoodBoardModal show={MoodBoard.show} {...MoodBoard} onHide={() => setMoodBoard(false)} />) : ('')} */}


    </div>
  );
}


const Wallpaper = (props) => {
  const { t } = useTranslation("common");
  const reduxDispatch = useDispatch();

  let active_item_array = props.active_item_id ? props.active_item_id?.split('|') : props.sfi_ref_colors_list[0] ? props.sfi_ref_colors_list[0]?.split('|') : false;
  let active_item_image = props.active_item_img ? props.active_item_img : false;
  let addtocart_sys_item_id = [];
  active_item_array = active_item_array.length == 1 ? active_item_array[0] : 0;
  let props_price = Number(props.PRICE).toFixed(decimalPoints);

  props.cartItems.map((row, key) => {

    if (row.brand_info && row.brand_info.SII_CODE && active_item_array == row.brand_info.SII_CODE) {
      addtocart_sys_item_id = row;
    }
  });

  props = {
    ...props,
    'item_label': 'ADD_TO_CART',
    'code': active_item_array ? active_item_array : 0,
    'count': addtocart_sys_item_id && addtocart_sys_item_id.SOL_QTY > 1 ? Number(addtocart_sys_item_id.SOL_QTY) : 1,
    'VALUE': props_price,
    'canvasImg': active_item_array ? item_img_path + active_item_image : '',
    'cart_status': 'COMPLETED',
  };

  const updateLineData = (qty, sys_id) => {
    let data = {
      ...props,
      'cart_sys_id': sys_id,
      'cart_method': 'ORDER_QTY',
      'cart_qty': qty
    };
    updateLineTable(data, reduxDispatch, t);

  };

  return (

    (addtocart_sys_item_id && addtocart_sys_item_id.brand_info && addtocart_sys_item_id.brand_info.SII_CODE == active_item_array ?
      <Button variant="btn btn-primary w-100 btn_two mb-3 Addtocart ready-made" onClick={() => { updateLineData(Number(addtocart_sys_item_id.SOL_QTY) + 1, addtocart_sys_item_id.SOL_SYS_ID) }} className="Addtocart ready-made Add_to_cart_initial">{t('AddToCart')}</Button>
      : <Button variant="btn btn-primary w-100 btn_two mb-3 Addtocart ready-made" onClick={() => { addToCartFun(props, reduxDispatch, t) }} className="Addtocart ready-made Add_to_cart_initial">{t('AddToCart')}</Button>)
  )
}
const FreeSample = (props) => {
  const { t } = useTranslation("common")
  const reduxDispatch = useDispatch();
  let active_item_array = props.active_item_id ? props.active_item_id : false;
  let active_item_image = props.active_item_img ? props.active_item_img : false;
  let item = '';
  let sys_id = [];
  let sampleSys = '';
  props = {
    ...props,
    'm_width': 15,
    'm_height': 15,
    'item_label': 'SAMPLE',
    'code': active_item_array ? active_item_array : 0,
    'PRICE': 0,
    'VALUE': 0,
    'count': 1,
    'canvasImg': active_item_array ? item_img_path + active_item_image : '',
    'cart_status': 'COMPLETED',
    'sampleItem': [],
    'sampleSysId': [],
    'page_name': 'detail'


  };
  let SAMPLE_LIST = props.cartItems ? props.cartItems : [];
  SAMPLE_LIST && SAMPLE_LIST.map((row, key) => {

    if (row.SOL_ITEM_LABEL == 'SAMPLE') {
      props.sampleSysId.push(row.SOL_SYS_ID);
      props.sampleItem.push(row?.brand_info?.SII_CODE);
    }
  });



  sampleSys = props.sampleSysId[props.sampleItem.indexOf(active_item_array)];
  if (props.sampleItem.indexOf(active_item_array) >= 0) {
    return (
      <Col sm={props.PRICE_OLD > 0 ? 4 : 6} className="d-none d-md-block float-end" onClick={() => reduxDispatch(removeFromCart({ ...props, sys_id: sampleSys }))} title={t("RemoveFreeSample")} >
        <div className="border-button mt-1  float-end">
          <img className="img-fluid" onError={onError} src={`/assets/images/ProductdetailPage/checked.png`} alt={t('Remove')} width="auto" height="auto" />
          <span>{t('Remove')} </span>
        </div>
      </Col>
    )
  } else {
    return (
      <Col xs={12} sm={props.PRICE_OLD > 0 ? 4 : 6} className="d-none d-md-block float-end" onClick={() => { reduxDispatch(addToCart(props)) }} title={t("OrderFreeSample")} >
        <div className="border-button mt-1  float-end">
          <img onError={onError} className="img-fluid" src={`/assets/images/ProductdetailPage/Group 6713.png`} alt={t('FreeSample')} width="auto" height="auto" />
          <span> {t('FreeSample')}</span>
        </div>
      </Col>
    )
  }




}


const Mood = (props) => {
  const { t } = useTranslation("common")
  const reduxDispatch = useDispatch();
  let active_item_id = props.active_item_id ? props.active_item_id : false;
  let item = '';
  let sys_id = [];
  let moodSys = '';
  props = {
    ...props,
    'show': true,
    'page_name': '',
    'active_item_id': active_item_id ? active_item_id : '',
    'code': active_item_id,
    'moodItem': [],
    'moodSysId': [],
    'page_name': 'detail'
  };

  props.MOOD_LIST && props.MOOD_LIST.map((row, key) => {
    item = row?.split('|')[1];
    sys_id = row?.split('|')[0];

    if (props.moodItem.indexOf(item) === -1 && item != undefined) {
      props.moodItem.push(item);
      props.moodSysId.push(sys_id);

    }
  });


  moodSys = props.moodSysId[props.moodItem.indexOf(active_item_id)];
  if (props.moodItem.indexOf(active_item_id) >= 0) {

    return (
      <div className="add-wish position-absolute top-0 end-0" style={{ zIndex: "11" }}>
        <img role="button" className="img-fluid" onError={onError} onClick={() => reduxDispatch(removeMood({ ...props, sys_id: moodSys, item_label: 'REMOVE_TO_MOOD' }))} src={`/assets/images/ProductdetailPage/20.png`} alt={t('Wishlist')} width="auto" height="auto" />
      </div>
    )
  } else {
    return (
      <div className="add-wish position-absolute top-0 end-0">
        <img role="button" className="img-fluid" onError={onError} onClick={() => props.setMoodBoard(props)} src={`/assets/images/ProductdetailPage/21.png`} alt={t('Wishlist')} width="auto" height="auto" />
      </div>
    )
  }



}

const ProductMaterialDetail = (props) => {
  const { t } = useTranslation("common")
  const router = useRouter();
  const { query, locale } = useRouter();
  const { slug } = query;


  let category_slug = slug && slug[0] || undefined;
  let sub_category_slug = slug && slug[1] || undefined;
  let product_slug = slug && slug[2] || undefined;
  let item_slug = slug && slug[3] || undefined;
  let line_sys_id = slug && slug[4] || undefined;

  // console.log(props, 'propspropsprops');

  // const material_detail = props?.specificationData || []; //useSelector(store => store.material_detail);
  const listings = props?.ProductsDetailsData || [];
  const breadcrumb = props?.ProductsDetailsData?.BREADCRUMB;




  return (
    <>
      {listings.LISTING && listings.LISTING ?
        <div className="ProductMaterialDetail">
          <Container className="maxwidth">
            <Row>
              <Col>
                <Breadcrumb>
                  {breadcrumb && (
                    <Breadcrumb.Item href={`/${locale}`} linkProps={{ to: `/` }} linkAs={LinkComponent}>{t("Home")}</Breadcrumb.Item>
                  )}
                  {breadcrumb?.PARENT_LINK_URL && (
                    <Breadcrumb.Item href={`/${breadcrumb.PARENT_LINK_URL}`} linkProps={{ to: `/${breadcrumb.PARENT_LINK_URL}` }} linkAs={LinkComponent}> {breadcrumb.LINK_PATH?.split('/')[1]}</Breadcrumb.Item>
                  )}
                  {breadcrumb?.LINK_URL && (
                    <Breadcrumb.Item href={`/${breadcrumb.PARENT_LINK_URL}/${breadcrumb.LINK_URL}`} linkAs={LinkComponent}>{breadcrumb.LINK_PATH?.split('/')[2]}</Breadcrumb.Item>
                  )}
                  {breadcrumb?.SPI_LINK_URL && breadcrumb?.LINK_PATH?.split('/')[2] != breadcrumb?.LINK_PATH?.split('/')[3] && (
                    // <Breadcrumb.Item linkProps={{ to: `/${breadcrumb.PARENT_LINK_URL}/${breadcrumb.LINK_URL}/${breadcrumb.SPI_LINK_URL}` }} linkAs={LinkComponent}>{breadcrumb.LINK_PATH.split('/')[3]}</Breadcrumb.Item>
                    <Breadcrumb.Item active style={{ fontSize: '14px' }}>{breadcrumb?.LINK_PATH?.split('/')[3]}</Breadcrumb.Item>
                  )}
                  {listings.LISTING[0] && (
                    <Breadcrumb.Item active style={{ fontSize: '14px' }}>{listings.LISTING[0].SFI_DESC}</Breadcrumb.Item>
                  )}
                </Breadcrumb>


              </Col>
            </Row>
            {props?.specificationData ? (
              <>
                <ProductListCardView {...listings} user_dispatch={props.user_dispatch} cartItems={props.cartItems} user_info={props?.user_state?.user_info} />
                {/* <ProductMaterialOtherDetail {...listings.LISTING[0]} item={item_slug} loading={material_detail} /> */}
                <ProductMaterialOtherDetail {...props} item={item_slug} />
              </>
            ) : ('')}

            {/* <Instagram /> */}
          </Container>

        </div>
        : <PageLayoutContentLoader />}
    </>
  );

}

function ProductMaterialDetailSamplePopup(props) {
  const { t } = useTranslation("common")
  return (
    <Modal  {...props} size="lg" centered className="ProductMaterialDetailSamplePopup" >
      <Modal.Body className="p-0 ">
        <LazyLoadImage effect="blur" onClick={props.onHide} role="button" className="img-fluid position-absolute top-0 end-0 m-2 m-md-3" src={`/assets/images/ProductdetailPage/modalclose.png`} alt="" width="auto" height="auto" />

        <Row>
          <Col lg={6} className="pt-4 pt-md-0">
            <div className="p-4 p-md-5">
              <div className="heading">
                <h2>Get Free Samples !</h2>
                <p>Not Sure which colour fabric to buy? Then Choose up to samples and we’ll ship them to you, free of charge.</p>
              </div>
              <div className="SamplePopupContent">
                <div className="d-flex align-items-center  py-2">
                  <div className="flex-shrink-0 pe-4 w-25">
                    <LazyLoadImage effect="blur" className="img-fluid" src={`/assets/images/ProductdetailPage/Group7046.png`} alt="" width="auto" height="auto" />

                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h4>Choose Your Samples</h4>
                    <p>On a product page select “Free Sample”, remember you can order up to 8 FREE samples!</p>
                  </div>
                </div>
                <div className="d-flex align-items-center  py-2">
                  <div className="flex-shrink-0 pe-4 w-25">
                    <LazyLoadImage effect="blur" className="img-fluid" src={`/assets/images/ProductdetailPage/626454.png`} alt="" width="auto" height="auto" />

                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h4>Order Desire Samples</h4>
                    <p>Our samples team will pack your samples up and send them off as soon as possible.</p>
                  </div>
                </div>
                <div className="d-flex align-items-center  py-2">
                  <div className="flex-shrink-0 pe-4 w-25">
                    <LazyLoadImage effect="blur" className="img-fluid" src={`/assets/images/ProductdetailPage/Group7047.png`} alt="" width="auto" height="auto" />

                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h4>Speedy Delivery</h4>
                    <p>Our speedy delivery service will have your free samples to your door in no time.</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} className="d-none d-lg-block">
            <LazyLoadImage effect="blur" className="img-fluid h-100" src={`/assets/images/ProductdetailPage/Mask Group 119.png`} alt="" width="auto" height="auto" />
          </Col>
        </Row>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer, numberCart: state.cart.numberCart, cartItems: state.cart.cartItems });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductMaterialDetail)