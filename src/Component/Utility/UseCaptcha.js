/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { loadCaptchaEnginge, loadCaptchaEnginge2, LoadCanvasTemplate, LoadCanvasTemplate2, validateCaptcha, validateCaptcha2 } from '../../services/react-simple-captcha/react-simple-captcha';
import { Form } from 'react-bootstrap';
// import { t_lang } from '../../services/i18n';
import { useTranslation } from 'next-i18next';
import AlertPopupCaptchaMatch from './AlertPopupCaptchaMatch';


// eslint-disable-next-line react/display-name
const UseCaptcha = forwardRef((props, ref) => {
  const { t } = useTranslation('common');
  const [captchaValue, setCaptchaValue] = useState();
  const [captchaValue2, setCaptchaValue2] = useState();
  const [validClass, setvalidClass] = useState("");
  const [validClass2, setvalidClass2] = useState("");
  const [modalShow, setModalShow] = useState(false);


  function loadCaptha() {
    props.captcha && props.captcha === "two" ? loadCaptchaEnginge2(6, 'white', 'black', 'upper') : loadCaptchaEnginge(6, 'white', 'black', 'upper');
  }

  useEffect(() => {
    loadCaptha();
  }, []);




  //let user_captcha_value = document.getElementById('user_captcha_input').value


  useImperativeHandle(ref, () => ({
    doSubmit() {
      if (captchaValue) {
        if (validateCaptcha(captchaValue)) {
          setvalidClass("")
        } else {
          setvalidClass("delivery_error")
          setModalShow(true)
        }
        return validateCaptcha(captchaValue);
      }


      // return validateCaptcha(captchaValue);
    },
    doSubmit2() {
      if (validateCaptcha2(captchaValue2)) {
        setvalidClass2("")
      } else {
        setvalidClass2("delivery_error")
        setModalShow(true)
      }
      return validateCaptcha2(captchaValue2);
      // return validateCaptcha(captchaValue);
    }
  }));


  return (
    <>
      <AlertPopupCaptchaMatch show={modalShow} onHide={() => setModalShow(false)} />
      {props.captcha && props.captcha === "two" ?
        <>
          <div>
            <div className="captcha_img">
              <LoadCanvasTemplate2
                reloadText={"<img  src='/assets/icon/111057_reload_arrow_icon.png' width='auto' height='auto'/>"}
                className="reload_ico"
              />
            </div>
          </div>
          <div className="col mt-3">
            <Form.Control
              type="text"
              placeholder={t("EnterCaptchaValue")}
              style={{ background: '#fff', height: '40px' }}
              className={`${validClass2} border-0 border-bottom border-dark rounded-0`}
              onChange={(e) => setCaptchaValue2(e.target.value)}
              required

            />
            <br />
          </div>
        </> :
        <>
          <div>
            <div className="captcha_img">
              <LoadCanvasTemplate
                reloadText={"<img  src='/assets/icon/111057_reload_arrow_icon.png' width='auto' height='auto' />"}
                className="reload_ico"
              />
            </div>
          </div>
          <div className="col mt-3">
            <Form.Control
              type="text"
              placeholder={t("EnterCaptchaValue")}
              style={{ background: '#fff', height: '40px' }}
              className={`${validClass} border-0 border-bottom border-dark rounded-0`}
              onChange={(e) => setCaptchaValue(e.target.value)}
              required

            />
            <br />
          </div>
        </>
      }




    </>
  )
}
)

export default UseCaptcha;
