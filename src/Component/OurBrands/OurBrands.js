import React from 'react';
// import './OurBrands.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useTranslation } from 'next-i18next';
import LinkComponent from '@components/Link';
import { ImageComponent } from '@components/image';

const OurBrands = (props) => {
  const { t } = useTranslation('common');
  if (props.CHILD == undefined) {

    return false;
  }
  let text_section = props.CHILD && props.CHILD[0] ? props.CHILD[0] : props;
  let img_section = props.CHILD && props.CHILD[1] && props.CHILD[1]['SUB_CHILD'] ? props.CHILD[1]['SUB_CHILD'] : props;

  const sectionbackgroundColor = props.sectionbackgroundColor;
  return (
    <section className="OurBrands" style={{ backgroundColor: sectionbackgroundColor }}>
      <Container className="max-content pt-5 mt-sm-5">
        <Row>
          <Col sm="12" className="brand-heading">
            <h2 className='fs-5'> {text_section.title} </h2>
          </Col>
          <Col sm="12" className="brand-heading-mobile d-none">
            <div className="heading-section" >
              <Row className="align-items-center">
                <Col xs={8}><span>{text_section.title}</span></Col>
                <Col xs={4} className="text-end">
                  <LinkComponent href={text_section.link_url ? text_section.link_url : '/'} className="mobile-viewall text-wrap ">
                    {t('View_All')}<RiArrowRightSLine className="text-dark mb-1" size={18} role="button" />
                  </LinkComponent>
                </Col>
              </Row>
            </div>
          </Col>

          <Col sm={12} className="OurBrand-content">
            <Row className="OurBrand-row">
              {img_section.slice && img_section.slice(0, 8).map((data, index) => {
                return (
                  <Col sm={3} xs={4} key={index}>
                    <ImageComponent
                      src={data.image_path}
                      alt={data.image_alt_seo}
                      width={180}
                      height={120}
                      quality={70}
                    />
                  </Col>
                )
              })
              }
            </Row>
          </Col>
          <Col sm={12} className="shop-link text-center d-none d-sm-block pt-4">
            <LinkComponent href={props.link_url ? props.link_url : '/'} className="pb-2">
              {props.link_title ? props.link_title : t('MoreBrands')}
            </LinkComponent>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

OurBrands.propTypes = {};

OurBrands.defaultProps = {
  sectionbackgroundColor: "#fff"

};

export default OurBrands;
