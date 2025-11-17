import LinkComponent from '@components/Link';
import { da } from 'date-fns/locale';
import { useTranslation } from 'next-i18next';
import React, { useState, useEffect } from 'react';
import { Col, Row, ButtonGroup, Button, FormControl, InputGroup, Alert, confirm } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const stock_validation = ['NOT_ACTIVE', 'OUTOFSTOCK'];

const SaveForLater = (props) => {
    const { t } = useTranslation("common");

    let n = 0

    return (
        <>
            {props.save_for_later && props.save_for_later.length > 0 ?
                <Row className="savedForLater m-0">
                    <h3 className="my-4 pb-3"> {props.save_for_later ? t("Savedforlater") + ' ' + props.save_for_later.length : 0} {t("items")} </h3>
                    {props.save_for_later && props.save_for_later.map((data, index) => {
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
                                                    {data.info_data && data.info_data['MATERIAL_SELECTION'] ? <h6>{t("ItemCode")}  : <span>{data.info_data['MATERIAL_SELECTION']['ITEM_ID']}</span></h6> : ''}
                                                    {data.SOL_WIDTH > 0 && data.SOL_HEIGHT > 0 ? <h6>{t("Dim")}   : <span>{data.SOL_WIDTH ? data.SOL_WIDTH : 0}<span className='px-1'>x</span>{data.SOL_HEIGHT ? data.SOL_HEIGHT : 0} {t("cmcart")}</span></h6> : ''}
                                                    {data.info_data && data.info_data['CONTROL_TYPE'] ? <h6>{t('CONTROL_TYPE')} : <span>{data.info_data['CONTROL_TYPE']['SPS_DESC']}</span></h6> : ''}
                                                    {data.info_data && data.info_data['MOUNTING_OPTION'] ? <h6>{t('MOUNTING_OPTION')} : <span>{data.info_data['MOUNTING_OPTION']['SPS_DESC']}</span></h6> : ''}
                                                    {data.SOL_ITEM_LABEL == "SAMPLE" ?
                                                        <div>
                                                            <span className="fw-normal text-9e6493"> {t('free_sample')}</span>
                                                        </div>
                                                        : ''
                                                    }

                                                    <div className='edit_save'>
                                                        {stock_validation.indexOf(data.SFI_STATUS_NEW) == -1 ?
                                                            <>
                                                                {data.SOL_ITEM_LABEL == "QUICK_BUY" ? (
                                                                    <span>
                                                                        <LinkComponent className="editoption" to={`${data.SPI_CATEGORY}/${data.SPI_SUB_CATEGORY}/${data.SPI_LINK_URL}/${data.brand_info ? data.brand_info.SII_ITEM_ID : ''}/${data.SOL_SYS_ID}/customize`} >{t("Editoptions")} </LinkComponent>
                                                                    </span>
                                                                ) : data.SOL_ITEM_LABEL == "ADD_TO_CART" ? ('') : (
                                                                    <span>
                                                                        <LinkComponent className="editoption" to={`${data.SPI_CATEGORY}/${data.SPI_SUB_CATEGORY}/${data.SPI_LINK_URL}/customize/edit/` + data.SOL_SYS_ID} >{t("Editoptions")} </LinkComponent>
                                                                    </span>
                                                                )
                                                                }
                                                            </> : ''}

                                                        <span>
                                                            <span className="savelater" to="cartPage" onClick={() => props.updateLineTable(data.SOL_SYS_ID, 'CART_STATUS', 'COMPLETED')} >
                                                                {t("move_to_cart")}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </Col>
                                            </div>
                                        </Col>
                                        <Col xs={6} xl={2} className="py-3 py-xl-2 item_price">
                                            <div className="price d-none d-xl-block">
                                                <p>{t(data.SOL_CCY_CODE)} {data.SOL_PRICE}</p>
                                            </div>
                                            <div className='col-sm-1 d-block d-sm-none price'>
                                                <p>{t(data.SOL_CCY_CODE)} {data.SOL_VALUE}</p>
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
                                </div>
                            </Col>
                        )
                    })
                    }
                </Row>
                : null}
        </>
    )
}

export default SaveForLater;