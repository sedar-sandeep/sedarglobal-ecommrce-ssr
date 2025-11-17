import React, { useState } from 'react';
import { Col, Container, Row, Image, Modal, Button } from 'react-bootstrap';
import parse from 'html-react-parser';
import LinkComponent from '@components/Link';



const CollapseContent = (props) => {
  return (
    <>
      <div style={{ minHeight: '150px' }}>
        <div className="collapsecontent p-5">
          <div className="heading py-4">
            <h3> {props.data.title}</h3>
          </div>
          <div className="textcontent">
            {props.data.description ? parse(props.data.description) : ''}
            {props.data.link_title ?
              <LinkComponent href={props.data.link_url} className="btn sedar-btn" > {props.data.link_title} </LinkComponent>

              : ''}
          </div>
          <div className="closebutton" > ✕ </div>
        </div>
      </div>
    </>
  )
}


const BrandPage = (props) => {

  const [thisData, setThisData] = useState(0);
  const [collapse, setCollapse] = useState(0);



  const [modalShow, setModalShow] = React.useState(false);
  const [showcol, setShowcol] = React.useState(false);






  return (
    <section className="BrandPage">

      <Container className="max-width d-none d-md-block">
        <div className="cards">
          {props.CHILD && props.CHILD.map((data, index) => {
            return (
              <React.Fragment key={index}>
                <div className={collapse == index && showcol == 1 ? 'card [ is-expanded ]' : 'card [ is-collapsed ]'} >
                  <div className="card__inner [ js-expander ] zoom-animation" onClick={() => { setCollapse(index); setShowcol(true) }}>
                    <div className="brandgrid">
                      <picture>
                        <source media="(max-width: 575.98px)" srcSet={data.image_path_portrait} />
                        <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={data.image_path_landscape} />
                        <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={data.image_path_03} />
                        <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={data.image_path_02} />
                        <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={data.image_path_01} />
                        <img src={data.image_path} alt={data.image_alt_seo} className="imsg img1nd" width="auto" height="auto" />
                      </picture>
                    </div>
                  </div>
                  {showcol == 1 ?
                    <div className="card__expander" onClick={() => { setShowcol(false) }}>
                      <CollapseContent data={data} />
                    </div>
                    : ''}
                </div>

              </React.Fragment>
            )
          })}

        </div>
      </Container>
      <Container className="max-width d-md-none">
        <Row className="OurBrand-row">
          {props.CHILD && props.CHILD.map((data, index) => {
            return (
              <React.Fragment key={index}>
                <Col xs={4} className="p-2" onClick={() => { setModalShow(true); setThisData(index) }}>
                  <picture>
                    <source media="(max-width: 575.98px)" srcSet={data.image_path_portrait} />
                    <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={data.image_path_landscape} />
                    <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={data.image_path_03} />
                    <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={data.image_path_02} />
                    <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={data.image_path_01} />
                    <img src={data.image_path} alt={data.image_alt_seo} className="imsg img1nd" width="auto" height="auto" />
                  </picture>
                </Col>

              </React.Fragment>
            )
          })}
        </Row>
        <BrandContentModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={props.CHILD && props.CHILD[thisData]}
        />
      </Container>
    </section>
  );
}


function BrandContentModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="border-0 pb-0">
      </Modal.Header>
      <Modal.Body>
        <div className="collapsecontent p-2 pt-0">
          <div className="heading py-4">
            <h3> {props?.data?.title}</h3>
          </div>
          <div className="textcontent">
            {props?.data?.description ? parse(props.data.description) : ''}
            {props?.data?.link_title ?
              <LinkComponent href={props.data.link_url} className="btn sedar-btn" > {props.data.link_title} </LinkComponent>
              : ''}
          </div>
        </div>
      </Modal.Body>

    </Modal>
  );
}
BrandPage.propTypes = {};

BrandPage.defaultProps = {};

export default BrandPage;
