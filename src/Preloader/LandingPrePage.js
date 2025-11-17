import React from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Container, Row } from 'react-bootstrap';

const LandingPrePage = () => {
  return (
    <>
      <div className="max1920">
        <Container style={{ maxWidth: '1600px' }}>
          <Row>
            <Col sm={5} >
              <Skeleton height={600} count={1} className="my-3" />
            </Col>
            <Col sm={7}>
              <Skeleton height={600} count={1} className="my-3" />
            </Col>
          </Row>
        </Container>
     
      </div>
    </>
  );
};

export default LandingPrePage;