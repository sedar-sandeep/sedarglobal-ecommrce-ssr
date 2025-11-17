import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Tab, Nav, Button, FloatingLabel, Modal, Form } from 'react-bootstrap';
import parse from 'html-react-parser';
import { useForm } from "react-hook-form";

import { connect } from "react-redux";
import ApiDataService from '../../../services/ApiDataService';
import LaddaButton from 'react-ladda';
import Cookies from 'js-cookie';
import 'react-phone-number-input/style.css'
import en from 'react-phone-number-input/locale/en';
import ar from 'react-phone-number-input/locale/ar';
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';
import { useTranslation } from 'next-i18next'
import { langName, cn_iso } from '@utils/i18n';
import Select from 'react-select';

let auth_token = Cookies.get('AUTH_TOKEN');
let user_email = Cookies.get('USER_EMAIL');
let user_id = Cookies.get('USER_ID');
const add_url = 'dashboard/create_address/' + user_id;




const AddressAddEdit = (props) => {
  const { t } = useTranslation('common');

  const geo_location = Cookies.get('GEOLOCATION') || "undefined";
  let geo_city = geo_location != 'undefined' && JSON.parse(geo_location) != null && JSON.parse(geo_location).city ? JSON.parse(geo_location).city : '';


  let user_info = props.user_state ? props.user_state.user_info : null;
  const address_info = props?.addressEdit;
  const update_url = `dashboard/update_address/${address_info.cad_id}/${address_info.cad_cust_id}`;

  const [loading_btn, setLoading_btn] = useState(false);
  const [apiError, setApiError] = useState();
  const [countryList, setcountryList] = useState();

  const [countryStateList, setCountryStateList] = useState();
  const [allError, setAllError] = useState(false);

  const [countryVal, setCountryVal] = useState(cn_iso);
  const [stateVal, setStateVal] = useState();
  const [cityVal, setCityVal] = useState();
  const [areaVal, setAreaVal] = useState();
  const [provinceDesc, setProvinceDesc] = useState(address_info.cad_state_desc ? address_info.cad_state_desc : '');
  const [cityOptionsList, setCityOptionsList] = useState([]);
  const [areaOptionsList, setAreaOptionsList] = useState([]);
  const [selectedCityVal, setSelectedCityVal] = useState();
  const [selectedAreaVal, setSelectedAreaVal] = useState();


  const { register, handleSubmit, watch, formState: { errors }, setValue, setError, getValues } = useForm({
    defaultValues: {
      cad_address_type: 'HOME',
      cad_first_name: address_info ? address_info?.cad_first_name : user_info?.cust_first_name,
      cad_last_name: address_info ? address_info?.cad_last_name : user_info?.cust_last_name,
      cad_contact_number: address_info ? address_info?.cad_contact_number : '', //user_info?.cust_mobile_no,
      cad_country: address_info ? address_info?.cad_country : cn_iso,
      cad_active_yn: address_info ? address_info?.cad_first_name : 'Y',

      // cad_default_yn: address_info ? address_info.cad_first_name : 'Y'
    }
  });


  const [mobileNo, setmobileNumber] = useState();

  const handleMyCountry = (val) => {
    setCountryVal(val);
    getAllCity(val);
    setValue('cad_state', '');
    setValue('cad_city', '');
    setValue('province_desc', '');
    setValue('cad_city_area', '');
    setSelectedCityVal('');
    setSelectedAreaVal('');
  }

  const getAllCity = (val) => {
    setCountryVal(val);
    setValue('cad_country', val);
    ApiDataService.getAll('fetch/getAllCity/' + val, { country_iso: val }).then(response => {
      let res_data = response.data;
      setCityOptionsList(res_data.result);
      setSelectedCityVal(filterFun(res_data.result, 'SCT_CODE', address_info?.cad_city));
    }).catch(e => {
      console.log(e);
    });
  }

  const getArealist = (val) => {
    let cad_country = getValues('cad_country');
    ApiDataService.getAll('fetch/country_area_lov', { country_iso: cad_country, city_code: val }).then(response => {
      let res_data = response.data;
      setAreaOptionsList(res_data.result);
      // setAreaVal('')
      setSelectedAreaVal(filterFun(res_data.result, 'city_code', address_info?.cad_city_area));


    }).catch(e => {
      console.log(e);
    });
  }

  const cityFun = (val) => {
    setCityVal(val.SCT_CODE);
    getArealist(val.SCT_CODE);
    setStateVal(val.SST_CODE);
    setProvinceDesc(val.SST_DESC);
    setSelectedCityVal(val);

    setValue('cad_state', val.SST_CODE);
    setValue('cad_city', val.SCT_CODE);
    setValue('province_desc', val.SST_DESC);
  }
  const areaFun = (val) => {
    setAreaVal(val.city_code)
    setValue('cad_city_area', val.city_code);
    setSelectedAreaVal(val);
  }


  const onSubmit = (post_data) => {
    if (!isValidPhoneNumber(mobileNo)) {
      return true;
    }
    setLoading_btn(true);
    post_data.cad_active_yn = post_data.cad_active_yn ? 'Y' : 'N';
    post_data.cad_default_yn = post_data.cad_default_yn ? 'Y' : 'N';
    ;
    if (props.mode === 'IS') {
      ApiDataService.post(add_url, post_data).then(response => {
        let res_data = response.data;
        setLoading_btn(false);

        if (res_data.return_status == "-111") {
          setApiError(res_data.error_message);
          setAllError(res_data.result)
        } else if (res_data.return_status != "0") {
          setApiError(res_data.error_message);
        } else {
          props.AddressListFun();
          setApiError(res_data.error_message);
          props.onHide();
        }
      }).catch((error) => {
        setLoading_btn(false);
        console.log(error);
        setApiError(error);
      });
    } else {
      ApiDataService.post(update_url, post_data).then(response => {
        setLoading_btn(false);
        let res_data = response.data;
        if (res_data.return_status !== "0") {
          setApiError(res_data.error_message);
        } else {
          props.AddressListFun();
          setApiError(res_data.error_message);
          props.onHide();
        }
      }).catch((error) => {
        setLoading_btn(false);
        console.log(error);
        setApiError(error);
      });
    }

  }



  useEffect(() => {
    setStateVal(address_info?.cad_state);
    setCityVal(address_info?.cad_city);
    setAreaVal(address_info?.cad_city_area);

    Object.keys(address_info).map(function (key) {
      if (address_info[key] && key != 'status') {
        if (key == 'cad_country') {
          getAllCity(address_info[key]);
        } else if (key == 'cad_city') {
          getArealist(address_info[key]);
        }
        setValue(key, address_info[key]);
        if (key == 'cad_contact_number') {
          setmobileNumber(address_info[key]);
        }
      }
    })

  }, [address_info])

  useEffect(() => {

    ApiDataService.getAll('fetch/country_lov').then(response => {
      let res_data = response.data;
      let list = res_data.result.map((data, i) => {
        if (cn_iso == data.country_iso) {
          getAllCity(data.country_iso);
        }
        return (<option value={data.country_iso} key={i} >{data.country_desc}</option>)
      }
      );
      setcountryList(list);

    }).catch(e => {
      console.log(e);
    });



  }, []);

  useEffect(() => {
    if (address_info.cad_state == undefined) {
      countryStateList && countryStateList.map((data) => {
        if (geo_city == data.state_desc) {
          // getCitylist(data.state_code);
          setValue('cad_state', data.state_code);
        }
      });
    }
  }, [props.show])

  const filterFun = (list, col_name, val) => {
    if (val != undefined) {
      return list.filter(function (data) {
        // console.log(data[col_name], 'selectedCityVal2222');
        if (data[col_name] == val) {
          return data;
        }
        //return data[col_name] == val
      }
      );
    } else {
      return false;
    }
  }

  //console.log(selectedCityVal, selectedAreaVal, 'selectedCityVal');
  return (
    <Modal
      // {...props}
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
      dialogClassName="modalsizeontablet"
    >
      <Modal.Body>

        <div className="formaddedit p-3">
          <div onClick={props.onHide} className="close-button">✕ </div>

          <div className="error_text" style={{ padding: '8px' }}>
            {/* <div className="text-danger fs-6 fw-lighter form-input-error">{apiError}</div> */}

            {allError && Object.keys(allError).map(function (key, index) {
              if (allError[key] && allError[key].length > 1) {
                //  setError(key, { message: res_data.result[key] });
                //console.log(allError[key])
                return (
                  <div key={`allError-${index}`} className="text-danger fs-6 fw-lighter form-input-error">{allError[key]}</div>
                )

              }
            })
            }
          </div>
          <div className="heading pb-3">
            <p>{t('AddNewAddress')} </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>

              <Col sm={6}>
                <FloatingLabel className="my-2 border-0" label={t('FirstName')}>
                  <Form.Control type="text" placeholder="" name="cad_first_name"
                    className="border-0 bg-transparent border-bottom border-dark rounded-0"
                    {...register('cad_first_name', { required: true })}
                    maxLength="45" />
                  {errors?.cad_first_name && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                </FloatingLabel>
              </Col>

              <Col sm={6}>
                <FloatingLabel className="my-2 border-0" label={t('LastName')}>
                  <Form.Control type="text" placeholder="" name="cad_last_name"
                    className="border-0 bg-transparent border-bottom border-dark rounded-0"
                    {...register('cad_last_name', { required: true })}
                    maxLength="45" />
                </FloatingLabel>
                {errors?.cad_last_name && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
              </Col>
              <Col sm={6}>

                <FloatingLabel className="my-2  border-0" label={t('MobileNo')}>

                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry={cn_iso ? cn_iso.toUpperCase() : 'US'}
                    labels={langName == 'ar' ? ar : en}
                    className="signupmobile inputText form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                    placeholder="Enter phone number"
                    value={mobileNo}
                    onChange={(value) => { setmobileNumber(value), mobileNo ? setValue('cad_contact_number', value) : '' }}
                    error={mobileNo ? (isValidPhoneNumber(mobileNo) ? undefined : 'Invalid phone number') : 'Phone number required'}

                  />

                </FloatingLabel>
                {mobileNo && !isValidPhoneNumber(mobileNo) && (
                  <>
                    <span className="text-danger fs-6 fw-lighter form-input-error">
                      {t('please_enter_a_valid_number')}
                    </span>
                    <br />
                  </>
                )}
                {errors?.cad_contact_number && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
              </Col>

              <Col sm={12} className="addressheading pb-4 d-none">
                <div style={{ "float": 'left' }}><p>{t('Addressbook')} </p></div>
                <div style={{ "float": 'right' }}>
                  <Form.Check type="checkbox" label={t("Active")} name="cad_active_yn"
                    {...register('cad_active_yn')}
                  />
                  {errors?.cad_active_yn && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                </div>
              </Col>
              <Col sm={6}  >
                <FloatingLabel className="my-2 border-0" label={t('Country')}>
                  <Form.Select className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                    name="cad_country" defaultValue={address_info ? address_info.cad_country : cn_iso} onChange={(e) => { handleMyCountry(e.target.value) }} >
                    <option value="">{t('SelectCountry')} </option>
                    {countryList}
                  </Form.Select>
                </FloatingLabel>
                {errors?.cad_country && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
              </Col>

              <Col sm={6}  >
                <Form.Group className="position-relative ">
                  <Select
                    defaultValue={selectedCityVal}
                    placeholder={t('SelectCity')}
                    onChange={(e) => { cityFun(e) }}
                    options={cityOptionsList}
                    getOptionLabel={(option) => {
                      if (countryVal == 'AE') {
                        return (option.SCT_DESC);
                      } else {
                        return (parse(option.SCT_DESC + ', <sapn class="city_state_opacity">' + option.SST_DESC + '</sapn>'))
                      }
                    }}
                    getOptionValue={(option) => option.SCT_CODE}
                    value={selectedCityVal}
                    className="form-control border-0 bg-transparent border-bottom border-dark rounded-0 p-0 city_with_state"
                  />
                  <label className="selectlabel2">{t('City')}</label>

                  <Form.Control
                    type="hidden"
                    placeholder="cad_city"
                    name="cad_city"
                    {...register('cad_city', { required: true })}
                    value={cityVal}
                  />
                </Form.Group>
                {errors?.cad_city && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
              </Col>

              <Col sm={6}  style={{ zIndex: 1 }}>
                <Form.Group className="position-relative ">
                  <Select
                    defaultValue={selectedAreaVal}
                    placeholder={t('SelectArea')}
                    onChange={(e) => { areaFun(e) }}
                    options={areaOptionsList}
                    getOptionLabel={(option) => option.city_desc}
                    getOptionValue={(option) => option.city_code}
                    value={selectedAreaVal}
                    className="form-control border-0 bg-transparent border-bottom border-dark rounded-0 p-0 city_with_state"
                  />
                  <label className="selectlabel2">{t('Area')}</label>
                  <Form.Control
                    type="hidden"
                    placeholder="cad_city_area"
                    name="cad_city_area"
                    {...register('cad_city_area', { required: true })}
                    value={areaVal}
                  />
                </Form.Group>
                {errors?.cad_city_area && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
              </Col>

              <Col sm={12} style={{'display':countryVal != 'SA'?'none':'block'}}>
                <Form.Group className="floating-field" style={{ opacity: 0.9, background: '#b2b2b275' }}>
                  <Form.Control
                    type="text"
                    placeholder={''}
                    readOnly={true}
                    name="province_desc"
                    className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                    {...register('province_desc')}
                    maxLength="8"
                    value={provinceDesc}
                    style={{ padding: '5px' }}
                  />
                  <label className='province_desc label_top'>{countryVal == 'AE' ? t('Emirates') : t('Province')}</label>

                  <Form.Control
                    type="hidden"
                    placeholder="cad_state"
                    name="cad_state"
                    {...register('cad_state', { required: true })}
                    value={stateVal}
                  />

                </Form.Group>
                {errors?.cad_state && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
              </Col>

              <Col sm={6}>
                <FloatingLabel className="my-2 border-0" label={t('FloorNo')}>
                  <Form.Control type="text" placeholder=" " name="cad_floor_no" className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                    {...register('cad_floor_no')}
                    maxLength="45" />
                </FloatingLabel>
                {errors?.cad_floor_no && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
              </Col>
              <Col sm={6}>
                <FloatingLabel className="my-2 border-0" label={t('Zipcode')}>
                  <Form.Control type="text" placeholder=" " name="cad_postal_code" className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                    {...register('cad_postal_code')}
                    maxLength="8" />
                </FloatingLabel>
                {errors?.cad_postal_code && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
              </Col>

              <Col md={12} style={{ overflow: 'hidden' }}>
                <FloatingLabel className="my-2 border-0" label={t('AddressFull')}>
                  <Form.Control type="text" placeholder=" " name="cad_building_name_no" className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                    {...register('cad_building_name_no', { required: true })}
                    maxLength="45" />
                </FloatingLabel>
                {errors?.cad_building_name_no && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
              </Col>


              <Col sm={6}>
                <FloatingLabel className="my-2 border-0" label={t('Landmark')}>
                  <Form.Control type="text" placeholder=" " name="cad_nearest_landmark" className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                    {...register('cad_nearest_landmark')}
                    maxLength="45" />
                  <label>{t('Landmark')} </label>

                </FloatingLabel>
                {errors?.cad_nearest_landmark && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
              </Col>
              <Col sm={6}>
                <FloatingLabel className="my-2 border-0" label={t('Shippingnote')}>
                  <Form.Control type="text" placeholder=" " name="cad_shipping_note" className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                    {...register('cad_shipping_note')}
                    maxLength="250" />
                  <label  >{t('Shippingnote')} </label>

                </FloatingLabel>
                {errors?.cad_shipping_note && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
              </Col>
              <Col sm={6}>
                <Row className="addresstype">
                  <Col className="" lg={6}>
                    <label htmlFor="address"> {t('SaveAddressAs')} </label>
                  </Col>
                  <Col lg={6}>
                    <Row>
                      <Col className="p-0">
                        <Form.Check type="radio" name="cad_address_type" label={t('Home')} value="HOME"
                          {...register('cad_address_type', { required: true })}
                          id="home" />

                      </Col>
                      <Col className="p-0">
                        <Form.Check type="radio" name="cad_address_type" label={t('Work')} value="WORK"
                          {...register('cad_address_type', { required: true })}
                          id="Work" />

                      </Col>
                    </Row>
                  </Col>
                  {errors?.cad_address_type && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                </Row>

              </Col>
              <Col sm={6} className="notice py-3 py-md-0">
                <Form.Check type="checkbox" label={t('Makethismydefaultaddress')} name="cad_default_yn"
                  {...register('cad_default_yn')}
                />
                {errors?.cad_default_yn && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
              </Col>
              <Col sm={6}>
                <div className="hidden_filed">
                  <Form.Control type="hidden" placeholder="cust_user_id" name="cust_user_id"
                    {...register('cust_user_id', { required: true })}
                    value={user_email} />
                  {errors?.cust_user_id && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

                  <Form.Control type="hidden" placeholder="auth_token" name="auth_token"
                    {...register('auth_token', { required: true })}
                    value={auth_token} />
                  {errors?.auth_token && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                </div>

                <div className="color-button">
                  <LaddaButton loading={loading_btn} type="submit" className="submit_btn"><span>{props.mode === 'IS' ? t('Save') : t('Update')}</span></LaddaButton>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer, manu_and_site_state: state.MenusItemReduser });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddressAddEdit);