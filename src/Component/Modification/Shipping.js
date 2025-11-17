import React, { useState, useEffect, Suspense } from 'react';
import { Col, Alert, Row } from 'react-bootstrap';
import { connect } from "react-redux";
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import AddressForm from './AddressForm';
import ShippingFormPreLoader from '../../Preloader/ShippingFormPreLoader';

const Shipping = (props) => {

    const { t } = useTranslation('common');
    const router = useRouter();
    const [errorMgs, setErrorMgs] = useState(false);
    const [variant, setVariant] = useState("danger");


    let modification_info = props.user_state && props.user_state.modification_user_info ? props.user_state.modification_user_info : [];

    //  let head_sys_id = props.user_state && props.user_state.modification_user_info && props.user_state.modification_user_info.head_sys_id > 0 ? props.user_state.modification_user_info.head_sys_id : false;


    let shipping_info = props.shippingInfo ? props.shippingInfo : false;
    let header_info = props.headerInfo ? props.headerInfo : false;
    let complete_list = props.complete_list ? props.complete_list : [];
    let shipping_price = header_info && header_info.SOH_SHIP_VALUE ? header_info.SOH_SHIP_VALUE : 0;

    let SOH_PROMO_VALUE = header_info && header_info.SOH_PROMO_VALUE > 0 ? header_info.SOH_PROMO_VALUE : 0;
    let old_cart_value = header_info && header_info.SOH_NET_VALUE_OLD > 0 ? header_info.SOH_NET_VALUE_OLD : 0;
    let tolat_price = props.price_array ? Number(props.price_array.SOL_VALUE) + Number(shipping_price) - Number(SOH_PROMO_VALUE) - Number(old_cart_value) : 0 + Number(shipping_price);
    let soh_carrier_code = header_info && header_info.SOH_CARRIER_CODE ? header_info.SOH_CARRIER_CODE : false
    let shipping_id = header_info && header_info.SOH_CAD_SYS_ID ? header_info.SOH_CAD_SYS_ID : modification_info.SOH_CAD_SYS_ID;


    useEffect(() => {
        let shipping_id = header_info && header_info.SOH_CAD_SYS_ID ? header_info.SOH_CAD_SYS_ID : modification_info.SOH_CAD_SYS_ID;
        if (header_info && header_info.SOH_CARRIER_CODE == 'DO02' && shipping_id > 0) {
            props.updateShippingFun(shipping_id, shipping_price, complete_list, header_info.SOH_CARRIER_CODE);
        }

    }, [soh_carrier_code, shipping_id]);



    if (header_info == false || complete_list.length == 0 || soh_carrier_code == false) {
        return false;
    }

    return (
        <div className='shipping_address'>
            {errorMgs ? (
                <Alert
                    className="api_alert_mgs fs-6"
                    variant={variant}
                    onClose={() => setErrorMgs(false)}
                    dismissible
                >
                    {errorMgs}
                </Alert>
            ) : (
                ""
            )}
            <Row>
                {header_info && soh_carrier_code == 'DO03' ?
                    <Col>
                        <h6 className="plan-type">Showroom Address</h6>
                        <div>
                            <p>{parse(shipping_info.SSA_ADDRESS_DESC)}</p>
                            <p>{shipping_info.SSA_CITY_NAME}, {shipping_info.SSA_SCN_ISO}</p>
                            <p>{shipping_info.SSA_PHONE_NO}</p>
                            <p>{shipping_info.SSA_MANAGER_EMAIL_ID}</p>
                        </div>
                    </Col>
                    :
                    <>
                        <Suspense fallback={<ShippingFormPreLoader />}>
                            {props.formLoad ?
                                <AddressForm addressEdit={shipping_info} header_info={header_info} complete_list={complete_list} orderListFun={props.orderListFun} updateShippingFun={props.updateShippingFun} />
                                : <ShippingFormPreLoader />
                            }
                        </Suspense>
                    </>
                }
            </Row>


        </div >
    )
}
const mapStateToProps = (state) => ({ user_state: state.UserReducer });
const mapDispatchToProps = (dispatch) => {
    return {
        user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Shipping);