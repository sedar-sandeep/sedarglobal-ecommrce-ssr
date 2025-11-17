import React from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Container, Row } from 'react-bootstrap';

const ShippingFormPreLoader = () => {
  return (
    <>
      <div className="max1920">
        <Container style={{ maxWidth: '1600px' }}>
          <Row>
            <Col sm={12} >
              <Skeleton height={50} count={8} className="my-2" />
            </Col>
           
          </Row>
        </Container>        
      </div>
    </>
  );
};

export default ShippingFormPreLoader;