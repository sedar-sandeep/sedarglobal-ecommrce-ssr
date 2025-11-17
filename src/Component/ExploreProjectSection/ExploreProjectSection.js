import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LinkComponent from '@components/Link';
import Parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'next-i18next';
// import { t_lang } from '../../services/i18n';

const ExploreProjectSectionBackground = {
  backgroundImage: "url('" + `/assets/images/CategorySection/Group6648.png` + "')"
};
const CategoryIntroBackground = {
  backgroundImage: "url('" + `/assets/images/CategorySection/Path21318.png` + "')"
};

const ExploreProjectSection = (props) => {
  const { t } = useTranslation("common");
  return (
      <section className="ExploreProjectSection py-3 pb-lg-5" style={ExploreProjectSectionBackground}>
        <Container className={props.description != '' ? `maxwidth pt-lg-5 mt-lg-5` : `maxwidth`}>
          <Row>
            {props.description &&
              <Col sm={12} md={12} lg={6}>
                <div className="Category-intro mt-4" style={CategoryIntroBackground}>
                  <div className="Category-intro-text">
                    {props.description ? Parse(props.description) : ''}
                  </div>
                </div>
              </Col>
            }

            {props.CHILD && props.CHILD.map((data, index) => {
              return (
                <Col xs={6} sm={6} md={4} lg={6} style={props.description != '' ? index % 2 ? {} : { marginTop: '-10%' } : {}} className={props.description && index == 0 ? 'order-lg-first Category-grid pt-5' : 'Category-grid pt-5'} key={index}>
                  <>
                    <picture>
                      <source media="(max-width: 575.98px)" srcSet={data.image_path_portrait} />
                      <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={data.image_path_landscape} />
                      <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={data.image_path_03} />
                      <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={data.image_path_02} />
                      <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={data.image_path_01} />
                      <LazyLoadImage effect="" src={data.image_path} alt={data.image_alt_seo} className="imsg" width="auto" height="auto" />
                    </picture>
                    <h6>{data.title}</h6>
                    <div className="shop-link "><LinkComponent href={`${data.link_url ? 'contracts/' + data.link_url : ''}`} className="">{data.link_title}</LinkComponent></div>
                  </>
                </Col>

              )

            })
            }
            {/* <Col xs={6} sm={6} md={4} lg={6} className='Category-grid Category-grid-viewall d-flex align-items-center'>
              <div className="shop-link view_all_cate ">
                <LinkComponent href={props.link_url ? props.link_url : 'projects'} className="pb-2">{props.link_title ? props.link_title : t('ViewAllCategories')}</LinkComponent>
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>
  );
}

ExploreProjectSection.propTypes = {};

ExploreProjectSection.defaultProps = {};

export default ExploreProjectSection;
