/*
DELIVERY_ONLY=>'DO01',
DELIVERY_WITH_INSTALLATION	=> 'DO02'
CLICK_COLLECT => 'DO03'
ARAMEX_DELIVERY=>'DO04'
*/

import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { connect } from "react-redux";
import { Col, Container, Row, ButtonGroup, Button, FormControl, Breadcrumb, Form, InputGroup, Modal, Alert, FloatingLabel } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LinkComponent from '@components/Link';
import { useDispatch } from "react-redux";
import { VscInfo } from 'react-icons/vsc';
import ApiDataService from '../../services/ApiDataService';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import LoginModal from "../../Component/Modals/LoginModal";
import SignupModal from "../../Component/Modals/SignupModal";
import GuestUserFormModal from "../../Component/Modals/GuestUserFormModal";
import ForgotPwdModal from "../../Component/Modals/ForgotPwdModal";
import SaveForLater from './SaveForLater';
import CartEmpty from './CartEmpty';
import FreeSampleValidationPopup from './FreeSampleValidationPopup';
import parse from 'html-react-parser';
import Modification from './Modification';
import OrderModalShowDetail from './OrderModalShowDetail';
import DeleteList from './DeleteList';

import CurrencyFormat from '../../services/CurrencyFormat';
import Sample from './Sample';

import CartPageLoading from '../../Preloader/CartPageLoading'
import PolicyPopup from './PolicyPopup';
import ShowRoomPopup from './ShowRoomPopup';
import RollCalculationPopup from './RollCalculationPopup';
import { useForm } from "react-hook-form";
import GoogleAnalytics from '../../services/GoogleAnalytics';
import SnapPixel from '../../services/SnapPixel';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { cn_iso, langName, ccy_code } from '@utils/i18n';
//import TabbyPromoMgs from '../../PaymentGateway/Tabby/TabbyPromoMgs';
//import TamaraWidget from '../../PaymentGateway/Tamara/TamaraWidget';
import dynamic from 'next/dynamic';
const TabbyPromoMgs = dynamic(() => import('src/PaymentGateway/Tabby/TabbyPromoMgs'), {
  ssr: false,
})
const TamaraWidget = dynamic(() => import('src/PaymentGateway/Tamara/TamaraWidget'), {
  ssr: false,
})

const date_array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const month_array = [7, 8];

const per_user_sample = process.env.NUMBER_OF_SAMPLE_PER_USER ? process.env.NUMBER_OF_SAMPLE_PER_USER : 10;

const site = Cookies.get('siteDetail') || "undefined";
let decimalPoints = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_decimals >= 0 ? parseInt(JSON.parse(site).show_decimals) : 0;
const stock_validation = ['NOT_ACTIVE', 'OUTOFSTOCK'];

const InfoLink = (props) => {
  const { t } = useTranslation("common")
  const [policyModalShow, setPolicyModalShow] = useState(false);
  return (
    <>
      <VscInfo size={18} role="button" onClick={() => setPolicyModalShow(true)} />
      <PolicyPopup show={policyModalShow} onHide={() => setPolicyModalShow(false)} {...props} />
    </>
  )
}

const CartPage = (props) => {
  const { t } = useTranslation("common")
  let user_info = props.user_state ? props.user_state.user_info : null;


  let userId = props.user_state.user_info && props.user_state.user_info.cust_id ? props.user_state.user_info.cust_id : '0';

  let head_sys_id = props.user_state && props.user_state.modification_user_info && props.user_state.modification_user_info.head_sys_id > 0 ? props.user_state.modification_user_info.head_sys_id : 0;
  const dispatch = useDispatch();
  const [errorMgs, setErrorMgs] = useState(false);
  const [errorPromo, setErrorPromo] = useState(false);
  const [variant, setVariant] = useState('danger');
  const [orderList, setOrderList] = useState([]);
  const [modificationList, setModificationList] = useState([]);
  const [deleteOrderList, setDeleteOrderList] = useState([]);
  const [saveLaterOrder, setSaveLaterOrder] = useState();
  const [totalPriceInfo, setTotalPriceInfo] = useState(0);
  const [headerInfo, setHeaderInfo] = useState(0);

  const [loginModalShow, setLoginModalShow] = useState(false);
  const [signupModalShow, setSignupModalShow] = useState(false);
  const [forgotPwdModalShow, setforgotPwdModalShow] = useState(false);
  const [GuestUserFormModalShow, setguestUserFormModalShow] = useState(false);

  const [clickCollectList, setClickCollectList] = useState([]);
  const [deliveryType, setDeliveryType] = useState();
  const [showRoomVal, setShowRoomVal] = useState();
  const [modalShowroomShow, setModalShowroomShow] = useState(false);
  const [freeSampleValidation, setFreeSampleValidation] = useState(false);

  const [showRoomInfo, setShowRoomInfo] = useState({});
  const [promoCode, setPromoCode] = useState();
  const [promoCodeAmount, setPromoCodeAmount] = useState(0);
  const [promoCodeDesc, setPromoCodeDesc] = useState('');

  const [promoCodeErroStatus, setPromoCodeErroStatus] = useState(false);

  const [orderLine_status, setOrderLine_status] = useState(false);

  const [freeSample, setFreeSample] = useState(0);
  const [setSampleCount, setSampleIndex] = useState(0);
  const [cartRemarkVal, setCartRemarkVal] = useState();
  const [cartCount, setCartCount] = useState(0);
  let history = useRouter();

  const [policyDataList, setPolicyDataList] = useState();
  const [checkoutPolicy, setCheckoutPolicy] = useState();

  let today_date = new Date();

  const orderListFun = () => {
    let get_data = {};
    if (user_info && user_info.cust_type == 'ADMIN' && head_sys_id > 0) {
      get_data = { soh_sys_id: head_sys_id }
    }
    ApiDataService.getAll("order/orderList", get_data).then(response => {
      let res_data = response.data;
      if (res_data.return_status == 0 && res_data.error_message == 'Success') {
        let numberCart = res_data.cart_count.QTY > 0 ? res_data.cart_count.QTY : 0;
        dispatch({
          type: 'FETCH_TO_CART',
          payload: {
            cartItems: res_data.complete,
            numberCart: numberCart,
            countFreeSample: parseInt(res_data.countFreeSample)
          },
        });

        let order_list = res_data.complete;
        setCartCount(numberCart);
        setOrderList(res_data.complete);
        setModificationList(res_data.modification ? res_data.modification : []);
        setDeleteOrderList(res_data.delete ? res_data.delete : []);
        setSaveLaterOrder(res_data.save_later);
        setTotalPriceInfo(res_data.total_price);
        setFreeSample(parseInt(res_data.countFreeSample));
        setHeaderInfo(res_data.header_info)

        setDeliveryType(res_data.header_info && res_data.header_info.SOH_CARRIER_CODE ? res_data.header_info.SOH_CARRIER_CODE : deliveryType)

        if (res_data.header_info && res_data.shipping_info && res_data.header_info.SOH_SHOWROOM_CODE > 0 && res_data.header_info.SOH_CARRIER_CODE == 'DO03') {
          setShowRoomVal(res_data.header_info.SOH_SHOWROOM_CODE);
          setShowRoomInfo(res_data.shipping_info);
        }

        if (user_info && res_data.header_info && user_info.cust_type == 'ADMIN' && head_sys_id > 0 && res_data.header_info.SOH_PROMO_VALUE > 0) {
          setPromoCode(res_data.header_info.SOH_PROMO_CODE);
          setPromoCodeAmount(res_data.header_info.SOH_PROMO_VALUE);
          setPromoCodeDesc(res_data.header_info.SOH_PROMO_CODE)
        }
        console.log(head_sys_id, res_data.header_info.SOH_PROMO_VALUE, 'Promo111')

        if (cartRemarkVal == false || cartRemarkVal == undefined) {
          setCartRemarkVal(res_data.header_info && res_data.header_info.SOH_DESC ? res_data.header_info.SOH_DESC : '');
        }

        let sampleKeys = 0;
        order_list.length > 0 && order_list.map((data, index) => {

          if (data.SOL_ITEM_LABEL == 'SAMPLE') {
            sampleKeys++;

          }
          setSampleIndex(sampleKeys);
        })
        GoogleAnalytics.viewCart(order_list, res_data.total_price);
        SnapPixel.viewCart(order_list, res_data.total_price, props?.user_state?.user_info);
        // var ad_products = [];
        //  window.orderedItem = [];//temporary array for product items for Admitad 
        //var gtag_items = [];
        /*  order_list.length > 0 && order_list.forEach((item, index) => {
  
            admitadOrderedItem(item);//ADMITAD Order add
            ad_products.push({ "id": item.brand_info.SII_CODE, "number": item.SOL_QTY });
  
          })

         if (ad_products.length > 0) {
           ReTagCartPage(ad_products);
         }*/


      } else {
        setErrorMgs(res_data.error_message);
        setVariant('danger');
      }
    }).catch(e => {

      setErrorMgs(e.message);
      setVariant('danger');
    })
  }
  const orderDelete = (line_info) => {

    confirmAlert({
      // title: 'Confirm to submit',
      message: t("Areyousureremove"),
      buttons: [
        {
          label: t("Yes"),
          onClick: () => {
            setOrderLine_status(line_info.SOL_SYS_ID);
            ApiDataService.delete(`order/cart/${line_info.SOL_SYS_ID}`, { userId: userId, visitorId: line_info.SOL_TOKEN_ID })
              .then(response => {
                let res_data = response.data;
                if (res_data.return_status == 0 && res_data.error_message == 'Success') {
                  promoCode ? promoCodeFun() : '';
                  orderListFun();
                  setErrorMgs(res_data.error_message);
                  setVariant('success');
                  GoogleAnalytics.removeFromCart(line_info);

                } else {
                  setErrorMgs(res_data.error_message);
                  setVariant('danger');
                }
                setOrderLine_status('');
              }).catch(e => {

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

  const { register, handleSubmit, watch, errors, reset } = useForm()


  const headerTable = () => {

    //captcha code start
    // const captcha = childRef.current.doSubmit()
    const captcha = true;


    if (captcha) {
      if (setSampleCount > 0 && freeSample > per_user_sample) {

        setFreeSampleValidation(true);
        return false;
      } else if (deliveryType == 'DO03' && showRoomVal == undefined) {

        setModalShowroomShow('true');
        return false;
      }
      GoogleAnalytics.beginCheckout(orderList, totalPriceInfo);
      let post_data = { showRoomVal: deliveryType == 'DO03' ? showRoomVal : '', deliveryType: deliveryType, PROMO_CODE: promoCode, cart_remark_desc: cartRemarkVal, userId: userId }

      if (user_info && user_info.cust_type == 'ADMIN' && head_sys_id > 0) {
        let url_header_id = history.query?.head_sys_id;
        if (url_header_id != head_sys_id) {
          alert('Please Refresh The Page');
          return false;
        }
        post_data = { ...post_data, soh_sys_id: head_sys_id }
      }
      ApiDataService.post('order/cart/orderHead', post_data).then(response => {
        let res_data = response.data;

        if (res_data.return_status == 0 && res_data.error_message == 'Success') {
          // GoogleAnalytics.beginCheckout(orderList,totalPriceInfo);
          setErrorMgs(res_data.error_message);
          setVariant('success');
          if (user_info && user_info.cust_type == 'ADMIN' && head_sys_id > 0) {
            history.push('modification/shipping?head_sys_id=' + head_sys_id);
          } else {
            if (deliveryType == 'DO02') {
              history.push('cart/shippingAddress');
            } else if (deliveryType == 'DO03') {
              if (user_info && user_info.cust_cr_uid == 'GUEST-USER') {
                history.push('cart/payment');
              } else {
                history.push('cart/clickCollect');
              }
            }
          }

        } else if (res_data.return_status == 111) {
          setErrorMgs(res_data.error_message);
          setVariant('danger');
        } else if (res_data.return_status == '333') {
          setLoginModalShow(true);
        } else {

          setErrorMgs(res_data.error_message);
          setVariant('danger');
        }
      }).catch((e) => {
        setErrorMgs(e.message);
        setVariant('danger');
      });
    } else {
      $('.deliveryoption').removeClass('delivery_error');
      //  alert(t('Captcha_error_mgs'));

    }
  }
  const updateLineTable = (line_id, line_type, line_value) => {
    setOrderLine_status(line_id);
    ApiDataService.post('order/cart/updateLineTable/' + line_id, { 'line_type': line_type, 'line_value': line_value, soh_sys_id: head_sys_id }).then(response => {
      let res_data = response.data;
      if (res_data.return_status == 0 && res_data.error_message == 'Success') {
        promoCode ? promoCodeFun() : '';
        setOrderList(res_data.complete);
        setModificationList(res_data.modification ? res_data.modification : []);
        setDeleteOrderList(res_data.delete ? res_data.delete : []);
        setTotalPriceInfo(res_data.total_price);
        setErrorMgs(res_data.error_message);
        setVariant('success');
        orderListFun();
        setOrderLine_status(false)

      } else {
        setErrorMgs(res_data.error_message);
        setVariant('danger');
      }
    }).catch((e) => {
      setErrorMgs(e.message);
      setVariant('danger');
    });
  }
  const updateLineQTY = (line_id, current_qty, type) => {
    let line_qty = 1;
    current_qty = parseInt(current_qty);
    if (type == 'MINUS') {
      line_qty = current_qty - 1;
    } else if (type == 'PLUS') {
      line_qty = current_qty + 1;
    }
    let final_qty = line_qty > 0 ? line_qty : 1;

    updateLineTable(line_id, 'ORDER_QTY', final_qty);
  }

  const cityList = (country = 'AE') => {
    ApiDataService.getAll("shipping/getClickAndCollectShowroomList/" + country)
      .then(response => {
        let res_data = response.data;

        if (res_data.return_status == 0 && res_data.error_message == 'Success') {

          setClickCollectList(res_data.clickCollectResult);
        } else {
          setErrorMgs(res_data.error_message);
          setVariant('danger');
        }
      }).catch(e => {

        setErrorMgs(e.message);
        setVariant('danger');
      });
  }
  const updateShowRoomAddressFun = (val) => {
    setShowRoomInfo(val);
    setShowRoomVal(val.SSA_SYS_ID);
    setModalShowroomShow(false);
  }

  const sfiStatusValidationFun = () => {
    let sfiStatus_val = true;
    orderList.length > 0 && orderList.map((data, index) => {
      if (stock_validation.indexOf(data.SFI_STATUS_NEW) >= 0) {
        sfiStatus_val = false;
        const section = document.querySelector('#ordercol_' + data.SOL_SYS_ID);
        section?.scrollIntoView({
          top: 10,
          behavior: 'smooth',
          block: 'center',
          inline: "nearest"
        });
        data['subject'] = data.SFI_STATUS_NEW + ' cartPage';
        ApiDataService.post('emailFun', data).then(response => {
          console.log(response, 'emailFun');
        }).catch(e => {
          console.log(e);
          alert('Error catch');
        });
      }
    })
    return sfiStatus_val;
  }

  const checkOutValidation = () => {

    if (deliveryType == '' || deliveryType == undefined) {

      setErrorMgs('Please select deliver type');
      setVariant('danger');
      $('.deliveryoption').addClass('delivery_error');

      const section = document.querySelector('#deliveryOption');
      section?.scrollIntoView({
        top: 10,
        behavior: 'smooth',
        block: 'center',
        inline: "nearest"
      });


    } else if (deliveryType === 'DO03') {
      setModalShowroomShow('true');
    } else {
      $('.deliveryoption').removeClass('delivery_error');
    }
  }
  const [show, setShow] = useState(true);

  const promoCodeFun = () => {
    if (promoCode && promoCode.length > 1) {
      ApiDataService.getAll('order/promoCodeFun/' + promoCode, { soh_sys_id: head_sys_id }).then(response => {
        let res_data = response.data;
        if (res_data.return_status == 0 && res_data.error_message == 'Success' && res_data.result.OFFER_AMOUNT > 0) {

          setPromoCodeAmount(res_data.result.OFFER_AMOUNT);
          setPromoCodeDesc(res_data.result.SCPN_DESC);
          document.querySelector(".promo_code").classList.remove('delivery_error');
          setPromoCodeErroStatus(false);
          // setErrorMgs(res_data.error_message);
          //setVariant('success');
          setShow(true)
        } else if (res_data.return_status == -333 && res_data.error_message == 'Error' && res_data.result == null) {

          setPromoCodeAmount(0)
          setPromoCodeDesc('');
          setErrorMgs(res_data.error_message);
          setErrorPromo('Invalid_Promo');
          setVariant('danger');
          document.querySelector(".promo_code").classList.add('delivery_error');
          setPromoCodeErroStatus(true);
          setShow(false)

        } else {
          setPromoCodeAmount(0)
          setPromoCodeDesc('');
          setErrorMgs(res_data.error_message);
          setErrorPromo(res_data.result.SCPN_PROMO_CODE);
          setVariant('danger');

          document.querySelector(".promo_code").classList.add('delivery_error');
          setPromoCodeErroStatus(true);
          setShow(false)

        }
      }).catch((e) => {
        setErrorMgs(e.message);
        setVariant('danger');
      });
    } else {
      console.log(promoCode);
      setPromoCodeErroStatus(false);
    }

  }
  const promoCodeRemovedFun = () => {
    setPromoCodeAmount(0);
  }

  const cartRemarkFun = (val) => {
    setCartRemarkVal(val);
  }

  useEffect(() => {
    orderListFun();
    cityList(cn_iso);
  }, [props.user_state.isLoggedIn]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const deliveryPolicyFun = () => {
      ApiDataService.getAll("content/first", { content: 'cartpage' })
        .then(response => {
          let delivery_policy = response.data.result.COMPONENT[0] ? response.data.result.COMPONENT[0]['PARENT']['CHILD'] : [];
          setPolicyDataList(delivery_policy);
          let checkout_policy = response.data.result.COMPONENT[1] && response.data.result.COMPONENT[1]['PARENT']['CHILD'] ? response.data.result.COMPONENT[1]['PARENT']['CHILD'][0] : [];
          setCheckoutPolicy(checkout_policy);

          // temp0[0].PARENT.CHILD[0]

        }).catch(e => {
          setErrorMgs(e.message);
          setVariant('danger');
        })
    }
    deliveryPolicyFun();
    setTimeout(() => {
      setLoading(false);


      console.log(history.query.head_sys_id, 'history', head_sys_id, props.user_state.isLoggedIn);
      if (history.pathname == '/modification' && history.query.head_sys_id) {
        if (history.query && history.query.head_sys_id && history.query.head_sys_id != head_sys_id) {

          console.log(history.query.head_sys_id, 'history11', head_sys_id);
          //alert(1);
          props.user_dispatch('LOGOUT_USER');
          setLoginModalShow(true);
        } else if (!props.user_state.isLoggedIn) {
          setLoginModalShow(true);
        }

      }
    }, 2000);
  }, []);



  const [modalRoolPopupShow, setModalRoolPopupShow] = useState(false);
  const [modalShowDetail, setModalShowDetail] = useState({ show: false, itemDetail: '' });
  const [orderId, setOrderId] = useState(0);


  const [termAndCondition, setTermAndCondition] = React.useState(false);


  let i = 1;
  let j = 0;
  let k = 0;
  let l = 0;
  const onSubmit = () => {
    let sfiStatus = sfiStatusValidationFun();
    if (props.user_state.isLoggedIn && deliveryType == 'DO02' && sfiStatus) {
      headerTable();
    } else if (props.user_state.isLoggedIn && showRoomVal && deliveryType == 'DO03' && sfiStatus) {
      headerTable();
    } else if (!props.user_state.isLoggedIn) {
      setLoginModalShow(true)
    } else if (!sfiStatus) {
      console.log('here...12');
    } else {
      checkOutValidation()
    }
  }

  let total_price = Number(totalPriceInfo.SOL_VALUE) - Number(promoCodeAmount);
  return (

    <section className="CartPage">

      {loading ? <CartPageLoading /> : (orderList && orderList.length == 0) && (modificationList && modificationList.length == 0) && (saveLaterOrder && saveLaterOrder.length == 0) ? <CartEmpty /> :
        <>
          <Container className="maxwidth">
            <Row>
              <Col sm={12} className="d-none d-xl-block">
                <Breadcrumb>
                  <Breadcrumb.Item> <LinkComponent href="/">{t("Home")} </LinkComponent></Breadcrumb.Item>
                  <Breadcrumb.Item>{t("Cart")}   </Breadcrumb.Item>
                </Breadcrumb>
              </Col>
            </Row>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md={7} lg={7} xl={8} xxl={8} className="CartPage_content_col pt-3 pt-xl-0">

                  <Row className="pb-3 d-none d-md-flex">
                    <Col sm={6}>
                      <div className="heading-section ">
                        <h3>{t("Cart")}  <span>( {cartCount} {t("items")}   )</span></h3>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className={`button-section ${langName == 'ar' ? 'text-start' : 'text-end'}`}>
                        <div className="border-button">
                          <LinkComponent className="" href="/"  ><span>{t("ContinueShopping")}  </span></LinkComponent>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Modification modification_list={modificationList} updateLineTable={updateLineTable} updateLineQTY={updateLineQTY} />
                  <Row>
                    {modificationList && modificationList.length > 0 && orderList.length > 0 ?
                      <h3 className="my-4 pb-3">{t("new_item_list")} </h3>
                      : ''}
                    {orderList.length > 0 && orderList.map((data, index) => {
                      data.SOL_ITEM_LABEL != 'SAMPLE' ? l++ : ''

                      return (
                        <React.Fragment key={index}>
                          {data.SOL_ITEM_LABEL != 'SAMPLE' ?

                            <>

                              {l == 1 ?
                                <Col sm={12} className="mb-3 item_cart_header">
                                  <div className="orderheader d-none d-xl-block">
                                    <Row>
                                      <Col sm={6}> <p>{t("Product")} </p> </Col>
                                      <Col sm={2} > <p>{t("Price")} </p> </Col>
                                      <Col sm={2}><p>{t("Quantity")}</p></Col>
                                      <Col sm={2}><p>{t("Total")} </p></Col>
                                    </Row>
                                  </div>
                                </Col> : ''}

                              <Col sm={12} key={index} className="mb-2 item_cart_detail">
                                <div className={data.SOL_SYS_ID == orderLine_status ? 'ordercol opacity4' : 'ordercol'} id={'ordercol_' + data.SOL_SYS_ID} >
                                  <Row className={stock_validation.indexOf(data.SFI_STATUS_NEW) >= 0 ? 'out_of_stock' : ''} title={t('outofstock_mgs')}>
                                    <Col xl={6} className="py-3 py-xl-2 item_description">
                                      <div className="media item  d-flex">
                                        <Col xs={1}><span className="text-secondary p-1">{index > 9 ? index : '0' + (i++)}</span></Col>
                                        <Col className="p-0" xs={2}>
                                          <LazyLoadImage className="px-1 px-xl-2" src={data.SOL_IMAGE_PATH ? data.SOL_IMAGE_PATH : `/assets/images/profile/MaskGroup4322.png`} alt="sedarglobal" width="auto" height="auto" />
                                        </Col>
                                        <Col className="media-body ps-3" xs={9}>
                                          {['1506084', '1146375'].indexOf(data.SOL_PR_ITEM_CODE) >= 0 ? <p>{data.PRODUCT_DESC}</p> : ''}
                                          <p>{data.SFP_TITLE}</p>
                                          {data.brand_info && data.brand_info['SII_ITEM_ID'] ? <h6>{t("ItemCode")}  : <span>{data.brand_info['SII_ITEM_ID']}</span></h6> : ''}
                                          {data.brand_info && data.brand_info['SII_BR_DESC'] ? <h6>{t("Brand")}  : <span>{data.brand_info['SII_BR_DESC']}</span></h6> : ''}
                                          {data.SOL_WIDTH > 0 && data.SOL_HEIGHT > 0 ? <h6>{t("Dim")}   :
                                            {langName == 'ar' ? <span>{data.SOL_HEIGHT ? data.SOL_HEIGHT : 0}<span className='px-1'>x</span>{data.SOL_WIDTH ? data.SOL_WIDTH : 0} {t("cmcart")} </span>
                                              : <span>{data.SOL_WIDTH ? data.SOL_WIDTH : 0}<span className='px-1'>x</span>{data.SOL_HEIGHT ? data.SOL_HEIGHT : 0} {t("cmcart")} </span>
                                            }</h6> : ''}
                                          {data.info_data && data.info_data['CONTROL_TYPE'] ? <h6>{t('CONTROL_TYPE')} : <span>{data.info_data['CONTROL_TYPE']['SPS_DESC']}</span></h6> : ''}

                                          {data.info_data && data.info_data.ROLL_CALCULATION ?
                                            <h6 className="savelater 1" onClick={() => { setModalRoolPopupShow(true); setOrderId(data.SOL_SYS_ID) }}> {t("MoreDetail")}  </h6> :
                                            data.SOL_ITEM_LABEL == "ADD_TO_CART" ? '' : <h6 className="savelater 2" onClick={() => { setModalShowDetail({ show: true, itemDetail: data }) }}> {t("MoreDetail")}  </h6>
                                          }

                                          <div className='edit_save'>
                                            {user_info && user_info.cust_type == 'ADMIN' && head_sys_id > 0 ?
                                              <span>
                                                {data.brand_info && data.PRODUCT_YN == 'Y' ? <LinkComponent className="editoption" href={`${data.SPI_CATEGORY}/${data.SPI_SUB_CATEGORY}/${data.SPI_LINK_URL}/${data.brand_info.SII_CODE}/customize/edit/` + data.SOL_SYS_ID} >{t("Editoptions")} </LinkComponent> : ''}
                                              </span>
                                              : stock_validation.indexOf(data.SFI_STATUS_NEW) == -1 ?
                                                <>
                                                  {data.SOL_ITEM_LABEL == "QUICK_BUY" ? (
                                                    <span>
                                                      <LinkComponent className="editoption" href={`${data.SPI_CATEGORY}/${data.SPI_SUB_CATEGORY}/${data.SPI_LINK_URL}/${data.brand_info ? data.brand_info.SII_CODE : ''}/${data.SOL_SYS_ID}`} >{t("Editoptions")} </LinkComponent>
                                                    </span>
                                                  ) : data.SOL_ITEM_LABEL == "ADD_TO_CART" && data.PRODUCT_YN == 'N' && data.ALLOW_CUSTOMIZATION_YN == 'Y' ? (
                                                    <span>
                                                      <LinkComponent className="editoption" href={`${data.SPI_CATEGORY}/${data.SPI_SUB_CATEGORY}/${data.SPI_LINK_URL}/${data.brand_info ? data.brand_info.SII_CODE : ''}/${data.SOL_SYS_ID}`} >{t("Editoptions")} </LinkComponent>
                                                    </span>
                                                  ) : data.SOL_ITEM_LABEL == "ADD_TO_CART" ? ('') : (
                                                    <span>
                                                      {data.brand_info ? <LinkComponent className="editoption" href={`${data.SPI_CATEGORY}/${data.SPI_SUB_CATEGORY}/${data.SPI_LINK_URL}/${data.brand_info.SII_CODE}/customize/edit/` + data.SOL_SYS_ID} >{t("Editoptions")} </LinkComponent> : ''}
                                                    </span>
                                                  )
                                                  }
                                                </>
                                                : ''
                                            }
                                            {data.SOL_TOKEN_ID && data.SOL_CUST_SYS_ID > 0 && props.user_state.isLoggedIn ?
                                              <span>
                                                <span className="savelater" to="cartPage" onClick={() => updateLineTable(data.SOL_SYS_ID, 'CART_STATUS', 'SAVE_LATER')} >
                                                  {t("save_for_later")}
                                                </span>
                                              </span>
                                              : ''}
                                          </div>
                                        </Col>
                                      </div>
                                    </Col>
                                    <Col xs={6} xl={2} className="py-3 py-xl-2 item_price">
                                      {(data.SOL_OLD_PRICE > data.SOL_PRICE) ? (
                                        <p style={{ font: 'normal normal normal 0.89rem/10px Helvetica-Neue-Medium', color: '#787878' }}>
                                          <del className='d-none d-xl-block'>
                                            <CurrencyFormat
                                              value={data.SOL_OLD_VALUE ? (data.SOL_OLD_VALUE / data.SOL_QTY) : 0}
                                              decimalScale={decimalPoints}
                                              displayType="text"
                                              thousandSeparator={true}
                                              fixedDecimalScale={decimalPoints > 0 ? true : false}
                                              isNumericString={decimalPoints > 0 ? false : true}
                                            />
                                          </del>
                                        </p>
                                      ) : ('')}
                                      <div className="price">
                                        <p className='d-none d-xl-block'>
                                          <CurrencyFormat
                                            value={data.SOL_PRICE ? data.SOL_PRICE : 0}
                                            decimalScale={decimalPoints}
                                            displayType="text"
                                            thousandSeparator={true}
                                            fixedDecimalScale={decimalPoints > 0 ? true : false}
                                            isNumericString={decimalPoints > 0 ? false : true}
                                            ccy_code={data.SOL_CCY_CODE}
                                          />
                                        </p>
                                        <p className='col-sm-1 d-block d-sm-none' style={{ paddingTop: '5px' }}>
                                          <CurrencyFormat
                                            value={data.SOL_VALUE ? data.SOL_VALUE : 0}
                                            decimalScale={decimalPoints}
                                            displayType="text"
                                            thousandSeparator={true}
                                            fixedDecimalScale={decimalPoints > 0 ? true : false}
                                            isNumericString={decimalPoints > 0 ? false : true}
                                            ccy_code={data.SOL_CCY_CODE}
                                          />
                                        </p>
                                      </div>
                                    </Col>
                                    <Col xs={6} xl={2} className="py-3 py-xl-2 item_quantity">
                                      <div className="quantity mb-0 mb-xl-3" >
                                        <div className="quantitycount">
                                          <ButtonGroup aria-label="Basic example">
                                            <Button variant="light" onClick={() => updateLineQTY(data.SOL_SYS_ID, data.SOL_QTY, 'MINUS')} >-</Button>
                                            <FormControl
                                              type="text"
                                              value={data.SOL_QTY}
                                              onChange={(event) => console.log(event)}
                                              className="rounded-0"
                                            />
                                            <Button variant="light" onClick={() => updateLineQTY(data.SOL_SYS_ID, data.SOL_QTY, 'PLUS')} >+</Button>
                                          </ButtonGroup>
                                        </div>
                                      </div>
                                    </Col>
                                    <Col xl={2} className="py-xl-2 d-none d-xl-block item_price_total">
                                      <div className="price total ">
                                        <p>
                                          {/* <span>{t(data.SOL_CCY_CODE)} </span> */}
                                          <CurrencyFormat
                                            value={data.SOL_VALUE ? data.SOL_VALUE : 0}
                                            decimalScale={decimalPoints}
                                            displayType="text"
                                            thousandSeparator={true}
                                            fixedDecimalScale={decimalPoints > 0 ? true : false}
                                            isNumericString={decimalPoints > 0 ? false : true}
                                            ccy_code={data.SOL_CCY_CODE}
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
                                  <span className="removeitem position-absolute top-0 end-0 me-3 mt-1" onClick={() => { orderDelete(data) }}>✕</span>
                                </div>
                              </Col>
                            </>
                            : ''}
                        </React.Fragment>)
                    })}
                    {orderList.length > 0 && orderList.map((data, index) => {


                      data.SOL_ITEM_LABEL == 'SAMPLE' ? k++ : ''
                      return (

                        <React.Fragment key={index}>
                          {data.SOL_ITEM_LABEL == 'SAMPLE' ?
                            <>

                              {k == 1 ?
                                <Col sm={12} className="mb-4 item_cart_header">
                                  <div className="orderheader d-none d-xl-block">
                                    <Row>
                                      <Col sm={6}> <p>{t("free_sample")} </p> </Col>
                                      {/* <Col sm={2} > <p>{t("Price")} </p> </Col>
                                        <Col sm={2}><p>{t("Quantity")}</p></Col>
                                        <Col sm={2}><p>{t("Total")} </p></Col> */}
                                    </Row>
                                  </div>
                                </Col> : ''}

                              <Sample save_for_later={saveLaterOrder} updateLineTable={updateLineTable} updateLineQTY={updateLineQTY} sample_data={data} key={index} index={j++} orderDelete={orderDelete} />
                            </>

                            : ''}
                        </React.Fragment>
                      )
                    })}
                  </Row>
                  <Row>
                    <Col className='remark_section'>

                      <Col xl={12} sm={12} className="text_area">


                        <FloatingLabel label={t('Order_Notes')} >
                          <Form.Control
                            as="textarea"
                            placeholder={t('Order_Notes')}
                            name="remarks"
                            rows={1}
                            onChange={(e) => cartRemarkFun(e.target.value)} defaultValue={cartRemarkVal}
                            style={{ borderColor: "#e9e9ed" }}
                          />

                        </FloatingLabel>
                      </Col>

                    </Col>
                  </Row>
                  {cartCount && cartCount > 0 ?
                    <div className="ordercol" id="deliveryOption">
                      <Row className="deliveryoption ">
                        <Col onClick={() => { setDeliveryType('DO02') }} xl={5} className={`deliveryoptionbox pt-1 pb-3 py-sm-3 px-1  mt-2  ${deliveryType == 'DO02' ? "active" : ''}`}>
                          <label className="m-2">
                            <Form.Check
                              inline
                              name='delivery_type'
                              type='radio'
                              value="DO02"
                              // defaultChecked={deliveryType == 'DO02' ? true : false}
                              checked={deliveryType == 'DO02' ? true : false}
                              onChange={() => { setDeliveryType('DO02') }}
                            />
                            <div className="labeltext pe-2" style={{ float: 'right' }} >
                              <h5> {t('delivery/installation')} </h5>
                            </div>
                          </label>
                          <InfoLink link="#" className="px-2" delivery_type="DO02" policy_header="Delivery_Installation" policy_data={policyDataList} />
                        </Col>

                        <Col xl={4} className={`deliveryoptionbox pt-1 pb-3 py-sm-3 px-1 ms-xl-4 mt-2   ${deliveryType == 'DO03' ? "active" : ''}`}>
                          <label className="m-2" onClick={() => { setDeliveryType('DO03'), setModalShowroomShow('true') }}>
                            <Form.Check
                              inline
                              name='delivery_type'
                              type="radio"
                              value="DO03"
                              // defaultChecked={deliveryType == 'DO03' ? true : false}
                              checked={deliveryType == 'DO03' ? true : false}
                              onChange={() => { setDeliveryType('DO03') }}
                            />
                            <div className="labeltext pe-2" style={{ float: "right" }}>
                              <h5> {t('Click_Collect')} </h5>
                            </div>
                          </label>
                          <InfoLink link="#" className="px-2" delivery_type="DO03" policy_header="Click_Collect_Policy" policy_data={policyDataList} />
                          <div className='showroom_city'>{showRoomInfo && deliveryType == 'DO03' && showRoomInfo.SSA_ADDRESS_TITLE ? showRoomInfo.SSA_ADDRESS_TITLE + ', ' + showRoomInfo.SSA_CITY_NAME + ', ' + showRoomInfo.SSA_SCN_ISO : ''}</div>
                        </Col>
                      </Row>
                    </div>
                    : ''}
                  <DeleteList delete_list={deleteOrderList} updateLineTable={updateLineTable} updateLineQTY={updateLineQTY} />
                  <SaveForLater save_for_later={saveLaterOrder} updateLineTable={updateLineTable} updateLineQTY={updateLineQTY} />

                </Col>
                {cartCount && cartCount > 0 ?
                  <Col md={5} lg={5} xl={4} xxl={4} className="CartPage_sidebar_col">
                    <div className="sidebar p-3 p-md-4 p-xl-5">
                      <Row>
                        <Col sm={12} className="heading"><h2>  {t('CartSummary')}</h2> </Col>
                      </Row>
                      <div className="item-summery">
                        <div className="cartcalculation">
                          <Row>
                            <Col xs={7} className="labeltext">
                              <h6 className='text-5f5f5f'> {t('Ordertotal')}</h6>
                            </Col>
                            <Col xs={5} className="itemamount">
                              <CurrencyFormat
                                value={totalPriceInfo && totalPriceInfo.SOL_OLD_VALUE && Number(totalPriceInfo.SOL_OLD_VALUE) > 0 ? totalPriceInfo.SOL_OLD_VALUE : 0}
                                decimalScale={decimalPoints}
                              />

                            </Col>
                          </Row>
                          {(totalPriceInfo.SOL_VALUE != totalPriceInfo.SOL_OLD_VALUE) && (
                            <Row>
                              <Col xs={7} className="labeltext">
                                <h6 className='text-5f5f5f'> {t('discounts')}</h6>
                              </Col>
                              <Col xs={5} className="itemamount discount">
                                - &nbsp;
                                <CurrencyFormat
                                  value={totalPriceInfo && totalPriceInfo.SOL_OLD_VALUE && Number(totalPriceInfo.SOL_OLD_VALUE) > 0 ? (totalPriceInfo.SOL_OLD_VALUE - totalPriceInfo.SOL_VALUE) : 0}
                                  decimalScale={decimalPoints}
                                />

                              </Col>
                            </Row>
                          )}
                          <Row>
                            <Col xs={7} className="labeltext">
                              <h6 className='text-5f5f5f'> {t('Subtotal')}</h6>
                            </Col>
                            <Col xs={5} className="itemamount">
                              <CurrencyFormat
                                value={totalPriceInfo && totalPriceInfo.SOL_VALUE && Number(totalPriceInfo.SOL_VALUE) > 0 ? totalPriceInfo.SOL_VALUE : 0}
                                decimalScale={decimalPoints}
                              />

                            </Col>
                          </Row>

                          {promoCodeAmount > 0 ?
                            <Row>
                              <Col xs={7} className="labeltext">
                                <h6 className='text-5f5f5f'>{t("Promo_discount")}</h6>
                                <p style={{ fontSize: '12px' }}>{promoCodeAmount && promoCodeAmount > 0 ? `(${promoCodeDesc})` : ''}</p>
                              </Col>
                              <Col xs={5} className="itemamount text-dark promo_discount shake-animation discount">
                                - &nbsp;
                                <CurrencyFormat
                                  value={promoCodeAmount && promoCodeAmount > 0 ? promoCodeAmount : 0}
                                />

                              </Col>
                              {/* <Col className="text-end">
                                <button className='btn btn-danger rounded-3 py-1 mt-2 fw-normal' onClick={() => { promoCodeRemovedFun() }} >{t("Remove")} </button>
                                <span className="removeitem ms-3 fs-4 text-dark fw-bold" role="button" title="Remove Coupon Code " onClick={() => { promoCodeRemovedFun() }}>✕</span>

                              </Col> */}

                            </Row> : ''}
                        </div>
                        <div className="carttotal">
                          <Row>
                            <Col sm={7} className="labeltext">
                              <h6 className='text-5f5f5f'>{t("Totalwithtax")}</h6>
                            </Col>
                            <Col sm={5} className="itemamount">
                              <CurrencyFormat
                                value={totalPriceInfo && totalPriceInfo.SOL_VALUE && total_price > 0 ? total_price : 0}
                                decimalScale={decimalPoints}
                              />
                            </Col>
                          </Row>
                        </div>
                      </div>
                      <Row className='promo_code_section'>

                        <Col sm={12} className="heading text-5f5f5f "><h3> {t("CouponCodeorGiftCard")}</h3> </Col>
                        <Col sm={12} className="applycode">
                          <InputGroup className="my-2">
                            <FormControl
                              className='promo_code'
                              name='promoCode'
                              placeholder={t("CouponCodeorGiftCard")}
                              value={promoCode}
                              onChange={(event) => setPromoCode(event.target.value.toUpperCase())}
                            />
                            {promoCodeAmount > 0 ?
                              <Button className='input-group-text fw-normal text-danger' onClick={() => { promoCodeRemovedFun() }}>  {t("Remove")} </Button> :
                              <Button className='input-group-text' onClick={promoCodeFun}> {t("Apply")}</Button>

                            }

                          </InputGroup>
                          {promoCodeErroStatus ? <p className='error text-danger fs-6' >{errorPromo == 'Invalid' ? t('promo_code_error') : errorPromo == 'Expired' ? t('code_is_invalid_or_expired') : t('promo_code_error_mgs')}</p> : ''}
                        </Col>
                        {promoCodeAmount > 0 ?
                          show ?

                            <Col>
                              <Alert variant="success px-2 py-1 mt-2 couponSuccess" onClose={() => setShow(false)} dismissible>
                                <Alert.Heading> <span className='fw-normal fs-6'>{t("CouponCodeApplied")} </span></Alert.Heading>
                              </Alert>
                            </Col> : ''
                          : ''}
                      </Row>
                      {month_array.indexOf(today_date.getMonth()) >= 0 && date_array.indexOf(today_date.getDate()) >= 0 && false ?
                        <Row>
                          <Col style={{ textAlign: 'center' }}>
                            <LazyLoadImage className="py-2" src={`/assets/images/campaign/${cn_iso}_${langName}1.png`} alt="sedarglobal" width="auto" height="auto" />
                          </Col>
                        </Row>
                        // <Row style={{ padding: '0 10px' }}>
                        //   <Col className='congratulations'>
                        //     <h4>{t('Congratulations')}</h4>
                        //     <p>{t('Congratulations_prom_mgs')}</p>
                        //   </Col>
                        // </Row> 
                        : ''}
                      <Row>

                        {totalPriceInfo && totalPriceInfo.SOL_VALUE > 1 ? <TabbyPromoMgs tab_name='cartpageId' amount={totalPriceInfo.SOL_VALUE - promoCodeAmount} /> : ''}
                        {totalPriceInfo && totalPriceInfo.SOL_VALUE > 1 ? <TamaraWidget tab_name='materialId' amount={totalPriceInfo.SOL_VALUE - promoCodeAmount} inline_type="2" /> : ''}
                      </Row>
                      <div className="color-button">
                        <button className={`login-btn ${!props.user_state.isLoggedIn ? 'Checkout_with_Login' : ''}`} type='submit'  ><span className='Checkout_with_Login'>{t("CheckOut")} </span></button>
                      </div>
                      <Row>
                        <Col sm={12} className="term-condition py-3" onClick={() => setTermAndCondition(true)}><p> {t("CheckOutText")} <VscInfo size={18} role="button" /> </p>  </Col>
                        <MyTermsAndContitions
                          show={termAndCondition}
                          onHide={() => setTermAndCondition(false)}
                          checkout_policy={checkoutPolicy}
                        />
                      </Row>
                    </div>
                    <Row>
                      <Col sm={12} className="paymenttext p-4"><p>{t("SecurePayment")} </p> </Col>
                    </Row>
                  </Col>
                  : ''}

                {/* <Col md={7} lg={7} xl={8} xxl={8} className="cartpage_bottom_contact" >


                  <Row className="my-3 ">

                    <Col xl={6} className="contactsupport py-4 flex-shrink-0 ">
                      <div className="media item d-flex  align-items-center">
                        <LazyLoadImage effect="" src={`/assets/images/cart/868516.png`} alt="sedarglobal" />
                        <Col className="media-body flex-grow-1 ms-4">
                          <h6>{t("NeedAssistance")} </h6>
                          <p>{t("Haveanyquestionsabouttheshoppingprocess")} </p>
                        </Col>
                      </div>

                    </Col>
                    <Col xl={6} className="contactnumber py-3 ps-md-5 ltr_text">
                      <p className="ps-4"><span>{t("Call")}</span> <span>:&#x200F; 800-73327</span></p>
                    </Col>

                  </Row>

                </Col> */}
              </Row>
            </form>
          </Container>

          {signupModalShow &&
            <SignupModal signupShow={signupModalShow} SignupOnHide={() => setSignupModalShow(false)} onShowLogin={() => setLoginModalShow(true)} onShowForgotPWD={() => setforgotPwdModalShow(true)} />
          }
          {forgotPwdModalShow &&
            <ForgotPwdModal forgotShow={forgotPwdModalShow} ForgotOnHide={() => setforgotPwdModalShow(false)} onShowLogin={() => setLoginModalShow(true)} onShowSignup={() => setSignupModalShow(true)} />
          }
          {GuestUserFormModalShow &&
            <GuestUserFormModal guestFormShow={GuestUserFormModalShow} guestOnHide={() => setguestUserFormModalShow(false)} onShowLogin={() => setLoginModalShow(true)} />
          }
          {modalShowDetail?.show &&
            <OrderModalShowDetail
              show={modalShowDetail.show}
              onHide={() => setModalShowDetail({ show: false })}
              data={modalShowDetail.itemDetail && modalShowDetail.itemDetail}
            />
          }
          {modalShowroomShow &&
            <ShowRoomPopup
              showroom_show={modalShowroomShow}
              onHide={() => setModalShowroomShow(false)}
              showroom_list={clickCollectList}
              showRoomVal={showRoomVal}
              updateShowRoomAddressFun={updateShowRoomAddressFun}
            />
          }
          {modalRoolPopupShow &&
            <RollCalculationPopup
              roolPopupShow={modalRoolPopupShow}
              onHide={() => setModalRoolPopupShow(false)}
              id={orderId}
              orderInfo={orderList}
            />
          }
          {freeSampleValidation &&
            <FreeSampleValidationPopup
              show={freeSampleValidation}
              onHide={() => setFreeSampleValidation(false)}
            />
          }
        </>
      }

      {loginModalShow &&
        <LoginModal loginShow={loginModalShow} pageName="cartPage" loginOnHide={() => setLoginModalShow(false)} onShowSignup={() => setSignupModalShow(true)} onShowForgotPWD={() => setforgotPwdModalShow(true)} onShowGuest={() => setguestUserFormModalShow(true)} />
      }
    </section>

  );
}

function MyTermsAndContitions(props) {
  const { t } = useTranslation("common")

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t("TermsAndContitions")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="TermsAndContitions">
          <div className="cartPage_term_condition">
            <div className="col-md-12 col-sm-12 col-xs-12">
              {props.checkout_policy && props.checkout_policy.description ? parse(props.checkout_policy.description) : 'asda'}
            </div>
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartPage);