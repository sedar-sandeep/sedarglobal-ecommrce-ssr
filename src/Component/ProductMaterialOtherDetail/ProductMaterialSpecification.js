import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import parse from 'html-react-parser';

const ProductMaterialSpecification = (props) => {
  const backimage = `/assets/icon/2089713.png`;

  return (
    <div className="ProductMaterialSpecification more-about">
      <Row>
        <Col sm={12} className="Specification">
          <Row>
            <Col sm={6} >
              <div className="specification-list">
                {props['CHILD'] ? parse(props['CHILD'][0].SHP_HTML) : ''}
              </div>
            </Col>
            <Col sm={6} className="text-end  pe-0">
              <LazyLoadImage effect="" className="img-fluid" src={props['CHILD'][0].SHP_FILE_PATH} alt={props.SHP_DESC} width="auto" height="auto" />
            </Col>
          </Row>
        </Col>
      </Row>
    
    </div>
  );
}



ProductMaterialSpecification.propTypes = {};

ProductMaterialSpecification.defaultProps = {};

export default ProductMaterialSpecification;
