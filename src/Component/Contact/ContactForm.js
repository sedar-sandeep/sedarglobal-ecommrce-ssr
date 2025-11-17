import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import parse from 'html-react-parser';
// import './ContactForm.scss';

// import { t_lang } from '../../services/i18n';

import EnquiryForm from '../Utility/EnquiryForm';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'node_modules/next/router';

function ContactForm(props) {
  const { t } = useTranslation('common');
  const router = useRouter();


  return (
    <section className="ContactForm-sec">

      <Container>
        <Row>
          <Col sm={12}>

            <div className="heading pb-5">
              {props.description ? parse(props.description) : <><h2> {t("Letgetyourprojectstarted")} </h2> </>}
            </div>
            <EnquiryForm {...props} formCaptcha={`two`} type={router.pathname === "/free-consultation" ? "H" : "C"} />
          </Col>
        </Row>
      </Container>

    </section>
  );
};

ContactForm.propTypes = {};

ContactForm.defaultProps = {};

export default ContactForm;
