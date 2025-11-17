import React from 'react';

// import './Franchisevision.scss';
import { Container, Row, Col } from 'react-bootstrap';
import parse from 'html-react-parser';


const Franchisevision = (props) => {
  if (props.CHILD == undefined) {
    
    return false;
  }
  const mystyle = {
    backgroundImage: "url('" + `/assets/images/Franchise/Path21893.png` + "')"
  }
  return (
    <section className="Franchisevision">
      <Container className="max-content pt-5 mt-sm-5">
        <Row>
          {props.CHILD.map((data, index) => {
            return <Col md={6} sm={12}  xs={12} className={`col-first-${index}` } key={index}>{parse(data.description)}</Col>
          })
          }
        </Row>
      </Container>
    </section>
  )
}

Franchisevision.propTypes = {};

Franchisevision.defaultProps = {};

export default Franchisevision;
