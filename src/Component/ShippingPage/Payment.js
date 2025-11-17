import React, { useState, useEffect, useContext, Suspense } from "react";
import $ from "jquery";
import { Col, Alert, Row, Form, Accordion, Card, Button, InputGroup, FormControl, FloatingLabel } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useForm } from "react-hook-form";
let pay_img = "/assets/images/payment/";
import ApiDataService from "../../services/ApiDataService";
import LaddaButton from "react-ladda";
import { ShippingContext } from "./ShippingPage";
import { defaultLocale } from '@utils/i18n';
import { useTranslation } from 'next-i18next'
import ShippingPageSkeleton from '../../Preloader/ShippingPage';
import UserCardList from "./UserCardList";
import _ from "lodash/fp";
import { connect } from "react-redux";
import ApplePay from './ApplePay/Index';
import TabbyPayment from './TabbyPayment';
import GoogleAnalytics from "../../services/GoogleAnalytics";
import InstallmentsMerchantpage from "./Payment/InstallmentsMerchantpage";
import TamaraPayment from "./Payment/TamaraPayment"
import { useRouter } from "next/router";
import PointsPayPayment from "./Payment/PointsPayPayment";
import UTapPayment from "./Payment/UTapPayment";

const Payment = (props) => {
  const { t } = useTranslation('common');
  const [loading_btn, setLoading_btn] = useState(false);
  const [errorMgs, setErrorMgs] = useState(false);
  const [variant, setVariant] = useState("danger");
  const [merchant_response, setMerchant_response] = useState({});
  const [expiry_date, setExpiry_date] = useState('');
  const { register, handleSubmit, watch, setValue, setError, getValues, reset, formState: { errors } } = useForm();

  const [loading, setLoading] = useState(true);
  const [selectCardInfo, setSelectCardInfo] = useState(false);
  const [saveCardList, setSaveCardList] = useState(false);
  const { shipping_state } = useContext(ShippingContext);
  const router = useRouter();

  let user_info = props.user_state ? props.user_state.user_info : null;
  let auth_token = props.user_state ? props.user_state.auth_token : '';

  // if (user_info == null || auth_token == null || auth_token.length == null) {
  //   return <Redirect to={`/${defaultLocale}`} />;
  // }


  const [state, setState] = useState({
    save_card_input: false,
    cardYear: '',
    cardMonth: ''
  });

  //console.log(shipping_state.header_info.SOH_CCY_CODE, 'shipping_state.price_array111')
  useEffect(() => {
    if (shipping_state.price_array && Number(shipping_state.price_array.SOL_GROSS_VALUE) > 0) {
      payfortMerchantPage();
    }
    setTimeout(() => {
      setLoading(false);
      if (shipping_state.price_array && Number(shipping_state.price_array.SOL_GROSS_VALUE) > 0) {
        GoogleAnalytics.addPaymentInfo(shipping_state.header_info, shipping_state.order_list, '');
      }
    }, 1000);
  }, [shipping_state.price_array]);


  const date = new Date();
  let today_year = date.getFullYear();
  let year11 = today_year + 11;
  let today_month = date.getMonth();
  let t_month = (today_month + 1).toString();


  let year_array = [];
  for (today_year; today_year < year11; today_year++) {
    year_array.push(today_year);
  }
  const dateFun = () => {
    setExpiry_date($("#cardYear").val() + "" + $("#cardMonth").val());
    setValue('expiry_date', $("#cardYear").val() + "" + $("#cardMonth").val());
  };

  const handleInputChange = (event) => {
    //console.log(event);
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    //console.log(event, target, value, name);
    if (target.type == 'checkbox') {
      setState({ ...state, save_card_input: value });
    } else {
      setState({ ...state, name: value });
    }

  }
  //let today_month = '0' + (date.getMonth() + 2);
  //let expiry_date = today_year + today_month;
  const payfortMerchantPage = () => {
    ApiDataService.post("payment/merchantPage", {})
      .then((response) => {
        let res_data = response.data;
        setLoading_btn(false);
        //   
        setMerchant_response(res_data);
        if (res_data.params) {
          let params_val = res_data.params;
          setValue('merchant_identifier', params_val.merchant_identifier);
          setValue('access_code', params_val.access_code);
          setValue('merchant_reference', params_val.merchant_reference);
          setValue('service_command', params_val.service_command);
          setValue('language', params_val.language);
          setValue('return_url', params_val.return_url);
          setValue('signature', params_val.signature);
        } else if (res_data.return_status == '333' && res_data.error_message == 'User and order data have not found') {
          props.user_dispatch('LOGOUT_USER');
          router.push('/cartPage');
        }

        setTimeout(function () {
          if (t_month < 10) {
            $("#cardMonth").val('0' + t_month);
          }
          setExpiry_date($("#cardYear").val() + "" + $("#cardMonth").val());
          setValue('expiry_date', $("#cardYear").val() + "" + $("#cardMonth").val());
          setLoading(false)
        }, 1000);
      })
      .catch((e) => {
        setLoading_btn(false);
        setErrorMgs(e.message);
        setVariant("danger");
        setLoading(false);
      });
  };



  let tolat_price = shipping_state.price_array ? Number(shipping_state.price_array.SOL_GROSS_VALUE) + Number(shipping_state.shipping_price) : 0 + Number(shipping_state.shipping_price);

  const tmpToMain = () => {
    if (tolat_price == 0) {
      setLoading_btn(true);
      ApiDataService.post("payment/tmpToMain", {})
        .then((response) => {
          setLoading_btn(false);
          let res_data = response.data;
          GoogleAnalytics.addPaymentInfo(shipping_state.header_info, shipping_state.order_list, 'No Card');
          //  
          if (res_data.return_status == 0 && res_data.error_message == "Success") {
            console.log(res_data.order_id, defaultLocale, 'defaultLocale');
            if (Number(shipping_state.price_array.SOL_VALUE) > 0) {
              router.push("/" + defaultLocale + "/payment/success?orderId=" + res_data.order_id);
            } else {
              router.push("/" + defaultLocale + "/payment/sample?orderId=" + res_data.order_id);
            }

            // window.location.reload();
          } else {
            setErrorMgs(res_data.error_message);
          }
        })
        .catch((e) => {
          setLoading_btn(false);
          setErrorMgs(e.message);
          setVariant("danger");
        });
    }
  };

  const saveCardPayment = () => {
    // return false;
    if (selectCardInfo.CVV_NUMBER > 2) {
      setLoading_btn(true);
      setExpiry_date(selectCardInfo.SCC_EXP_YEAR + "" + selectCardInfo.SCC_EXP_MONTH);
      setValue('card_number', selectCardInfo.SCC_CARD_NUMBER);
      setValue('card_holder_name', selectCardInfo.SCC_CARD_HOLDER);
      setValue('card_security_code', selectCardInfo.CVV_NUMBER);
      setValue('expiry_date', selectCardInfo.SCC_EXP_YEAR + "" + selectCardInfo.SCC_EXP_MONTH);

      GoogleAnalytics.addPaymentInfo(shipping_state.header_info, shipping_state.order_list, 'Card');
      setTimeout(() => {
        document.getElementById("PaymentForm").submit();
      }, 500);

    } else if (selectCardInfo) {
      setLoading_btn(false);
      alert('Please fill CVV number');
    } else {
      setLoading_btn(false);
      alert('Please select save card');
    }
  }

  const onSubmit = (data) => {
    console.log(data, 'data1111');
    /// return false;
    setLoading_btn(true);
    if (state.save_card_input) {
      let post_data = {
        "cust_user_id": user_info.cust_email_id,
        "auth_token": auth_token,
        "SCC_CARD_NUMBER": data.card_number,
        "SCC_CARD_HOLDER": data.card_holder_name,
        "SCC_EXP_MONTH": $("#cardMonth").val(),
        "SCC_EXP_YEAR": $("#cardYear").val(),
        "SCC_ACTIVE_YN": 'Y'
      }

      ApiDataService.post('dashboard/customerCard', post_data).then(response => {
        let res_data = response.data;

        if (res_data.return_status == 0 && res_data.error_message == 'Success') {
          document.getElementById("PaymentForm").submit();
        } else {
          //setErrorMgs(res_data.error_message);
          setErrorMgs(res_data.result.SCC_CARD_NUMBER);
          setVariant('danger');
        }
        setLoading_btn(false);
      }).catch((e) => {
        setErrorMgs(e.message);
        setVariant('danger');
      });
    } else {
      GoogleAnalytics.addPaymentInfo(shipping_state.header_info, shipping_state.order_list, 'Card');
      document.getElementById("PaymentForm").submit();
    }

  }

  console.log(errors, 'errors111');

  return (
    <>
      <div className="ShippingPayment">
        {errorMgs ? (
          <Alert
            className="api_alert_mgs fs-6"
            variant={variant}
            onClose={() => setErrorMgs(false)}
            dismissible
          >
            {errorMgs}
          </Alert>
        ) : (
          ""
        )}
        {tolat_price > 0 ? (

          <Row>
            <Suspense fallback={<ShippingPageSkeleton />}>
              {loading ? <ShippingPageSkeleton /> :
                <Col sm={12}>

                  <Accordion defaultActiveKey={`0`}>

                    <Accordion.Item eventKey="0" className={saveCardList && saveCardList.length > 0 ? 'show' : 'd-none'}>
                      <Accordion.Header>
                        <label className="m-0">{t('Your_saved_credit_Cards')}</label>
                      </Accordion.Header>

                      <Accordion.Body className="paypalpayment p-0 p-sm-3">
                        <Card.Body className="p-2 p-sm-3">
                          <div className="details well">
                            <Row>
                              <UserCardList setSelectCardInfo={setSelectCardInfo} selectCardInfo={selectCardInfo} setSaveCardList={setSaveCardList} saveCardList={saveCardList} />
                              <Col sm={12}>
                                <div className="color-button float-end">
                                  <LaddaButton loading={loading_btn} className="pay-button" type="button" disabled={selectCardInfo.CVV_NUMBER ? false : true} onClick={() => { saveCardPayment() }}>
                                    <span>{t("PAY")}</span>
                                  </LaddaButton>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Card.Body>
                      </Accordion.Body>
                    </Accordion.Item>


                    <Accordion.Item eventKey={saveCardList && saveCardList.length > 0 ? "1" : "0"}>
                      <Accordion.Header className="other-payment-method">
                        <label className="m-0">
                          <h6 className="mb-2"> {t('Another_payment_method')}</h6>
                          <div>
                            <span htmlFor="dd" className="card_log">
                              <LazyLoadImage
                                className="img-fluid"
                                src={`${pay_img}01.jpg`}
                                alt="Mada"
                                width="auto"
                                height="auto"
                              />
                              <LazyLoadImage
                                className="img-fluid"
                                src={`${pay_img}02.jpg`}
                                alt="Mada"
                                width="auto"
                                height="auto"
                              />
                              <LazyLoadImage
                                className="img-fluid"
                                src={`${pay_img}03.png`}
                                alt="Mada"
                                width="auto"
                                height="auto"
                              />
                              <LazyLoadImage
                                className="img-fluid"
                                src={`${pay_img}04.png`}
                                alt="Mada"
                                width="auto"
                                height="auto"
                              />
                              <LazyLoadImage
                                className="img-fluid"
                                src={`${pay_img}06.jpg`}
                                alt="Mada"
                                width="auto"
                                height="auto"
                              />
                              <LazyLoadImage
                                className="img-fluid"
                                src={`${pay_img}amax_logo.jpg`}
                                alt="Mada"
                                width="auto"
                                eight="auto"
                              />
                            </span>
                          </div>
                        </label>
                      </Accordion.Header>
                      <Accordion.Body className="paypalpayment p-0 p-sm-3">
                        <Card.Body className="p-2 p-sm-3">
                          <div className="details well">
                            <Row>
                              <Col sm={12}>
                                <Form
                                  className="form-horizontal"
                                  action={merchant_response.url}
                                  method="POST"
                                  id="PaymentForm"
                                  onSubmit={handleSubmit(onSubmit)}

                                >

                                  <Col sm={12}>
                                    <FloatingLabel
                                      controlId=""
                                      label={t('Debit_Credit_Card_Number')}
                                      className="my-2 my-xl-2"
                                    >
                                      {/* {errors.card_number && (
                                        <span className="text-danger fs-6 fw-lighter form-input-error">
                                          {t('Thisfieldisrequired')}
                                        </span>
                                      )} */}
                                      <Form.Control
                                        type="text"
                                        placeholder={t('Debit_Credit_Card_Number')}
                                        name="card_number"
                                        className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                                        maxLength="16"
                                        {...register('card_number', { pattern: /^[0-9]+$/i, maxLength: 16, minLength: 15, required: true })}
                                        autoComplete="off"
                                        required
                                      />

                                      {_.get("card_number.type", errors) === "required" && (
                                        <span className="text-danger fs-6 fw-lighter form-input-error">
                                          {t('Thisfieldisrequired')}
                                        </span>
                                      )}
                                      {_.get("card_number.type", errors) === "minLength" && (
                                        <span className="text-danger fs-6 fw-lighter form-input-error">
                                          {t('min_length_validation', { length: 15 })}
                                        </span>
                                      )}
                                      {_.get("card_number.type", errors) === "maxLength" && (
                                        <span className="text-danger fs-6 fw-lighter form-input-error">
                                          {t('max_length_validation', { length: 16 })}
                                        </span>
                                      )}
                                      {_.get("card_number.type", errors) === "pattern" && (
                                        <span className="text-danger fs-6 fw-lighter form-input-error">
                                          {t('Numeric_validation')}
                                        </span>
                                      )}
                                    </FloatingLabel>
                                  </Col>
                                  <Row>
                                    <Col xs={6} sm={4}>
                                      <FloatingLabel
                                        controlId=""
                                        label={t('Card_Month')}
                                        className="my-2 my-xl-2"
                                      >
                                        <Form.Select
                                          as="select"
                                          className="form-control border-0 bg-transparent border-bottom border-dark rounded-0 inputText"
                                          id="cardMonth"
                                          onChange={dateFun}

                                        >
                                          <option value="01">{t('Jan')}</option>
                                          <option value="02">{t('Feb')}</option>
                                          <option value="03">{t('Mar')}</option>
                                          <option value="04">{t('Apr')}</option>
                                          <option value="05">{t('May')}</option>
                                          <option value="06">{t('June')}</option>
                                          <option value="07">{t('July')}</option>
                                          <option value="08">{t('Aug')}</option>
                                          <option value="09">{t('Sep')}</option>
                                          <option value="10">{t('Oct')}</option>
                                          <option value="11">{t('Nov')}</option>
                                          <option value="12">{t('Dec')}</option>
                                        </Form.Select>
                                      </FloatingLabel>
                                    </Col>
                                    <Col xs={6} sm={4}>
                                      <FloatingLabel
                                        controlId=""
                                        label={t('Card_Year')}
                                        className="my-2 my-xl-2"
                                      >
                                        <Form.Select
                                          as="select"
                                          className="form-control border-0 bg-transparent border-bottom border-dark rounded-0 inputText"
                                          id="cardYear"
                                          onChange={dateFun}
                                        >
                                          {year_array.map((data, i) => {
                                            let short_y = data.toString().substr(-2);
                                            return (
                                              <option value={short_y} key={i}>
                                                {data}
                                              </option>
                                            );
                                          })}
                                        </Form.Select>
                                      </FloatingLabel>
                                    </Col>
                                    <Col xs={6} sm={4}>
                                      <FloatingLabel
                                        controlId=""
                                        label={t('Card_CVV')}
                                        className="my-2 my-xl-2"
                                      >
                                        <Form.Control
                                          type="text"
                                          placeholder={t('Card_CVV')}
                                          name="card_security_code"
                                          maxLength="4"
                                          className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                                          {...register('card_security_code', { pattern: /^[0-9]+$/i, maxLength: 4, minLength: 3, required: true })}

                                          autoComplete="off"
                                          required

                                        />
                                        {_.get("card_security_code.type", errors) === "required" && (
                                          <span className="text-danger fs-6 fw-lighter form-input-error">
                                            {t('Thisfieldisrequired')}
                                          </span>
                                        )}
                                        {_.get("card_security_code.type", errors) === "maxLength" && (
                                          <span className="text-danger fs-6 fw-lighter form-input-error">
                                            {t('min_length_validation', { length: 3 })}
                                          </span>
                                        )}
                                        {_.get("card_security_code.type", errors) === "minLength" && (
                                          <span className="text-danger fs-6 fw-lighter form-input-error">
                                            {t('max_length_validation', { length: 3 })}
                                          </span>
                                        )}
                                        {_.get("card_security_code.type", errors) === "pattern" && (
                                          <span className="text-danger fs-6 fw-lighter form-input-error">
                                            {t('Numeric_validation')}
                                          </span>
                                        )}

                                      </FloatingLabel>
                                    </Col>
                                  </Row>
                                  <Col sm={12}>
                                    <FloatingLabel
                                      controlId=""
                                      label={t('Card_Holder_Name')}
                                      className="my-2 my-xl-2"
                                    >
                                      <Form.Control
                                        type="text"
                                        placeholder={t('Card_Holder_Name')}
                                        name="card_holder_name"
                                        className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                                        maxLength="35"
                                        {...register('card_holder_name', { required: true })}
                                        autoComplete="off"
                                        required
                                      />
                                      {_.get("card_holder_name.type", errors) === "required" && (
                                        <span className="text-danger fs-6 fw-lighter form-input-error">
                                          {t('Thisfieldisrequired')}
                                        </span>
                                      )}
                                    </FloatingLabel>
                                  </Col>

                                  <div className="hidden_value">

                                    <Form.Control
                                      type="hidden"
                                      name="expiry_date"
                                      value={expiry_date}
                                      {...register('expiry_date', { required: true })}
                                    />

                                    <Form.Control
                                      type="hidden"
                                      name="merchant_identifier"
                                      value={
                                        merchant_response && merchant_response.params
                                          ? merchant_response.params.merchant_identifier
                                          : ""
                                      }
                                      {...register('merchant_identifier', { required: true })}
                                    />
                                    <Form.Control
                                      type="hidden"
                                      name="access_code"
                                      value={
                                        merchant_response && merchant_response.params
                                          ? merchant_response.params.access_code
                                          : ""
                                      }
                                    />
                                    <Form.Control
                                      type="hidden"
                                      name="merchant_reference"
                                      value={
                                        merchant_response && merchant_response.params
                                          ? merchant_response.params.merchant_reference
                                          : ""
                                      }
                                      {...register('merchant_reference', { required: true })}
                                    />
                                    <Form.Control
                                      type="hidden"
                                      name="service_command"
                                      value={
                                        merchant_response && merchant_response.params
                                          ? merchant_response.params.service_command
                                          : ""
                                      }
                                      {...register('service_command', { required: true })}
                                    />
                                    <Form.Control
                                      type="hidden"
                                      name="language"
                                      value={
                                        merchant_response && merchant_response.params
                                          ? merchant_response.params.language
                                          : ""
                                      }
                                      {...register('language', { required: true })}
                                    />
                                    <Form.Control
                                      type="hidden"
                                      name="return_url"
                                      value={
                                        merchant_response && merchant_response.params
                                          ? merchant_response.params.return_url
                                          : ""
                                      }
                                      {...register('return_url', { required: true })}
                                    />
                                    <Form.Control
                                      type="hidden"
                                      name="signature"
                                      value={
                                        merchant_response && merchant_response.params
                                          ? merchant_response.params.signature
                                          : ""
                                      }
                                      {...register('signature', { required: true })}
                                    />
                                  </div>

                                  {user_info && user_info.cust_cr_uid != 'GUEST-USER' ?
                                    <div className="save_card_check py-3 mt-4 fs-6">
                                      <input type="checkbox" className="form-check-input" id="saveCardId" onChange={handleInputChange} />
                                      <label className="ps-2" htmlFor="saveCardId">{t('Save_my_card_details')}</label>
                                    </div> : ''}

                                  <Col sm={12}>
                                    <div className="color-button py-3 float-end">
                                      <LaddaButton loading={loading_btn} className="pay-button" type="submit">
                                        <span>{t("PAY")} </span>
                                      </LaddaButton>
                                    </div>
                                  </Col>
                                </Form>
                              </Col>
                            </Row>
                          </div>
                        </Card.Body>
                      </Accordion.Body>
                    </Accordion.Item>
                    {['AED', 'SAR'].indexOf(shipping_state.header_info.SOH_CCY_CODE) >= 0 ?
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>
                          <label className="m-0">{t('Installments_Payment')}</label>
                        </Accordion.Header>
                        <Accordion.Body className="paypalpayment" style={{ padding: "0px 22px" }}>
                          <TabbyPayment></TabbyPayment>
                          <TamaraPayment></TamaraPayment>
                          {shipping_state && shipping_state.header_info && ['AED', 'SAR'].indexOf(shipping_state.header_info.SOH_CCY_CODE) >= 0 && shipping_state.header_info.SOH_NET_VALUE >= 500 ?
                            <InstallmentsMerchantpage></InstallmentsMerchantpage>
                            : ''}
                        </Accordion.Body>
                      </Accordion.Item>
                      : ''}
                    { PointsPayPayment && ['EGP'].indexOf(shipping_state.header_info.SOH_CCY_CODE) == -1 ?
                      <Accordion.Item eventKey="3">
                        <Accordion.Header>
                          <label className="m-0">{t('Redeem_Points_Payment')}</label>
                        </Accordion.Header>
                        <Accordion.Body className="paypalpayment" style={{ padding: "0px 22px" }}>
                          <PointsPayPayment></PointsPayPayment>
                        </Accordion.Body>
                      </Accordion.Item> : ''}

                    {UTapPayment && ['AED'].indexOf(shipping_state.header_info.SOH_CCY_CODE) >= 0 && false ?
                      <Accordion.Item eventKey="5">
                        <Accordion.Header>
                          <label className="m-0">{t('UTapPayment')}</label>
                        </Accordion.Header>
                        <Accordion.Body className="paypalpayment" style={{ padding: "0px 22px" }}>
                          <UTapPayment></UTapPayment>
                        </Accordion.Body>
                      </Accordion.Item> : ''}
                    <Accordion.Item eventKey="4">
                      <Row className="w-100">
                        <Col sm={12} className="text-start">
                          <ApplePay></ApplePay>
                        </Col>
                      </Row>
                    </Accordion.Item>

                  </Accordion>


                </Col>
              } </Suspense>
          </Row>

        ) : (

          <Suspense fallback={<ShippingPageSkeleton />}>
            {loading ? <ShippingPageSkeleton /> :
              <Row>
                <Col className="color-button pt-4">
                  <LaddaButton
                    loading={loading_btn}
                    className="pay-button"
                    type="button"
                    onClick={tmpToMain}
                  >
                    <span>{t('Proceed_to_order')}</span>
                  </LaddaButton>
                </Col>
              </Row>
            }
          </Suspense>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({ user_state: state.UserReducer, manu_and_site_state: state.MenusItemReduser });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);