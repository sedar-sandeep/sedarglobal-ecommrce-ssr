import React from 'react';
import { Button, Row } from 'react-bootstrap';

// import './HomeAutomationProductPopup.scss';
import parse from 'html-react-parser';


const HomeAutomationProductPopup = ({ onHide, ...props }) => {

  if (props.data == undefined) {
    
    return false;
  }

  return (
    <div className="HomeAutomationProductPopup" {...props}>

      <div className="modal-container">
        <div className="modal-body">
          <div className="close-button">
            <Button onClick={onHide}>✕</Button>
          </div>
          <Row>
            <div className="image-section">
              <img src={props.data.image_path} alt="sedarglobal" width="auto" height="auto" />
            </div>
            <div className="content-section">
              <div className="content-box">
                <div className="content">
                  {props.data.description ? parse(props.data.description) : ''}
                </div>
              </div>

            </div>
          </Row>

        </div>
      </div>

    </div>
  )
}

HomeAutomationProductPopup.propTypes = {};

HomeAutomationProductPopup.defaultProps = {};

export default HomeAutomationProductPopup;
