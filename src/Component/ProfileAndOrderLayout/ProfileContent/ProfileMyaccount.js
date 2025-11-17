import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row, Tab, Nav, Button } from 'react-bootstrap';
import LinkComponent from '@components/Link';
import ChangeMobile from '../ProfileModal/ChangeMobile';
import ChangeEmail from '../ProfileModal/ChangeEmail';
import { useTranslation } from 'next-i18next'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { connect } from "react-redux";

const ProfileMyaccount = (props) => {
  const { t } = useTranslation('common');
 // console.log(props, 'propsprops');
  const [mobileModalShow, setMobileModalShow] = useState(false);
  const [emailModalShow, setEmailModalShow] = useState(false);
  let user_info = props.user_state ? props.user_state.user_info : [];

  return (
    <>
      <section className="ProfileMyaccount mt-15 px-2">
        <Tab.Container id="ProfileMyorder-tab" defaultActiveKey="first">
          <Row>
            <Col sm={12}>
              <Nav variant="pills" className="flex-row tab-nav">
                <Nav.Item>
                  <Nav.Link eventKey="first"> {t('AccountDetails')} </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={12} className="tab-content">
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Row>
                    <Col sm={12} className="user-detail">
                      <table>
                        <tbody>
                          <tr>
                            <th> {t('Email')} </th>
                            <td>{props.cust_email_id ? props.cust_email_id : '--'}
                              {/* <span style={{color:'#4183c4',cursor:'pointer'}} role="button"  onClick={() => setEmailModalShow(true)} >{t('Edit')}  </span> */}
                            </td>
                          </tr>
                          <tr>
                            <th>{t('FirstName')} </th>
                            <td>{props.cust_first_name ? props.cust_first_name : '--'}</td>
                          </tr>
                          <tr>
                            <th>  {t('LastName')}</th>
                            <td>{props.cust_last_name ? props.cust_last_name : '--'}</td>
                          </tr>
                          <tr>
                            <th>  {t('Mobile')} </th>
                            <td>{props.cust_mobile_no ? props.cust_mobile_no : '--'}
                              <span style={{ color: '#4183c4' }} role="button" onClick={() => setMobileModalShow(true)} >
                                <FontAwesomeIcon icon={faEdit} size="lg" title={t('update_mobile_no')} style={{ padding: '2px 2px 2px 7px' }} />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <th>  {t('Country')} </th>
                            <td>{props.cust_nationality ? props.cust_nationality : '--'} </td>
                          </tr>
                          {props.cust_city_desc ? <tr>
                            <th>  {t('City')} </th>
                            <td>{props.cust_city_desc ? props.cust_city_desc : '--'}</td>
                          </tr> : ''}
                          <tr>
                            <th>  {t('JoinedDate')}  </th>
                            <td>{props.joined_date ? props.joined_date : '--'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                    <Col sm={12}>
                      <div className="border-button">
                        <LinkComponent className="text-dark" href="/profile/edit-profile" ><span> {t('Edit')} </span></LinkComponent>
                      </div>
                      {['OLD-SITE', 'FIRST-USER-LOGIN'].indexOf(user_info.cust_cr_uid) >= 0 ?
                        <div className="border-button">
                          <LinkComponent className="text-dark" href="/profile/profileChangePassword" ><span> {t('Changepassword')} </span></LinkComponent>
                        </div>
                        : ''}
                    </Col>
                  </Row>

                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </section>
      <ChangeMobile {...props}
        show={mobileModalShow}
        sectionName='MobileWindow'
        onHide={() => setMobileModalShow(false)}
      />
      <ChangeEmail
        show={emailModalShow}
        onHide={() => setEmailModalShow(false)}
      />
    </>
  );
}


const mapStateToProps = (state) => ({ user_state: state.UserReducer, manu_and_site_state: state.MenusItemReduser });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMyaccount);

