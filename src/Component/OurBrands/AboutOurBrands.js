import React from 'react';

// import './OurBrands.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'next-i18next';
import LinkComponent from '@components/Link';

export const AboutOurBrands = (props) => {
  const { t } = useTranslation('common')
  if (props.data.SUB_CHILD == undefined) {
    //
    return false;
  }

  return (
    <section className="OurBrands" >

      <Container className="max-content pt-5 mt-sm-5">
        <Row>
          <Col sm="12" className="brand-heading">
            <h1> {props.data.title} </h1>
          </Col>
          <Col sm="12" className="brand-heading-mobile d-none">
            <div className="heading-section" >
              <Row className="align-items-center">
                <Col xs={8}><h1>{props.data.title}</h1></Col>
                <Col xs={4} className="text-end">
                  <LinkComponent href={''} className="mobile-viewall text-wrap">
                    {t('View_All')} <LazyLoadImage effect="" src={`/assets/icon/Path37551.png`} alt="sedarglobal" width="auto" height="auto" />
                  </LinkComponent>
                </Col>
              </Row>
            </div>
          </Col>

          <Col sm={12} className="OurBrand-content">
            <Row className="OurBrand-row">
              {props.data.SUB_CHILD.slice(0, 8).map((data, index) => {
                return (
                  <Col sm={3} xs={4} key={index}>
                    <picture>
                      <source media="(max-width: 575.98px)" srcSet={data.image_path_portrait} />
                      <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={data.image_path_landscape} />
                      <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={data.image_path_03} />
                      <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={data.image_path_02} />
                      <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={data.image_path_01} />
                      <LazyLoadImage effect="" src={data.image_path} alt={data.image_alt_seo} className="imsg" width="auto" height="auto" />
                    </picture>
                  </Col>
                )
              })
              }
            </Row>
          </Col>
          <Col sm={12} className="shop-link text-center d-none d-sm-block pt-4">
            {props.data.link_title ? props.data.link_title : 'MoreBrands'}
          </Col>
        </Row>
      </Container>
    </section>
  );
}




