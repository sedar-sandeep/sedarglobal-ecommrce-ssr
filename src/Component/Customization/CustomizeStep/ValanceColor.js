import React, { useState, useEffect, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import InfoPopup from "./MaterialInfoPopup";
import SubStepImport from '../SubStepImport';
import { CustomizationContext } from '../CustomizationProduct'
import { VscInfo } from 'react-icons/vsc';
import { valanceColorFun, addLights } from '../Scene';
let img_path = '/' + "/assets/images/";

const InfoLink = (props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <VscInfo size={12} role="button" onClick={() => setModalShow(true)} />
      <InfoPopup show={modalShow} onHide={() => setModalShow(false)} {...props} />
    </>
  )
}
const ValanceColor = (props) => {
  const [selected, setSelected] = useState();
  const [stepArray, setStepArray] = useState();
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);

  const optionFun = (val) => {
    props['material_info'] = val;
    setSelected(val.SII_CODE);
    setStepArray(val);
    valanceColorFun(val);
    val.light_info.length > 0 ? addLights(val.light_info, val.SIO_LIGHT_INTENSITY) : '';
    props['SUB_CHILD'] = '';
    customizeDispatch(props);
  }

  useEffect(() => {
    props.SUB_CHILD.map((data) => {
      data.SPS_VALUE_DEFAULT == 'Y' ? optionFun(data) : '';
    })
  }, []);


  if (props.SUB_CHILD == undefined || props.SUB_CHILD.return_status == 333) {
    
    return false;
  }

  return (
    <div className="SizeAndMount">
      <div className="step-heading">
        <h5>{props.SPS_DESC}</h5>
      </div>
      <div className="ValanceColor">
        <Row>
          <Col sm={12}>
            <Row>
              {props.SUB_CHILD.map((data, index) => {

                let active_cls = data.SII_CODE == selected ? 'mountgrid active' : 'mountgrid';
                return (
                  <Col sm={6} key={index} xs={6} className="mb-2">
                    <div className={active_cls}>
                      <LazyLoadImage src={data.SII_IMAGE_PATH_TABLET ? data.SII_IMAGE_PATH_TABLET : img_path + 'noimage.jpg'} className="img-fluid" alt={data.image_alt_seo} role="button" onClick={() => optionFun(data)} width="auto" height="auto" />
                      <p>{data.SPS_DESC} {data.SPS_MORE && <InfoLink {...data} />}</p>
                      {data.SII_CODE == selected ?
                        <div className="selected-icon">
                          <LazyLoadImage src={`/assets/images/Customization/Group23632.png`} className="img-fluid" alt={data.image_alt_seo} width="auto" height="auto" />
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

ValanceColor.propTypes = {};

ValanceColor.defaultProps = {};

export default ValanceColor;
