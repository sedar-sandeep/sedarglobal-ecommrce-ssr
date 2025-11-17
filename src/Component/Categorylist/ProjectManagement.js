import React from 'react';
import { Container, Col, Row, Image } from "react-bootstrap";
import parse from 'html-react-parser';
import ScrollTo from "react-scroll-into-view";



const BackgroundImageStyle = {
  backgroundImage: "url('" + `/assets/images/toolguide/halfcircle.png` + "')",
  backgroundPosition: 'right 35%',
  backgroundSize: 'auto',
  backgroundRepeat: 'no-repeat'
};

const ProjectManagement = (props) => {


  // if (props.CHILD == undefined) {
  //   return false;
  // }

  return (
    <>
      <section className="max1920" style={BackgroundImageStyle}>


        <div className="Project pt-5" >
          {/* <Container className="max-content project_management"  style={Sectionstyle}> */}
          <Container className="max-content py-5">
            {/* <Container className="Project"> */}
            <Row>
              <Col md={6} className="Categorylist_img pb-5 pb-sm-0">
                <picture>
                  <source media="(max-width: 575.98px)" srcSet={props.image_path_portrait} />
                  <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={props.image_path_landscape} />
                  <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={props.image_path_03} />
                  <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={props.image_path_02} />
                  <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={props.image_path_01} />
                  <img effect="" src={props.image_path} alt={props.image_alt_seo} className="imsg" width="auto" height="auto" />
                </picture>
              </Col>
              <Col md={6} className="Categorylist-text ">
                {props.description ? parse(props.description) : ''}
                <Col sm={12} className="Contact-link pb-1">
                  <div>
                  <ScrollTo selector={`#ContractsForm`}  smooth={false} block="center">
                  <a className="Contact-link pb-1" >{props.link_title}</a>
                </ScrollTo>
                  </div>
                </Col>
              </Col>

            </Row>
          </Container>
        </div>
      </section>

    </>
  );
}
ProjectManagement.propTypes = {};

ProjectManagement.defaultProps = {};

export default ProjectManagement;