import { useTranslation } from 'next-i18next';
import React, { useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';

function FreeSampleValidationPopup(props) {
    const { t } = useTranslation("common");

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation={false}
        >
            <Modal.Header closeButton>
                {/* <Modal.Title id="contained-modal-title-vcenter">
                    {t('free_sample_limit')}
                </Modal.Title> */}
            </Modal.Header>

            <Modal.Body>
                <div className="removealert p-1">
                    <div className="alerttext">
                        <img className="img-fluid mb-3" src={`/assets/images/Customization/Groupn24646.png`} alt="sedarglobal" style={{ width: '38px' }} width="38" height="auto" />
                        <p>{t('Oops')} </p>

                        {t('maximum_limit_for_free_sample')}

                    </div>
                    <div className="btngroup">
                        <div className="action-btn">
                            {/* <div className="color-button mt-4">
              <Link className="" to="#" onClick={props.onHide} ><span>Proceed to Checkout </span></Link>
            </div> */}
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}


export default FreeSampleValidationPopup;
