import React, { useState, useEffect, useContext } from 'react';

import { Col, Row, Form } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import InfoPopup from "./InfoPopup";
import SubStepImport from '../SubStepImport';
import { CustomizationContext } from '../CustomizationProduct'
import { VscInfo } from 'react-icons/vsc';
import { useTranslation } from 'next-i18next';
let img_path = '/' + "/assets/images/";

const InfoLink = (props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <VscInfo size={12} role="button" onClick={() => setModalShow(true)} /> <InfoPopup show={modalShow} onHide={() => setModalShow(false)} {...props} />
    </>
  )
}
const ItemLabel = (props) => {
  const { t } = useTranslation("common");
  const [selected, setSelected] = useState();
  const [stepArray, setStepArray] = useState();
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);

  const edit_step = customize_state.edit_step_data;

  const itemLabelFun = (index) => {
    let i = index.target ? index.target.value : index;
    let val = props.SUB_CHILD[i];
    setSelected(i);
    setStepArray(val);
    customizeDispatch(val);
  }
  const remarkDesc = (e) => {
    let val = e.target.value;
    customize_state.steps.ITEM_LABEL.REMARKS = val;
    customizeDispatch(val);
  }
  useEffect(() => {
    let editcheck = true;
    props.SUB_CHILD.map((data, index) => {
      // data.SPS_VALUE_DEFAULT == 'Y' ? itemLabelFun(index) : '';
      if (edit_step.info_result && edit_step.info_result.ITEM_LABEL && edit_step.info_result.ITEM_LABEL.SOI_SPS_CODE == data.SPS_CODE) {
        setTimeout(itemLabelFun(index), 1500)
        editcheck = false;
      } else if (editcheck && data.SPS_VALUE_DEFAULT == 'Y') {
        data.SPS_VALUE_DEFAULT == 'Y' ? setTimeout(itemLabelFun(index), 1500) : '';
      }

    })
  }, []);


  if (props.SUB_CHILD == undefined) {
    
    return false;
  }

  return (
    <div className="ItemLabel">
      <div className="step-heading">
        <h5>{props.SPS_DESC}</h5>
      </div>

      <Row>
        {(() => {

          switch (props.SPS_INPUT_TYPE) {
            case '1':
              return (
                <>
                  {/* <Form.Label>Select Room</Form.Label> */}
                  {props.SUB_CHILD.map((data, index) => {
                    let active_cls = index == selected ? 'mountgrid active' : 'mountgrid';
                    return (
                      <Col sm={4} md={4} lg={6} xl={4} xxl={3} xs={6} className="mb-2 SizeAndMount" key={index}>
                        <div className={active_cls} onClick={() => itemLabelFun(index)}>
                          <LazyLoadImage src={data.SPS_IMAGE_PATH ? data.SPS_IMAGE_PATH : img_path + 'noimage.jpg'} className="img-fluid" alt={data.image_alt_seo} role="button" width="auto" height="auto" />

                          {index == selected ?
                            <div className="selected-icon">
                              <LazyLoadImage src={`/assets/images/Customization/Group23632.png`} className="img-fluid" alt={data.image_alt_seo} width="auto" height="auto" />
                            </div>
                            :
                            ''}
                        </div>
                        <p className="bottomlabelptext py-2">{data.SPS_DESC}</p>
                      </Col>
                    )
                  })}

                  <Form.Group className="py-3">
                    <Form.Label> {t("Description")} </Form.Label>
                    <Form.Control as="textarea" type="text" name="" id="" size="lg" className="border border-1" onBlur={remarkDesc} rows={6} />
                  </Form.Group>
                </>
              )
            case '4':
              return (
                <Col sm={12}>
                  <Form.Group className="py-3">
                    <Form.Label>{t("SelectRoom")} </Form.Label>
                    <Form.Select as="select" onChange={itemLabelFun} size="lg" defaultValue={selected}>
                      {props.SUB_CHILD.map((data, index) => {
                        return (
                          <option value={index} key={index} selected={selected == index ? true : false}>{data.SPS_DESC}</option>
                        )
                      })}
                    </Form.Select>
                  </Form.Group>
                  {selected && selected == 8 ? (
                    <Form.Group className="py-3">
                      <Form.Label> {t("Description")} </Form.Label>
                      <Form.Control type="text" name="" id="" size="lg" onBlur={remarkDesc} />
                    </Form.Group>
                  ) : ('')}
                </Col>
              )
            default:
              return (
                <Col sm={12}>
                  <Form.Group className="py-3">
                    <Form.Label>{t("SelectRoom")}</Form.Label>
                    <Form.Select as="select" onChange={itemLabelFun} size="lg" value={selected}>
                      {props.SUB_CHILD.map((data, index) => {
                        return (
                          <option value={index} key={index}>{data.SPS_DESC}</option>
                        )
                      })}
                    </Form.Select>
                  </Form.Group>
                  {selected && selected == 8 ? (
                    <Form.Group className="py-3">
                      <Form.Label>{t("Description")} </Form.Label>
                      <Form.Control type="text" name="" id="" size="lg" onBlur={remarkDesc} />
                    </Form.Group>
                  ) : ('')}
                </Col>
              )
          }
        })()}

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
  )
}

ItemLabel.propTypes = {};

ItemLabel.defaultProps = {};

export default ItemLabel;
