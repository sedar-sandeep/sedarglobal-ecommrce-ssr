import React from 'react';
// import './BrandPageContent.scss';
import { Col, Container, Row } from 'react-bootstrap';
import parse from 'html-react-parser';

const BrandPageContent = (props) => (
  <section className="BrandPageContent">
    <Container className="max-width ">

      <div className={`headingsection`}>
        <Row>
          {props.CHILD && props.CHILD.map((data, index) => {
            return (
              <React.Fragment key={index}>
                <Col md={6} className="mb-3" >
                  <h1>{data.title}</h1>
                </Col>
                <Col md={6} >
                  {data.description ? parse(data.description) : ''}
                </Col>
              </React.Fragment>
            )
          })}

        </Row>
      </div>

    </Container>
  </section>
);

BrandPageContent.propTypes = {};

BrandPageContent.defaultProps = {};

export default BrandPageContent;
