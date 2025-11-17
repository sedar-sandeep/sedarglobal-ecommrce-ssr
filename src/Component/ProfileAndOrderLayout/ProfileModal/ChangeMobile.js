import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Modal, Col, Form, Row, InputGroup, FormControl } from 'react-bootstrap'
import OtpInput from "react-otp-input";
import LinkComponent from '@components/Link';

import ApiDataService from '../../../services/ApiDataService';
import { langName, cn_iso } from '@utils/i18n';

import LaddaButton from 'react-ladda';
import { connect } from "react-redux";
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en';
import ar from 'react-phone-number-input/locale/ar';
import('react-phone-number-input/style.css');
import('react-intl-tel-input/dist/main.css');
import Cookies from 'js-cookie';

let auth_token = Cookies.get('AUTH_TOKEN');
let user_email = Cookies.get('USER_EMAIL');
let user_id = Cookies.get('USER_ID');

const request_otp_url = 'dashboard/request_email_mobile_change/' + user_id;
const verify_otp_url = `dashboard/change_email_mobile_after_verify/${user_id}`;

import { useTranslation } from 'next-i18next';


const OTPWindow = (props) => {
  const { t } = useTranslation('common');
  props.setValue('url', verify_otp_url);
  props.setValue('open_window', 'OtpWindow');
  const [OTP, setOTP] = useState()
  const handleChangeOTP = (otp) => {
    props.setValue('otp_value', otp);
    setOTP(otp)
  }

  let m_number = props?.getValues('user_id') ? props?.getValues('user_id') : props?.getValues('cust_mobile_no') ? props?.getValues('cust_mobile_no') : props?.getValues('cust_email_id');
  return (
    <section className="section1">
      <div style={{ fontSize: "15px" }}> {t("TheOTPhasbeensentto")} xxxxxx{m_number ? m_number.slice(-4) : ''}
        <span className="orange_color_text" style={{ float: 'right', marginTop: '5px' }} onClick={() => { props.setSectionName('LoginFormModel') }}>{t("Change")}  </span>
      </div>
      <Row>
        <Col sm={12} className="otp_input pb-2 pt-2">
          {OTP}
          <OtpInput
            value={OTP}
            onChange={handleChangeOTP}
            numInputs={6}
            isInputNum={true}
            className="otp_value"
          />
          <span className="text-danger inputerror">{props?.errors && props?.errors?.otp_value && props?.errors?.otp_value.message} </span>
          <Form.Control
            type="hidden"
            className="form-control inputText"
            name="otp_value"
            value={OTP}
            {...props?.register('otp_value')}
          />
        </Col>
      </Row>

      <input
        type="hidden"
        className="form-control inputText"
        name="request_id"
        value={props.getValues('request_id')}
      />
      <input
        type="hidden"
        name="url"
        value={verify_otp_url}
        {...props?.register('url')}
      />
      <input
        type="hidden"
        name="login_type"
        value="Login_with_OTP"
        {...props?.register('login_type')}
      />

      <span className="text-danger "> {props.errors.cust_mobile_no && props.errors.cust_mobile_no.message}</span>
      <span className="text-danger "> {props.errors.request_id && props.errors.request_id.message}</span>

      <div className="color-button">
        <LaddaButton loading={props.loading_btn} type="submit" className="sub_btn"><span>{t('VerifyOTP')}  </span></LaddaButton>
      </div>
    </section>
  )
}

const MobileWindow = (props) => {

  const { t } = useTranslation('common');
  let user_info = props.user_state ? props.user_state.user_info : [];

  props.setValue('url', request_otp_url);
  props.setValue('otp_value', '');
  props.setValue('request_id', '');

  return (
    <div className="login_form">
      <Row>
        <Col sm={12}>
          <Form.Group className="position-relative">
            <label className="phonelabel">{t('Phonenumber')} </label>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry={cn_iso ? cn_iso.toUpperCase() : 'US'}
              labels={langName == 'ar' ? ar : en}
              className="signupmobile inputText form-control"
              placeholder="Enter phone number"
              value={props.phoneNo}
              name="cust_mobile_no"
              {...props.register('cust_mobile_no', { required: true })}
              onChange={(value) => props.setphoneNumber(value)}
              error={props.phoneNo ? (isValidPhoneNumber(props.phoneNo) ? undefined : 'Invalid phone number') : 'Phone number required'}
            />

          </Form.Group>
          <span className="text-danger inputerror"> {props.errors?.cust_mobile_no && props.errors?.cust_mobile_no.message} </span>
        </Col>

        <Col sm={4}>
          <Form.Control type="hidden" name="cust_cr_uid"
            {...props.register('cust_cr_uid', { required: true })}
            value={user_info.cust_cr_uid} />
          <div className="hidden_filed">

            <Form.Control
              type="hidden"
              name="url"
              value={request_otp_url}
              {...props.register('url', { required: true })}
            />
            <Form.Control
              type="hidden"
              name="open_window"
              value='MobileWindow'
              {...props.register('open_window', { required: true })}
            />
            <Form.Control type="hidden" placeholder="cust_user_id" name="cust_user_id"
              {...props.register('cust_user_id', { required: true })}
              value={user_email} />
            {props.errors?.cust_user_id && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')} </span>}

            <Form.Control type="hidden" placeholder="auth_token" name="auth_token"
              {...props.register('auth_token', { required: true })}
              value={auth_token} />
            {props.errors?.auth_token && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')} </span>}
          </div>
          <div className="color-button">
            <LaddaButton loading={props.loading_btn} type="submit" className="sub_btn" ><span>{t('Continue')}  </span></LaddaButton>
          </div>
        </Col>

      </Row>
    </div>
  )
}

const SuccessWindow = (props) => {

  const { t } = useTranslation('common');
  //console.log(props, 'props');
  return (
    <div className="login_form">
      {t(props.apiError)}
    </div>
  )
}

const ChangeMobile = (props) => {

  const { t } = useTranslation('common');
  const { register, handleSubmit, formState: { errors }, setValue, setError, getValues, clearErrors } = useForm();
  const [apiError, setApiError] = useState();
  const [loading_btn, setLoading_btn] = useState(false);
  const [sectionName, setSectionName] = useState(props.sectionName);
  const [phoneNo, setphoneNumber] = useState();

  const onSubmit = (post_data) => {
    // if (!isValidPhoneNumber(phoneNo)) {
    //   return true;
    // }
    setLoading_btn(true);
    //console.log(post_data);
    //site_id
    //alert();
    ApiDataService.post(post_data.url, post_data).then(response => {
      setLoading_btn(false);
      let res_data = response.data;
      //
      if (res_data.return_status == 0) {
        let result_data = res_data.result;
        clearErrors();
        if (post_data.open_window == 'MobileWindow') {
          setSectionName('OTPWindow');

          setValue('cust_mobile_no', post_data.cust_mobile_no);
          setValue('request_id', result_data.requestId);
          setApiError(res_data.error_message);
          //$('.error_text').removeClass('alert-danger');
          //$('.error_text').addClass('alert-success');
        } else {
          setApiError(t('Mobile_updated_successfully'));
          //$('.section1').hide();
          setSectionName('SuccessWindow');
          props.setuserdata({ ...props, ...result_data[0] });
          setTimeout(() => {
            props.onHide();
          }, 3000);
        }

      } else if (res_data.return_status == -212) {
        //
        setApiError(res_data.error_message);
        // $('.error_text').removeClass('alert-success');
        //$('.error_text').addClass('alert-danger');
      }
      else {
        // 
        Object.keys(res_data.result).map(function (key) {
          if (res_data.result[key] && key.indexOf(['status', 'user_detail']) == -1 && res_data.result[key].length > 1) {
            setError(key, { message: res_data.result[key] });
          }
        });
        setApiError(res_data.error_message);
        // $('.error_text').removeClass('alert-success');
        // $('.error_text').addClass('alert-danger');
      }

    }).catch(e => {
      setLoading_btn(false);
      //console.log(e);
      setApiError(e.message);
    });
  }

  useEffect(() => {
    console.log(props);
  }, [props.setuserdata])




  const section = () => {
    if (sectionName == 'OTPWindow') {
      return <OTPWindow register={register} errors={errors} loading_btn={loading_btn} setSectionName={setSectionName} setValue={setValue} getValues={getValues} clearErrors={clearErrors} {...props}></OTPWindow>;
    } else if (sectionName == 'SuccessWindow') {
      return <SuccessWindow apiError={apiError} setSectionName={setSectionName} {...props}></SuccessWindow>;
    } else {
      return <MobileWindow register={register} errors={errors} loading_btn={loading_btn} setSectionName={setSectionName} setValue={setValue} getValues={getValues} clearErrors={clearErrors} {...props} setphoneNumber={setphoneNumber} phoneNo={phoneNo}></MobileWindow>;
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
          {/* <div className="error_text" style={{ padding: '6px' }}>{t(apiError)}</div> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {section()}
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}



const mapStateToProps = (state) => ({ user_state: state.UserReducer, manu_and_site_state: state.MenusItemReduser });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeMobile);
