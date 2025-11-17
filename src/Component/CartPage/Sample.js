import React, { useState } from 'react';
import { Col, Row, ButtonGroup } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { VscInfo } from 'react-icons/vsc';
import { useTranslation } from 'next-i18next';

const InfoLink = (props) => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <VscInfo size={12} role="button" />
            {/* <InfoPopup show={modalShow} onHide={() => setModalShow(false)} {...props}/> */}
        </>
    )
}

const Sample = (props) => {
    const { t } = useTranslation("common");

    let data = props.sample_data;
    return (
        <>
            <Row className="sample m-0">
                {/* <h3 className="my-4 pb-3"> {props.save_for_later ? 'Saved for later (' + props.save_for_later.length + ')' : 0} items</h3> */}
                <Col sm={12} className="mb-4 pt-3 item_cart_detail">
                    <div className="ordercol">
                        <Row>
                            <Col xl={6} className="py-3 py-xl-2 item_description">
                                <div className="media item d-flex">
                                    <span className="text-secondary p-1">{props.index > 9 ? props.index : '0' + (props.index + 1)}</span>
                                    <LazyLoadImage className="px-1 px-xl-2 w-25" src={data.SOL_IMAGE_PATH ? data.SOL_IMAGE_PATH : `/assets/images/profile/MaskGroup4322.png`} alt="sedarglobal" width="auto" height="auto" />
                                    <Col className="media-body  ps-3 edit_save">
                                        <p>{data.SFP_TITLE}</p>
                                        {/* {data.info_data && data.info_data['MATERIAL_SELECTION'] ? <h6>{t("ItemCode")} : <span>{data.info_data['MATERIAL_SELECTION']['ITEM_ID']}</span></h6> : ''} */}
                                        {data.brand_info && data.brand_info['SII_BR_DESC'] ? <h6>{t("Brand")}  : <span>{data.brand_info['SII_BR_DESC']}</span></h6> : ''}
                                        {data.brand_info && data.brand_info['SII_ITEM_ID'] ? <h6>{t("ItemCode")}  : <span>{data.brand_info['SII_ITEM_ID']}</span></h6> : ''}
                                        <h6>{t("Dim")} : <span>{data.SOL_WIDTH ? data.SOL_WIDTH : 0}<span className='px-1'>x</span>{data.SOL_HEIGHT ? data.SOL_HEIGHT : 0} {t("cmcart")} </span></h6>
                                        <div>
                                            <span className="fw-normal text-9e6493"> {t('free_sample')}</span>
                                        </div>

                                        <div className="savelater" to="cartPage" onClick={() => props.updateLineTable(data.SOL_SYS_ID, 'CART_STATUS', data.SOL_CART_STATUS == 'COMPLETED' ? 'SAVE_LATER' : 'COMPLETED')} >
                                            {data.SOL_CART_STATUS == 'COMPLETED' ? t("save_for_later") : t("move_to_cart")}
                                        </div>
                                        <span className="removeitem position-absolute top-0 end-0 me-3 mt-1" onClick={() => { props.orderDelete(data, 'SAMPLE') }}>✕</span>
                                    </Col>
                                </div>
                            </Col>
                         
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Sample;