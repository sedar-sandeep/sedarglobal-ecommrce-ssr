
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Col, Row, Form, Dropdown } from 'react-bootstrap';
import { VscInfo } from 'react-icons/vsc';
import InfoPopup from "./InfoPopup";
import { CustomizationContext } from '../CustomizationProduct';
import { Typeahead } from 'react-bootstrap-typeahead';
import ApiDataService from '../../../services/ApiDataService';
import { cn_iso } from '@utils/i18n';
import { useTranslation } from 'next-i18next';

const InfoLink = (props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <VscInfo size={12} role="button" onClick={() => setModalShow(true)} /> <InfoPopup show={modalShow} onHide={() => setModalShow(false)} {...props} />
    </>
  )
}

const DeliveryOptions = (props) => {
  const { t } = useTranslation("common");
  const [selected, setSelected] = useState();
  const [stepArray, setStepArray] = useState();
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);
  const [clickCollectList, setClickCollectList] = useState([]);
  const [deleveryCityList, setDeleveryCityList] = useState([]);
  const [citySelected, setCitySelected] = useState();
  const [showroomSelected, setShowroomSelected] = useState();

  const [errorMgs, setErrorMgs] = useState(false);
  const [variant, setVariant] = useState('danger');
  const edit_step = customize_state.edit_step_data;

  const cityList = (country = 'AE') => {
    ApiDataService.getAll("shipping/getClickAndCollectShowroomList/" + country)
      .then(response => {
        let res_data = response.data;

        if (res_data.return_status == 0 && res_data.error_message == 'Success') {
          // 
          setClickCollectList(res_data.clickCollectResult);
          setDeleveryCityList(res_data.city_list);
        } else {
          setErrorMgs(res_data.error_message);
          setVariant('danger');
        }
      }).catch(e => {
        console.log(e);
        setErrorMgs(e.message);
        setVariant('danger');
      });
  }
  useEffect(() => {
    let editcheck = true;

    props.SUB_CHILD.map((data) => {
      if (edit_step.info_result && edit_step.info_result.DELIVERY_OPTION && edit_step.info_result.DELIVERY_OPTION.SOI_SPS_CODE == data.SPS_CODE) {

        if (edit_step.city_list) {
          setCitySelected(edit_step.city_list.SCT_DESC);
          setTimeout(deliveryCity(data, edit_step.city_list), 1500);
        } else if (edit_step.showroom_list) {
          setShowroomSelected(edit_step.showroom_list.SSA_ADDRESS_TITLE + ' ' + edit_step.showroom_list.SSA_CITY_NAME);
          setTimeout(deliveryCity(data, edit_step.showroom_list), 1500);
        } else {
          setTimeout(deliveryCity(data), 1500);
        }

        editcheck = false;
      } else if (data.SPS_VALUE_DEFAULT == 'Y' && editcheck) {
        data.SPS_VALUE_DEFAULT == 'Y' ? setTimeout(deliveryCity(data), 1500) : '';
      }
    })
    cityList(cn_iso);
  }, []);

  const refcity = useRef([]);
  const refsshowroom = useRef([]);

  if (props.SUB_CHILD == undefined) {

    return false;
  }

  const deliveryCity = (data, value = false) => {

    if (data.SPS_CODE == 'DO02' && value.length && value[0]) {
      data.SOL_LOCN_CODE = value[0].SSA_SYS_ID
      setShowroomSelected(value[0].SSA_ADDRESS_TITLE + ' ' + value[0].SSA_CITY_NAME);
    } else if (data.SPS_CODE == 'DO03' && value.length && value[0]) {
      setCitySelected(value[0].SCT_DESC);
      data.SOL_LOCN_CODE = value[0].SCT_CODE
    }
    setSelected(data.SPS_CODE);
    setStepArray(data);
    customizeDispatch(data);
  }

  return (
    <div className="SummaryDelivery">
      <div className="step-heading pt-2">
        <h5>{props.SPS_DESC}</h5>
      </div>

      <div className="deliveryoption">
        <Row>
          <Col sm={12}>
            <Row>
              {
                props.SUB_CHILD.map((data, index) => {
                  let active_cls = data.SPS_CODE == selected ? 'deliveryoptionbox py-3 px-1 active' : 'deliveryoptionbox py-3 px-1';
                  return (
                    <Col xl={index >= 2 ? 8 : 6} className="mb-4" key={index} >
                      <div className={active_cls}>
                        <label className="m-0" onClick={(e) => { deliveryCity(data, e) }}>
                          <Form.Check
                            inline
                            name={'name' + props.SS_CODE_NAME}
                            type="radio"
                            checked={data.SPS_CODE == selected ? true : false}
                            style={{ float: 'left' }}
                          />

                          <>
                            {(() => {
                              if (data.SPS_CODE == 'DO02') {
                                return (
                                  <Dropdown style={{ float: 'left' }} onClick={() => { setTimeout(() => refsshowroom.current[index].focus(), 300) }}>
                                    <Dropdown.Toggle as="button" role="button" style={{ background: 'none' }}>
                                      <div className="labeltext">
                                        <h5>{data.SPS_DESC}  {data.SPS_MORE && <InfoLink link="#" className="px-2" />}</h5>
                                        <p>{showroomSelected ? showroomSelected : data.SPS_TEXT}</p>
                                      </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      <Typeahead as="p"
                                        id="SSA_ADDRESS_TITLE"
                                        labelKey="SSA_ADDRESS_TITLE"
                                        labelValue="SSA_SYS_ID"
                                        options={clickCollectList}
                                        placeholder={t('Showroom')}
                                        onChange={(e) => { deliveryCity(data, e) }}
                                        ref={(element) => { refsshowroom.current[index] = element }}
                                      />
                                    </Dropdown.Menu>
                                  </Dropdown>)
                              } else if (data.SPS_CODE == 'DO03') {
                                return (
                                  <Dropdown style={{ float: 'left' }} onClick={() => { setTimeout(() => refcity.current[index].focus(), 300) }} >
                                    <Dropdown.Toggle as="button" role="button" style={{ background: 'none' }}>
                                      <div className="labeltext">
                                        <h5>{data.SPS_DESC}  {data.SPS_MORE && <InfoLink link="#" className="px-2" />}</h5>
                                        <p>{citySelected ? citySelected : data.SPS_TEXT}</p>
                                      </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      <Typeahead
                                        id="SCT_CODE"
                                        labelKey="SCT_DESC"
                                        labelValue="SCT_CODE"
                                        options={deleveryCityList}
                                        placeholder="Choose a city..."
                                        onChange={(e) => { deliveryCity(data, e) }}
                                        ref={(element) => { refcity.current[index] = element }}
                                      />
                                    </Dropdown.Menu>
                                  </Dropdown>)
                              }
                              else {
                                return (<div className="labeltext">
                                  <h5>{data.SPS_DESC}  {data.SPS_MORE && <InfoLink link="#" className="px-2" />}</h5>
                                  <p>{data.SPS_TEXT}</p>
                                </div>)
                              }
                            })()}
                          </>

                        </label>

                      </div>
                    </Col>
                  )
                })
              }



              <Col sm={12}>
                <div className="condition p-3">
                  <p>{t('If_You_Want_to_do_advance_Settings')}</p>
                  <p> {t('You_may_or_may_not_know')}</p>
                  {/* <Link to="/" >Click Here</Link> */}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

DeliveryOptions.propTypes = {};

DeliveryOptions.defaultProps = {};

export default DeliveryOptions;
