import React, { useState, useEffect, useRef } from 'react';
import { Col, Row, Modal } from 'react-bootstrap';
//import ApiDataService from '../../services/ApiDataService';
import parse from 'html-react-parser';
import { useTranslation } from 'next-i18next';
import { langName } from '@utils/i18n';

const PolicyPopup = (props) => {
    const { t } = useTranslation("common")
    return (
        <Modal
            {...props}
            size="lg"
            show={props.show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation={true}
            className="policy_header"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t(props.policy_header)}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {props.policy_data && props.policy_data.length > 0 && props.policy_data.map((data, index) => {
                    if (props.policy_header == data.class_name) {
                        return (
                            <Row key={index}>
                                <Col>
                                    {data ? parse(data.description) : ''}
                                </Col>
                            </Row>
                        )
                    }
                })
                }

                {/* {policyDataList == undefined && props.policy_header == 'Click_Collect_Policy' ? <ClickCollect /> : policyDataList == undefined ? <DeliveryInstallation /> : ''} */}
            </Modal.Body>
        </Modal>
    );

}

const DeliveryInstallation = () => {

    if (langName == 'ar') {
        return (
            <Row>
                <Col>
                    {/* <h4 className="py-2">توصيل وتركيب :</h4> */}
                    <ul>
                        <li>يتم احتساب رسوم التوصيل والتركيب عند الخروج وفقًا لقيمة سلة التسوق الإجمالية وموقع التسليم.</li>
                        <li>رسوم التوصيل والتركيب مجانية إذا كانت القيمة الإجمالية لسلة التسوق تعادل 1،000 درهم إماراتي أو أكثر.</li>
                        <li>يتم توفير التثبيت للعناصر المحددة فقط ، إذا كان العنصر (العناصر) في عربة التسوق غير قابل للتطبيق للتثبيت ، فسيكون التسليم هو الخيار الوحيد الذي يظهر عند الخروج.</li>
                        <li>يتم التثبيت في مناطق مختارة تغطيها سيدار. في حالة عدم تغطية المنطقة ، سيتم التسليم من قبل شريك البريد السريع التابع لجهة خارجية دون تثبيت.</li>
                    </ul>

                </Col>
            </Row>
        )

    } else {
        return (
            <Row>
                <Col>
                    {/* <h4 className="py-2">Delivery / Installation:</h4> */}
                    <ul>
                        <li>Delivery and installation fees are calculated upon checkout subject to total cart value and delivery location.</li>
                        <li>Delivery and installation fees are free of charge if the total cart value is equivalent to 1,000 AED or higher.</li>
                        <li>Installation is provided for selected items only, if the item(s) in the cart is not applicable for installation, delivery will be the only option shown upon checkout.</li>
                        <li>Installation is provided for selected areas covered by SEDAR. In case the area is not covered, delivery will be fulfilled by a third-party courier partner without installation.</li>
                    </ul>

                </Col>
            </Row>
        )
    }

}

const ClickCollect = () => {
    if (langName == 'ar') {
        return (
            <Row>
                <Col>
                    {/* <h4 className="py-2"> اضغط واستلم</h4> */}
                    <ul>
                        <li>يمكنك اختيار تسليم طلبك (طلباتك) إلى أقرب متجر تابع لـ SEDAR واستلامه من هناك في الوقت الذي يناسبك.</li>
                        <li>يجب أن تكون الطلبات متاحة للاستلام من المتجر في غضون 2-3 أيام عمل بمجرد دفعها وتأكيدها.</li>
                    </ul>

                </Col>
            </Row>
        )
    } else {
        return (
            <Row>
                <Col>
                    {/* <h4 className="py-2"> Click & Collect:</h4> */}
                    <ul>
                        <li>You can choose to have your order(s) delivered to your nearest SEDAR store and pick it up from there at your convenience.</li>
                        <li>Orders should be available for store pickup within 2-3 business days once paid and confirmed.</li>
                    </ul>

                </Col>
            </Row>
        )
    }

}
export default PolicyPopup;