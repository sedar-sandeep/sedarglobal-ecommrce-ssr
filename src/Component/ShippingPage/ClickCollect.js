import React, { useState, useEffect, useContext } from 'react';
import { Col, Row, Tab, Nav, Button, Modal, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import ApiDataService from '../../services/ApiDataService';
import LaddaButton from 'react-ladda';
import 'react-phone-number-input/style.css'
import en from 'react-phone-number-input/locale/en';
import ar from 'react-phone-number-input/locale/ar';
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';
import { useTranslation } from 'next-i18next'
import { langName, cn_iso } from '@utils/i18n';
import { ShippingContext } from './ShippingPage'

const ClickCollect = (props) => {

    const { t } = useTranslation('common');
    const router = useRouter();

    let user_info = props.user_state ? props.user_state.user_info : [];

    let auth_token = props.user_state ? props.user_state.auth_token : '';
    let user_id = props.user_state ? props.user_state.user_id : 0;
    let user_email = props.user_state ? props.user_state.user_email : '';

    let cust_phone_no = user_info.cust_phone_no ? user_info.cust_phone_no : user_info.cust_mobile_no;
    const request_otp_url = 'dashboard/update_PhoneNo/' + user_id;
    //const { shipping_state, shippingDispatch } = useContext(ShippingContext);

    const [loading_btn, setLoading_btn] = useState(false);
    const [apiError, setApiError] = useState();
    const [apiErrorClass, setApiErrorClass] = useState(false);
    const [countryList, setcountryList] = useState();
    const [phoneNo, setphoneNumber] = useState();
    const [variant, setVariant] = useState('danger');



    const { register, handleSubmit, watch, formState: { errors }, setValue, setError, getValues, clearErrors, control } = useForm({
        defaultValues: {
            cust_first_name: user_info.cust_first_name,
            cust_last_name: user_info.cust_last_name,
            cust_phone_no: cust_phone_no,//user_info.cust_phone_no,
            cad_country: cn_iso,
            cust_cr_uid: user_info.cust_cr_uid,
            cust_title: user_info.cust_title

        }
    });

    const userProfielFun = () => {
        ApiDataService.getAll(`dashboard/edit_profile/${user_info.cust_id}`, { "cust_user_id": user_info.cust_email_id, "auth_token": auth_token })
            .then(response => {
                let res_data = response.data;
                if (res_data.return_status == '0' || res_data.error_message == 'Success') {
                    /// setUserData(res_data.result);
                    props.user_dispatch('UPDATE_USER_PROFILE', res_data.result);
                } else {
                    setApiError(res_data.error_message);
                    setVariant('danger');
                    //props.user_dispatch('LOGOUT_USER');
                    router.push('/cartPage');
                }
            }).catch(e => {
                console.log(e);
                //props.user_dispatch('LOGOUT_USER');
            });
    }

    const handleChange = (e) => {
        console.log(e);
    }


    const onSubmit = (post_data) => {
        if (phoneNo == undefined) {
            console.log(errors, 'errors');
            setphoneNumber('');
            return true;
        } else if (!isValidPhoneNumber(phoneNo)) {
            console.log(errors, 'errors11');
            return true;
        }
        setLoading_btn(true);


        if (getValues('cust_mobile_no') == '') {
            setValue('cust_mobile_no', phoneNo);
            post_data = { ...post_data, cust_mobile_no: phoneNo }
        }
        console.log(errors, 'errors44', post_data, user_info);
        if (post_data.cust_first_name != user_info.cust_first_name || post_data.cust_last_name != user_info.cust_last_name) {

            ApiDataService.post(`dashboard/update_profile/${user_info.cust_id}`, post_data).then(response => {
                setLoading_btn(false);
                let res_data = response.data;
                if (res_data.return_status == '0' || res_data.error_message == 'Success') {
                    setApiErrorClass('alert-success');
                    setApiError('Your profile updated successfully.');
                    userProfielFun();
                    if (post_data.cust_phone_no == user_info.cust_phone_no) {
                        router.push('payment');
                    }

                } else if (res_data.return_status == -111 || res_data.error_message == 'Error') {
                    setApiError(res_data.error_message);
                    setApiErrorClass('alert-danger');


                    Object.keys(res_data.result).map(function (key) {
                        if (res_data.result[key] && key != 'status') {
                            setError(key, { message: res_data.result[key] });
                        }
                    })
                }
                else {

                    setApiErrorClass('alert-danger');
                    //
                    setApiError(res_data.result.otp_value);
                    setApiError(res_data.error_message);
                }

            }).catch(e => {
                setApiErrorClass('alert-danger');
                setLoading_btn(false);
                console.log(e);
                setApiError(e.message);
            });
        } else if (post_data.cust_phone_no != user_info.cust_phone_no) {
            setLoading_btn(true);
            updatePhoneNoFun(post_data);
        } else {
            console.log(errors, 'errors33', post_data, props.user_state);
            setLoading_btn(false);
            router.push('payment');
        }
    }

    const updatePhoneNoFun = (post_data) => {
        if (phoneNo == undefined) {
            return true;
        } else if (!isValidPhoneNumber(phoneNo)) {
            return true;
        }
        setLoading_btn(true);


        // return false;
        ApiDataService.post(request_otp_url, post_data).then(response => {
            setLoading_btn(false);
            let res_data = response.data;
            if (res_data.return_status == 0) {
                let result_data = res_data.result;
                console.log(result_data, 'result_data');
                userProfielFun();
                clearErrors();
                router.push('delivery');

            } else if (res_data.return_status == -212) {
                //
                setApiError(res_data.error_message);
                setApiErrorClass('alert-danger');
            }
            else {
                Object.keys(res_data.result).map(function (key) {
                    if (res_data.result[key] && key.indexOf(['status', 'user_detail']) == -1 && res_data.result[key].length > 1) {
                        setError(key, { message: res_data.result[key] });
                    }
                });
                setApiError(res_data.error_message);
                setApiErrorClass('alert-danger');
            }

        }).catch(e => {
            setLoading_btn(false);
            //console.log(e);
            setApiError(e.message);
            setApiErrorClass('alert-danger');
        });
    }

    useEffect(() => {
        ApiDataService.getAll('fetch/country_lov').then(response => {
            let res_data = response.data;
            let list = res_data.result.map((data, i) => {
                return (<option value={data.country_iso} key={i} selected={cn_iso == data.country_iso ? 'selected' : ''} disabled={cn_iso == data.country_iso ? false : true}>{data.country_desc}</option>)
            }
            );
            setcountryList(list);
        }).catch(e => {
            console.log(e);
        });
        setphoneNumber(cust_phone_no);
        userProfielFun();
    }, []);

    // console.log(errors, 'errors44',cust_phone_no,'phoneNo',phoneNo);
    return (

        <div className="formaddedit">
            <div className={apiErrorClass ? setApiErrorClass : 'error_text'} style={{ padding: '8px' }}>
                <div className="fs-6 fw-lighter form-input-error">{apiError}</div>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="floating-field">
                            <Form.Control type="text" placeholder="" name="cust_first_name" className="form-control border-0 bg-transparent border-bottom border-dark rounded-0 p-0" onChange={handleChange} maxLength="45" {...register('cust_first_name', { required: true })} />
                            <label>{t("FirstName")}  </label>
                        </Form.Group>
                        {errors?.cust_first_name && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="floating-field">
                            <Form.Control type="text" placeholder="" name="cust_last_name" className="form-control border-0 bg-transparent border-bottom border-dark rounded-0 p-0" onChange={handleChange} {...register('cust_last_name', { required: true })} maxLength="45" />
                            <label>{t("LastName")} </label>

                        </Form.Group>
                        {errors?.cust_last_name && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="position-relative" style={{ marginTop: '21px' }}>
                            <PhoneInput
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry={cn_iso ? cn_iso.toUpperCase() : 'US'}
                                labels={langName == 'ar' ? ar : en}
                                className="signupmobile inputText form-control border-0 bg-transparent border-bottom border-dark rounded-0 "
                                placeholder="Enter phone number"
                                value={phoneNo}
                                onChange={(value) => { setphoneNumber(value), value ? setValue('cust_phone_no', value) : '' }}
                                error={phoneNo ? (isValidPhoneNumber(phoneNo) ? undefined : 'Invalid phone number') : 'Phone number required'}
                                name="cust_phone_no"
                                control={control}
                                rules={{ ...register('cust_phone_no', { required: true }) }}
                            />

                            <label className="phonelabel">{t('MobileNo')}</label>
                            {errors && errors.cust_phone_no && phoneNo == undefined && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                        </Form.Group>

                        {phoneNo && !isValidPhoneNumber(phoneNo) && (
                            <>
                                <span className="text-danger inputerror">
                                    {t('please_enter_a_valid_number')}
                                </span>
                            </>
                        )}
                        <span className="text-danger inputerror"> {errors && errors.cust_phone_no && errors.cust_phone_no.message} </span>
                        {phoneNo == '' && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}


                    </Col>

                    <Col sm={6}  >
                        <Form.Group className="position-relative " style={{ pointerEvents: 'none' }} >
                            <Form.Control as="select" className="form-control border-0 bg-transparent border-bottom border-dark rounded-0 p-0" name="cad_country" onChange={(e) => { handleChange }} {...register('cad_country', {})} defaultValue={cn_iso} >
                                <option value="" disabled>{t('SelectCountry')}</option>
                                {countryList}
                            </Form.Control>
                            <label className="selectlabel2">{t('Country')}</label>
                        </Form.Group>
                        {errors?.cad_country && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                    </Col>


                    <Col sm={6}>
                        <div className="hidden_filed">
                            <Form.Control type="hidden" name="cust_mobile_no" onChange={handleChange} {...register('cust_mobile_no', {})} value={user_info.cust_mobile_no ? user_info.cust_mobile_no : phoneNo} />

                            <Form.Control type="hidden" name="cust_user_id" onChange={handleChange} {...register('cust_user_id', {})} value={user_email} />
                            <Form.Control type="hidden" name="cust_cr_uid" onChange={handleChange} {...register('cust_cr_uid', {})} value={user_info.cust_cr_uid} />
                            {errors?.cust_user_id && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

                            <Form.Control type="hidden" placeholder="auth_token" name="auth_token" onChange={handleChange} {...register('auth_token', { required: true })} value={auth_token} />
                            {errors?.auth_token && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

                            <Form.Control type="hidden" name="cust_email_id" onChange={handleChange} {...register('cust_email_id', { required: true })} value={user_info.cust_email_id} />
                            {errors?.cust_email_id && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')} </span>}

                            <Form.Control type="hidden" name="cust_title" onChange={handleChange} {...register('cust_title', {})} value={user_info.cust_title ? user_info.cust_title : 'Mr'} />
                            <Form.Control type="hidden" name="page_name" onChange={handleChange} {...register('page_name', { required: true })} value={'CLICK_COLLECT'} />

                        </div>

                        <Col sm={12} className="color-button" style={{ width: '100%' }}>
                            <LaddaButton loading={loading_btn} type="submit" className="submit_btn"><span>{t('Save_and_continue')}</span></LaddaButton>
                        </Col>
                    </Col>
                </Row>
            </Form>




        </div>


    );
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer, manu_and_site_state: state.MenusItemReduser });
const mapDispatchToProps = (dispatch) => {
    return {
        user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClickCollect);