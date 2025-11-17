import React, { useState, useContext, useEffect } from 'react';
import { Col, Row, Form, Alert } from 'react-bootstrap';
import $ from 'jquery';
import { measurementText } from '../Scene'
import parse from 'html-react-parser';
import { CustomizationContext } from '../CustomizationProduct'
import ApiDataService from '../../../services/ApiDataService';
const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
import { addToCartFunScene } from '../Scene';
import { useTranslation } from 'next-i18next';

const RollCalculationTool = (props) => {
  const { t } = useTranslation("common");
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);

  let MIN_WIDTH = parseInt(customize_state.product_info.SPI_MIN_WIDTH);
  let MAX_WIDTH = parseInt(customize_state.product_info.SPI_MAX_WIDTH);
  let MIN_HEIGHT = parseInt(customize_state.product_info.SPI_MIN_HEIGHT);
  let MAX_HEIGHT = parseInt(customize_state.product_info.SPI_MAX_HEIGHT);
  const [isvalid, setIivalid] = useState({});
  const [isvalidInput, setisvalidInput] = useState({});
  const [errorMgs, setErrorMgs] = useState();
  const edit_step = customize_state.edit_step_data;

  const measurementFn = () => {

    let m_width = $('#m_width').val();
    let m_height = $('#m_height').val();
    if (m_height > 0 && m_width > 0 && !isNaN(m_width) && !isNaN(m_height)) {
      props['m_width'] = m_width;
      props['m_height'] = m_height;
      props['UOM_CODE'] = customize_state.steps.MATERIAL_SELECTION ? customize_state.steps.MATERIAL_SELECTION.material_info.SII_UOM_CODE : 0;
      props['ITEM_CODE'] = customize_state.steps.MATERIAL_SELECTION ? customize_state.steps.MATERIAL_SELECTION.material_info.SII_CODE : 0;;
      // measurementText(m_width, m_height);
      // customizeDispatch(props);
      if (m_width < MIN_WIDTH || m_width > MAX_WIDTH || m_height < MIN_HEIGHT || m_height > MAX_HEIGHT) {
        console.log('IF', m_width, MIN_WIDTH, MAX_WIDTH);
        delete customize_state.steps.ROLL_CALCULATION;
      } else {
        console.log('ELSE', m_height, MIN_HEIGHT, MAX_HEIGHT);
        measurementText(m_width, m_height);
        customizeDispatch(props);
        addToCartFunScene(customize_state, customizeDispatch);
        setTimeout(() => {
          getPrice();
        }, 1500);
      }
      customizeDispatch({ type: 'ADD-TO-CART' });
    }
  }

  const toggleValidation = (name) => {
    let value = event.target.value;
    if ((value < MIN_WIDTH || value > MAX_WIDTH) && name == 'width') {
      setIivalid({ ...isvalid, [name]: true });
      setisvalidInput({ ...isvalid, [name]: false });
    } else if ((value < MIN_HEIGHT || value > MAX_HEIGHT) && name == 'height') {
      setIivalid({ ...isvalid, [name]: true });
      setisvalidInput({ ...isvalid, [name]: false });
    } else if (!/^[0-9\b]+$/.test(value)) {
      setisvalidInput({ ...isvalid, [name]: true });
    }
    else {
      setIivalid({ ...isvalid, [name]: false });
      setisvalidInput({ ...isvalid, [name]: false });
    }
  };

  const getPrice = () => {
    addToCartFunScene(customize_state, customizeDispatch);
    customizeDispatch({ type: 'ADD-TO-CART' });
    console.log('post_data55', customize_state.steps, customize_state.steps.ROLL_CALCULATION);
  }

  useEffect(() => {
    if (edit_step.info_result && edit_step.info_result.ROLL_CALCULATION && edit_step.info_result.ROLL_CALCULATION.SOI_WIDTH > 0 && edit_step.info_result.ROLL_CALCULATION.SOI_HEIGHT > 0) {
      $('#m_width').val(edit_step.info_result.ROLL_CALCULATION.SOI_WIDTH);
      $('#m_height').val(edit_step.info_result.ROLL_CALCULATION.SOI_HEIGHT);
      setTimeout(() => {
        measurementFn();
      }, 1500);
    } else if (edit_step.line_result && edit_step.line_result.SOL_WIDTH && edit_step.line_result.SOL_WIDTH > 0 && edit_step.line_result.SOL_HEIGHT && edit_step.line_result.SOL_HEIGHT > 0) {
      $('#m_width').val(edit_step.line_result.SOL_WIDTH);
      $('#m_height').val(edit_step.line_result.SOL_HEIGHT);
      setTimeout(() => {
        measurementFn();
      }, 1500);
    }

  }, []);

  return (
    <div className="SizeAndMount">
      <div className="step-heading">
        <h5>{props.SPS_DESC}</h5>
      </div>
      {errorMgs ? <Alert className="api_alert_mgs fs-6" variant="danger" onClose={() => setErrorMgs(false)} dismissible>
        {errorMgs}
      </Alert> : ''}
      <div className="measurement">
        <Row>
          <Col sm={12}>
            <Form.Group className="py-3">
              <Form.Label>{t('width_with_val', { min: MIN_WIDTH, max: MAX_WIDTH })}</Form.Label>
              <Form.Control type="text" name="width" onChange={() => { measurementFn(); toggleValidation('width') }} id="m_width" size="lg" />
              {isvalid['width'] ? <Form.Label style={{ color: 'red' }}>{t('minmax_with_val', { min: MIN_WIDTH, max: MAX_WIDTH })}</Form.Label> : ''}
              {isvalidInput['width'] ? <Form.Label style={{ color: 'red' }}>{t("Pleaseonlyenternumericcharacters")}</Form.Label> : ''}

            </Form.Group >
            <Form.Group className="py-3">
              <Form.Label>{t('height_with_val', { min: MIN_HEIGHT, max: MAX_HEIGHT })}</Form.Label>
              <Form.Control type="text" name="height" onChange={() => { measurementFn(); toggleValidation('height') }} id="m_height" size="lg" />
              {isvalid['height'] ? <Form.Label style={{ color: 'red' }}>{t('minmax_with_val', { min: MIN_HEIGHT, max: MAX_HEIGHT })}</Form.Label> : ''}
              {isvalidInput['height'] ? <Form.Label style={{ color: 'red' }}>{t("Pleaseonlyenternumericcharacters")}</Form.Label> : ''}

            </Form.Group>
          </Col>


          <Col>
            <p className="recommended_mgs" >
              {customize_state.price_array.ROLL_CALC > 0 ? parse(t('recommended_mgs', { roll: customize_state.price_array.ROLL_CALC })) : ''}
            </p>
          </Col>
        </Row>

      </div>

    </div>
  );
}
RollCalculationTool.propTypes = {};

RollCalculationTool.defaultProps = {};

export default RollCalculationTool;
