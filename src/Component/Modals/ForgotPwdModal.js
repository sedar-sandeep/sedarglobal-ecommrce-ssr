import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { useForm } from "react-hook-form";
import { Col, Modal, Row, Form, InputGroup } from 'react-bootstrap'
import LaddaButton from 'react-ladda';
import ApiDataService from '../../services/ApiDataService';
const otp_url = 'sg_customer/request_pwd_reset';
const verify_otp_url = 'sg_customer/change_the_password';
import PhoneInput from 'react-phone-input-2';
import OtpInput from "react-otp-input";
import { useTranslation } from 'next-i18next';
import Cookies from 'js-cookie';

const site = Cookies.get('siteDetail') || "undefined";
let cn_iso = site != 'undefined' && JSON.parse(site) != null && JSON.parse(site).primary_ref_cn_iso ? JSON.parse(site).primary_ref_cn_iso : 'AE';

/*
const pwdShowHide = () => {
  if ($('#login_pwd').attr('type') == 'password') {
    $('#login_pwd').attr('type', 'text')
    $('#pwdshowhide').text(t('Hide'));
  } else {
    $('#login_pwd').attr('type', 'password')
    $('#pwdshowhide').text(t('show'));

  }
}*/
const handleChange = (e) => {
  if ($(e.target).val() != "") {
    $(e.target).addClass("has-content");
  } else {
    $(e.target).removeClass("has-content");
  }
}

const Section1 = (props) => {
  const { setValue } = props;

  const { t } = useTranslation('common');
  const [mobileNo, setMobileNo] = useState()
  const phoneNoFun = (val) => {
    setMobileNo('+' + val);
    setValue("cust_mobile_no", '+' + val)
  }
  return (
    <section className="section1">
      <Row>
        <Col sm={12}>


          <PhoneInput
            countryCodeEditable={false}
            country={cn_iso ? cn_iso.toLowerCase() : 'ae'}
            onChange={phoneNoFun}
            className="form-control inputText border-0 border-bottom-0"
          />

          <Form.Group className="floating-field border-0 border-bottom-0">
            <Form.Control
              //  placeholder=" "
              type="hidden"
              className="form-control inputText border-0 border-bottom-0"
              name="cust_mobile_no"
              onChange={handleChange}
              value={mobileNo}
              //  maxLength={13}
              //minLength={9}
              //pattern="[+-]?\d+(?:[.,]\d+)?"
              // ref={props.register({ required: true })}
              {...props?.register('cust_mobile_no', { required: true })}
            />
            <label  >{t('YourMobileNumber')} </label>
            <span className="text-danger inputerror"> {props?.errors && props.errors.cust_mobile_no && props.errors.cust_mobile_no.message} </span>
          </Form.Group>
        </Col>
      </Row>
      <input
        type="hidden"
        name="url"
        value={otp_url}
        onChange={handleChange}
        // ref={props.register({ required: true })}
        {...props?.register('url', { required: true })}
      />
      <input
        type="hidden"
        name="next_secion"
        value="section2"
        onChange={handleChange}
        // ref={props.register({ required: true })}
        {...props?.register('next_secion', { required: true })}
      />
      <div className="color-button">
        <LaddaButton loading={props.loading_btn} type="submit" className="Forgot_Password_Continue"  ><span> {t('Continue')}  </span></LaddaButton>
      </div>
    </section>
  )
}
const Section2 = (props) => {
  const { setValue } = props;
  const { t } = useTranslation('common');
  const [isActive, setIsActive] = useState(false);

  const [OTP, setOTP] = useState();
  const handleChangeOTP = (otp) => {
    setOTP(otp);
    setValue("otp_value", otp);
  }
  const pwdShowHide = event => {
    setIsActive(current => !current);
  };
  return (
    <section className="section2">
      <br />
      <Row>
        <Col sm={12}>

          <Form.Group className="floating-field border-0">
            <Form.Control
              placeholder=""
              type="text"
              className="form-control inputText border-0"
              name="cust_mobile_no"
              onChange={handleChange}
              // ref={props.register({ required: true })}
              {...props?.register('cust_mobile_no', { required: true })}
              readOnly
            />
            <label  >{t('YourMobileNumber')}</label>
            <span className="orange_color_text" style={{ position: "absolute", top: "-20px", right: "5px", float: "right" }} onClick={() => {
              props.setSectionName('section1');
              setValue("url", otp_url)
              setValue("next_secion", "section2")
            }}> {t('Change')} </span>
            <span className="text-danger inputerror"> {props?.errors && props.errors.cust_mobile_no && props.errors.cust_mobile_no.message} </span>
          </Form.Group>

        </Col>
        <Col sm={12}>
          <div className="form-group" style={{ padding: "10px 0px 5px 8px", fontSize: "15px", fontWeight: "bold" }}>
            <span>{t('OTPsendtoMobile')} </span>
            <span className="orange_color_text" onClick={props.resend_OTP} style={{ position: "relative", top: "0px", right: "5px", float: "right" }}>{t('resend_code')}</span>
          </div>
        </Col>
        <Col sm={12} className="otp_input pb-2 pt-2">

          <Form.Group className="floating-field pb-3">
            <Form.Control
              placeholder=""
              type="hidden"
              className="form-control inputText"
              name="otp_value"
              value={OTP}
              // onChange={handleChange}
              // ref={props.register({ required: true })}
              {...props?.register('otp_value', { required: true })}
            />
            <label  >{t('EnterOTP')}</label>
            <span className="text-danger inputerror">{props?.errors && props.errors.otp_value && props.errors.otp_value.message} </span>
          </Form.Group>
          <OtpInput
            value={OTP}
            onChange={handleChangeOTP}
            numInputs={6}
            isInputNum={true}
            className="otp_value"
            name='enter_otp'
          //	ref={props.register({ required: true })}
          />
        </Col>
        <Col sm="12">
          <InputGroup className="floating-field">
            <Form.Control
              placeholder=""
              type={isActive ? 'text' : 'password'}
              className={`form-control rounded-0 border-top-0 border-start-0 border-end-0 inputText ${!isActive ? 'password' : ''}`}
              name="cust_pwd"
              onChange={handleChange}
              id="login_pwd"
              // ref={props.register({ required: true })}
              minLength={2}
              maxLength={15}
              {...props?.register('cust_pwd', { required: true })}
            />
            <label>{t('reset_password')}</label>
            <InputGroup.Text id="pwdshowhide" onClick={pwdShowHide}> {!isActive ? t('Show') : t('Hide')} </InputGroup.Text>
          </InputGroup>
          <span className="text-danger inputerror">  {props?.errors && props.errors.cust_pwd && props.errors.cust_pwd.message}</span>

        </Col>

      </Row>
      <input
        type="hidden"
        className="form-control inputText"
        name="request_id"
        onChange={handleChange}
        // ref={props.register({ required: true })}
        {...props?.register('request_id', { required: true })}
      />
      <input
        type="hidden"
        name="url"
        value={verify_otp_url}
        onChange={handleChange}
        // ref={props.register({ required: true })}
        {...props?.register('url', { required: true })}
      />
      <input
        type="hidden"
        name="next_secion"
        value="section3"
        onChange={handleChange}
        // ref={props.register({ required: true })}
        {...props?.register('next_secion', { required: true })}
      />
      <span className="text-danger "> {props?.errors && props.errors.url && "URL filed is required"}</span>
      <span className="text-danger "> {props?.errors && props.errors.request_id && props.errors.request_id.message}</span>
      <div className="color-button">
        <LaddaButton loading={props.loading_btn} type="submit" className='Forgot_Password_Continue'><span> {t('Continue')}  </span></LaddaButton>
      </div>
    </section>
  )
}
const Section3 = (props) => {
  const { t } = useTranslation('common');

  return (
    <section className="section3">
      <div className="form-group user_input_wrp">
        <img className="img-fluid mb-3" src={`/assets/images/Customization/Group24171.png`} alt="sedarglobal" width="auto" height="auto" />

        <h3>{t('PasswordChangedSuccessfully')}</h3>
        <p>{t('Pleaselogintoyouremailaccountagain')}</p>
      </div>
      <div className="color-button">
        <LaddaButton loading={props.loading_btn} className='Forgot_Password_Continue' type="button" onClick={props.forgotPWDShowHide} ><span> {t('Login_Now')}  </span></LaddaButton>
      </div>
    </section>
  )
};


const EmailSection1 = (props) => {
  const { t } = useTranslation('common');

  return (
    <section className="section1">
      <Row>
        <Col sm={12}>
          <Form.Group className="floating-field border-0">
            <Form.Control
              placeholder=" "
              type="email"
              className="form-control inputText rounded-0 border-start-0 border-top-0 border-end-0"
              name="cust_email_id"
              onChange={handleChange}
              // ref={props.register({ required: true })}
              {...props?.register('cust_email_id', { required: true })}
            />
            <label>{t('Email')} </label>
            <span className="text-danger inputerror"> {props?.errors && props.errors.cust_email_id && props.errors.cust_email_id.message} </span>
          </Form.Group>
        </Col>
      </Row>
      <input
        type="hidden"
        name="url"
        value={otp_url}
        onChange={handleChange}
        // ref={props.register({ required: true })}
        {...props?.register('url', { required: true })}
      />
      <input
        type="hidden"
        name="next_secion"
        value="section2"
        onChange={handleChange}
        // ref={props.register({ required: true })}
        {...props?.register('next_secion', { required: true })}
      />
      <div className="color-button">
        <LaddaButton loading={props.loading_btn} type="submit"  ><span> {t('Continue')}  </span></LaddaButton>
      </div>
    </section>
  )
}

const EmailSection2 = (props) => {
  const { t } = useTranslation('common');
  const [isActive, setIsActive] = useState(false);

  const [OTP, setOTP] = useState();
  const handleChangeOTP = (otp) => {
    setOTP(otp)
  }

  const pwdShowHide = event => {
    setIsActive(current => !current);
  };
  return (
    <section className="section2">
      <br />
      <Row>
        <Col sm={12}>

          <Form.Group className="floating-field border-0">
            <Form.Control
              placeholder=" "
              type="email"
              className="form-control inputText border-0"
              name="cust_email_id"
              onChange={handleChange}
              // ref={props.register({ required: true })}
              {...props?.register('cust_email_id', { required: true })}
              readOnly
            />
            <label>{t('Email')} </label>
            <span className="orange_color_text" style={{ position: "absolute", top: "-20px", right: "5px", float: "right" }} onClick={() => { props.setSectionName('section1') }}> {t('Change')} </span>
            <span className="text-danger inputerror"> {props?.errors && props.errors.cust_email_id && props.errors.cust_email_id.message} </span>
          </Form.Group>



        </Col>
        <Col sm={12}>
          <div className="form-group" style={{ padding: "10px 0px 5px 8px", fontSize: "15px", fontWeight: "bold" }}>
            <span>{t('OTPsendtoEmail')} </span>
            <span className="orange_color_text" onClick={props.resend_OTP} style={{ position: "relative", top: "0px", right: "5px", float: "right" }}>{t('resend_code')}</span>
          </div>
        </Col>
        <Col sm={12} className="otp_input pb-2 pt-2">

          <Form.Group className="floating-field pb-3 border-0">
            <Form.Control
              placeholder=" "
              type="hidden"
              className="form-control inputText border-0"
              name="otp_value"
              value={OTP}
              // onChange={handleChange}
              // ref={props.register({ required: true })}
              {...props?.register('otp_value', { required: true })}
            />
            <label  >{t('EnterOTP')}</label>
            <span className="text-danger inputerror">{props?.errors && props.errors.otp_value && props.errors.otp_value.message} </span>
          </Form.Group>
          <OtpInput
            value={OTP}
            onChange={handleChangeOTP}
            numInputs={6}
            isInputNum={true}
            className="otp_value"
            name='enter_otp'
          //	ref={props.register({ required: true })}
          />
        </Col>
        <Col sm="12">
          <InputGroup className="floating-field ">
            <Form.Control
              placeholder=""
              type={isActive ? 'text' : 'password'}
              className={`form-control inputText ${!isActive ? 'password' : ''}`}
              name="cust_pwd"
              onChange={handleChange}
              id="login_pwd"
              // ref={props.register({ required: true })}
              {...props?.register('cust_pwd', { required: true })}
              minLength={2}
              maxLength={15}
            />
            <label>{t('reset_password')}</label>
            <InputGroup.Text id="pwdshowhide" onClick={pwdShowHide}> {!isActive ? t('Show') : t('Hide')} </InputGroup.Text>
          </InputGroup>
          <span className="text-danger inputerror">  {props?.errors && props.errors.cust_pwd && props.errors.cust_pwd.message}</span>

        </Col>

      </Row>
      <input
        type="hidden"
        className="form-control inputText"
        name="request_id"
        onChange={handleChange}
        // ref={props.register({ required: true })}
        {...props?.register('request_id', { required: true })}
      />
      <input
        type="hidden"
        name="url"
        value={verify_otp_url}
        onChange={handleChange}
        // ref={props.register({ required: true })}
        {...props?.register('url', { required: true })}
      />
      <input
        type="hidden"
        name="next_secion"
        value="section3"
        onChange={handleChange}
        // ref={props.register({ required: true })}
        {...props?.register('next_secion', { required: true })}
      />
      <span className="text-danger "> {props?.errors && props.errors.url && "URL filed is required"}</span>
      <span className="text-danger "> {props?.errors && props.errors.request_id && props.errors.request_id.message}</span>
      <div className="color-button">
        <LaddaButton loading={props.loading_btn} type="submit"  ><span> {t('Continue')}  </span></LaddaButton>
      </div>
    </section>
  )
}

const EmailSection3 = (props) => {
  const { t } = useTranslation('common');
  return (
    <section className="section3">
      <div className="form-group user_input_wrp">
        <img className="img-fluid mb-3" src={`/assets/images/Customization/Group24171.png`} alt="sedarglobal" width="auto" height="auto" />

        <h3>{t('PasswordChangedSuccessfully')}</h3>
        <p>{t('Pleaselogintoyouremailaccountagain')}</p>
      </div>
      <div className="color-button">
        <LaddaButton loading={props.loading_btn} type="button" onClick={props.forgotPWDShowHide} ><span> {t('Login_Now')}  </span></LaddaButton>
      </div>
    </section>
  )
};

function ForgotPwdModal(props) {
  const { t } = useTranslation('common');
  const { register, handleSubmit, watch, formState: { errors }, setValue, setError, getValues } = useForm();
  const [sectionName, setSectionName] = useState('section1');
  const [loading_btn, setLoading_btn] = useState(false);
  const [apiError, setApiError] = useState();

  const resend_OTP = () => {
    //onSubmit({ cust_mobile_no: getValues("cust_mobile_no"), url: otp_url, next_secion: 'section2' });
    if (getValues("cust_mobile_no") != undefined) {
      onSubmit({ cust_mobile_no: getValues("cust_mobile_no"), url: otp_url, next_secion: 'section2' });
    } else if (getValues("cust_email_id") != undefined) {
      onSubmit({ cust_email_id: getValues("cust_email_id"), url: otp_url, next_secion: 'section2' });
    }
  }

  const onSubmit = (post_data) => {
    setLoading_btn(true);

    ApiDataService.post(post_data.url, post_data).then(response => {
      setLoading_btn(false);
      let res_data = response.data;
      if (res_data.return_status == '0' || res_data.error_message == 'Success') {
        $('.error_text').removeClass('alert-danger');
        $('.error_text').addClass('alert-success');

        let result_data = res_data.result;
        //setApiError(res_data.error_message);

        if (post_data.next_secion == 'section2') {
          setSectionName(post_data.next_secion);
          setValue('request_id', result_data.requestId);
          setValue('url', verify_otp_url)
          setValue('next_secion', "section3")
        } else if (post_data.next_secion == 'section3') {
          setSectionName(post_data.next_secion);
          setValue('request_id', post_data.request_id);
          setValue('cust_pwd', post_data.cust_pwd);
          setValue('url', otp_url);
          setValue('next_secion', "")
        } else {
          setValue('next_secion', "section2")
          forgotPWDShowHide();
        }


        if (post_data.cust_mobile_no != undefined) {
          setValue('cust_mobile_no', post_data.cust_mobile_no);
          $('[name="cust_mobile_no"]').addClass("has-content");
        } else if (post_data.cust_email_id != undefined) {
          setValue('cust_email_id', post_data.cust_email_id);
          $('[name="cust_email_id"]').addClass("has-content");
        }


      } else if (res_data.return_status == '-0101' || res_data.return_status == -111 || res_data.error_message == 'Error') {
        setApiError(res_data.error_message);
        $('.error_text').removeClass('alert-success');
        $('.error_text').addClass('alert-danger');
        //
        if (res_data.error_message == 'OTP Validation failed') {
          setError('otp_value', { message: t('OTP_entered_is_invalid_Please_try_again') });
        }
        Object.keys(res_data.result).map(function (key) {
          if (res_data.result[key] && key != 'status') {
            setError(key, { message: res_data.result[key] });
          }
        });
      }
      else {
        $('.error_text').removeClass('alert-success');
        $('.error_text').addClass('alert-danger');
        ////
        setApiError(res_data.result.otp_value);
        setApiError(res_data.error_message);
      }

    }).catch(e => {
      $('.error_text').removeClass('alert-success');
      $('.error_text').addClass('alert-danger');
      setLoading_btn(false);
      setApiError(e.message);
    });
  }

  const forgotShowHide = () => {
    setSectionName('section1');
    setValue('url', otp_url);
    setValue('next_secion', "section2");
    props.ForgotOnHide();
  }


  const forgotPWDShowHide = () => {
    setSectionName('section1');
    setValue('url', otp_url);
    setValue('next_secion', "section2");
    props.onShowLogin()
    props.ForgotOnHide();
  }


  const section = () => {
    if (sectionName == 'section2') {
      return <Section2 register={register} errors={errors} loading_btn={loading_btn} setSectionName={setSectionName} setValue={setValue} getValues={getValues} resend_OTP={resend_OTP}></Section2>;
    } else if (sectionName == 'section3') {
      return <Section3 register={register} errors={errors} loading_btn={loading_btn} setSectionName={setSectionName} setValue={setValue} getValues={getValues} forgotPWDShowHide={forgotPWDShowHide}></Section3>;
    } else {
      return <Section1 register={register} errors={errors} loading_btn={loading_btn} setSectionName={setSectionName} setValue={setValue} getValues={getValues}></Section1>;
    }

  }

  const email_section = () => {
    if (sectionName == 'section2') {
      return <EmailSection2 register={register} errors={errors} loading_btn={loading_btn} setSectionName={setSectionName} setValue={setValue} getValues={getValues} resend_OTP={resend_OTP}></EmailSection2>;
    } else if (sectionName == 'section3') {
      return <EmailSection3 register={register} errors={errors} loading_btn={loading_btn} setSectionName={setSectionName} setValue={setValue} getValues={getValues} forgotPWDShowHide={forgotPWDShowHide}></EmailSection3>;
    } else {
      return <EmailSection1 register={register} errors={errors} loading_btn={loading_btn} setSectionName={setSectionName} setValue={setValue} getValues={getValues}></EmailSection1>;
    }

  }

  return (
    <Modal
      show={props.forgotShow} onHide={forgotShowHide} animation={false} backdrop="static"
      keyboard={false}
      dialogClassName="loginPopup"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('ForgotPassword')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <div className="error_text" style={{ padding: '8px' }}>{apiError}</div> */}
        {/* <form onSubmit={handleSubmit(onSubmit)} className='forgotPwd'>
          {cn_iso == 'SA' ? (
            email_section()
          ) : (
            section()
          )}
        </form> */}
        <form onSubmit={handleSubmit(onSubmit)} className='forgotPwd'>
          {section()}
        </form>
        <div className="signup_link pt-5 pb-2">
          <span>{t('already_member_Login')}</span><span className="orange_color_text Inner_Login_Start" onClick={forgotPWDShowHide}> {t('login')} </span>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default ForgotPwdModal;