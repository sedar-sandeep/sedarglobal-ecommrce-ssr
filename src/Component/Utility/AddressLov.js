import React, { useState, useEffect } from 'react'
import ApiDataService from '../../services/ApiDataService';
import { Form, Button, Col, Row, Container, FloatingLabel, Card } from 'react-bootstrap';
import parse from 'html-react-parser';
import { useTranslation } from 'next-i18next';
import Cookies from 'js-cookie';
import { cn_iso, langName } from '@utils/i18n';
import Select, { createFilter } from 'react-select';
import AsyncSelect from 'react-select/async';
import Prompt from './Modal/Prompt';




export default function AddressLov(props) {
  const { register, setValue, getValues, startDate } = props;
  const { t } = useTranslation('common');


  const currentDate = new Date()


  const [countryList, setcountryList] = useState();
  // const [myCountry, setMyCountry] = useState(cn_iso);
  //const [myState, setMyState] = useState(geo_location?.region_code);



  const [countryVal, setCountryVal] = useState(cn_iso);
  const [stateVal, setStateVal] = useState();
  const [cityVal, setCityVal] = useState();
  const [areaVal, setAreaVal] = useState();
  const [provinceDesc, setProvinceDesc] = useState();
  const [cityOptionsList, setCityOptionsList] = useState([]);
  const [defaultCityOptionsList, setDefaultCityOptionsList] = useState([]);
  const [areaOptionsList, setAreaOptionsList] = useState([]);
  const [selectedCityVal, setSelectedCityVal] = useState();
  const [selectedAreaVal, setSelectedAreaVal] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  const handleMyCountry = (event) => {



    const countryHolidayUAE = event.target.value == 'AE' ? 5 : 0;
    const skipDay = currentDate.getDay() == countryHolidayUAE ? 3 : 2;

    //console.log(event.target.value, 'Calendar11', startDate.getDay(), currentDate.getDay());

    setCountryVal(event.target.value);
    props.setSelectedCountry ? props.setSelectedCountry(event.target.value) : ''
    getAllCity(event.target.value);
    setValue('state', '');
    setValue('city', '');
    setValue('province_desc', '');
    setValue('area', '');
    setSelectedCityVal('');
    setSelectedAreaVal('');
    setProvinceDesc('');


    if (startDate && [0, 5].indexOf(startDate.getDay()) >= 0) {
      props.setStartDate(addDays(currentDate, skipDay));
      setShow(true);
    }

    /* if (event.target.value == 'AE' && startDate.getDay() == 0) {
       props.setStartDate(addDays(currentDate, skipDay));
       setShow(true);
     } else if (['AE'].indexOf(event.target.value) == -1 && startDate.getDay() == 5) {
       props.setStartDate(addDays(currentDate, skipDay));
       setShow(true);
     }*/


  }

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const getAllCity = (val) => {
    setCountryVal(val);
    setValue('cad_country', val);
    ApiDataService.getAll('fetch/getAllCity/' + val, { country_iso: val }).then(response => {
      let res_data = response.data;
      setCityOptionsList(res_data.result);

      let city_list = [];
      if (res_data.result.length > 200) {
        for (let i = 0; i < 200; i++) {
          city_list.push(res_data.result[i]);
        }
        setDefaultCityOptionsList(city_list);
      } else {
        setDefaultCityOptionsList(res_data.result);
      }

      // setCityVal('');
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

    setValue('state', val.SST_CODE);
    setValue('city', val.SCT_CODE);
    setValue('province_desc', val.SST_DESC);

    setAreaVal('')
    setValue('area', '');
    setSelectedAreaVal('');
  }
  const areaFun = (val) => {
    setAreaVal(val.city_code)
    setValue('area', val.city_code);
    setSelectedAreaVal(val);
  }

  useEffect(() => {
    ApiDataService.getAll('fetch/country_lov').then(response => {
      let list = response.data.result.map((data, i) =>
        <option value={data.country_iso} key={i}  >{data.country_desc}</option>
      );
      setcountryList(list);
    }).catch(e => {
      console.log(e);
      // setApiError(e.message);
    });
    getAllCity(countryVal);
    //loadOptions('s');
  }, []);


  /*
  
    var filterColors = function (inputValue) {
      console.log(inputValue, 'inputValue')
  
  
      return ApiDataService.getAll('fetch/getAllCity/' + val, { country_iso: val }).then(response => {
        let res_data = response.data;
        setCityOptionsList(res_data.result);
  
        return res_data.result.filter(function (i) {
          return i.SCT_DESC.toLowerCase().includes(inputValue.toLowerCase());
        });
      }).catch(e => {
        console.log(e);
      });
  
    
    };*/

  var filterColors = function (inputValue) {
    console.log(inputValue, 'inputValue11')
    return cityOptionsList.filter(function (i) {
      return i.SCT_DESC.toLowerCase().includes(inputValue.toLowerCase());
    });
  };
  var loadOptions = function (inputValue, callback) {

    console.log(inputValue, 'inputValue');
    setTimeout(function () {
      callback(filterColors(inputValue));
    }, 100);
  };


  // var loadOptions11 = function (inputValue = 'a', callback) {

  //   console.log(inputValue, 'inputValue33');
  //   setTimeout(function () {
  //     callback(filterColors('a'));

  //   }, 100);
  // };

  return (
    <>
      <Col sm="6">

        <FloatingLabel label={t('Country')} className="my-2 my-md-4 border-0">
          <Form.Select as="select" name="country"
            {...register('country', {
              required: true,
              onChange: handleMyCountry,
              defaultValue: countryVal
            })}
            className="form-control inputText border-0 bg-transparent border-bottom border-dark rounded-0" value={countryVal}>
            <option value="">{t('SelectCountry')} </option>
            {countryList}
          </Form.Select>

          {props?.errors?.country && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

        </FloatingLabel>
      </Col>
      {/* {width < 576 ? */}

      <Col sm={6} className="d-block d-sm-block">
        <Form.Group className="my-2 my-md-4 border-0 form-floating">
          <label className="city_area_label">{t('City')}</label>
          <AsyncSelect
            cacheOptions
            defaultValue={selectedCityVal}
            defaultOptions={defaultCityOptionsList}
            loadOptions={loadOptions}
            onChange={(e) => { cityFun(e) }}
            // style={{  paddingTop: '0.625rem' }}
            getOptionLabel={(option) => {
              if (countryVal == 'AE') {
                return (option.SCT_DESC);
              } else {
                return (parse(option.SCT_DESC + ', <sapn class="city_state_opacity">' + option.SST_DESC + '</sapn>'))
              }
            }}
            getOptionValue={(option) => option.SCT_CODE}
            value={selectedCityVal}
            className="form-control border-0 bg-transparent border-bottom border-dark rounded-0 p-0 city_with_state city_with_state_contact_form"
            style={{ color: 'red' }}
          />

          <Form.Control
            type="hidden"
            placeholder="city"
            name="city"
            {...register('city', { required: true })}
            value={cityVal}
            style={{ top: '21px' }}
          />
          {props?.errors?.city && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
        </Form.Group>
      </Col>
      {/* <Col sm={6} className="d-block d-sm-block">
        <Form.Group className="my-2 my-md-4 border-0">
          <label className="city_area_label">{t('City')}</label>
          <Select
            cacheOptions
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
            //  filterOption={createFilter({ ignoreAccents: false })}
            className="form-control border-0 bg-transparent border-bottom border-dark rounded-0 p-0 city_with_state"
          />

          <Form.Control
            type="hidden"
            placeholder="city"
            name="city"
            {...register('city', { required: true })}
            value={cityVal}
          />
          {props?.errors?.city && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
        </Form.Group>

      </Col> */}
      {props.hideField && props.hideField === "A"
        ? '' :
        <Col sm={6} style={{ zIndex: 3 }}>
          <Form.Group className="my-2 my-md-4 border-0 form-floating">
            <label className="city_area_label">{t('Area')}</label>
            <Select
              defaultValue={selectedAreaVal}
              placeholder={t('SelectArea')}
              onChange={(e) => { areaFun(e) }}
              options={areaOptionsList}
              getOptionLabel={(option) => option.city_desc}
              getOptionValue={(option) => option.city_code}
              value={selectedAreaVal}
              className="form-control border-0 bg-transparent border-bottom border-dark rounded-0 p-0 city_with_state city_with_state_contact_form"

            />

            <Form.Control
              type="hidden"
              placeholder="area"
              name="area"
              {...register('area', { required: true })}
              value={areaVal}
            />
            {props?.errors?.area && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
          </Form.Group>

        </Col>
      }

      <Col sm={6} style={{ 'display': countryVal != 'SA' ? 'none' : 'block' }}>
        <Form.Group className="my-2 my-md-4 border-0 floating-field">
          <label className="city_area_label">{countryVal == 'AE' ? t('Emirates') : t('Province')}</label>

          <Form.Control
            type="text"
            placeholder={''}
            readOnly={true}
            name="province_desc"
            className="border-0 bg-transparent border-bottom border-dark rounded-0 readonly"
            {...register('province_desc')}
            maxLength="8"
            value={provinceDesc}
          />
          <Form.Control
            type="hidden"
            placeholder="state"
            name="state"
            {...register('state', { required: true })}
            value={stateVal}
          />

          {props?.errors?.state && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
        </Form.Group>
      </Col>
      <Prompt show={show} onHide={handleClose} />
    </>
  )
}
