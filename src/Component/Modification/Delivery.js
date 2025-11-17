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
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ShippingPageSkeleton from '../../Preloader/ShippingPage';
import ApiDataService from '../../services/ApiDataService';
import LaddaButton from 'react-ladda';
import { useRouter } from "next/router";
import { langName, cn_iso } from '@utils/i18n';

const Delivery = (props) => {

    const { t } = useTranslation('common');
    const router = useRouter();

    const [errorMgs, setErrorMgs] = useState();
    const [variant, setVariant] = useState('danger');
    const [shipmentList, setShipmentList] = useState([]);
    const [zonePriceList, setZonePriceList] = useState(false);
    const [shipping_price, setShipping_price] = useState(0);
    const [loading, setLoading] = useState(true);
    let shipping_address = props.shippingInfo ? props.shippingInfo : [];
    let order_list = props.complete_list ? props.complete_list : [];

    let head_sys_id = props.user_state && props.user_state.modification_user_info && props.user_state.modification_user_info.head_sys_id > 0 ? props.user_state.modification_user_info.head_sys_id : false;


    let shipping_id = shipping_address.cad_id;


    const getZonePrice = () => {

        ApiDataService.getAll('shipping/getZonePrice', { soh_sys_id: head_sys_id }).then(response => {
            let res_data = response.data;
            if (res_data.return_status == 0 && res_data.error_message == 'Success') {
                setShipmentList(res_data.shipment_list)
                //   shippingDispatch({ type: 'SHIPMENT-LIST', value: res_data.shipment_list });
                setZonePriceList(response.data.shipping_price);
            } else if (res_data.return_status == 401 && res_data.error_message == 'Invalid Request') {
                console.log(res_data.error_message, 'Error');
                router.push('/modification?head_sys_id=' + head_sys_id);
            } else if (res_data.return_status == -333) {
                alert(res_data.error_message);
                // router.push('/shippingAddress');
            } else {
                setErrorMgs(res_data.error_message);
                setVariant('danger');
                //console.log(res_data.error_message, 'Error...');
            }
            setTimeout(() => {
                setLoading(false)
            }, 1000);

        }).catch(e => {
            console.log(e, 'res_data...', e.return_status);
            // props.user_dispatch('LOGOUT_USER');
            router.push('/modification?head_sys_id=' + head_sys_id);
            setErrorMgs(e.message);
            setVariant('danger');
            setTimeout(() => {
                setLoading(false)
            }, 500);
        });
    }
    const deliveryTypeFun = (key, val, shipment_data = false) => {

        if (zonePriceList && zonePriceList.ARAMEX_FEES && zonePriceList.ARAMEX_FEES > 0) {
            let ship_price = zonePriceList.ARAMEX_FEES;
            setShipping_price(ship_price);
            console.log(ship_price, 'ARAMEX_FEES', shipment_data);
            // props.updateShippingFun(shipping_id, ship_price, shipment_data, 'DO04');
            // shippingDispatch({ type: 'SHIPPING-PRICE', value: ship_price });
            if (shipment_data && shipment_data.length > 0) {
                console.log(ship_price, 'ARAMEX_FEES11', shipment_data);
                props.updateShippingFun(shipping_id, ship_price, shipment_data, 'DO04');
            }
        } else if (['delivery_with_installation'].indexOf(key) >= 0 && val == 'DO02') {
            let ship_price = zonePriceList.DS_INSTALLATION_ZONE_FEES;
            console.log(ship_price, 'DS_INSTALLATION_ZONE_FEES');
            setShipping_price(ship_price);
            // shippingDispatch({ type: 'SHIPPING-PRICE', value: ship_price });
            if (shipment_data && shipment_data.length > 0) {
                props.updateShippingFun(shipping_id, ship_price, shipment_data, 'DO02');
            }
        } else if (zonePriceList && val == 'DO01') {
            let ship_price = zonePriceList.DS_DELIVERY_ZONE_FEES;
            console.log(ship_price, 'DS_DELIVERY_ZONE_FEES');
            setShipping_price(ship_price);
            //   shippingDispatch({ type: 'SHIPPING-PRICE', value: zonePriceList.DS_DELIVERY_ZONE_FEES });
            if (shipment_data && shipment_data.length > 0) {
                props.updateShippingFun(shipping_id, ship_price, shipment_data, 'DO01');
            }
        } else {
        }

    }

    useEffect(() => {
        getZonePrice();
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [order_list.length, order_list]);

    useEffect(() => {
        setTimeout(() => {
            props.updateShippingFun(shipping_id, shipping_price);
        }, 100);
    }, [shipping_price]);

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
                                                <DeliverInfo shipment_type={shipment_type} index={j} shipment_data={shipmentList[delivery_days][shipment_type]} zonePriceList={zonePriceList} deliveryTypeFun={deliveryTypeFun} delivery_days={delivery_days} />
                                            </Row>
                                        )
                                    })}

                                    <p className='pt-2'>
                                        <LazyLoadImage src={`/assets/images/cart/mover-truck.png`} alt="Mover truck" className="me-3" width="auto" height="auto" />
                                        <span> {t('Plannedshipping', { business_day: business_day, delivery_days: delivery_days })}</span>
                                    </p>
                                </Row>
                            )
                        })}
                        {zonePriceList && Object.keys(shipmentList) && order_list && order_list.length > 0 ?
                            <a className="btn" type="button" href={`/${defaultLocale}/modification/shipping?head_sys_id=${head_sys_id}`} style={{ marginTop: '15px', background: '#000', color: '#fff', padding: '10px 42px' }}>
                                <span>{t("Back")}</span>
                            </a>
                            : <OutOfCoverageArea {...props} />}
                    </>
                )}
            </Suspense>
        </section>
    )

}


const DeliverInfo = (props) => {
    const { t } = useTranslation('common');

    let shipment_list = props.shipment_data;

    let shipment_type = props.shipment_type ? props.shipment_type : 'delivery';
    let delivery_days = props.delivery_days ? props.delivery_days : 'non';

    if (shipment_list[0] == undefined) {
        return false;
    }

    return (
        <Row className="ordercol pt-2">

            {shipment_list[0].SOL_CARRIER_CODE != 'DO04' ?
                <Col md={3} className="my-2">
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


        </Row >
    )
}


const OutOfCoverageArea = (props) => {
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation('common');
    let head_sys_id = props.user_state && props.user_state.modification_user_info && props.user_state.modification_user_info.head_sys_id > 0 ? props.user_state.modification_user_info.head_sys_id : false;

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
                                <a href={`/${defaultLocale}/modification/shipping?head_sys_id=${head_sys_id}`} type="button" className="btn btn-Primary bg-sg-primary py-3 py-sm-2 my-4 w-sm-25 w-100 fw-bold">{t('Back')}</a>
                            </Col>
                        </div>
                    </Col>
                </Row>)
            }
        </Suspense>
    )
}

export default Delivery;