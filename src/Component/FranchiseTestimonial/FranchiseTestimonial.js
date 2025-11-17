import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import parse from 'html-react-parser';
import VideoModal from "../VideoModal/VideoModal";
import ScrollTo from "react-scroll-into-view";



const FranchiseTestimonial = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const Background = props.image_path;

  if (props.CHILD == undefined) {
    
    return false;
  }

  
  return (
    <section className="FranchiseTestimonial">
      <Container className="max-content">
        <Row className="rowFranchiseTestimonial">
          <Col md={6} className="col-first">
            <div className="TabVideo pt-5">
              <img className="img-fluid" src={props.image_path} alt="sedarglobal" width="auto" height="auto" />

              {props.CHILD[0] && props.CHILD[0] ?
                <>

                  <img className="img-fluid playicon" onClick={() => setModalShow(true)} src={`/assets/images/iconpng/Group23024.png`} alt="sedarglobal" width="auto" height="auto" />
                  <VideoModal show={modalShow} onHide={() => setModalShow(false)} video_url={props.CHILD[0].image_path && props.CHILD[0].image_path != null ? props.CHILD[0].image_path : 'https://www.sedarglobal.com/assets/video/sedar-story.mp4'} />
                </>
                : ''}
              <div className="TabVideoText">
                {props.description ? parse(props.description) : ''}
              </div>
            </div>
          </Col>



          <Col md={6} className="col-second offerCollection-text" >
            <h6 className="offer-title border-start border-2 border-warning ps-3 ps-lg-4">{props.CHILD[1].title}</h6>
            <div className="desc">
              {props.CHILD[1].description ? parse(props.CHILD[1].description) : ''}
            </div>

            <Row>
              <Col sm={12} className="shop-link">
                <ScrollTo selector={`#FranchiseeContactForm`}  smooth={false} block="center">
                  <a className="" >{props.CHILD[1].link_title}</a>
                </ScrollTo>
              </Col>
            </Row>


          </Col>



        </Row>

      </Container>


    </section>
  );
}

FranchiseTestimonial.propTypes = {};

FranchiseTestimonial.defaultProps = {};

export default FranchiseTestimonial;
