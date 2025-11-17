import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import LinkComponent from '@components/Link';
import ApiDataService from '../../../services/ApiDataService';
import LaddaButton from 'react-ladda';
import { useTranslation } from 'next-i18next';
import Cookies from 'js-cookie';

let auth_token = Cookies.get('AUTH_TOKEN');
let user_email = Cookies.get('USER_EMAIL');
let user_id = Cookies.get('USER_ID');

const RemoveDataConfirm = (props) => {
  const { t } = useTranslation('common');
  let address_id = props.addressEdit ? props.addressEdit.cad_id : 0
  const [loading_btn, setLoading_btn] = useState(false);

  const deleteAddres = (id) => {
    setLoading_btn(true);
    ApiDataService.post(`dashboard/delete_address/${id}/${user_id}`, { cust_user_id: user_email, auth_token: auth_token }).then(response => {
      setLoading_btn(false);
      //console.log(response.data.result);
      props.AddressListFun();
      props.onHide();
    }).catch(e => {
      setLoading_btn(false);
      console.log(e);
    });
  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Body>
        <div className="removealert p-5">
          <div className="alerttext">
            <p>{t("AreyousureremovethisAdress")}</p>
          </div>
          <div className="btngroup">
            <div className="action-btn">
              <div className="border-button" onClick={props.onHide} ><span>{t("Cancel")} </span>
              </div>
              <div className="border-button" onClick={() => deleteAddres(address_id)}><span>{t("Delete")}</span>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
RemoveDataConfirm.propTypes = {};

RemoveDataConfirm.defaultProps = {};

export default RemoveDataConfirm;
