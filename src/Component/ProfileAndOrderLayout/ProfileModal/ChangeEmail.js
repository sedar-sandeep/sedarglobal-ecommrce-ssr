import React, { useState } from 'react';
import { Col, Container, Row, Tab, Nav, Button, Modal, Form } from 'react-bootstrap';
import LinkComponent from '@components/Link';
import $ from 'jquery';
import { useForm } from "react-hook-form";
import LaddaButton from 'react-ladda';
import ApiDataService from '../../../services/ApiDataService';
import OtpInput from "react-otp-input";
import GLOBALS from '../../../Globals';
import { connect } from "react-redux";
import { useTranslation } from 'next-i18next'
import Cookies from 'js-cookie';

let auth_token = Cookies.get('AUTH_TOKEN');
let user_email = Cookies.get('USER_EMAIL');
let user_id = Cookies.get('USER_ID');

const request_otp_url = 'dashboard/request_email_mobile_change/' + user_id;
const verify_otp_url = `dashboard/change_email_mobile_after_verify/${user_id}`;

const OTPWindow = (props) => {
  const { t } = useTranslation('common');
  const [OTP, setOTP] = useState()
  const handleChangeOTP = (otp) => {
    setOTP(otp)
  }
  //console.log(OTP)
  return (
    <section className="section1">
      <Row>
        <Col sm={12} className="otp_input pb-2 pt-2">
          <OtpInput
            value={OTP}
            onChange={handleChangeOTP}
            numInputs={6}
            isInputNum={true}
            className="otp_value"
          // ref={props.register({ required: true })}
          />
          <span className="text-danger inputerror">{props.errors?.otp_value && props.errors?.otp_value.message} </span>
          <Form.Control
            type="hidden"
            className="form-control inputText"
            name="otp_value"
            value={OTP}
            {...props.register('otp_value', { required: true })}
          // ref={props.register({ required: true })}
          />
        </Col>
      </Row>


      <input
        type="hidden"
        className="form-control inputText"
        name="cust_email_id"
        {...props.register('cust_email_id', {})}
      // ref={props.register({})}
      />

      <input
        type="hidden"
        className="form-control inputText"
        name="request_id"
        {...props.register('request_id', { required: true })}
      // ref={props.register({ required: true })}
      />
      <input
        type="hidden"
        name="url"
        value={verify_otp_url}
        {...props.register('url', { required: true })}
      // ref={props.register({ required: true })}
      />
      <input
        type="hidden"
        name="open_window"
        value='OTPWindow'
        {...props.register('open_window', { required: true })}
      // ref={props.register({ required: true })}
      />
      <input type="hidden" placeholder="cust_user_id" name="cust_user_id"
        {...props.register('cust_user_id', { required: true })}
        // ref={props.register({ required: true })}
        value={user_email} />
      {props.errors?.cust_user_id && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')} </span>}

      <input type="hidden" placeholder="auth_token" name="auth_token"
        {...props.register('auth_token', { required: true })}
        // ref={props.register({ required: true })}
        value={auth_token}
      />
      {props.errors?.auth_token && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')} </span>}
      <span className="text-danger "> {props.errors?.cust_email_id && props.errors?.cust_email_id.message}</span>
      <span className="text-danger "> {props.errors?.request_id && props.errors?.request_id.message}</span>

      <div className="color-button">
        <LaddaButton loading={props.loading_btn} type="submit" className="sub_btn"><span>{t('VerifyOTP')}  </span></LaddaButton>
      </div>
    </section>
  )
}

const EmailWindow = (props) => {
  const { t } = useTranslation('common');
  return (
    <section className="section2">
      <Row>
        <Col sm={12}>
          <Form.Group className="floating-field">
            <Form.Control
              placeholder=" "
              type="email"
              className="form-control inputText"
              name="cust_email_id"
              {...props.register('cust_email_id', { required: true })}
            // ref={props.register({ required: true })}
            />
            <label>{t('EmailAddress')} </label>
          </Form.Group>
          <span className="text-danger inputerror"> {props.errors?.cust_email_id && props.errors?.cust_email_id.message} </span>
        </Col>
        <Col sm={4}>

          <div className="hidden_filed">

            <Form.Control
              type="hidden"
              name="url"
              value={request_otp_url}
              {...props.register('url', { required: true })}
            // ref={props.register({ required: true })}
            />
            <Form.Control
              type="hidden"
              name="open_window"
              value='EmailWindow'
              {...props.register('open_window', { required: true })}
            // ref={props.register({ required: true })}
            />
            <Form.Control type="hidden" placeholder="cust_user_id" name="cust_user_id"
              {...props.register('cust_user_id', { required: true })}
              // ref={props.register({ required: true })}
              value={user_email} />
            {props.errors?.cust_user_id && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')} </span>}

            <Form.Control type="hidden" placeholder="auth_token" name="auth_token"
              {...props.register('auth_token', { required: true })}
              // ref={props.register({ required: true })}
              value={auth_token} />
            {props.errors?.auth_token && <span className="text-danger fs-6 fw-lighter form-input-error"> {t('Thisfieldisrequired')}</span>}
          </div>
          <div className="color-button">
            <LaddaButton loading={props.loading_btn} type="submit" className="sub_btn" ><span>{t('Continue')}  </span></LaddaButton>
          </div>
        </Col>
      </Row>
    </section>
  )
}


const ChangeEmail = (props) => {

  const { register, handleSubmit, errors, setValue, setError, getValues, clearErrors } = useForm();
  const [apiError, setApiError] = useState();
  const [loading_btn, setLoading_btn] = useState(false);
  const [sectionName, setSectionName] = useState('EmailWindow');
  const { t } = useTranslation('common');

  const onSubmit = (post_data) => {
    setLoading_btn(true);
    //console.log(post_data);
    //site_id

    ApiDataService.post(post_data.url, post_data).then(response => {
      setLoading_btn(false);
      let res_data = response.data;
      //
      if (res_data.error_message == 'Success' && res_data.return_status == 0) {
        //
        clearErrors();
        if (post_data.open_window == 'EmailWindow') {
          setSectionName('OTPWindow');
          let result_data = res_data.result;
         
          setValue('cust_email_id', post_data.cust_email_id);
          setValue('request_id', result_data.requestId);
          setApiError(res_data.error_message);
          $('.error_text').removeClass('alert-danger');
          $('.error_text').addClass('alert-success');
        } else {
          let result_data = res_data.result;
          $('.section1').hide();
          props.updateEmail(GLOBALS.user_reducer.UPDATE_EMAIL, result_data);
          // userprofielfun={userprofielfun}
        }

      } else if (res_data.return_status == -212) {
        //
        setApiError(res_data.error_message);
        $('.error_text').removeClass('alert-success');
        $('.error_text').addClass('alert-danger');
      }
      else {
        //
        Object.keys(res_data.result).map(function (key) {
          if (res_data.result[key] && key.indexOf(['status', 'user_detail']) == -1 && res_data.result[key].length > 1) {
            setError(key, { message: res_data.result[key] });
          }
        });
        setApiError(res_data.error_message);
        $('.error_text').removeClass('alert-success');
        $('.error_text').addClass('alert-danger');
      }

    }).catch(e => {
      setLoading_btn(false);
      //console.log(e);
      setApiError(e.message);
    });
  }



  const section = () => {
    if (sectionName == 'OTPWindow') {
      return <OTPWindow register={register} errors={errors} loading_btn={loading_btn} setSectionName={setSectionName} setValue={setValue} getValues={getValues} clearErrors={clearErrors} {...props}></OTPWindow>;
    } else {
      return <EmailWindow register={register} errors={errors} loading_btn={loading_btn} setSectionName={setSectionName} setValue={setValue} getValues={getValues} clearErrors={clearErrors} {...props}></EmailWindow>;
    }
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
        <div className="formaddedit py-5 px-4">
          <div> <span onClick={props.onHide} className="close-button">✕</span> </div>
          <div className="error_text" style={{ padding: '6px' }}>{apiError}</div>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            {section()}
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
ChangeEmail.propTypes = {};

ChangeEmail.defaultProps = {};

const mapDispatchToProps = (dispatch) => {
  return {
    updateEmail: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}

export default connect(null, mapDispatchToProps)(ChangeEmail);