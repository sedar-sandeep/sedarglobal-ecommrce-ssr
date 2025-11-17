import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import parse from 'html-react-parser';

const CookiePolicy = (props) => (


  <div className="CookiePolicy">
    <section className="CookiePolicy">
      
      <Container className="max-content ">
        <Row>
          <Col sm={12} className="col-first">
            <div className="desc">
              {props.description ? parse(props.description) : ''}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  </div>

);


CookiePolicy.propTypes = {};

CookiePolicy.defaultProps = {};

export default CookiePolicy;
