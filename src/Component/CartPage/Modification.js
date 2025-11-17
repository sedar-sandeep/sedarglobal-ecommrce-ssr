import LinkComponent from '@components/Link';
import { useTranslation } from 'next-i18next';
import React, { useState, useEffect } from 'react';
import { Col, Container, Row, ButtonGroup, Button, FormControl, Breadcrumb, Form, InputGroup, Modal, Alert, FloatingLabel } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { cn_iso, langName } from '@utils/i18n';
import RollCalculationPopup from './RollCalculationPopup';
import OrderModalShowDetail from './OrderModalShowDetail';
import { confirmAlert } from 'react-confirm-alert'; // Import

const Modification = (props) => {
    const { t } = useTranslation("common");
    const [modalRoolPopupShow, setModalRoolPopupShow] = useState(false);
    const [orderId, setOrderId] = useState(0);
    const [modalShowDetail, setModalShowDetail] = useState({ show: false, itemDetail: '' });
    let n = 0


    const orderDelete = (sol_sys_id) => {

        confirmAlert({
            // title: 'Confirm to submit',
            message: t("Areyousureremove"),
            buttons: [
                {
                    label: t("Yes"),
                    onClick: () => {
                        props.updateLineTable(sol_sys_id, 'CART_STATUS', 'DELETE')
                    }
                },
                {
                    label: t("No")
                    //  onClick: () => alert('Click No')
                }
            ]
        });

    }

    return (
        <>
            {props.modification_list && props.modification_list.length > 0 ?
                <Row className="modification_list m-0">
                    <h3 className="my-4 pb-3"> {t("modification_list")} </h3>
                    {props.modification_list && props.modification_list.map((data, index) => {
                        n++;
                        return (
                            <Col sm={12} key={index} className="mb-4 item_cart_detail">
                                {n == 1 ?
                                    <div className="orderheader d-none d-xl-block">
                                        <Row>
                                            <Col sm={6}> <p>{t("Product")} </p> </Col>
                                            <Col sm={2} > <p>{t("Price")} </p> </Col>
                                            <Col sm={2}><p>{t("Quantity")}</p></Col>
                                            <Col sm={2}><p>{t("Total")} </p></Col>
                                        </Row>
                                    </div>
                                    : ''}
                                <div className="ordercol">
                                    <Row>
                                        <Col xl={6} className="py-3 py-xl-2 item_description">
                                            <div className="media item d-flex">
                                                <span className="text-secondary p-1">{index > 9 ? index : '0' + (index + 1)}</span>
                                                <LazyLoadImage className="px-1 px-xl-2 w-25" src={data.SOL_IMAGE_PATH ? data.SOL_IMAGE_PATH : `/assets/images/profile/MaskGroup4322.png`} alt="sedarglobal" width="auto" height="auto" />
                                                <Col className="media-body ps-3">
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

                                                    <div>
                                                        {data.SOL_ITEM_LABEL != 'ADD_TO_CART' && data.brand_info ? <LinkComponent className="modifiaction_option" href={`${data.SPI_CATEGORY}/${data.SPI_SUB_CATEGORY}/${data.SPI_LINK_URL}/${data.brand_info.SII_CODE}/customize/edit/` + data.SOL_SYS_ID} >{t("Editoptions")} </LinkComponent> : ''}
                                                    </div>
                                                </Col>
                                            </div>
                                        </Col>
                                        <Col xs={6} xl={2} className="py-3 py-xl-2 item_price">
                                            <div className="price">
                                                <p>{t(data.SOL_CCY_CODE)} {data.SOL_PRICE}</p>
                                            </div>
                                        </Col>
                                        <Col xs={6} xl={2} className="py-3 py-xl-2 item_quantity">
                                            <div className="quantity mb-0 mb-xl-3" >
                                                <div className="quantitycount">
                                                    {data.SOL_ITEM_LABEL == 'SAMPLE' ? data.SOL_QTY :
                                                        <ButtonGroup aria-label="Basic example">
                                                            <Button variant="light" onClick={() => props.updateLineQTY(data.SOL_SYS_ID, data.SOL_QTY, 'MINUS')} >-</Button>
                                                            <FormControl
                                                                type="text"
                                                                value={data.SOL_QTY}
                                                                onChange={(event) => console.log(event)}
                                                                className="rounded-0"
                                                            />

                                                            <Button variant="light" onClick={() => props.updateLineQTY(data.SOL_SYS_ID, data.SOL_QTY, 'PLUS')} >+</Button>
                                                        </ButtonGroup>
                                                    }
                                                </div>

                                            </div>
                                        </Col>
                                        <Col xl={2} className="py-xl-2 d-none d-xl-block item_price_total">
                                            <div className="price total ">
                                                <p>{t(data.SOL_CCY_CODE)} {data.SOL_VALUE} </p>
                                            </div>
                                        </Col>

                                    </Row>
                                    <span className="removeitem position-absolute top-0 end-0 me-3 mt-1" onClick={() => { orderDelete(data.SOL_SYS_ID) }}>✕</span>
                                </div>

                            </Col>

                        )

                    })
                    }
                    <RollCalculationPopup
                        roolPopupShow={modalRoolPopupShow}
                        onHide={() => setModalRoolPopupShow(false)}
                        id={orderId}
                        orderInfo={props.modification_list}
                    />
                    <OrderModalShowDetail
                        show={modalShowDetail.show}
                        onHide={() => setModalShowDetail({ show: false })}
                        data={modalShowDetail.itemDetail && modalShowDetail.itemDetail}
                    />
                </Row>
                : null}


        </>
    )
}

export default Modification;