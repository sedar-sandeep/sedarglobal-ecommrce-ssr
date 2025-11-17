
import React, { useEffect, useState, useRef } from 'react';
import { Col, Row, Container } from 'react-bootstrap';

// import { t_lang } from '../../services/i18n';
import EnquiryForm from '../Utility/EnquiryForm';
import { useTranslation } from 'next-i18next';
// import './InquiryForm.scss';



const InquiryForm = () => {
  const { t } = useTranslation('common')
  return (
    <section className="" id='InquiryForm'>
      <div className="InquiryForm">
        <Container >
          <Row>
            <Col sm={12}>
              <div className="heading-section  mt-5 pt-5">
                <h2> {t("MakeanInquiry")} </h2>
                <p> {t("StartaconversationorToContactusviaemailPleasefillouttheform")} </p>
              </div>
            </Col>
            <Col sm={12}>
              <div className="InquiryForm-form ">
                <EnquiryForm type="C" />

              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  )
}
InquiryForm.propTypes = {};

InquiryForm.defaultProps = {};

export default InquiryForm;
