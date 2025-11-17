import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { useForm } from "react-hook-form";
import { Col, Container, Row, Tab, Nav, Form, FloatingLabel } from 'react-bootstrap';
import LinkComponent from '@components/Link';
import LaddaButton from 'react-ladda';
import ApiDataService from '../../../services/ApiDataService';
import { connect } from "react-redux";
import Cookies from 'js-cookie';
import 'react-phone-number-input/style.css'
import en from 'react-phone-number-input/locale/en';
import ar from 'react-phone-number-input/locale/ar';
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';

import { useTranslation } from 'next-i18next'
import { langName, cn_iso } from '@utils/i18n';

const ProfileEditAccount = (props) => {
  const { t } = useTranslation('common');
  let auth_token = Cookies.get('AUTH_TOKEN');
  const [apiError, setApiError] = useState();
  const [cityList, setcityList] = useState();
  const [loading_btn, setLoading_btn] = useState(false);
  const [countryList, setcountryList] = useState();

  let user_info = props.user_state ? props.user_state.user_info : [];
  console.log('user_info', user_info)
  const [phoneNo, setphoneNumber] = useState(user_info.cust_mobile_no);

  const { register, handleSubmit, watch, formState: { errors }, setValue, setError, getValues } = useForm({
    defaultValues: user_info
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    var values = '';
    if (name === 'active_yn') {
      let checkBox = e.target.checked;
      values = (checkBox ? 'Y' : 'N');
    } else {
      values = value;
    }
    setValue(name, values);
    //console.log(name, values);
  }

  const getCitylist = (val) => {
    ApiDataService.getAll('fetch/country_state_lov', { country_iso: val }).then(response => {
      //  console.log(response.data);
      let res_data = response.data;
      if (res_data.return_status == '0' || res_data.error_message == 'Success') {
        let list = response.data.result.map((data, i) =>
          <option value={data.state_code} key={i} selected={props.userData && props.userData.cust_city == data.state_code ? true : false}>{data.state_desc}</option>
        );
        setcityList(list);
      } else {
        /* setApiError(res_data.error_message);
         $('.error_text').removeClass('alert-success');
         $('.error_text').addClass('alert-danger');*/

      }
    }).catch(e => {
      console.log(e);
    });
  }

  const onSubmit = (post_data) => {
    if (!isValidPhoneNumber(phoneNo)) {
      return true;
    }
    //console.log(post_data);
    setLoading_btn(true);

    ApiDataService.post(`dashboard/update_profile/${props.userData.cust_id}`, post_data).then(response => {
      setLoading_btn(false);
      let res_data = response.data;
      if (res_data.return_status == '0' || res_data.error_message == 'Success') {
        $('.error_text').removeClass('alert-danger');
        $('.error_text').addClass('alert-success');
        //let result_data = res_data.result;
        setApiError('Your profile updated successfully.');
        props.userprofielfun();
      } else if (res_data.return_status == -111 || res_data.error_message == 'Error') {
        setApiError(res_data.error_message);
        $('.error_text').removeClass('alert-success');
        $('.error_text').addClass('alert-danger');


        Object.keys(res_data.result).map(function (key) {
          if (res_data.result[key] && key != 'status') {
            setError(key, { message: res_data.result[key] });
          }
        })
      }
      else {
        $('.error_text').removeClass('alert-success');
        $('.error_text').addClass('alert-danger');
        //
        setApiError(res_data.result.otp_value);
        setApiError(res_data.error_message);
      }

    }).catch(e => {
      $('.error_text').removeClass('alert-success');
      $('.error_text').addClass('alert-danger');
      setLoading_btn(false);
      //console.log(e);
      setApiError(e.message);
    });
  }


  useEffect(() => {
    ApiDataService.getAll('fetch/country_lov').then(response => {
      let res_data = response.data;
      let list = res_data.result.map((data, i) => {
        if (user_info && user_info.cust_nationality == data.country_iso) {
          getCitylist(data.country_iso);
        }
        return (<option value={data.country_iso} key={i} selected={user_info && user_info.cust_nationality == data.country_iso ? true : false}>{data.country_desc}</option>)
      }
      );
      setcountryList(list);
    }).catch(e => {
      console.log(e);
    });
    props.userprofielfun();
  }, []);

  console.log(errors, 'errors..');
  return (
    <section className="ProfileEditAccount mt-15 p-3">
      <Tab.Container id="ProfileMyorder-tab" defaultActiveKey="first">
        <Row>
          <Col sm={12} className="p-0">
            <div className="error_text" style={{ padding: '8px' }}>{apiError}</div>
            <Nav variant="pills" className="flex-row tab-nav">
              <Nav.Item>
                <Nav.Link eventKey="first">{t('AccountDetails')}</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={12} className="tab-content">
            <Tab.Content>
              <Tab.Pane eventKey="first" transition={false}>
                <div>
                  <Row>
                    <div className="edit-Profile">
                      <Col sm={12}>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                          <Row>
                            <Col sm={12}>
                              <div className="heading-section">
                                <h3>{t('EditProfile')} </h3>
                              </div>
                            </Col>


                            <Col sm={6}>
                              <Row>
                                <Col sm={3}>
                                  <FloatingLabel className="my-2 my-md-4" label={t("Select")} >
                                    {/* <Form.Control
                                      as="select"
                                      name="cust_title"
                                      className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                                      onChange={handleChange}
                                      {...register('cust_title', { required: true })}
                                      // ref={register({ required: true })}
                                    >
                                      <option value="Mr">Mr</option>
                                      <option value="Mrs">Mrs</option>
                                      <option value="Miss">Miss</option>
                                    </Form.Control> */}

                                    <Form.Select className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                                      name="cust_title" defaultValue={props.userData ? props.userData.cust_title : ''} {...register('cust_title', { required: true })} >
                                      <option value="Mr">Mr</option>
                                      <option value="Mrs">Mrs</option>
                                      <option value="Miss">Miss</option>
                                    </Form.Select>
                                  </FloatingLabel>
                                </Col>
                                <Col sm={9}>
                                  <FloatingLabel className="my-2 my-md-4" label={t("FirstName")}>
                                    <Form.Control
                                      type="text"
                                      placeholder=""
                                      name="cust_first_name"
                                      className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                                      onChange={handleChange}
                                      {...register('cust_first_name', { required: true })}
                                    // ref={register({ required: true })}
                                    />
                                  </FloatingLabel>
                                </Col>
                              </Row>
                              {errors?.cust_title && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                              {errors?.cust_first_name && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                            </Col>
                            <Col sm={6}>
                              <FloatingLabel className="my-2 my-md-4" label={t("LastName")}>
                                <Form.Control
                                  type="text"
                                  placeholder=" "
                                  name="cust_last_name"
                                  className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                                  onChange={handleChange}
                                  {...register('cust_last_name', { required: true })}
                                // ref={register({ required: true })}
                                />
                              </FloatingLabel>
                              {errors?.cust_last_name && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                            </Col>

                            <Col sm={6}>

                              <FloatingLabel className="my-1 email_disable" label="Email *">
                                <Form.Control
                                  type="text"
                                  placeholder="Email *"
                                  name="cust_email_id"
                                  className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                                  onChange={handleChange}
                                  {...register('cust_email_id', { required: true })}
                                  // ref={register({ required: true })}
                                  value={props.userData.cust_email_id}
                                  readOnly="true"
                                />
                              </FloatingLabel>
                              {errors?.cust_email_id && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                            </Col>

                            <Col sm={6}>
                              <Form.Group className="position-relative my-4">
                                {/* <PhoneInput
                                  country={cn_iso ? cn_iso.toLowerCase() : 'ae'}
                                  value={props.userData.cust_mobile_no}
                                  inputClass=" mobile_no_in"
                                  disabled="true"
                                  className="form-control"
                                /> */}
                                <PhoneInput
                                  international
                                  countryCallingCodeEditable={false}
                                  defaultCountry={cn_iso ? cn_iso.toLowerCase() : 'US'}
                                  labels={langName == 'ar' ? ar : en}
                                  className="signupmobile inputText form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                                  placeholder="Enter phone number"
                                  value={props.userData.cust_mobile_no}
                                  onChange={(value) => setphoneNumber(value)}
                                  error={phoneNo ? (isValidPhoneNumber(phoneNo) ? undefined : 'Invalid phone number') : 'Phone number required'}
                                />
                                <Form.Control
                                  type="hidden"
                                  placeholder=" "
                                  name="cust_mobile_no"
                                  onChange={handleChange}
                                  {...register('cust_mobile_no', { required: true })}
                                  // ref={register({ required: true })}
                                  readOnly="true"
                                  value={phoneNo && formatPhoneNumberIntl(phoneNo).replace(/ /g, '')} />
                                <label className="selectlabel2" > {t("MobileNumber")} </label>
                              </Form.Group>
                              {phoneNo && !isValidPhoneNumber(phoneNo) && (
                                <>
                                  <span className="text-danger fs-6 fw-lighter form-input-error">
                                    {t('please_enter_a_valid_number')}
                                  </span>
                                  <br />
                                </>
                              )}
                              {errors?.cust_mobile_no && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                            </Col>
                            <Col sm={6}>
                              <FloatingLabel controlId="floatingSelectGrid" label={t("Country")} className="my-4">
                                <Form.Select className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                                  name="cust_nationality" defaultValue={user_info.cust_nationality ? user_info.cust_nationality : cn_iso} onChange={(e) => { getCitylist(e.target.value) }} >
                                  <option value="">{t('SelectCountry')} </option>
                                  {countryList}
                                </Form.Select>


                                {errors?.cust_nationality && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                              </FloatingLabel>
                            </Col>
                            <Col sm={6}  >
                              <FloatingLabel controlId="floatingSelectGrid" label={t("City")} className="my-4">
                                <Form.Select className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                                  name="cust_city" defaultValue={props.userData ? props.userData.cust_city : ''} {...register('cust_city', { required: true })} >
                                  <option value="">{t('SelectStateCityCity')} </option>
                                  {cityList}
                                </Form.Select>
                                {/* <Form.Control
                                  as="select"
                                  name="cust_city"
                                  onChange={handleChange}
                                  {...register('cust_city', { required: true })}
                                  // ref={register({ required: true })}
                                >
                                  {cityList}
                                </Form.Control> */}
                              </FloatingLabel>
                              {errors?.cust_city && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                            </Col>

                            <Col sm={6} className="mt-4">
                              <Row>
                                <Col sm={6} >
                                  <Form.Check
                                    type="radio"
                                    label={t("Male")}
                                    name="cust_gender"
                                    id="male"
                                    value="M"
                                    {...register('cust_gender', { required: true })}
                                  // checked={user_info?.cust_gender == 'F' ? true : false}
                                  />
                                </Col>
                                <Col sm={6} >
                                  <Form.Check
                                    type="radio"
                                    label={t("Female")}
                                    name="cust_gender"
                                    id="female"
                                    value="F"
                                    // checked={user_info?.cust_gender == 'F' ? true : false}
                                    {...register('cust_gender', { required: true })}
                                  />
                                </Col>
                              </Row>
                              {errors?.cust_gender && <div className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</div>}
                            </Col>
                          </Row>

                          <Row>
                            <Col sm={12} className="button-section text-end">

                              <div className="hidden_filed">
                                <Form.Control
                                  type="hidden"
                                  placeholder="cust_user_id"
                                  name="cust_user_id"
                                  onChange={handleChange}
                                  {...register('cust_user_id', { required: true })}
                                  // ref={register({ required: true })}
                                  value={props.userData.cust_email_id}
                                />
                                {errors?.cust_user_id && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')} </span>}

                                <Form.Control
                                  type="hidden"
                                  placeholder="auth_token"
                                  name="auth_token"
                                  onChange={handleChange}
                                  {...register('auth_token', { required: true })}
                                  // ref={register({ required: true })}
                                  value={auth_token}
                                />
                                {errors?.auth_token && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                              </div>

                              <div className="border-button">
                                <LinkComponent className="" href="/profile/account-setting"  ><span>{t('Cancel')}  </span></LinkComponent>
                              </div>
                              <div className="color-button">
                                <LaddaButton loading={loading_btn} type="submit" className="submit_btn"><span>{t('Submit')} </span></LaddaButton>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </Col>
                    </div>
                  </Row>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

    </section>
  )
}


const mapStateToProps = (state) => ({ user_state: state.UserReducer, manu_and_site_state: state.MenusItemReduser });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditAccount);


