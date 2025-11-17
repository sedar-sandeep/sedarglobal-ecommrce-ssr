import React, { useState, useEffect, useContext } from 'react';

import { Col, Row } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
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
const MaterialSurface = (props) => {


  const [selected, setSelected] = useState();
  const [stepArray, setStepArray] = useState();
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);
  const edit_step = customize_state.edit_step_data;

  const materialSurfaceFun = (val) => {
    setSelected(val.SPS_CODE);
    setStepArray(val);
    customizeDispatch(val);
  }

  useEffect(() => {
    /*props.SUB_CHILD.map((data) => {
      data.SPS_VALUE_DEFAULT == 'Y' ?  setTimeout(materialSurfaceFun(data),2500) : '';
    })*/


    if (props.SUB_CHILD == undefined || props.SUB_CHILD.length == 0) {
      
      return false;
    }

    let editcheck = true;
    props.SUB_CHILD.map((data) => {
      if (edit_step.info_result && edit_step.info_result.MATERIAL_SURFACE && edit_step.info_result.MATERIAL_SURFACE.SOI_SPS_CODE == data.SPS_CODE) {
        setTimeout(materialSurfaceFun(data), 1500)
        editcheck = false;
      } else if (data.SPS_VALUE_DEFAULT == 'Y' && editcheck) {
        data.SPS_VALUE_DEFAULT == 'Y' ? setTimeout(materialSurfaceFun(data), 1500) : '';
      }
    })
  }, []);

  return (
    <div className="SizeAndMount">
      <div className="step-heading">
        <h5>{props.SPS_DESC}</h5>
      </div>
      <div className="MaterialSurface ddd">
        <Row>
          <Col sm={12}>
            <Row>

              {props.SUB_CHILD.map((data, index) => {
                let active_cls = data.SPS_CODE == selected ? 'mountgrid active' : 'mountgrid';
                return (
                  <Col xs={6} sm={4} className="mb-2 px-2" key={index}>
                    <div className={active_cls}>
                      <LazyLoadImage effect="" src={data.SPS_IMAGE_PATH} className="img-fluid" alt={data.image_alt_seo} role="button" onClick={() => materialSurfaceFun(data)} width="auto" height="auto" />
                      <p className="py-2">{data.SPS_DESC} {data.SPS_MORE && <InfoLink className="px-1" {...data} />}</p>
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
  )
}

MaterialSurface.propTypes = {};

MaterialSurface.defaultProps = {};

export default MaterialSurface;
