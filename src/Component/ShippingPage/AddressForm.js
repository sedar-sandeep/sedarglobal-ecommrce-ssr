import React, { useState, useEffect, useContext } from 'react';
import { Col, Row, Tab, Nav, Button, Modal, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";

import { connect } from "react-redux";
import ApiDataService from '../../services/ApiDataService';
import LaddaButton from 'react-ladda';
import { updateShippingPrice } from './ShippingReducer';
import parse from 'html-react-parser';
import 'react-phone-number-input/style.css'
import en from 'react-phone-number-input/locale/en';
import ar from 'react-phone-number-input/locale/ar';
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next'
import { langName, cn_iso } from '@utils/i18n';
import Select from 'react-select';


import { ShippingContext } from './ShippingPage'

const AddressForm = (props) => {

    const { t } = useTranslation('common');
    const router = useRouter();
    const geo_location = localStorage.getItem('GEOLOCATION');
    let geo_city = geo_location != 'undefined' && JSON.parse(geo_location) != null && JSON.parse(geo_location).city ? JSON.parse(geo_location).city : '';

    let auth_token = props.user_state ? props.user_state.auth_token : '';
    let user_id = props.user_state ? props.user_state.user_id : 0;
    let user_email = props.user_state ? props.user_state.user_email : '';

    let user_info = props.user_state ? props.user_state.user_info : [];
    const address_info = props.addressEdit ? props.addressEdit : false;

    const [stateVal, setStateVal] = useState();
    const [cityVal, setCityVal] = useState();
    const [areaVal, setAreaVal] = useState();
    const [provinceDesc, setProvinceDesc] = useState(address_info.cad_state_desc ? address_info.cad_state_desc : '');
    const add_url = 'dashboard/create_address/' + user_id;

    const update_url = `dashboard/update_address/${address_info.cad_id}/${address_info.cad_cust_id}`;

    const { shipping_state, shippingDispatch } = useContext(ShippingContext);

    const [loading_btn, setLoading_btn] = useState(false);
    const [apiError, setApiError] = useState();
    const [countryList, setcountryList] = useState();
    const [saveAndContinue, setSaveAndContinue] = useState(false);
    const [allError, setAllError] = useState(false);

    const [cityOptionsList, setCityOptionsList] = useState([]);
    const [areaOptionsList, setAreaOptionsList] = useState([]);
    const [selectedCityVal, setSelectedCityVal] = useState();
    const [selectedAreaVal, setSelectedAreaVal] = useState();

    let mobile_no = address_info ? address_info.cad_contact_number : user_info.cust_mobile_no;

    const [phoneNo, setphoneNumber] = useState(mobile_no);

    const { register, handleSubmit, watch, setValue, setError, getValues, reset, formState: { errors } } = useForm({
        defaultValues: {
            cad_address_type: 'HOME',
            cad_first_name: address_info ? address_info.cad_first_name : user_info.cust_first_name,
            cad_last_name: address_info ? address_info.cad_last_name : user_info.cust_last_name,
            cad_contact_number: address_info ? address_info.cad_contact_number : user_info.cust_mobile_no,
            cad_country: address_info ? address_info.cad_country : cn_iso,
            cad_active_yn: address_info ? address_info.cad_first_name : 'Y',
            cad_default_yn: address_info ? address_info.cad_first_name : 'Y',
            phoneNo: address_info ? address_info.cust_mobile_no : '',
        }
    });

    const getAllCity = (val) => {
        ApiDataService.getAll('fetch/getAllCity/' + val, { country_iso: val }).then(response => {
            let res_data = response.data;
            console.log(res_data, 'res_data');
            setCityOptionsList(res_data.result)
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
            setSelectedAreaVal(filterFun(res_data.result, 'city_code', address_info?.cad_city_area));
        }).catch(e => {
            console.log(e);
        });
    }

    const onSubmit = (post_data) => {
        console.log(post_data, 'post_data');

        //   return false;
        if (phoneNo == undefined) {
            console.log(errors, 'errors');
            setphoneNumber('');
            return true;
        } else if (!isValidPhoneNumber(phoneNo)) {
            console.log(errors, 'errors11');
            return true;
        }

        setLoading_btn(true);
        post_data.cad_active_yn = post_data.cad_active_yn ? 'Y' : 'N';
        post_data.cad_default_yn = post_data.cad_default_yn ? 'Y' : 'N';
        post_data.cad_country = cn_iso;
        // console.log(post_data, 'update_url');

        console.log(post_data, 'post_data11');
        if (props.mode === 'IS') {
            ApiDataService.post(add_url, post_data).then(response => {
                let res_data = response.data;
                setLoading_btn(false);
                //console.log(response);
                if (res_data.return_status == "-111") {
                    setApiError(res_data.error_message);
                    setAllError(res_data.result)

                } else if (res_data.return_status != "0") {
                    setApiError(res_data.error_message);
                } else {
                    let shipping_id = res_data.result && res_data.result.CAD_SYS_ID ? res_data.result.CAD_SYS_ID : false;
                    let ship_price = shipping_state.shipping_price ? shipping_state.shipping_price : 0
                    updateShippingPrice(shipping_id, ship_price);

                    /*props.AddressListFun();
                    setSaveAndContinue(true);*/
                    router.push('delivery');
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
                if (user_info && user_info.cust_cr_uid === 'GUEST-USER' && res_data.return_status == 0) {
                    //   props.AddressListFun();
                    router.push('delivery');
                } else if (res_data.return_status !== "0") {
                    setApiError(res_data.error_message);
                } else {
                    router.push('delivery');
                }
            }).catch((error) => {
                setLoading_btn(false);
                console.log(error);
                setApiError(error);
            });
        }

    }
    const cityFun = (val) => {
        console.log(val, 'cityFun..');
        setCityVal(val.SCT_CODE);
        getArealist(val.SCT_CODE);
        setStateVal(val.SST_CODE);
        setProvinceDesc(val.SST_DESC);

        setValue('cad_state', val.SST_CODE);
        setValue('cad_city', val.SCT_CODE);
        setValue('province_desc', val.SST_DESC);
        setSelectedCityVal(val);
    }
    const areaFun = (val) => {
        console.log(val, 'cad_city_area..');
        setAreaVal(val.city_code)
        setValue('cad_city_area', val.city_code);

        setSelectedAreaVal(val);
    }

    const filterFun = (list, col_name, val) => {
        if (val != undefined) {
            return list.filter(function (data) {
                if (data[col_name] == val) {
                    return data;
                }
            });
        } else {
            return false;
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

            }
        })

    }, [address_info])

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
        getAllCity(cn_iso);
        // getAllCity('SA');
    }, []);




    useEffect(() => {
        if (saveAndContinue && shipping_state.shipping_address && shipping_state.shipping_address.cad_id) {
            router.push('delivery');
        }
    }, [shipping_state.shipping_address && shipping_state.shipping_address.cad_id])

    // console.log(errors, 'errorsss1', selectedCityVal, address_info);
    return (
        <div className="formaddedit">
            <div className="error_text" style={{ padding: '8px' }}>
                <div className="text-danger fs-6 fw-lighter form-input-error">{apiError}</div>

                {allError && Object.keys(allError).map(function (key) {
                    if (allError[key] && allError[key].length > 1) {
                        //  setError(key, { message: res_data.result[key] });
                        //console.log(allError[key])
                        // return (
                        //     <div className="text-danger fs-6 fw-lighter form-input-error">{allError[key]}</div>
                        // )

                    }
                })
                }
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="floating-field">
                            <Form.Control
                                type="text" placeholder=""
                                name="cad_first_name"
                                className="form-control border-0 bg-transparent border-bottom border-dark rounded-0 p-0"
                                maxLength="45"
                                {...register('cad_first_name', { required: true })}
                            />
                            <label>{t("FirstName")}  </label>
                        </Form.Group>
                        {errors?.cad_first_name && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="floating-field">
                            <Form.Control
                                type="text"
                                placeholder=""
                                name="cad_last_name"
                                className="form-control border-0 bg-transparent border-bottom border-dark rounded-0 p-0"
                                {...register('cad_last_name', { required: true })}
                                maxLength="45"
                            />
                            <label>{t("LastName")} </label>

                        </Form.Group>
                        {errors?.cad_last_name && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="position-relative" style={{ marginTop: '21px' }}>

                            <PhoneInput
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry={cn_iso ? cn_iso.toUpperCase() : 'US'}
                                labels={langName == 'ar' ? ar : en}
                                className="signupmobile inputText form-control border-0 border-bottom border-dark rounded-0"
                                placeholder="Enter phone number"
                                value={phoneNo}
                                name="cad_contact_number"
                                {...register('cad_contact_number', { required: true })}
                                onChange={(value) => setphoneNumber(value)}
                                error={phoneNo ? (isValidPhoneNumber(phoneNo) ? undefined : 'Invalid phone number') : 'Phone number required'}
                            />

                            <label className="phonelabel">{t('MobileNo')}</label>
                        </Form.Group>
                        {phoneNo && !isValidPhoneNumber(phoneNo) && (
                            <>
                                <span className="text-danger fs-6 fw-lighter form-input-error">
                                    {t('please_enter_a_valid_number')}
                                </span>
                                <br />
                            </>
                        )}
                        {errors?.cad_contact_number && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                        {phoneNo == undefined || phoneNo == '' && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                    </Col>


                    <Col sm={12} className="addressheading pb-4 d-none">
                        <div style={{ "float": 'left' }}><p>{t('Addressbook')}</p></div>
                        <div style={{ "float": 'right' }}>
                            <Form.Check
                                type="checkbox"
                                label={t("Active")}
                                name="cad_active_yn"
                                {...register('cad_active_yn')}
                            />
                            {errors?.cad_active_yn && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                        </div>
                    </Col>
                    <Col sm={6}  >
                        <Form.Group className="position-relative " style={{ pointerEvents: 'none' }} >
                            <Form.Control
                                as="select"
                                className="form-control border-0 bg-transparent border-bottom border-dark rounded-0 p-0"
                                name="cad_country"
                                onChange={(e) => { getAllCity(e.target.value) }}
                                {...register('cad_country', { required: true })}
                                defaultValue={cn_iso}
                                disabled={true}
                            >
                                <option value="">{t('SelectCountry')}</option>
                                {countryList}
                            </Form.Control>
                            <label className="selectlabel2">{t('Country')}</label>
                        </Form.Group>
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
                                    if (cn_iso == 'AE') {
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

                    <Col sm={12} style={{'display':cn_iso != 'SA'?'none':'block'}}>
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
                            <label className='label_top'>{cn_iso == 'AE' ? t('Emirates') : t('Province')}</label>

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
                        <Form.Group className="floating-field">
                            <Form.Control
                                type="text"
                                placeholder=" "
                                name="cad_floor_no"
                                className="form-control border-0 bg-transparent border-bottom border-dark rounded-0 p-0"
                                {...register('cad_floor_no')}
                                maxLength="45"
                            />
                            <label>{t('FloorNo')}</label>

                        </Form.Group>
                        {errors?.cad_floor_no && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="floating-field">
                            <Form.Control
                                type="text"
                                placeholder=" "
                                name="cad_postal_code"
                                className="form-control border-0 bg-transparent border-bottom border-dark rounded-0 p-0"
                                {...register('cad_postal_code')}
                                maxLength="8"
                            />
                            <label>{t('Zipcode')}</label>

                        </Form.Group>
                        {errors?.cad_postal_code && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                    </Col>

                    <Col sm={12} style={{ overflow: 'hidden' }}>
                        <Form.Group className="floating-field">
                            <Form.Control
                                type="text"
                                placeholder=" "
                                name="cad_building_name_no"
                                className="form-control border-0 bg-transparent border-bottom border-dark rounded-0 p-0"
                                {...register('cad_building_name_no', { required: true })}
                                maxLength="45"
                            />
                            <label className='text-nowrap'  >{t('AddressFull')} </label>

                        </Form.Group>
                        {errors?.cad_building_name_no && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="floating-field">
                            <Form.Control
                                type="text"
                                placeholder=" "
                                name="cad_nearest_landmark"
                                className="form-control border-0 bg-transparent border-bottom border-dark rounded-0 p-0"
                                {...register('cad_nearest_landmark')}
                                maxLength="45"
                            />
                            <label  >{t('Landmark')}</label>

                        </Form.Group>
                        {errors?.cad_nearest_landmark && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="floating-field">
                            <Form.Control
                                type="text"
                                placeholder=" "
                                name="cad_shipping_note"
                                className="form-control border-0 bg-transparent border-bottom border-dark rounded-0 p-0"
                                {...register('cad_shipping_note')}
                                maxLength="200"
                            />
                            <label  >{t('Shippingnote')}</label>

                        </Form.Group>
                        {errors?.cad_shipping_note && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                    </Col>
                    <Col sm={6}>
                        <Row className="addresstype">
                            <Col className="" lg={6}>
                                <label htmlFor="address">{t('SaveAddressAs')} </label>
                            </Col>
                            <Col lg={6}>
                                <Row>
                                    <Col className="border-0 p-0">
                                        <Form.Check
                                            type="radio"
                                            name="cad_address_type"
                                            label={t('Home')}
                                            value="HOME"
                                            {...register('cad_address_type', { required: true })}
                                            id="home"
                                        />

                                    </Col>
                                    <Col className="border-0 p-0">
                                        <Form.Check
                                            type="radio"
                                            name="cad_address_type"
                                            label={t('Work')}
                                            value="WORK"
                                            {...register('cad_address_type', { required: true })}
                                            id="Work"
                                        />

                                    </Col>
                                </Row>
                            </Col>
                            {errors?.cad_address_type && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                        </Row>

                    </Col>
                    {user_info && user_info.cust_cr_uid === 'GUEST-USER' ?
                        <Col sm={6} className="notice d-none">
                            <Form.Check
                                type="checkbox"
                                label={t("Makethismydefaultaddress")}
                                name="cad_default_yn"
                                {...register('cad_default_yn')}
                            />
                            {errors?.cad_default_yn && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                        </Col>
                        : <Col sm={6} className="notice">
                            <Form.Check
                                type="checkbox"
                                label={t("Makethismydefaultaddress")}
                                name="cad_default_yn"
                                {...register('cad_default_yn')}
                            />
                            {errors?.cad_default_yn && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                        </Col>
                    }

                    <Col sm={6}>
                        <div className="hidden_filed">
                            <Form.Control
                                type="hidden"
                                placeholder="cust_user_id"
                                name="cust_user_id"
                                {...register('cust_user_id', { required: true })}
                                value={user_email}
                            />
                            {errors?.cust_user_id && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

                            <Form.Control
                                type="hidden"
                                placeholder="auth_token"
                                name="auth_token"
                                {...register('auth_token', { required: true })}
                                value={auth_token}
                            />
                            {errors?.auth_token && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="color-button">
                            {user_info && user_info.cust_cr_uid === 'GUEST-USER' ?
                                <LaddaButton loading={loading_btn} type="submit" className="submit_btn"><span>{t('Continue')}</span></LaddaButton> :
                                shipping_state.user_shipping_list.length > 0 && props.mode === 'IS' ?
                                    <LaddaButton loading={loading_btn} type="submit" className="submit_btn"><span>{t('Save_and_continue')}</span></LaddaButton>
                                    : <LaddaButton loading={loading_btn} type="submit" className="submit_btn"><span>{props.mode === 'IS' ? t('Save') : t('Update')}</span></LaddaButton>
                            }
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);