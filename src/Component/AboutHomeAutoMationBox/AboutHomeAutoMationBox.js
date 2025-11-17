import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
// import './AboutHomeAutoMationBox.scss';
import LinkComponent from '@components/Link';
import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const styleone = {
  backgroundImage: "url('" + `/assets/images/Mask Group 270.png` + "')",
  backgroundColor: "#B4A690",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left bottom'
}
const styletwo = {
  backgroundImage: "url('" + `/assets/images/Mask Group 271.png` + "')",
  backgroundColor: "#BE8064",
  backgroundRepeat: "no-repeat",
  backgroundPosition: 'right bottom'


}


const AboutHomeAutoMationBox = (props) => (
  <div className="AboutHomeAutoMationBox max1920" >   
    <Container fluid>
      <Row>
        <Col lg={6} md={12} sm={12} className="col-first p-md-0" style={styleone} >
          <div className="boxText px-4 px-lg-5 px-sm-2">
            <h5>{props.CHILD && props.CHILD[0].title}</h5>

            <div className="pt-4">{props.CHILD && props.CHILD[0].description ? parse(props.CHILD && props.CHILD[0].description) : ''}</div>

            <LinkComponent href={props.CHILD && props.CHILD[0].link_url} className="pb-1">{props.CHILD && props.CHILD[0].link_title}</LinkComponent>

          </div>
        </Col>
        <Col lg={6} md={12} sm={12} className="col-second p-0">
          <LinkComponent href={props.link_url ? props.link_url : ''} className="">
            <picture>
              <source media="(max-width: 575.98px)" srcSet={props.CHILD && props.CHILD[0].image_path} />
              <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={props.CHILD && props.CHILD[0].image_path} />
              <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={props.CHILD && props.CHILD[0].image_path} />
              <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={props.CHILD && props.CHILD[0].image_path} />
              <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={props.CHILD && props.CHILD[0].image_path} />
              <LazyLoadImage effect="" src={props.CHILD && props.CHILD[0].image_path} alt={props.CHILD && props.CHILD[0].image_alt_seo} className="imsg" width="auto" height="auto" />
            </picture>
          </LinkComponent>
        </Col>
      </Row>
      <Row className="row-reverse">
        <Col lg={6} md={12} sm={12} className="col-second p-md-0" style={styletwo}>
          <div className="boxText px-4 px-lg-5 px-sm-2">
            <h5>{props.CHILD && props.CHILD[1].title}</h5>
            <div className="pt-4">{props.CHILD && props.CHILD[1].description ? parse(props.CHILD && props.CHILD[1].description) : ''}</div>

          </div>
        </Col>
        <Col lg={6} md={12} sm={12} className="col-first p-0">
          <LinkComponent href={props.link_url ? props.link_url : ''} className="">
            <picture>
              <source media="(max-width: 575.98px)" srcSet={props.CHILD && props.CHILD[1].image_path} />
              <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={props.CHILD && props.CHILD[1].image_path} />
              <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={props.CHILD && props.CHILD[1].image_path} />
              <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={props.CHILD && props.CHILD[1].image_path} />
              <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={props.CHILD && props.CHILD[1].image_path} />
              <LazyLoadImage effect="" src={props.CHILD && props.CHILD[1].image_path} alt={props.CHILD && props.CHILD[1].image_alt_seo} className="imsg" width="auto" height="auto" />
            </picture>
          </LinkComponent>
        </Col>
      </Row>
    </Container>
  </div>

);

AboutHomeAutoMationBox.propTypes = {};

AboutHomeAutoMationBox.defaultProps = {};

export default AboutHomeAutoMationBox;
