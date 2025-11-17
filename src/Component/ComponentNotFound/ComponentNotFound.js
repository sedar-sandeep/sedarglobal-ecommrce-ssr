import React from 'react';
// import './ComponentNotFound.scss';
import { Col, Row, Container } from 'react-bootstrap';
// import { t_lang } from '../../services/i18n';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'next-i18next';


const ComponentNotFound = (props) => {
  const { t } = useTranslation()
  return (
    <section className="container max1920 ComponentNotFound">

      <section className="PaymentError">
        <div>
          <Container>
            <Row>
              <Col sm={12} className="my-5 py-5 text-center">
                <div className="my-5 py-5">
                  <LazyLoadImage src={`/assets/images/Error/Group25786.png`} alt="1" className="my-4" width="auto" height="auto" />
                  <p className="my-4"><b><b style={{ color: "#ec0c0c" }}>{props.component_url}</b>...... {t('ComponentNotFound')} .</b></p>

                </div>
              </Col>
            </Row>
          </Container>
        </div>

      </section>
    </section>
  )
}


export default ComponentNotFound;
