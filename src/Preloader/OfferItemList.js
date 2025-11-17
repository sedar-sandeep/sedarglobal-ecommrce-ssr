

import React from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Container, Row } from 'react-bootstrap';

const OfferItemList = () => {
    return (
        <>
            <div className="max1920">
                <Row>
                    <Col sm={12}>
                        <Skeleton squre={true} height={50} className="ms-md-3" />
                    </Col>
                    <Col sm={3}>
                        <Skeleton squre={true} height={200} className="ms-md-3" />
                    </Col>
                    <Col sm={3}>
                        <Skeleton squre={true} height={200} className="ms-md-3" />
                    </Col>
                    <Col sm={3}>
                        <Skeleton squre={true} height={200} className="ms-md-3" />
                    </Col>
                    <Col sm={3}>
                        <Skeleton squre={true} height={200} className="ms-md-3" />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default OfferItemList;