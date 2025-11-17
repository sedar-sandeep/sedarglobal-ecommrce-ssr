import React from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Container, Row } from 'react-bootstrap';

const HomeSkeleton = () => {
  return (
    <>
      <div className="max1920">
        <Row>
          <Col sm={12}>
            <Skeleton height={'80vh'} count={1} className="my-3" />
          </Col>

        </Row>
        <Container style={{ maxWidth: '1600px' }}>

          <Row>
            <Col sm={12}>
              <Skeleton height={50} count={1} className="my-3" />
            </Col>
            <Col  >
              <Skeleton height={`50vh`} count={1} className="my-3" />
            </Col>
            <Col >
              <Skeleton height={`50vh`} count={1} className="my-3" />
            </Col>
            <Col  >
              <Skeleton height={`50vh`} count={1} className="my-3" />
            </Col>
          </Row>
        </Container>
        <Container style={{ maxWidth: '1600px' }}>
          <Row>
            <Col sm={12}>
              <Skeleton height={50} count={1} className="my-3" />
            </Col>
            <Col sm={8} >
              <Skeleton height={`40vh`} count={1} className="my-3" />
            </Col>
            <Col sm={4}>
              <Skeleton height={`40vh`} count={1} className="my-3" />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Skeleton height={50} count={1} className="my-3" />
            </Col>
            <Col sm={4} >
              <Skeleton height={`40vh`} count={1} className="my-3" />
            </Col>
            <Col sm={8}>
              <Skeleton height={`40vh`} count={1} className="my-3" />
            </Col>
          </Row>
        </Container>
        <Row>
          <Col sm={12}>
            <Skeleton height={`40vh`} count={1} className="my-3" />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomeSkeleton;