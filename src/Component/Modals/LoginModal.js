import React, { useState, useCallback, useEffect } from 'react';
import $ from 'jquery';
import { useForm } from "react-hook-form";
import { Modal, Col, Form, Row, InputGroup, FormControl } from 'react-bootstrap'
import OtpInput from "react-otp-input";

import ApiDataService from '../../services/ApiDataService';
import LaddaButton from 'react-ladda';
import { connect } from "react-redux";
import GLOBALS from '../../Globals';
import { ImFacebook } from "react-icons/fa";
import('text-security/text-security.css');

import SnapPixel from "../../services/SnapPixel";

// Phone input for login with phone
import 'react-phone-number-input/style.css';
import en from 'react-phone-number-input/locale/en';
import ar from 'react-phone-number-input/locale/ar';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { langName, cn_iso } from '@utils/i18n';

const request_otp_url = 'sg_customer/request_login_via_otp';
const login_url = 'sg_customer/login';
const login_with_otp_url = 'sg_customer/login_via_otp';
let email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

import { LoginSocialGoogle, LoginSocialFacebook, IResolveParams } from 'reactjs-social-login';
import { GoogleLoginButton, FacebookLoginButton, createButton } from 'react-social-login-buttons';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'node_modules/next/router';
const REDIRECT_URI = typeof window !== "undefined" && window.location.host;


const handleChange = (e) => {
	if ($(e.target).val() != "") {
		$(e.target).addClass("has-content");
	} else {
		$(e.target).removeClass("has-content");
	}
}

const OTPLoginModel = (props) => {
	const { t } = useTranslation('common');
	const [OTP, setOTP] = useState()
	const handleChangeOTP = (otp) => {
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
					<OtpInput
						value={OTP}
						onChange={handleChangeOTP}
						numInputs={6}
						isInputNum={true}
						className="otp_value"
						{...props?.register('otp_value', { required: true })}
					/>
					<span className="text-danger inputerror">{props?.errors && props?.errors?.otp_value && props?.errors?.otp_value.message} </span>

					<Form.Control
						type="hidden"
						className="form-control inputText"
						name="otp_value"
						value={OTP}
						onChange={handleChange}
					/>
				</Col>
			</Row>


			<input
				type="hidden"
				className="form-control inputText"
				name="cust_mobile_no"
				onChange={handleChange}
				maxLength={13}
				minLength={9}
				pattern="[+-]?\d+(?:[.,]\d+)?"
				{...props?.register('cust_mobile_no', { required: true })}
			/>

			<input
				type="hidden"
				className="form-control inputText"
				name="cust_email_id"
				onChange={handleChange}
				{...props?.register('cust_email_id', { required: true })}
			/>

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
				value={login_with_otp_url}
				onChange={handleChange}
				{...props?.register('url', { required: true })}
			/>

			<input
				type="hidden"
				name="login_type"
				value="Login_with_OTP"
				onChange={handleChange}
				{...props?.register('login_type', { required: true })}
			/>
			<span className="text-danger "> {props.errors.cust_mobile_no && props.errors.cust_mobile_no.message}</span>
			<span className="text-danger "> {props.errors.request_id && props.errors.request_id.message}</span>

			<div className="color-button">
				<LaddaButton loading={props.loading_btn} type="submit"  ><span>{t('VerifyOTP')} </span></LaddaButton>
			</div>
		</section>
	)
}

const LoginFormModel = (props) => {
	const { t } = useTranslation('common');
	const [isActive, setIsActive] = useState(false);
	const router = useRouter();
	let head_sys_id = router.query && router.query.head_sys_id ? router.query.head_sys_id : false;
	let pathname = router.pathname;
	const [loginWith, setLoginWith] = useState('email'); // 'email' | 'phone'
	const [mobileNo, setMobileNo] = useState('');

	const ForgotShowHide = () => {
		props.loginOnHide();
		props.onShowForgotPWD();
	}

	const clearErrorsFun = () => {
		props.clearErrors();
	}

	const pwdShowHide = event => {
		setIsActive(current => !current);
	};

	return (
		<div className="login_form">
			<Row>
				<Col sm="12">
					{/* Login method selector */}
					<Form.Group className="mb-2 login_with">
						<label>{t("LoginWith")}</label>
						<br></br>
						<Form.Check
							inline
							type="radio"
							id="loginWithEmail"
							label={t("Email_Login")}
							name="login_method"
							checked={loginWith === 'email'}
							onChange={() => {
								// Reset and unregister previous validators when switching method
								props.unregister && props.unregister('user_id');
								props.setValue && props.setValue('user_id', '', { shouldDirty: false, shouldValidate: false });
								setLoginWith('email');
								clearErrorsFun();
							}}
						/>
						<Form.Check
							inline
							type="radio"
							id="loginWithPhone"
							label={t("MobileNo")}
							name="login_method"
							checked={loginWith === 'phone'}
							onChange={() => {
								// Reset and unregister previous validators when switching method
								props.unregister && props.unregister('user_id');
								props.setValue && props.setValue('user_id', '', { shouldDirty: false, shouldValidate: false });
								setLoginWith('phone');
								clearErrorsFun();
							}}
						/>
					</Form.Group>

					{loginWith === 'email' ? (
						<Form.Group className="floating-field">
							<Form.Control
								type="email"
								placeholder=""
								name="user_id"
								{...props?.register('user_id',
									{
										required: true,
										pattern: email_pattern,
										onChange: (e) => {
											props.setValue('user_id', e.target.value)
											clearErrorsFun()
										}
									})}
								className="form-control rounded-0 border-top-0 border-start-0 border-end-0"
							/>
							<label>{t('EnterEmail')} </label>
							{/* Email validation error */}
							<span className="text-danger inputerror"> {props?.errors?.user_id && t('Email_required')}</span>
						</Form.Group>
					) : (
						<Form.Group className="floating-field input-group">
							<label style={{ color: '#7d808b', top: '-1rem', font: 'normal normal normal 13px/15px Helvetica-Neue', position: 'absolute' }}>{t('EnterMobileNumber')}</label>
						<PhoneInput
							international
							countryCallingCodeEditable={false}
							defaultCountry={cn_iso ? cn_iso.toUpperCase() : 'US'}
							labels={langName == 'ar' ? ar : en}
							className="signupmobile inputText form-control border-0 bg-transparent border-bottom border-dark rounded-0 "
							style={{ width: '100%' }}
							placeholder=""
							value={mobileNo}
							onChange={(val) => {
								const v = val || '';
								setMobileNo(v);
								props.setValue('user_id', v, { shouldValidate: true, shouldDirty: true });
								clearErrorsFun();
							}}
						/>
							{/* Basic phone validation feedback */}
							<div className="text-danger inputerror" style={{ marginTop: "6px" }}>
								{mobileNo ? (!isValidPhoneNumber(mobileNo) ? <span >Invalid phone number</span> : '') : ''}
							</div>
							{/* Integrate with react-hook-form via hidden field to keep variable name unchanged */}
							<input
								type="hidden"
								name="user_id"
								value={mobileNo || ''}
								{...props?.register('user_id', {
									required: true,
									validate: (val) => (val ? isValidPhoneNumber(val) : false) || 'Invalid phone number'
								})}
								readOnly
							/>

						</Form.Group>

					)}

					{/* Preserve existing error placeholders to avoid breaking flows */}
					{loginWith === 'email' && (
						<>
							<span className="text-danger inputerror"> {!props?.errors?.user_id && props?.errors?.cust_mobile_no && props.errors.cust_mobile_no.message}</span>
							<span className="text-danger inputerror"> {props?.errors && !props?.errors?.user_id && props?.errors?.cust_email_id && props?.errors?.cust_email_id.message}</span>
						</>
					)}
				</Col>

				<Col sm="12">
					<InputGroup className="floating-field">
						<Form.Control
							type={isActive ? 'text' : 'password'}
							placeholder=""
							id="login_pwd"
							className={`form-control rounded-0 border-top-0 border-start-0 border-end-0 inputText ${!isActive ? 'password' : ''}`}
							name="pass_word"
							onChange={handleChange}
							// ref={props.register({ required: true })}
							minLength={2}
							maxLength={15}
							{...props?.register('pass_word', { required: true })}
						/>

						<label>{t('Enter_Password')}</label>
						<InputGroup.Text id="pwdshowhide" onClick={pwdShowHide}> {!isActive ? t('Show') : t('Hide')} </InputGroup.Text>
					</InputGroup>
					<span className="text-danger inputerror">  {props?.errors && props?.errors?.pass_word && t('Password_required')}</span>
				</Col>
				{pathname == '/modification' && head_sys_id ?
					<Col sm={12}>
						<input
							type="hidden"
							name="head_sys_id"
							value={head_sys_id}
							onChange={handleChange}
							{...props?.register('head_sys_id', { required: true })}
							className="form-control rounded-0 border-top-0 border-start-0 border-end-0 read_only"
						/>
					</Col>
					: ''}
				<Col sm={12} className="forgot_link pb-2">
					<span className="orange_color_text Forgot_Password_Continue" onClick={ForgotShowHide}> {t('Forgot_password')} </span>
				</Col>

				<Col sm={12}>
					<input
						type="hidden"
						name="url"
						value={login_url}
						onChange={handleChange}
						{...props?.register('url', { required: true })}
					/>

					<input
						type="hidden"
						name="login_type"
						value="Login_with_PWD"
						onChange={handleChange}
						{...props?.register('login_type', { required: true })}
					/>

					<span className="text-danger "> {props?.errors && props?.errors?.url && props?.errors?.url?.message}</span>
					<div className="color-button">
						<LaddaButton loading={props.loading_btn} type="submit" className='Login_Proceed'><span>{t('login')}  </span></LaddaButton>
					</div>
					{/* <h6 className="text-center p-2">Or</h6>
					<div className="border-button">
						<LaddaButton type="button" loading={props.loading_btn} onClick={props.requestOTP}  ><span> {t('Request_OTP')} </span></LaddaButton>
					</div> */}
					{router.pathname.split('/').indexOf('cartpage') > 0 || router.pathname.split('/').indexOf('cartPage') > 0 ?
						<>
							<h6 className="text-center p-3">{t('or')}</h6>
							<div className="border-button" style={{ margin: '0px' }}>
								<LaddaButton type="button" className="guest_btn" onClick={() => { props.loginShowHide('GUEST-CHECKOUT-FORM') }}><span> {t('Guest_Checkout')} </span></LaddaButton>
							</div>
						</> : ''}

				</Col>
			</Row>
		</div>
	)
}


function LoginModal(props) {
	const { t } = useTranslation('common');
	const [sectionName, setSectionName] = useState('LoginFormModel');
	const { register, handleSubmit, watch, setError, formState: { errors }, getValues, setValue, clearErrors, control, unregister } = useForm({ shouldUnregister: true });
	const [apiError, setApiError] = useState();
	const [loading_btn, setLoading_btn] = useState(false);

	const [socialLogin, setSocialLogin] = useState(false);

	const config = {
		text: t('Continue_With_Facebook'),
		icon: "facebook",
		iconFormat: name => `fab fa-facebook-f`,
		className: "fb_btn"
	};
	const MyFacebookLoginButton = createButton(config);

	const google_config = {
		text: t('Continue_With_Google'),
		icon: "google",
		iconFormat: name => `fab fa-google`,
		className: "google_btn"
	};
	const MyGoogleLoginButton = createButton(google_config);

	let user_id = '';

	const requestOTP = () => {
		user_id = getValues("user_id");

		if (user_id == '' || !user_id) {
			setError('cust_mobile_no', { message: 'Email/User Id is required' });
		} else {
			if (email_pattern?.test(user_id && user_id)) {
				onSubmit({ cust_email_id: getValues("user_id"), url: request_otp_url, login_type: 'Request_OTP' });
			} else {
				onSubmit({ cust_mobile_no: getValues("user_id"), url: request_otp_url, login_type: 'Request_OTP' });
			}

		}
	}

	const onSubmit = (post_data) => {
		setLoading_btn(true);
		console.log(post_data, 'post_data****');
		ApiDataService.post(post_data.url, post_data).then(response => {
			setLoading_btn(false);
			let res_data = response.data;

			if (res_data.return_status == 0) {
				clearErrors();
				if (post_data.login_type == 'Login_with_PWD' || post_data.login_type == 'Login_with_OTP') {
					let user_info = res_data.result.user_detail[0];

					user_info['auth_token'] = res_data.result.auth_token;
					props.loginInfo(GLOBALS.user_reducer.LOGIN_USER, user_info);

					SnapPixel.login(user_info);

					if (res_data.result && res_data.result.modification_user_info && res_data.result.modification_user_info.CUST_SYS_ID && user_info.cust_type == 'ADMIN') {
						props.loginInfo('MODIFICATION_USER_INFO', res_data.result.modification_user_info);
					}
					props.loginOnHide();
					setSectionName('LoginFormModel');
					setApiError('');
				} else {
					let result_data = res_data.result;
					setSectionName('OTPLoginModel');

					if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(result_data.otp_sent_to)) {
						setValue('cust_email_id', post_data.cust_email_id);
					} else {
						setValue('cust_mobile_no', result_data.otp_sent_to);
					}
					setValue('request_id', result_data.requestId);
				}

			} else if (res_data.return_status == -212) {
				////
				setApiError(res_data.error_message);
			}
			else {
				////
				Object.keys(res_data.result).map(function (key) {
					if (res_data.result[key] && key.indexOf(['status', 'user_detail']) == -1 && res_data.result[key].length > 1) {
						setError(key, { message: res_data.result[key] });
					}
				});
				if (res_data.result.user_id) {
					setError('user_id', res_data.result.user_id);
				}
				if (res_data.result.pass_word) {
					setError('pass_word', res_data.result.pass_word);
				}
				if (res_data.result.site_id) {
					setError('site_id', res_data.result.site_id);
				}
				setApiError(res_data.error_message);
			}

		}).catch(e => {
			setLoading_btn(false);
			setApiError(e.message);
		});
	}

	const loginShowHide = (type) => {
		if (type == 'GUEST-CHECKOUT-FORM') {
			props.loginOnHide();
			props.onShowGuest();
		} else {
			props.loginOnHide();
			props.onShowSignup();
		}
		setSectionName('LoginFormModel');
		setApiError('');
		clearErrors();
	}

	// const loginShowHide = () => {
	// 	clearErrors();
	// 	props.loginOnHide();
	// 	props.onShowSignup();
	// 	setSectionName('LoginFormModel');
	// 	setApiError('');
	// }




	const section = () => {
		if (sectionName == 'OTPLoginModel') {
			return <OTPLoginModel register={register} errors={errors} loading_btn={loading_btn} setSectionName={setSectionName} setValue={setValue} getValues={getValues} requestOTP={requestOTP} clearErrors={clearErrors} user_id={user_id} {...props}></OTPLoginModel>;
		} else {
			return <LoginFormModel loginShowHide={loginShowHide} register={register} unregister={unregister} errors={errors} loading_btn={loading_btn} setSectionName={setSectionName} setValue={setValue} getValues={getValues} requestOTP={requestOTP} clearErrors={clearErrors} user_id={user_id} {...props}></LoginFormModel>;
		}
	}


	const socialLogionFun = (post_data, type, cust_cr_uid) => {
		post_data['cust_cr_uid'] = cust_cr_uid;
		setSocialLogin(true);
		ApiDataService.post('sg_customer/socialLoginFun/' + type, post_data).then(response => {
			setLoading_btn(false);
			let res_data = response.data;
			if (res_data.return_status == 0) {
				let user_info = res_data.result.user_detail;
				user_info['auth_token'] = res_data.result.auth_token;
				props.loginInfo(GLOBALS.user_reducer.LOGIN_USER, user_info);
				props.loginOnHide();
				setSectionName('LoginFormModel');
				setApiError('');
				SnapPixel.login(user_info);

			} else {
				console.log(res_data, 'Error');
				//setSocialLogin(false);
				setApiError(res_data.error_message);
			}
			setSocialLogin(false);
		}).catch(e => {
			setSocialLogin(false);
			console.log(e);
			setApiError(e.message);
		});
	}


	useEffect(() => {
		setSocialLogin(false);
	}, []);

	console.log(errors, 'errors***');

	return (
		<Modal
			show={props.loginShow} onHide={props.loginOnHide} animation={false} backdrop="static"
			keyboard={false}
			dialogClassName="loginPopup"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter" className="Login_Proceed">
					{t('login')}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="text-danger inputerror" style={{ padding: '5px 0px 10px 15px' }}>{apiError}</div>
				<div className={socialLogin ? 'opacity4' : ''}>

					<Row>
						<Col md={6} sm={12}>
							<LoginSocialFacebook
								appId={process.env.NEXT_PUBLIC_FB_APP_ID || ''}
								fieldsProfile={
									'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
								}
								onLoginStart={() => {
									setSocialLogin(true);
								}}
								//onLogoutSuccess={onLogoutSuccess}
								redirect_uri={REDIRECT_URI}
								onResolve={({ provider, data }) => {
									socialLogionFun(data, 'FACEBOOK', 'SOCIAL-FACEBOOK')

								}}
								onReject={err => {
									//console.log(err);
									setSocialLogin(false);

								}}
							>
								{/* <FacebookLoginButton loading={loading_btn} className='fb_btn'>{t('Continue_With_Facebook')}</FacebookLoginButton> */}
								<MyFacebookLoginButton />

							</LoginSocialFacebook>
						</Col>

						<Col md={6} sm={12}>
							<LoginSocialGoogle
								isOnlyGetToken
								client_id={process.env.NEXT_PUBLIC_GG_APP_ID || ''}
								scope="openid profile email"
								onLoginStart={() => {
									setSocialLogin(true);
								}}
								redirect_uri={REDIRECT_URI}
								//	discoveryDocs="claims_supported"
								//access_type="offline"
								onResolve={({ provider, data }) => {
									console.log(provider, data, 'GOOGLE....');
									if (data && data.access_token) {
										fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
											headers: { Authorization: `Bearer ${data.access_token}` },
										}).then(res => res.json()).then(response => {
											console.log(response, 'access_token152');
											socialLogionFun(response, 'GOOGLE', 'SOCIAL-GOOGLE');
										});
									}
								}
								}
								onReject={err => {
									console.log(err);
									setSocialLogin(false);
								}}
								cookiePolicy={'single_host_origin'}
							>
								{/* <GoogleLoginButton className='google_btn'>{t('Continue_With_Google')}</GoogleLoginButton> */}
								<MyGoogleLoginButton />
							</LoginSocialGoogle>
						</Col>
					</Row>
					<Row style={{ marginTop: '8px' }}>
						<Col style={{ paddingRight: '0px', width: "45% !important" }}><hr></hr></Col>
						<Col className="input-group-text" style={{ border: "none", backgroundColor: "transparent", width: "10% !important", flex: 0 }}>{t('or')}</Col>
						<Col style={{ paddingLeft: '0px', width: "45% !important" }}><hr></hr></Col>
					</Row>

					<form onSubmit={handleSubmit(onSubmit)}>
						{section()}
					</form>
				</div>

				<div className="signup_link pt-5 pb-2">
					<span>{t('New_at_Sedar')}  </span><span className="orange_color_text Create_An_Account_Button" onClick={loginShowHide}>  {t('Create_an_Account')} </span>
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

export default connect(null, mapDispatchToProps)(LoginModal);
