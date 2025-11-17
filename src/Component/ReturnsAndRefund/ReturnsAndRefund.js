import React from 'react';
// import PropTypes from 'prop-types';
// import './ReturnsAndRefund.scss';
import { Container, Col, Row } from "react-bootstrap";
import parse from 'html-react-parser';

const ReturnsAndRefund = (props) => (
  <section className="ReturnsAndRefund">
    <Container className="max-content">
      <Row>
        <Col sm={12} className="col-first">
          <div className="desc">
            {props.description ? parse(props.description) : ''}
          </div>
        </Col>

      </Row>
    </Container>

  </section>
);
ReturnsAndRefund.propTypes = {};

ReturnsAndRefund.defaultProps = {};

export default ReturnsAndRefund;
