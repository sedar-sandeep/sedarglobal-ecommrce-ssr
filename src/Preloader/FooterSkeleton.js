import React from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Container, Row } from 'react-bootstrap';

const FooterSkeleton = () => {
  return (
    <>
      <div className="max1920 bg-light">
        <Row>
          <Col sm={6}>
            <Skeleton squre={true} height={90} className="my-2 p-2" />
          </Col>
          <Col sm={6}>
            <Skeleton squre={true} height={90} count={1} className="my-2 p-2" />
          </Col>
          <Col sm={3}>
            <Skeleton squre={true} height={80} count={2} className="ms-3" />
          </Col>
          <Col sm={3}>
            <Skeleton squre={true} height={80} count={2} className="ms-3" />
          </Col>
          <Col sm={3}>
            <Skeleton squre={true} height={80} count={2} className="ms-3" />
          </Col>
          <Col sm={3}>
            <Skeleton squre={true} height={80} count={2} className="ms-3" />
          </Col>
          <Col sm={12}>
            <Skeleton squre={true} height={40} count={2} className="m-2" />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default FooterSkeleton;