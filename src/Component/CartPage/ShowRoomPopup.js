import { useTranslation } from 'next-i18next';
import React, {  } from 'react';
import { Col, Row, Form, Modal } from 'react-bootstrap';
const assets_path = process.env.NEXT_PUBLIC_IMAGE_URL + 'assets/'

const ShowRoomPopup = (props) => {
    const { t } = useTranslation("common")
    return (
        <Modal
            //  {...props}
            size="lg"
            show={props.showroom_show ? true : false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation={true}
            onHide={props.onHide}

        // keyboard={false}
        //  backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t('Shipment_location')}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="showRoom_popup">
                <div className="removealert">
                    <div className="alerttext">
                        <p>{t('Shipment_location_mgs')}</p>
                    </div>
                    <ul >
                        {props.showroom_list && props.showroom_list.map((val, i) => {
                            return (

                                <li key={i}>
                                    <Col className="showroom_list text-center text-md-start" onClick={() => { props.updateShowRoomAddressFun(val) }}>
                                        <Row>
                                            <Col md={1}>
                                                <Form.Check
                                                    inline
                                                    name='SSA_SYS_ID'
                                                    type='radio'
                                                    value={val.SSA_SYS_ID}
                                                    //defaultChecked={props.showRoomVal == val.SSA_SYS_ID ? true : false}
                                                    checked={props.showRoomVal == val.SSA_SYS_ID ? true : false}
                                                    onChange={() => { props.updateShowRoomAddressFun(val) }}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <p className="">{val.SSA_ADDRESS_TITLE} </p>
                                            </Col>
                                            <Col md={2}>
                                                <p className="title">{val.SSA_CITY_NAME}</p>
                                            </Col>
                                            <Col md={4}>
                                                <p className="phone address_info"><a href={'tel:' + val.SSA_PHONE_NO}>{val.SSA_PHONE_NO}</a> </p>
                                            </Col>
                                            <Col md={1} className='google_map'>
                                                <a href={val.SSA_GEO_LOCATION.length > 5 ? val.SSA_GEO_LOCATION : 'https://www.google.ae/maps/place/SEDAR'} target="_blank" rel="noreferrer">
                                                    <img alt="google map" src={assets_path + 'icon/google-maps.png'} width="auto" height="auto" />
                                                </a>
                                            </Col>
                                        </Row>
                                    </Col>
                                </li>
                            )
                        })
                        }
                    </ul>
                    <div className="btngroup">
                        {/* <div className="action-btn">
                            <Button onClick={updateAddress}>Apply</Button>
                        </div> */}
                    </div>
                </div>
            </Modal.Body>
        </Modal >
    );

}

export default ShowRoomPopup;