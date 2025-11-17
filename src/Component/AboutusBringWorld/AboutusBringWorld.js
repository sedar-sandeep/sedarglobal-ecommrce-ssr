import React from 'react';
// import './AboutusBringWorld.scss';
import { Container, Row, Col } from 'react-bootstrap';
import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LinkComponent from '@components/Link';

function AboutusBringWorld(props) {
  return (
    <>
      <section className="AboutusBringWorld_wrapper">
        <div className="AboutusBringWorld">
          <Container className="max-content">
            <Row>
              <Col lg="5" sm="12" className="col-first">
                <h1>{props.title}</h1>
                {/* <LazyLoadImage effect="" className="img-fluid" src={props.image_path}  alt="sedarglobal" /> */}
                <LinkComponent href={props.link_url ? props.link_url : ''} className="d-none d-sm-block">
                  <picture>
                    <source media="(max-width: 575.98px)" srcSet={props.image_path_portrait} />
                    <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={props.image_path_landscape} />
                    <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={props.image_path_03} />
                    <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={props.image_path_02} />
                    <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={props.image_path_01} />
                    <LazyLoadImage effect="" src={props.image_path} alt={props.image_alt_seo} className="imsg" width="auto" height="auto" />
                  </picture>
                </LinkComponent>
              </Col>

              <Col lg="7" sm="12" className="col-second">
                <Row>
                  <Col sm={12} >
                    <div className="AboutusBringWorldContent">
                      {props.description ? parse(props.description) : ''}
                      <LinkComponent href={props.link_url} className="btn btn-primary sedar-btn border-0 rounded-0" type="button">{props.link_title}</LinkComponent>
                    </div>


                  </Col>
                  <Col sm={12} className="d-block d-sm-none mobile_image">
                    <LinkComponent href={props.link_url ? props.link_url : ''} className="w-100">
                      <picture>
                        <source media="(max-width: 575.98px)" srcSet={props.image_path_portrait} />
                        <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={props.image_path_landscape} />
                        <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={props.image_path_03} />
                        <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={props.image_path_02} />
                        <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={props.image_path_01} />
                        <LazyLoadImage effect="" src={props.image_path} alt={props.image_alt_seo} className="" width="auto" height="auto" />
                      </picture>
                    </LinkComponent>
                  </Col>
                </Row>

              </Col>
            </Row>


          </Container>
        </div>
      </section>
    </>
  );
}

AboutusBringWorld.propTypes = {};

AboutusBringWorld.defaultProps = {};

export default AboutusBringWorld;
