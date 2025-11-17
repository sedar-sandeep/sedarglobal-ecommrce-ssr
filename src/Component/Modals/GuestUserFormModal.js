import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { useForm } from "react-hook-form";
import { Col, Modal, Row, Form, InputGroup } from 'react-bootstrap'
import LaddaButton from 'react-ladda';
import ApiDataService from '../../services/ApiDataService';
//import PhoneInput from 'react-phone-input-2';
import 'react-phone-number-input/style.css'
import en from 'react-phone-number-input/locale/en';
import ar from 'react-phone-number-input/locale/ar';
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-input-2/lib/style.css';
import GLOBALS from '../../Globals';
import { useTranslation } from 'next-i18next';
import { cn_iso, langName } from '@utils/i18n';
import { connect } from "react-redux";
import SnapPixel from "../../services/SnapPixel";

function GuestUserFormModal(props) {

    const { register, handleSubmit, watch, formState: { errors }, setValue, setError, getValues, control } = useForm();
    const [loading_btn, setLoading_btn] = useState(false);
    const [apiError, setApiError] = useState();

    const handleChange = (e) => {
        console.log(e, 'handleChange');
        if ($(e.target).val() != "") {
            $(e.target).addClass("has-content");
        } else {
            $(e.target).removeClass("has-content");
        }
    }
    const [mobileNo, setMobileNo] = useState()

    const onSubmit = (post_data) => {
        if (mobileNo == undefined) {
            setMobileNo('');
            return true;
        } else if (!isValidPhoneNumber(mobileNo)) {
            return true;
        }

        setLoading_btn(true);
        console.log(post_data, 'post_data');
        // return false;
        ApiDataService.post('sg_customer/guestUserLoginRegister', post_data).then(response => {
            setLoading_btn(false);
            let res_data = response.data;
            if (res_data.return_status == '0') {

                let user_info = res_data.result.user_detail;
                user_info['auth_token'] = res_data.result.auth_token;

                props.loginInfo(GLOBALS.user_reducer.LOGIN_USER, user_info);
                props.guestOnHide();
                setApiError('');
                SnapPixel.signup(user_info, 'Guest_User');
            } else {
                if (res_data.email_data && res_data.email_data.result && res_data.email_data.result.length) {
                    setError('cust_email_id', { message: res_data.email_data.result });
                }
                if (res_data.mobile_data && res_data.mobile_data.result && res_data.mobile_data.result.length) {
                    setError('cust_mobile_no', { message: res_data.mobile_data.result });
                }
                if (res_data.result && res_data.result.cust_first_name) {

                    setError('cust_first_name', { message: res_data.result.cust_first_name });
                }
                if (res_data.result && res_data.result.cust_last_name) {
                    setError('cust_last_name', { message: res_data.result.cust_last_name });
                }
            }

        }).catch(e => {
            setLoading_btn(false);
            setApiError(e.message);
        });
    }



    const loginShowHide = () => {
        props.onShowLogin()
        props.guestOnHide();
    }
    const { t } = useTranslation('common');

    // console.log(errors, 'errors..', mobileNo, getValues);
    return (
        <Modal
            show={props.guestFormShow} onHide={props.guestOnHide} animation={false} backdrop="static"
            keyboard={false}
            dialogClassName="loginPopup guestUserPopup"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t('Guest_Checkout')}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="true">
                    <section className="section">
                        <Row>
                            <div className="error_text text-danger">{apiError}</div>

                            <Col md={6} sm={12}>
                                <Form.Group>
                                    <label>{t('FirstName')}  </label>
                                    <Form.Control
                                        placeholder=" "
                                        type="text"
                                        className="form-control rounded-0 border-top-0 border-start-0 border-end-0 inputText"
                                        name="cust_first_name"
                                        minLength="3"
                                        maxLength="45"
                                        onChange={handleChange}
                                        {...register('cust_first_name', { required: true })}

                                    />

                                </Form.Group>
                                <span className="text-danger inputerror"> {errors && errors.cust_first_name && errors.cust_first_name.message} </span>
                                {errors && errors.cust_first_name && errors.cust_first_name.message == '' && <span className="text-danger inputerror">{t('Thisfieldisrequired')}</span>}

                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group>
                                    <label>{t('LastName')} </label>
                                    <Form.Control
                                        placeholder=" "
                                        type="text"
                                        className="form-control rounded-0 border-top-0 border-start-0 border-end-0 inputText"
                                        name="cust_last_name"
                                        minLength="3"
                                        maxLength="45"
                                        onChange={handleChange}
                                        {...register('cust_last_name', { required: true })}
                                    />

                                </Form.Group>
                                <span className="text-danger inputerror"> {errors && errors.cust_last_name && errors.cust_last_name.message} </span>
                                {errors && errors.cust_last_name && errors.cust_last_name.message == '' && <span className="text-danger inputerror">{t('Thisfieldisrequired')}</span>}
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group>
                                    <label>{t('Email')} </label>
                                    <Form.Control
                                        placeholder=" "
                                        type="email"
                                        className="form-control rounded-0 border-top-0 border-start-0 border-end-0 inputText"
                                        name="cust_email_id"
                                        onChange={handleChange}
                                        {...register('cust_email_id', { required: true })}
                                    />

                                </Form.Group>
                                <span className="text-danger inputerror"> {errors && errors.cust_email_id && errors.cust_email_id.message} </span>
                                {errors && errors.cust_email_id && errors.cust_email_id.message == '' && <span className="text-danger inputerror">{t('Thisfieldisrequired')}</span>}
                            </Col>
                            <Col md={6} sm={12} className="">
                                <Form.Group>
                                    <label>{t('YourMobileNumber')}</label>
                                    <PhoneInput
                                        international
                                        countryCallingCodeEditable={false}
                                        defaultCountry={cn_iso ? cn_iso.toUpperCase() : 'US'}
                                        labels={langName == 'ar' ? ar : en}
                                        style={{ borderColor: "#707070" }}
                                        className="signupmobile inputText form-control d-flex border-0 border-bottom"
                                        placeholder="Enter phone number"
                                        value={mobileNo}
                                        name="cust_mobile_no"
                                        rules={{ ...register('cust_mobile_no', { required: true }) }}
                                        control={control}
                                        onChange={(value) => { setMobileNo(value), value ? setValue('cust_mobile_no', value) : '' }}
                                        error={mobileNo ? (isValidPhoneNumber(mobileNo) ? undefined : 'Invalid phone number') : 'Phone number required'}

                                    />
                                    {/* <Form.Control
                                        placeholder=" "
                                        type="text"
                                        name="cust_mobile_no"
                                        onChange={handleChange}
                                        value={mobileNo}
                                        {...register('cust_mobile_no', { required: true })}

                                    /> */}

                                    {mobileNo && !isValidPhoneNumber(mobileNo) && (
                                        <>
                                            <span className="text-danger inputerror">
                                                {t('please_enter_a_valid_number')}
                                            </span>
                                        </>
                                    )}
                                    <span className="text-danger inputerror"> {errors && errors.cust_mobile_no && errors.cust_mobile_no.message} </span>
                                    {errors && errors.cust_mobile_no && mobileNo == undefined && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                                    {mobileNo == '' && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

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
                                <input
                                    type="hidden"
                                    className="form-control inputText"
                                    name="cust_cr_uid"
                                    value={'GUEST-USER'}
                                    onChange={handleChange}
                                    {...register('cust_cr_uid', { required: true })}
                                />
                            </Col>

                            {/* <Col sm={12} className="mt-4 mb-1">
                                <input
                                    type="checkbox"
                                    name='i_agree'
                                    className="form-check-input"
                                    defaultChecked={true}
                                    value="Y"
                                    onChange={handleChange}
                                    {...register('cust_cr_uid', { required: true })}
                                    style={{ padding: '10px' }} />
                                <label style={{ paddingLeft: '10px' }}>{t('i_agree_to_receive_communications')}</label>
                            </Col> */}
                        </Row>

                        <div className="color-button mt-4 mb-1">
                            <LaddaButton loading={loading_btn} type="submit"><span className='Phone_Sign_Up_Continue'>{t('Continue')}  </span></LaddaButton>
                        </div>
                    </section>

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

export default connect(null, mapDispatchToProps)(GuestUserFormModal);