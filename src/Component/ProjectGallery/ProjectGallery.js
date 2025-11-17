import React from 'react';
// import './ProjectGallery.scss';
import { Container, Row, Col } from 'react-bootstrap';
// import parse from 'html-react-parser';
// import { LazyLoadImage } from 'react-lazy-load-image-component';




const BackgroundImageStyle = {
  backgroundImage: "url('" + `/assets/images/toolguide/halfcircle.png` + "')",
  backgroundPosition: 'right -15%',
  backgroundSize: 'auto',
  backgroundRepeat: 'no-repeat'
};


const ProjectGallery = (props) => {
  if (props.CHILD == undefined) {
    
    return false;
  }
  return (
    <div className="ProjectGallery pt-5" style={BackgroundImageStyle}>
      <section className="ProjectGallery" >
        <Container className="max-content">
          <Col sm={12} xs={12} >
            <h3>{props.title} </h3>
            {/* {props.description ? parse(props.description) : ''} */}

            <Row className="ProjectGallery_img">
              <Col sm={6} className="col-first">
                <div className="Gallery-grid">
                  {/* <img className="img-fluid" src={`/assets/images/ProjectGallery/Cascade Woven Shades_BW-623@2x.png`} alt="sedarglobal" /> */}
                  <picture>
                    <source media="(max-width: 575.98px)" srcSet={props.image_path_portrait} />
                    <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={props.image_path_landscape} />
                    <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={props.image_path_03} />
                    <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={props.image_path_02} />
                    <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={props.image_path_01} />
                    <img effect="" src={props.image_path} alt={props.image_alt_seo} className="imsg" width="auto" height="auto" />
                  </picture>
                </div>
              </Col>

            
              <Col sm={6} className="col-sec" >
                <Row>
                  {props.CHILD.map((data, index) => {
                    return (
                      <Col sm={6} xs={6} key={index} className="sec-child" >
                         <div className="Gallery-grid">
                          <picture>
                            <source media="(max-width: 575.98px)" srcSet={data.image_path_portrait} />
                            <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={data.image_path_landscape} />
                            <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={data.image_path_03} />
                            <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={data.image_path_02} />
                            <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={data.image_path_01} />
                            <img effect="" src={data.image_path} alt={data.image_alt_seo} className="" width="auto" height="auto" />
                          </picture>
                        </div>


                      </Col>
                    )
                  })
                  }
                </Row>

              </Col>
              {/* 
              <Col sm={3} >
                <div className="Gallery-grid">
                  <img className="img-fluid" src={`/assets/images/ProjectGallery/Chinese-Restaurant-Woven-Rollers-BW-580-24@2x.png`} alt="sedarglobal" />
                </div>
                <div className="Gallery-grid-div">
                  <img className="img-fluid" src={`/assets/images/ProjectGallery/Woven-Roller-Blinds-Bed-Room-Close-Up-(BW-7347)@2x.png`} alt="sedarglobal" />
                </div>
              </Col>
              <Col sm={3} >

                <div className="Gallery-grid">
                  <img className="img-fluid" src={`/assets/images/ProjectGallery/Fujikawa-Combishades(CMB-74)-Living-Room@2x.png`} alt="sedarglobal" />
                </div>
                <div className="Gallery-grid-div">
                  <img className="img-fluid" src={`/assets/images/ProjectGallery/office-Vertical-Blinds-Antaritica-Vertical-Helene-74433@2x.png`} alt="sedarglobal" />
                </div>
              </Col> */}
            </Row>
          </Col>
        </Container>
      </section>
    </div>
  );
}

ProjectGallery.propTypes = {};

ProjectGallery.defaultProps = {};

export default ProjectGallery;
