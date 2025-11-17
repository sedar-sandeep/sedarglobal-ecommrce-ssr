import React from 'react';
import { Col, Container, Row, Breadcrumb } from 'react-bootstrap';
import LinkComponent from '@components/Link';
import parse from 'html-react-parser';
import { useTranslation } from 'next-i18next';
import { ImageComponent } from '@components/image';
import { useRouter } from 'next/router';

import Tiles from './tiles';


const BlogPost = (props) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <section className="BlogPost">

      <Row className="d-flex bg-success text-dark bg-opacity-10">
        <Col>
          <Row>
            <Col className="px-5 pt-5 midcontainer">
              <Breadcrumb>
                <Breadcrumb.Item href={'/'}>
                  {t('home')}
                </Breadcrumb.Item>
                {props?.breadcrumb && Object.entries(props?.breadcrumb)?.map((value, key) => {
                  return (
                    <Breadcrumb.Item href={`/${value[1]}`} key={`post-${key}`}>
                      {value[0]}
                    </Breadcrumb.Item>
                  );
                })}
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1 className="fs-1 fw-bolder text-center mb-5">{props.title}</h1>
              {props.image_path && <ImageComponent
                src={props.image_path} alt={props.image_alt_seo}
                width={1920}
                height={508}
                contains={true}
              />}
            </Col>
          </Row>
        </Col>
      </Row>
      <Container>
        <Row className="d-flex my-5">
          <Col>
            {parse(props?.description)}

            {props.CHILD &&

              <Row className="d-flex my-3">

                {props?.CHILD?.map((row, key) => {

                  return (
                    <Tiles {...row} category_link={props.link_url} category_title={props.title} key={`tile-${key}`} />
                  )

                })}


              </Row>
            }
          </Col>
        </Row>
      </Container>
    </section>
  );
}


export default BlogPost;
