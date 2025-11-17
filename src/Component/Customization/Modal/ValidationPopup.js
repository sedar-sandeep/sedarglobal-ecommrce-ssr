import { useTranslation } from 'next-i18next';
import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { CustomizationContext } from '../CustomizationProduct';

function ValidationPopup(props) {
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);
  let validation_step = customize_state.error_step_validation;
  let validation_list = Object.keys(validation_step);
  const { t } = useTranslation("common");

  if (validation_list.length == 0) {
    return true;
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Body>
        <div className="removealert p-5">
          <div className="alerttext">
            <img className="img-fluid mb-3" src={`/assets/images/Customization/Groupn24646.png`} alt="sedarglobal" width="auto" height="auto" />
            <p>Oops… </p>

            {validation_list.map((e, i) => {
              let parent_step = validation_step[e]['parent_index'];
              return (
                <div className="error" key={i}>
                  <label htmlFor="error">{validation_step[e]['mgs']}  &nbsp;
                    <span onClick={() => customizeDispatch({ type: 'PRESENT-STEP', value: parent_step })} className="edit">{t("GotoStep")}  0{parent_step + 1}</span>
                  </label>
                </div>
              )

            })
            }

          </div>
          <div className="btngroup">
            <div className="action-btn">
              {/* <div className="color-button mt-4">
              <Link className="" to="#" onClick={props.onHide} ><span>Proceed to Checkout </span></Link>
            </div> */}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}



ValidationPopup.propTypes = {};

ValidationPopup.defaultProps = {};

export default ValidationPopup;
