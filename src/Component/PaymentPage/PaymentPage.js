import React, { useState, useEffect, Suspense } from 'react';
import { connect } from "react-redux";
import { Col, Alert, Row, Form, Accordion, Card, Button, InputGroup, FormControl, FloatingLabel, Container } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PaymentPageSkeleton from '../../Preloader/PaymentPageSkeleton';
import ApiDataService from '../../services/ApiDataService';
import CurrencyFormat from '../../services/CurrencyFormat';
import { useDispatch } from "react-redux";
import { admitadOrderedItem, ReTagThankYouPage, admitadInvoice, getSourceCookie } from '../../Admitad/AdmitadIndex';
import GoogleAnalytics from '../../services/GoogleAnalytics';
import SnapPixel from '../../services/SnapPixel';
import TamaraPaymentAuthorise from './TamaraPaymentAuthorise';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next'
import { defaultLocale, cn_iso } from '@utils/i18n';
import Cookies from "js-cookie";
import store from "store-js";

const PaymentPage = (props) => {

    const dispatch = useDispatch();
    const [errorMgs, setErrorMgs] = useState(false);
    const [variant, setVariant] = useState('danger');
    const router = useRouter();
    const { t } = useTranslation('common');

    let page_name = router.query ? router.query.page_name : '';

    const orderListFun = () => {
        ApiDataService.getAll("order/orderList")
            .then(response => {
                let res_data = response.data;
                console.log(res_data, 'res_data...');
                if (res_data.return_status == 0 && res_data.error_message == 'Success') {
                    dispatch({
                        type: 'FETCH_TO_CART',
                        payload: {
                            cartItems: res_data.complete,
                            numberCart: res_data.cart_count.QTY > 0 ? res_data.cart_count.QTY : 0,
                            countFreeSample: res_data.countFreeSample ? parseInt(res_data.countFreeSample) : 0
                        },
                    });
                    /*  if(page_name=='error' && res_dataheader_info){
  
                      }*/
                } else {
                    setErrorMgs(res_data.error_message);
                    setVariant('danger');
                }
            }).catch(e => {
                console.log(e);
                setErrorMgs(e.message);
                setVariant('danger');
            });
    }

    useEffect(() => {
        orderListFun();
    }, []);

    return (
        <section className="ShippingPage">
            {errorMgs ? <Alert className="api_alert_mgs fs-6" variant={variant} onClose={() => setErrorMgs(false)} dismissible>
                {errorMgs}
            </Alert> : ''}
            {page_name == 'error' && (<PaymentError {...props} />)}
            {page_name == 'success' && (<PaymentSuccess {...props} />)}
            {page_name == 'sample' && (<PaymentSuccess {...props} />)}
            {page_name == 'capture' && (<PaymentCapture {...props} />)}
            {page_name == 'tamaraPayentAuthorise' && (<TamaraPaymentAuthorise />)}
            {page_name == 'pointsPay' && (<PaymentPointsPay {...props} />)}
            {page_name == 'modification' && (<ModificationSuccess {...props} />)}
        </section>
    )
}
const PaymentError = (props) => {
    const router = useRouter();
    const { t } = useTranslation('common');
    let mgs = props.errorMgs ? props.errorMgs : router.query.mgs;
    const [loading, setLoading] = useState(true);
    //let user_email = props.user_state ? props.user_state.user_email : '';
    let status_code = router.query.status ? router.query.status : '';
    let order_id = router.query.orderId;

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        if (['02', '14', '18'].indexOf(status_code) >= 0) {
            router.push(`/payment/success?orderId=${order_id}&mgs=${mgs}&status=${status_code}`);
        }
    }, []);


    return (
        <section className="PaymentError">
            <Suspense fallback={<PaymentPageSkeleton />}>
                {loading ? <PaymentPageSkeleton /> :
                    <div>
                        <Container>
                            <Row>
                                <Col sm={12} className="text-center">
                                    <div className="my-5 py-5">
                                        <LazyLoadImage src={`/assets/images/Error/Group24659.png`} alt="1" className="my-4" width="auto" height="auto" />
                                        <h2 className="my-2" > {t('PaymentFailed')} </h2>
                                        <p className="my-4"><b>
                                            {mgs ? mgs : t('Pleasecheckyourinternetconnection')}
                                        </b></p>
                                        <Col sm={10} md={4} lg={3} className="mx-auto">
                                            <a href={`/${defaultLocale}/cartPage`} type="button" className="btn btn-Primary bg-sg-primary py-3 py-sm-4 my-4 w-sm-25 w-100 fw-bold">{t('Back')} </a>
                                        </Col>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                }
            </Suspense>
        </section>
    )
}
const PaymentCapture = (props) => {
    const site = Cookies.get('siteDetail');
    let decimalPoints = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_decimals >= 0 ? parseInt(JSON.parse(site).show_decimals) : 2;


    const { t } = useTranslation('common');
    const [variant, setVariant] = useState('danger');
    const [headerInfo, setHeaderInfo] = useState();
    const [errorMgs, setErrorMgs] = useState();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    let user_email = props.user_state ? props.user_state.user_email : '';
    let order_id = router.query.orderId;
    let payment_id = router.query.payment_id;

    const paymentCapture = (payment_id) => {

        ApiDataService.getAll("payment/paymentCapture/" + payment_id)
            .then(response => {
                let res_data = response.data;
                if (res_data.curl_response && res_data.httpCode == 200 && res_data.curl_response.status != 'error') {
                    retrievePayment(payment_id);
                } else if (res_data.curl_response && res_data.curl_response.status == 'error' && res_data.curl_response.error) {
                    setErrorMgs(res_data.curl_response.error);
                    setVariant('danger');
                } else {
                    if (res_data.return_status == '333') {
                        router.push("/" + defaultLocale + "/payment/success?payment_method=Tabby&orderId=" + order_id);
                    } else {
                        setErrorMgs(res_data.error_message);
                        setVariant('danger');
                    }

                }
                orderInfoFun(order_id);
            }).catch(e => {
                console.log(e);
                setErrorMgs(e.message);
                setVariant('danger');
            });
    }
    const retrievePayment = () => {
        ApiDataService.getAll("payment/retrievePayment/" + payment_id)
            .then(response => {
                let res_data = response.data;
                if (res_data.httpCode == 200 && res_data.curl_response.status != 'error') {
                    router.push("/" + defaultLocale + "/payment/success?payment_method=Tabby&orderId=" + order_id);
                } else if (res_data.curl_response.status == 'error' && res_data.curl_response.error) {
                    setErrorMgs(res_data.curl_response.error);
                    setVariant('danger');
                } else {
                    setErrorMgs(res_data.error_message);
                    setVariant('danger');
                }
            }).catch(e => {
                console.log(e);
                setErrorMgs(e.message);
                setVariant('danger');
            });
    }
    const orderInfoFun = (order_id) => {
        ApiDataService.getAll("recipt/singleOrder/" + order_id)
            .then(response => {
                let res_data = response.data;
                if (res_data.return_status == 0 && res_data.error_message == 'Success') {
                    setHeaderInfo(res_data.header_result);
                    let order_list = res_data.line_result;

                    GoogleAnalytics.purchase(res_data.header_result, order_list, props.user_state);
                    SnapPixel.purchase(res_data.header_result, order_list, props?.user_state?.user_info);

                } else {
                    setErrorMgs(res_data.error_message);
                    setVariant('danger');
                }
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            }).catch(e => {
                console.log(e);
                setErrorMgs(e.message);
                setVariant('danger');
            });
    }
    useEffect(() => {
        paymentCapture(payment_id);

    }, []);

    return (
        <section className="PaymentSuccess">
            <Suspense fallback={<PaymentPageSkeleton />}>
                {loading ? <PaymentPageSkeleton /> :
                    <Container>
                        <Row>
                            {errorMgs ? <PaymentError errorMgs={errorMgs} /> :
                                <Col sm={12} className="text-center">
                                    <div className="my-5 py-5">
                                        <LazyLoadImage src={`/assets/images/Error/Group25787.png`} alt="1" className="my-4" width="auto" height="auto" />
                                        <h2 className="my-2" > {t('OrderSuccessfullyPlaced')} </h2>
                                        <p className="my-4">{t('Youwillreceiveanemailconfirmationto')} <span className="fw-bold"> {user_email}</span></p>
                                        <div className="paymentdetail">
                                            <p className="py-2"> <span> {t('OrderNo')} : <b>{headerInfo ? headerInfo.SOH_TXN_NO : ''} </b></span></p>
                                            <p className="py-2"> <span> {t('Ordertotal')} : </span>
                                                {/* <span>{headerInfo ? headerInfo.SOH_CCY_CODE : ''}  </span> */}

                                                <CurrencyFormat
                                                    value={headerInfo ? headerInfo.SOH_NET_VALUE : 0}
                                                    displayType="text"
                                                    decimalScale={decimalPoints}
                                                    fixedDecimalScale={decimalPoints > 0 ? true : false}
                                                    isNumericString={decimalPoints > 0 ? false : true}
                                                />
                                            </p>
                                            <p className="py-2"> <span> {t('PaymentMethod')} :</span>  <span>Tabby</span> </p>
                                        </div>
                                        <Col sm={10} md={4} lg={3} className="mx-auto">
                                            <a href={`/${defaultLocale}/`} type="button" className="btn btn-Primary bg-sg-primary py-3 py-sm-4 my-4 w-sm-25 w-100 fw-bold">{t('ContinueShopping')} </a>
                                        </Col>
                                    </div>
                                </Col>
                            }
                        </Row>
                    </Container>
                }
            </Suspense>
        </section>
    )
}
const PaymentSuccess = (props) => {

    const site = Cookies.get('siteDetail');
    let decimalPoints = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_decimals >= 0 ? parseInt(JSON.parse(site).show_decimals) : 2;
    let user_state = props.user_state;
    const [variant, setVariant] = useState('danger');
    const [headerInfo, setHeaderInfo] = useState();
    const [errorMgs, setErrorMgs] = useState();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { t } = useTranslation('common');
    let order_id = router.query.orderId;
    let payment_method = router.query.payment_method;
    let user_email = user_state ? user_state.user_email : '';
    let tagtag_uid = store.get('tagtag_uid');
    let source_enquiry = getSourceCookie();

    const orderInfoFun = (order_id) => {
        ApiDataService.getAll("recipt/singleOrder/" + order_id, { source_enquiry: source_enquiry, tagtag_uid: tagtag_uid })
            .then(response => {
                let res_data = response.data;
                if (res_data.return_status == 0 && res_data.error_message == 'Success') {
                    setHeaderInfo(res_data.header_result);

                    let order_list = res_data.line_result;


                    GoogleAnalytics.purchase(res_data.header_result, order_list, user_state);
                    SnapPixel.purchase(res_data.header_result, order_list, props?.user_state?.user_info);

                    var ad_products = [];
                    window.orderedItem = [];//temporary array for product items for Admitad 
                    order_list.forEach((item) => {
                        //   console.log(item, index);
                        //  admitadOrderedItem(item);//ADMITAD Order add
                        ad_products.push({ "id": item.brand_info.SII_CODE, "number": item.SOL_QTY });
                    })

                    /*   if (res_data.header_result && res_data.header_result.SOH_TXN_NO) {
                           setTimeout(function () {
                               admitadInvoice(res_data.header_result, user_email)//ADMITAD.Invoice
   
                               ReTagThankYouPage(res_data.header_result.SOH_TXN_NO, res_data.header_result.SOH_NET_VALUE, ad_products)
   
                           }, 1500)
                       }*/


                } else {
                    setErrorMgs(res_data.error_message);
                    setVariant('danger');
                }
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            }).catch(e => {
                setLoading(false);
                console.log(e);
                setErrorMgs(e.message);
                setVariant('danger');
            });
    }


    useEffect(() => {
        orderInfoFun(order_id);
    }, []);

    return (
        <section className="PaymentSuccess">
            <Suspense fallback={<PaymentPageSkeleton />}>
                {loading ? <PaymentPageSkeleton /> :
                    <Container>
                        <Row>
                            <Col sm={12} className="text-center">
                                <div className="my-5 py-5">
                                    <LazyLoadImage src={`/assets/images/Error/Group25787.png`} alt="1" className="my-4" width="auto" height="auto" />
                                    <h2 className="my-2" > {t('OrderSuccessfullyPlaced')} </h2>

                                    <p className="my-4">{t('Youwillreceiveanemailconfirmationto')} <span className="fw-bold"> {headerInfo && headerInfo.USER_EMAIL_ID ? headerInfo.USER_EMAIL_ID : user_email}</span></p>
                                    <div className="paymentdetail">
                                        <p className="py-2"> <span> {t('OrderNo')} : <b>{headerInfo ? headerInfo.SOH_TXN_NO : ''} </b></span></p>
                                        <p className="py-2"> <span> {t('Ordertotal')} : </span>
                                            <CurrencyFormat
                                                value={headerInfo ? headerInfo.SOH_NET_VALUE : 0}
                                                displayType="text"
                                                thousandSeparator={true}
                                                decimalScale={decimalPoints}
                                                fixedDecimalScale={decimalPoints > 0 ? true : false}
                                                isNumericString={decimalPoints > 0 ? false : true}
                                            />
                                        </p>
                                        {headerInfo && headerInfo.SOH_NET_VALUE > 0 ? <p className="py-2"> <span>{t('PaymentMethod')} </span> : <span>{payment_method == 'PointsPay' ? 'Etihad GuestPay' : payment_method}</span> </p> : ''}
                                    </div>

                                    <Col sm={10} md={4} lg={3} className="mx-auto">
                                        <a href={`/${defaultLocale}/`} type="button" className="btn btn-Primary bg-sg-primary py-3 py-sm-4 my-4 w-sm-25 w-100 fw-bold">{t('ContinueShopping')} </a>
                                    </Col>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                }
            </Suspense>
        </section>
    )
}
const PaymentPointsPay = (props) => {

    const site = Cookies.get('siteDetail');
    let decimalPoints = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_decimals >= 0 ? parseInt(JSON.parse(site).show_decimals) : 2;
    const { t } = useTranslation('common');
    const [variant, setVariant] = useState('danger');
    const [headerInfo, setHeaderInfo] = useState();
    const [errorMgs, setErrorMgs] = useState();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    let order_id = router.query?.order;
    let payment_id = router.query?.guid;
    let pointpay_msg = router.query?.msg;
    let pointpay_status = router.query?.status;
    let user_id = router.query?.user_id;
    let user_email = props.user_state ? props.user_state.user_email : '';

    console.log(payment_id, router.query, 'payment_id');

    const paymentCapture = (payment_id) => {

        ApiDataService.post("payment/pointsPayAuthorise/" + payment_id, { user_id: user_id })
            .then(response => {
                let res_data = response.data;
                console.log(res_data, 'res_data');
                if (res_data.return_status == '0') {
                    router.push("/" + defaultLocale + "/payment/success?payment_method=PointsPay&orderId=" + order_id);
                } else {
                    setErrorMgs(res_data.error_message);
                    setVariant('danger');
                }
                order_id ? orderInfoFun(order_id) : '';
            }).catch(e => {
                console.log(e);
                setErrorMgs(e.message);
                setVariant('danger');
            });
    }

    const orderInfoFun = (order_id) => {
        ApiDataService.getAll("recipt/singleOrder/" + order_id)
            .then(response => {
                let res_data = response.data;
                if (res_data.return_status == 0 && res_data.error_message == 'Success') {
                    setHeaderInfo(res_data.header_result);
                    let order_list = res_data.line_result;

                    GoogleAnalytics.purchase(res_data.header_result, order_list, props?.user_state?.user_info);
                    SnapPixel.purchase(res_data.header_result, order_list, props.user_state);
                } else {
                    setErrorMgs(res_data.error_message);
                    setVariant('danger');
                }
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            }).catch(e => {
                console.log(e);
                setErrorMgs(e.message);
                setVariant('danger');
            });
    }
    useEffect(() => {
        paymentCapture(payment_id);

        if (pointpay_status != 'SUCCESS') {
            setErrorMgs(pointpay_msg);
        }
    }, []);

    return (
        <section className="PaymentSuccess">
            <Suspense fallback={<PaymentPageSkeleton />}>
                {loading ? <PaymentPageSkeleton /> :
                    <Container>
                        <Row>
                            {errorMgs ? <PaymentError errorMgs={errorMgs} /> :
                                <Col sm={12} className="text-center">
                                    <div className="my-5 py-5">
                                        <LazyLoadImage src={`/assets/images/Error/Group25787.png`} alt="1" className="my-4" />
                                        <h2 className="my-2" > {t('OrderSuccessfullyPlaced')} </h2>
                                        <p className="my-4">{t('Youwillreceiveanemailconfirmationto')} <span className="fw-bold"> {user_email}</span></p>
                                        <p className="my-4"> <b>{t('weather_conditions')} </b></p>
                                        <div className="paymentdetail">
                                            <p className="py-2"> <span> {t('OrderNo')} : <b>{headerInfo ? headerInfo.SOH_TXN_NO : ''} </b></span></p>
                                            <p className="py-2"> <span> {t('Ordertotal')} : </span>
                                                <CurrencyFormat
                                                    value={headerInfo ? headerInfo.SOH_NET_VALUE : 0}
                                                    displayType="text"
                                                    decimalScale={decimalPoints}
                                                    fixedDecimalScale={decimalPoints > 0 ? true : false}
                                                    isNumericString={decimalPoints > 0 ? false : true}
                                                />
                                            </p>
                                            <p className="py-2"> <span> {t('PaymentMethod')} :</span>  <span> Etihad GuestPay</span> </p>
                                        </div>
                                        <Col sm={10} md={4} lg={3} className="mx-auto">
                                            <a href={`/${defaultLocale}/`} type="button" className="btn btn-Primary bg-sg-primary py-3 py-sm-4 my-4 w-sm-25 w-100 fw-bold">{t('ContinueShopping')} </a>
                                        </Col>
                                    </div>
                                </Col>
                            }
                        </Row>
                    </Container>
                }
            </Suspense>
        </section>
    )
}

const ModificationSuccess = (props) => {
    const { t } = useTranslation('common');
    const [loading, setLoading] = useState(false);


    return (
        <section className="PaymentSuccess">
            <Suspense fallback={<PaymentPageSkeleton />}>
                {loading ? <PaymentPageSkeleton /> :
                    <Container>
                        <Row>
                            <Col sm={12} className="text-center">
                                <div className="my-5 py-5">
                                    <LazyLoadImage src={`/assets/images/Error/Group25787.png`} alt="1" className="my-4" width="auto" height="auto" />
                                    <h2 className="my-2" > {t('OrderSuccessfullyPlaced')} </h2>
                                    <Col sm={10} md={4} lg={3} className="mx-auto">
                                        <a href={`/${defaultLocale}/`} type="button" className="btn btn-Primary bg-sg-primary py-3 py-sm-4 my-4 w-sm-25 w-100 fw-bold">{t('ContinueShopping')} </a>
                                    </Col>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                }
            </Suspense>
        </section>
    )
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer, menus_state: state.MenusItemReduser });
const mapDispatchToProps = (dispatch) => {
    return {
        user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);