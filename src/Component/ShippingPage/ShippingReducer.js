import { Component } from 'react';
import ApiDataService from '../../services/ApiDataService';
import cookies from 'js-cookie'

var validation = {};


function ShippingReducer(state, action) {
    validation = {};
    switch (action.type) {

        case 'ORDER-LIST':
            state.order_list = action.value;
            break;
        case 'USER-SHIPPING-LIST':
            state.user_shipping_list = action.value;
            break;
        case 'SHIPMENT-LIST':
            state.shipment_list = action.value;

            action.value && Object.keys(action.value) && Object.keys(action.value).map((val, i) => {
                if (action.value[val] && action.value[val]['delivery_with_installation'] && action.value[val]['delivery_with_installation'][0]['SOL_MEASUREMENT_REQD_YN'])
                    state.measurement_service_info[val] = {
                        'SOL_CARRIER_CODE': action.value[val]['delivery_with_installation'][0]['SOL_CARRIER_CODE'],
                        'SOL_MEASUREMENT_REQD_YN': action.value[val]['delivery_with_installation'][0]['SOL_MEASUREMENT_REQD_YN'],
                    };
                //state.measurement_service_info[val]['SOL_MEASUREMENT_REQD_YN'] = action.value[val]['delivery_with_installation'][0]['SOL_MEASUREMENT_REQD_YN'];
            })

            break;
        case 'SHIPPING-PRICE':
            state.shipping_price = action.value;
            break;
        case 'SHIPPING-ADDRESS-INFO':
            if (action.value.cad_id != state.shipping_address.cad_id && action.value.cad_id) {
                defaultAddress(action.value.cad_id);
                updateShippingPrice(action.value.cad_id, state.shipping_price);
            }
            state.shipping_address = action.value;
            break;
        case 'TOTAL-PRICE':
            state.price_array = action.value;
            break;
        case 'HEADER-INFO':
            state.header_info = action.value;
        //  state.shipping_price = action.value && action.value.SOH_SHIP_VALUE ? action.value.SOH_SHIP_VALUE : 0
        case 'SHIPPING-ERROR':
            state.error_mgs = action.value;
            state.error_status = true;
            break;
        case 'SFI-STATUS-VAL':
            state.sfi_status_val = action.value;
            break;
        case 'MEASUREMENT-SERVICE':
            console.log(action.value, 'shipping_state11', state.measurement_service_info[action.value.key]);
            state.measurement_service_info[action.value.key]['SOL_CARRIER_CODE'] = action.value.SOL_CARRIER_CODE;
            state.measurement_service_info[action.value.key]['SOL_MEASUREMENT_REQD_YN'] = action.value.SOL_MEASUREMENT_REQD_YN;

            break;
        default:

    }
    return { ...state };
}

const updateShippingPrice = (shipping_id, shipping_price, shipment_data = false, delivery_type = false) => {

    if (shipping_id) {
        let data = { shipping_price: shipping_price, shipping_address_id: shipping_id, shipment_data: shipment_data, delivery_type: delivery_type };
        ApiDataService.post('shipping/updateShippingPrice', data).then(response => {
            let res_data = response.data;
            //
            if (res_data.return_status == "0" && res_data.error_message == 'Success') {
                //  shippingDispatch({ type: 'SHIPPING-PRICE', value: res_data.shipping_price });
                //console.log(res_data.error_message);

                // setErrorMgs(res_data.error_message);
                // setVariant('success');
            } else {
                //console.log(res_data.error_message);
                // setErrorMgs(res_data.error_message);
                // setVariant('danger');
            }
        }).catch(e => {
            console.log(e.message, e);
            // setErrorMgs(e.message);
            // setVariant('danger');
        });
    } else {
    }
}
const defaultAddress = (id) => {

    let user_id = cookies.get('USER_ID');
    let user_email = cookies.get('USER_EMAIL');
    let auth_token = cookies.get('AUTH_TOKEN');

    ApiDataService.post(`dashboard/default_address_update/${id}/${user_id}`, { cust_user_id: user_email, auth_token: auth_token, cad_default_yn: 'Y' }).then(response => {
        //  console.log(response.data.result);
    }).catch(e => {
        console.log(e.message, e);
    });
}
const promoCodeFun = (promoCode) => {

    ApiDataService.getAll('order/promoCodeFun/' + promoCode).then(response => {
        let res_data = response.data;
        if (res_data.return_status == 0 && res_data.error_message == 'Success' && res_data.result.OFFER_AMOUNT > 0) {
            // console.log(res_data, 'res_data..');
            setPromoCodeAmount(res_data.result.OFFER_AMOUNT);
            document.querySelector(".promo_code").classList.remove('delivery_error');
            setPromoCodeErroStatus(false);

            setShow(true)
        } else {
            setPromoCodeAmount(0)
            setErrorMgs(res_data.error_message);
            setVariant('danger');
            //console.log(res_data, 'res_data..');
            document.querySelector(".promo_code").classList.add('delivery_error');
            setPromoCodeErroStatus(true);
            setShow(false)

        }
    }).catch((e) => {
        setErrorMgs(e.message);
        setVariant('danger');
    });

}


export { ShippingReducer, updateShippingPrice, promoCodeFun };