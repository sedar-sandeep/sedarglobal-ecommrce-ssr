import React, { useState, useEffect, useRef } from 'react';
// import './B2BRegistration.scss';
import parse from 'html-react-parser';
import { Col, Container, Row, Tab, Form, FloatingLabel, Button, Nav } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { Typeahead } from 'react-bootstrap-typeahead';
// import "react-bootstrap-typeahead/css/Typeahead.scss";
import { useForm } from "react-hook-form";
// import { t } from '../../services/i18n';
// import ApiDataService from '../../services/ApiDataService';
import AddressLov from '../Utility/AddressLov';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import _ from "lodash/fp";
import { Months } from '../Utility/Months';
import { useTranslation } from 'next-i18next';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { cn_iso } from '@utils/i18n';


const API_LOCATION = process.env.NEXT_PUBLIC_API_URL;

const fileType = ["image/jpeg", "image/png", "image/jpg", "application/pdf", "image/gif"];


const GeoLocation = dynamic(() => import('../Utility/GeoLocation'), {
  ssr: false
});

const B2BRegistration = (props) => {
  const { t } = useTranslation("common");

  const schema = yup.object().shape({
    tl_no: yup.string().required(t('Thisfieldisrequired')),
    //  tl_exp_dt: yup.string().required(t('Thisfieldisrequired')),
    tl_file_path: yup.mixed()
      .test('required', t("Youneedtoprovideafile"), (value) => {
        return value && value.length
      })
      .test("fileSize", t("Youneedtoprovideafilevalidsize"), (value, context) => {
        return value && value[0] && value[0].size <= 100000;
      })
      .test("type", t("Youneedtoprovideafilevalidformat1"), function (value) {
        return value && value[0] && fileType.includes(value[0].type)
      }),
    tc_no: yup.string().required(t('Thisfieldisrequired')),
    //tc_exp_dt: yup.string().required(t('Thisfieldisrequired')),
    tc_file_path: yup.mixed()
      .test('required', t("Youneedtoprovideafile"), (value) => {
        return value && value.length
      })
      .test("fileSize", t("Youneedtoprovideafilevalidsize"), (value, context) => {
        return value && value[0] && value[0].size <= 100000;
      })
      .test("type", t("Youneedtoprovideafilevalidformat1"), function (value) {
        return value && value[0] && fileType.includes(value[0].type)
      }),
    pp_no: yup.string().required(t('Thisfieldisrequired')),
    // pp_exp_dt: yup.string().required(t('Thisfieldisrequired')),
    pp_file_path: yup.mixed()
      .test('required', t("Youneedtoprovideafile"), (value) => {
        return value && value.length
      })
      .test("fileSize", t("Youneedtoprovideafilevalidsize"), (value, context) => {
        return value && value[0] && value[0].size <= 100000;
      })
      .test("type", t("Youneedtoprovideafilevalidformat1"), function (value) {
        return value && value[0] && fileType.includes(value[0].type)
      }),
  });


  const [Selecttab, setSelecttab] = useState(1);
  const [formData, setFormData] = useState(null);
  const [BasicFormData, setBasicFormData] = useState(null);
  const [DocFormData, setDocFormData] = useState(null);

  const [expiryDate, setExpiryDate] = useState(new Date());
  const [expiryDate0, setExpiryDate0] = useState(new Date());
  const [expiryDate1, setExpiryDate1] = useState(new Date());

  const [multiSelections, setMultiSelections] = useState([]);
  const options = ['curtains', 'blinds', 'wallpaper']
  const tl_exp_dt = expiryDate === null ? setExpiryDate(new Date()) : expiryDate.getDate() + '-' + Months[expiryDate.getMonth()] + '-' + expiryDate.getFullYear()

  const tc_exp_dt = expiryDate0 === null ? setExpiryDate0(new Date()) : expiryDate0.getDate() + '-' + Months[expiryDate0.getMonth()] + '-' + expiryDate0.getFullYear()

  const pp_exp_dt = expiryDate1 === null ? setExpiryDate1(new Date()) : expiryDate1.getDate() + '-' + Months[expiryDate1.getMonth()] + '-' + expiryDate1.getFullYear()

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const { register: register0, handleSubmit: handleSubmit0, formState: { errors: errors0, watch: watch0, reset: reset0 }, setValue, getValues, clearErrors } = useForm({
    mode: "onBlur",
    defaultValues: {
      country: cn_iso,
    }
  });



  const { register: register1, handleSubmit: handleSubmit1, formState: { errors: errors1, watch: watch1, reset: reset1 } } = useForm({
    resolver: yupResolver(schema),
    //mode: "onBlur",
  });
  const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2, watch: watch2, reset: reset2 } } = useForm({ mode: "onBlur", });
  const [apiError, setApiError] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const ref = useRef(null);


  const onSubmitBasic = (data) => {
    setBasicFormData(data)

    if (Object.keys(errors).length == 0) {
      setSelecttab(Selecttab + 1)

    }
  }

  const onSubmitDoc = (data) => {
    setDocFormData({ tl_exp_dt, tc_exp_dt, pp_exp_dt, ...data })
    if (Object.keys(errors).length == 0) {
      setSelecttab(Selecttab + 1)
    }
  }

  const onSubmitCD = (data) => {
    let business_line = multiSelections.toString();
    setFormData({ ...BasicFormData, ...DocFormData, ...data, business_line })
  }

  useEffect(() => {
    var formDataDoc = new FormData()

    for (let key in formData) {
      if (key == "tl_file_path") {
        formDataDoc.append("tl_file_path", formData.tl_file_path[0])
      } else if (key == "pp_file_path") {
        formDataDoc.append("pp_file_path", formData.pp_file_path[0])
      }
      else if (key == "tc_file_path") {
        formDataDoc.append("tc_file_path", formData.tc_file_path[0])
      }
      else {


        formDataDoc.append(key, formData[key]);
      }
    }

    if (formData != null) {
      //const siteId = process.env.NEXT_PUBLIC_SITE_ID

      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/btob?content=btobregisteration&site=${process.env.NEXT_PUBLIC_SITE_ID}&lang=en`, formDataDoc).then(response => {
        // set_submit_disable(false);

        let res_data = response.status;
        if (res_data == 200) {
          setSuccessMessage(t('we_will_get_back'));
        } else {
          setApiError(res_data.error_message);
        }
      }).catch((error) => {
        setApiError(error);

      });
    }
  }, [formData])

  if (props.CHILD == undefined) {
    return false;
  }

  const handleClick = () => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  return (
    <>
      <section className="B2BRegistration" ref={ref}>
        <Container className="max-width">

          <Row>
            <Col sm={12} md={7}>
              <div className="headingsection py-4 py-md-5">
                {props.CHILD.map((data, index) => {
                  return (
                    data.description ? <React.Fragment key={index}>{parse(data.description)}</React.Fragment> : ''
                  )
                })
                }
              </div>
            </Col>
          </Row>
          <Tab.Container id="left-tabs-example" activeKey={Selecttab} >
            <Row>

              <Col sm={12}>
                <Nav variant="pills" className="flex-row text-center flex-nowrap hidescroll B2BRegistration_tab" >
                  <Nav.Item>
                    <Nav.Link className="p-4" eventKey="1" onClick={() => setSelecttab(1)} disabled >{t("Yourdetails")}</Nav.Link>
                  </Nav.Item>
                  <Nav.Item >
                    <Nav.Link className="p-4" eventKey="2" onClick={() => setSelecttab(2)} disabled>{t("DocumentDetails")}</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="p-4" eventKey="3" onClick={() => setSelecttab(3)} disabled >{t("CompanyDetails")}</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="1">
                    <div className="form-section">
                      <Form onSubmit={handleSubmit0(onSubmitBasic)} encType="multipart/form-data">
                        <Row className='m-0'>
                          <Col sm="6">
                            <FloatingLabel controlId="floatingSelectGrid" label={t("Type")} className="my-4">
                              <Form.Select
                                as="select"
                                name="business_type"
                                className="form-control inputText"
                                // ref={register0({ required: true })}
                                // {...register2({ required: true })}
                                {...register0('business_type', { required: true })}
                              >
                                <option>{t("Distributor")}</option>
                                <option>{t("Professional")}</option>
                                <option>{t("Project")}</option>
                              </Form.Select>
                              {errors0 && errors0.business_type && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                            </FloatingLabel>
                          </Col>
                          <Col sm="6" >
                            <FloatingLabel className="my-2 my-md-4" label={t("CompanyName")}>
                              <Form.Control
                                type="text"
                                placeholder={t("CompanyName")}
                                name='company_name'
                                // ref={register0({ required: true })}
                                {...register0('company_name', { required: true })}
                              />
                              {errors0 && errors0.company_name && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                            </FloatingLabel>
                          </Col>
                          <Col sm="6"  >
                            <FloatingLabel className="my-2 my-md-4" label={t("ContactPerson")}>
                              <Form.Control
                                type="text"
                                placeholder={t("ContactPerson")}
                                // ref={register0({ required: true })}
                                {...register0('contact_person', { required: true })}
                                name="contact_person"
                              />
                              {errors0 && errors0.contact_person && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

                            </FloatingLabel>

                          </Col>
                          <Col sm="6" >
                            <FloatingLabel className="my-2 my-md-4" label={t("Email")}>
                              <Form.Control
                                type="text"
                                placeholder={t("Email")}
                                name="email"
                                // ref={register0({ pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, required: true })}
                                {...register0('email', { pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, required: true })}
                              />
                              {errors0 && errors0.email && <span className="text-danger fs-6 fw-lighter form-input-error"></span>}
                              {_.get("email.type", errors0) === "required" && (
                                <span className="text-danger fs-6 fw-lighter form-input-error">
                                  {t('Thisfieldisrequired')}
                                </span>
                              )}
                              {_.get("email.type", errors0) === "pattern" && (
                                <span className="text-danger fs-6 fw-lighter form-input-error">
                                  {t('Email_validation')}
                                </span>
                              )}
                            </FloatingLabel>
                          </Col>


                          {/* <Col sm="6"  >
                            <FloatingLabel controlId="floatingSelectGrid" label={t("Enteralocation")} className="my-4">
                              <Form.Control
                                type="text"
                                placeholder={t("Enteralocation")}
                              />
                            </FloatingLabel>
                          </Col>
                          <Col sm={12}>
                            <div>
                              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2454.100934006942!2d55.39226839492987!3d25.30834110178231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5c0055555555%3A0xac32725c9c83f9b8!2sSedar%20Global!5e0!3m2!1sen!2sae!4v1650696695162!5m2!1sen!2sae"
                                width="100%" height="450"  ></iframe>
                            </div>
                          </Col> */}
                          <Col sm={12}>
                            <GeoLocation register={register0} errors={errors0} />
                          </Col>

                          <AddressLov register={register0} errors={errors0} setValue={setValue} getValues={getValues} />
                          {/* <Col sm="6" >

                            <Form.Group className="my-2" controlId="exampleForm.ControlTextarea1">
                              <Form.Label className='fs-6'>{t("AddressLabel")} </Form.Label>
                              <Form.Control rows={1} />
                            </Form.Group>

                          </Col> */}
                          <Col sm="6" >
                            <FloatingLabel className="my-2 my-md-4" label={t("AddressLabel")} >
                              <Form.Control
                                type="text"
                                placeholder={t("AddressLabel")}
                                // ref={register0({ required: true })}
                                {...register0('address', { required: true })}
                                name="address"
                              />
                              {errors0 && errors0.address && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

                            </FloatingLabel>
                          </Col>

                          <Col sm="6"  >
                            <FloatingLabel controlId="floatingSelectGrid" label={t("PhoneNumber")} className="my-4">
                              <Form.Control
                                type="text"
                                placeholder={t("PhoneNumber")}
                                name="phone_no"
                                // ref={register0({ pattern: /^[0-9]+$/i, required: true })}
                                {...register0('phone_no', { pattern: /^[0-9]+$/i, required: true })}
                              />

                              {_.get("phone_no.type", errors0) === "required" && (
                                <span className="text-danger fs-6 fw-lighter form-input-error">
                                  {t('Thisfieldisrequired')}
                                </span>
                              )}
                              {_.get("phone_no.type", errors0) === "pattern" && (
                                <span className="text-danger fs-6 fw-lighter form-input-error">
                                  {t('Numeric_validation')}
                                </span>
                              )}

                            </FloatingLabel>
                          </Col>
                          <Col sm="6"  >
                            <FloatingLabel controlId="floatingSelectGrid" label={t("MobileNumber")} className="my-4">
                              <Form.Control
                                type="text"
                                placeholder={t("MobileNumber")}

                                name="mobile_no"
                                // ref={register0({ pattern: /^[0-9]+$/i, required: true })}
                                {...register0('mobile_no', { pattern: /^[0-9]+$/i, required: true })}
                              />

                              {_.get("mobile_no.type", errors0) === "required" && (
                                <span className="text-danger fs-6 fw-lighter form-input-error">
                                  {t('Thisfieldisrequired')}
                                </span>
                              )}
                              {_.get("mobile_no.type", errors0) === "pattern" && (
                                <span className="text-danger fs-6 fw-lighter form-input-error">
                                  {t('Numeric_validation')}
                                </span>
                              )}

                            </FloatingLabel>
                          </Col>
                          <Col sm="12" >
                            <FloatingLabel className="my-2 my-md-4" label={t("Subject")} >
                              <Form.Control
                                type="text"
                                placeholder={t("Subject")}
                                // ref={register0()}
                                {...register0('remarks', {})}
                                name="remarks"
                              />

                            </FloatingLabel>
                          </Col>
                          <Col xs={12} sm={8} md={9} lg={10}>
                            <div className="form-check labelstylecheckbox">
                              <input type="checkbox" className="form-check-input" id="exampleCheck1" required
                                name="i_agree"
                                // ref={register0({ required: true })}
                                {...register0('i_agree', { required: true })}
                              />

                              <label className="form-check-label" htmlFor="exampleCheck1">{t("CheckOutText")}</label>
                            </div>
                            {errors0 && errors0.i_agree && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

                          </Col>
                          <Col xs={12} sm={4} md={3} lg={2} className="text-end">
                            <Button type="submit" className="btn sedar-btn border-0 rounded-0" >{t("Next")}</Button>
                            {/* <Button type="submit" className="btn sedar-btn" onClick={() => setSelecttab()}>Next</Button> */}
                          </Col>

                        </Row>
                      </Form>
                    </div>

                  </Tab.Pane>
                  <Tab.Pane eventKey="2">
                    <div className="form-section">
                      <Form onSubmit={handleSubmit1(onSubmitDoc)} encType="multipart/form-data">
                        <Row className='m-0'>
                          <Col sm="6" >
                            <FloatingLabel className="my-2 my-md-4" label={t("TradeLicenceNo")} >
                              <Form.Control
                                type="text"
                                placeholder={t("TradeLicenceNo")}
                                name="tl_no"
                                // ref={register1()}
                                {...register1('tl_no')}
                              />
                              {errors1 && errors1.tl_no && <p className="text-danger fs-6 fw-lighter form-input-error">{errors1.tl_no.message}</p>}
                            </FloatingLabel>
                          </Col>
                          <Col sm="6">
                            <div className="my-3 my-xl-4 form-floating"  >
                              <span className="position-absolute fs-6 " style={{ opacity: "0.65" }}>{t("ExpiryDate")} </span>
                              <DatePicker
                                dateFormat="dd-MMM-y"
                                selected={expiryDate}
                                onChange={(e) => setExpiryDate(e)}
                                className="form-control pt-4 mt-2"
                                minDate={new Date()}
                                name="tl_exp_dt"
                              //  ref={register1()}
                              />
                              {/* {errors1.tl_exp_dt && <p className="text-danger fs-6 fw-lighter form-input-error">{errors1.tl_exp_dt.message}</p>} */}

                            </div>
                          </Col>
                          <Col sm="12" >
                            <div className="form-group">
                              <span className="label">{t("UploadDocument")} <span>*</span></span>
                              <input type="file" accept=".jpg,.png,.gif,.jpeg,.pdf" className="form-control" name='tl_file_path'
                                // ref={register1()} 
                                {...register1('tl_file_path')}
                              />
                              {/* <span className="label2">Maximum File Size: 1 MB  &nbsp;| &nbsp;File Format CSV or TSV or XLS </span> */}
                              <span className="labes fs-6"> {t("MaximumFileMBFileFormatB2B")} </span>
                              {errors1 && errors1.tl_file_path && <p className="text-danger fs-6 fw-lighter form-input-error">{errors1.tl_file_path.message}</p>}
                            </div>
                          </Col>

                          <Col xs={12}>
                            <div className="form-group col-sm-12 nopadding">
                              <center>
                                <hr style={{ position: "absolute", top: "15px", borderTop: "1px solid #eaaf60", width: "100%", zIndex: "-1" }} />
                              </center>
                              <center>
                                <div style={{ padding: "17px", width: "57px", height: "57px", background: "#eaaf60", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>{t("OR")}</div>
                              </center>
                            </div>
                          </Col>
                          <Col sm="6" >
                            <FloatingLabel className="my-2 my-md-4" label={t("TaxCertificateNo")}>
                              <Form.Control
                                type="text"
                                placeholder={t("TaxCertificateNo")}
                                name="tc_no"
                                // ref={register1()}
                                {...register1('tc_no')}
                              />
                              {errors1 && errors1.tc_no && <p className="text-danger fs-6 fw-lighter form-input-error">{errors1.tc_no.message}</p>}

                            </FloatingLabel>
                          </Col>
                          <Col sm="6">
                            <div className="my-3 my-xl-4 form-floating"  >
                              <span className="position-absolute fs-6 " style={{ opacity: "0.65" }}>{t("ExpiryDate")}</span>
                              <DatePicker
                                dateFormat="dd-MMM-y"
                                selected={expiryDate0}
                                onChange={(e) => setExpiryDate0(e)}
                                className="form-control pt-4 mt-2"
                                minDate={new Date()}
                                name="tc_exp_dt"
                              //  ref={register1()}
                              />
                              {/* {errors1.tc_exp_dt && <p className="text-danger fs-6 fw-lighter form-input-error">{errors1.tc_exp_dt.message}</p>} */}


                            </div>
                          </Col>
                          <Col sm="12" >
                            <div className="form-group">
                              <span className="label">{t("UploadDocument")} <span>*</span></span>

                              <input type="file" accept=".jpg,.png,.gif,.jpeg,.pdf" className="form-control" name='tc_file_path'
                                //  ref={register1()} 
                                {...register1('tc_file_path')}
                              />
                              {/* <span className="label2">Maximum File Size: 1 MB  &nbsp;| &nbsp;File Format CSV or TSV or XLS </span> */}
                              <span className="labes fs-6"> {t("MaximumFileMBFileFormatB2B")} </span>
                              {errors1 && errors1.tc_file_path && <p className="text-danger fs-6 fw-lighter form-input-error">{errors1.tc_file_path.message}</p>}
                            </div>
                          </Col>
                          <Col xs={12}>
                            <div className="form-group col-sm-12 nopadding">
                              <center>
                                <hr style={{ position: "absolute", top: "15px", borderTop: "1px solid #eaaf60", width: "100%", zIndex: "-1" }} />
                              </center>
                              <center>
                                <div style={{ padding: "17px", width: "57px", height: "57px", background: "#eaaf60", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>{t("OR")} </div>
                              </center>
                            </div>
                          </Col>
                          <Col sm="6" >
                            <FloatingLabel className="my-2 my-md-4" label={t("PassportNumber")}>
                              <Form.Control
                                type="text"
                                placeholder={t("PassportNumber")}
                                name="pp_no"
                                // ref={register1()}
                                {...register1('pp_no')}
                              />
                              {errors1 && errors1.pp_no && <p className="text-danger fs-6 fw-lighter form-input-error">{errors1.pp_no.message}</p>}

                            </FloatingLabel>
                          </Col>
                          <Col sm="6">
                            <div className="my-3 my-xl-4 form-floating"  >
                              <span className="position-absolute fs-6 " style={{ opacity: "0.65" }}>{t("ExpiryDate")}</span>
                              {/* <DatePicker dateFormat="dd-MMM-y"
                                selected={startDate}
                                onChange={(e) => setStartDate(e)}
                                className="form-control pt-4 mt-2"
                                name="startDateB2b"
                                minDate={new Date()}
                                withDate
                              /> */}
                              <DatePicker
                                dateFormat="dd-MMM-y"
                                selected={expiryDate1}
                                onChange={(e) => setExpiryDate1(e)}
                                className="form-control pt-4 mt-2"
                                minDate={new Date()}
                                name="pp_exp_dt"
                              //  ref={register1()}
                              />
                              {/* {errors1.pp_exp_dt && <p className="text-danger fs-6 fw-lighter form-input-error">{errors1.pp_exp_dt.message}</p>} */}


                            </div>
                          </Col>
                          <Col sm="12" >
                            <div className="form-group">
                              <span className="label">{t("UploadDocument")} <span>*</span></span>
                              <input type="file" accept=".jpg,.png,.gif,.jpeg,.pdf" className="form-control" name='pp_file_path'
                                // ref={register1()} 
                                {...register1('pp_file_path')}
                              />
                              {/* <span className="label2">Maximum File Size: 1 MB  &nbsp;| &nbsp;File Format CSV or TSV or XLS </span> */}
                              <span className="labes fs-6"> {t("MaximumFileMBFileFormatB2B")} </span>
                              {errors1 && errors1.pp_file_path && <p className="text-danger fs-6 fw-lighter form-input-error">{errors1.pp_file_path.message}</p>}
                            </div>
                          </Col>
                          <Row className="justify-content-end">
                            <Col xs={6} sm={4} md={3} lg={2}>
                              <Button variant="outline-dark" className="sedar-btn bg-light text-dark border-top border-bottom border-start border-end me-3 py-3 px-5" onClick={() => setSelecttab(1)}>{t("Previous")}</Button>
                            </Col>
                            <Col xs={6} sm={4} md={3} lg={2}>
                              <Button type="submit" className="btn sedar-btn border-0 rounded-0" onClick={() => handleClick()}>{t("Next")}</Button>
                            </Col>
                          </Row>
                        </Row>
                      </Form>
                    </div>

                  </Tab.Pane>

                  <Tab.Pane eventKey="3">
                    <div className="form-section" >
                      <Form onSubmit={handleSubmit2(onSubmitCD)} encType="multipart/form-data">
                        <Row className='m-0'>
                          <Col sm="6" >
                            <FloatingLabel className="my-2 my-md-4" label={t("NoofBranches")}>
                              <Form.Control
                                type="text"
                                placeholder={t("NoofBranches")}
                                name="no_of_branch"
                                // ref={register2({ required: true })}
                                {...register2('no_of_branch', { required: true })}
                              />
                              {errors2 && errors2.no_of_branch && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

                            </FloatingLabel>
                          </Col>
                          <Col sm="6" >
                            <FloatingLabel className="my-2 my-md-4" label={t("NoofStaff")}>
                              <Form.Control
                                type="text"
                                placeholder={t("NoofStaff")}
                                name="no_of_staff"
                                // ref={register2({ required: true })}
                                {...register2('no_of_staff', { required: true })}
                              />
                              {errors2 && errors2.no_of_staff && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

                            </FloatingLabel>
                          </Col>
                          <Col sm="6" >
                            <FloatingLabel className="my-2 my-md-4" label={t("NoofRunningTheBusiness")}>
                              <Form.Control
                                type="text"
                                placeholder={t("NoofRunningTheBusiness")}
                                name="years_in_business"
                                // ref={register2({ required: true })}
                                {...register2('years_in_business', { required: true })}
                              />
                              {errors2 && errors2.years_in_business && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

                            </FloatingLabel>
                          </Col>
                          <Col sm="6"  >

                            <Form.Group style={{ marginTop: '5px' }}>
                              <Form.Label>{t("BusinessLine")} </Form.Label>
                              <Typeahead
                                id="basic-typeahead-multiple"
                                labelKey="name"
                                multiple
                                onChange={setMultiSelections}
                                options={options}
                                placeholder={t("Chooseseveralstates")}
                                selected={multiSelections}
                                inputProps={{ required: multiSelections && multiSelections == "" ? true : false }}
                              />
                            </Form.Group>

                            {/* {multiSelections && multiSelections == "" ? <span span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span> : ''} */}

                          </Col>
                          <Row className="justify-content-end">
                            <Col xs={6} sm={4} md={3} lg={2}>
                              <Button variant="outline-dark" className="sedar-btn bg-light text-dark border-top border-bottom border-start border-end me-3 py-3 px-5" onClick={() => setSelecttab(2)}>{t("Previous")}</Button>
                            </Col>
                            <Col xs={6} sm={4} md={3} lg={2}>
                              <Button type='submit' className="btn sedar-btn border-0 rounded-0">{t("RegisterNow")}</Button>
                            </Col>
                          </Row>
                        </Row>
                      </Form>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </section>
    </>
  )

}


B2BRegistration.propTypes = {};

B2BRegistration.defaultProps = {};

export default B2BRegistration;
