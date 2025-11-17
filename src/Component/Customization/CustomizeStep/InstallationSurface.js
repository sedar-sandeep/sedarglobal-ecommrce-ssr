import React, { useState, useEffect, useContext } from 'react';

import { Col, Row, Form } from 'react-bootstrap';
import InfoPopup from "./InfoPopup";
import SubStepImport from '../SubStepImport';
import { CustomizationContext } from '../CustomizationProduct'
import { VscInfo } from 'react-icons/vsc';


const InfoLink = (props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <VscInfo size={12} role="button" onClick={() => setModalShow(true)} /> <InfoPopup show={modalShow} onHide={() => setModalShow(false)} {...props} />
    </>
  )
}
const InstallationSurface = (props) => {
  const [selected, setSelected] = useState();
  const [stepArray, setStepArray] = useState();
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);
  const edit_step = customize_state.edit_step_data;

  const optionFun = (val) => {
    setSelected(val.SPS_CODE);
    setStepArray(val);
    customizeDispatch(val);
  }

  useEffect(() => {
    let editcheck = true;
    props.SUB_CHILD.map((data) => {
      if (edit_step.info_result && edit_step.info_result.INSTALLATION_SURFACE && edit_step.info_result.INSTALLATION_SURFACE.SOI_SPS_CODE == data.SPS_CODE) {
        setTimeout(optionFun(data), 1500)
        editcheck = false;
      } else if (data.SPS_VALUE_DEFAULT == 'Y' && editcheck) {
        data.SPS_VALUE_DEFAULT == 'Y' ? setTimeout(optionFun(data), 1500) : '';
      }
    })
  }, []);


  if (props.SUB_CHILD == undefined) {
    
    return false;
  }

  return (
    <div className="SizeAndMount">
      <div className="step-heading">
        <h5>{props.SPS_DESC}
          &nbsp;{props.SPS_MORE && props.SPS_MORE.length > 5 && <InfoLink {...props} />}
        </h5>
      </div>
      <div className="InstallationSurface">
        <Row>
          <Col sm={12}>
            <Row>
              {props.SUB_CHILD.map((data, index) => {
                return (
                  <Col xs={12} sm={6} md={12} xl={6} className="mb-2 px-2" key={index}>
                    <Form.Check
                      inline
                      label={data.SPS_DESC}
                      name="surface"
                      type={`radio`}
                      id={`inline-${data.SPS_DESC}`}
                      checked={data.SPS_CODE == selected}
                      onChange={() => optionFun(data)}
                    />
                    {data.SPS_MORE && <InfoLink className="px-2" {...data} />}
                  </Col>)
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
  )
}

InstallationSurface.propTypes = {};

InstallationSurface.defaultProps = {};

export default InstallationSurface;
