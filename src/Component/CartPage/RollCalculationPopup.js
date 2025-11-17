import React from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import parse from 'html-react-parser';
import { useTranslation } from 'next-i18next';

const RollCalculationPopup = (props) => {
    const { t } = useTranslation("common");

    return (
        <Modal
            {...props}
            show={props.roolPopupShow ? true : false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {props.orderInfo && props.orderInfo.length > 0 && props.orderInfo.map((data, index) => {
                return (
                    <React.Fragment key={index}>
                        {data.SOL_SYS_ID == props.id ? <>
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    {/* {props.orderInfo[props.id.]} */}
                                    <h2 className="py-2">{data.PRODUCT_DESC}</h2>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="OrderModalShowDetail py-4 px-2">
                                    <Row>
                                        <Col sm={5}>

                                            <LazyLoadImage className="p-3 w-100 " src={data.SOL_IMAGE_PATH ? data.SOL_IMAGE_PATH : `/assets/images/profile/MaskGroup4322.png`} alt="sedarglobal" width="auto" height="auto" />
                                        </Col>
                                        <Col sm={7}>
                                            <p className='pb-3'>
                                                {data.info_data && data.info_data['ROLL_CALCULATION'] ? <h6>{t("ItemCode")} : <span>{data.info_data['ROLL_CALCULATION']['ITEM_ID']}</span></h6> : ''}
                                                {data.SOL_WIDTH > 0 && data.SOL_HEIGHT > 0 ? <h6>{t("Dim")}   :<span>{data.SOL_WIDTH ? data.SOL_WIDTH : 0}<span className='px-1'>x</span>{data.SOL_HEIGHT ? data.SOL_HEIGHT : 0} {t("cmcart")}</span></h6> : ''}
                                            </p>
                                            <p>{parse(t('recommended_mgs', { roll: data.ROLL_CALC }))}</p>
                                        </Col>
                                    </Row>
                                </div>
                                {/* <h6>Fabric : <span>Beige / Natural</span></h6> */}
                            </Modal.Body>
                        </> : null}
                    </React.Fragment>
                )
            })}

            {/* <Modal.Footer>
                <Button className="bg-sg-primary" onClick={props.onHide}>{t("Close")} </Button>
            </Modal.Footer> */}
        </Modal>
    );


}

export default RollCalculationPopup;