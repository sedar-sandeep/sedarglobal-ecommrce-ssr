import React, { useState, useEffect, useContext, Suspense } from 'react';
import { Col, Alert, Row, Form, Button, Accordion, useAccordionButton, Card, AccordionContext } from 'react-bootstrap';
import ShippingPageSkeleton from '../../Preloader/ShippingPage';
import { ShippingContext } from './ShippingPage'
import AddressForm from './AddressForm';
import { connect } from "react-redux";
import { useTranslation } from 'next-i18next'
import LinkComponent from '@components/Link';

const ShippingAddress = (props) => {

  const { t } = useTranslation('common');
  const user_info = props.user_state && props.user_state.user_info;

  let auth_token = props.user_state ? props.user_state.auth_token : '';
  let user_id = props.user_state ? props.user_state.user_id : 0;
  let user_email = props.user_state ? props.user_state.user_email : '';

  const [addressList, setAddressList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addressMode, setAddressMode] = useState('IS');
  const [addressEdit, setAddressEdit] = useState(false);


  const { shipping_state, shippingDispatch } = useContext(ShippingContext);

  let selected_shipping_id = shipping_state.shipping_address ? shipping_state.shipping_address.cad_id : 0;

  const selectAddress = (data) => {
    shippingDispatch({ type: 'SHIPPING-ADDRESS-INFO', value: data });
  }

  useEffect(() => {
    if (shipping_state.user_shipping_list.length > 0) {
      setAddressList(shipping_state.user_shipping_list);
      setLoading(false);
    } else {
      props.getAddressListFun();
    }
    setTimeout(() => {
      setLoading(false)
    }, 4000);

    if (user_info && user_info.cust_cr_uid === 'GUEST-USER' && shipping_state.shipping_address && selected_shipping_id > 0) {
      setAddressMode('UP');
      setAddressEdit(shipping_state.shipping_address)
    }
  }, [shipping_state.user_shipping_list]);



  const [activekeyitem, setActivekeyitem] = useState(!loading && addressList.length == 0 ? 1 : 0);


  function CustomToggle({ children, eventKey, callback }) {
    // console.log(eventKey,'eventKey');
    const currentEventKey = React.useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );
    const isCurrentEventKey = currentEventKey.activeEventKey == eventKey;
    setActivekeyitem(currentEventKey.activeEventKey)
    return (
      <button
        type="button"
        className={isCurrentEventKey ? "accordion-button" : "accordion-button collapsed"}
        onClick={decoratedOnClick}
      >
        <span className="iconcollapse"> </span> <span className="faq-question-text">{children} </span>
      </button>
    );
  }

  if ((user_info && user_info.cust_cr_uid === 'GUEST-USER') || (addressList && addressList.length == 0)) {
    return (
      <div className="ShippingAddress">
        <Suspense fallback={<ShippingPageSkeleton />}>
          {loading ? <ShippingPageSkeleton /> : (
            <>
              <Accordion>
                <Card>
                  <Card.Body>
                    <AddressForm
                      mode={addressMode}
                      addressEdit={addressEdit}
                      AddressListFun={props.getAddressListFun}
                    />
                  </Card.Body>
                </Card>
              </Accordion>
            </>)}
        </Suspense>
      </div>
    )

  } else {
    return (
      <div className="ShippingAddress">
        <Suspense fallback={<ShippingPageSkeleton />}>
          {loading ? <ShippingPageSkeleton /> : (
            <>
              <Accordion defaultActiveKey={activekeyitem} >
                <Card>
                  <Card.Header className="accordion-item p-0">
                    <CustomToggle eventKey={0}>{t("MyAddresses")}</CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={0}>
                    <Card.Body>
                      <div className="shippingAddressCard">
                        <div className="grid">
                          {addressList.map((data, i) => {
                            return (
                              <label className="card" key={i}>
                                <input name="plan" className="radio" type="radio" defaultChecked={data.cad_id == selected_shipping_id ? true : false} onClick={() => selectAddress(data)} />
                                <p className="plan-type-heading"> {data.cad_address_type}</p>
                                <span className="plan-details">
                                  <div className="plan-box">
                                    <h6 className="plan-type">{data.cad_first_name} {data.cad_last_name}</h6>
                                    <p>{data.cad_street_name_no} {data.cad_building_name_no} {data.cad_floor_no} {data.cad_apartment_no} {data.cad_nearest_landmark}
                                      {data.cad_city_area_desc ? data.cad_city_area_desc + ',' : ''} {data.cad_city_desc ? data.cad_city_desc + ',' : ''} {data.cad_state_desc} {data.cad_country} {data.cad_postal_code} </p>
                                    <p> {t("Landmark")} :{data.cad_nearest_landmark}</p>
                                    <p>{t("Mobile")} :{data.cad_contact_number}</p>
                                    {data.cad_phone_number ? <p>{t("Phone")} :{data.cad_phone_number}</p> : ''}
                                    <p>{t("Email")} :{user_email}</p>
                                  </div>

                                </span>
                              </label>
                            )
                          })
                          }
                        </div>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card>
                  <Card.Header className="accordion-item p-0">
                    <CustomToggle eventKey={1}>{t("AddNewAddress")}</CustomToggle>
                  </Card.Header>

                  <Accordion.Collapse eventKey={1} >
                    <Card.Body>
                      <AddressForm
                        mode={addressMode}
                        addressEdit={addressEdit}
                        AddressListFun={props.getAddressListFun}
                      />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              <Row className='continue_btn mt-3'>
                {addressList.length > 0 && activekeyitem != 1 ?
                  <Col xs={12} md={5} className={shipping_state.shipping_address && shipping_state.shipping_address.cad_id ? 'ms-auto' : 'ms-auto even_none'} >
                    {shipping_state.shipping_address && shipping_state.shipping_address.cad_id ? <LinkComponent className="bg-sg-primary text-dark py-3 d-block text-center fs-5 fw-bold" href={`/cart/delivery`} disabled={shipping_state.shipping_address && shipping_state.shipping_address.cad_id ? false : true}>{t('Continue')}</LinkComponent> :
                      <span className="bg-sg-primary text-dark py-3 d-block text-center fs-5 fw-bold even_none">{t('Continue')}</span>
                    }

                  </Col>
                  : ''}
              </Row>
            </>
          )}
        </Suspense>
      </div>


    )
  }
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress);