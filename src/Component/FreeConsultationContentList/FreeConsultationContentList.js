import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import parse from 'html-react-parser';
import ScrollTo from "react-scroll-into-view";
const FreeConsultationContentList = (props) => {
  if (props.CHILD == undefined) {

    return false;
  }
  const backimage = `/assets/icon/2089713.png`

  return (
    <section className="FreeConsultationContentList px-3 pt-5" >
      <Container className="max-content">
        <Row>
          {props.CHILD.length == 3 ?
            <>
              <Col lg={6} className="col-first">
                {parse(props.CHILD[0].description)}
                <ScrollTo selector={`#bookNow`} smooth={false} block="center"  >
                  <a className="btn sedar-btn rounded-0" >{props.CHILD[0].link_title}</a>
                </ScrollTo>
                <div>
                  {props.CHILD && props.CHILD[1] ? parse(props.CHILD[1].description) : ''}
                </div>

              </Col>
              <Col lg={6} className="col-second">
                {props.CHILD && props.CHILD[2] ?
                  <div className="contentlist py-2 ps-lg-5 ps-3 ">
                    {props.CHILD[2].title}
                    <ul className="list ms-3 ps-3" style={{ listStyleImage: 'URL("' + backimage + '")' }}>
                      {parse(props.CHILD[2].description)}
                    </ul>
                  </div>
                  : ''}
              </Col>
            </>
            :
            <>
              <Col lg={6} className="col-first">
                {parse(props.CHILD[0].description)}
                <ScrollTo selector={`#bookNow`} smooth={false} block="center"  >
                  <a className="btn sedar-btn rounded-0" >{props.CHILD[0].link_title}</a>
                </ScrollTo>
              </Col>
              <Col lg={6} className="col-second">
                {props.CHILD && props.CHILD[1] ?
                  <div className="contentlist py-2 ps-lg-5 ps-3 ">
                    {props.CHILD[1].title}
                    <ul className="list ms-3 ps-3" style={{ listStyleImage: 'URL("' + backimage + '")' }}>
                      {parse(props.CHILD[1].description)}
                    </ul>
                  </div>
                  : ''}
              </Col>
            </>
          }
        </Row>
      </Container>
    </section>
  );
}

export default FreeConsultationContentList;
