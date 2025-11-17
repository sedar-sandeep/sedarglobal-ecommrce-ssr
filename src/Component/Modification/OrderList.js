import React, { useState, useEffect, useContext, Suspense } from 'react';
import { Col, Alert, Row, Form, Button, Accordion, FormControl, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import ApiDataService from '../../services/ApiDataService';
import CurrencyFormat from '../../services/CurrencyFormat';
import Cookies from 'js-cookie';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LaddaButton from 'react-ladda';
import { defaultLocale, cn_iso } from '@utils/i18n';
import parse from 'html-react-parser';

const OrderList = (props) => {
  console.log(props, 'props11');
  const site = Cookies.get('siteDetail') || 'undefined';
  let decimalPoints = site != 'undefined' && JSON.parse(site) != null && JSON.parse(site).show_decimals >= 0 ? parseInt(JSON.parse(site).show_decimals) : 0;
  const { t } = useTranslation('common');
  const router = useRouter();
  let user_info = props.user_state ? props.user_state.user_info : [];
  let userId = props.user_state ? props.user_state.user_id : 0;
  let head_sys_id = props.user_state && props.user_state.modification_user_info && props.user_state.modification_user_info.head_sys_id > 0 ? props.user_state.modification_user_info.head_sys_id : false;
  let modi_user_id = props.user_state && props.user_state.modification_user_info && props.user_state.modification_user_info.CUST_SYS_ID > 0 ? props.user_state.modification_user_info.CUST_SYS_ID : 0;
  let modi_email = props.user_state && props.user_state.modification_user_info && props.user_state.modification_user_info.CUST_EMAIL_ID ? props.user_state.modification_user_info.CUST_EMAIL_ID : '';

  let shipping_info = props.shippingInfo ? props.shippingInfo : false;
  const [orderLine_status, setOrderLine_status] = useState(false);
  const [loading_btn, setLoading_btn] = useState(false);
  const [errorMgs, setErrorMgs] = useState(false);
  const [variant, setVariant] = useState('danger');
  const [errorPromo, setErrorPromo] = useState(false);

  const [promoCodeErroStatus, setPromoCodeErroStatus] = useState(false);

  let header_info = props.headerInfo ? props.headerInfo : false;
  let shipping_price = header_info && header_info.SOH_SHIP_VALUE ? header_info.SOH_SHIP_VALUE : 0;

  let SOH_PROMO_VALUE = header_info && header_info.SOH_PROMO_VALUE > 0 ? header_info.SOH_PROMO_VALUE : 0;
  let old_cart_value = header_info && header_info.SOH_NET_VALUE_OLD > 0 ? header_info.SOH_NET_VALUE_OLD : 0;

  let tolat_price_val = props.price_array ? Number(props.price_array.SOL_VALUE) + Number(shipping_price) - (Number(SOH_PROMO_VALUE) + Number(old_cart_value)) : 0 + Number(shipping_price);

  let tolat_price = Number(tolat_price_val.toFixed(decimalPoints));
  console.log(tolat_price, 'tolat_price121', decimalPoints, tolat_price_val);

  let product_index = 1;

  const [promoCode, setPromoCode] = useState(header_info.SOH_PROMO_CODE);
  const [promoCodeAmount, setPromoCodeAmount] = useState(SOH_PROMO_VALUE);
  const [promoCodeDesc, setPromoCodeDesc] = useState(header_info.SOH_PROMO_CODE);
  const [show, setShow] = useState(false);
  let mgs = 'Payment link has been sent to the customer ' + modi_email;

  const tmpToMain = () => {
    if (tolat_price == 0 || (props.paymentLinkInfo.FPL_AMOUNT == tolat_price && props.paymentLinkInfo.FPL_STATUS == 'Paid')) {
      setLoading_btn(true);
      ApiDataService.post('payment/modificationTmpToMain', { soh_sys_id: head_sys_id })
        .then((response) => {
          setLoading_btn(false);
          let res_data = response.data;

          if (res_data.return_status == 0 && res_data.error_message == 'Success') {
            console.log(res_data.order_id, defaultLocale, 'defaultLocale');
            router.push('/' + defaultLocale + '/payment/modification?orderId=' + res_data.order_id);
            Cookies.remove('MODIFICATION_USER');
          } else {
            setErrorMgs(res_data.error_message);
          }
        })
        .catch((e) => {
          setLoading_btn(false);
          setErrorMgs(e.message);
          setVariant('danger');
        });
    } else {
      alert('Error!');
    }
  };
  const addUpdatePaymentLink = (type, fpl_sys_id = false) => {
    setLoading_btn(true);
    let payment_link_url = `payment/addPaymentLink/${type}`;
    if (fpl_sys_id && fpl_sys_id > 0) {
      payment_link_url = `payment/updatePaymentLink/${type}/${fpl_sys_id}`;
    }
    if (type == 'Edit-Down') {
      tolat_price = -tolat_price;
    }
    console.log(tolat_price, 'tolat_price11');
    //   return false;
    ApiDataService.post(payment_link_url, { soh_sys_id: head_sys_id, modi_user_id: modi_user_id, amount: tolat_price })
      .then((response) => {
        setLoading_btn(false);
        let res_data = response.data;
        if (type == 'Edit-Up' && res_data.return_status == 0 && res_data.error_message == 'Success') {
          // console.log(res_data.order_id, defaultLocale, 'defaultLocale');
          setErrorMgs(res_data.error_message == 'Success' ? mgs : res_data.error_message);
          props.orderListFun();
          setVariant('success');
        } else if (type == 'Edit-Down' && res_data.return_status == 0 && res_data.error_message == 'Success' && res_data.order_id) {
          console.log(res_data.order_id, defaultLocale, 'defaultLocale');
          router.push('/' + defaultLocale + '/payment/modification?orderId=' + res_data.order_id);
          Cookies.remove('MODIFICATION_USER');
        } else {
          setErrorMgs(res_data.error_message);
          setVariant('danger');
        }
      })
      .catch((e) => {
        setLoading_btn(false);
        setErrorMgs(e.message);
        setVariant('danger');
      });
  };
  const promoCodeRemovedFun = () => {
    setPromoCodeAmount(0);
    headerTable('');
  };
  const promoCodeFun = () => {
    if (promoCode && promoCode.length > 1) {
      ApiDataService.getAll('order/promoCodeFun/' + promoCode, { soh_sys_id: head_sys_id })
        .then((response) => {
          let res_data = response.data;
          if (res_data.return_status == 0 && res_data.error_message == 'Success' && res_data.result.OFFER_AMOUNT > 0) {
            setPromoCodeAmount(res_data.result.OFFER_AMOUNT);
            setPromoCodeDesc(res_data.result.SCPN_DESC);
            document.querySelector('.promo_code').classList.remove('delivery_error');
            setPromoCodeErroStatus(false);
            headerTable(promoCode);
            // setErrorMgs(res_data.error_message);
            //setVariant('success');
            setShow(true);
          } else if (res_data.return_status == -333 && res_data.error_message == 'Error' && res_data.result == null) {
            setPromoCodeAmount(0);
            setPromoCodeDesc('');
            setErrorMgs(res_data.error_message);
            setErrorPromo('Invalid_Promo');
            setVariant('danger');
            document.querySelector('.promo_code').classList.add('delivery_error');
            setPromoCodeErroStatus(true);
            setShow(false);
          } else {
            setPromoCodeAmount(0);
            setPromoCodeDesc('');
            setErrorMgs(res_data.error_message);
            setErrorPromo(res_data.result.SCPN_PROMO_CODE);
            setVariant('danger');

            document.querySelector('.promo_code').classList.add('delivery_error');
            setPromoCodeErroStatus(true);
            setShow(false);
          }
        })
        .catch((e) => {
          setErrorMgs(e.message);
          setVariant('danger');
        });
    } else {
      console.log(promoCode);
      setPromoCodeErroStatus(false);
    }
  };

  const headerTable = (promoCode) => {
    let post_data = { showRoomVal: header_info.SOH_SHOWROOM_CODE, deliveryType: header_info.SOH_CARRIER_CODE, PROMO_CODE: promoCode, cart_remark_desc: header_info.SOH_DESC, userId: userId };

    if (user_info && user_info.cust_type == 'ADMIN' && head_sys_id > 0) {
      post_data = { ...post_data, soh_sys_id: head_sys_id };
    }
    ApiDataService.post('order/cart/orderHead', post_data)
      .then((response) => {
        let res_data = response.data;

        if (res_data.return_status == 0 && res_data.error_message == 'Success') {
          // GoogleAnalytics.beginCheckout(orderList,totalPriceInfo);
          setErrorMgs(res_data.error_message);
          setVariant('success');
          props.orderListFun();
        } else if (res_data.return_status == 111) {
          setErrorMgs(res_data.error_message);
          setVariant('danger');
        } else if (res_data.return_status == '333') {
          setLoginModalShow(true);
        } else {
          setErrorMgs(res_data.error_message);
          setVariant('danger');
        }
      })
      .catch((e) => {
        setErrorMgs(e.message);
        setVariant('danger');
      });
  };
  const sendEmail = () => {
    setLoading_btn(true);
    ApiDataService.getAll(`payment/sendPaymentLinkEmail/${head_sys_id}`)
      .then((response) => {
        let res_data = response.data;
        setLoading_btn(false);
        if (res_data.return_status == 0 && res_data.error_message == 'Success') {
          setErrorMgs(res_data.error_message == 'Success' ? mgs : res_data.error_message);
          setVariant('success');
        } else {
          setErrorMgs(res_data.error_message);
          setVariant('danger');
        }
      })
      .catch((e) => {
        setLoading_btn(false);
        setErrorMgs(e.message);
        setVariant('danger');
      });
  };

  return (
    <div className="shipping_sidebar pb-5 ms-lg-5">
      <Row>
        <Col xs={12} className="heading">
          <h2> {t('OrderSummary')} </h2>{' '}
        </Col>
      </Row>
      {props.modification_list &&
        props.modification_list.map((data, index) => {
          return (
            <div className="ordercol" key={index}>
              <Row>
                <Col xs={1}>{product_index++}</Col>
                <Col xs={9}>
                  <div className="media item d-flex">
                    <LazyLoadImage className="me-3 mt-2" src={data.SOL_IMAGE_PATH ? data.SOL_IMAGE_PATH : `/assets/images/profile/MaskGroup4322.png`} alt="sedarglobal" width="auto" height="auto" />
                    <Col className="media-body">
                      {data.brand_info && data.brand_info['SII_BR_DESC'] ? (
                        <h6>
                          {data.brand_info['SII_BR_DESC']} : <span>{data.brand_info['SII_ITEM_ID']}</span>
                        </h6>
                      ) : (
                        ''
                      )}
                      <p>{data.SFP_TITLE}</p>
                      {data.SOL_ITEM_LABEL == 'SAMPLE' ? <span className="fw-normal text-9e6493">{t('free_sample')}</span> : ''}
                      {data.SFI_STATUS == 'ONDEMAND' ? <span className="fw-normal text-9e6493">{t('ONDEMAND')}</span> : ''}
                    </Col>
                    {/* <span className="removeitem position-absolute top-0 end-0 me-3 mt-1" onClick={() => { orderDelete(data) }}>✕</span> */}
                  </div>
                </Col>
                <Col xs={2}>
                  <div className="price">
                    <p>
                      {/* <span>{data.SOL_CCY_CODE ? t(data.SOL_CCY_CODE) : t(currency)} </span> */}
                      <CurrencyFormat value={data.SOL_VALUE ? data.SOL_VALUE : 0} menus_state={props.menus_state} />
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          );
        })}
      {props.complete_list &&
        props.complete_list.map((data, index) => {
          return (
            <>
              {data.SOL_ITEM_LABEL != 'SAMPLE' ? (
                <div className={data.SOL_SYS_ID == orderLine_status ? 'ordercol opacity4' : 'ordercol'} key={index}>
                  <Row>
                    <Col xs={1}>{product_index++}</Col>
                    <Col xs={9}>
                      <div className="media item d-flex">
                        <LazyLoadImage className="me-3 mt-2" src={data.SOL_IMAGE_PATH ? data.SOL_IMAGE_PATH : `/assets/images/profile/MaskGroup4322.png`} alt="sedarglobal" width="auto" height="auto" />
                        <Col className="media-body">
                          {data.brand_info && data.brand_info['SII_BR_DESC'] ? (
                            <h6>
                              {data.brand_info['SII_BR_DESC']} : <span>{data.brand_info['SII_ITEM_ID']}</span>
                            </h6>
                          ) : (
                            ''
                          )}
                          <p>{data.SFP_TITLE}</p>
                          {data.SOL_ITEM_LABEL == 'SAMPLE' ? <span className="fw-normal text-9e6493">{t('free_sample')}</span> : ''}
                          {data.SFI_STATUS == 'ONDEMAND' ? <span className="fw-normal text-9e6493">{t('ONDEMAND')}</span> : ''}
                        </Col>
                        {/* <span className="removeitem position-absolute top-0 end-0 me-3 mt-1" onClick={() => { orderDelete(data) }}>✕</span> */}
                      </div>
                    </Col>
                    <Col xs={2}>
                      <div className="price">
                        <p>
                          {/* <span>{data.SOL_CCY_CODE ? t(data.SOL_CCY_CODE) : t(currency)} </span> */}
                          <CurrencyFormat value={data.SOL_VALUE ? data.SOL_VALUE : 0} menus_state={props.menus_state} />
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
              ) : (
                ''
              )}
            </>
          );
        })}
      {props.complete_list &&
        props.complete_list.map((data, index) => {
          return (
            <>
              {data.SOL_ITEM_LABEL == 'SAMPLE' ? (
                <div className={data.SOL_SYS_ID == orderLine_status ? 'ordercol opacity4' : 'ordercol'} key={index} style={{ background: '#f1fafa' }}>
                  <Row>
                    <Col xs={1}>{product_index++}</Col>
                    <Col xs={9}>
                      <div className="media item d-flex">
                        <LazyLoadImage className="me-3 mt-2" src={data.SOL_IMAGE_PATH ? data.SOL_IMAGE_PATH : `/assets/images/profile/MaskGroup4322.png`} alt="sedarglobal" width="auto" height="auto" />
                        <Col className="media-body">
                          {data.brand_info && data.brand_info['SII_BR_DESC'] ? (
                            <h6>
                              {data.brand_info['SII_BR_DESC']} : <span>{data.brand_info['SII_ITEM_ID']}</span>
                            </h6>
                          ) : (
                            ''
                          )}
                          <p>{data.SFP_TITLE}</p>
                          {data.SOL_ITEM_LABEL == 'SAMPLE' ? <span className="fw-normal text-9e6493">{t('free_sample')}</span> : ''}
                        </Col>
                        {/* <span className="removeitem position-absolute top-0 end-0 me-3 mt-1" onClick={() => { orderDelete(data) }}>✕</span> */}
                      </div>
                    </Col>
                    <Col xs={2}>
                      <div className="price">
                        <p>
                          {/* <span>{data.SOL_CCY_CODE ? t(data.SOL_CCY_CODE) : t(currency)} </span> */}
                          <CurrencyFormat value={data.SOL_VALUE ? data.SOL_VALUE : 0} menus_state={props.menus_state} />
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
              ) : (
                ''
              )}
            </>
          );
        })}

      <div className="item-summery">
        <div className="cartcalculation">
          <Row>
            <Col xs={7} className="labeltext">
              {t('Subtotal')}
            </Col>
            <Col xs={5} className="itemamount">
              <CurrencyFormat value={props.price_array && props.price_array.SOL_VALUE ? props.price_array.SOL_VALUE : 0} menus_state={props.menus_state} />
            </Col>
          </Row>
          <Row>
            <Col xs={8} className="labeltext">
              {t('EstShippingHandling')}
            </Col>
            <Col xs={4} className="itemamount">
              <span style={{ color: '#FF9D00' }}>{shipping_price == 0 ? t('Free') : <CurrencyFormat value={shipping_price > 0 ? shipping_price : 0} menus_state={props.menus_state} />}</span>
            </Col>
          </Row>
          {SOH_PROMO_VALUE > 0 ? (
            <Row className="">
              <Col sm={7} className="labeltext">
                {t('Promo_discount')}
              </Col>
              <Col sm={5} className="itemamount text-warning">
                <CurrencyFormat value={SOH_PROMO_VALUE} className="text-warning" menus_state={props.menus_state} />
              </Col>
            </Row>
          ) : (
            ''
          )}
          {old_cart_value > 0 ? (
            <Row className="">
              <Col sm={7} className="labeltext">
                {t('customer_Wallet')}
              </Col>
              <Col sm={5} className="itemamount text-warning">
                <CurrencyFormat value={old_cart_value} className="text-warning" menus_state={props.menus_state} />
              </Col>
            </Row>
          ) : (
            ''
          )}
        </div>
        <div className="carttotal">
          <Row>
            <Col xs={7} className="labeltext">
              {t('Total')}
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
        </div>

        <Row className="promo_code_section">
          <Col sm={12} className="heading text-5f5f5f ">
            <h3> {t('CouponCodeorGiftCard')}</h3>{' '}
          </Col>
          <Col sm={12} className="applycode">
            <InputGroup className="my-2">
              <FormControl className="promo_code" name="promoCode" placeholder={t('CouponCodeorGiftCard')} value={promoCode} onChange={(event) => setPromoCode(event.target.value.toUpperCase())} />
              {promoCodeAmount > 0 ? (
                <Button
                  className="input-group-text fw-normal text-danger"
                  onClick={() => {
                    promoCodeRemovedFun();
                  }}>
                  {' '}
                  {t('Remove')}{' '}
                </Button>
              ) : (
                <Button className="input-group-text" onClick={promoCodeFun}>
                  {' '}
                  {t('Apply')}
                </Button>
              )}
            </InputGroup>
          </Col>
          {promoCodeAmount > 0 ? (
            show ? (
              <Col>
                <Alert variant="success px-2 mt-2 couponSuccess" onClose={() => setShow(false)} dismissible>
                  <Alert.Heading>
                    {' '}
                    <span className="fw-normal fs-6">{t('CouponCodeApplied')} </span>
                  </Alert.Heading>
                </Alert>
              </Col>
            ) : (
              ''
            )
          ) : (
            ''
          )}
        </Row>
        <Row>
          {errorMgs ? (
            <p className={`alert-${variant} fs-6 text-center alert`}>
              {errorMgs}
              {promoCodeErroStatus ? <p className="">{errorPromo == 'Invalid' ? t('promo_code_error') : errorPromo == 'Expired' ? t('code_is_invalid_or_expired') : t('promo_code_error_mgs')}</p> : ''}
            </p>
          ) : (
            ''
          )}
          {(header_info && header_info.SOH_CARRIER_CODE == 'DO03') || (header_info.SOH_CARRIER_CODE == 'DO02' && router.route == '/modification/delivery') ? (
            <>
              {tolat_price >= 0 && shipping_info ? (
                <Col sm={12} className="color-button" style={{ width: '100%' }}>
                  {tolat_price > 0 ? (
                    props.paymentLinkInfo && props.paymentLinkInfo.FPL_AMOUNT == tolat_price && props.paymentLinkInfo.FPL_REF_SYS_ID == head_sys_id ? (
                      props.paymentLinkInfo.FPL_STATUS == 'Paid' ? (
                        <LaddaButton loading={loading_btn} className="pay-button payment_tab" type="button" onClick={tmpToMain}>
                          <span>{t('Proceed_to_order')}</span>
                        </LaddaButton>
                      ) : (
                        <LaddaButton type="button" loading={loading_btn} className="pay-button payment_tab" onClick={sendEmail}>
                          <span>{t('Resend Payment Link Email')}</span>
                        </LaddaButton>
                      )
                    ) : props.paymentLinkInfo && props.paymentLinkInfo.FPL_AMOUNT != tolat_price && props.paymentLinkInfo.FPL_REF_SYS_ID == head_sys_id ? (
                      <LaddaButton
                        type="button"
                        loading={loading_btn}
                        className="pay-button payment_tab"
                        onClick={() => {
                          addUpdatePaymentLink('Edit-Up', props.paymentLinkInfo.FPL_SYS_ID);
                        }}>
                        <span>{t('Update to Payment Link')}</span>
                      </LaddaButton>
                    ) : (
                      <LaddaButton
                        type="button"
                        loading={loading_btn}
                        className="pay-button payment_tab"
                        onClick={() => {
                          addUpdatePaymentLink('Edit-Up');
                        }}>
                        <span>{t('Send to Payment Link')}</span>
                      </LaddaButton>
                    )
                  ) : (
                    <LaddaButton loading={loading_btn} className="pay-button payment_tab" type="button" onClick={tmpToMain}>
                      <span>{t('Proceed_to_order')}</span>
                    </LaddaButton>
                  )}
                </Col>
              ) : shipping_info ? (
                <LaddaButton
                  className="pay-button payment_tab"
                  loading={loading_btn}
                  onClick={() => {
                    addUpdatePaymentLink('Edit-Down');
                  }}>
                  <span>{t('Add Payment in Wallet && Place Order')}</span>
                </LaddaButton>
              ) : (
                ''
              )}
            </>
          ) : (
            ''
          )}
        </Row>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({ user_state: state.UserReducer });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => {
      dispatch({ type: action_type, payload: data_info });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
