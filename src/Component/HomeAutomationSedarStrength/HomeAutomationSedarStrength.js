import React from 'react';
import LinkComponent from '@components/Link';
import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Col, Container, Row } from 'react-bootstrap';

const HomeAutomationSedarStrength = (props) => {
  return (
    <section className="HomeAutomationSedarStrength">
      <div className="heading-section">
        {props?.CHILD?.[1]?.SUB_CHILD?.[0]?.description ? parse(props?.CHILD?.[1]?.SUB_CHILD?.[0]?.description) : ''}
      </div>

      <div className="strength-content">
        <Container className="maxwidth">
          <Row>
            {props.CHILD && props.CHILD?.[0]?.SUB_CHILD?.map((data, index) => {
              return (
                <Col className="strength-col" key={index}>
                  <div className="center-img">
                    <picture>
                      <source media="(max-width: 575.98px)" srcSet={data.image_path_portrait} />
                      <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={data.image_path_landscape} />
                      <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={data.image_path_03} />
                      <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={data.image_path_02} />
                      <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={data.image_path_01} />
                      <LazyLoadImage effect="" src={data.image_path} alt={data.image_alt_seo} className="imsg" width="auto" height="auto" />
                    </picture>
                  </div>
                  {props?.link_title &&
                    <div className="label-section">
                      <h3>{data.title}</h3>
                    </div>
                  }
                </Col>

              )
            })
            }
          </Row>
          {props?.link_title &&
            <div className="contact-btn">
              <LinkComponent href={props.link_url} className="btn sedar-btn rounded-0">{props.link_title}</LinkComponent>
            </div>
          }
        </Container>
      </div>

    </section>
  );
};

HomeAutomationSedarStrength.propTypes = {};

HomeAutomationSedarStrength.defaultProps = {};

export default HomeAutomationSedarStrength;
