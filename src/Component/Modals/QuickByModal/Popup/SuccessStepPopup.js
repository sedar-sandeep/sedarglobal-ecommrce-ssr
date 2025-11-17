import React from 'react';

import { Modal } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';


function SuccessStepPopup(props) {
  const { t } = useTranslation("common");
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Body>
        <div className="removealert SuccessStepPopup p-5">
          <div className="alerttext">
            <img className="img-fluid mb-3" src={`/assets/images/Customization/Group24171.png`} alt="sedarglobal" width="auto" height="auto" />
            <p>{t("ProductSuccessfully")} </p>
            <p>{t("Addedtoyourcart")} </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}



SuccessStepPopup.propTypes = {};

SuccessStepPopup.defaultProps = {};

export default SuccessStepPopup;
