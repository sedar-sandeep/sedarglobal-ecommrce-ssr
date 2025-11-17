import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
// import './Privacypolicy.scss';
import parse from 'html-react-parser';


const Privacypolicy = (props) => {
  return (
    <section className="Privacypolicy">
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
  )
};

Privacypolicy.propTypes = {};

Privacypolicy.defaultProps = {};

export default Privacypolicy;
