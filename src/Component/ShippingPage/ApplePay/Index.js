import React, { useEffect, useState, useContext } from 'react';
import parse from 'html-react-parser';
import ApiDataService from '../../../services/ApiDataService';
import { ShippingContext } from "../ShippingPage";
import { useTranslation } from 'next-i18next'
import { defaultLocale, cn_iso } from '@utils/i18n';
import GoogleAnalytics from '../../../services/GoogleAnalytics';
const site_id = process.env.NEXT_PUBLIC_SITE_ID; //100001;
const merchantIdentifier = 'merchant.com.sedarglobal.com';
const PRODUCTION_DISPLAYNAME = 'Sedarglobal';
import { useRouter } from "next/router";
const debug = true;

const Index = (props) => {
    const { t } = useTranslation('common');
    const site = localStorage.getItem('siteDetail');
    let ccy_code = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_ccy_code ? JSON.parse(site).show_ccy_code : '';
    const router = useRouter();

    const [applePayId, setApplePayID] = useState(false);
    const [gotNotactiveId, setGotNotactiveId] = useState(false);
    const [notgot, setNotgot] = useState(false);
    const [success, setSuccess] = useState(false);

    const { shipping_state } = useContext(ShippingContext);

    useEffect(() => {

        if (shipping_state.price_array && Number(shipping_state.price_array.SOL_GROSS_VALUE) > 0) {
            if (window.ApplePaySession) {
                var promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
                promise.then(function (canMakePayments) {
                    if (canMakePayments) {
                        setApplePayID(true);
                    } else {
                        setGotNotactiveId(true);
                    }
                });
            } else {
                // return false;
                setNotgot(true);
            }
        }

    }, [shipping_state.price_array]);

    if (cn_iso == '' || ccy_code == '') {
        return false;
    }





    const aplePayFun = () => {

        let tolat_price = shipping_state.price_array ? Number(shipping_state.price_array.SOL_GROSS_VALUE) + Number(shipping_state.shipping_price) : 0 + Number(shipping_state.shipping_price);
        let shipping_price = Number(shipping_state.shipping_price) > 0 ? shipping_state.shipping_price : 0;
        let carrier_code = shipping_state.header_info.SOH_CARRIER_CODE;
        let shipping_address = shipping_state.shipping_address;
        let shippingContact_info = {};
        let SOH_SYS_ID = shipping_state.header_info.SOH_SYS_ID;
        GoogleAnalytics.addPaymentInfo(shipping_state.header_info, shipping_state.order_list, 'ApplePay');

        if (carrier_code == 'DO03') {
            shippingContact_info = {
                addressLines: [shipping_address.SSA_ADDRESS_TITLE],
                locality: shipping_address.SSA_CITY_NAME,
                phoneNumber: shipping_address.SSA_PHONE_NO,
                emailAddress: shipping_address.SSA_MANAGER_EMAIL_ID,
                countryCode: shipping_address.SSA_SCN_ISO,
                familyName: t('Showroom'),
            };
        } else {
            shippingContact_info = {
                addressLines: [shipping_address.cad_city_area_desc + ' ' + shipping_address.cad_city_desc + ' ' + shipping_address.cad_state_desc],
                phoneNumber: shipping_address.cad_phone_number,
                locality: shipping_address.cad_nearest_landmark,
                postalCode: shipping_address.cad_postal_code,
                countryCode: shipping_address.cad_country,
                familyName: shipping_address.cad_first_name + ' ' + shipping_address.cad_last_name
            };
        }

        const paymentRequest = {
            currencyCode: ccy_code,
            countryCode: cn_iso,
            merchantCapabilities: ['supports3DS', 'supportsEMV', 'supportsCredit', 'supportsDebit'],
            supportedNetworks: ["visa", "masterCard", "mada"],
            shippingType: carrier_code == 'DO03' ? "storePickup" : 'delivery',

            // Set the required shipping contact fields to display the pickup address.
            requiredShippingContactFields: [
                "postalAddress"
            ],
            shippingContact: shippingContact_info,
            onshippingcontactselected: {
                label: 'Standard Shipping',
                amount: 85,
                detail: '3-5 days',
            },
            total: {
                label: PRODUCTION_DISPLAYNAME,
                type: "final",
                amount: tolat_price
            }
        };

        // var session = new ApplePaySession(3, paymentRequest);
        var session = new window.ApplePaySession(3, paymentRequest);


        session.onvalidatemerchant = function (event) {
            //console.log(event.validationURL, 'event.validationURL');
            ApiDataService.getAll("payment/appleCertification", { cert_url: event.validationURL, host: window.location.host })
                .then(response => {
                    let res_data = response.data;
                    //console.log(response, res_data, 'performValidation');
                    session.completeMerchantValidation(res_data);
                }).catch(e => {
                    console.log(e);
                    session.abort();
                });
        }


        /*   session.onpaymentauthorized = function (event) {
               var promise = sendPaymentToken(event.payment.token);
               promise.then(function (success) {
                   var status;
                   if (success) {
                       console.log(success, event);
                       status = ApplePaySession.STATUS_SUCCESS;
                       setApplePayID(false);
                       //setSuccess(true);
                       //   setTimeout(function () {
                         //     router.push("/" + defaultLocale + "/payment/success?orderId=" + SOH_SYS_ID);
                           //   window.location.reload(false);
                         // }, 500)
                   } else {
                       status = ApplePaySession.STATUS_FAILURE;
                   }
   
                   //console.log("result of sendPaymentToken() function =  " + success, status,event);
                   session.completePayment(status);
               });
           }*/


        session.onpaymentauthorized = function (event) {
            let paymentToken = event.payment.token;
            var status;
            let input_post_data = { ...paymentToken, payment_type: 'APPLE_PAY' };
            ApiDataService.post("payment/applePay", input_post_data)
                .then(response => {
                    let res_data = response.data;
                    let fort_status = res_data.fort_data.status;
                    let fort_message = res_data.fort_data.response_message;
                    //console.log(res_data, 'response');
                    if (res_data.fort_data && (fort_status == '14' || fort_status == '02')) {
                        status = ApplePaySession.STATUS_SUCCESS;
                        setApplePayID(false);
                        setTimeout(function () {
                            router.push("/" + defaultLocale + "/payment/success?orderId=" + SOH_SYS_ID + '&mgs=' + fort_message);
                            window.location.reload(false);
                        }, 500);
                    } else {
                        status = ApplePaySession.STATUS_FAILURE;
                        setTimeout(function () {
                            router.push("/" + defaultLocale + "/payment/error?orderId=" + SOH_SYS_ID + '&mgs=' + fort_message);
                            window.location.reload(false);
                        }, 500);
                    }
                    session.completePayment(status);

                }).catch(e => {
                    console.log(e);
                    status = ApplePaySession.STATUS_FAILURE;
                    session.completePayment(status);
                })
            //console.log("result of sendPaymentToken() function =  " + success, status, event);
        }


        session.oncancel = function (event) {
            //console.log(event);
        }

        session.begin();

    };




    return (
        <div className='applePaySection'>
            {applePayId ? <button type="button" id='applePay' onClick={() => aplePayFun()}></button> : ''}
            {gotNotactiveId ? 'Add Wallet & Apple Pay in device or Clear browser cache' : ''}
            {/* {notgot ? 'ApplePay is not available on this browser' : ''} */}
            {success ? parse('Test transaction completed, thanks. <a href="">reset</a>') : ''}
        </div>
    )
}

export default Index;