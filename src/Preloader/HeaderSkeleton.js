import React from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Container, Row } from 'react-bootstrap';

const HeaderSkeleton = () => {
  return (
    <>
      <div className="max1920">
        <Row>
          <Col sm={12}>
            <Skeleton squre={true} count={1} className="my-2 p-2" />
          </Col>
          <Col sm={2}>
            <Skeleton squre={true} height={80} className="ms-md-3" />
          </Col>
          <Col sm={10}>
            <Skeleton squre={true} height={40} count={2} className="m-2" />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HeaderSkeleton;