import React, { useState } from 'react';
// import './FreeConsultationHowWork.scss';

import { Container, Row, Col } from 'react-bootstrap';
import parse from 'html-react-parser';
import VideoModal from "../VideoModal/VideoModal";
import { LazyLoadImage } from 'react-lazy-load-image-component';


const FreeConsultationHowWork = (props) => {
  const [modalShow, setModalShow] = React.useState(false);


  if (props == undefined) {
    
    return false;
  }

  return (
    <>
      <section className="FreeConsultationHowWork px-3 px-lg-0">
        <div className="howItwork">
          <div className="howworkcontent">
            <Container fluid className="max-width">
              <div className="headingsection">
                {parse(props.description)}
                {/* <h1>How its works</h1>
            <p>Seadr high-quality wallcovering, upholstery and curtain <br /> fabrics can be found all around the globe</p> */}
              </div>
              {props.CHILD != undefined ?
                <Row >
                  {props.CHILD.map((data, index) => {
                    return <Col sm="4" key={index}>
                      <div className="howworkitem">
                        <div className="howworkImage py-3">
                          <LazyLoadImage effect="" src={data.image_path} alt={data.image_alt_seo} className="howImage" width="auto" height="auto" />
                          {data.SUB_CHILD && data.SUB_CHILD[0] ? <>
                            <button className="btn playicon" onClick={() => setModalShow(true)}><LazyLoadImage effect="" src={`/assets/images/Consultant/playicon.png`} alt="sedarglobal" width="auto" height="auto" /></button>
                            <VideoModal show={modalShow} onHide={() => setModalShow(false)} video_url={data.SUB_CHILD && data.SUB_CHILD[0].image_path != null ? data.SUB_CHILD[0].image_path : 'https://www.sedarglobal.com/assets/video/sedar-story.mp4'} />
                          </>
                            : ''}
                          {/* <div className="itemtext"> <p>{data.title}</p> </div> */}
                        </div>

                      </div>
                    </Col>
                  }
                  )}
                </Row>
                : ''}
            </Container>
          </div>
        </div>

      </section>


    </>
  )
}

FreeConsultationHowWork.propTypes = {};

FreeConsultationHowWork.defaultProps = {};

export default FreeConsultationHowWork;
