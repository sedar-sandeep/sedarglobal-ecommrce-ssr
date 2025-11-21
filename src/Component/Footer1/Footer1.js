import React, { useState } from "react";
// import './Footer1.scss';
import { Row, Image, Col, InputGroup, FormControl, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LaddaButton from 'react-ladda';

import _ from "lodash/fp";
import { useTranslation } from "next-i18next";
import LinkComponent from "@components/Link";
import { countryName, langName, visitorId } from "@utils/i18n";
import Cookies from "js-cookie";


const site_id = process.env.NEXT_PUBLIC_SITE_ID; //100001;
const site = Cookies.get('siteDetail');
let decimalPoints = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_decimals >= 0 ? parseInt(JSON.parse(site).show_decimals) : 2;
let ccy_code = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_ccy_code ? JSON.parse(site).show_ccy_code : '';
let cn_iso = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).primary_ref_cn_iso ? JSON.parse(site).primary_ref_cn_iso : '';


export default function Footer1(props) {
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const [apiError, setApiError] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [loading_btn, setLoading_btn] = useState(false);
  const { t } = useTranslation('common');

  if (props?.CHILD == undefined || props?.CHILD[0] == undefined) {
    return false;
  }

  // const whitelogo = props.CHILD[0].image_path == null ? "https://www.sedarglobal.com/assets/images/whitelogo.png" : props.CHILD[0].image_path;

  const whitelogo = props.CHILD[0].image_path == '' ? "https://www.sedarglobal.com/assets/images/whitelogo.png" : props.CHILD[0].image_path;

  const onSubmit = (data) => {
    const formData = new FormData()
    for (var key in data) {
      if (key == "documentfile") {
        formData.append("documentfile", data.documentfile[0])
      }
      else {
        formData.append(key, data[key]);
      }
    }

    let path_url = `?lang=${langName}&site=${site_id}&country=${countryName}&content=${`contact`}&visitorId=${visitorId}&currency=${ccy_code}&ccy_decimal=${decimalPoints}&cn_iso=${cn_iso}`;
    setLoading_btn(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}user/enquiry${path_url}`, {
      method: "POST",
      body: formData
    }).then(response => {
      setLoading_btn(false);
      let res_data = response.status;
      if (res_data == 200) {
        setSuccessMessage(t('we_will_get_back'));
        reset();

      } else {
        setApiError(res_data.error_message);
      }
    }).catch((error) => {
      setLoading_btn(false);
      console.log(error);
      setApiError(error);
    });

  }
  return (

    <div className="Footer1">

      <Row className="footer_box">
        {props.CHILD[0] &&
          <Col xl={7} lg={6} md={12} sm={12} >
            <div className="footer_logo">
              <LinkComponent href={"/"}>
                <LazyLoadImage effect="blur" src={whitelogo} className="footer_logo_img" alt="sedarglobal" width="auto" height="auto" />
              </LinkComponent>
            </div>
          </Col>
        }

        <Col xl={5} lg={6} md={12} sm={12} className="ps-0">

          <div className="footer_subscribe text-center  text-lg-start">
            <h2 className=""> {t('Subscribeemail')}</h2>
            <p className=""> {t('Inspirationmore')} </p>
            <div className="subscribe_form">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Control
                  type="hidden"
                  name="enquiry_type"
                  // ref={register}
                  defaultValue="N"
                  value="N"
                  {...register('enquiry_type')}
                />
                <InputGroup className="mb-3" size="lg">
                  <Form.Control
                    type="text"
                    placeholder={t('EmailAddress')}
                    className="bg-light border-0 rounded-0 py-3"
                    name="email"
                    {...register('email', { pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, required: true })}
                  />

                  <LaddaButton type="submit" className="border-0 rounded-0  Subscribe_btn py-3 px-3 px-md-5" loading={loading_btn} id="basic-addon2"> {t('Subscribe')} </LaddaButton>
                </InputGroup>
                {errors?.email && <span className="text-danger fs-6 fw-lighter form-input-error"></span>}
                {_.get("email.type", errors) === "required" && (
                  <span className="text-danger fs-6 fw-lighter form-input-error">
                    {t('Thisfieldisrequired')}
                  </span>
                )}
                {_.get("email.type", errors) === "pattern" && (
                  <span className="text-danger fs-6 fw-lighter form-input-error">
                    {t('Email_validation')}
                  </span>
                )}
                {successMessage ? <div className="alert alert-success my-2 alert-dismissible fade show" role="alert">
                  <p className="fs-6 fw-lighter form-input-error p-0">{successMessage}</p>
                  <button type="button " className="btn-close btn-sm" onClick={() => setSuccessMessage(false)}></button>
                </div> : ''}
                {apiError ? <div className="alert alert-danger my-2 alert-dismissible fade show " role="alert">
                  <p className="fs-6 fw-lighter form-input-error p-0">{apiError}</p>
                  <button type="button" className="btn-close btn-sm" onClick={() => setApiError(false)}></button>
                </div> : ''}
              </Form>
            </div>
          </div>

        </Col>
      </Row>

    </div>
  );
};

