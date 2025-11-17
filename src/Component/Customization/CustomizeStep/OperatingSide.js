import React, { useState, useEffect, useContext } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import InfoPopup from "./InfoPopup";
import { manualControl } from '../Scene'
import SubStepImport from '../SubStepImport';
import { CustomizationContext } from '../CustomizationProduct'
import { VscInfo } from 'react-icons/vsc';

const InfoLink = (props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <VscInfo size={12} role="button" onClick={() => setModalShow(true)} /><InfoPopup show={modalShow} onHide={() => setModalShow(false)} {...props} />
    </>
  )
}

const OperatingSide = (props) => {
  const [selected, setSelected] = useState();
  const [stepArray, setStepArray] = useState();
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);
  const edit_step = customize_state.edit_step_data;

  const OperatingFun = (val) => {
    manualControl(val.SPS_CODE);
    setSelected(val.SPS_CODE);
    setStepArray(val);
    customizeDispatch(val);
  }

  useEffect(() => {
    let editcheck = true;
    props.SUB_CHILD.map((data) => {
      // data.SPS_VALUE_DEFAULT == 'Y' ? setTimeout(OperatingFun(data), 1500) : '';
      if (edit_step.info_result && edit_step.info_result.OPERATING_SIDE && edit_step.info_result.OPERATING_SIDE.SOI_SPS_CODE == data.SPS_CODE) {
        setTimeout(OperatingFun(data), 1500)
        editcheck = false;
      } else if (data.SPS_VALUE_DEFAULT == 'Y' && editcheck) {
        data.SPS_VALUE_DEFAULT == 'Y' ? setTimeout(OperatingFun(data), 1500) : '';
      }
    })
  }, []);

  if (props.SUB_CHILD == undefined) {
    
    return false;
  }

  return (
    <div className="ControlType">
      <div className="step-heading">
        <h5>{props.SPS_DESC}
          &nbsp;{props.SPS_MORE && props.SPS_MORE.length > 5 && <InfoLink {...props} />}
        </h5>
      </div>

      <div className="mountingoptions">
        <Row>
          <Col sm={12}>
            <Row>
              {props.SUB_CHILD.map((data, index) => {
                let active_cls = data.SPS_CODE == selected ? 'mountgrid active' : 'mountgrid';
                switch (props.SPS_INPUT_TYPE) {
                  case '1':
                    return (
                      <Col sm={6} xs={6} className="mb-2" key={index}>
                        <div className={active_cls} onClick={() => OperatingFun(data)}>
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
                          onChange={() => OperatingFun(data)}
                        />
                        {data.SPS_MORE && <InfoLink className="px-2" {...data} />}
                      </Col>)
                  case '3':
                    return (
                      <Col sm={12} xs={6} xl={6} className="mb-2" key={index}>
                        <Form.Check type="radio" className="d-flex align-items-center py-2">
                          <Form.Check.Input type="radio" name={`step_name-${data.SPS_SPS_SYS_ID}`} className="flex-shrink-0" onClick={() => OperatingFun(data)} />
                          <Form.Check.Label>
                            <LazyLoadImage src={data.SPS_IMAGE_PATH} className="img-fluid w-25" alt={`data.SPS_DESC`} role="button" width="auto" height="auto" />
                          </Form.Check.Label>
                        </Form.Check>
                        <p className="img_desc">{data.SPS_DESC} {data.SPS_MORE && <InfoLink {...data} />}</p>
                      </Col>
                    );
                  default:
                    return (
                      <Col xs={12} sm={6} md={12} xl={6} className="mb-2" key={index}>
                        <Form.Check
                          inline
                          label={data.SPS_DESC}
                          name={`step_name-${data.SPS_SPS_SYS_ID}`}
                          type={`radio`}
                          id={`inline-${data.SPS_DESC}`}
                          checked={data.SPS_CODE == selected ? true : false}
                          onChange={() => OperatingFun(data)}
                        />
                        {data.SPS_MORE && <InfoLink className="px-2" {...data} />}
                      </Col>)
                }

              })
              }
            </Row>
          </Col>
          <Col sm={12}>
            {props.SUB_CHILD.map((data, index) => {
              if (data.SUB_CHILD && data.SUB_CHILD[0] && stepArray && data.SUB_CHILD[0].SPS_SPS_SYS_ID == stepArray.SPS_SYS_ID) {
                return (
                  <div key={index}>
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
  );
}
OperatingSide.propTypes = {};

OperatingSide.defaultProps = {};

export default OperatingSide;
