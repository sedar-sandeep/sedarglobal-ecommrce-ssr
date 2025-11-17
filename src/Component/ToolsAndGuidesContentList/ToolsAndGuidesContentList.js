import React from 'react';
// import './ToolsAndGuidesContentList.scss';
import { Container, Row, Col } from 'react-bootstrap';
import parse from 'html-react-parser';
import ScrollTo from "react-scroll-into-view";

const ToolsAndGuidesContentList = (props) => {
  if (props == undefined) {
    
    return false;
  }
  return (
    <section className="ToolsAndGuidesContentList px-3 pt-5">
      <Container className="max-content">
        <Row>
          <Col lg={6} md={12} sm={12} className="col-first">
            {parse(String(props.description))}
            <ScrollTo selector={`#bookNow`} smooth={false} block="center">
              <a className="btn sedar-btn btn-primary border-0 rounded-0" >{props.link_title}</a>
            </ScrollTo>
          </Col>
          <Col lg={6} md={12} sm={12} className="col-second">
            <div className="contentlistImage pt-4">
              <img className="img-fluid" src={props.image_path} alt={props.image_alt_seo} width="auto" height="auto" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

ToolsAndGuidesContentList.propTypes = {};

ToolsAndGuidesContentList.defaultProps = {};

export default ToolsAndGuidesContentList;
