import React from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Container, Row } from 'react-bootstrap';

const ShippingMenuSkeleton = () => {
    return (
        <>
            <div className="max1920">
                <Row>
                    <Col sm={12}>
                        <Skeleton squre={true} count={1} className="my-2 p-2" />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default ShippingMenuSkeleton;