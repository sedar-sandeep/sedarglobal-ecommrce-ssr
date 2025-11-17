import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LinkComponent from '@components/Link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useRouter } from 'next/router';

const ProjectCategoryGroupGrid = (props) => {

  const router = useRouter();

  if (props.CHILD == undefined) {

    return false;
  }



  let param = router.query;
  const Background = '/' + 'assets/images/project/Group6648.png';
  return (
    <section className="ProjectCategoryGroupGrid pt-5 pt-md-0 px-2" style={{ backgroundImage: `url(${Background})` }} >
      <Container className="max-width">
        <Row>
          {props.CHILD.map((data, index) => {
            return (
              <Col sm={4} xs={6} key={index}>
                <div className="grid-content">
                  <div className="grid-image">
                    <LazyLoadImage className="img-fluid" src={data.image_path} alt={data.image_alt_seo} width="auto" height="auto" />
                  </div>
                  <div className="project-info">
                    <p className="bottomheading">{data.title}</p>
                    {/* <LinkComponent href={'project/' + param.slug + '/' + data.link_url} className="Link">{data.link_title}</LinkComponent> */}
                    {/* /ProjectDetail */}
                  </div>

                </div>
              </Col>
            )
          })
          }
        </Row>
      </Container>
    </section>
  );
}

ProjectCategoryGroupGrid.propTypes = {};

ProjectCategoryGroupGrid.defaultProps = {};

export default ProjectCategoryGroupGrid;
