import React, { useState, useEffect, useContext, Suspense } from 'react';
import { useRouter } from 'next/router';
import { connect } from "react-redux";
import { useTranslation } from 'next-i18next';
import { RiArrowRightSLine, RiArrowDownSLine } from 'react-icons/ri';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Col, Alert, Row, Form, Button, Accordion, useAccordionButton, Card, Container } from 'react-bootstrap';
import Shipping from './Shipping';
import ApiDataService from '../../services/ApiDataService';
import OrderList from './OrderList';
import { defaultLocale, cn_iso } from '@utils/i18n';
import LinkComponent from '@components/Link';
import Delivery from './Delivery';

const Index = (props) => {

    const { t } = useTranslation('common');
    const router = useRouter();
    let user_info = props.user_state ? props.user_state.user_info : [];
    let slug_url = router.pathname?.split('/')[2];
    let auth_token = props.user_state ? props.user_state.auth_token : '';
    let user_id = props.user_state ? props.user_state.user_id : 0;
    let user_email = props.user_state ? props.user_state.user_email : '';
    let modification_info = props.user_state && props.user_state.modification_user_info ? props.user_state.modification_user_info : [];
    let head_sys_id = modification_info && modification_info.head_sys_id > 0 ? modification_info.head_sys_id : false;

    const [completeList, setCompleteList] = useState([]);
    const [modificationList, setModificationList] = useState([]);
    const [saveLaterOrder, setSaveLaterOrder] = useState([]);
    const [totalPriceInfo, setTotalPriceInfo] = useState(0);
    const [shippingInfo, setShippingInfo] = useState([]);
    const [headerInfo, setHeaderInfo] = useState([]);
    const [paymentLinkInfo, setPaymentLinkInfo] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [formLoad, setFormLoad] = useState(false);

    useEffect(() => {
        props.user_state.isLoggedIn ? orderListFun() : '';
    }, [props.user_state.isLoggedIn]);


    if (user_info.cust_type != 'ADMIN' || user_id == 0 || head_sys_id == false) {
        router.push('/cartPage');
        return false;
    }

    const orderListFun = () => {
        let get_data = {};
        if (user_info && user_info.cust_type == 'ADMIN' && head_sys_id && head_sys_id > 0) {
            get_data = { soh_sys_id: head_sys_id }
        } else {
            router.push('/cartPage');
            return false;
        }
        ApiDataService.getAll("order/orderList", get_data)
            .then(response => {
                let res_data = response.data;
                if (res_data.return_status == 0 && res_data.error_message == 'Success') {

                    let numberCart = res_data.cart_count.QTY > 0 ? res_data.cart_count.QTY : 0;
                    if (numberCart == 0) {
                        router.push('/cartPage');
                    }

                    if (modification_info.SOH_CAD_SYS_ID && res_data.header_info && res_data.header_info.SOH_CARRIER_CODE == 'DO02' && res_data.header_info.SOH_CAD_SYS_ID == null) {
                        updateShippingFun(modification_info.SOH_CAD_SYS_ID, res_data.header_info.SOH_SHIP_VALUE);
                    } else {
                        setFormLoad(true);
                    }
                    setShippingInfo(res_data.shipping_info);
                    setCompleteList(res_data.complete);
                    setModificationList(res_data.modification);
                    setSaveLaterOrder(res_data.save_later);
                    setTotalPriceInfo(res_data.total_price);
                    setHeaderInfo(res_data.header_info);
                    setPaymentLinkInfo(res_data.payment_link_info);
                    setCartCount(numberCart);

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


    const updateShippingFun = (shipping_id, shipping_price, shipment_data = false, delivery_type = false) => {

        if (shipping_id && head_sys_id && user_id) {
            let data = {
                shipping_price: shipping_price,
                shipping_address_id: shipping_id,
                shipment_data: shipment_data,
                delivery_type: delivery_type,
                soh_sys_id: head_sys_id,
                userId: user_id
            };
            ApiDataService.post('shipping/updateShippingPrice', data).then(response => {
                let res_data = response.data;
                console.log(res_data, 'res_data');
                orderListFun();
            }).catch(e => {
                console.log(e.message, e);
                // setErrorMgs(e.message);
                // setVariant('danger');
            });
        } else {
            alert('Shipping Id or userId  are not found');
        }
    }


    if (cartCount == 0) {
        return false;
    }
    return (
        <section className="ShippingPage modification">
            <Container fluid>
                <Row className="fullheight">
                    <Col md={7} lg={6} xxl={7} className="p-0 " style={{ background: '#FAF8F7' }}>
                        <div className="pb-5 shippingoptionalign">
                            <LinkComponent href="/" className="d-none d-md-inline" >
                                <LazyLoadImage effect="" src={`/assets/images/smalllogo.png`} alt="sedarglobal" className="pb-4" width="auto" height="auto" />
                            </LinkComponent>
                            <ShippingMenu headerInfo={headerInfo} {...props} />
                            {router.route == '/modification/shipping' && (<Shipping {...props} shippingInfo={shippingInfo} headerInfo={headerInfo} price_array={totalPriceInfo} complete_list={completeList} orderListFun={orderListFun} updateShippingFun={updateShippingFun} formLoad={formLoad} />)}
                            {router.route == '/modification/delivery' && (<Delivery {...props} shippingInfo={shippingInfo} headerInfo={headerInfo} price_array={totalPriceInfo} complete_list={completeList} orderListFun={orderListFun} updateShippingFun={updateShippingFun} />)}

                        </div>
                    </Col>
                    <Col md={5} lg={6} xxl={5} className="d-none d-md-block p-0">
                        <OrderList modification_list={modificationList} complete_list={completeList} price_array={totalPriceInfo} headerInfo={headerInfo} orderListFun={orderListFun} shippingInfo={shippingInfo} paymentLinkInfo={paymentLinkInfo} />
                    </Col>
                </Row>
            </Container>
        </section>
    )

}

const ShippingMenu = (props) => {

    const router = useRouter();
    let slug_url = router.pathname?.split('/')[2];
    let user_info = props.user_state ? props.user_state.user_info : null;
    const { t } = useTranslation('common');
    let header_info = props.headerInfo ? props.headerInfo : false;


    return (
        <>
            <div className="ShippingMenu pb-5">

                <ul className="list-unstyled d-flex" >
                    <li className={slug_url == 'cartPage' ? 'active' : ''}> <a className="" href={`/${defaultLocale}/modification?head_sys_id=${header_info && header_info.SOH_SYS_ID ? header_info.SOH_SYS_ID : 0}`} > <span className="d-flex align-items-center">  {t("CartInfo")} <RiArrowRightSLine size={22} /> </span></a></li>
                    <li className={slug_url == 'shipping' ? 'active' : ''}> <LinkComponent className="" href={`/modification/shipping?head_sys_id=${header_info.SOH_SYS_ID}`} > <span className="d-flex align-items-center">{t("ShippingInfo")} {header_info && header_info.SOH_CARRIER_CODE == 'DO02' ? <RiArrowRightSLine size={22} /> : ''}</span></LinkComponent></li>
                    {header_info && header_info.SOH_CARRIER_CODE == 'DO02' ?
                        <li className={slug_url == 'delivery' ? 'active' : ''}> <LinkComponent className="" href={`/modification/delivery?head_sys_id=${header_info.SOH_SYS_ID}`} > <span className="d-flex align-items-center">{t("Delivery")} </span></LinkComponent></li>
                        : ''}

                </ul>

            </div>
        </>
    )

}

const mapStateToProps = (state) => ({ user_state: state.UserReducer, menus_state: state.MenusItemReduser });
const mapDispatchToProps = (dispatch) => {
    return {
        user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Index);