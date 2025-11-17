import React, { useState, useEffect, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import InfoPopup from "./InfoPopup";
import { CustomizationContext } from '../CustomizationProduct'
import { addToCartFunScene } from '../Scene'


const InfoLink = (props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <LazyLoadImage effect="" role="button" onClick={() => setModalShow(true)} src={`/assets/images/Customization/info.png`} className={`img-fluid ` + props.className} alt="sedarglobal" width="auto" height="auto" />
      <InfoPopup show={modalShow} onHide={() => setModalShow(false)} {...props} />
    </>
  )
}
const LiningOption = (props) => {

  const [selected, setSelected] = useState();
  const [stepArray, setStepArray] = useState();
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);

  const edit_step = customize_state.edit_step_data;

  let sfi_light_filtering_app_yn = customize_state.steps && customize_state.steps.MATERIAL_SELECTION && customize_state.steps.MATERIAL_SELECTION.material_info ? customize_state.steps.MATERIAL_SELECTION.material_info.SFI_LIGHT_FILTERING_APP_YN : false;
  let sfi_blackout_lining_app_yn = customize_state.steps && customize_state.steps.MATERIAL_SELECTION && customize_state.steps.MATERIAL_SELECTION.material_info ? customize_state.steps.MATERIAL_SELECTION.material_info.SFI_BLACKOUT_LINING_APP_YN : false;


  const optionFun = (val) => {
    setSelected(val.SPS_CODE);
    setStepArray(val);
    customizeDispatch(val);

    setTimeout(
      function () {
        addToCartFunScene(customize_state, customizeDispatch);
      }
        .bind(this), 500);

  }

  useEffect(() => {
    let editcheck = true;
    props.SUB_CHILD.map((data) => {
      //data.SPS_VALUE_DEFAULT == 'Y' ?  setTimeout(optionFun(data),2500) : '';
      if (edit_step.info_result && edit_step.info_result.LINING_OPTION && edit_step.info_result.LINING_OPTION.SOI_SPS_CODE == data.SPS_CODE) {
        setTimeout(optionFun(data), 1500)
        editcheck = false;
      } else if (data.SPS_VALUE_DEFAULT == 'Y' && editcheck) {
        data.SPS_VALUE_DEFAULT == 'Y' ? setTimeout(optionFun(data), 1500) : '';
      }
    })
  }, [sfi_blackout_lining_app_yn, sfi_light_filtering_app_yn,]);

  if (props.SUB_CHILD == undefined || props.SUB_CHILD.length == 0) {
    
    return false;
  }

  return (
    <div className="SizeAndMount">
      <div className="step-heading">
        <h5>{props.SPS_DESC}
          &nbsp;{props.SPS_MORE && props.SPS_MORE.length > 5 && <InfoLink {...props} />}
        </h5>
      </div>
      <div className="LiningOption">
        <Row>
          <Col sm={12}>
            <Row>

              {props.SUB_CHILD.map((data, index) => {
                let active_cls = data.SPS_CODE == selected ? 'mountgrid active' : 'mountgrid';
                if (data.SPS_CODE == 'LO01' && sfi_blackout_lining_app_yn == 'N') {
                  return (
                    <Col sm={4} xs={6} className="mb-2 px-2 notallowed" key={index} >
                      <div className={active_cls} >
                        <LazyLoadImage effect="" src={data.SPS_IMAGE_PATH} className="img-fluid notallowed" alt={data.image_alt_seo} role="button" width="auto" height="auto" />
                        <p className="py-2">{data.SPS_DESC} {data.SPS_MORE && <InfoLink className="px-1" {...data} />}</p>
                        {data.SPS_CODE == selected ?
                          <div className="selected-icon">
                            <LazyLoadImage effect="" src={`/assets/images/Customization/Group23632.png`} className="img-fluid" alt={data.image_alt_seo} width="auto" height="auto" />
                          </div>
                          :
                          ''}
                      </div>
                    </Col>)
                } else if (data.SPS_CODE == 'LO02' && sfi_light_filtering_app_yn == 'N') {

                  return (
                    <Col sm={4} xs={6} className="mb-2 px-2 notallowed" key={index}>
                      <div className={active_cls}>
                        <LazyLoadImage effect="" src={data.SPS_IMAGE_PATH} className="img-fluid notallowed" alt={data.image_alt_seo} role="button" width="auto" height="auto" />
                        <p className="py-2">{data.SPS_DESC} {data.SPS_MORE && <InfoLink className="px-1" {...data} />}</p>
                        {data.SPS_CODE == selected ?
                          <div className="selected-icon">
                            <LazyLoadImage effect="" src={`/assets/images/Customization/Group23632.png`} className="img-fluid" alt={data.image_alt_seo} width="auto" height="auto" />
                          </div>
                          :
                          ''}
                      </div>
                    </Col>)
                } else {
                  return (
                    <Col sm={4} xs={6} className="mb-2 px-2" key={index}>
                      <div className={active_cls}>
                        <LazyLoadImage effect="" src={data.SPS_IMAGE_PATH} className="img-fluid" alt={data.image_alt_seo} role="button" onClick={() => optionFun(data)} width="auto" height="auto" />
                        <p className="py-2">{data.SPS_DESC} {data.SPS_MORE && <InfoLink className="px-1" {...data} />}</p>
                        {data.SPS_CODE == selected ?
                          <div className="selected-icon">
                            <LazyLoadImage effect="" src={`/assets/images/Customization/Group23632.png`} className="img-fluid" alt={data.image_alt_seo} width="auto" height="auto" />
                          </div>
                          :
                          ''}
                      </div>
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
                    {/* <SubStepImport {...data} /> */}
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

LiningOption.propTypes = {};

LiningOption.defaultProps = {};

export default LiningOption;
