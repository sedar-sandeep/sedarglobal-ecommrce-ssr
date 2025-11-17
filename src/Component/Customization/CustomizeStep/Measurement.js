import React, { useState, useContext, useEffect } from 'react';
import { Col, Row, Form, Alert } from 'react-bootstrap';
import $ from 'jquery';
import { measurementText, addToCartFunScene } from '../Scene'
import { CustomizationContext } from '../CustomizationProduct'
const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
import parse from 'html-react-parser';
import { useTranslation } from 'next-i18next';
//const re = /^[0-9\b]+$/;
const re = /^\d*\.?\d*$/;

const Measurement = (props) => {
  const { t } = useTranslation("common")
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);

  let MIN_WIDTH = parseInt(customize_state.product_info.SPI_MIN_WIDTH);
  let MAX_WIDTH = parseInt(customize_state.product_info.SPI_MAX_WIDTH);
  let MIN_HEIGHT = parseInt(customize_state.product_info.SPI_MIN_HEIGHT);
  let MAX_HEIGHT = parseInt(customize_state.product_info.SPI_MAX_HEIGHT);

  let restrict_to_material_width_yn = customize_state.product_info.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN ? customize_state.product_info.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN : 'N';
  if (restrict_to_material_width_yn == 'Y' && customize_state.steps && customize_state.steps.MATERIAL_SELECTION && customize_state.steps.MATERIAL_SELECTION.material_info.SII_WIDTH) {
    MAX_WIDTH = parseInt(customize_state.steps.MATERIAL_SELECTION.material_info.SII_WIDTH);
  }
  
  let restrict_to_material_height_yn = customize_state.product_info.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN ? customize_state.product_info.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN : 'N';
  if (restrict_to_material_height_yn == 'Y' && customize_state.steps && customize_state.steps.MATERIAL_SELECTION && customize_state.steps.MATERIAL_SELECTION.material_info.SII_LENGTH) {
    MAX_HEIGHT = parseInt(customize_state.steps.MATERIAL_SELECTION.material_info.SII_LENGTH);
  }


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
      props['ITEM_CODE'] = customize_state.steps.MATERIAL_SELECTION ? customize_state.steps.MATERIAL_SELECTION.material_info.SII_CODE : 0;

      if (m_width < MIN_WIDTH || m_width > MAX_WIDTH || m_height < MIN_HEIGHT || m_height > MAX_HEIGHT) {
        delete customize_state.steps.MEASUREMENT;
      } else {
        measurementText(m_width, m_height);
        customizeDispatch(props);
        addToCartFunScene(customize_state, customizeDispatch);
      }
      customizeDispatch({ type: 'ADD-TO-CART' });
    }
  }

  const toggleValidation = (name) => {
    let value = event.target.value;
    if (!re.test(value)) {
      if (name == 'width') {
        $('#m_width').val('');
      } else if (name == 'height') {
        $('#m_height').val('');
      }

      return false;
    }
    if ((value < MIN_WIDTH || value > MAX_WIDTH) && name == 'width') {
      setIivalid({ ...isvalid, [name]: true });
      setisvalidInput({ ...isvalid, [name]: false });
    } else if ((value < MIN_HEIGHT || value > MAX_HEIGHT) && name == 'height') {
      setIivalid({ ...isvalid, [name]: true });
      setisvalidInput({ ...isvalid, [name]: false });
    } else if (!re.test(value)) {
      setisvalidInput({ ...isvalid, [name]: true });
    }
    else {
      setIivalid({ ...isvalid, [name]: false });
      setisvalidInput({ ...isvalid, [name]: false });
    }
  };


  useEffect(() => {
    if (edit_step.info_result && edit_step.info_result.MEASUREMENT && edit_step.info_result.MEASUREMENT.SOI_WIDTH > 0 && edit_step.info_result.MEASUREMENT.SOI_HEIGHT > 0) {
      $('#m_width').val(edit_step.info_result.MEASUREMENT.SOI_WIDTH);
      $('#m_height').val(edit_step.info_result.MEASUREMENT.SOI_HEIGHT);
      setTimeout(measurementFn(), 1500);
    } else if (edit_step.line_result && edit_step.line_result.SOL_WIDTH > 0 && edit_step.line_result.SOL_HEIGHT > 0) {
      $('#m_width').val(edit_step.line_result.SOL_WIDTH);
      $('#m_height').val(edit_step.line_result.SOL_HEIGHT);
      setTimeout(measurementFn(), 1500);
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
              <Form.Label> {parse(t('product_width', { min_width: MIN_WIDTH, max_width: MAX_WIDTH }))}</Form.Label>
              <Form.Control type="text" name="width" onChange={() => { measurementFn(); toggleValidation('width') }} id="m_width" size="lg" />
              {isvalid['width'] ? <Form.Label style={{ color: 'red' }}>{parse(t('product_width_validation', { min_width: MIN_WIDTH, max_width: MAX_WIDTH }))}</Form.Label> : ''}
              {isvalidInput['width'] ? <Form.Label style={{ color: 'red' }}>{t("Pleaseonlyenternumericcharacters")}</Form.Label> : ''}

            </Form.Group >
            <Form.Group className="py-3">
              <Form.Label>{parse(t('product_height', { min_height: MIN_HEIGHT, max_height: MAX_HEIGHT }))}  </Form.Label>
              <Form.Control type="text" name="height" onChange={() => { measurementFn(); toggleValidation('height') }} id="m_height" size="lg" />
              {isvalid['height'] ? <Form.Label style={{ color: 'red' }}> {parse(t('product_height_validation', { min_height: MIN_HEIGHT, max_height: MAX_HEIGHT }))}</Form.Label> : ''}
              {isvalidInput['height'] ? <Form.Label style={{ color: 'red' }}>{t("Pleaseonlyenternumericcharacters")} </Form.Label> : ''}

            </Form.Group>
          </Col>
        </Row>

      </div>

    </div>
  );
}
Measurement.propTypes = {};

Measurement.defaultProps = {};

export default Measurement;
