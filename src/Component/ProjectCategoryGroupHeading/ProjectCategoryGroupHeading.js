import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LinkComponent from '@components/Link';
import parse from 'html-react-parser';
import { useTranslation } from 'next-i18next';

const ProjectCategoryGroupHeading = (prop) => {

  let props = prop && prop.CHILD && prop.CHILD[0] ? prop.CHILD[0] : prop;
  
  const { t } = useTranslation("common");
  return (
    <section className="ProjectCategoryGroupHeading px-3">
      {props && (
        <Container className="max-width">
          <Row>
            <Col md={6}>
              <div className="headingsection">
                <h1 className="headingtext">{props?.title}</h1>
              </div>
            </Col>
            <Col md={6}>
              <div className="contentsection">
                {props?.description ? parse(props?.description) : ''}
                <LinkComponent href={props?.link_url ? props?.link_url : '#'} className="btn sedar-btn rounded-0" >{props?.link_title ? props?.link_title : t("ContactUs")}</LinkComponent>
              </div>

            </Col>
          </Row>
        </Container>
      )}
    </section>
  )
};

ProjectCategoryGroupHeading.propTypes = {};

ProjectCategoryGroupHeading.defaultProps = {};

export default ProjectCategoryGroupHeading;
