import React, { useState } from 'react';

import { Col, Container, Row, Tab, Nav, Button, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import LinkComponent from '@components/Link';
import { useTranslation } from 'next-i18next';


function Prompt(props) {


  const { t } = useTranslation("common")
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
      keyboard={true}
      backdrop="static"
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <div className="removealert SuccessStepPopup p-1">

          <div className="alerttext">
          <img className="img-fluid mb-1" src={`/assets/images/Customization/Groupn24646.png`} alt="sedarglobal" width="auto" height="auto" />
            <p>{t("date_reset")} </p>
          </div>

        </div>
      </Modal.Body>
    </Modal>
  );
}



export default Prompt;
