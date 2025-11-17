import React, { useState } from 'react';
import { Col, Container, Row, Tab, Nav, Card, Button, Modal } from 'react-bootstrap';

import parse from 'html-react-parser';
import VideoModal from "../VideoModal/VideoModal";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Swiper, SwiperSlide } from 'swiper/react';

import { useTranslation } from 'next-i18next';
import SwiperCore, { Mousewheel, Pagination, Autoplay } from 'swiper';

SwiperCore.use([Mousewheel, Pagination, Autoplay]);


const TabVideo = (props) => {
  const { t } = useTranslation('common')
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <picture>
        <source media="(max-width: 575.98px)" srcSet={props.image_path_portrait} />
        <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={props.image_path_landscape} />
        <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={props.image_path_03} />
        <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={props.image_path_02} />
        <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={props.image_path_01} />
        <LazyLoadImage effect="" src={props.image_path} alt={props.image_alt_seo} className="img-fluid videoimage" width="auto" height="auto" />
      </picture>

      {props.GRAND_CHILD && props.GRAND_CHILD[0] ?
        <>
          <img className="img-fluid playicon" src={'/assets/images/iconpng/Group23024.png'} alt="sedarglobal" onClick={() => setModalShow(true)} width="auto" height="auto" />
          <VideoModal show={modalShow} onHide={() => setModalShow(false)} video_url={props.GRAND_CHILD && props.GRAND_CHILD[0].image_path != null ? props.GRAND_CHILD[0].image_path : 'https://www.sedarglobal.com/assets/video/sedar-story.mp4'} />
        </>
        : ''}
    </>

  );
}
const LoadMore = () => {
  return (
    <>
      <div className="loadmore d-none">
        <Button variant="primary">Load More</Button>
      </div>
    </>

  );
}
const Tabpaneone = (props) => {
  /// 
  if (props.SUB_CHILD == undefined) {
    //  
    return false;
  }
  return (
    <>
      <Row>
        {props.SUB_CHILD.map((data, index) => {
          return (
            <React.Fragment key={index}>
              <Col sm={6} md={4} className="d-none d-md-block">
                <div className="TabVideo">
                  <TabVideo {...data} />
                  <div className="TabVideoText">
                    {data.description ? parse(data.description) : ''}
                  </div>
                </div>
              </Col>
            </React.Fragment>
          )
        })
        }

        <Swiper observeParents={true} observer={true} className="d-md-none" slidesPerView={1.3} spaceBetween={15} module={[Mousewheel, Pagination, Autoplay]} >
          {props.SUB_CHILD.map((data, index) => {
            return (
              <React.Fragment key={index}>
                <SwiperSlide key={index}>
                  <div className="TabVideo position-relative">
                    <TabVideo {...data} />
                    <div className="TabVideoText">
                      {data.description ? parse(data.description) : ''}
                    </div>
                  </div>
                </SwiperSlide>
              </React.Fragment>
            )
          })
          }

        </Swiper>
      </Row>
    </>

  );
}
const Tabpanetwo = (props) => {
  const [show, setShow] = useState(false);
  const [moreData, setMoreData] = useState(false);
  if (props.SUB_CHILD == undefined) {

    return false;
  }

  const readMoreFun = (data) => {
    setMoreData(data);
    setShow(true);
  }


  return (

    <>
      <Row className="secondtab">
        {props.SUB_CHILD.map((data, index) => {
          return (
            <Col sm={6} md={6} lg={4} key={index} className="d-none d-md-block">

              <Card>
                <Card.Img variant="top" src={data.image_path} />
                <Card.Body className='testimonial_desc'>
                  {data.description && data.description.length < 120 ? parse(data.description) : data.description ? <div className='desc' onClick={() => { readMoreFun(data) }}>{parse(data.description.substring(0, 120) + "...")} <p className='more_text_link fw-bold'> {t("ReadMore")}</p></div> : ''}

                </Card.Body>
              </Card>
            </Col>
          )
        })
        }

        {show && moreData ?
          <Modal show={show} onHide={() => { setShow(false) }} className='secondtabModal '>
            <Modal.Header closeButton>
              {/* <Modal.Title>Modal heading</Modal.Title> */}
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col>
                  <LazyLoadImage src={moreData.image_path} className="image" style={{ width: '100%' }} width="auto" height="auto" />
                </Col>
              </Row>
              <Row>
                <Col className='testimonial_desc'>
                  {parse(moreData.description)}
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
          : ''}


        <Swiper observeParents={true} observer={true} className="d-md-none" slidesPerView={1} spaceBetween={5} module={[Mousewheel, Pagination, Autoplay]}
        >
          {props.SUB_CHILD.map((data, index) => {
            return (
              <React.Fragment key={index}>
                <SwiperSlide key={index}>
                  <Card>
                    <Card.Img variant="top" src={data.image_path} />
                    <Card.Body>
                      {data.description ? parse(data.description) : ''}
                    </Card.Body>
                  </Card>
                </SwiperSlide>
              </React.Fragment>
            )
          })
          }

        </Swiper>
      </Row>
    </>

  );
}
const FranchiseTestimonialTab = (props) => {
  if (props.CHILD == undefined) {
    return false;
  }

  return (
    <section className="FranchiseTestimonialTab">
      <div className="space-33"></div>
      <Container className="max-content">
        <Row>
          <Tab.Container id="left-tabs-example" defaultActiveKey="0">
            <Col sm={12}>
              <Nav variant="pills" className="flex-row justify-content-center justify-content-sm-start">

                {props.CHILD.map((data, index) => {
                  return (
                    <Nav.Item key={index}>
                      <Nav.Link eventKey={index}>{data.title}</Nav.Link>
                    </Nav.Item>
                  )
                })
                }

                {/* <Nav.Item>
                  <Nav.Link eventKey="first">Video Testimonials</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Testimonials</Nav.Link>
                </Nav.Item> */}

              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content>
                {props.CHILD.map((data, index) => {

                  if (data.class_name == 'video_testimonials') {
                    return (
                      <Tab.Pane eventKey={index} key={index}>
                        <Tabpaneone {...data} />
                      </Tab.Pane>
                    )
                  } else if (data.class_name == 'testimonials') {
                    return (
                      <Tab.Pane eventKey={index} key={index}>
                        <Tabpanetwo {...data} />
                      </Tab.Pane>
                    )
                  } else {
                    return (
                      <Tab.Pane eventKey={index} key={index}>
                        No Tab
                      </Tab.Pane>
                    )
                  }




                })
                }
                {/* <Tab.Pane eventKey="first">
                  <Tabpaneone />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Tabpanetwo />
                </Tab.Pane>
                 */}

              </Tab.Content>
              <LoadMore />
            </Col>
          </Tab.Container>
        </Row>
      </Container>
      <div className="space-65"></div>
    </section>
  );
}


const ReadMorePopup = (props) => {
  return (
    <Modal
      //  {...props}
      size="lg"
      show={props.show ? true : false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={true}
      onHide={props.onHide}
    // keyboard={false}
    //  backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('Shipment_location')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="showRoom_popup">
        <Row>
          <img className="img-fluid playicon" src={props.image} alt="sedarglobal" width="auto" height="auto" />
        </Row>
        <Row>
          {props.description ? parse(props.description) : ''}
        </Row>
      </Modal.Body>
    </Modal>
  );

}

FranchiseTestimonialTab.propTypes = {};

FranchiseTestimonialTab.defaultProps = {};

export default FranchiseTestimonialTab;
