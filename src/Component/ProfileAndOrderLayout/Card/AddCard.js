import React, { useState, useEffect, Suspense } from "react";
import { Col, Alert, Row, Tab, Nav, Form, FloatingLabel } from 'react-bootstrap';
import { connect } from "react-redux";
import LaddaButton from "react-ladda";
import { useTranslation } from 'next-i18next'
import { defaultLocale } from '@utils/i18n';
import { useForm } from "react-hook-form";
import ApiDataService from '../../../services/ApiDataService';
import _ from "lodash/fp";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const AddCard = (props) => {
  const { t } = useTranslation('common');
  let user_info = props.user_state ? props.user_state.user_info : null;
  let auth_token = Cookies.get('AUTH_TOKEN');
  // if (user_info == null || auth_token == null || auth_token.length == null) {
  //   return <Redirect to={`/${defaultLocale}`} />;
  // }
  const router = useRouter();
  const { id } = router.query;
  // let { id } = useParams();

  const { register, handleSubmit, errors, setValue, setError } = useForm();
  const [loading_btn, setLoading_btn] = useState(false);
  const [errorMgs, setErrorMgs] = useState();
  const [variant, setVariant] = useState('danger');
  // let history = useHistory();




  const date = new Date();
  let today_year = date.getFullYear();
  let year11 = today_year + 11;
  let today_month = date.getMonth();


  let year_array = [];
  for (today_year; today_year < year11; today_year++) {
    year_array.push(today_year);
  }

  const getByIdCard = (id) => {
    let post_data = { "cust_user_id": user_info.cust_email_id, "auth_token": auth_token }
    ApiDataService.getAll('dashboard/customerCard/' + id, post_data).then(response => {
      let res_data = response.data;

      if (res_data.return_status == 0 && res_data.error_message == 'Success') {
        // setErrorMgs(res_data.error_message);
        // setVariant('success');
        //
        Object.keys(res_data.result).map(function (key) {
          setValue(key, res_data.result[key]);
        })
        setValue('SCC_ACTIVE_YN', res_data.result['SCC_ACTIVE_YN'] == 'Y' ? true : false);


      } else {
        setErrorMgs(res_data.error_message);
        setVariant('danger');
      }
    }).catch((e) => {
      setErrorMgs(e.message);
      setVariant('danger');
    });
  }

  const onSubmit = (data) => {

    let url = id > 0 ? 'dashboard/customerCard/update/' + id : 'dashboard/customerCard';
    let post_data = { ...data, "cust_user_id": user_info.cust_email_id, "auth_token": auth_token }
    ApiDataService.post(url, post_data).then(response => {
      let res_data = response.data;

      if (res_data.return_status == 0 && res_data.error_message == 'Success') {
        setErrorMgs(res_data.error_message);
        setVariant('success');
        //
        //history.push(`/${defaultLocale}/profile/card`);
        router.push(`/profile/card`);
      } else if (res_data.return_status == '-111' && res_data.error_message == 'Error') {
        Object.keys(res_data.result).map(function (key) {
          setError(key, { type: 'custom', message: res_data.result[key] });
        })
      } else {
        setErrorMgs(res_data.error_message);
        setVariant('danger');
      }
    }).catch((e) => {
      setErrorMgs(e.message);
      setVariant('danger');
    });
  }
  useEffect(() => {
    if (id > 0) {
      getByIdCard(id);
    }

  }, []);


  return (
    <div className="ProfileAddCard mt-15">
      <Tab.Container id="ProfileMyorder-tab" defaultActiveKey="first">
        <Row>
          <Col sm={12}>
            <Nav variant="pills" className="flex-row tab-nav">
              <Nav.Item>
                <p className="nav-link active"> {id > 0 ? t('UpdateCard') : t('AddNewCard')} </p>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={12} className="tab-content py-3">
            <Tab.Content>
              <Tab.Pane eventKey="first" transition={false}>
                <Col>

                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>

                      <Col sm={12} >
                        <Row className="flex-sm-row-reverse justify-content-sm-end">
                          <Col xs={12} sm={4} lg={4}>
                            <div className="form-check float-end p-0">
                              <Form.Check
                                type="switch"
                                value={`Y`}
                                name="SCC_ACTIVE_YN"
                                //ref={register()}
                                {...register('SCC_ACTIVE_YN')}
                                id="ActiveCheck1"
                                label={t("Active")}
                              />
                            </div>
                          </Col>
                          <Col xs={12} sm={8} lg={6}>
                            <FloatingLabel
                              controlId=""
                              label={t('Debit_Credit_Card_Number')}
                              className="my-3 py-2"
                            >

                              <Form.Control
                                type="text"
                                className="border-0 bg-transparent border-bottom border-dark rounded-0"
                                placeholder={t('Debit_Credit_Card_Number')}
                                name="SCC_CARD_NUMBER"
                                maxLength="16"
                                {...register('SCC_CARD_NUMBER', { pattern: /^[0-9]+$/i, maxLength: 16, minLength: 16, required: true })}
                                // ref={register({ pattern: /^[0-9]+$/i, maxLength: 16, minLength: 16, required: true })}
                                autoComplete="off"
                              />
                            </FloatingLabel>
                            {_.get("SCC_CARD_NUMBER.type", errors) === "custom" && (
                              <span className="text-danger fs-6 fw-lighter form-input-error">
                                {errors?.SCC_CARD_NUMBER.message}
                              </span>
                            )}
                            {_.get("SCC_CARD_NUMBER.type", errors) === "required" && (
                              <span className="text-danger fs-6 fw-lighter form-input-error">
                                {t('Thisfieldisrequired')}
                              </span>
                            )}
                            {_.get("SCC_CARD_NUMBER.type", errors) === "minLength" && (
                              <span className="text-danger fs-6 fw-lighter form-input-error">
                                {t('min_length_validation', { length: 16 })}
                              </span>
                            )}
                            {_.get("SCC_CARD_NUMBER.type", errors) === "maxLength" && (
                              <span className="text-danger fs-6 fw-lighter form-input-error">
                                {t('max_length_validation', { length: 16 })}
                              </span>
                            )}
                            {_.get("SCC_CARD_NUMBER.type", errors) === "pattern" && (
                              <span className="text-danger fs-6 fw-lighter form-input-error">
                                {t('Numeric_validation')}
                              </span>
                            )}
                          </Col>

                        </Row>
                      </Col>
                      <Col lg={6} md={8}>
                        <Row>

                          <Col xs={12}>
                            <FloatingLabel
                              controlId=""
                              label={t('Name_On_card')}
                              className="my-3 py-2"
                            >
                              <Form.Control
                                type="text"
                                className="border-0 bg-transparent border-bottom border-dark rounded-0"
                                placeholder={t('Name_On_card')}
                                name="SCC_CARD_HOLDER"
                                maxLength="35"
                                {...register('SCC_CARD_HOLDER', { required: true })}
                                // ref={register({ required: true })}
                                autoComplete="off"
                              />
                              {_.get("SCC_CARD_HOLDER.type", errors) === "custom" && (
                                <span className="text-danger fs-6 fw-lighter form-input-error">
                                  {errors?.SCC_CARD_HOLDER.message}
                                </span>
                              )}
                              {_.get("SCC_CARD_HOLDER.type", errors) === "required" && (
                                <span className="text-danger fs-6 fw-lighter form-input-error">
                                  {t('Thisfieldisrequired')}
                                </span>
                              )}
                            </FloatingLabel>
                          </Col>
                          <Col xs={6} sm={6}>
                            <FloatingLabel
                              controlId=""
                              label={t('Card_Month')}
                              className="my-3 py-2"

                            >
                              <Form.Select
                                as="select"
                                className="form-control inputText border-0 bg-transparent border-bottom border-dark rounded-0"
                                name="SCC_EXP_MONTH"
                                {...register('SCC_EXP_MONTH', { required: true })}
                                // ref={register({ required: true })}
                              // onChange={dateFun}
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
                          <Col xs={6} sm={6}>
                            <FloatingLabel
                              controlId=""
                              label={t('Card_Year')}
                              className="my-3 py-2"

                            >
                              <Form.Select
                                as="select"
                                className="form-control inputText border-0 bg-transparent border-bottom border-dark rounded-0"
                                name="SCC_EXP_YEAR"
                                {...register('SCC_EXP_YEAR', { required: true })}
                                // ref={register({ required: true })}
                              // onChange={dateFun}
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
                        </Row>
                      </Col>

                    </Row>
                    <Row>
                      <Col sm={12} className="button-section">
                        <div className="color-button">
                          <LaddaButton loading={loading_btn} className="" type="submit" ><span> {id > 0 ? t('UpdateCard') : t('SaveCards')} </span></LaddaButton>
                        </div>
                      </Col>
                      <Col sm={12} className="notice"> <p>{t("cardInfoNotice")}</p></Col>
                    </Row>

                  </Form>
                </Col>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

    </div>
  )
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCard);

