import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row, Form, Button, FloatingLabel, FormControl } from 'react-bootstrap';
import { useRouter } from 'next/router';
import StartProject from './StartProject';
import { useTranslation } from 'next-i18next';


const ContractsForm = (props) => {
  const { t } = useTranslation('common');

  const history = useRouter();

  let url_path = history?.pathname?.slice(1) || '/';

  return (
    <section className="ContractsForm pt-5 mb-5" id="ContractsForm">
      <div className="ContactForm">
        <Container className="max-width">
          <Row>
            {url_path && url_path == 'professionals' ?
              <Col sm="12" className="headingsection pb-4">
                <p className='pb-3'>{t("Benefit_From_Our_Program")} </p>
                <label htmlFor="for heading"> {t("Sign_Up_Now")} </label>
              </Col>
              :
              <Col sm="12" className="headingsection pb-4">
                <p className='pb-3'>{t("Startaproject")} </p>
                <label htmlFor="for heading"> {t("StartaconversationorToContactusviaemailPleasefillouttheform1")} <span> <a href="mailto:projects@sedarglobal.com">projects@sedarglobal.com</a>  </span> </label>
              </Col>
            }
          </Row>
          <Row>
            <Col sm="12" className="form">
              <StartProject form={url_path} />
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}


ContractsForm.propTypes = {};

ContractsForm.defaultProps = {};

export default ContractsForm;
