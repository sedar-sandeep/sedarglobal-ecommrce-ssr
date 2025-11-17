import React from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Container, Row } from 'react-bootstrap';

const PageLayoutContentLoader = () => {
  return (
    <>
      <div className="max1920">
        <Container style={{ maxWidth: '1600px' }}>
          <Row>
            <Col sm={8} >
              <Skeleton height={200} count={4} className="my-3" />
            </Col>
            <Col sm={4}>
              <Skeleton height={400} count={2} className="my-3" />
            </Col>
          </Row>
        </Container>        
      </div>
    </>
  );
};

export default PageLayoutContentLoader;