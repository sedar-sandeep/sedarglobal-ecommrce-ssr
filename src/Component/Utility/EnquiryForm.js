//Admitad=>ES005
import axiosInstance from '@utils/axios';
import React, { useEffect, useState, useRef } from 'react'
import { Form, Button, Col, Row, Container, FloatingLabel, Card, Dropdown } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { Months } from './Months';
import _ from "lodash/fp";
import parseHtml from 'html-react-parser';
import { admitadOrderedItem, admitadInvoice, getSourceCookie } from '../../Admitad/AdmitadIndex';
import AddressLov from './AddressLov';
import { useDevice } from './useDevice';
import 'react-phone-number-input/style.css'
import en from 'react-phone-number-input/locale/en';
import ar from 'react-phone-number-input/locale/ar';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { useTranslation } from 'next-i18next';
import ReCAPTCHA from "react-google-recaptcha"
import 'react-intl-tel-input/dist/main.css';
import { ccy_code, ccy_decimals, cn_iso, countryName, langName, visitorId } from '@utils/i18n';
import { ImageComponent } from '@components/image';
import Calendar from './Calendar';
import ApiDataService from 'src/services/ApiDataService';
const consultation_type = { 'H': 'free_consultation', 'M': 'free_measurement' };
const sitekey = process.env.NEXT_PUBLIC_SITE_KEY_CAPTCHA;
import GoogleAnalytics from 'src/services/GoogleAnalytics';
import store from "store-js";

const site_id = process.env.NEXT_PUBLIC_SITE_ID; //100001;

const enquiry_t_list = {
  M: 'measurement_consultation',
  V: 'virtual_consultation',
  H: 'phone_consultation',
  C: 'contact',
  F: 'franchise',
  S: 'contracts',
  Q: 'get_a_quote',
  D: 'special_offer',
  N: 'newsletter',
  I: 'Inquiry',
  E: 'enquiry',
  PWD: 'password',
  REMAIL: 'email',
  U: 'upholstery_studio',
  P: 'Professionals'
}


const fileType = ["text/csv", "text/xls", "text/tsv"];
const schema = yup.object().shape({
  long_name: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  country: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  ProjectType: yup.string().required(),
  budget: yup.string().required(),
  artwork: yup.string().required(),
  productType: yup.string().required(),
  category_code: yup.string().required(),
  documentfile: yup.mixed().required()
    .test('required', "You need to provide a file", (value) => {
      return value && value.length
    })
    .test("fileSize", "The file is too large | Maximum File Size: 1 MB", (value, context) => {
      return value && value[0] && value[0].size <= 500000;
    })
    .test("type", "We only support File Format CSV or TSV or XLS", function (value) {
      ////console.log(value, fileType.includes(value[0].type), "err")
      return value && value[0] && fileType.includes(value[0].type)
    }),
});


export default function EnquiryForm(props) {
  const { t } = useTranslation('common');
  const history = useRouter();

  let url_path = history?.pathname?.slice(1) || '/';

  //console.log(props.ConsultationType, 'EnquiryForm222');

  const formPage = props?.form || 'EnquiryForm';
  let formType = props?.type || 'C';
  const stageType = props?.stage?.type || '';
  const [loading_btn, setLoading_btn] = useState(true);

  const Matches = ['H', 'V', 'M', 'U', 'h', 'v', 'm', 'u'];

  const [selectedCountry, setSelectedCountry] = useState(cn_iso);

  const [phoneNo, setphoneNumber] = useState("")
  const [categoryVal, setCategoryVal] = useState(false);

  const { register, handleSubmit, watch, formState: { errors }, reset, setError, setValue, getValues, clearErrors } = useForm({
    defaultValues: {
      enquiry_type: ~Matches.includes(formType) ? formType.toUpperCase() : 'H',
      myCountry: "AE",
      country: cn_iso,
    }
  })


  const [apiError, setApiError] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const currentDate = new Date()


  const [startDate, setStartDate] = useState(currentDate);

  const measurement_dt = startDate === null ? setStartDate(currentDate) : startDate.getDate() + '-' + Months[startDate.getMonth()] + '-' + startDate.getFullYear()
  const childRef = useRef(null);


  const { isMOBILE, isTABLET, isLAPTOP, isDESKTOP } = useDevice();

  const [InterestedItem, setInterestedItem] = useState('')
  const [InterestedItemDesc, setInterestedItemDesc] = useState('')
  const [InterestedProductList, setInterestedProduct] = useState(false);

  const getProductIntrest = (data, name) => {
    console.log('getProductIntrest', data, productInterestedDesc);

    let productInterestedDescObject = {};

    if (!productInterestedDesc.includes(data.VSL_DESC)) {
      setInterestedItem({ ...InterestedItem, [name]: data.VSL_CODE })
      setInterestedItemDesc({ ...InterestedItemDesc, [name]: data.VSL_DESC })
      clearErrors("productInterestedDesc")
      productInterestedDescObject = { ...InterestedItemDesc, [name]: data.VSL_DESC }

      let newproductInterestedDesc = Object.values(productInterestedDescObject).splice(",").filter(function (el) {
        return el != null;
      });

      setValue("productInterestedDesc", newproductInterestedDesc.toString());
      setValue("productInterestedDesc11", newproductInterestedDesc.toString());


    } else {
      setInterestedItem({ ...InterestedItem, [name]: null })
      setInterestedItemDesc({ ...InterestedItemDesc, [name]: null })
      productInterestedDescObject = { ...InterestedItemDesc, [name]: data.VSL_DESC }
      let newproductInterestedDesc = Object.values(productInterestedDescObject).splice(",").filter(function (el) {
        return el != null;
      });
      setValue("productInterestedDesc", newproductInterestedDesc.toString());
      setValue("productInterestedDesc11", newproductInterestedDesc.toString())

    }
  }

  let InterestedItemfilteredDesc = Object.values(InterestedItemDesc).splice(",").filter(function (el) {
    return el != null;
  });

  const productInterestedDesc = InterestedItemfilteredDesc.toString();


  const getInterestedProduct = async () => {

    let cunsult_type = history.pathname == '/custom-print' ? 'SITE_CUSTOM_PRODUCT' : 'SITE_FREE_CONSULT';
    let path_url = `?lang=${langName}&site=${site_id}&country=${countryName}&currency=${ccy_code}&cn_iso=${cn_iso}&cunsult_type=${cunsult_type}`;
    axiosInstance.get(`btob/products${path_url}`)
      .then((response) => {
        // setInterestedProduct(response.data)

        let res_data = response.data;
        if (res_data.return_status == 0 && res_data.result) {
          setInterestedProduct(res_data.result)
          clearErrors("productInterestedDesc11");
        } else {
          setApiError(res_data.error_message);
        }
      })
      .catch(e => {
        console.log(e.message);
        setApiError(e.message);
      });
  };




  const checkCaptchaFun = () => {
    let captcha_val = childRef.current.getValue();

    if (captcha_val && captcha_val.length > 10) {
      setLoading_btn(false);
    } else {
      setLoading_btn(true);
    }

    ApiDataService.post('user/googleCapatchaValidate', { token: captcha_val, content: formPage }).then(response => {
      console.log(response.data, 'response');
    }).catch(e => {
      console.log(e.message);
      // setApiError(e.message);
    });
    //console.log(captcha_val, 'captcha_val');
  }

  const onSubmit = (data) => {

    if (phoneNo == undefined) {
      console.log(errors, 'errors');
      setphoneNumber('');
      return true;
    } else if (!isValidPhoneNumber(phoneNo)) {
      console.log(errors, 'errors11');
      return true;
    }

    let tagtag_uid = store.get('tagtag_uid');
    let source_enquiry = getSourceCookie();

    data = ["Consultation", "upholsteryForm"].indexOf(formPage) >= 0 ? { productInterestedDesc, measurement_dt, ...data } : data;
    data = { ...data, source_enquiry: source_enquiry, content: formPage, tagtag_uid: tagtag_uid };
    const captcha = childRef.current.getValue();

    if (captcha && captcha.length) {

      const formData = new FormData()

      for (var key in data) {
        if (key == "documentfile") {
          formData.append("documentfile", data.documentfile[0])
        }
        else if (key == 'urllink' && data[key] == "[...slug]") {
          formData.append(key, 'slug');
        } else {
          formData.append(key, data[key]);
        }
      }
      let path_url = `?lang=${langName}&site=${site_id}&content=${formPage}&visitorId=${visitorId}&currency=${ccy_code}&ccy_decimal=${ccy_decimals}&cn_iso=${cn_iso}`;

      var consult_type = {};
      var enq_type = data?.enquiry_type || C;

      setLoading_btn(true);

      fetch(`${process.env.NEXT_PUBLIC_API_URL}user/enquiry${path_url}`, {
        method: "POST",
        body: formData
      }).then(res => res.json()).then(response => {
        if (response?.return_status == '0' && response?.sysid) {
          var con_type = consultation_type[enq_type] ? consultation_type[enq_type] : 'Lets Connect';

          consult_type = { PRODUCT_DESC: con_type, SOL_ITEM_LABEL: 'Non_Product', SOH_TXN_NO: response.sysid ? response.sysid : 111111 }
          //  admitadOrderedItem(consult_type, con_type);//ADMITAD Order add
          //   admitadInvoice(consult_type, data.email)//ADMITAD.Invoice
          //  setSuccessMessage(t('we_will_get_back'));

          GoogleAnalytics.enquiryFBQ(response.sysid, con_type, data)

          let page_name = enquiry_t_list[enq_type] ? enquiry_t_list[enq_type] : 'done'
          let Email = data?.email ? data?.email : "No email";

          if (history.pathname == '/custom-print') {
            history.push({
              pathname: `/success/custom-print`,
              query: { email: Email }
            });
          } else {
            history.push({
              pathname: `/success/${page_name}`,
              query: { email: Email }
            });
          }



          //reset();
        } else {
          setApiError(response.error_message);
        }
        setLoading_btn(false);
      }).catch((error) => {
        //console.log(error);
        setApiError(error);
        setLoading_btn(false);
      });
    }

  }

  const categoryListFun = (e) => {
    setCategoryVal(e.target.value);
    setValue('category_code', e.target.value)
    clearErrors('category_code')
  }
  const isProductVal = (list_obj, val) => {
    let obj_val = false;
    for (const x in list_obj) {
      if (list_obj[x] == val) {
        obj_val = true;
        continue
      }

    }
    return obj_val
  }
  const enquiryTypeFun = (event) => {
    let val = event.target && event.target.value ? event.target.value : event;
    setValue("enquiry_type", val);

    /*if (val == 'U') {
        preSelectedPro();
    }*/
  }
  /*const preSelectedPro = () => {

    InterestedProductList && InterestedProductList.map((data, index) => {
      let productintres = `ProductIntres-${index}`
      if (data.VSL_CODE == 'FCP07' && !productInterestedDesc.includes(data.VSL_DESC)) {
        getProductIntrest(data, productintres)
      }
    })
  }*/
  useEffect(() => {
    getInterestedProduct();
    setValue("producttype", props?.stage?.selectedDesc?.toString() || '');
    setValue("artwork", props?.stage?.selectedArt || '');
  }, []);

  /* useEffect(() => {
     if (formType == 'U') {
         preSelectedPro();
     }
   }, [formType, InterestedProductList])*/

  //console.log(errors, 'errors', getValues('phone'), phoneNo, productInterestedDesc);


  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} >
        <Row>
          {formPage && formPage != "Consultation" ?
            <Form.Control
              type="hidden"
              name="enquiry_type"
              // ref={register}
              {...register('enquiry_type', { required: false, defaultValue: formType, value: formType })}
              defaultValue={formType}
            />
            :
            <>
              {props.ConsultationType ?
                <div className="consultation-type">
                  <label className="type-heading">{t('PleaseSelecttypeofConsultation')} </label>
                  {isMOBILE || isTABLET ?
                    <Form.Select size="lg" className="my-2 my-lg-3" defaultValue={formType} name="enquiry_type"
                      {...register("enquiry_type", {
                        defaultValue: formType,
                        onChange: enquiryTypeFun
                      })}>

                      {props.ConsultationType && props.ConsultationType.map((data, index) => {
                        return (
                          <React.Fragment key={index}>
                            <option key={index} value={data.link_url && data.link_url}>{data.title} </option>
                          </React.Fragment>
                        )
                      })}
                    </Form.Select>
                    :
                    <Row className="my-3 d-lg-flex">
                      {props.ConsultationType && props.ConsultationType.map((data, index) => {
                        return (
                          <React.Fragment key={index}>
                            <label className="col-sm-6 col-md-6 col-lg-4 py-2 d-flex" onClick={() => enquiryTypeFun(data.link_url)}>
                              <Card style={{ width: '100%' }}>
                                <Card.Body>
                                  <Row>
                                    <Col sm={10} className="text-end">
                                      <input type="radio" className="radio-custom-check" value={data.link_url && data.link_url} name="enquiry_type"  {...register('enquiry_type', { required: true })} />
                                    </Col>
                                    <Col sm={2} className="plan-details">
                                      <ImageComponent
                                        src={data.image_path && data.image_path}
                                        alt={data.link_url || 'Sedar Global'}
                                        width={32}
                                        height={32}
                                      />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col sm={12}>
                                      <Card.Title>{data.title && data.title} </Card.Title>
                                      <Card.Text as="div">
                                        {data.description && parseHtml(data.description)}
                                      </Card.Text>
                                    </Col>
                                  </Row>
                                </Card.Body>
                              </Card>
                            </label>
                          </React.Fragment>
                        )
                      })}

                    </Row>
                  }
                </div>
                : ''}
              {history.pathname != '/custom-print' ?
                <Col sm={6}>
                  <div className="my-3 my-xl-4 form-floating">
                    <span className="position-absolute fs-6 " style={{ opacity: "0.65" }}>{t("Date")}  </span>
                    <Calendar setStartDate={setStartDate} startDate={startDate} register={register} errors={errors} selectedCountry={selectedCountry} setValue={setValue} getValues={getValues} />
                  </div>
                </Col>
                : ''}

              {InterestedProductList && watch('enquiry_type') != 'U' &&
                <Col sm={6}>
                  <>
                    <Dropdown className="d-inline multi-select-input" autoClose="outside">

                      <Dropdown.Toggle id="dropdown-autoclose-outside" className="text-start btn btn-light" style={{ overflow: "hidden", fontSize: "14px !important", background: "transparent!important" }}>

                        {productInterestedDesc != '' ?
                          <span className='fs-6' style={{ fontSize: "14px !important" }}>
                            <span className="position-absolute fs-6" style={{ opacity: "0.65", top: '-3px' }}>{t("ProductsInterested")}  </span>
                            {productInterestedDesc}
                          </span>
                          : t("ProductsInterested")}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {InterestedProductList && InterestedProductList?.length && InterestedProductList?.map((data, index) => {
                          let vsl_desc = data.VSL_DESC.trimEnd();
                          let productintres = `ProductIntres-${index}`
                          return (
                            <React.Fragment key={index}>
                              <Dropdown.ItemText style={{ fontSize: "14px" }}>
                                <Form.Check
                                  type="checkbox"
                                  id={`custom-switch-${index}`}
                                  label={vsl_desc}
                                  value={data.VSL_CODE}
                                  name={productintres}
                                  style={{ fontSize: "14px" }}
                                  checked={productInterestedDesc.includes(vsl_desc)}
                                  onChange={() => { getProductIntrest(data, productintres) }}
                                />
                              </Dropdown.ItemText>
                            </React.Fragment>
                          )
                        })}


                      </Dropdown.Menu>
                    </Dropdown>
                    <input
                      type="hidden"
                      name="productInterestedDesc11"
                      value={productInterestedDesc}
                      {...register('productInterestedDesc11', { required: false, value: productInterestedDesc, defaultValue: productInterestedDesc })}
                    />
                    {errors?.productInterestedDesc11 && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                  </>
                </Col>
              }


            </>


          }

          {formPage && formPage == 'upholsteryForm' ?
            <Col sm={6}>
              <div className="my-3 my-xl-4 form-floating upholsteryForm_date">
                <span className="position-absolute fs-6 " style={{ opacity: "0.65" }}>{t("Date")}  </span>
                <Calendar setStartDate={setStartDate} startDate={startDate} register={register} errors={errors} selectedCountry={selectedCountry} setValue={setValue} getValues={getValues} />
              </div>
            </Col>
            : ''}

          {formPage && formPage === "contact" ?

            <>
              <Col sm="6">
                <FloatingLabel className="my-2 my-md-4 border-0" label={t('FirstName')}>
                  <Form.Control
                    type="text"
                    placeholder={t('FirstName')}
                    name="first_name"
                    className="border-0 bg-transparent border-bottom border-dark rounded-0"
                    {...register('first_name', { required: true })}
                  />
                  {errors?.first_name && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                </FloatingLabel>
              </Col>
              <Col sm="6">
                <FloatingLabel className="my-2 my-md-4 border-0" label={t('LastName')}>
                  <Form.Control
                    type="text"
                    placeholder={t('LastName')}
                    name="last_name"
                    className="border-0 bg-transparent border-bottom border-dark rounded-0"
                    {...register('last_name', { required: true })}
                  />
                  {errors?.last_name && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                </FloatingLabel>
              </Col>
            </>
            :

            <Col sm="6">
              <FloatingLabel className="my-2 my-md-4 border-0" label={t('FullName')}>
                <Form.Control
                  className="border-0 bg-transparent border-bottom border-dark rounded-0"
                  type="text"
                  placeholder={t('FullName')}
                  name="long_name"
                  {...register('long_name', { required: true })}
                />
                {errors?.long_name && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
              </FloatingLabel>
            </Col>
          }
          <Col sm="6">
            <FloatingLabel className="my-2 my-md-4 border-0" label={t('Email')} >
              <Form.Control
                className="border-0 bg-transparent border-bottom border-dark rounded-0"
                type="email"
                placeholder={t('Email')}
                name="email"
                {...register('email', { pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, required: true })}
              // ref={register({ pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, required: true })}
              />
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
            </FloatingLabel>
          </Col>
          <Col sm="6" className='phone_number'>

            <FloatingLabel className="my-2 my-md-4 border-0" label={t('Phonenumber')} >
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry={cn_iso && cn_iso != 'XX' ? cn_iso.toUpperCase() : 'US'}
                labels={langName == 'ar' ? ar : en}
                className="signupmobile inputText form-control border-0 bg-transparent border-bottom border-dark rounded-0 d-flex"
                placeholder="Enter phone number"
                name="phone"
                value={phoneNo}
                {...register("phone", { required: true, value: phoneNo })}
                onChange={(value) => {
                  setValue("phone", value)
                  setphoneNumber(value)
                }}
                error={phoneNo ? (isValidPhoneNumber(phoneNo) ? undefined : 'Invalid phone number') : 'Phone number required'}
              />



              {/* <br /> */}
              {/* <Form.Control
                type="hidden"
                placeholder={t('Phonenumber')}
                name="phone"
                value={phoneNo}
                {...register("phone", { required: true, value: phoneNo })}
              /> */}

              {phoneNo && !isValidPhoneNumber(phoneNo) && (
                <span className="text-danger fs-6 fw-lighter form-input-error">
                  {t('please_enter_a_valid_number')}
                </span>
              )}

              {!phoneNo && errors?.phone && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
              {phoneNo == undefined && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}



            </FloatingLabel>
          </Col>

          {formPage && formPage == "Contracts" ?
            <>
              <Col sm="6"  >
                <FloatingLabel controlId="floatingSelectGrid" label={t("ProjectType")} className="my-4">
                  <Form.Select as="select" name="ProjectType" className="form-control inputText border-0 bg-transparent border-bottom border-dark rounded-0">
                    <option value="Hospitality" >{t("Hospitality")}</option>
                    <option value="Educational Institutions">{t("EducationalInstitutions")} </option>
                    <option value="Government Institutions" >{t("GovernmentInstitutions")} </option>
                    <option value="Healthcare" >{t("Healthcare")} </option>
                    <option value="Residential" >{t("Residential")} </option>
                    <option value="Retail" >{t("Retail")} </option>
                    <option value="Other" >{t("Other")} </option>

                  </Form.Select>
                  {errors?.budget && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

                </FloatingLabel>

              </Col>
              <Col sm="6"  >
                <FloatingLabel controlId="floatingSelectGrid" label={t("Doyouhavebudgetinmind")} className="my-4">
                  <Form.Select as="select" name="budget" className="form-control inputText border-0 bg-transparent border-bottom border-dark rounded-0">
                    <option value="$100,000">{t("Lessthen")}  10,000$</option>
                    <option value="$200,000">10,000$ - 50,000$</option>
                    <option value="$200,000">50,000$ - 100,000$</option>
                    <option value="$200,000">100,000$ - 250,000$</option>
                    <option value="$300,000 - More">{t("Morethen")}  250,000$  </option>
                  </Form.Select>
                  {errors?.budget && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

                </FloatingLabel>

              </Col>


              <Col sm="6" >
                <div className="form-group">
                  <span className="label fs-6 text-secondary">{t("UploadYourfileorURLLink")} </span>
                  <input type="file" className="form-control" placeholder="" name="documentfile" />
                  <span className="labes" style={{ fontSize: '14px' }}> {t("MaximumFileMBFileFormatTSVorXLS")} </span>
                  {errors?.documentfile && <p className="text-danger fs-6 fw-lighter form-input-error">{errors?.documentfile.message}</p>}
                </div>
              </Col>


              <Col sm="6" >
                <FloatingLabel className="my-2 my-md-4 border-0" label={t("YourURLLink")} >
                  <Form.Control
                    type="text"
                    placeholder={t("YourURLLink")}
                    name="urllink"
                    className="border-0 bg-transparent border-bottom border-dark rounded-0"
                    {...register('urllink')}
                  />
                </FloatingLabel>
              </Col>
            </>
            :
            <Form.Control
              type="hidden"
              placeholder={t("YourURLLink")}
              name="urllink"
              value={url_path}
              className="border-0 bg-transparent border-bottom border-dark rounded-0"
              {...register('urllink')}
            />
          }
          <AddressLov register={register} errors={errors} hideField={props.hideField && props.hideField} setSelectedCountry={setSelectedCountry} setValue={setValue} getValues={getValues} startDate={startDate} setStartDate={setStartDate} />

          {formPage && formPage == "Franchisee" ?
            <Col sm="6"  >

              <FloatingLabel controlId="floatingSelectGrid" label={t("InvestmentCapacity")} className="my-4">
                <Form.Select as="select" name="budget" className="form-control inputText border-0 bg-transparent border-bottom border-dark rounded-0">
                  <option value="$100,000">$100,000</option>
                  <option value="$200,000">$200,000</option>
                  <option value="$300,000 - More">$300,000 - {t("More")}</option>

                </Form.Select>
                {errors?.budget && <p className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</p>}
              </FloatingLabel>
            </Col>
            : ''}
          {formPage && stageType != "Art" && formPage === "contact" ?
            <>
              <Col sm={12}>
                {props.ContactCategoryList && props.ContactCategoryList.result &&
                  <FloatingLabel className="my-3 my-xl-4 bg-transparent" label={t('selectcategory')} >
                    {props.ContactCategoryList &&
                      <Form.Select as="select" name="category_code" className="form-control inputText border-0 bg-transparent border-bottom border-dark rounded-0"
                        {...register('category_code', { required: true, onChange: categoryListFun })}
                        onChange={categoryListFun}>
                        <option value="">{t('Please_select_category')} </option>
                        {props.ContactCategoryList.result.map((data, index) => {
                          return (
                            <option key={index} value={data.code} > {data.desc} </option>
                          )
                        })}

                      </Form.Select>

                    }
                    {errors?.category_code && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                  </FloatingLabel>
                }
              </Col>
              <Col sm={12}>
                {InterestedProductList && categoryVal == '002' &&
                  <div className='my-3 my-xl-4 form-floating bg-transparent'>
                    <label style={{ padding: "0", opacity: "0.6", marginTop: "-10px", fontSize: '13px' }}>{t("Select_Products")}</label>
                    <Dropdown className="d-inline multi-select-input bg-transparent" autoClose="outside">
                      <Dropdown.Toggle id="dropdown-autoclose-outside" className="text-start bg-transparent btn btn-light" style={{ overflow: "hidden", background: "transparent!important", marginTop: "10px" }}>
                        <span className="position-absolute fs-6" style={{ opacity: "0", fontSize: "14px!important" }}>{t("ProductsInterested")}  </span>
                        {productInterestedDesc != '' ? <span className='fs-6' style={{ fontSize: "14px!important" }}>{productInterestedDesc}</span> : t("ProductsInterested")}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {InterestedProductList && InterestedProductList.map((data, index) => {
                          let vsl_desc = data.VSL_DESC.trimEnd();
                          let productintres = `ProductIntres-${index}`
                          return (
                            <React.Fragment key={index}>
                              <Dropdown.ItemText style={{ fontSize: "14px" }}>
                                <Form.Check
                                  type="checkbox"
                                  id={`custom-switch-${index}`}
                                  label={data.VSL_DESC}
                                  value={data.VSL_CODE}
                                  name={productintres}
                                  style={{ fontSize: "14px" }}
                                  checked={productInterestedDesc.includes(vsl_desc)}
                                  onChange={() => { getProductIntrest(data, productintres) }}
                                />
                              </Dropdown.ItemText>
                            </React.Fragment>
                          )
                        })}


                      </Dropdown.Menu>
                    </Dropdown>
                    <input
                      type="hidden"
                      name="productInterestedDesc"
                      value={productInterestedDesc}
                      {...register('productInterestedDesc', { required: true, value: productInterestedDesc, defaultValue: productInterestedDesc })}
                    />
                    {errors.productInterestedDesc && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                  </div>
                }
              </Col>
            </>
            : ''}

          {InterestedProductList && InterestedItem && isProductVal(InterestedItem, 'FCP07') || history.pathname == '/custom-print' || watch('enquiry_type') == 'U' ?
            <Col sm="12" >
              <div className="form-group">
                <span className="label fs-6 text-secondary">{history.pathname == '/custom-print' ? t("custom_product_logo") : t("UploadUpholsteryFile")} </span>
                <input type="file" className="form-control" placeholder="" name="documentfile" {...register('documentfile', { required: true })} accept="image/*" />
                <span className="labes" style={{ fontSize: '15px' }}> {t("MaximumFileMBFileFormatJPGorPNG")} </span>
                {errors?.documentfile && <p className="text-danger fs-6 fw-lighter form-input-error">{errors?.documentfile.message}</p>}
                {errors?.documentfile && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                {selectedCountry != 'AE' && history.pathname != '/custom-print' ? <p className='text-danger' style={{ fontSize: '13px' }}>{t('Upholstery_disclaimer_mgs')}</p> : ''}
              </div>
            </Col>
            : ''}

          {stageType && stageType == "Art" ?
            <>
              <Col sm="6"  >

                <FloatingLabel controlId="floatingSelectGrid" label={t("Product Type")} className="my-4">
                  <Form.Control type="text" name="producttype"
                    className="form-control inputText border-0 bg-transparent border-bottom border-dark rounded-0"
                    disabled={true}
                    value={props?.stage?.selectedDesc || ''}
                    {...register('producttype')}>
                  </Form.Control>
                  {errors?.productType && <p className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</p>}
                </FloatingLabel>
              </Col>
              <Col sm="6">

                <FloatingLabel controlId="floatingSelectGrid" label={t("Artwork")} className="my-4">
                  <Form.Control type="text" name="artwork"
                    className="form-control inputText border-0 bg-transparent border-bottom border-dark rounded-0"
                    disabled={true}
                    value={props?.stage?.selectedArt || ''}
                    {...register('artwork')}>
                  </Form.Control>
                  {errors?.artwork && <p className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</p>}
                </FloatingLabel>
              </Col>
            </>
            : ''}
          <Col md="12">
            <FloatingLabel className="my-2 my-md-4 border-0" label={t('Message')} >
              <Form.Control
                as="textarea"
                placeholder={t('Message')}
                name="remarks"
                rows={1}
                className="border-0 bg-transparent border-bottom border-dark rounded-0"
                {...register("remarks", {})}
              />
              {errors?.remarks && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
            </FloatingLabel>
          </Col>
          <Col sm={12}>
            {successMessage && <div className="alert alert-success my-2 alert-dismissible fade show" role="alert">
              <p className="fs-6 fw-lighter form-input-error">{successMessage}</p>
              <button type="button " className="btn-close btn-sm" onClick={() => setSuccessMessage(false)}></button>
            </div>}
            {apiError && <div className="alert alert-danger my-2 alert-dismissible fade show" role="alert">
              <p className="fs-6 fw-lighter form-input-error">{apiError}</p>
              <button type="button" className="btn-close btn-sm" onClick={() => setApiError(false)}></button>
            </div>}
          </Col>
          <Col sm="12">
            <Row>
              <Col lg="12 py-2">
                <div className="form-check labelstylecheckbox">
                  <input name="i_agree" type="checkbox" className="form-check-input" id={`i_agree-${formPage && formPage}`} defaultChecked={true} />
                  <label className="form-check-label" htmlFor={`i_agree-${formPage && formPage}`} >{t('IagreetoreceiveothercommunicationsfromSedarInnovation')} </label>

                </div>
                {/* t({errors?.i_agree && <span className="text-danger fs-6 fw-lighter form-input-error">{'Thisfieldisrequired'}</span>}) */}
              </Col>
              <Col lg="12">
                <ReCAPTCHA
                  sitekey={sitekey}
                  ref={childRef}
                  hl={langName}
                  className="google_captcha"
                  onChange={checkCaptchaFun}
                />
              </Col>
            </Row>
          </Col>
          <Col md={12} className="text-end">
            <Button disabled={loading_btn} type="submit" className="btn sedar-btn  w-100 w-md-50 mt-3 mt-md-0 border-0 rounded-0">{t('Submit')}</Button>
            {/* <LaddaButton loading={loading_btn} type="submit" className="btn sedar-btn  w-100 w-md-50 mt-3 mt-md-0 border-0 rounded-0"><span> {t('Submit')}  </span></LaddaButton> */}
          </Col>
        </Row>
      </Form >
    </>
  )
}
