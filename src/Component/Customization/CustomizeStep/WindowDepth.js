import React, { useState, useEffect, useContext } from 'react';

import { Col, Row, Form } from 'react-bootstrap';
import InfoPopup from "./InfoPopup";
import { CustomizationContext } from '../CustomizationProduct'
import { VscInfo } from 'react-icons/vsc';
import { useTranslation } from 'next-i18next';

const InfoLink = (props) => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <VscInfo size={12} role="button" onClick={() => setModalShow(true)} /> <InfoPopup show={modalShow} onHide={() => setModalShow(false)} {...props} />
        </>
    )
}
const WindowDepth = (props) => {
    const { t } = useTranslation("common")
    const [stepArray, setStepArray] = useState();
    const { customize_state, customizeDispatch } = useContext(CustomizationContext);
    const edit_step = customize_state.edit_step_data;

    const optionFun = (val) => {
        props = { ...props, 'depth': val };
        //  setStepArray(val);
        customizeDispatch(props);
    }
    useEffect(() => {
        props.SUB_CHILD.map((data) => {
            if (edit_step.info_result && edit_step.info_result.WINDOW_DEPTH && edit_step.info_result.WINDOW_DEPTH.SOI_SPS_CODE == data.SPS_CODE) {
                setTimeout(optionFun(data), 1500)
            } else {
                data.SPS_VALUE_DEFAULT == 'Y' ? setTimeout(optionFun(data), 1500) : '';
            }
        })
    }, []);

    const [isvalid, setIivalid] = useState({});
    const [isvalidInput, setisvalidInput] = useState({});
    const toggleValidation = (name) => {
        let value = event.target.value;
        if (value != '' && value >= parseInt(props.SPS_MIN_WIDTH)) {
            setIivalid({ ...isvalid, [name]: false });
            setisvalidInput({ ...isvalid, [name]: false });
            optionFun(value);
        } else if (!/^[0-9\b]+$/.test(value)) {
            delete customize_state.steps.WINDOW_DEPTH;
            setisvalidInput({ ...isvalid, [name]: true });
        }
        else {
            delete customize_state.steps.WINDOW_DEPTH;
            setIivalid({ ...isvalid, [name]: true });
            setisvalidInput({ ...isvalid, [name]: false });
        }
        customizeDispatch({ type: 'ADD-TO-CART' });
    };

    return (
        <div className="WindowDepth" >
            <div className="step-heading">
                <h5>{props.SPS_DESC}
                    &nbsp;{props.SPS_MORE && props.SPS_MORE.length > 5 && <InfoLink {...props} />}
                </h5>
            </div>

            <Row>
                <Col sm={12}>
                    <Form.Group className="py-3">

                        <Form.Label>Description Min Depth (Min: {props.SPS_MIN_WIDTH}cm)</Form.Label>

                        <Form.Control
                            type="text"
                            name="depth"
                            id=""
                            onChange={() => { toggleValidation('depth') }}
                            size="lg"
                        />
                        {isvalid['depth']
                            ?
                            <Form.Label style={{ color: 'red' }}>
                                {`(Min ${props.SPS_MIN_WIDTH} cm)`}
                            </Form.Label> : ''
                        }
                        {isvalidInput['depth'] && !isvalid['depth'] ? <Form.Label style={{ color: 'red' }}>{t("Pleaseonlyenternumericcharacters")}</Form.Label> : ''}
                    </Form.Group>
                </Col>
                {/* <Col sm={12}>
                    {props.SUB_CHILD.map((data, index) => {
                        if (data.SUB_CHILD && data.SUB_CHILD[0] && stepArray && data.SUB_CHILD[0].SPS_SPS_SYS_ID == stepArray.SPS_SYS_ID) {
                            return (
                                <div key={index}>
                                    <SubStepImport {...data} />
                                </div>
                            )
                        }
                    })}
                </Col> */}

            </Row>
        </div>
    )
}

WindowDepth.propTypes = {};

WindowDepth.defaultProps = {};

export default WindowDepth;
