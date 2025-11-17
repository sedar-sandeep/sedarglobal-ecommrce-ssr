import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LinkComponent from '@components/Link';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const HomeAutomationPartnerForConnect = (props) => {
  const location = useRouter();
  let slug_url = location.route && location.route.split('/')[2] ? location.route.split('/')[2] : location.route.split('/')[1];

  return (
    <section className="HomeAutomationPartnerForConnect">
      <div className="PartnerForConnect">
        <Container>
          <Row>
            <Col sm={12}>
              <div className="heading-section">
                {props?.CHILD?.[1]?.SUB_CHILD?.[0]?.description ? parse(props?.CHILD?.[1]?.SUB_CHILD?.[0]?.description) : ''}
              </div>
            </Col>
          </Row>
        </Container>
        <Container className="parent-grid-class max-width">
          <Row>
            {props.CHILD?.[0]?.SUB_CHILD && props.CHILD?.[0]?.SUB_CHILD.map((data, index) => {
              return (
                <Col sm={6} key={index} className="brand-grid-box my-4">
                  <div className="brand-grid">
                    <LazyLoadImage effect="" src={data.image_path} alt="sedarglobal" width="auto" height="auto" />
                    <div className="middle">
                      <div className="brand-name">
                        <h2>{data.title}</h2>
                      </div>
                    </div>
                    <div className="grid-content">
                      <div className="brand-content">
                        <div className="brand-name">
                          <h2>{data.title}</h2>
                        </div>
                        <div className="desc">
                          <p> {data.description ? parse(data.description) : ''}  </p>
                        </div>
                        <LinkComponent href={`${"/" + data.link_url}`}>{data.link_title}</LinkComponent>
                      </div>
                    </div>
                  </div>
                </Col>
              )
            })
            }
            

          </Row>
        </Container>
      </div>
    </section>
  );
}

HomeAutomationPartnerForConnect.propTypes = {};

HomeAutomationPartnerForConnect.defaultProps = {};

export default HomeAutomationPartnerForConnect;
