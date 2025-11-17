import { defaultLocale } from '@utils/i18n';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'next-i18next'
import { Col, Row, Container } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LinkComponent from '@components/Link';


const Success = (props) => {
  const { t } = useTranslation('common');
  const location = useRouter();
  // let searchParams = new URLSearchParams(location.query.search);

  let email = location?.query?.email ? location?.query?.email : false; //searchParams.get('email') ? searchParams.get('email') : false;

  return (
    <section className="container max1920 ComponentNotFound">

      <section className="PaymentError">
        <div>
          <Container>
            <Row>
              <Col sm={12} className="my-5 py-5 text-center">
                <div className="my-1 py-5">
                  <LazyLoadImage src={`/assets/images/success.png`} alt="1" className="my-4" width="auto" height="auto" />
                  <h2>{t('request_submitted_successfully')}</h2>
                  <p>{t('you_will_receive_an_email_confirmation_to')}<b> {email}</b></p>
                  {/* <p className="my-4"> <b>{t('weather_conditions')} </b></p> */}
                </div>
                <Col sm={10} md={4} lg={3} className="mx-auto">
                  <LinkComponent href={`/${defaultLocale.toLowerCase()}`}
                    type="button" className="btn btn-Primary bg-sg-primary py-3 py-sm-4 my-4 w-sm-25 w-100 fw-bold sedar-btn w-100 w-md-50 mt-3 mt-md-0 rounded-0"
                  >
                    {t('ContinueShopping')}
                  </LinkComponent>
                </Col>
              </Col>

            </Row>
          </Container>
        </div>

      </section>
    </section>
  )
}


export default Success;
