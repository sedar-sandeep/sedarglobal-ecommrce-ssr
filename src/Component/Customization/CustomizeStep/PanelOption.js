import React, { useState, useEffect, useContext, useRef } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import InfoPopup from "./InfoPopup";
import { panelOption, addToCartFunScene } from '../Scene';
import SubStepImport from '../SubStepImport';
import { CustomizationContext } from '../CustomizationProduct'
import { VscInfo } from 'react-icons/vsc';
import { useTranslation } from 'next-i18next';


const InfoLink = (props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <VscInfo size={12} role="button" onClick={() => setModalShow(true)} /><InfoPopup show={modalShow} onHide={() => setModalShow(false)} {...props} />
    </>
  )
}
const PanelOption = (props) => {
  const { t } = useTranslation("common");
  const [selected, setSelected] = useState();
  const [stepArray, setStepArray] = useState();
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);
  const edit_step = customize_state.edit_step_data;

  const optionFun = (val) => {
    panelOption(val.SPS_CODE);
    setSelected(val.SPS_CODE);
    setStepArray(val);
    customizeDispatch(val);
    customizeDispatch({ type: 'ERROR-VALIDATION' });

    setTimeout(
      function () {
        addToCartFunScene(customize_state, customizeDispatch);
      }
        .bind(this),
      200
    );
  }
  useEffect(() => {
    let editcheck = true;
    props.SUB_CHILD.map((data) => {
      //  data.SPS_VALUE_DEFAULT == 'Y' ? setTimeout(optionFun(data), 1500) : '';
      if (edit_step.info_result && edit_step.info_result.PANEL_OPTION && edit_step.info_result.PANEL_OPTION.SOI_SPS_CODE == data.SPS_CODE) {
        setTimeout(optionFun(data), 1500)
        editcheck = false;
      } else if (data.SPS_VALUE_DEFAULT == 'Y' && editcheck) {
        data.SPS_VALUE_DEFAULT == 'Y' ? setTimeout(optionFun(data), 1500) : '';
      }
    })
  }, []);

  const myRef = useRef(null);

  if (props.SUB_CHILD == undefined) {

    return false;
  }

  const movetoNextdiv = () => {
    setTimeout(() => {
      myRef.current.scrollIntoView({ behavior: 'smooth' })
    }, 600);
  };


  return (

    <div className="SizeAndMount">
      <div className="step-heading">
        <h5>{props.SPS_DESC}
          &nbsp;{props.SPS_MORE && props.SPS_MORE.length > 5 && <InfoLink {...props} />}
        </h5>
      </div>

      <div className="PanelOption">
        <Row>
          <Col sm={12}>
            <Row>
              {props.SUB_CHILD.map((data, index) => {
                let active_cls = data.SPS_CODE == selected ? 'mountgrid active' : 'mountgrid ';
                let min_width_validation = data.SPS_MIN_WIDTH && customize_state.product_info && parseInt(data.SPS_MIN_WIDTH) > parseInt(customize_state.product_info.m_width) ? true : false;
                let cls = min_width_validation ? ' with_opacity' : '';


                switch (props.SPS_INPUT_TYPE) {
                  case '1':
                    return (
                      <Col sm={6} xs={6} className="mb-2" key={index}>
                        <div className={active_cls} onClick={() => optionFun(data)}>
                          <LazyLoadImage effect="" src={data.SPS_IMAGE_PATH} className="img-fluid" alt={data.image_alt_seo} role="button" width="auto" height="auto" />
                          <p>{data.SPS_DESC} {data.SPS_MORE && <InfoLink {...data} />}</p>
                          {data.SPS_CODE == selected ?
                            <div className="selected-icon">
                              <LazyLoadImage effect="" src={`/assets/images/Customization/Group23632.png`} className="img-fluid" alt={data.image_alt_seo} width="auto" height="auto" />
                            </div>
                            :
                            ''}
                        </div>
                      </Col>)
                  case '2':
                    return (
                      <Col xs={12} sm={6} md={12} xl={6} className="mb-2" key={index}>
                        <Form.Check
                          inline
                          label={data.SPS_DESC}
                          name={`step_name-${data.SPS_SPS_SYS_ID}`}
                          type={`radio`}
                          id={`inline-${data.SPS_DESC}`}
                          checked={data.SPS_CODE == selected ? true : false}
                          onChange={() => optionFun(data)}
                        />
                        {data.SPS_MORE && <InfoLink className="px-2" {...data} />}
                      </Col>)
                  case '3':
                    return (
                      <Col sm={12} xs={6} xl={6} className="mb-2" key={index}>
                        <Form.Check type="radio" className="d-flex align-items-center py-2">
                          <Form.Check.Input type="radio" name={`step_name-${data.SPS_SPS_SYS_ID}`} className="flex-shrink-0" onClick={() => optionFun(data)} />
                          <Form.Check.Label>
                            <LazyLoadImage src={data.SPS_IMAGE_PATH} className="img-fluid w-25" alt={`data.image_alt_seo`} role="button" width="auto" height="auto" />
                          </Form.Check.Label>
                        </Form.Check>
                        <p className="img_desc">{data.SPS_DESC} {data.SPS_MORE && <InfoLink {...data} />}</p>
                      </Col>
                    );
                  case '4':
                    return (
                      <Col sm={12} xs={6} xl={6} className="mb-2" key={index}>
                        <Form.Group className="py-3">
                          {/* <Form.Label>Select Room</Form.Label> */}
                          <Form.Select as="select" onChange={itemLabelFun} size="lg" defaultValue={selected}>
                            {props.SUB_CHILD.map((data, index) => {
                              return (
                                <option value={index} key={index} selected={selected == index ? true : false}>{data.SPS_DESC}</option>
                              )
                            })}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="py-3">
                          <Form.Label>Description </Form.Label>
                          <Form.Control type="text" name="" id="" size="lg" onBlur={remarkDesc} />
                        </Form.Group>
                      </Col>
                    )
                  default:
                    return (
                      <Col sm={6} xs={6} className="mb-2" key={index} onClick={movetoNextdiv}>
                        <div className={active_cls + cls} >
                          <LazyLoadImage effect="" src={data.SPS_IMAGE_PATH} className="img-fluid" alt={data.image_alt_seo} role="button" onClick={() => optionFun(data)} width="auto" height="auto" />
                          <p>{data.SPS_DESC} {data.SPS_MORE && <InfoLink {...data} />}</p>
                          {data.SPS_CODE == selected ?
                            <div className="selected-icon">
                              <LazyLoadImage effect="" src={`/assets/images/Customization/Group23632.png`} className="img-fluid" alt={data.image_alt_seo} width="auto" height="auto" />
                            </div>
                            :
                            ''}
                        </div>
                        {min_width_validation ? <p className='text-danger' style={{ fontSize: '13px' }}>{t('min_width_validation', { min: data.SPS_MIN_WIDTH, unit: t('cm') })}</p> : ''}

                      </Col>)
                }
              })
              }
            </Row>
          </Col>
          <Col sm={12} ref={myRef} >
            {props.SUB_CHILD.map((data, index) => {
              if (data.SUB_CHILD && data.SUB_CHILD[0] && stepArray && data.SUB_CHILD[0].SPS_SPS_SYS_ID == stepArray.SPS_SYS_ID) {
                return (
                  <div key={index} >
                    <SubStepImport {...data} />
                  </div>
                )
              }
            })
            }
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default PanelOption;
