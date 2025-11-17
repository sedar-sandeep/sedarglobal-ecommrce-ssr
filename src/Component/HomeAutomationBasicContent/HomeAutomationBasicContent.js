import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LinkComponent from '@components/Link';
import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ScrollTo from "react-scroll-into-view";

const HomeAutomationBasicContent = (props) => {
  const backgroundstyle = {
    backgroundImage: "url('" + `/assets/images/Automation/Group23047.png` + "')"
  }
  return (
    <>
      <div className="HomeAutomationBasicContent px-3" >
        <div className="BasicContent" style={backgroundstyle}>
          <Container className="max-content">
            <Row className="align-items-center">
              <Col sm={6} className="col-first">
                {props?.CHILD?.[0].description ? parse(props?.CHILD?.[0]?.description) : ''}
                {/* <LinkComponent href={props.link_url} className="btn sedar-btn" >{props.link_title}</LinkComponent> */}
                <ScrollTo selector={`#InquiryForm`} smooth={false} block="center">
                  <a className="btn sedar-btn rounded-0" >{props.link_title}</a>
                </ScrollTo>
              </Col>
              <Col sm={6} className="col-second">
                <div className="contentlist">
                  <Row >
                    <Col sm={12}>
                      <div className="img-group">
                        <img src={props?.CHILD?.[0]?.image_path} alt="sedarglobal" width="auto" height="auto" />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>


          </Container>
        </div>
        
      </div>

    </>
  );
}

HomeAutomationBasicContent.propTypes = {};

HomeAutomationBasicContent.defaultProps = {};

export default HomeAutomationBasicContent;
