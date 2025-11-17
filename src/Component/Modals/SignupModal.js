import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { useForm } from "react-hook-form";
import { Col, Modal, Row, Form, InputGroup } from 'react-bootstrap'
import LaddaButton from 'react-ladda';
import ApiDataService from '../../services/ApiDataService';
//import PhoneInput from 'react-phone-input-2';
import 'react-phone-number-input/style.css';
import en from 'react-phone-number-input/locale/en';
import ar from 'react-phone-number-input/locale/ar';
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';
import SnapPixel from "../../services/SnapPixel";

import 'react-phone-input-2/lib/style.css';
import { useTranslation } from 'next-i18next';
import OtpInput from "react-otp-input";
const otp_url = 'sg_customer/send_otp';
const verify_otp_url = 'sg_customer/verify_otp';
const sign_up_url = 'sg_customer/sign_up';
import GLOBALS from '../../Globals';
import { connect } from 'react-redux';
const email_otp_url = otp_url; //'sg_customer/email_otp';
import { langName, cn_iso } from '@utils/i18n';


const handleChange = (e) => {

  if ($(e.target).val() != "") {
    $(e.target).addClass("has-content");
  } else {
    $(e.target).removeClass("has-content");
  }
}

const Section1 = (props) => {
  const { register, setValue, control, setSectionName } = props;
  const { t } = useTranslation('common');
  const [mobileNo, setMobileNo] = useState("");


  useEffect(() => {
    setValue('url', email_otp_url)
    setValue('next_secion', 'section2');
    setSectionName('section1');
  }, [setSectionName]);

  return (
    <section className="section1">
      <Row>
        <Col sm={12}>
          <div style={{ fontSize: "13px" }}>{t('sign_up_otp_password')}</div>
          <Form.Group className="floating-field">

            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry={cn_iso ? cn_iso.toUpperCase() : 'US'}
              labels={langName == 'ar' ? ar : en}
              className="signupmobile inputText form-control border-0 bg-transparent border-bottom border-dark rounded-0 "
              placeholder="Enter phone number"
              value={mobileNo}
              onChange={(value) => { setMobileNo(value), value ? setValue('cust_mobile_no', value) : '' }}
              error={mobileNo ? (isValidPhoneNumber(mobileNo) ? undefined : 'Invalid phone number') : 'Phone number required'}
              name="cust_mobile_no"
              control={control}
              rules={{ ...register('cust_mobile_no', { required: true }) }}
            />
            <label  >{t('YourMobileNumber')}</label>
            <div className="text-danger inputerror"> {props?.errors?.cust_mobile_no && props?.errors?.cust_mobile_no.message} </div>
          </Form.Group>

        </Col>
      </Row>

      <input
        type="hidden"
        name="url"
        value={otp_url}
        onChange={handleChange}
        {...register('url', { required: true })}
      />
      <input
        type="hidden"
        name="next_secion"
        value="section2"
        onChange={handleChange}
        {...register('next_secion', { required: true })}
      />
      <div className="color-button">
        <LaddaButton loading={props.loading_btn} className='Phone_OTP_Continue' type="submit"><span>{t('Continue')}  </span></LaddaButton>
      </div>
    </section>
  )
}
const Section2 = (props) => {
  const { t } = useTranslation('common');
  const [isActive, setIsActive] = useState(false);
  const { register, setValue } = props;
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
      <Row>
        <Col sm={12}>
          <Form.Group className="floating-field">
            <Form.Control
              placeholder=" "
              type="text"
              className="form-control inputText"
              name="cust_mobile_no"
              onChange={handleChange}
              {...register('cust_mobile_no', { required: true })}
              readOnly
            />
            <label>{t('YourMobileNumber')}</label>
            <span className="orange_color_text" style={{ position: "absolute", top: "-20px", right: "5px", float: "right" }} onClick={() => {
              props.setSectionName('section1')
              setValue("url", otp_url)
              setValue("next_secion", "section2")
            }}> {t('Change')} </span>

            <span className="text-danger inputerror"> {props?.errors && props?.errors?.cust_mobile_no && props?.errors?.cust_mobile_no?.message} </span>
          </Form.Group>

        </Col>
        <Col sm={12}>
          <div className="form-group" style={{ padding: "0px 0px 10px 8px", fontSize: "12px", fontWeight: "bold" }}>
            <span>{t('OTPsendtoMobile')}</span>
            <span className="orange_color_text" onClick={props.resend_OTP} style={{ position: "relative", top: "0px", right: "5px", float: "right" }}>{t('ResendCode')} </span>
          </div>
        </Col>
        <Col sm={12} className="otp_input pb-5 pt-2">
          <Form.Group className="floating-field">
            <Form.Control
              placeholder=" "
              type="hidden"
              value={OTP}
              className="form-control inputText"
              name="otp_value"
              onChange={handleChange}
              {...register('otp_value', { required: true })}
            />
            <label>{t('EnterOTP')}</label>
            <span className="text-danger inputerror"> {props?.errors && props?.errors?.otp_value && props?.errors?.otp_value?.message} </span>
          </Form.Group>

          <OtpInput
            value={OTP}
            onChange={handleChangeOTP}
            numInputs={6}
            isInputNum={true}
            className="otp_value"
          />

        </Col>


        <Col sm="12">
          <InputGroup className="floating-field">
            <Form.Control
              autoComplete="new-password"
              type={isActive ? 'text' : 'password'}
              className={`form-control inputText ${!isActive ? 'password' : ''}`}
              placeholder=""
              id="login_pwd"
              name="cust_pwd"
              secureTextEntry={true}
              onChange={handleChange}
              minLength={2}
              maxLength={15}
              {...register('cust_pwd', { required: true })}
            />

            <label>{t('SetPassword')}</label>
            <InputGroup.Text id="pwdshowhide" onClick={pwdShowHide}> {!isActive ? t('Show') : t('Hide')} </InputGroup.Text>
          </InputGroup>
          <span className="text-danger inputerror">  {props?.errors && props?.errors?.cust_pwd && props?.errors?.cust_pwd?.message}</span>
        </Col>
      </Row>


      <input
        type="hidden"
        name="url"
        value={verify_otp_url}
        onChange={handleChange}
        {...register('url', { required: true })}
      />
      <input
        type="hidden"
        name="next_secion"
        value="section3"
        onChange={handleChange}
        {...register('next_secion', { required: true })}
      />
      <span className="text-danger inputerror"> {props?.errors && props?.errors?.url && "URL filed is required"}</span>
      <span className="text-danger inputerror"> {props?.errors && props?.errors?.request_id && props?.errors?.request_id?.message}</span>
      <div className="color-button">
        <LaddaButton loading={props.loading_btn} type="submit"  ><span className='Phone_Signup_Confirm'>{t('confirm')} </span></LaddaButton>
      </div>
    </section>
  )
}
const Section3 = (props) => {
  const { t } = useTranslation('common');
  const { register } = props;
  // const { header_state, headerDispatch } = React.useContext(HeaderContext);
  const [countryList, setcountryList] = useState();
  const [cityList, setcityList] = useState();

  const getCitylist = (val) => {
    if (val && val.length > 1) {
      ApiDataService.getAll('fetch/country_state_lov', { country_iso: val }).then(response => {
        let list = response.data.result.map((data, i) =>
          <option value={data.state_code} key={i}>{data.state_desc}</option>
        );
        setcityList(list);
      }).catch(e => {
        console.log(e);
      });
    }
  }

  const getCountryList = () => {
    ApiDataService.getAll('fetch/country_lov').then(response => {
      let list = response.data.result.map((data, i) => {
        if (cn_iso == data.country_iso) {
          getCitylist(data.country_iso);
        }
        return (<option value={data.country_iso} key={i} selected={cn_iso == data.country_iso ? true : false}>{data.country_desc}</option>)
      }
      );
      setcountryList(list);
    }).catch(e => {
      console.log(e);
    });
  }

  useEffect(() => {
    getCountryList()
  }, []);


  return (
    <section className="section3">
      <Row>
        <Col sm={12}>
          <Form.Group className="floating-field">
            <Form.Control
              placeholder=" "
              type="text"
              className="form-control inputText"
              name="cust_first_name"
              onChange={handleChange}
              {...register('cust_first_name', { required: true })}
            />
            <label  >{t('FirstName')}  </label>
            <span className="text-danger inputerror"> {props.errors && props.errors.cust_first_name && props.errors.cust_first_name.message} </span>
          </Form.Group>

        </Col>
        <Col sm={12}>
          <Form.Group className="floating-field">
            <Form.Control
              placeholder=" "
              type="text"
              className="form-control inputText"
              name="cust_last_name"
              onChange={handleChange}
              {...register('cust_last_name', { required: true })}
            />
            <label>{t('LastName')} </label>
            <span className="text-danger inputerror"> {props?.errors && props?.errors?.cust_last_name && props?.errors?.cust_last_name?.message} </span>
          </Form.Group>

        </Col>
        <Col sm={12}>
          <Form.Group className="floating-field">
            <Form.Control
              placeholder=" "
              type="email"
              className="form-control inputText"
              name="cust_email_id"
              onChange={handleChange}
              {...register('cust_email_id', { required: true })}
            />
            <label>{t('Email')} </label>
            <span className="text-danger inputerror"> {props.errors.cust_email_id && props.errors.cust_email_id.message} </span>
          </Form.Group>

        </Col>
        <Col sm={12} className="d-none">

          <input
            type="hidden"
            className="form-control inputText"
            name="cust_nationality"
            value={cn_iso}
            onChange={handleChange}
            {...register('cust_nationality', { required: true })}
          />



        </Col>
        <Col sm={12} className="mt-4 mb-1 d-none">

          <input
            type="hidden"
            className="form-control inputText"
            name="cust_city"
            value={' '}
            onChange={handleChange}
          // {...register('cust_nationality', { required: true })}
          />



        </Col>
        <Col sm={12} className="mt-4 mb-1">
          <input
            type="checkbox"
            name='i_agree'
            className="form-check-input"
            defaultChecked={true}
            value="Y"
            onChange={handleChange}
            {...register('i_agree', { required: true })}
            style={{ padding: '10px' }} />
          <label style={{ paddingLeft: '10px' }}> {t('i_agree_to_receive_communications')}</label>
          <div className='className="text-danger fs-6 fw-lighter form-input-error"'>{props?.errors && props?.errors?.i_agree && t('Thisfieldisrequired')}</div>
        </Col>
      </Row>



      <input
        type="hidden"
        className="form-control inputText"
        name="cust_mobile_no"
        onChange={handleChange}
        {...register('cust_mobile_no', { required: true })}
      />

      <input
        type="hidden"
        name="url"
        value={sign_up_url}
        onChange={handleChange}
        {...register('url', { required: true })}
      />
      <input
        type="hidden"
        className="form-control inputText"
        name="cust_pwd"
        onChange={handleChange}
        id="login_pwd"
        {...register('cust_pwd', { required: true })}
      />
      <input
        type="hidden"
        className="form-control inputText"
        name="request_id"
        onChange={handleChange}
        {...register('request_id', { required: true })}
      />


      <span className="text-danger inputerror"> {props?.errors && props?.errors?.cust_mobile_no && props?.errors?.cust_mobile_no?.message}</span>
      <span className="text-danger inputerror"> {props?.errors && props?.errors?.url && props?.errors?.url?.message}</span>
      <span className="text-danger inputerror"> {props?.errors && props?.errors?.cust_pwd && props?.errors?.cust_pwd?.message}</span>
      <span className="text-danger inputerror"> {props?.errors && props?.errors?.request_id && props?.errors?.request_id?.message}</span>
      <div className="color-button mt-4 mb-1">
        <LaddaButton loading={props.loading_btn} type="submit"><span className='Phone_Sign_Up_Continue'>{t('Continue')}  </span></LaddaButton>
      </div>
    </section>
  )
}


const EmailSection1 = (props) => {
  const { t } = useTranslation('common');
  const { register, setValue, setSectionName } = props;


  useEffect(() => {
    setValue('url', email_otp_url)
    setValue('next_secion', 'section2');
    setSectionName('section1');
  }, [setSectionName]);
  return (
    <section className="section1">
      <Row>
        <Col sm={12}>
          <div style={{ fontSize: "13px" }}>{t('sign_up_email_otp_password')}</div>
          <Form.Group className="floating-field">
            <Form.Control
              placeholder=" "
              type="email"
              className="form-control inputText"
              name="cust_email_id"
              onChange={handleChange}
              {...register('cust_email_id', { required: true })}
            />
            <label>{t('Email')} </label>
            <span className="text-danger inputerror"> {props.errors.cust_email_id && props.errors.cust_email_id.message} </span>
          </Form.Group>

        </Col>

      </Row>

      <input
        type="hidden"
        name="url"
        value={email_otp_url}
        onChange={handleChange}
        {...register('url', { required: true })}
      />
      <input
        type="hidden"
        name="next_secion"
        value="section2"
        onChange={handleChange}
        {...register('next_secion', { required: true })}
      />
      <div className="color-button">
        <LaddaButton loading={props.loading_btn} type="submit"  ><span className='Email_OTP_Continue'>{t('Continue')}  </span></LaddaButton>
      </div>
    </section>
  )
}

const EmailSection2 = (props) => {
  const { register, setValue, control } = props;
  const { t } = useTranslation('common');
  const [isActive, setIsActive] = useState(false);
  const [OTP, setOTP] = useState()
  const handleChangeOTP = (otp) => {
    setOTP(otp);
    setValue('otp_value', otp);
    console.log(otp, 'otp11')
  }

  const pwdShowHide = event => {
    setIsActive(current => !current);
  };
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
              onChange={handleChange}
              {...register('cust_email_id', { required: true })}
              readOnly
            />
            <label>{t('Email')} </label>
            <span className="orange_color_text" style={{ position: "absolute", top: "-20px", right: "5px", float: "right" }} onClick={() => { props.setSectionName('section1') }}> {t('Change')}</span>

            <span className="text-danger inputerror"> {props?.errors && props?.errors?.cust_email_id && props?.errors?.cust_email_id?.message} </span>
          </Form.Group>

        </Col>
        <Col sm={12}>
          <div className="form-group" style={{ padding: "0px 0px 10px 8px", fontSize: "14px" }}>
            <span>{t('OTPsendtoEmail')}</span>
            <span className="orange_color_text" onClick={props.resend_OTP} style={{ position: "relative", top: "0px", right: "5px", float: "right" }}>{t('ResendCode')} </span>
          </div>
        </Col>
        <Col sm={12} className="otp_input pb-5 pt-2">
          <Form.Group className="floating-field">
            <Form.Control
              placeholder=" "
              type="hidden"
              value={OTP}
              className="form-control inputText"
              name="otp_value"
              onChange={handleChange}
              {...register('otp_value', { required: true })}
            />
            <label>{t('EnterOTP')}</label>
            <span className="text-danger inputerror"> {props?.errors && props?.errors?.otp_value && props?.errors?.otp_value?.message} </span>
          </Form.Group>

          <OtpInput
            value={OTP}
            onChange={handleChangeOTP}
            numInputs={6}
            isInputNum={true}
            className="otp_value"
            name='otp_value'
            control={control}
          //  rules={{ ...register('otp_value', { required: true }) }}
          />

        </Col>

        <Col sm="12">
          <InputGroup className="floating-field">
            <Form.Control
              autoComplete="new-password"
              type={isActive ? 'text' : 'password'}
              className={`form-control inputText ${!isActive ? 'password' : ''}`}
              placeholder=""
              id="login_pwd"
              name="cust_pwd"
              secureTextEntry={true}
              onChange={handleChange}
              minLength={2}
              maxLength={15}
              {...register('cust_pwd', { required: true })}
            />

            <label>{t('SetPassword')}</label>
            <InputGroup.Text id="pwdshowhide" onClick={pwdShowHide}> {!isActive ? t('Show') : t('Hide')} </InputGroup.Text>
          </InputGroup>
          <span className="text-danger inputerror">{props.errors.cust_pwd && props.errors.cust_pwd.message}</span>
        </Col>

      </Row>

      <input
        type="hidden"
        className="form-control inputText"
        name="request_id"
        onChange={handleChange}
        {...register('request_id', { required: true })}
      />
      <input
        type="hidden"
        name="url"
        value={verify_otp_url}
        onChange={handleChange}
        {...register('url', { required: true })}
      />
      <input
        type="hidden"
        name="next_secion"
        value="section3"
        onChange={handleChange}
        {...register('next_secion', { required: true })}
      />
      <span className="text-danger inputerror"> {props.errors.url && "URL filed is required"}</span>
      <span className="text-danger inputerror"> {props.errors.request_id && props.errors.request_id.message}</span>
      <div className="color-button">
        <LaddaButton loading={props.loading_btn} type="submit"><span className='Email_Signup_Confirm'>{t('confirm')} </span></LaddaButton>
      </div>
    </section>
  )
}


const EmailSection3 = (props) => {
  const { register, control, errors, setValue } = props;
  const { t } = useTranslation('common');
  const [mobileNo, setMobileNo] = useState()



  return (
    <section className="section3">
      <Row>
        <Col sm={12}>
          <Form.Group className="floating-field">
            <Form.Control
              placeholder=" "
              type="text"
              className="form-control inputText"
              name="cust_first_name"
              onChange={handleChange}
              {...register('cust_first_name', { required: true, minLength: 4, maxLength: 35 })}
            />
            <label  >{t('FirstName')}  </label>
            <span className="text-danger inputerror"> {errors && errors?.cust_first_name && errors?.cust_first_name?.message} </span>
            {errors?.cust_first_name && errors?.cust_first_name?.type == 'required' && <span className="text-danger inputerror">{t('Thisfieldisrequired')}</span>}
          </Form.Group>

        </Col>
        <Col sm={12}>
          <Form.Group className="floating-field">
            <label>{t('LastName')} </label>
            <Form.Control
              placeholder=" "
              type="text"
              className="form-control inputText"
              name="cust_last_name"
              onChange={handleChange}
              {...register('cust_last_name', { required: true, minLength: 4, maxLength: 35 })}
            />

            <span className="text-danger inputerror"> {errors && errors?.cust_last_name && errors?.cust_last_name?.message} </span>
            {errors?.cust_last_name && errors?.cust_last_name?.type == 'required' && <span className="text-danger inputerror">{t('Thisfieldisrequired')}</span>}
          </Form.Group>

        </Col>
        <Col sm={12}>



          <Form.Group className="floating-field">
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry={cn_iso ? cn_iso.toUpperCase() : 'US'}
              labels={langName == 'ar' ? ar : en}
              className="signupmobile inputText form-control border-0 bg-transparent border-bottom border-dark rounded-0 "
              placeholder="Enter phone number"
              value={mobileNo}
              onChange={(value) => { setMobileNo(value), value ? setValue('cust_mobile_no', value) : '' }}
              error={mobileNo ? (isValidPhoneNumber(mobileNo) ? undefined : 'Invalid phone number') : 'Phone number required'}
              name="cust_mobile_no"
              control={control}
              rules={{ ...register('cust_mobile_no', { required: true, minLength: 5, maxLength: 14 }) }}
            />

            <label  >{t('YourMobileNumber')}</label>
            <div className="text-danger inputerror"> {props?.errors?.cust_mobile_no && props?.errors?.cust_mobile_no?.message} </div>
            {props?.errors?.cust_mobile_no?.type && ['minLength', 'maxLength'].indexOf(props?.errors?.cust_mobile_no.type) >= 0 && (
              <div className="text-danger inputerror"> {t('Thisfieldisrequired')} </div>
            )}

            {mobileNo == '' && <div className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</div>}

            {/* {mobileNo && !isValidPhoneNumber(mobileNo) && (
              <>
                <span className="text-danger inputerror">
                  {t('please_enter_a_valid_number')}
                </span>
              </>
            )} 
            <div className="text-danger inputerror"> {errors && errors.cust_mobile_no && errors.cust_mobile_no.message} </div>
           */}

          </Form.Group>



        </Col>
        <Col sm={12} className="d-none">

          <input
            type="hidden"
            className="form-control inputText"
            name="cust_nationality"
            value={cn_iso}
            onChange={handleChange}
            {...register('cust_nationality', { required: true })}
          />

        </Col>

        <Col sm={12} className="mt-4 mb-1">
          <input
            type="checkbox"
            name='i_agree'
            className="form-check-input"
            defaultChecked={true}
            value="Y"
            onChange={handleChange}

            {...register('i_agree', {})}
            style={{ padding: '10px' }} />
          <label style={{ paddingLeft: '10px' }}>{t('i_agree_to_receive_communications')}</label>
        </Col>
      </Row>

      <input
        type="hidden"
        className="form-control inputText"
        name="cust_email_id"
        onChange={handleChange}
        {...register('cust_email_id', { required: true })}
      />


      <input
        type="hidden"
        name="url"
        value={sign_up_url}
        onChange={handleChange}
        {...register('url', { required: true })}
      />
      <input
        type="hidden"
        className="form-control inputText"
        name="cust_pwd"
        onChange={handleChange}
        id="login_pwd"
        {...register('cust_pwd', { required: true })}
      />
      <input
        type="hidden"
        className="form-control inputText"
        name="request_id"
        onChange={handleChange}
        {...register('request_id', { required: true })}
      />


      {/* <span className="text-danger inputerror"> {props.errors.cust_mobile_no && props.errors.cust_mobile_no.message}</span> */}
      <span className="text-danger inputerror"> {props.errors.url && props.errors.url.message}</span>
      <span className="text-danger inputerror"> {props.errors.cust_pwd && props.errors.cust_pwd.message}</span>
      <span className="text-danger inputerror"> {props.errors.request_id && props.errors.request_id.message}</span>
      <div className="color-button mt-4 mb-1">
        <LaddaButton loading={props.loading_btn} type="submit"><span className='Email_Sign_Up_Continue'>{t('Continue')}  </span></LaddaButton>
      </div>
    </section>
  )
}

function SignupModal(props) {
  const { t } = useTranslation('common');

  const { register, handleSubmit, watch, formState: { errors }, setValue, setError, getValues, value, control } = useForm();
  const [sectionName, setSectionName] = useState('section1');
  const [loading_btn, setLoading_btn] = useState(false);
  const [apiError, setApiError] = useState();


  const signupShowHide = () => {
    setSectionName('section1');
    setValue('url', otp_url)
    props.SignupOnHide();
  }

  const loginShowHide = () => {
    setSectionName('section1');
    setValue('url', otp_url)
    props.onShowLogin()
    props.SignupOnHide();
  }

  const resend_OTP = () => {

    if (getValues("cust_mobile_no") != undefined) {
      onSubmit({ cust_mobile_no: getValues("cust_mobile_no"), url: otp_url, next_secion: 'section2' });
    } else if (getValues("cust_email_id") != undefined) {
      onSubmit({ cust_email_id: getValues("cust_email_id"), url: otp_url, next_secion: 'section2' });
    }
  }
  const onSubmit = (post_data) => {

    setLoading_btn(true);

    ApiDataService.post(post_data.url, post_data).then(response => {
      setApiError(false);
      setLoading_btn(false);
      let res_data = response.data;
      //console.log(res_data,'here11');
      if (res_data.return_status == '0') {
        $('.error_text').removeClass('alert-danger');
        $('.error_text').addClass('alert-success');
        let result_data = res_data.result;

        if (post_data.next_secion == 'section2') {
          setSectionName(post_data.next_secion);
          setValue('request_id', result_data.requestId);
          setValue('url', verify_otp_url)
          setValue('next_secion', "section3")
        } else if (post_data.next_secion == 'section3') {
          setSectionName(post_data.next_secion);
          setValue('request_id', post_data.request_id);
          setValue('cust_pwd', post_data.cust_pwd);
          setValue('url', sign_up_url)
          setValue('next_secion', "")
        } else {
          signupShowHide();
          let user_info = res_data.result.user_detail[0];
          user_info['auth_token'] = res_data.result.auth_token;
          props.loginInfo(GLOBALS.user_reducer.LOGIN_USER, user_info);
          //loginShowHide();
          setSectionName('section1');
          setValue('next_secion', "section2");
          SnapPixel.signup(user_info, 'Signup');
        }

        if (post_data.cust_mobile_no != undefined) {
          setValue('cust_mobile_no', post_data.cust_mobile_no);
          $('[name="cust_mobile_no"]').addClass("has-content");
        } else if (post_data.cust_email_id != undefined) {
          setValue('cust_email_id', post_data.cust_email_id);
          $('[name="cust_email_id"]').addClass("has-content");
        }

      } else if (res_data.return_status == '-0101' || res_data.return_status == -111 || res_data.error_message == 'Error') {
        $('.error_text').removeClass('alert-success');
        $('.error_text').addClass('alert-danger');
        if (res_data.return_status == -111 && res_data.error_message == 'Error' && res_data?.result?.cust_email_id) {
          setApiError(res_data.result.cust_email_id);
        } else {
          setApiError(res_data.error_message);

          //
          if (res_data.error_message == 'OTP Validation failed') {
            setError('otp_value', { message: t('OTP_entered_is_invalid_Please_try_again') });
          }
          Object.keys(res_data.result).map(function (key) {
            if (res_data.result[key] && key.indexOf(['status', 'user_detail']) == -1 && res_data.result[key].length > 1) {
              setError(key, { message: res_data.result[key] });
            }
          });
        }

      } else {

        if (res_data.return_status == '-212') {
          signupShowHide();
          loginShowHide();
          res_data['subject'] = 'SignupLogin';
        } else {
          $('.error_text').removeClass('alert-success');
          $('.error_text').addClass('alert-danger');
          //  res_data.result && res_data.result.otp_value ? setApiError(res_data.result.otp_value) : ''
          setApiError(res_data.error_message);
          res_data['subject'] = 'Signup';
        }

        res_data['reuest_data'] = post_data;
        ApiDataService.post('emailFun', res_data).then(response => {
          console.log(response, 'emailFun');
        }).catch(e => {
          console.log(e);
          alert('Error catch');
        });
      }

    }).catch(e => {
      $('.error_text').removeClass('alert-success');
      $('.error_text').addClass('alert-danger');
      setLoading_btn(false);
      setApiError(e.message);
    });
  }





  const section = () => {
    if (sectionName == 'section2') {
      return <Section2 register={register} errors={errors} loading_btn={loading_btn} setSectionName={setSectionName} setValue={setValue} getValues={getValues} resend_OTP={resend_OTP}></Section2>;
    } else if (sectionName == 'section3') {
      return <Section3 register={register} errors={errors} loading_btn={loading_btn} setSectionName={setSectionName} setValue={setValue} getValues={getValues}></Section3>;
    } else {
      return <Section1 register={register} errors={errors} loading_btn={loading_btn} setSectionName={setSectionName} setValue={setValue} getValues={getValues} control={control}></Section1>;
    }

  }

  const email_section = () => {
    if (sectionName == 'section2') {
      return <EmailSection2 register={register} errors={errors} loading_btn={loading_btn} setSectionName={setSectionName} setValue={setValue} getValues={getValues} resend_OTP={resend_OTP} control={control}></EmailSection2>;
    } else if (sectionName == 'section3') {
      return <EmailSection3 register={register} errors={errors} loading_btn={loading_btn} setSectionName={setSectionName} setValue={setValue} getValues={getValues} control={control}></EmailSection3>;
    } else {
      return <EmailSection1 register={register} errors={errors} loading_btn={loading_btn} setSectionName={setSectionName} setValue={setValue} getValues={getValues}></EmailSection1>;
    }

  }

  console.log(errors, sectionName, 'sectionName111');
  return (
    <Modal
      show={props.signupShow} onHide={signupShowHide} animation={false} backdrop="static"
      keyboard={false}
      dialogClassName="loginPopup"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('SignUp')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {apiError && apiError !== 'Error' ? <div className="error_text" style={{ padding: '8px', fontSize: '12px', color: 'red' }}>{apiError}</div>
          : ''}
        <form onSubmit={handleSubmit(onSubmit)} autocomplete={true}>
          {/* {cn_iso == 'SA' ? (
            email_section()
          ) : (
            section()
          )} */}
          {section()}
        </form>
        <div className="signup_link pt-5 pb-2">
          <span>{t('already_member_Login')} </span><span className="orange_color_text Inner_Login_Start" onClick={loginShowHide}> {t('login')}</span>
        </div>
      </Modal.Body>

    </Modal>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginInfo: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}

export default connect(null, mapDispatchToProps)(SignupModal);

//export default SignupModal;