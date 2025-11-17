import React, { useState } from 'react';
import { Col, Row, Modal } from 'react-bootstrap';

import { useDispatch } from "react-redux";
import { alertMgs } from 'src/Redux-Config/Actions/index';
import { useTranslation } from 'next-i18next';
import LinkComponent from '@components/Link';


function ToastAlert(props) {
  const { t } = useTranslation("common")
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  let user_info = props.user_state ? props.user_state.user_info : false;
  let head_sys_id = props.user_state && props.user_state.modification_user_info && props.user_state.modification_user_info.head_sys_id > 0 ? props.user_state.modification_user_info.head_sys_id : false;

  if (show) {
    setTimeout(function () {
      setShow(true);
      dispatch(alertMgs(''));
    }, 2000);
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
              {props.message_type && props.message_type == 'Error' ?
                <img className="img-fluid mb-3" src={`/assets/images/Customization/Groupn24646.png`} alt="sedarglobal" style={{ width: '38px' }} width="38" height="auto" />
                :
                <img className="img-fluid mb-3" src={`/assets/images/Customization/Group24171.png`} alt="sedarglobal" width="auto" height="auto" />
              }
              <p>{t(`${props.message}`)} </p>

            </div>
            <div className="btngroup mt-5">
              <Row className="action-btn ">
                <Col sm={6} className="border-button mb-3">
                  <a onClick={props.onHide} className="rounded-0 p-0" style={{ borderRadius: "0px !important" }}><span className='border-0 rounded-0'>{t("ContinueShopping")} </span></a>
                </Col>
                <Col sm={6} className="color-button mb-3">
                  <LinkComponent className="" href={user_info && user_info.cust_type == 'ADMIN' && head_sys_id > 0 ? '/modification?head_sys_id=' + head_sys_id : "/cartPage"} ><span>{t('ProceedtoCheckout')} </span></LinkComponent>
                </Col>
              </Row>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
  return <div className="sedar_notification" onClick={() => setShow(true)} />;
}
export default ToastAlert;


