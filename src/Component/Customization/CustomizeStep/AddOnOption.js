import React, { useState, useEffect, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { VscInfo } from 'react-icons/vsc';
import InfoPopup from "./InfoPopup";
import { CustomizationContext } from '../CustomizationProduct';
import SubStepImport from '../SubStepImport';

const InfoLink = (props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <VscInfo size={12} role="button" onClick={() => setModalShow(true)} />
      <InfoPopup show={modalShow} onHide={() => setModalShow(false)} {...props} />
    </>
  )
}

const AddOnOption = (props) => {
  const [selected, setSelected] = useState();
  const [stepArray, setStepArray] = useState();
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);
  const edit_step = customize_state.edit_step_data;

  const optonsFun = (val) => {
    setSelected(val.SPS_CODE);
    setStepArray(val);
    const without_subchild = Object.assign({}, val);
    delete without_subchild.SUB_CHILD;
    customizeDispatch(without_subchild);
  }

  useEffect(() => {
    props.SUB_CHILD.map((data) => {
      if (edit_step.info_result.CONTROL_TYPE && edit_step.info_result.CONTROL_TYPE.SOI_SPS_CODE == data.SPS_CODE) {
        setTimeout(optonsFun(data), 1500)
      } else {
        data.SPS_VALUE_DEFAULT == 'Y' ? setTimeout(optonsFun(data), 1500) : '';
      }
    })
  }, []);

  if (props.SUB_CHILD == undefined) {
    return false;
  }


  return (
    <div className="AddOnOption">
      <div className="step-heading">
        <h5>{props.SPS_DESC}</h5>
      </div>

      <div className="addonoptions SizeAndMount">
        <Row>
          <Col sm={12}>
            <Row>
              {props.SUB_CHILD.map((data, index) => {
                let active_cls = data.SPS_CODE == selected ? 'mountgrid active' : 'mountgrid';
                return (
                  <Col sm={6} key={index} xs={6} className="mb-2 px-2">
                    <div className={active_cls}>
                      <LazyLoadImage effect="" src={data.SPS_IMAGE_PATH} className="img-fluid" alt={data.image_alt_seo} role="button" onClick={() => optonsFun(data)} width="auto" height="auto" />
                      <p>{data.SPS_DESC} {data.SPS_MORE && <InfoLink {...data} />}</p>
                      {data.SPS_CODE == selected ?
                        <div className="selected-icon">
                          <LazyLoadImage effect="" src={`/assets/images/Customization/Group23632.png`} className="img-fluid" alt={data.image_alt_seo} width="auto" height="auto" />
                        </div>
                        :
                        ''}
                    </div>
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
  );
}

export default AddOnOption;
