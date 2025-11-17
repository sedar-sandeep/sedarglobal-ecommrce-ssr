import React from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Container, Row } from 'react-bootstrap';

const PageLayoutContentLoader = () => {
  return (
    <>
      <div className="max1920">
        <Row>
          <Col sm={12}>
            <Skeleton height={300} count={1} className="my-3" />
          </Col>          
        </Row>
        <Container style={{ maxWidth: '1600px' }}>
          <Row>
            <Col sm={6} >
              <Skeleton height={200} count={2} className="my-3" />
            </Col>
            <Col sm={6}>
              <Skeleton height={200} count={2} className="my-3" />
            </Col>
          </Row>
        </Container>
        <Row>
          <Col sm={12}>
            <Skeleton height={300} count={1} className="my-3" />
          </Col>
        </Row>
        <Container style={{ maxWidth: '1600px' }}>
          <Row>
            <Col sm={6} >
              <Skeleton height={200} count={1} className="my-3" />
            </Col>
            <Col sm={6}>
              <Skeleton height={200} count={1} className="my-3" />
            </Col>
          </Row>
        </Container>
        <Row>
          <Col sm={12}>
            <Skeleton height={300} count={1} className="my-3" />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PageLayoutContentLoader;