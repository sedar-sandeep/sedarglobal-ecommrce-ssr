import React from 'react';

// import './ProductPage.scss';
// import FilterSidebar from "../FilterSidebar/FilterSidebar";
import ProductList from "../ProductList/ProductList";
import { Col, Container, Row } from 'react-bootstrap';

const ProductPage = (props) => (
  <section className="ProductPage">
    <Container className="max-content">
    <Row>
      <Col  sm={3}>
      {/* <FilterSidebar {...props} />      */}
      </Col>
      <Col sm={9}>
          <ProductList {...props} />
      </Col>
    </Row>
    </Container>
  </section>
);

ProductPage.propTypes = {};

ProductPage.defaultProps = {};

export default ProductPage;
