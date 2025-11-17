import React from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Container, Row } from 'react-bootstrap';

const PageLayoutContentLoader = () => {
  return (
    <>
      <div className="max1920">
        <Row>
          <Col sm={8} >
            <Skeleton height={'90vh'} count={1} className="my-3" />
            <Skeleton height={'5vh'} count={1} className="my-3" />
          </Col>
          <Col sm={4}>
            <Col sm={12} >
              <Skeleton height={'2vh'} count={1} className="my-3" />
            </Col>
            <Col sm={12} >
              <Skeleton height={'2vh'} count={1} className="my-3" />
            </Col>
            <Row>
              <Col sm={9} >
                <Skeleton height={'80vh'} count={1} className="my-3" />
              </Col>
              <Col sm={3}>
                <Skeleton height={'80vh'} count={1} className="my-3" />
              </Col>
            </Row>
            <Col sm={12} >
              <Skeleton height={'5vh'} count={1} className="my-3" />
            </Col>
          </Col>
        </Row>

      </div>
    </>
  );
};

export default PageLayoutContentLoader;