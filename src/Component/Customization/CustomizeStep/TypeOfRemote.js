import React, { useState, useEffect, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MaterialInfoPopup from "./MaterialInfoPopup";
import SubStepImport from '../SubStepImport';
import { CustomizationContext } from '../CustomizationProduct'
import { VscInfo } from 'react-icons/vsc';
import { addToCartFunScene } from '../Scene';
let img_path = '/' + "/assets/images/";


const InfoLink = (props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <VscInfo size={12} role="button" onClick={() => setModalShow(true)} />
      <MaterialInfoPopup show={modalShow} onHide={() => setModalShow(false)} {...props} />
    </>
  )
}
const TypeOfRemote = (props) => {
  const [selected, setSelected] = useState();
  const [stepArray, setStepArray] = useState();
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);

  const edit_step = customize_state.edit_step_data;

  const remoteFun = (val) => {
    props['material_info'] = val;
    setSelected(val.SII_CODE);
    setStepArray(val);

    props['SUB_CHILD'] = '';
    props['material_info']['light_info'] = '';
    props['material_info']['material_family'] = '';

    customizeDispatch(props);
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
    props.SUB_CHILD && props.SUB_CHILD.length && props.SUB_CHILD.map((data, index) => {
      if (edit_step.info_result && edit_step.info_result.TYPE_OF_REMOTE && edit_step.info_result.TYPE_OF_REMOTE.SOI_ITEM_CODE == data.SII_CODE) {
        setTimeout(remoteFun(data), 1500);
        editcheck = false;
      } else if (props.SPS_UOM == data.SII_CODE && editcheck) {
        remoteFun(data);
      }
    })
  }, []);

  if (props.SUB_CHILD == undefined || props.SUB_CHILD.return_status == 333) {

    return false;
  }

  return (
    <div className="SizeAndMount">
      <div className="step-heading">
        <h5>{props.SPS_DESC}
          &nbsp;{props.SPS_MORE && props.SPS_MORE.length > 5 && <InfoLink {...props} />}
        </h5>
      </div>
      <div className="TypeOfRemote">
        <Row>
          <Col sm={12}>
            <Row>
              {props.SUB_CHILD.map((data, index) => {

                let active_cls = data.SII_CODE == selected ? 'mountgrid active' : 'mountgrid';
                return (
                  <Col sm={6} key={index} xs={6} className="mb-2">
                    <div className={active_cls} onClick={() => remoteFun(data)} >
                      <LazyLoadImage src={data.SII_THUMBNAIL_IMAGES ? data.IMAGE_PATH + '../' + data.SII_THUMBNAIL_IMAGES : img_path + 'noimage.jpg'} className="img-fluid" alt={data.image_alt_seo} role="button" width="auto" height="auto" />
                      <p>{data.SII_DESC} <InfoLink {...data} /></p>
                      {data.SII_CODE == selected ?
                        <div className="selected-icon">
                          <LazyLoadImage src={`/assets/images/Customization/Group23632.png`} className="img-fluid" alt={data.SII_DESC} width="auto" height="auto" />
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

TypeOfRemote.propTypes = {};

TypeOfRemote.defaultProps = {};

export default TypeOfRemote;
