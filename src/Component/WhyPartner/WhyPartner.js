import React, { useState } from 'react';
// import './WhyPartner.scss';
import { Col, Container, Row } from 'react-bootstrap';
import parse from 'html-react-parser';
import VideoModal from "../VideoModal/VideoModal";
// import { LazyLoadImage } from 'react-lazy-load-image-component';

const WhyPartner = (props) => {

  const [modalShow, setModalShow] = useState(false);

  ////console.log(props)
  return (
    <>
      <section className="WhyPartner max1920 pt-5 mt-sm-5">
        <div className="heading"> {parse(String(props.description))}</div>
        <Container fluid>
          <Row>
            <Col sm={12} className="videoFrame" onClick={() => setModalShow(true)}>
              <div className="videothumbnail">
                <img src={props.image_path} alt="video" width="auto" height="auto" />
                {props.CHILD && props.CHILD[0] ?
                  <img src={`/assets/images/iconpng/Group22983.png`} alt="play icon" className="playicon" onClick={() => setModalShow(true)} width="auto" height="auto" />
                  : ''}
              </div>
            </Col>
          </Row>

        </Container>


      </section>
      {props.CHILD && props.CHILD[0] ?
        <VideoModal show={modalShow} onHide={() => setModalShow(false)} video_url={props.CHILD && props.CHILD[0].image_path != null ? props.CHILD[0].image_path : 'https://www.sedarglobal.com/assets/video/sedar-story.mp4'} />
        : ''}
    </>
  );
}

WhyPartner.propTypes = {};

WhyPartner.defaultProps = {};

export default WhyPartner;
