import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ScrollTo from "react-scroll-into-view";

const FreeConsultationSimpleProcess = (props) => {



  if (props == undefined) {
    
    return false;
  }
  const Background = `/assets/images/Consultant/Group22720.png`;
  return (
    <section className="FreeConsultationSimpleProcess px-2 px-xl-0" style={{ backgroundImage: `url(${Background})` }}>
      <div className="headingSection text-center px-2">
        {parse(props.description)}
      </div>
      <Container>
        {props.CHILD && props.CHILD.map((data, index) => {
          return <Row className="processtep" key={index}>
            <Col md="6">
              <div className="processImage">
                <LazyLoadImage effect="" src={data.image_path} alt={data.image_alt_seo} className="w-100" width="auto" height="auto" />
              </div>
            </Col>
            <Col md="6">
              <div className="processContent">
                <h5>{props.CHILD[index].title}</h5>
                {props.CHILD[index].SUB_CHILD ?
                  <ul className="list">
                    {props.CHILD[index].SUB_CHILD.map((data, index) => {
                      return <li key={index}>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <LazyLoadImage effect="" className="listimage" src={data.image_path ? data.image_path : `/assets/images/no_image_profile.jpg`} alt={data.image_alt_seo} width="auto" height="auto" />
                          </div>
                          <div className="flex-grow-1 ms-lg-5  ms-4">
                            <span className="listtext">{data.title}</span>
                          </div>
                        </div>
                      </li>
                    })}

                  </ul>
                  : ''}
                <ScrollTo selector={`#bookNow`}  smooth={false} block="center">
                  <a className="btn sedar-btn" >{props.CHILD[0].link_title}</a>
                </ScrollTo>
              </div>
            </Col>
          </Row>
        })}

      </Container>
    </section>
  )
};

FreeConsultationSimpleProcess.propTypes = {};

FreeConsultationSimpleProcess.defaultProps = {};

export default FreeConsultationSimpleProcess;
