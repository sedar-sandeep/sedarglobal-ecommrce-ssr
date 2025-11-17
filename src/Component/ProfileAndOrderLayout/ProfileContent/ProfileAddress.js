import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row, Tab, Nav, Button, Modal, Form } from 'react-bootstrap';
import LinkComponent from '@components/Link';
import AddressAddEditCenteredModal from '../ProfileModal/AddressAddEdit';
import RemoveDataConfirm from '../ProfileModal/RemoveDataConfirm';
import ApiDataService from '../../../services/ApiDataService';
import { useTranslation } from 'next-i18next'
import Cookies from 'js-cookie';

let auth_token = Cookies.get('AUTH_TOKEN');
let user_email = Cookies.get('USER_EMAIL');
let user_id = Cookies.get('USER_ID');

const ProfileAddress = () => {
  const { t } = useTranslation('common');
  const [modalShow, setModalShow] = useState(false);
  const [FormmodalShow, setFormmodalShow] = useState(false);
  const [addressMode, setAddressMode] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [addressEdit, setAddressEdit] = useState(false);

  function editAddress(data) {
    setFormmodalShow(true)
    setAddressEdit(data)
    setAddressMode(false);
  }
  const AddressListFun = () => {
    ApiDataService.getAll(`dashboard/list_address/${user_id}`, { cust_user_id: user_email, auth_token: auth_token }).then(response => {
      //console.log(response.data.result);
      setAddressList(response.data.result);

    }).catch(e => {
      console.log(e);
    });
  }

  const defaultAddress = (id) => {
    ApiDataService.post(`dashboard/default_address_update/${id}/${user_id}`, { cust_user_id: user_email, auth_token: auth_token, cad_default_yn: 'Y' }).then(response => {
      //console.log(response.data.result);
    }).catch(e => {
      console.log(e);
    });
  }


  useEffect(() => {
    AddressListFun();
  }, []);
  return (

    <div className="ProfileAddress mt-15">
      <Tab.Container id="ProfileMyorder-tab" defaultActiveKey="first">
        <Row>
          <Col sm={12}>
            <Nav variant="pills" className="flex-row tab-nav">
              <Nav.Item>
                <Nav.Link eventKey="first">{t('Addressbook')}  </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={12} className="tab-content">
            <Tab.Content>
              <Tab.Pane eventKey="first" transition={false}>
                <div className="grid">
                  {addressList.map((data, i) => {
                    return (
                      <label className="card" key={i}>
                        <input name="plan" className="radio" type="radio" defaultChecked={data.cad_default_yn == 'Y' ? true : false} onClick={() => defaultAddress(data.cad_id)} />
                        <p className="plan-type-heading"> {data.cad_address_type}</p>
                        <span className="plan-details">
                          <div className="plan-box">
                            <h6 className="plan-type">{data.cad_first_name} {data.cad_last_name}</h6>
                            <p>{data.cad_street_name_no} {data.cad_building_name_no} {data.cad_floor_no} {data.cad_apartment_no} {data.cad_nearest_landmark} {data.cad_city_area_desc},{data.cad_city_desc},{data.cad_state_desc},{data.cad_country} {data.cad_postal_code} </p>
                            <p>{t('Landmark')} :{data.cad_nearest_landmark}</p>
                            <p>{t('Mobile')} :{data.cad_contact_number}</p>
                            {data.cad_phone_number ? <p>{t('Phone')} :{data.cad_phone_number}</p> : ''}
                            <p>{t('Email')} :{user_email}</p>
                            <div className="border-button">
                              <span className="" role="button" onClick={() => { setModalShow(true), setAddressEdit(data) }}><span> {t('Remove')}  </span></span>

                            </div>
                            <div className="border-button">
                              <span className="" role="button" onClick={() => { editAddress(data) }}  ><span>{t('Edit')} </span></span>
                            </div>
                          </div>

                        </span>
                      </label>
                    )
                  })
                  }
                </div>
                <div className="border-button" onClick={() => { setFormmodalShow(true), setAddressMode('IS'), setAddressEdit(false) }}><span>+ {t('AddNewAddress')} </span>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>


      <RemoveDataConfirm
        show={modalShow}
        onHide={() => setModalShow(false)}
        addressEdit={addressEdit}
        AddressListFun={AddressListFun}
      />
      <AddressAddEditCenteredModal
        show={FormmodalShow}
        mode={addressMode}
        onHide={() => { setFormmodalShow(false), setAddressEdit(false) }}
        addressEdit={addressEdit}
        AddressListFun={AddressListFun}
      />
    </div>

  );
}
ProfileAddress.propTypes = {};

ProfileAddress.defaultProps = {};

export default ProfileAddress;
