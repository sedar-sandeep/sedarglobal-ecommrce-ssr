import { useTranslation } from 'next-i18next';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useRouter } from 'next/router'


const ProductMaterialDescription = (props) => {
  const {query} = useRouter();
  
  const { t } = useTranslation("common")
  return (
    <div className="ProductMaterialDescription">
      <Col sm={12} className="heading-section">
        <h3>{t('ProductDescription')}</h3>
      </Col>
      <Col sm={12}>
        <div className="product-desc">
          <Row>
            <Col md={6} className="back-col-1">
              <div className="Dimensions">
                <div className="heading-child">
                  <h3>{t('Dimensions')}</h3>
                </div>

                {
                  props.SPI_MAX_WIDTH &&
                  < div className="grid-system-child">
                    <Col md={7} style={{ direction: 'ltr', textAlign: props.langName == 'ar' ? 'right' : 'left' }}> <h5>{query.slug[0] == 'wallpaper' ? t('RollWidth') : t('ItemWidth')}</h5></Col>
                    <Col md={5}><p>{props.SPI_MAX_WIDTH}</p></Col>
                  </div>
                }
                {query.slug[0] == 'wallpaper' && props.SPI_MAX_HEIGHT &&
                  <div className="grid-system-child">
                    <Col md={7} style={{ direction: 'ltr', textAlign: props.langName == 'ar' ? 'right' : 'left' }}> <h5>{t('RollLength')}</h5></Col>
                    <Col md={5}><p>{props.SPI_MAX_HEIGHT}</p></Col>
                  </div>
                }
                {query.slug[0] != 'wallpaper' && props.SII_COMPOSITION &&
                  <div className="grid-system-child">
                    <Col md={7} style={{ direction: 'ltr', textAlign: props.langName == 'ar' ? 'right' : 'left' }}> <h5>{t('Composition')}</h5></Col>
                    <Col md={5}><p>{props.SII_COMPOSITION}</p></Col>
                  </div>
                }
                {
                  props.SII_WEIGHT &&
                  <div className="grid-system-child">
                    <Col md={7} style={{ direction: 'ltr', textAlign: props.langName == 'ar' ? 'right' : 'left' }}> <h5>{query.slug[0] == 'wallpaper' ? t('RollWeight') : t('Weight')}</h5></Col>
                    <Col md={5}><p>{t('Weight_with_val', { Weight: props.SII_WEIGHT })}</p></Col>
                  </div>
                }
                {
                  props.SPI_ADDITIONAL_DIM &&
                  <div className="grid-system-child">
                    <Col md={7} style={{ direction: 'ltr', textAlign: props.langName == 'ar' ? 'right' : 'left' }}> <h5>{t('Additional_dimensions')}</h5></Col>
                    <Col md={5}><p>{props.SPI_ADDITIONAL_DIM}</p></Col>
                  </div>
                }

                {
                  props.SPI_PACKAGING_DIM &&
                  <div className="grid-system-child">
                    <Col md={7} style={{ direction: 'ltr', textAlign: props.langName == 'ar' ? 'right' : 'left' }}> <h5>{t('Additional_dimensions')}</h5></Col>
                    <Col md={5}><p>{props.SPI_PACKAGING_DIM}</p></Col>
                  </div>
                }

              </div>
            </Col>
            <Col md={6} className="back-col-2 pe-0">
              <div className="Product-Detail">
                <div className="heading-child">
                  <h3>{t('Product_Detail')}</h3>
                </div>
                <Row>
                  <Col sm={10} >
                    {
                      props.color_group_desc &&
                      <div className="grid-system-child">
                        <div> <h5>{t('Color')}</h5></div>
                        <div><p>{props.color_group_desc}</p></div>
                      </div>
                    }
                    {
                      props.SII_ITEM_PATTERN_DESC &&
                      <div className="grid-system-child">
                        <div> <h5>{t('Design')}</h5></div>
                        <div><p>{props.SII_ITEM_PATTERN_DESC}</p></div>
                      </div>
                    }
                    {
                      props.SII_MT_DESC &&
                      <div className="grid-system-child">
                        <div> <h5>{t('Material')}</h5></div>
                        <div><p>{props.SII_MT_DESC}</p></div>
                      </div>
                    }
                    {
                      props.SII_OPTIONS &&
                      <div className="grid-system-child">
                        <div> <h5>{t('Options')}</h5></div>
                        <div><p>{props.SII_OPTIONS}</p></div>
                      </div>
                    }
                    {
                      props.SII_COUNTRY_OF_ORIGIN &&
                      <div className="grid-system-child">
                        <div> <h5>{t('Country_of_Origin')}</h5></div>
                        <div><p>{props.SII_COUNTRY_OF_ORIGIN}</p></div>
                      </div>
                    }

                    {
                      props.SII_MORE &&
                      <div className="grid-system-child">
                        <div> <h5>{t('Number_of_Crystal')}</h5></div>
                        <div><p>{parse(props.SII_MORE)}</p></div>
                      </div>
                    }
                  </Col>
                  {/* <Col sm={4} className="d-md-flex align-items-center justify-content-end d-none">
                    <LazyLoadImage effect="" className="img-fluid h-100" style={{ objectFit: 'cover' }} src={props.image} alt={props.image_alt_seo} />
                  </Col> */}
                </Row>

              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </div>
  );
}



ProductMaterialDescription.propTypes = {};

ProductMaterialDescription.defaultProps = {};

export default ProductMaterialDescription;
