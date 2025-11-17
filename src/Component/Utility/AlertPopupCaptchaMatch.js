import React from 'react'

import { Button, Modal } from 'react-bootstrap';
// import { t_lang } from '../../services/i18n';

export default function AlertPopupCaptchaMatch(props) {
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered

      >
        <Modal.Header closeButton className="border border-0">

        </Modal.Header>
        <Modal.Body>
          <p className="text-center text-dark"> {'Captcha_error_mgs'}</p>
        </Modal.Body>
        <Modal.Footer className="border border-0" >
          <Button className="btn btn-secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
