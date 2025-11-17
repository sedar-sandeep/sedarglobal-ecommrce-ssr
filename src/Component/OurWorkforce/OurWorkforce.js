import React from 'react';
// import './OurWorkforce.scss';
import { Container, Col, Row } from "react-bootstrap";
import LinkComponent from '@components/Link';
import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ScrollTo from "react-scroll-into-view";


const OurWorkforce = (props) => (
  <div className="OurWorkforce max1920">
    <>
      <section className="" style={{ backgroundColor: "#f5ece0" }}>
        {/* <Container fluid> */}
        <Container fluid className=" p-0 " >
          <Row>

            <Col lg={6} sm={12} className=" OurWorkforce d-flex align-items-center">

              <div className='col-first   m-auto p-3'>
                <div>
                  {props.description ? parse(props.description) : ''}

                  <div className="Contact-link pb-1">
                    <ScrollTo selector={`#ContractsForm`} smooth={false} block="center">
                      <a className="" >{props.link_title}</a>
                    </ScrollTo>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} sm={12} className="col-second">
              <LinkComponent href={props.link_url ? props.link_url : ''} className="">
                <picture>
                  <source media="(max-width: 575.98px)" srcSet={props.image_path_portrait} />
                  <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={props.image_path_landscape} />
                  <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={props.image_path_03} />
                  <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={props.image_path_02} />
                  <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={props.image_path_01} />
                  <LazyLoadImage effect="" src={props.image_path} alt={props.image_alt_seo} className="h-100" width="auto" height="auto" />
                </picture>
              </LinkComponent>
              {/* <img className="img-fluid" src={`/assets/images/Mask Group 184@2x.png`} alt="sedarglobal" /> */}
            </Col>
          </Row>
        </Container>


      </section>
    </>

  </div>
);

OurWorkforce.propTypes = {};

OurWorkforce.defaultProps = {};

export default OurWorkforce;
