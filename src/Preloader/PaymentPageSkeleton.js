import React from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Container, Row } from 'react-bootstrap';

const PaymentPageSkeleton = () => {
  return (
    <>
      <div className="max1920">
        <Row>
          <Col sm={12}>
            <Skeleton squre={true} height={80} count={8} className="m-2" />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PaymentPageSkeleton;