import React, { useState } from 'react';
// import '../ProfileModal/ProfileModal.scss';
import { Button, Modal, Form } from 'react-bootstrap';
import LinkComponent from '@components/Link';
import ApiDataService from '../../../services/ApiDataService';
import LaddaButton from 'react-ladda';
import { useTranslation } from 'next-i18next'
import Cookies from 'js-cookie';


let auth_token = Cookies.get('AUTH_TOKEN');
let user_email = Cookies.get('USER_EMAIL');

const RemovePopup = (props) => {
    const { t } = useTranslation('common');

    let SCC_SYS_ID = props.cardEdit ? props.cardEdit.SCC_SYS_ID : 0
    const [loading_btn, setLoading_btn] = useState(false);
    //console.log(SCC_SYS_ID, props);

    const deleteAddres = (id) => {
        setLoading_btn(true);
        ApiDataService.delete(`dashboard/customerCard/${id}`, { cust_user_id: user_email, auth_token: auth_token }).then(response => {
            setLoading_btn(false);
            //console.log(response.data.result);
            props.cardListFun();
            props.onHide();
        }).catch(e => {
            setLoading_btn(false);
            console.log(e);
        });
    }
    return (
        <Modal
            {...props}
            show={props.show ? true : false}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation={false}
            onHide={props.onHide}

        >
            <Modal.Body>
                <div className="removealert p-5">
                    <div className="alerttext">
                        <p>{t("AreyousureremovethisCard")}</p>
                    </div>
                    <div className="btngroup">
                        <div className="action-btn">
                            <div className="border-button">
                                <LinkComponent className="" href="" onClick={props.onHide} ><span>{t("Cancel")} </span></LinkComponent>
                            </div>
                            <div className="border-button">
                                <LaddaButton loading={loading_btn} className="remove_btn" onClick={() => deleteAddres(SCC_SYS_ID)}><span> {t("Delete")} </span></LaddaButton>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default RemovePopup;
