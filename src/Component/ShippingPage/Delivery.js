/*
DELIVERY_ONLY=>'DO01',
DELIVERY_WITH_INSTALLATION	=> 'DO02'
CLICK_COLLECT => 'DO03'
ARAMEX_DELIVERY=>'DO04'
*/
import React, { useState, useEffect, useContext, Suspense } from 'react';
import { Col, Container, Row, Tab, Nav, Button, Modal, Form, Alert } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'next-i18next'
import { defaultLocale } from '@utils/i18n';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import GoogleAnalytics from '../../services/GoogleAnalytics';
import ShippingPageSkeleton from '../../Preloader/ShippingPage';
import ApiDataService from '../../services/ApiDataService';
import LaddaButton from 'react-ladda';
import { ShippingContext } from './ShippingPage'
import { updateShippingPrice } from './ShippingReducer';
import { useRouter } from "next/router";
import parse from 'html-react-parser';


const Delivery = (props) => {

    const { t } = useTranslation('common');
    const router = useRouter();

    const [errorMgs, setErrorMgs] = useState();
    const [variant, setVariant] = useState('danger');
    const [shipmentList, setShipmentList] = useState([]);
    const [zonePriceList, setZonePriceList] = useState(false);
    const [loading, setLoading] = useState(true);
    const [countryInfo, setCountryInfo] = useState({});


    const { shipping_state, shippingDispatch } = useContext(ShippingContext);

    let shipping_id = shipping_state.shipping_address.cad_id;
    let shipping_price = shipping_state.shipping_price;

    const getZonePrice = () => {

        console.log(shipping_state?.header_info?.SOH_CARRIER_CODE, 'getZonePrice', shipping_state)

        if (shipping_state && shipping_state.header_info && shipping_state.header_info.SOH_CARRIER_CODE) {

            ApiDataService.getAll('shipping/getZonePrice').then(response => {
                let res_data = response.data;
                if (res_data.return_status == 0 && res_data.error_message == 'Success') {
                    setShipmentList(res_data.shipment_list);
                    setCountryInfo(res_data.country_info);
                    shippingDispatch({ type: 'SHIPMENT-LIST', value: res_data.shipment_list });

                    // shippingDispatch({ type: 'COUNTRY-INFO', value: res_data.country_info });
                    if (shipping_state?.header_info?.SOH_CARRIER_CODE &&
                        shipping_state.header_info.SOH_CARRIER_CODE == 'DO03') {

                        setZonePriceList({
                            DS_DELIVERY_ZONE_FEES: 0,
                            DS_INSTALLATION_ZONE_FEES: 0
                        });
                    } else {
                        setZonePriceList(response.data.shipping_price);
                    }

                } else if (res_data.return_status == 401 && res_data.error_message == 'Invalid Request') {
                    router.push('/cartPage');
                } else if (res_data.return_status == -333) {
                    alert(res_data.error_message);
                    router.push('/shippingAddress');
                } else {
                    setErrorMgs(res_data.error_message);
                    setVariant('danger');
                }
                setTimeout(() => {
                    setLoading(false)
                }, 1000);

            }).catch(e => {
                console.log(e, 'res_data...', e.return_status);
                // props.user_dispatch('LOGOUT_USER');
                // router.push('/cartPage');
                setErrorMgs(e.message);
                setVariant('danger');
                setTimeout(() => {
                    setLoading(false)
                }, 500);
            });
        }
    }
    const deliveryTypeFun = (key, val, shipment_data = false) => {

        if (shipment_data && shipment_data.length > 0) {
            let del_days = shipment_data[0]['DEL_DAYS'];
            let measurement_reqd_val = val == 'DO02' ? shipping_state.measurement_service_info[del_days]['SOL_MEASUREMENT_REQD_YN'] : "N";

            measurementServiceFun(measurement_reqd_val, shipment_data, val);
            // shippingDispatch({ type: 'MEASUREMENT-SERVICE', value: { key: del_days, SOL_CARRIER_CODE: val, SOL_MEASUREMENT_REQD_YN: measurement_reqd_val } });
        }

        if (zonePriceList && zonePriceList.ARAMEX_FEES && zonePriceList.ARAMEX_FEES > 0) {
            let ship_price = zonePriceList.ARAMEX_FEES;
            shippingDispatch({ type: 'SHIPPING-PRICE', value: ship_price });
            if (shipment_data && shipment_data.length > 0) {
                updateShippingPrice(shipping_id, ship_price, shipment_data, 'DO04');
            }
        } else if (['delivery_with_installation'].indexOf(key) >= 0 && val == 'DO02') {
            let ship_price = zonePriceList.DS_INSTALLATION_ZONE_FEES;
            shippingDispatch({ type: 'SHIPPING-PRICE', value: ship_price });
            if (shipment_data && shipment_data.length > 0) {
                updateShippingPrice(shipping_id, ship_price, shipment_data, 'DO02');
            }
        } else if (zonePriceList && val == 'DO01') {
            let ship_price = zonePriceList.DS_DELIVERY_ZONE_FEES;
            shippingDispatch({ type: 'SHIPPING-PRICE', value: zonePriceList.DS_DELIVERY_ZONE_FEES });
            if (shipment_data && shipment_data.length > 0) {
                updateShippingPrice(shipping_id, ship_price, shipment_data, 'DO01');
            }
        } else {
        }

    }

    const measurementServiceFun = (val, shipment_data, carrier_code = false) => {
        let data = { shipment_data: shipment_data, measurement_service: val };

        let del_days = shipment_data[0]['DEL_DAYS'];

        let carrier_code_val = carrier_code ? carrier_code : shipping_state.measurement_service_info[del_days]['SOL_CARRIER_CODE']

        shippingDispatch({ type: 'MEASUREMENT-SERVICE', value: { key: del_days, SOL_CARRIER_CODE: carrier_code_val, SOL_MEASUREMENT_REQD_YN: val } });

        ApiDataService.post('shipping/measurementService', data).then(response => {
            let res_data = response.data;
            console.log(res_data);

        }).catch((e) => {
            setErrorMgs(e.message);
            setVariant('danger');
        });
    }


    const paymentPageFun = () => {
        if (shipping_state?.header_info?.SOH_CARRIER_CODE == 'DO03') {
            router.push('payment');
        } else {
            let data = { shipping_price: shipping_price, shipping_address_id: shipping_id };
            ApiDataService.post('shipping/updateShippingPrice', data).then(response => {
                let res_data = response.data;
                if (res_data.return_status == "0" && res_data.error_message == 'Success') {
                    // setErrorMgs(res_data.error_message);
                    // setVariant('success');
                    router.push('payment');
                } else {
                    setErrorMgs(res_data.error_message);
                    setVariant('danger');
                }
            }).catch(e => {
                console.log(e.message, e);
                setErrorMgs(e.message);
                setVariant('danger');
            });
        }
    }

    useEffect(() => {
        setTimeout(() => {
            getZonePrice();
        }, 500);

        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [shipping_state.order_list.length, shipping_state.order_list]);

    useEffect(() => {

        if (zonePriceList && zonePriceList.ARAMEX_FEES && zonePriceList.ARAMEX_FEES > 0) {
            deliveryTypeFun('delivery_only', 'DO04')
        }
        zonePriceList && Object.keys(shipmentList) && Object.keys(shipmentList).map((delivery_days, i) => {
            if (zonePriceList && shipmentList[delivery_days].delivery_with_installation && shipmentList[delivery_days].delivery_with_installation.length > 0) {
                deliveryTypeFun('delivery_with_installation', 'DO02');
            } else if (zonePriceList && shipmentList[delivery_days].delivery_only && shipmentList[delivery_days].delivery_only.length > 0) {
                deliveryTypeFun('delivery_only', 'DO01');
            } else {
            }
        })

    }, [shipmentList, zonePriceList])

    useEffect(() => {
        setTimeout(() => {
            GoogleAnalytics.deliverInfo(shipping_state.header_info, shipping_state.order_list);
        }, 1000);
    }, []);

    return (
        <section className='delivery_page'>
            <Suspense fallback={<ShippingPageSkeleton />}>
                {loading ? <ShippingPageSkeleton /> : (
                    <>
                        {zonePriceList && Object.keys(shipmentList) && Object.keys(shipmentList).map((delivery_days, i) => {
                            let business_day = 1;

                            if (delivery_days > 1 && delivery_days < 5) {
                                business_day = delivery_days - 1;
                            } else if (delivery_days >= 5) {
                                business_day = delivery_days - 2;
                            } else {
                                business_day = delivery_days;
                            }

                            let measurement_days = shipping_state.measurement_service_info && countryInfo.SCN_MEASUREMENT_DAYS && shipping_state.measurement_service_info[delivery_days] && shipping_state.measurement_service_info[delivery_days] && shipping_state.measurement_service_info[delivery_days]['SOL_MEASUREMENT_REQD_YN'] == 'Y' ? parseInt(countryInfo.SCN_MEASUREMENT_DAYS) : 0;

                            return (
                                <Row className="delivery" key={i}>
                                    <p className='shipment_section'> {t('Shipment', { shipment_no: i + 1 })}</p>

                                    {shipmentList[delivery_days] && Object.keys(shipmentList[delivery_days]).map((shipment_type, j) => {
                                        return (
                                            <Row key={j}>
                                                {shipmentList[delivery_days][shipment_type] && shipmentList[delivery_days][shipment_type].length > 0 && shipmentList[delivery_days][shipment_type].map((data, index) => {
                                                    return (
                                                        <Col md={3} key={index}>
                                                            <div className="media item d-flex">
                                                                <LazyLoadImage className="me-3 mt-2" src={data.SOL_IMAGE_PATH ? data.IMAGE_PATH + data.SOL_IMAGE_PATH : `/assets/images/profile/MaskGroup4322.png`} alt={data.SFP_TITLE} width="auto" height="auto" />
                                                            </div>
                                                        </Col>
                                                    )

                                                })}
                                                {shipping_state?.header_info?.SOH_CARRIER_CODE != 'DO03' &&
                                                    <DeliverInfo shipment_type={shipment_type} index={j} shipment_data={shipmentList[delivery_days][shipment_type]} zonePriceList={zonePriceList} deliveryTypeFun={deliveryTypeFun} delivery_days={delivery_days} measurementServiceFun={measurementServiceFun} measurement_days={countryInfo.SCN_MEASUREMENT_DAYS} />
                                                }
                                            </Row>
                                        )
                                    })}


                                    <p className='pt-2'>
                                        <LazyLoadImage src={`/assets/images/cart/mover-truck.png`} alt="Mover truck" className="me-3" width="auto" height="auto" />
                                        <span> {t('Plannedshipping', { business_day: parseInt(business_day) + parseInt(measurement_days), delivery_days: parseInt(delivery_days) + parseInt(measurement_days) })}</span>
                                    </p>

                                    {['SAR', 'BHD', 'QAR'].indexOf(shipping_state.header_info.SOH_CCY_CODE) >= 0 ? <p className='pt-2 holiday_cls'>{t('additional_holidays', { days: 7 })}</p> : new Date() >= new Date('2025-06-02') ? <p className='pt-2 holiday_cls'>{t('additional_holidays', { days: 3 })}</p> : ''}

                                    {countryInfo && countryInfo.SCN_DEL_PROMPT_MSG_YN == 'Y' && countryInfo.SCN_DEL_PROMPT_MSG ? <p className='pt-2 holiday_cls'>{parse(countryInfo.SCN_DEL_PROMPT_MSG)}</p> : ''}
                                </Row>
                            )
                        })}
                        {zonePriceList && Object.keys(shipmentList) && shipping_state.order_list && shipping_state.order_list.length > 0 ?
                            <Row className='continue_btn'>
                                <Col xs={12} className="pt-5 text-end">
                                    <LaddaButton onClick={() => { paymentPageFun() }} className="bg-sg-primary text-dark py-3 px-3" disabled={shipping_state.shipping_address && shipping_state.shipping_address.cad_id ? false : shipping_state?.header_info?.SOH_CARRIER_CODE == 'DO03' ? false : true}>{t('Continue_to_payment')}</LaddaButton>
                                </Col>
                            </Row>
                            : shipping_state.order_list && shipping_state.order_list.length > 0 ? <OutOfCoverageArea /> : ''
                        }
                    </>
                )}
            </Suspense>
        </section>
    )

}


const DeliverInfo = (props) => {

    const { t } = useTranslation('common');

    const { shipping_state } = useContext(ShippingContext);
    let shipment_list = props.shipment_data;

    let shipment_type = props.shipment_type ? props.shipment_type : 'delivery';
    let delivery_days = props.delivery_days ? props.delivery_days : 'non';

    if (shipment_list[0] == undefined) {
        return false;
    }

    return (
        <Row className="ordercol pt-2">

            {shipment_list[0].SOL_CARRIER_CODE != 'DO04' ?
                <Col md={4} className="my-2">
                    <Form.Check
                        type='radio'
                        name={shipment_type + delivery_days}
                        value='DO01'
                        label={t('Delivery')}
                        defaultChecked={shipment_list[0].SOL_CARRIER_CODE == 'DO01' ? true : false}
                        onChange={() => props.deliveryTypeFun(shipment_type, 'DO01', shipment_list)}
                        id={`${shipment_type + delivery_days}DO01`}
                    />
                </Col> : ''}

            {shipment_list[0].SOL_CARRIER_CODE == 'DO04' ?
                <Col md={4} className="my-2">
                    <Form.Check
                        type='radio'
                        name={shipment_type + delivery_days}
                        value='DO04'
                        label={t('Aramex_Delivery')}
                        defaultChecked={shipment_list[0].SOL_CARRIER_CODE == 'DO04' ? true : false}
                        onChange={() => props.deliveryTypeFun(shipment_type, 'DO04', shipment_list)}
                        id={`${shipment_type + delivery_days}DO04`}
                    />
                </Col>
                : ''}

            <Col md={8} className="my-2">
                <Form.Check
                    disabled={['delivery_with_installation'].indexOf(shipment_type) == -1 ? true : false}
                    type='radio'
                    name={shipment_type + delivery_days}
                    value='DO02'
                    label={t('Delivery_With_Installation')}
                    defaultChecked={shipment_list[0].SOL_CARRIER_CODE == 'DO02' ? true : false}
                    onChange={() => props.deliveryTypeFun(shipment_type, 'DO02', props.shipment_data)}
                    id={`${shipment_type + delivery_days}DO02`}
                />
                {['delivery_with_installation'].indexOf(shipment_type) == -1 ?
                    <p className='inst_not_aval'>{t('Installation_not_available')}</p>
                    : ''}
            </Col>

            {shipping_state.measurement_service_info && shipment_type == 'delivery_with_installation' && shipping_state.measurement_service_info[delivery_days]['SOL_CARRIER_CODE'] == 'DO02' ?
                <MeasurementService shipment={delivery_days} shipment_data={props.shipment_data} measurementServiceFun={props.measurementServiceFun} measurement_days={props.measurement_days} />
                : ''
            }
        </Row >
    )
}
const MeasurementService = (props) => {

    const { t } = useTranslation('common');
    let shipment = props.shipment ? props.shipment : 0;
    let shipment_list = props.shipment_data;
    const { shipping_state } = useContext(ShippingContext);

    let delivery_days = shipment_list[0]['DEL_DAYS'];
    let measurement_reqd_yn = shipping_state.measurement_service_info && shipping_state.measurement_service_info[delivery_days] ? shipping_state.measurement_service_info[delivery_days]['SOL_MEASUREMENT_REQD_YN'] : 'N';

    return (
        <Row>
            <p>{t('Free_Measurement_service')}</p>
            <p style={{ opacity: 0.5, fontSize: '13px' }}>({t('Additional_days', { 'days': props.measurement_days })})</p>
            <hr></hr>

            <Col md={6} className="my-2">
                <Form.Check
                    type='radio'
                    name={'measuremen_service_' + shipment}
                    value='N'
                    label={t('No_sizes_are_confirmed')}
                    defaultChecked={measurement_reqd_yn == 'N' ? true : false}
                    onChange={() => props.measurementServiceFun('N', props.shipment_data)}
                    id="measuremen_service_N"
                />
            </Col>
            <Col md={6} className="my-2">
                <Form.Check
                    type='radio'
                    name={'measuremen_service_' + shipment}
                    value='Y'
                    label={t('Yes_confirmation_needed')}
                    defaultChecked={measurement_reqd_yn == 'Y' ? true : false}
                    onChange={() => props.measurementServiceFun('Y', props.shipment_data)}
                    id="measuremen_service_Y"
                />
            </Col>
            <Col>
                {measurement_reqd_yn == 'Y' ?
                    <p className='pt-0 holiday_cls' style={{ fontSize: '14px', padding: 0 }}>
                        {t('Yes_confirmation_message')}
                    </p>
                    :
                    <p className='pt-0 holiday_cls' style={{ fontSize: '14px', padding: 0 }}>
                        {t('No_sizes_are_confirmed_message')}
                    </p>
                }
            </Col>
        </Row>

    )
}



const OutOfCoverageArea = () => {
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation('common');
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, []);
    return (
        <Suspense fallback={<ShippingPageSkeleton />}>
            {loading ? <ShippingPageSkeleton /> : (
                <Row>
                    <Col sm={12} className="text-center">
                        <div className="">
                            <LazyLoadImage src={`/assets/images/Error/OutofCoverageArea.png`} alt="shippinp" width="90px" height="auto" />
                            <div className="my-5">
                                <h2> {t('out_of_coverage')} </h2>
                                <p className="my-2"> {t('out_of_coverage_mgs')}   </p>
                            </div>
                            <Col sm={10} md={4} lg={3} className="mx-auto">
                                <a href={`/${defaultLocale}/cartPage`} type="button" className="btn btn-Primary bg-sg-primary py-3 py-sm-2 my-4 w-sm-25 w-100 fw-bold">{t('Back')} </a>
                            </Col>
                        </div>
                    </Col>
                </Row>)
            }
        </Suspense>
    )
}

export default Delivery;