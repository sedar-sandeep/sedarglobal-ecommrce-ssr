import React, { useState, useEffect, useContext, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { VscInfo } from 'react-icons/vsc';
import InfoPopup from "./InfoPopup";
import { borderSection, addToCartFunScene } from '../Scene';
import SubStepImport from '../SubStepImport';
import { CustomizationContext } from '../CustomizationProduct'

const InfoLink = (props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <VscInfo size={12} role="button" onClick={() => setModalShow(true)} /><InfoPopup show={modalShow} onHide={() => setModalShow(false)} {...props} />
    </>
  )
}
const BorderOption = (props) => {

  const [selected, setSelected] = useState();
  const [stepArray, setStepArray] = useState();
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);
  const edit_step = customize_state.edit_step_data;
  useEffect(() => {
    let editcheck = true;
    props.SUB_CHILD.map((data) => {
      if (edit_step.info_result && edit_step.info_result.BORDER_OPTION && edit_step.info_result.BORDER_OPTION.SOI_SPS_CODE == data.SPS_CODE) {
        setTimeout(optionFun(data), 1500)
        editcheck = false;
      } else if (data.SPS_VALUE_DEFAULT == 'Y' && editcheck) {
        data.SPS_VALUE_DEFAULT == 'Y' ? setTimeout(optionFun(data), 1500) : '';
      }
    })
  }, []);
  const myRef = useRef(null)

  if (props.SUB_CHILD == undefined) {
    return false;
  }
  const optionFun = (val) => {
    borderSection(val.SPS_CODE);
    setSelected(val.SPS_CODE);
    setStepArray(val);
    customizeDispatch(val);
    if (val.SPS_CODE === 'BOR02') {
      delete customize_state.steps.BORDER_COLOR;
    }
    customizeDispatch({ type: 'ADD-TO-CART' });
    setTimeout(
      function () {
        addToCartFunScene(customize_state, customizeDispatch);
      }
        .bind(this),
      500
    );
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

      <div className="BorderOption">
        <Row>
          <Col sm={12}>
            <Row>
              {props.SUB_CHILD.map((data, index) => {
                let active_cls = data.SPS_CODE == selected ? 'mountgrid active' : 'mountgrid';
                return (
                  <Col sm={6} xs={6} className="mb-2 px-1" key={index} onClick={movetoNextdiv}>
                    <div className={active_cls} >
                      <LazyLoadImage effect="" src={data.SPS_IMAGE_PATH} className="img-fluid" alt={data.image_alt_seo} role="button" onClick={() => optionFun(data)} width="auto" height="auto" />
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

          <Col sm={12} ref={myRef} >
            {props.SUB_CHILD.map((data, index) => {
              if (data.SUB_CHILD && data.SUB_CHILD[0] && stepArray && data.SUB_CHILD[0].SPS_SPS_SYS_ID == stepArray.SPS_SYS_ID) {
                return (
                  <div key={data.SUB_CHILD[0].SPS_SS_CODE}>
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

BorderOption.propTypes = {};

BorderOption.defaultProps = {};

export default BorderOption;
