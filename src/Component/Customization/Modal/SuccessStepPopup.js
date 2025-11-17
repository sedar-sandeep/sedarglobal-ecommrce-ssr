import React, { useState } from 'react';

import { Col, Container, Row, Tab, Nav, Button, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import LinkComponent from '@components/Link';
import { useTranslation } from 'next-i18next';


function SuccessStepPopup(props) {


  const { t } = useTranslation("common")
  const router = useRouter();
  const { slug } = router.query;
  let cust_type = props.customize_state.user_info ? props.customize_state.user_info.cust_type : '';
  let line_result = props.customize_state.edit_step_data ? props.customize_state.edit_step_data.line_result : false;
  let SOL_SOH_SYS_ID = props.customize_state.modification_user_info && props.customize_state.modification_user_info.head_sys_id ? props.customize_state.modification_user_info.head_sys_id : '';
  let cart_url = cust_type == 'ADMIN' && SOL_SOH_SYS_ID ? '/modification?head_sys_id=' + SOL_SOH_SYS_ID : '/cartPage';
  let cart_status = line_result && line_result.SOL_CART_STATUS && ['COMPLETED', 'MODIFICATION'].indexOf(line_result.SOL_CART_STATUS) >= 0 ? line_result.SOL_CART_STATUS : 'INCOMPLETE';
  
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
      keyboard={false}
      backdrop="static"
    >
      <Modal.Body>
        <div className="removealert SuccessStepPopup p-5">
          <div className="alerttext">
            <img className="img-fluid mb-3" src={`/assets/images/Customization/Group24171.png`} alt="sedarglobal" width="auto" height="auto" />
            <p>{t("ProductSuccessfully")} </p>
            <p>{cart_status == 'INCOMPLETE' ? t("Addedtoyourcart") : t('updatedtoyourcart')} </p>
          </div>
          <div className="btngroup mt-5">
            <Row className="action-btn ">
              <Col sm={6} className="border-button mb-3">
                <LinkComponent className="rounded-0 border-0" href={slug[0] + '/' + slug[1]}><span>{t("ContinueShopping")}  </span></LinkComponent>
              </Col>
              <Col sm={6} className="color-button mb-3">
                <LinkComponent className="" href={cart_url}><span>{t("ProceedtoCheckout")}  </span></LinkComponent>
              </Col>
            </Row>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}



SuccessStepPopup.propTypes = {};

SuccessStepPopup.defaultProps = {};

export default SuccessStepPopup;
