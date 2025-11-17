import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import { useForm } from "react-hook-form";
import { Col, Container, Row, Tab, Nav, Form, FloatingLabel, Alert } from 'react-bootstrap';
import LinkComponent from '@components/Link';
import Cookies from 'js-cookie';
import LaddaButton from 'react-ladda';
import ApiDataService from '../../../services/ApiDataService';
import { useTranslation } from 'next-i18next';


const ProfileChangePassword = (props) => {
  const { t } = useTranslation('common');
  let auth_token = Cookies.get('AUTH_TOKEN');
  const [apiError, setApiError] = useState();
  const [cityList, setcityList] = useState();
  const [alert, setAlert] = useState(true);
  const [variant, setVariant] = useState('danger');
  const [loading_btn, setLoading_btn] = useState(false);

  const { register, handleSubmit, watch, formState: { errors }, setValue, setError, getValues } = useForm({
    defaultValues: props.userData
  });

  const new_password = useRef({});
  new_password.current = watch("new_password", "");


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
  }

  const oldPwdValidate = (postdata) => {
    let post_data = { ...postdata, 'cust_user_id': props.userData.cust_email_id, 'auth_token': auth_token, current_password: postdata.current_password };
    if (post_data.current_password.length > 4) {
      ApiDataService.post(`dashboard/change_pwd_request/${props.userData.cust_id}`, post_data).then(response => {
        let res_data = response.data;
        //
        if (res_data.return_status == '0' || res_data.error_message == 'Success') {
          //$('.error_text').removeClass('alert-danger');
          //$('.error_text').addClass('alert-success');
          let result_data = res_data.result;
          setValue('request_id', result_data.request_id);
          
          setApiError('Old password have matched.');

          formSubmit({ ...post_data, request_id: result_data.request_id });


        } else if (res_data.return_status == -404 || res_data.error_message == 'Error') {
          //$('.error_text').removeClass('alert-success');
          // $('.error_text').addClass('alert-danger');
          setApiError('Old password do not match.');
          //

        }
        else {
          // $('.error_text').removeClass('alert-success');
          //$('.error_text').addClass('alert-danger');
          setApiError(res_data.error_message);
        }

      }).catch(e => {
        setLoading_btn(false);
        //console.log(e);
        setApiError(e.message);
      });

      setTimeout(() => {
        setAlert(false);
      }, 5000);
    }
  }

  const onSubmit = (post_data) => {
    //console.log(post_data.current_password);
    oldPwdValidate(post_data);
    //console.log(post_data);
    
  }

  const formSubmit = (post_data) => {
    setLoading_btn(true);

    ApiDataService.post(`dashboard/change_pwd_confirm/${props.userData.cust_id}`, post_data).then(response => {
      setLoading_btn(false);
      let res_data = response.data;
      //
      if (res_data.return_status == '0' || res_data.error_message == 'Success') {
        //$('.error_text').removeClass('alert-danger');
        //$('.error_text').addClass('alert-success');

        let result_data = res_data.result;
        
        setApiError('Password successfully changed');


      } else if (res_data.return_status == -111 || res_data.error_message == 'Error') {
        setApiError(res_data.error_message);
        //$('.error_text').removeClass('alert-success');
        //$('.error_text').addClass('alert-danger');
        

        if (res_data.result[key] && key != 'status') {
          setError(key, { message: res_data.result[key] });
        }
      }
      else {
        //$('.error_text').removeClass('alert-success');
        //$('.error_text').addClass('alert-danger');
        //
        setApiError(res_data.result.otp_value);
        setApiError(res_data.error_message);
      }

    }).catch(e => {
      // $('.error_text').removeClass('alert-success');
      // $('.error_text').addClass('alert-danger');
      setLoading_btn(false);
      //console.log(e);
      setApiError(e.message);
    });

    setTimeout(() => {
      setAlert(false);
    }, 5000);
  }

  return (
    <section className="ProfileChangePassword mt-15 px-2">
      <Tab.Container id="ProfileMyorder-tab" defaultActiveKey="first">
        <Row>
          <Col sm={12}>
            {/* <div className="error_text" style={{ padding: '8px' }}>{apiError}</div> */}
            {alert && apiError && (
            <Alert key={variant} variant={variant}>
                {apiError}
            </Alert>
            )}
            <Nav variant="pills" className="flex-row tab-nav">
              <Nav.Item>
                <Nav.Link eventKey="first">{t("ChangePassword")} </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={12} className="tab-content">
            <Tab.Content>
              <Tab.Pane eventKey="first" transition={false}>
                <div>
                  <Row>
                    <div className="change-password ">
                      <Col sm={12}>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                          <Row>
                            <Col sm={12}>
                              <Row>
                                <Col sm={12} md={12} xl={6}>
                                  <FloatingLabel controlId="floatingSelectGrid" label={t("OldPassword")} className="my-4">
                                    <Form.Control type="password" name="current_password" placeholder=""
                                      // onChange={(e) => oldPwdValidate(e.target.value)}
                                      {...register('current_password', { required: true })}
                                    />

                                  </FloatingLabel>
                                  {errors?.current_password && <span className="text-danger fs-6 fw-lighter form-input-error">{errors?.current_password.message}</span>}
                                </Col>
                              </Row>
                              <Row>
                                <Col sm={12} md={12} xl={6}>

                                  <FloatingLabel controlId="floatingSelectGrid" label={t("NewPassword")}  className="my-4">
                                    <Form.Control
                                      type="password"
                                      name="new_password"
                                      placeholder=""
                                      onChange={handleChange}
                                      {...register('new_password', {
                                        required: "You must specify a password",
                                        minLength: {
                                          value: 8,
                                          message: "Password must have at least 8 characters"
                                        },
                                        pattern: {
                                          value: /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g,
                                          message: "invalid password"
                                        }
                                      })}
                                    />
                                    <div className="validation position-abolute"><p >8 Characters, 1 Special, 1 Uppercase, 1 Numeric</p></div>
                                  </FloatingLabel>
                                  {errors?.new_password && <span className="text-danger fs-6 fw-lighter form-input-error">{errors?.new_password.message}</span>}
                                </Col>
                              </Row>
                              <Row>
                                <Col sm={12} md={12} xl={6}>
                                  <FloatingLabel controlId="floatingSelectGrid" label={t("Confirmpassword")} className="my-4">
                                    <Form.Control
                                      type="password"
                                      name="confirm_password"
                                      placeholder=" "
                                      onChange={handleChange}
                                      {...register('confirm_password', {
                                        validate: value =>
                                          value === new_password.current || "The passwords do not match"
                                      })}
                                    
                                    />
                                  </FloatingLabel>
                                  {errors?.confirm_password && <span className="text-danger fs-6 fw-lighter form-input-error">{errors?.confirm_password.message}</span>}
                                </Col>
                              </Row>

                              <div className="hidden_filed">
                                <input
                                  type="hidden"
                                  className="form-control inputText"
                                  name="request_id"
                                  onChange={handleChange}
                                  {...register('request_id')}
                                />
                                {errors?.request_id && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')} </span>}

                                <Form.Control type="hidden" placeholder="cust_user_id" name="cust_user_id" onChange={handleChange}
                                  {...register('cust_user_id')}
                                  value={props.userData.cust_email_id} />
                                {errors?.cust_user_id && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')} </span>}

                                <Form.Control type="hidden" placeholder="auth_token" name="auth_token" onChange={handleChange}
                                  {...register('auth_token')}
                                  value={auth_token} />
                                {errors?.auth_token && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')} </span>}
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col sm={12} className="button-section">
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
ProfileChangePassword.propTypes = {};

ProfileChangePassword.defaultProps = {};

export default ProfileChangePassword;
