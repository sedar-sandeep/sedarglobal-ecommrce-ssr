import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import parse from 'html-react-parser';

const Accessibilty = (props) => (
  <section className="Accessibilty ">
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

Accessibilty.propTypes = {};

Accessibilty.defaultProps = {};

export default Accessibilty;


