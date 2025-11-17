import React, { useState, useEffect, Suspense } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PaymentPageSkeleton from '../../Preloader/PaymentPageSkeleton';
import ApiDataService from '../../services/ApiDataService';
import { connect } from "react-redux";
import CurrencyFormat from '../../services/CurrencyFormat';
import GoogleAnalytics from '../../services/GoogleAnalytics';
import SnapPixel from '../../services/SnapPixel';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next'
import { defaultLocale, cn_iso } from '@utils/i18n';

import Cookies from "js-cookie";

const TamaraPaymentAuthorise = (props) => {
    const site = Cookies.get('siteDetail');
    let decimalPoints = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_decimals >= 0 ? parseInt(JSON.parse(site).show_decimals) : 2;

    //let decimalPoints = 2;

    const [variant, setVariant] = useState('danger');
    const [headerInfo, setHeaderInfo] = useState();
    const [errorMgs, setErrorMgs] = useState();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { t } = useTranslation('common');
    let user_email = props.user_state ? props.user_state.user_email : '';

    let order_id = router.query.order_sys_id;
    let payment_order_id = router.query.orderId;

    const paymentCapture = (payment_order_id) => {

        ApiDataService.getAll("payment/tamaraPaymentAuthorise/" + payment_order_id)
            .then(response => {
                let res_data = response.data;
                //  console.log(res_data, 'res_data..');

                if (res_data.return_status == '0') {
                    router.push("/" + defaultLocale + "/payment/success?payment_method=Tamara&orderId=" + order_id);
                } else {
                    setErrorMgs(res_data.error_message);
                    setVariant('danger');
                }
                orderInfoFun(order_id);
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
        paymentCapture(payment_order_id);

    }, []);

    return (
        <section className="PaymentSuccess">
            <Suspense fallback={<PaymentPageSkeleton />}>
                {loading ? <PaymentPageSkeleton /> :
                    <Container>
                        <Row>
                            {errorMgs ? <PaymentError errorMgs={errorMgs} {...props} /> :
                                <Col sm={12} className="text-center">
                                    <div className="my-5 py-5">
                                        <LazyLoadImage src={`/assets/images/Error/Group25787.png`} alt="1" className="my-4" width="auto" height="auto" />
                                        <h2 className="my-2" > {t('OrderSuccessfullyPlaced')} </h2>
                                        <p className="my-4">{t('Youwillreceiveanemailconfirmationto')} <span className="fw-bold"> {user_email}</span></p>
                                        <p className="my-4"> <b>{t('weather_conditions')} </b></p>
                                        <div className="paymentdetail">
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
                                            <p className="py-2"> <span> {t('PaymentMethod')} :</span>  <span>Tamara</span> </p>
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


const PaymentError = (props) => {

    const router = useRouter();
    const { t } = useTranslation('common');
    let user_email = props.user_state ? props.user_state.user_email : '';
    let mgs = props.errorMgs ? props.errorMgs : router.query.mgs;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
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

const mapStateToProps = (state) => ({ user_state: state.UserReducer, menus_state: state.MenusItemReduser });
const mapDispatchToProps = (dispatch) => {
    return {
        user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TamaraPaymentAuthorise);