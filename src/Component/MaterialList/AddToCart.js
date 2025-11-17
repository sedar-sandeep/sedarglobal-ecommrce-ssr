import ApiDataService from '../../services/ApiDataService';
// import { t_lang } from '../../services/i18n';
import GoogleAnalytics from '../../services/GoogleAnalytics';
import SnapPixel from '../../services/SnapPixel';

const addToCartFun = (props, reduxDispatch, t) => {
    const { data, cartItems, ContactUs, ...restProps } = props;
    props.setLoader(true)
    ApiDataService.post('order/cart', restProps).then(response => {
        let res_data = response.data;
        console.log(res_data, 'res_data.complete.length')
        if (res_data.return_status == 0 && res_data.error_message == 'Success') {
            GoogleAnalytics.addToCart(props);
            SnapPixel.addToCart(props);

            if (res_data.complete.length > 0) {
                reduxDispatch({
                    type: 'FETCH_TO_CART',
                    payload: {
                        cartItems: res_data.complete,
                        numberCart: res_data.cart_count.QTY > 0 ? res_data.cart_count.QTY : 0,
                        countFreeSample: parseInt(res_data.countFreeSample)
                    },
                });

                reduxDispatch({
                    type: 'CART_ADD_LISTING',
                    payload: {
                        latest: props

                    },
                });
            }
            let message = {
                message_type: t('Success'),
                // message: data.SFP_TITLE + ' ' + t_lang('is_added_to_cart'),is added to cart.
                message: t('is_added_to_cart', { product_name: props.SFP_TITLE }),
                variant: 'success',
                position: 'top-end',
                show: true
            };

            reduxDispatch({
                type: "ALERT_MESSAGE",
                message
            });
            data.user_dispatch('CARTBOX');
        } else {
            alert(res_data.error_message);
        }
        props.setLoader(false)
    }).catch(e => {
        console.log(e);
        props.setLoader(false);
    });
}


const updateLineTable = (data, reduxDispatch, t) => {

    ApiDataService.post('order/cart/updateLineTable/' + data.cart_sys_id, { 'line_type': data.cart_method, 'line_value': data.cart_qty }).then(response => {
        let res_data = response.data;

        if (res_data.return_status == 0 && res_data.error_message == 'Success') {

            data[data.code] = data.cart_qty;

            reduxDispatch({
                type: 'UDPATE_LISTING',
                payload: {
                    cartItems1: data

                },
            });
            reduxDispatch({
                type: 'FETCH_TO_CART',
                payload: {
                    cartItems: res_data.complete,
                    numberCart: res_data.cart_count.QTY > 0 ? res_data.cart_count.QTY : 0,
                    countFreeSample: parseInt(res_data.countFreeSample)
                },
            });

            let message = {
                message_type: t('Success'),
                // message: data.SFP_TITLE + ' ' + t_lang('is_added_to_cart'),is added to cart.
                message: t('is_added_to_cart', { product_name: data.SFP_TITLE }),
                variant: 'success',
                position: 'top-end',
                show: true
            };

            reduxDispatch({
                type: "ALERT_MESSAGE",
                message
            });

            data.user_dispatch('CARTBOX');

        } else {
            let message = {
                message_type: t('Error'),
                // message_type: 'Error',
                variant: 'error',
                position: 'top-end',
                show: true
            };
            reduxDispatch({
                type: "ALERT_MESSAGE",
                message
            });

        }
    }).catch((e) => {


        let message = {
            message_type: t('Error'),
            message: e.message,
            variant: 'error',
            position: 'top-end',
            show: true
        };


        reduxDispatch({
            type: "ALERT_MESSAGE",
            message
        });

    });
}


export { addToCartFun, updateLineTable };