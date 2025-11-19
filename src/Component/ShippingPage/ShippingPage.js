/*
DELIVERY_ONLY=>'DO01',
DELIVERY_WITH_INSTALLATION	=> 'DO02'
CLICK_COLLECT => 'DO03'
ARAMEX_DELIVERY=>'DO04'
*/
import React, { useState, useEffect, createContext, useReducer, Suspense } from 'react';
import { Col, Container, Row, Form, Collapse, Button, Alert } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import GoogleAnalytics from '../../services/GoogleAnalytics';
import LinkComponent from '@components/Link';
import ApiDataService from '../../services/ApiDataService';
import { useRouter } from 'next/router';
import ShippingAddress from './ShippingAddress';
import Payment from './Payment';
import Delivery from './Delivery';
import ClickCollect from './ClickCollect'
import { RiArrowRightSLine, RiArrowDownSLine } from 'react-icons/ri';
import { ShippingReducer } from './ShippingReducer';
import { useTranslation } from 'next-i18next'
import { defaultLocale, cn_iso } from '@utils/i18n';
import Cookies from 'js-cookie';
import ShippingMenuSkeleton from '../../Preloader/ShippingMenuSkeleton';

import CurrencyFormat from '../../services/CurrencyFormat';
const site = Cookies.get('siteDetail') || "undefined";
let decimalPoints = site != 'undefined' && JSON.parse(site) != null && JSON.parse(site).show_decimals >= 0 ? parseInt(JSON.parse(site).show_decimals) : 0;
export const ShippingContext = createContext();
const stock_validation = ['NOT_ACTIVE', 'OUTOFSTOCK'];


const initialState = {
  order_list: [],
  shipping_price: 0,
  price_array: { SOL_VALUE: 0 },
  header_info: {},
  user_shipping_list: [],
  shipping_address: {},
  shipment_list: [],
  sfi_status_val: true,
  measurement_service_info: []

};


const ShippingMenu = (props) => {

  //const location = useLocation();
  const location = useRouter();
  let user_info = props.user_state ? props.user_state.user_info : null;
  const { t } = useTranslation('common');

  return (

    <div className="ShippingMenu pb-5">
      <Suspense fallback={<ShippingMenuSkeleton />}>
        {props.shipping_state && props.shipping_state.header_info && props.shipping_state.header_info.SOH_CARRIER_CODE == undefined ? <ShippingMenuSkeleton /> : (
          <>
            {props.shipping_state.header_info && props.shipping_state.header_info.SOH_CARRIER_CODE == 'DO03' ?
              <ul className="list-unstyled d-flex" >
                <li className={location.pathname.split('/')[2] == 'cartPage' ? 'active' : ''}> <a className="" href={`/${defaultLocale}/cartPage`} > <span className="d-flex align-items-center">  {t("CartInfo")} <RiArrowRightSLine size={22} /> </span></a></li>
                {user_info && user_info.cust_cr_uid != 'GUEST-USER' ?
                  <li className={location.pathname.split('/')[2] == 'clickCollect' ? 'active' : ''}> <a className="" href={`/${defaultLocale}/cart/clickCollect`} > <span className="d-flex align-items-center">  {t("Click_Collect")} <RiArrowRightSLine size={22} /> </span></a></li>
                  : ''}
                <li className={location.pathname.split('/')[2] == 'delivery' ? 'active' : ''}>
                  <LinkComponent className="" href={`/cart/delivery`} > <span className="d-flex align-items-center">{t("delivery_only")}  <RiArrowRightSLine size={22} /></span></LinkComponent>
                </li>
                <li className={location.pathname.split('/')[2] == 'payment' ? 'active' : ''}><a><span className="d-flex align-items-center mt-1"> {t("PaymentInfo")} </span></a></li>
              </ul>
              :
              <ul className="list-unstyled d-flex" >
                <li className={location.pathname.split('/')[2] == 'cartPage' ? 'active' : ''}> <a className="" href={`/${defaultLocale}/cartPage`} > <span className="d-flex align-items-center">  {t("CartInfo")} <RiArrowRightSLine size={22} /> </span></a></li>
                <li className={location.pathname.split('/')[2] == 'shippingAddress' ? 'active' : ''}> <LinkComponent className="" href={`/cart/shippingAddress`} > <span className="d-flex align-items-center">{t("ShippingInfo")}  <RiArrowRightSLine size={22} /></span></LinkComponent></li>
                <li className={location.pathname.split('/')[2] == 'delivery' ? 'active' : ''}>
                  {props.shipping_state.shipping_address && props.shipping_state.shipping_address.cad_id ? <LinkComponent className="" href={`/cart/delivery`} > <span className="d-flex align-items-center">{t("Delivery")}  <RiArrowRightSLine size={22} /></span></LinkComponent> : <a style={{ cursor: "context-menu" }}> <span className="d-flex align-items-center">{t("Delivery")}  <RiArrowRightSLine size={22} /></span></a>}
                </li>
                <li className={location.pathname.split('/')[2] == 'payment' ? 'active' : ''}><a style={{ cursor: "context-menu" }}><span className="d-flex align-items-center mt-1"> {t("PaymentInfo")} </span></a></li>
              </ul>
            }
          </>
        )}
      </Suspense>
    </div>
  )

}

const ShippingPage = (props) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  let user_info = props.user_state ? props.user_state.user_info : null;

  let auth_token = props.user_state ? props.user_state.auth_token : '';
  let user_id = props.user_state ? props.user_state.user_id : 0;
  let user_email = props.user_state ? props.user_state.user_email : '';

  const [variant, setVariant] = useState('danger');
  const [errorMgs, setErrorMgs] = useState();
  const [open, setOpen] = useState(false);

  const [shipping_state, shippingDispatch] = useReducer(ShippingReducer, initialState);

  // if (user_info == null || auth_token == null || auth_token.length == null) {
  //   return <Redirect href={`/${defaultLocale}`} />;
  // }
  let slug_url = location.pathname.split('/')[3];

  useEffect(() => {
    if (shipping_state.header_info && shipping_state.header_info.SOH_CARRIER_CODE && shipping_state.header_info.SOH_CARRIER_CODE != 'DO03' && slug_url != 'payment') {
      getAddressListFun();
    }
    if (shipping_state.header_info && shipping_state.header_info.SOH_CARRIER_CODE && shipping_state.order_list) {
      setTimeout(() => {
        GoogleAnalytics.addShippingInfo(shipping_state.header_info, shipping_state.order_list);
      }, 500);
    }

  }, [props.user_state.isLoggedIn, shipping_state.header_info]);

  useEffect(() => {
    countryLovFun();
  }, [])


  useEffect(() => {
    orderListFun();
  }, [props.user_state.isLoggedIn, slug_url]);



  const countryLovFun = () => {
    ApiDataService.getAll('fetch/country_lov').then(response => {
      let res_data = response.data;
      if (res_data.error_message == "Success" && res_data.return_status == 0 && res_data.COMMON[0]) {
        props.user_dispatch('SITE_DETAIL', res_data.COMMON[0]);
      } else {
        //console.log(res_data.error_message, res_data);
      }
    })
  }

  const orderListFun = () => {
    ApiDataService.getAll("order/orderList")
      .then(response => {
        let res_data = response.data;
        if (res_data.return_status == 0 && res_data.error_message == 'Success') {
          if (res_data.complete.length == 0) {
            router.push('/cartPage');
          }

          sfiStatusValidationFun(res_data.complete);

          shippingDispatch({ type: 'ORDER-LIST', value: res_data.complete });
          shippingDispatch({ type: 'TOTAL-PRICE', value: res_data.total_price });
          shippingDispatch({ type: 'HEADER-INFO', value: res_data.header_info });
          if (res_data.header_info && res_data.header_info.SOH_SHIP_VALUE > 0) {
            shippingDispatch({ type: 'SHIPPING-PRICE', value: res_data.header_info.SOH_SHIP_VALUE });
          }
          if (res_data.shipping_info) {
            shippingDispatch({ type: 'SHIPPING-ADDRESS-INFO', value: res_data.shipping_info });
          }



        } else {
          setErrorMgs(res_data.error_message);
          setVariant('danger');
        }
      }).catch(e => {
        //console.log(e);
        setErrorMgs(e.message);
        setVariant('danger');
      });
  }

  const getAddressListFun = () => {
    ApiDataService.getAll(`dashboard/login_country_list_address/${user_id}/${cn_iso}`, { cust_user_id: user_email, auth_token: auth_token }).then(response => {
      let res_data = response.data;
      //console.log(res_data, 'res_data');

      if (res_data.return_status == 0 && res_data.error_message == 'Success') {
        shippingDispatch({ type: 'USER-SHIPPING-LIST', value: res_data.result });
        res_data.result.map((data, i) => {
          if (data.cad_default_yn == 'Y') {
            shippingDispatch({ type: 'SHIPPING-ADDRESS-INFO', value: data });
          }
        });
        setVariant('success');
      } else if (res_data.return_status == 401 && res_data.error_message == 'Invalid Request') {
        props.user_dispatch('LOGOUT_USER');
        router.push('/cartPage');
      } else if (res_data.return_status == '-112' && res_data.error_message == 'No Data Found') {
        //   setErrorMgs(t("plz_add_the_shipping_address"));
        //  setVariant('success');
      } else {
        setErrorMgs(res_data.error_message);
        setVariant('danger');
      }

    }).catch(e => {
      //console.log(e, 'res_data...', e.return_status);
      props.user_dispatch('LOGOUT_USER');
      router.push('/cartPage');
      setErrorMgs(e.message);
      setVariant('danger');
    });
  }

  const sfiStatusValidationFun = (order_list) => {
    let sfiStatus_val = true;
    order_list.length > 0 && order_list.map((data, index) => {
      if (stock_validation.indexOf(data.SFI_STATUS_NEW) >= 0) {
        sfiStatus_val = false;

        data['subject'] = data.SFI_STATUS_NEW + ' shippingPage';
        ApiDataService.post('emailFun', data).then(response => {
          console.log(response, 'emailFun');
        }).catch(e => {
          console.log(e);
          alert('Error catch');
        });
        router.push('/cartPage');
      }
    });
    shippingDispatch({ type: 'SFI-STATUS-VAL', value: sfiStatus_val });
  }

  if (props.menus_state.siteDetail == undefined) {
    return false;
  }

  return (
    <section className="ShippingPage">
      <ShippingContext.Provider value={{ shipping_state, shippingDispatch }}>
        <Container fluid>
          <Row className="fullheight">
            <Col md={7} lg={6} xxl={7} className="p-0 " style={{ background: '#FAF8F7' }}>
              <Row className="Collapse_order_summery d-md-none mt-2 mb-2" style={{ background: '#fff' }}>
                <Col xs={12}>
                  <p
                    onClick={() => setOpen(!open)}
                    role="button"
                    className="d-flex align-items-center collapse_toggle  px-3 py-4 text-start "
                  >
                    {open ? t('Hide_Order_Summary') : t('Show_Order_Summary')} <RiArrowDownSLine size={30} />
                  </p>
                </Col>

                <Col xs={12}>
                  <Collapse in={open}>
                    <div id="id-collapse-text" className="border-top">
                      <ShppingProductOverview {...props} slug_url={slug_url} orderListFun={orderListFun} key={1} />
                    </div>
                  </Collapse>
                </Col>
              </Row>
              <div className="pb-5 shippingoptionalign">
                <LinkComponent href="/" className="d-none d-md-inline" >
                  <LazyLoadImage effect="" src={`/assets/images/smalllogo.png`} alt="sedarglobal" className="pb-4" width="auto" height="auto" />
                </LinkComponent>
                <ShippingMenu shipping_state={shipping_state} {...props} />
                {router.route == '/cart/shippingAddress' && (<ShippingAddress {...props} slug_url={slug_url} getAddressListFun={getAddressListFun} />)}
                {router.route == '/cart/delivery' && (<Delivery {...props} slug_url={slug_url} />)}
                {router.route == '/cart/payment' && (<Payment {...props} slug_url={slug_url} />)}
                {router.route == '/cart/clickCollect' && (<ClickCollect {...props} slug_url={slug_url} />)}
              </div>

            </Col>
            <Col md={5} lg={6} xxl={5} className="d-none d-md-block p-0">
              <ShppingProductOverview {...props} slug_url={slug_url} orderListFun={orderListFun} key={2} />
            </Col>
          </Row>
        </Container>
      </ShippingContext.Provider>
    </section>
  )
}


const ShppingProductOverview = (props) => {
  const { t } = useTranslation('common');
  const [errorMgs, setErrorMgs] = useState();
  const { shipping_state, shippingDispatch } = React.useContext(ShippingContext);
  const [variant, setVariant] = useState('danger');
  let slug = props.slug_url;
  const [orderLine_status, setOrderLine_status] = useState(false);

  let user_info = props.user_state ? props.user_state.user_info : null;
  let userId = user_info ? user_info.cust_id : 0;



  const orderDelete = (line_info) => {

    confirmAlert({
      // title: 'Confirm to submit',
      message: t("Areyousureremove"),
      buttons: [
        {
          label: t("Yes"),
          onClick: () => {
            setOrderLine_status(line_info.SOL_SYS_ID);
            ApiDataService.delete(`order/cart/${line_info.SOL_SYS_ID}`, { userId: userId, visitorId: line_info.SOL_TOKEN_ID, SOH_PROMO_CODE: shipping_state.header_info.SOH_PROMO_CODE })
              .then(response => {
                let res_data = response.data;
                //
                if (res_data.return_status == 0 && res_data.error_message == 'Success') {
                  props.orderListFun();
                  setErrorMgs(res_data.error_message);
                  setVariant('success');
                } else {
                  setErrorMgs(res_data.error_message);
                  setVariant('danger');
                }
                setOrderLine_status('');
              }).catch(e => {
                //console.log(e);
                setErrorMgs(e.message);
                setVariant('danger');
              });
          }
        },
        {
          label: t("No")
          //  onClick: () => alert('Click No')
        }
      ]
    });
  }


  let SOH_PROMO_VALUE = shipping_state.header_info && shipping_state.header_info.SOH_PROMO_VALUE > 0 ? shipping_state.header_info.SOH_PROMO_VALUE : 0;

  let tolat_price = shipping_state.price_array ? Number(shipping_state.price_array.SOL_VALUE) + Number(shipping_state.shipping_price) - Number(SOH_PROMO_VALUE) : 0 + Number(shipping_state.shipping_price);
  if (shipping_state.order_list && shipping_state.order_list.length == 0) {
    return false;
  }
  let product_index = 1;


  return (
    <div className="shipping_sidebar pb-5 ms-lg-5">

      <Row>
        <Col xs={12} className="heading"><h2> {t("OrderSummary")} </h2> </Col>
      </Row>
      {shipping_state.order_list && shipping_state.order_list.map((data, index) => {

        return (
          <>
            {
              data.SOL_ITEM_LABEL != 'SAMPLE' ?
                <div className={stock_validation.indexOf(data.SFI_STATUS_NEW) >= 0 ? 'out_of_stock' : ''} title={t('outofstock_mgs')} id={'ordercol_' + data.SOL_SYS_ID} >
                  <div className={data.SPI_INSTALLATION_PROVIDE_YN == 'N' ? 'orange_t_color ordercol' : data.SOL_SYS_ID == orderLine_status ? 'ordercol opacity4' : 'ordercol'} key={index}>
                    <Row>
                      <Col xs={1}>{product_index++}</Col>
                      <Col xs={9}>
                        <div className="media item d-flex">
                          <LazyLoadImage className="me-3 mt-2" src={data.SOL_IMAGE_PATH ? data.SOL_IMAGE_PATH : `/assets/images/profile/MaskGroup4322.png`} alt="sedarglobal" width="auto" height="auto" />
                          <Col className="media-body" >
                            {data.brand_info && data.brand_info['SII_BR_DESC'] ? <h6>{data.brand_info['SII_BR_DESC']} : <span>{data.brand_info['SII_ITEM_ID']}</span></h6> : ''}
                            <p>{data.SFP_TITLE}</p>
                            {data.SOL_ITEM_LABEL == 'SAMPLE' ? <span className="fw-normal text-9e6493">{t('free_sample')}</span> : ''}
                            {data.SFI_STATUS == 'ONDEMAND' ? <span className="fw-normal text-9e6493">{t('ONDEMAND')}</span> : ''}
                            {data.SPI_INSTALLATION_PROVIDE_YN == 'N' ? <div className="fw-normal text-danger">{t('delivery_only')}</div> : ''}
                          </Col>
                          <span className="removeitem position-absolute top-0 end-0 me-3 mt-1" onClick={() => { orderDelete(data) }}>✕</span>
                        </div>

                      </Col>
                      <Col xs={2}>
                        <div className="price">
                          <p>
                            {/* <span>{data.SOL_CCY_CODE ? t(data.SOL_CCY_CODE) : t(currency)} </span> */}
                            <CurrencyFormat
                              value={data.SOL_VALUE ? data.SOL_VALUE : 0}
                              menus_state={props.menus_state}
                            />
                          </p>
                        </div>
                      </Col>
                      {stock_validation.indexOf(data.SFI_STATUS_NEW) >= 0 ?
                        <Col className="out_of_stock_mgs">
                          {t('outofstock_mgs')}
                        </Col>
                        : ''}
                    </Row>
                  </div>
                </div>
                : ''
            }
          </>
        )
      })}
      {shipping_state.order_list && shipping_state.order_list.map((data, index) => {

        return (
          <>
            {

              data.SOL_ITEM_LABEL == 'SAMPLE' ?
                <div className={data.SOL_SYS_ID == orderLine_status ? 'ordercol opacity4' : 'ordercol'} key={index} style={{ background: "#f1fafa" }}>
                  <Row >
                    <Col xs={1}>{product_index++}</Col>
                    <Col xs={9} >
                      <div className="media item d-flex">
                        <LazyLoadImage className="me-3 mt-2" src={data.SOL_IMAGE_PATH ? data.SOL_IMAGE_PATH : `/assets/images/profile/MaskGroup4322.png`} alt="sedarglobal" width="auto" height="auto" />
                        <Col className="media-body" >
                          {data.brand_info && data.brand_info['SII_BR_DESC'] ? <h6>{data.brand_info['SII_BR_DESC']} : <span>{data.brand_info['SII_ITEM_ID']}</span></h6> : ''}
                          <p>{data.SFP_TITLE}</p>
                          {data.SOL_ITEM_LABEL == 'SAMPLE' ? <span className="fw-normal text-9e6493">{t('free_sample')}</span> : ''}
                        </Col>
                        <span className="removeitem position-absolute top-0 end-0 me-3 mt-1" onClick={() => { orderDelete(data) }}>✕</span>
                      </div>
                    </Col>
                    <Col xs={2}>
                      <div className="price">
                        <p>
                          {/* <span>{data.SOL_CCY_CODE ? t(data.SOL_CCY_CODE) : t(currency)} </span> */}
                          <CurrencyFormat
                            value={data.SOL_VALUE ? data.SOL_VALUE : 0}
                            menus_state={props.menus_state}
                          />
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
                : ''
            }
          </>
        )
      })}

      <div className="item-summery">
        <div className="cartcalculation">
          <Row>
            <Col xs={7} className="labeltext">
              {t('Subtotal')}
            </Col>
            <Col xs={5} className="itemamount">
              <CurrencyFormat
                value={shipping_state.price_array && shipping_state.price_array.SOL_VALUE ? shipping_state.price_array.SOL_VALUE : 0}
                menus_state={props.menus_state}
              />
            </Col>
          </Row>
          {slug == 'delivery' || slug == 'payment' ?
            <Row>
              <Col xs={8} className="labeltext">
                {t('EstShippingHandling')}
              </Col>
              <Col xs={4} className="itemamount">
                <span style={{ color: '#FF9D00' }}>
                  {shipping_state.shipping_price == 0 ? t("Free") :
                    <CurrencyFormat
                      value={shipping_state.shipping_price > 0 ? shipping_state.shipping_price : 0}
                      menus_state={props.menus_state}
                    />
                  }
                </span>
              </Col>
            </Row>
            : ''}
          {SOH_PROMO_VALUE > 0 ?
            <Row className=''>
              <Col sm={7} className="labeltext">
                {t("Promo_discount")}
              </Col>
              <Col sm={5} className="itemamount text-warning">
                <CurrencyFormat
                  value={SOH_PROMO_VALUE}
                  className="text-warning"
                  menus_state={props.menus_state}
                />
              </Col>
            </Row> : ''}

        </div>
        <div className="carttotal">
          <Row>
            <Col xs={7} className="labeltext">
              {t("Total")}
            </Col>
            <Col xs={5} className="itemamount">
              {/* <span>{currency} </span> */}
              <CurrencyFormat
                value={tolat_price ? tolat_price : 0}
                decimalScale={decimalPoints}
                displayType="text"
                thousandSeparator={true}
                fixedDecimalScale={decimalPoints > 0 ? true : false}
                isNumericString={decimalPoints > 0 ? false : true}
                menus_state={props.menus_state}
              />
            </Col>
          </Row>
          {/* {slug == 'payment' ? <Row className="delivery_page">
            {['SAR', 'BHD', 'QAR'].indexOf(shipping_state.header_info.SOH_CCY_CODE) >= 0 ? <p className='pt-2 holiday_cls'>{t('additional_holidays', { days: 7 })}</p> : new Date() >= new Date('2025-06-02') ? <p className='pt-2 holiday_cls'>{t('additional_holidays', { days: 3 })}</p> : ''}
          </Row>
            : ''} */}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer, menus_state: state.MenusItemReduser });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingPage);