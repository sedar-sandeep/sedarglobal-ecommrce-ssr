import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LinkComponent from '@components/Link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import parse from 'html-react-parser';
import ScrollTo from "react-scroll-into-view";

const QualityServices = (props) => {
  if (props.CHILD == undefined) {

    return false;
  }

  const backgroundImage = {
    backgroundImage: "url('" + `${props.image_path}` + "')",
  };

  return (
    <div className="QualityServices mt-0 py-sm-5" style={backgroundImage}>
      <Container className="max-content pb-lg-5">

        <div className="QualityServices-heading">
          {props.description ? parse(props.description) : ''}
        </div>

        {props.CHILD.map((data, index) => {
          return (
            <Row className="QualityServices_Collection align-items-center mb-0" key={index}>
              <Col lg={6} sm={12} md={6} className="QualityServices_text">

                <div className="desc">
                  {data.description ? parse(data.description) : ''}
                  {data.link_title && data.link_url ? (
                    <Col lg={6} sm={12} className="shop-link ">
                      <LinkComponent href={data.link_url ? data.link_url : ''} className="pb-2">{data.link_title ? data.link_title : ''}</LinkComponent>
                    </Col>


                  ) : data.link_title ? (
                    <ScrollTo selector={`#ContractsForm`} smooth={false} block="center">
                      <a className="btn sedar-btn mb-5 rounded-0" >{data.link_title}</a>
                    </ScrollTo>
                  ) : (<></>)}

                </div>


              </Col>

              <Col lg={6} sm={12} md={6} className="QualityServices-content">
                <picture>
                  <source media="(max-width: 575.98px)" srcSet={data.image_path_portrait} />
                  <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={data.image_path_landscape} />
                  <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={data.image_path_03} />
                  <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={data.image_path_02} />
                  <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={data.image_path_01} />
                  <LazyLoadImage effect="" src={data.image_path} alt={data.image_alt_seo} className="imsg" width="auto" height="auto" />
                </picture>
              </Col>

            </Row>
          )
        })
        }



      </Container>
    </div>
  );
}
QualityServices.propTypes = {};

QualityServices.defaultProps = {};

export default QualityServices;
