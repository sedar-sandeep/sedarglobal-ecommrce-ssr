import _ from 'lodash';
import React, { useState, useEffect, lazy, Fragment } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
// import { Col, Row, Card, Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { RiInformationLine } from 'react-icons/ri';
import { addToCartFun, updateLineTable } from './AddToCart';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/router';

import SwiperCore, { Navigation, Pagination, Thumbs, Virtual } from 'swiper';
import { isMobile, isTablet, isDesktop } from 'react-device-detect';
import LinkComponent from '@components/Link';
import { useTranslation } from 'next-i18next';
import { priceReset, addToCart, removeFromCart, removeMood } from 'src/Redux-Config/Actions/index';
import { langName, onError } from '@utils/i18n';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { ImageComponent, IconComponent } from '@components/image';

const asset_img = process.env.NEXT_PUBLIC_IMAGE_URL;
const item_img_path = process.env.NEXT_PUBLIC_ITEM_IMG_PATH + 'laptop/';
const item_img_path_tile = process.env.NEXT_PUBLIC_ITEM_IMG_PATH + 'hover/';
const color_img_path = process.env.NEXT_PUBLIC_S3_COLOR_PATH;
const canvasImgPath = process.env.NEXT_PUBLIC_ITEM_IMG_PATH;

SwiperCore.use([Navigation, Pagination, Thumbs, Virtual]);

const ContactUsModal = dynamic(() => import('../Modals/ContactUsModal'), { ssr: false });
const MoodBoardModal = dynamic(() => import('../Modals/WishList/MoodBoard'), { ssr: false });
const CurrencyFormat = dynamic(() => import('../../services/CurrencyFormat'));

const AddtoCartModal = dynamic(() => import('../Modals/QuickByModal/AddtoCartModal'), {
  ssr: false,
});
const site = Cookies.get('siteDetail');
let decimalPoints = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_decimals >= 0 ? parseInt(JSON.parse(site).show_decimals) : 0;

const MaterialCard = (props) => {

  let searchParams = new URLSearchParams(typeof window != 'undefined' ? window.location.search : '');
  let colorKey = searchParams.get('Color');
  let availabilityKey = searchParams.get('Availability');
  let availabilityValues = searchParams.getAll('Availability')[0] != undefined ? searchParams.getAll('Availability')[0]?.split('|') : [];
  let availability_array = [];
  let availability_item_array = [];

  availability_array =
    availabilityValues &&
    availabilityValues.map((row, key) => {
      return row.toUpperCase().replace(/[^a-zA-Z0-9]/g, '');
    });

  let datapush = [];
  let datapush_availability = [];
  let filterpush = [];
  let datapush_value = [];
  const [MoodBoard, setMoodBoard] = useState(false);
  const [galleryDataKey, SetGalleryDatakey] = useState(false);
  const [item_stock_status, SetItemStockStatus] = useState(false);
  const [colorName, SetColorkey] = useState(false);
  const [itemDesc, SetItemDesc] = useState(false);
  // const { setShow } = useLoader();
  const siteDe = useSelector((store) => store.MenusItemReduser.siteDetail);
  let direct_price_yn = siteDe != undefined && siteDe && siteDe.direct_price_yn == 'Y' ? true : false;
  let show_price_yn = siteDe != undefined && siteDe && siteDe.show_price_yn;

  let from_price = Number(props.FROM_PRICE).toFixed(decimalPoints); //Math.round(props.FROM_PRICE * 100) / 100;
  let from_price_old = Number(props.FROM_PRICE_OLD).toFixed(decimalPoints);
  let props_price = Number(props.PRICE).toFixed(decimalPoints);
  let props_price_old = Number(props.PRICE_OLD).toFixed(decimalPoints);

  const { query } = useRouter();
  const { slug } = query;

  let category_slug = (slug && slug[0]) || undefined;
  let sub_category_slug = (slug && slug[1]) || undefined;

  const [state, setState] = useState({
    show: false,
    item: false,
    active_item_id: false,
  });

  const dispatch = useDispatch();

  const renderTooltip = (props) => (
    <Popover id="popover-basic" className="customize-tooltip" {...props}>
      <Popover.Body>There’s nothing more exciting to us than working with go-getters to turn their vision into something tangible, putting it out into the world.</Popover.Body>
    </Popover>
  );

  let currency = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_ccy_code ? JSON.parse(site).show_ccy_code : '';

  const [numberOfColorShow, setNumberOfColorShow] = useState({ [0]: 6 });
  const [activeImage, setActiveImage] = useState([]);

  const handleShow = (data) => {
    if (availabilityKey) {
      setState({
        ...state,
        show: true,
        item: data,
        active_item_id: galleryDataKey ? galleryDataKey : availability_item_array[0] && availability_item_array[0]?.split('|')[0] ? availability_item_array[0]?.split('|')[0] : props.sfi_ref_colors_list[0]?.split('|')[0],
        active_item_img: galleryDataKey ? galleryDataKey : availability_item_array[0] && availability_item_array[0]?.split('|')[7] ? availability_item_array[0]?.split('|')[7] : props.sfi_ref_colors_list[0]?.split('|')[7],
      });
    } else {
      setState({ ...state, show: true, item: data, active_item_id: galleryDataKey ? galleryDataKey : props.sfi_ref_colors_list[0]?.split('|')[0], active_item_img: galleryDataKey ? galleryDataKey : props.sfi_ref_colors_list[0]?.split('|')[7] });
    }
  };
  const handleClose = () => {
    setState({ ...state, show: false, item: '' });
  };

  let color_length = props.sfi_ref_colors_list != undefined ? props.sfi_ref_colors_list.length : 0;
  let more_color_text = numberOfColorShow[props.SFI_CODE] ? numberOfColorShow[props.SFI_CODE] : numberOfColorShow[0];
  //let item_img = galleryDataKey ? galleryDataKey : props.sfi_ref_colors_list[0].split('|')[0];
  let color_code = colorName ? colorName : props.sfi_ref_colors_list[0]?.split('|')[5];
  let item_desc = itemDesc
    ? itemDesc
    : props.sfi_ref_colors_list[0]?.split('|')[1] && props.sfi_ref_colors_list[0]?.split('|')[1]?.split('-').length > 1
      ? props.sfi_ref_colors_list[0]?.split('|')[1]?.split('-')?.splice(1)?.join('-')
      : props.sfi_ref_colors_list[0]?.split('|')[1];

  let status = 'INSTOCK';

  let item_code = '';
  props.sfi_ref_colors_list &&
    props.sfi_ref_colors_list.slice(0, more_color_text).map((row, key) => {
      let item = row?.split('|');
      let SLI_SII_CODE = row?.split('|')[0];

      status = props.stock_status[SLI_SII_CODE] && props.stock_status[SLI_SII_CODE] && props.stock_status[SLI_SII_CODE]?.split('|')[0] != 'undefined' ? props.stock_status[SLI_SII_CODE]?.split('|')[0] : 'INSTOCK';

      if (colorKey && availabilityKey) {
        datapush = searchParams.getAll('Color')[0]?.split('|');
        if (datapush.indexOf(row?.split('|')[5]) != -1 && availability_array.indexOf(status) != -1) {
          item_code = SLI_SII_CODE;
          color_code = row?.split('|')[5];
        }
      } else if (colorKey) {
        datapush = searchParams.getAll('Color')[0]?.split('|');
        if (datapush.indexOf(row?.split('|')[5]) != -1) {
          item_code = SLI_SII_CODE;
          color_code = row?.split('|')[5];
        }
      } else if (availabilityKey) {
        const filtered = availability_array.filter((obj) => {
          return obj === 'EXPRESS';
        });

        if (availability_array.indexOf(status) != -1) {
          availability_item_array.push(props.sfi_ref_colors_item_id[SLI_SII_CODE]);
          item_code = availability_item_array[0]?.split('|')[0];
          color_code = availability_item_array[0]?.split('|')[5];
          item_desc = itemDesc ? itemDesc : availability_item_array[0]?.split('|')[1]?.split('-')?.splice(1)?.join('-');
        }
      } else {
        item_code = props.sfi_ref_colors_list[0]?.split('|')[0];
        // item_desc = props.sfi_ref_colors_list[0]?.split('|')[1]?.split('-')?.splice(1)?.join('-');
      }
    });

  useEffect(() => {
    if (!state.show) {
      SetGalleryDatakey(item_code);
      SetItemStockStatus(item_code);

    }
  }, [props]);

  let item_img = galleryDataKey ? galleryDataKey : item_code;

  useEffect(() => {
    if (!state.show) {
      SetItemStockStatus(item_img);
      SetColorkey(props.sfi_ref_colors_item_id[item_img]?.split('|')[5]);
      SetItemDesc(props.sfi_ref_colors_item_id[item_img]?.split('|')[1]?.split('-')?.splice(1)?.join('-'));
    }
  }, [item_img]);


  const [ContactUsModalOpen, setContactUsModalOpen] = React.useState(false);
  const { t } = useTranslation('common');
  return (
    <>
      {ContactUsModalOpen && <ContactUsModal show={ContactUsModalOpen} onHide={() => setContactUsModalOpen(false)} />}

      <Card className="hover mb-2 mb-md-3 border-1">
        <div className="position-relative">
          {props.SFI_SAMPLE_APP_YN == 'Y' && direct_price_yn && show_price_yn == 'Y' ? (
            <FreeSample {...props} setLoader={props.setLoader} user_dispatch={props.user_dispatch} position="top" active_item_id={item_img} active_item_img={props.sfi_ref_colors_item_id[item_img]?.split('|')[7]} />
          ) : (
            ''
          )}
          {/* {direct_price_yn && props.SPI_PRODUCT_YN == 'Y' ? <Mood {...props} setMoodBoard={setMoodBoard} active_item_id={item_img} active_item_img={props.sfi_ref_colors_item_id[item_img]?.split('|')[7]} /> : <></>} */}

          {isDesktop
            ? props.gallery && <ImageGroupSlider gallery={props.gallery} ActivegalleryKey={item_img} galleryKey={props.sfi_ref_colors_list[0]?.split('|')[0]} {...props} />
            : props.gallery && (
              <LinkComponent href={`${props.url}/${item_img}`}>
                <ImageGroupSlider gallery={props.gallery} ActivegalleryKey={item_img} galleryKey={props.sfi_ref_colors_list[0]?.split('|')[0]} {...props} />
              </LinkComponent>
            )}

          <div className="card-view-detail pb-1 pb-md-2">
            {direct_price_yn && show_price_yn == 'Y' && ['A1', 'A3', 'A5'].indexOf(props.SPI_ADD_TO_CART_TYPE) >= 0 ? (
              <Col xs={6} className="py-3 ps-3 pe-2" onClick={() => dispatch(priceReset())}>
                {props.data.data && props.data.data.type == 'free_sample' ? (
                  <FreeSample {...props} setLoader={props.setLoader} types="free_sample" user_dispatch={props.user_dispatch} active_item_id={item_img} />
                ) : (
                  <Button variant="primary" className="Add_to_cart_initial" onClick={(e) => handleShow(props)}>
                    {t('Select_Options')}
                  </Button>
                )}
              </Col>
            ) : (
              <Col xs={6} className="py-3 ps-3 pe-2">
                <Button
                  variant="primary"
                  onClick={() => {
                    setContactUsModalOpen(true);
                  }}>
                  {' '}
                  {t('ContactUs')}
                </Button>
              </Col>
            )}
            <Col xs={6} className="py-3 ps-2 pe-3">
              <LinkComponent href={`${props.url}/${item_img}`}>
                <Button variant="secondary text-light">{t('ViewDetail')}</Button>
              </LinkComponent>
            </Col>
          </div>

          {isDesktop && props.data.data && props.data.data.type != 'free_sample' && ['A2', 'A4'].indexOf(props.SPI_ADD_TO_CART_TYPE) >= 0 && show_price_yn == 'Y' ? (
            <Wallpaper
              {...props}
              setLoader={props.setLoader}
              item_img={item_img}
              user_dispatch={props.user_dispatch}
              active_item_id={item_img}
              color_code={color_code}
              item_desc={item_desc}
              direct_price_yn={direct_price_yn && direct_price_yn}
              ContactUs={() => setContactUsModalOpen(true)}
            />
          ) : (
            ''
          )}
        </div>

        <Card.Body className={'row m-0 p-0 pt-0 pt-sm-2'}>
          <Col sm={12} className="mb-2 order-2  order-md-1">
            <div className="group-detail">
              <Row>
                <Col>
                  {/* ***************product Offer start **************** */}
                  {props.offer_product == 'Y' && ['EGP'].indexOf(props.SFP_CCY_CODE) == -1 ? (
                    <div className="pricepart">
                      {category_slug == 'wallpaper' && props.SPI_PR_ITEM_CODE != 1566884 ? <p className="pricelabel">{t('total_price_of_rolls', { roll: props.LEADER_QTY })}</p> : ['furnishings', 'smart-home'].indexOf(category_slug) == -1 ? <p className="pricelabel">{t('PricesFrom')}</p> : ''}

                      {/* {`${props.PRICE}`} */}
                      <Card.Text className="price">
                        {props.data && props.data ? (
                          <CurrencyFormat
                            value={['A1', 'A3', 'A5'].indexOf(props.SPI_ADD_TO_CART_TYPE) >= 0 && props.data.size_filter_value > props.SPI_MINIMUM_CHG_QTY ? from_price * props.data.size_filter_value : props_price ? props_price : 0}
                            displayType={'text'}
                            thousandSeparator={true}
                            decimalScale={decimalPoints}
                            fixedDecimalScale={decimalPoints > 0 ? true : false}
                            isNumericString={decimalPoints > 0 ? false : true}
                            prefix={`${props.SFP_CCY_CODE} `}
                          />
                        ) : (
                          <CurrencyFormat
                            value={props_price ? props_price : 0}
                            displayType={'text'}
                            thousandSeparator={true}
                            decimalScale={decimalPoints}
                            fixedDecimalScale={decimalPoints > 0 ? true : false}
                            isNumericString={decimalPoints > 0 ? false : true}
                            prefix={`${props.SFP_CCY_CODE} `}
                          />
                        )}
                      </Card.Text>

                      <Card.Text className="discount">
                        {Number(props_price_old) > Number(props_price) && (
                          <>
                            {/* {props.SPI_PRODUCT_YN == 'Y'} */}
                            <del>
                              <CurrencyFormat
                                value={['A1', 'A3', 'A5'].indexOf(props.SPI_ADD_TO_CART_TYPE) >= 0 && props.data.size_filter_value > props.SPI_MINIMUM_CHG_QTY ? from_price_old * props.data.size_filter_value : props_price_old ? props_price_old : 0}
                                displayType={'text'}
                                thousandSeparator={true}
                                decimalScale={decimalPoints}
                                fixedDecimalScale={decimalPoints > 0 ? true : false}
                                isNumericString={decimalPoints > 0 ? false : true}
                                prefix={props.SFP_CCY_CODE}
                              />
                            </del>{' '}
                            {props.OFFER_PCT > 0 && langName != 'ar' ? props.OFFER_PCT + '% ' + t('OFF') : props.OFFER_PCT > 0 && langName == 'ar' ? t('OFF') + ' ' + props.OFFER_PCT + '%' : null}
                          </>
                        )}

                        {props_price_old != null && props_price_old == 0 ? <span style={{ opacity: '0' }}>no offer</span> : ''}
                      </Card.Text>
                    </div>
                  ) : (
                    ''
                  )}

                  {/* ***************product Offer End **************** */}

                  {props.data.data && props.data.data.type != 'free_sample' && show_price_yn == 'Y' && ['EGP'].indexOf(props.SFP_CCY_CODE) == -1 && (
                    <>
                      <div className="pricepart">
                        {category_slug == 'wallpaper' && props.SPI_PR_ITEM_CODE != 1566884 ? <p className="pricelabel">{t('total_price_of_rolls', { roll: props.LEADER_QTY })}</p> : ['furnishings', 'smart-home'].indexOf(category_slug) == -1 ? <p className="pricelabel">{t('PricesFrom')}</p> : ''}

                        {/* {`${props.PRICE}`} */}
                        <Card.Text className="price">
                          {props.data.data && props.data.data ? (
                            <CurrencyFormat
                              value={['A1', 'A3', 'A5'].indexOf(props.SPI_ADD_TO_CART_TYPE) >= 0 && props.data.data.size_filter_value > props.SPI_MINIMUM_CHG_QTY ? from_price * props.data.data.size_filter_value : props_price ? props_price : 0}
                              displayType={'text'}
                              thousandSeparator={true}
                              decimalScale={decimalPoints}
                              fixedDecimalScale={decimalPoints > 0 ? true : false}
                              isNumericString={decimalPoints > 0 ? false : true}
                              prefix={`${props.SFP_CCY_CODE} `}
                            />
                          ) : (
                            <CurrencyFormat
                              value={props_price ? props_price : 0}
                              displayType={'text'}
                              thousandSeparator={true}
                              decimalScale={decimalPoints}
                              fixedDecimalScale={decimalPoints > 0 ? true : false}
                              isNumericString={decimalPoints > 0 ? false : true}
                              prefix={`${props.SFP_CCY_CODE} `}
                            />
                          )}
                        </Card.Text>

                        <Card.Text className="discount">
                          {Number(props_price_old) > Number(props_price) && (
                            <>
                              {/* {props.SPI_PRODUCT_YN == 'Y'} */}
                              <del>
                                <CurrencyFormat
                                  value={
                                    ['A1', 'A3', 'A5'].indexOf(props.SPI_ADD_TO_CART_TYPE) >= 0 && props.data.data.size_filter_value > props.SPI_MINIMUM_CHG_QTY
                                      ? from_price_old * props.data.data.size_filter_value
                                      : props_price_old
                                        ? props_price_old
                                        : 0
                                  }
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  decimalScale={decimalPoints}
                                  fixedDecimalScale={decimalPoints > 0 ? true : false}
                                  isNumericString={decimalPoints > 0 ? false : true}
                                  prefix={props.SFP_CCY_CODE}
                                />
                              </del>{' '}
                              {props.OFFER_PCT > 0 && langName != 'ar' ? props.OFFER_PCT + '% ' + t('OFF') : props.OFFER_PCT > 0 && langName == 'ar' ? t('OFF') + ' ' + props.OFFER_PCT + '%' : null}
                            </>
                          )}

                          {props_price_old != null && props_price_old == 0 ? <span style={{ opacity: '0' }}>no offer</span> : ''}
                        </Card.Text>
                      </div>
                      {/* {props.SPI_PRODUCT_YN != 'N'} */}
                      {props.SII_CUSTOMIZABLE_YN == 'Y' && ['A1', 'A3', 'A5'].indexOf(props.SPI_ADD_TO_CART_TYPE) >= 0 && (
                        <Col className="customize-btn d-none d-sm-block">
                          <LinkComponent href={`${props.url}/customize`} className="btn btn-primary sedar-btn" type="button">
                            {' '}
                            {t('CustomizeAndBuy')}
                            <OverlayTrigger overlay={renderTooltip}>
                              <span>
                                <RiInformationLine size={21} />
                              </span>
                            </OverlayTrigger>
                          </LinkComponent>
                        </Col>
                      )}
                    </>
                  )}
                </Col>
                <Col className={langName != 'ar' ? 'text-end' : 'text-start'} xs={5}>
                  <span>
                    <LazyLoadImage effect="blur" className="img-fluid browsebrandlogo" src={props.BRAND_IMAGE_PATH} alt={props.BRAND_DESC} data-toggle="tooltip" data-html="true" title={props.BRAND_DESC} width="auto" height="auto" />
                  </span>
                  {/* <IconComponent
                    classprops="img-fluid browsebrandlogo"
                    src={props.BRAND_IMAGE_PATH}
                    alt={props.BRAND_DESC}
                    width={109}
                    height={15}
                    justifyContent={'right'}
                  /> */}
                </Col>
              </Row>
            </div>
          </Col>
          <Col sm={12} className="textcard order-3 order-md-2">
            <div className="itemcode">
              <span > {item_desc}</span>

              {/* <span className="float-end"> {t(color_code)}</span> */}
            </div>
            <Card.Text as="h2" className="itemname">
              {' '}
              {props.SFP_TITLE}{' '}-{' '}{t(color_code)}
              {category_slug == 'furnishings' && props.SPI_WIDTH_STANDARD > 0 && props.SPI_HEIGHT_STANDARD > 0 ? ' - ' + props.SPI_WIDTH_STANDARD + ' x ' + props.SPI_HEIGHT_STANDARD + t('cm') : ''}
            </Card.Text>
            {/* {props.SPI_PRODUCT_YN == 'Y'} */}
            {isMobile && props.data.data && props.data.data.type != 'free_sample' && ['A1', 'A3', 'A5'].indexOf(props.SPI_ADD_TO_CART_TYPE) >= 0 && show_price_yn == 'Y' ? (
              direct_price_yn ? (
                <div className="pt-2" onClick={() => dispatch(priceReset())}>
                  <Button variant="primary QuickbuyMobile mb-2" className="Add_to_cart_initial" onClick={(e) => handleShow(props)}>
                    {' '}
                    {t('Select_Options')}
                  </Button>
                </div>
              ) : (
                ''
              )
            ) : (
              ''
            )}

            {isMobile && props.offer_product == 'Y' && props.data && props.data.type != 'free_sample' && ['A1', 'A3', 'A5'].indexOf(props.SPI_ADD_TO_CART_TYPE) >= 0 && show_price_yn == 'Y' ? (
              direct_price_yn ? (
                <div className="pt-2" onClick={() => dispatch(priceReset())}>
                  <Button variant="primary QuickbuyMobile mb-2" className="Add_to_cart_initial" onClick={(e) => handleShow(props)}>
                    {' '}
                    {t('Select_Options')}
                  </Button>
                </div>
              ) : (
                ''
              )
            ) : (
              ''
            )}

            {isMobile && props.data.data && ['B1'].indexOf(props.SPI_ADD_TO_CART_TYPE) >= 0 ? (
              <div className="pt-2">
                <Button variant="primary QuickbuyMobile mb-2" onClick={() => setContactUsModalOpen(true)}>
                  {' '}
                  {t('ContactUs')}
                </Button>
              </div>
            ) : (
              ''
            )}

            {/* {props.SPI_PRODUCT_YN == 'N'} */}
            {isMobile && props.data.data && props.data.data.type != 'free_sample' && ['A2', 'A4'].indexOf(props.SPI_ADD_TO_CART_TYPE) >= 0 && props.SPI_ALLOW_CUSTOMIZATION_YN == 'N' && show_price_yn == 'Y' ? (
              <div className="pt-2">
                <Wallpaper
                  {...props}
                  setLoader={props.setLoader}
                  item_img={item_img}
                  user_dispatch={props.user_dispatch}
                  active_item_id={item_img}
                  color_code={color_code}
                  item_desc={item_desc}
                  direct_price_yn={direct_price_yn && direct_price_yn}
                  ContactUs={() => setContactUsModalOpen(true)}
                />
              </div>
            ) : (
              ''
            )}
          </Col>

          <Col sm={12} className="order-1 order-md-3 py-2">
            {isMobile ? (
              <div className="">
                <Swiper spaceBetween={3} slidesPerView={4} loop={false}>
                  {color_length > 0
                    ? props.sfi_ref_colors_list.slice(0, more_color_text).map((row, key) => {
                      let SLI_SII_CODE = row?.split('|')[0];
                      let SLI_DESC = row?.split('|')[1] && row?.split('|')[1]?.split('-').length > 1 ? row?.split('|')[1]?.split('-').splice(1).join('-') : row?.split('|')[1];
                      let SLI_COLOR = row?.split('|')[5];
                      let STOCK_STATUS = props.stock_status[SLI_SII_CODE] && props.stock_status[SLI_SII_CODE] && props.stock_status[SLI_SII_CODE]?.split('|')[0] != 'undefined' ? props.stock_status[SLI_SII_CODE]?.split('|')[0] : 'INSTOCK';

                      if (colorKey && availabilityKey) {
                        datapush = searchParams.getAll('Color')[0]?.split('|');

                        if (datapush.indexOf(row?.split('|')[5]) != -1 && availability_array.indexOf(STOCK_STATUS) != -1) {
                          return (
                            <>
                              <SwiperSlide key={key}>
                                {/* <LazyLoadImage onClick={() => { SetItemStockStatus(SLI_SII_CODE), SetGalleryDatakey(SLI_SII_CODE), SetColorkey(SLI_COLOR), SetItemDesc(SLI_DESC) }} effect="blur" className={galleryDataKey == false ? SLI_SII_CODE == props.sfi_ref_colors_list[0].split('|')[0] ? 'color_image img-fluid active' : 'color_image img-fluid' : SLI_SII_CODE == galleryDataKey ? 'color_image img-fluid active' : 'color_image img-fluid'} src={`${item_img_path_tile}${row.split('|')[0]}.webp`} alt={props.DESCRIPTION} data-toggle="tooltip" data-html="true" title={SLI_DESC} width={36}
                                  height={36} /> */}
                                <div
                                  onClick={() => {
                                    SetItemStockStatus(SLI_SII_CODE), SetGalleryDatakey(SLI_SII_CODE), SetColorkey(SLI_COLOR), SetItemDesc(SLI_DESC);
                                  }}>
                                  <IconComponent
                                    classprops={
                                      galleryDataKey == false
                                        ? SLI_SII_CODE == props.sfi_ref_colors_list[0]?.split('|')[0]
                                          ? 'color_image img-fluid active'
                                          : 'color_image img-fluid'
                                        : SLI_SII_CODE == galleryDataKey
                                          ? 'color_image img-fluid active'
                                          : 'color_image img-fluid'
                                    }
                                    src={`${item_img_path_tile}${row?.split('|')[6]}`}
                                    alt={props.DESCRIPTION}
                                    width={36}
                                    height={36}
                                    marginLeftRight
                                    contains={true}
                                    quality={70}
                                  />
                                </div>
                              </SwiperSlide>
                            </>
                          );
                        }
                      } else if (colorKey) {
                        datapush = searchParams.getAll('Color')[0]?.split('|');
                        if (datapush.indexOf(row?.split('|')[5]) != -1) {
                          return (
                            <>
                              <SwiperSlide key={key}>
                                {/* <LazyLoadImage onClick={() => { SetItemStockStatus(SLI_SII_CODE), SetGalleryDatakey(SLI_SII_CODE), SetColorkey(SLI_COLOR), SetItemDesc(SLI_DESC) }} effect="blur" className={galleryDataKey == false ? SLI_SII_CODE == props.sfi_ref_colors_list[0].split('|')[0] ? 'color_image img-fluid active' : 'color_image img-fluid' : SLI_SII_CODE == galleryDataKey ? 'color_image img-fluid active' : 'color_image img-fluid'} src={`${item_img_path_tile}${row.split('|')[0]}.webp`} alt={props.DESCRIPTION} data-toggle="tooltip" data-html="true" title={SLI_DESC} width={36}
                                  height={36} /> */}
                                <div
                                  onClick={() => {
                                    SetItemStockStatus(SLI_SII_CODE), SetGalleryDatakey(SLI_SII_CODE), SetColorkey(SLI_COLOR), SetItemDesc(SLI_DESC);
                                  }}>
                                  <IconComponent
                                    classprops={
                                      galleryDataKey == false
                                        ? SLI_SII_CODE == props.sfi_ref_colors_list[0]?.split('|')[0]
                                          ? 'color_image img-fluid active'
                                          : 'color_image img-fluid'
                                        : SLI_SII_CODE == galleryDataKey
                                          ? 'color_image img-fluid active'
                                          : 'color_image img-fluid'
                                    }
                                    src={`${item_img_path_tile}${row?.split('|')[6]}`}
                                    width={36}
                                    height={36}
                                    alt={props.DESCRIPTION}
                                    marginLeftRight
                                    contains={true}
                                    quality={70}
                                  // onClick={() => { SetItemStockStatus(SLI_SII_CODE), SetGalleryDatakey(SLI_SII_CODE), SetColorkey(SLI_COLOR), SetItemDesc(SLI_DESC) }}
                                  />
                                </div>
                              </SwiperSlide>
                            </>
                          );
                        }
                      } else if (colorKey) {
                        datapush = searchParams.getAll('Color')[0]?.split('|');
                        if (datapush.indexOf(row?.split('|')[5]) != -1) {
                          return (
                            <>
                              <SwiperSlide key={key}>
                                {/* <LazyLoadImage onClick={() => { SetItemStockStatus(SLI_SII_CODE), SetGalleryDatakey(SLI_SII_CODE), SetColorkey(SLI_COLOR), SetItemDesc(SLI_DESC) }} effect="blur" className={galleryDataKey == false ? SLI_SII_CODE == props.sfi_ref_colors_list[0].split('|')[0] ? 'color_image img-fluid active' : 'color_image img-fluid' : SLI_SII_CODE == galleryDataKey ? 'color_image img-fluid active' : 'color_image img-fluid'} src={`${item_img_path_tile}${row.split('|')[0]}.webp`} alt={props.DESCRIPTION} data-toggle="tooltip" data-html="true" title={SLI_DESC} width={36}
                                  height={36} /> */}
                                <div
                                  onClick={() => {
                                    SetItemStockStatus(SLI_SII_CODE), SetGalleryDatakey(SLI_SII_CODE), SetColorkey(SLI_COLOR), SetItemDesc(SLI_DESC);
                                  }}>
                                  <IconComponent
                                    classprops={
                                      galleryDataKey == false
                                        ? SLI_SII_CODE == props.sfi_ref_colors_list[0]?.split('|')[0]
                                          ? 'color_image img-fluid active'
                                          : 'color_image img-fluid'
                                        : SLI_SII_CODE == galleryDataKey
                                          ? 'color_image img-fluid active'
                                          : 'color_image img-fluid'
                                    }
                                    src={`${item_img_path_tile}${row?.split('|')[6]}`}
                                    alt={props.DESCRIPTION}
                                    width={36}
                                    height={36}
                                    marginLeftRight
                                    contains={true}
                                    quality={70}
                                  // onClick={() => { SetItemStockStatus(SLI_SII_CODE), SetGalleryDatakey(SLI_SII_CODE), SetColorkey(SLI_COLOR), SetItemDesc(SLI_DESC) }}
                                  />
                                </div>
                              </SwiperSlide>
                            </>
                          );
                        }
                      } else if (availabilityKey) {
                        if (availability_array.indexOf(STOCK_STATUS) != -1) {
                          return (
                            <>
                              <SwiperSlide key={key}>
                                {/* <LazyLoadImage onClick={() => { SetItemStockStatus(SLI_SII_CODE), SetGalleryDatakey(SLI_SII_CODE), SetColorkey(SLI_COLOR), SetItemDesc(SLI_DESC) }} effect="blur" className={galleryDataKey == false ? SLI_SII_CODE == props.sfi_ref_colors_list[0].split('|')[0] ? 'color_image img-fluid active' : 'color_image img-fluid' : SLI_SII_CODE == galleryDataKey ? 'color_image img-fluid active' : 'color_image img-fluid'} src={`${item_img_path_tile}${row.split('|')[0]}.webp`} alt={props.DESCRIPTION} data-toggle="tooltip" data-html="true" title={SLI_DESC} width={36}
                                  height={36} /> */}
                                <div
                                  onClick={() => {
                                    SetItemStockStatus(SLI_SII_CODE), SetGalleryDatakey(SLI_SII_CODE), SetColorkey(SLI_COLOR), SetItemDesc(SLI_DESC);
                                  }}>
                                  <IconComponent
                                    classprops={
                                      galleryDataKey == false
                                        ? SLI_SII_CODE == props.sfi_ref_colors_list[0]?.split('|')[0]
                                          ? 'color_image img-fluid active'
                                          : 'color_image img-fluid'
                                        : SLI_SII_CODE == galleryDataKey
                                          ? 'color_image img-fluid active'
                                          : 'color_image img-fluid'
                                    }
                                    src={`${item_img_path_tile}${row?.split('|')[6]}`}
                                    alt={props.DESCRIPTION}
                                    width={36}
                                    height={36}
                                    marginLeftRight
                                    contains={true}
                                    quality={70}
                                  // onClick={() => { SetItemStockStatus(SLI_SII_CODE), SetGalleryDatakey(SLI_SII_CODE), SetColorkey(SLI_COLOR), SetItemDesc(SLI_DESC) }}
                                  />
                                </div>
                              </SwiperSlide>
                            </>
                          );
                        }
                      } else {
                        return (
                          <>
                            <SwiperSlide key={key}>
                              {/* <LazyLoadImage onClick={() => { SetItemStockStatus(SLI_SII_CODE), SetGalleryDatakey(SLI_SII_CODE), SetColorkey(SLI_COLOR), SetItemDesc(SLI_DESC) }} effect="blur" className={galleryDataKey == false ? SLI_SII_CODE == props.sfi_ref_colors_list[0].split('|')[0] ? 'color_image img-fluid active' : 'color_image img-fluid' : SLI_SII_CODE == galleryDataKey ? 'color_image img-fluid active' : 'color_image img-fluid'} src={`${item_img_path_tile}${row.split('|')[0]}.webp`} alt={props.DESCRIPTION} data-toggle="tooltip" data-html="true" title={SLI_DESC} width={36}
                                height={36} /> */}
                              <div
                                onClick={() => {
                                  SetItemStockStatus(SLI_SII_CODE), SetGalleryDatakey(SLI_SII_CODE), SetColorkey(SLI_COLOR), SetItemDesc(SLI_DESC);
                                }}>
                                <IconComponent
                                  classprops={
                                    galleryDataKey == false
                                      ? SLI_SII_CODE == props.sfi_ref_colors_list[0]?.split('|')[0]
                                        ? 'color_image img-fluid active'
                                        : 'color_image img-fluid'
                                      : SLI_SII_CODE == galleryDataKey
                                        ? 'color_image img-fluid active'
                                        : 'color_image img-fluid'
                                  }
                                  src={`${item_img_path_tile}${row?.split('|')[6]}`}
                                  alt={props.DESCRIPTION}
                                  width={36}
                                  height={36}
                                  marginLeftRight
                                  contains={true}
                                  quality={70}
                                // onClick={() => { SetItemStockStatus(SLI_SII_CODE), SetGalleryDatakey(SLI_SII_CODE), SetColorkey(SLI_COLOR), SetItemDesc(SLI_DESC) }}
                                />
                              </div>
                            </SwiperSlide>
                          </>
                        );
                      }
                    })
                    : ''}
                </Swiper>
              </div>
            ) : (
              <div className="">
                {color_length > 0 ? (
                  <ul className={`d-flex ${color_length <= more_color_text ? 'flex-wrap' : ''} family_color`} role="button">
                    {props.sfi_ref_colors_list &&
                      props.sfi_ref_colors_list.slice(0, more_color_text).map((row, key) => {
                        let SLI_SII_CODE = row?.split('|')[0];
                        let SLI_DESC = row?.split('|')[1] && row?.split('|')[1]?.split('-').length > 1 ? row?.split('|')[1]?.split('-').splice(1).join('-') : row?.split('|')[1];
                        let SLI_COLOR = row?.split('|')[5];
                        let STOCK_STATUS = props.stock_status[SLI_SII_CODE] && props.stock_status[SLI_SII_CODE] && props.stock_status[SLI_SII_CODE]?.split('|')[0] != 'undefined' ? props.stock_status[SLI_SII_CODE]?.split('|')[0] : 'INSTOCK';

                        if (colorKey && availabilityKey) {
                          datapush = searchParams.getAll('Color')[0]?.split('|');
                          if (datapush.indexOf(row?.split('|')[5]) != -1 && availability_array.indexOf(STOCK_STATUS) != -1) {
                            return (
                              <li
                                key={key}
                                onClick={() => {
                                  SetItemStockStatus(SLI_SII_CODE), SetGalleryDatakey(SLI_SII_CODE), SetColorkey(SLI_COLOR), SetItemDesc(SLI_DESC);
                                }}>
                                {/* <LazyLoadImage effect="blur" className={galleryDataKey == false ? SLI_SII_CODE == props.sfi_ref_colors_list[0].split('|')[0] ? 'color_image img-fluid active' : 'color_image img-fluid' : SLI_SII_CODE == galleryDataKey ? 'color_image img-fluid active' : 'color_image img-fluid'} src={`${item_img_path_tile}${row.split('|')[0]}.webp`} alt={props.DESCRIPTION} data-toggle="tooltip" data-html="true" title={SLI_DESC} width={28}
                                height={28} /> */}

                                <IconComponent
                                  classprops={
                                    galleryDataKey == false
                                      ? SLI_SII_CODE == props.sfi_ref_colors_list[0]?.split('|')[0]
                                        ? 'color_image img-fluid active'
                                        : 'color_image img-fluid'
                                      : SLI_SII_CODE == galleryDataKey
                                        ? 'color_image img-fluid active'
                                        : 'color_image img-fluid'
                                  }
                                  src={`${item_img_path_tile}${row?.split('|')[6]}`}
                                  alt={props.DESCRIPTION}
                                  width={28}
                                  height={28}
                                  marginLeftRight
                                  contains={true}
                                  quality={70}
                                />
                              </li>
                            );
                          }
                        } else if (colorKey) {
                          datapush = searchParams.getAll('Color')[0]?.split('|');
                          if (datapush.indexOf(row?.split('|')[5]) != -1) {
                            return (
                              <li
                                key={key}
                                onClick={() => {
                                  SetItemStockStatus(SLI_SII_CODE), SetGalleryDatakey(SLI_SII_CODE), SetColorkey(SLI_COLOR), SetItemDesc(SLI_DESC);
                                }}>
                                {/* <LazyLoadImage effect="blur" className={galleryDataKey == false ? SLI_SII_CODE == props.sfi_ref_colors_list[0].split('|')[0] ? 'color_image img-fluid active' : 'color_image img-fluid' : SLI_SII_CODE == galleryDataKey ? 'color_image img-fluid active' : 'color_image img-fluid'} src={`${item_img_path_tile}${row.split('|')[0]}.webp`} alt={props.DESCRIPTION} data-toggle="tooltip" data-html="true" title={SLI_DESC} width={28}
                                height={28} /> */}

                                <IconComponent
                                  classprops={
                                    galleryDataKey == false
                                      ? SLI_SII_CODE == props.sfi_ref_colors_list[0]?.split('|')[0]
                                        ? 'color_image img-fluid active'
                                        : 'color_image img-fluid'
                                      : SLI_SII_CODE == galleryDataKey
                                        ? 'color_image img-fluid active'
                                        : 'color_image img-fluid'
                                  }
                                  src={`${item_img_path_tile}${row?.split('|')[6]}`}
                                  alt={props.DESCRIPTION}
                                  width={28}
                                  height={28}
                                  marginLeftRight
                                  contains={true}
                                  quality={70}
                                />
                              </li>
                            );
                          }
                        } else if (availabilityKey) {
                          if (availability_array.indexOf(STOCK_STATUS) != -1) {
                            return (
                              <li
                                key={key}
                                onClick={() => {
                                  SetItemStockStatus(SLI_SII_CODE), SetGalleryDatakey(SLI_SII_CODE), SetColorkey(SLI_COLOR), SetItemDesc(SLI_DESC);
                                }}>
                                {/* <LazyLoadImage effect="blur" className={galleryDataKey == false ? SLI_SII_CODE == props.sfi_ref_colors_list[0].split('|')[0] ? 'color_image img-fluid active' : 'color_image img-fluid' : SLI_SII_CODE == galleryDataKey ? 'color_image img-fluid active' : 'color_image img-fluid'} src={`${item_img_path_tile}${row.split('|')[0]}.webp`} alt={props.DESCRIPTION} data-toggle="tooltip" data-html="true" title={SLI_DESC} width={28}
                                height={28} /> */}

                                <IconComponent
                                  classprops={
                                    galleryDataKey == false
                                      ? SLI_SII_CODE == props.sfi_ref_colors_list[0]?.split('|')[0]
                                        ? 'color_image img-fluid active'
                                        : 'color_image img-fluid'
                                      : SLI_SII_CODE == galleryDataKey
                                        ? 'color_image img-fluid active'
                                        : 'color_image img-fluid'
                                  }
                                  src={`${item_img_path_tile}${row?.split('|')[6]}`}
                                  alt={props.DESCRIPTION}
                                  width={28}
                                  height={28}
                                  marginLeftRight
                                  contains={true}
                                  quality={70}
                                />
                              </li>
                            );
                          }
                        } else {
                          return (
                            <li
                              key={key}
                              onClick={() => {
                                SetItemStockStatus(SLI_SII_CODE), SetGalleryDatakey(SLI_SII_CODE), SetColorkey(SLI_COLOR), SetItemDesc(SLI_DESC);
                              }}>
                              {/* <LazyLoadImage effect="blur" className={galleryDataKey == false ? SLI_SII_CODE == props.sfi_ref_colors_list[0].split('|')[0] ? 'color_image img-fluid active' : 'color_image img-fluid' : SLI_SII_CODE == galleryDataKey ? 'color_image img-fluid active' : 'color_image img-fluid'} src={`${item_img_path_tile}${row.split('|')[0]}.webp`} alt={props.DESCRIPTION} data-toggle="tooltip" data-html="true" title={SLI_DESC} width={28}
                              height={28} /> */}

                              <IconComponent
                                classprops={
                                  galleryDataKey == false
                                    ? SLI_SII_CODE == props.sfi_ref_colors_list[0]?.split('|')[0]
                                      ? 'color_image img-fluid active'
                                      : 'color_image img-fluid'
                                    : SLI_SII_CODE == galleryDataKey
                                      ? 'color_image img-fluid active'
                                      : 'color_image img-fluid'
                                }
                                src={`${item_img_path_tile}${row?.split('|')[6]}`}
                                alt={props.DESCRIPTION}
                                width={28}
                                height={28}
                                marginLeftRight
                                contains={true}
                                quality={70}
                              />
                            </li>
                          );
                        }
                      })}
                    {color_length <= more_color_text ? (
                      ''
                    ) : (
                      <li
                        className="more_color fs-6"
                        onClick={() => {
                          setNumberOfColorShow({ ...numberOfColorShow, [props.SFI_CODE]: color_length });
                        }}>
                        <span style={{ color: '#8a8a8a', fontSize: '11.1px', padding: '0 4px', cursor: 'pointer', fontFamily: 'Helvetica-Neue' }}>{t('MoreColors')} </span>
                      </li>
                    )}
                  </ul>
                ) : (
                  ''
                )}
              </div>
            )}

            {props.stock_status[item_stock_status] && props.stock_status[item_stock_status]?.split('|')[0] != 'undefined' && props.stock_status[item_stock_status]?.split('|')[0] != 'INSTOCK' && (
              <Col sm={12}>
                <h6 className={props.stock_status[item_stock_status]?.split('|')[0]}>
                  <small>{t(`${props.stock_status[item_stock_status]?.split('|')[0]}`)}</small>
                </h6>
              </Col>
            )}
          </Col>
        </Card.Body>
      </Card>

      {state.show && state.item && state.item.SPI_PR_ITEM_CODE ? <AddtoCartModal loginShow={state.show} {...state.item} active_item_id={state.active_item_id} loginOnHide={() => handleClose()} /> : ''}
      {/* {MoodBoard.show ? <MoodBoardModal show={MoodBoard.show} {...MoodBoard} onHide={() => setMoodBoard(false)} /> : ''} */}
    </>
  );
};

const ImageGroupSlider = (props) => {
  const { t } = useTranslation('common');
  return (
    <>
      <Swiper spaceBetween={0} slidesPerView={1} loop={false}>
        {props.gallery &&
          props.gallery.length &&
          props.gallery.map((item, key) => {
            const { SLI_SII_CODE, SLI_IMAGE_PATH } = item;

            return (
              <Fragment key={key}>
                {props.ActivegalleryKey == false ? (
                  props.galleryKey && props.galleryKey == SLI_SII_CODE ? (
                    <SwiperSlide key={key}>
                      {/* <img className="w-100" onError={onError} src={`${SLI_IMAGE_PATH}`} width="auto" height="auto" /> */}
                      <ImageComponent
                        src={SLI_IMAGE_PATH}
                        alt={props.DESCRIPTION}
                        width={512}
                        height={512}
                        quality={70}
                      // unoptimized={true}
                      />
                      {/* <p>{SLI_SII_CODE}</p> */}
                    </SwiperSlide>
                  ) : (
                    ''
                  )
                ) : props.ActivegalleryKey && props.ActivegalleryKey == SLI_SII_CODE ? (
                  <SwiperSlide key={key}>
                    {/* <img className="w-100" onError={onError} src={`${SLI_IMAGE_PATH}`} width="auto" height="auto" /> */}
                    <ImageComponent
                      src={SLI_IMAGE_PATH}
                      alt={props.DESCRIPTION}
                      width={512}
                      height={512}
                      quality={70}
                    // unoptimized={true}
                    />
                  </SwiperSlide>
                ) : (
                  ''
                )}
              </Fragment>
            );
          })}
        {props.gallery === undefined || props.gallery.length == 0 ? <img className="w-100" onError={onError} src="" width="auto" height="auto" /> : ''}
      </Swiper>
    </>
  );
};

const FreeSample = (props) => {
  const { t } = useTranslation('common');
  const reduxDispatch = useDispatch();
  const listingss = useSelector((store) => store.items.latest);

  let SAMPLE_LIST = props.cartItems;
  let active_item_array = props.active_item_id ? props.active_item_id : false;
  //let active_item_image = props.active_item_img ? props.active_item_img : false;
  let active_item_img = props?.sfi_ref_colors_item_id[active_item_array] ? props.sfi_ref_colors_item_id[active_item_array]?.split('|')[7] : '';
  let item = '';
  let sys_id = [];
  let sampleSys = '';

  let canvasGallery = props.gallery && props.gallery.length > 0 ? props.gallery.find((row) => {
    return row.SLI_SII_CODE == active_item_array ? row : '';
  }) : '';

  props = {
    ...props,
    m_width: 15,
    m_height: 15,
    item_label: 'SAMPLE',
    code: active_item_array ? active_item_array : 0,
    PRICE: 0,
    VALUE: 0,
    count: 1,
    //canvasImg: active_item_array ? canvasImgPath + active_item_image : '',
    canvasImg: canvasGallery?.SLI_IMAGE_PATH || item_img_path + active_item_img, //active_item_img ? item_img_path + active_item_img : '',
    cart_status: 'COMPLETED',
    sampleItem: [],
    sampleSysId: [],
  };

  SAMPLE_LIST &&
    SAMPLE_LIST.map((row, key) => {
      if (row.SOL_ITEM_LABEL == 'SAMPLE') {
        props.sampleSysId.push(row.SOL_SYS_ID);
        props.sampleItem.push(row?.brand_info?.SII_CODE);
      }
    });

  sampleSys = props.sampleSysId[props.sampleItem.indexOf(active_item_array)];

  const renderTooltipFreeSample = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t(props)}
    </Tooltip>
  );
  if (props.sampleItem.indexOf(active_item_array) >= 0) {
    if (props.types == 'free_sample') {
      return (
        <Button
          variant="primary"
          onClick={() => {
            reduxDispatch(removeFromCart({ ...props, sys_id: sampleSys }));
          }}>
          {t('Remove')}
        </Button>
      );
    } else {
      return (
        <Col sm={4} className={`free_sample position-absolute top-0 ${langName == 'ar' ? 'end-0' : 'start-0'} p-3 shake-animation`} style={{ zIndex: '12' }}>
          <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltipFreeSample('FreeSampleAdded')}>
            <div
              onClick={() => {
                reduxDispatch(removeFromCart({ ...props, sys_id: sampleSys }));
              }}>
              <img onError={onError} src={asset_img + 'assets/icon/sample_check.svg'} width="auto" height="auto" />
              {/* <ImageComponent
                src={asset_img + 'assets/icon/sample_check.svg'}
                width={22}
                height={22}
              /> */}
            </div>
          </OverlayTrigger>
        </Col>
      );
    }
  } else {
    if (props.types == 'free_sample') {
      return (
        <Button
          variant="primary"
          onClick={() => {
            reduxDispatch(addToCart(props));
          }}>
          {t('FreeSample')}
        </Button>
      );
    } else {
      return (
        <Col sm={4} className={`free_sample position-absolute top-0 ${langName == 'ar' ? 'end-0' : 'start-0'} p-3 `} style={{ zIndex: '12' }}>
          <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltipFreeSample('OrderFreeSample')}>
            <div
              onClick={() => {
                reduxDispatch(addToCart(props));
              }}>
              <img className="" onError={onError} src={asset_img + 'assets/icon/Group_6713.png'} title={t('OrderFreeSample')} width="auto" height="auto" />
              {/* <ImageComponent
                src={asset_img + 'assets/icon/Group_6713.png'}
                width={22}
                height={22}
              /> */}
            </div>
          </OverlayTrigger>
        </Col>
      );
    }
  }
};

const Mood = (props) => {
  const { t } = useTranslation('common');
  const reduxDispatch = useDispatch();
  let active_item_id = props.active_item_id ? props.active_item_id : false;
  let item = '';
  let sys_id = [];
  let moodSys = '';
  props = {
    ...props,
    show: true,
    page_name: '',
    active_item_id: active_item_id ? active_item_id : '',
    code: active_item_id,
    moodItem: [],
    moodSysId: [],
  };

  props.MOOD_LIST &&
    props.MOOD_LIST.map((row, key) => {
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
      <div className="add-wish d-flex justify-content-end position-absolute top-0 end-0 p-3 w-100" style={{ zIndex: '11' }}>
        <img
          role="button"
          className="img-fluid"
          onError={onError}
          onClick={() => reduxDispatch(removeMood({ ...props, sys_id: moodSys, item_label: 'REMOVE_TO_MOOD', page_name: props.data.page_name ? props.data.page_name : '' }))}
          src={`/assets/images/ProductdetailPage/20.png`}
          alt={props.DESCRIPTION}
          width="auto"
          height="auto"
        />
      </div>
    );
  } else {
    return false;
    return (
      <div className="add-wish d-flex justify-content-end position-absolute top-0 end-0 p-0" style={{ zIndex: '11' }}>
        <img role="button" className="img-fluid" onError={onError} onClick={() => props.setMoodBoard(props)} src={`/assets/icon/wishheart.png`} alt={props.DESCRIPTION} style={{ right: 'auto', padding: '1rem' }} width="auto" height="auto" />
      </div>
    );
  }
};

const Wallpaper = (props) => {
  // const { isMOBILE, isTABLET, isLAPTOP, isDESKTOP } = useDevice();
  const { t } = useTranslation('common');
  const { query } = useRouter();
  const { slug } = query;

  let category_slug = (slug && slug[0]) || undefined;
  let sub_category_slug = (slug && slug[1]) || undefined;

  const reduxDispatch = useDispatch();
  const [errorMgs, setErrorMgs] = useState(false);
  const [variant, setVariant] = useState('danger');

  let active_item_array = props.active_item_id ? props.active_item_id?.split('|') : props.sfi_ref_colors_list[0] ? props.sfi_ref_colors_list[0]?.split('|') : false;
  //let active_item_img = props.active_item_id ? props.active_item_id?.split('|') : props.sfi_ref_colors_list[0] ? props.sfi_ref_colors_list[6]?.split('|') : false;
  let active_item_img = props?.sfi_ref_colors_item_id[active_item_array] ? props.sfi_ref_colors_item_id[active_item_array]?.split('|')[7] : '';

  let props_price = Number(props.PRICE).toFixed(decimalPoints);
  let addtocart_sys_item_id = [];
  active_item_array = active_item_array.length == 1 ? active_item_array[0] : 0;

  props.cartItems.map((row, key) => {
    if (row.brand_info && row.brand_info.SII_CODE && active_item_array == row.brand_info.SII_CODE) {
      addtocart_sys_item_id = row;
    }
  });

  let canvasGallery = props.gallery && props.gallery.length > 0 ? props.gallery.find((row) => {
    return row.SLI_SII_CODE == active_item_array ? row : '';
  }) : '';
  props = {
    ...props,
    item_label: 'ADD_TO_CART',
    code: active_item_array ? active_item_array : 0,
    count: addtocart_sys_item_id && addtocart_sys_item_id.SOL_QTY > 1 ? Number(addtocart_sys_item_id.SOL_QTY) : 1,
    VALUE: props_price,
    canvasImg: canvasGallery?.SLI_IMAGE_PATH || item_img_path + active_item_img,  //active_item_img ? item_img_path + active_item_img : '',
    cart_status: 'COMPLETED',
  };

  const updateLineData = (qty, sys_id) => {
    let data = {
      ...props,
      cart_sys_id: sys_id,
      cart_method: 'ORDER_QTY',
      cart_qty: qty,
    };
    updateLineTable(data, reduxDispatch, t);
  };

  return (
    <>
      {isMobile ? (
        props.direct_price_yn && props.direct_price_yn ? (
          addtocart_sys_item_id && addtocart_sys_item_id.brand_info && addtocart_sys_item_id.brand_info.SII_CODE == active_item_array && addtocart_sys_item_id.SOL_PR_ITEM_CODE == props.SPI_PR_ITEM_CODE ? (
            <Button
              variant="primary QuickbuyMobile mb-2"
              onClick={() => {
                updateLineData(Number(addtocart_sys_item_id.SOL_QTY) + 1, addtocart_sys_item_id.SOL_SYS_ID);
              }}
              className="Addtocart ready-made Add_to_cart_initial">
              {t('AddToCart')}
            </Button>
          ) : (
            <Button
              variant="primary QuickbuyMobile mb-2"
              onClick={() => {
                addToCartFun(props, reduxDispatch, t);
              }}
              className="Addtocart ready-made Add_to_cart_initial">
              {t('AddToCart')}
            </Button>
          )
        ) : (
          <Button
            variant="primary QuickbuyMobile mb-2"
            onClick={() => {
              props.ContactUs();
            }}>
            {' '}
            {t('ContactUs')}
          </Button>
        )
      ) : (
        <div className="card-view-detail pb-1 pb-md-2">
          <Col xs={6} className="py-3 ps-3 pe-2">
            {props.direct_price_yn && props.direct_price_yn ? (
              addtocart_sys_item_id && addtocart_sys_item_id.SOL_SYS_ID && addtocart_sys_item_id.brand_info && addtocart_sys_item_id.brand_info.SII_CODE == active_item_array && addtocart_sys_item_id.SOL_PR_ITEM_CODE == props.SPI_PR_ITEM_CODE && addtocart_sys_item_id.SOL_QTY >= 1 ? (
                <Button
                  variant="primary"
                  onClick={() => {
                    updateLineData(Number(addtocart_sys_item_id.SOL_QTY) + 1, addtocart_sys_item_id.SOL_SYS_ID);
                  }}
                  className="Addtocart ready-made Add_to_cart_initial">
                  {t('AddToCart')}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => {
                    addToCartFun(props, reduxDispatch, t);
                  }}
                  className="Addtocart ready-made Add_to_cart_initial">
                  {t('AddToCart')}
                </Button>
              )
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  props.ContactUs();
                }}>
                {' '}
                {t('ContactUs')}
              </Button>
            )}
          </Col>

          <Col xs={6} className="py-3 ps-2 pe-3">
            <LinkComponent href={`${props.url}/${props.item_img}`}>
              <Button variant="secondary text-light">{t('ViewDetail')}</Button>
            </LinkComponent>
          </Col>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({ user_state: state.UserReducer, numberCart: state.cart.numberCart, cartItems: state.cart.cartItems });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => {
      dispatch({ type: action_type, payload: data_info });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MaterialCard);
