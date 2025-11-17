import { useTranslation } from 'next-i18next';
import React, { } from 'react';
import { Modal } from 'react-bootstrap';;


function ErrorStepPopup(props) {
  const { t } = useTranslation("common");
  const { quickBy_state, quickByDispatch } = props;
  let error_step = quickBy_state.missing_step_validation;
  let error_list = Object.keys(error_step);


  if (error_list.length == 0) {
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
            <p>You Missed Steps</p>
            {error_list.map((e, i) => {
              let parent_step = error_step[e]['parent_index'];
              return (
                <div className="error" key={i}>
                  <label htmlFor="error">{t(e + '_ERROR')}  &nbsp;
                    <span onClick={() => quickByDispatch({ type: 'PRESENT-STEP', value: parent_step })} className="edit">{t("GotoStep")}  0{parent_step + 1}</span>
                  </label>
                </div>
              )
              // console.log(e, i);
            })
            }
            {/* <label htmlFor="error">Work remotely with Experts through a Go to Step 02</label> */}

          </div>
          <div className="btngroup">
            <div className="action-btn">
              {/* <div className="color-button mt-4">
              <Link className="" href="/" onClick={props.onHide} ><span>Proceed to Checkout </span></Link>
            </div> */}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}



ErrorStepPopup.propTypes = {};

ErrorStepPopup.defaultProps = {};

export default ErrorStepPopup;
