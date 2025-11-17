import React from 'react';

import { Container, Col, Row, Image } from "react-bootstrap";
import LinkComponent from '@components/Link';
import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const Categorylist = (props) => {
  
  if (props.data == undefined) {
    return false;
  }

  return (

    <section className="max1920" >
      <div className="Categorylist" >
        {/* <section id="CategorylistSection"> */}
        <Container className="max-content  Industries">


          <Col sm={12} >
            {/* <h3>What Industries Do We Serve?</h3> */}
            {props.description ? parse(props.description) : ''}

            <Row>
              {props.CHILD.map((data, index) => {
                return (
                  <Col sm={4} xs={6} key={index} >
                    <div className="Category-grid" key={index}>
                      <picture>
                        <source media="(max-width: 575.98px)" srcSet={data.image_path_portrait} />
                        <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={data.image_path_landscape} />
                        <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={data.image_path_03} />
                        <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={data.image_path_02} />
                        <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={data.image_path_01} />
                        <LazyLoadImage effect="" src={data.image_path} alt={data.image_alt_seo} className="imsg" width="auto" height="auto" />
                      </picture>
                      {/* <h6>Hospitality</h6> */}
                      <div className="desc py-3">
                        {data.description ? parse(data.description) : ''}
                        <div className="Industries-link">
                          <LinkComponent href={data.link_url} className=""> {data.link_title}</LinkComponent>
                        </div>
                      </div>

                    </div>
                  </Col>
                )
              })
              }
             

            </Row>
          </Col>
        </Container>

      </div>
    </section>
  );
}
Categorylist.propTypes = {};

Categorylist.defaultProps = {};

export default Categorylist;
