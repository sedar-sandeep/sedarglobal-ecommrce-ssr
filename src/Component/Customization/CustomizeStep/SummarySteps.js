import { useTranslation } from 'next-i18next';
import React, { useContext } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { CustomizationContext } from '../CustomizationProduct'
let steps_data = [];
let customization_steps = [];

const SummarySteps = (props) => {
  const { t } = useTranslation("common")
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);

  if (customize_state.steps) {
    customization_steps = customize_state.steps;
    steps_data = Object.keys(customization_steps);
  }
  let is_found = false;
  const editFun = (step_name) => {
    is_found = true;

    customize_state.all_step_list.filter((curElem, i) => {
      curElem.CHILD_STEP.filter((childElem) => {
        if (childElem.SS_CODE_NAME == step_name) {
          customizeDispatch({ type: 'PRESENT-STEP', value: i });
          is_found = false;
        } else if (childElem.SUB_CHILD && childElem.SUB_CHILD.length > 0 && is_found) {
          filteFun(childElem.SUB_CHILD, step_name, i)
        }
      })
    });
  }

  const filteFun = (data, step_name, index) => {

    if (is_found) {
      data.filter((childElem) => {
        if (childElem.SS_CODE_NAME == step_name) {
          customizeDispatch({ type: 'PRESENT-STEP', value: index });
          is_found = false;
        } else if (childElem.SUB_CHILD && childElem.SUB_CHILD.length > 0) {
          filteFun(childElem.SUB_CHILD, step_name, index);
        }
      });
    }
  }

  return (
    <div className="SummaryDelivery">
      <div className="step-heading headingcolor pt-2">
        <h5>{customize_state.product_info.SPI_DESC}</h5>
      </div>
      <div className="mountingoptions">
        <Row>
          <Col sm={12}>
            <Row>
              <Col sm={12} className="summarydetail">
                <Table className="table-borderless" >
                  <tbody>{steps_data.map((step_name, index) => {
                    if (step_name == 'Color') {
                      return false;
                    } else if (step_name == 'MATERIAL_SELECTION') {
                      return (
                        <tr key={step_name}>
                          <th>{t(customization_steps[step_name].SS_CODE_NAME)}</th>
                          <td>{customization_steps[step_name]['material_info']['SII_ITEM_ID']}
                            <span onClick={() => editFun(step_name)} className="edit"> {t('Edit')} </span>
                          </td>
                        </tr>
                      )
                    } else if (step_name == 'MEASUREMENT') {
                      return (
                        <tr key={step_name}>
                          <th>{t(customization_steps[step_name].SS_CODE_NAME)}</th>
                          <td>{t('summary_measurement', { width: customization_steps[step_name].m_width, height: customization_steps[step_name].m_height })}
                            <span onClick={() => editFun(step_name)} className="edit"> {t('Edit')} </span>
                          </td>
                        </tr>
                      )
                    } else if (step_name == 'GLASS_COLOR') {
                      return (
                        <tr key={step_name}>
                          <th>{t(customization_steps[step_name].SS_CODE_NAME)}</th>
                          <td>{customization_steps[step_name]['material_info']['SII_ITEM_ID']}
                            <span onClick={() => editFun(step_name)} className="edit"> {t('Edit')} </span>
                          </td>
                        </tr>
                      )
                    } else if (step_name == 'QUANTITY') {
                      return (
                        <tr key={step_name}>
                          <th>{t(customization_steps[step_name].SS_CODE_NAME)}</th>
                          <td>{customization_steps[step_name].QTY} {t('Qty')}
                            <span onClick={() => editFun(step_name)} className="edit"> {t('Edit')} </span>
                          </td>
                        </tr>
                      )
                    } else if (step_name == 'ITEM_LABEL') {
                      return (
                        <React.Fragment key={index}>
                          <tr key={step_name}>
                            <th>{t(customization_steps[step_name].SS_CODE_NAME)}</th>
                            <td>{customization_steps[step_name].SPS_DESC}
                              <span onClick={() => editFun(step_name)} className="edit"> {t('Edit')}</span>
                            </td>
                          </tr>
                          {customization_steps[step_name].REMARKS ?
                            <tr key={step_name}>
                              <th>{t(customization_steps[step_name].SS_CODE_NAME)}({t('Remark')})</th>
                              <td>{customization_steps[step_name].REMARKS ? customization_steps[step_name].REMARKS : '---'}
                                <span onClick={() => editFun(step_name)} className="edit"> {t('Edit')}</span>
                              </td>
                            </tr>
                            : null}
                        </React.Fragment>
                      )
                    } else {
                      return (
                        <tr key={step_name}>
                          <th>{t(customization_steps[step_name].SS_CODE_NAME)}</th>
                          <td>{customization_steps[step_name].SPS_DESC}
                            <span onClick={() => editFun(step_name)} className="edit"> {t('Edit')}</span>
                          </td>
                        </tr>
                      )
                    }
                  })
                  }
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

    </div>
  )
}

SummarySteps.propTypes = {};

SummarySteps.defaultProps = {};

export default SummarySteps;
