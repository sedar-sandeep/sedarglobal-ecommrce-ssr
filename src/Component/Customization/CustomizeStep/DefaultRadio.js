import React, { useState, useEffect, useContext } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import { VscInfo } from 'react-icons/vsc';
import InfoPopup from "./InfoPopup";
import { addToCartFunScene } from '../Scene'
import SubStepImport from '../SubStepImport';
import { CustomizationContext } from '../CustomizationProduct';

const InfoLink = (props) => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <VscInfo size={12} role="button" onClick={() => setModalShow(true)} />
            <InfoPopup show={modalShow} onHide={() => setModalShow(false)} {...props} />
        </>
    )
}

const DefaultRadio = (props) => {
    let sm_length = (props.SUB_CHILD.length % 2) == 0 ? 6 : 6;
    const [selected, setSelected] = useState();
    const [stepArray, setStepArray] = useState();
    const { customize_state, customizeDispatch } = useContext(CustomizationContext);

    const edit_step = customize_state.edit_step_data;
    useEffect(() => {
        props.SUB_CHILD.map((data) => {
            data.SPS_VALUE_DEFAULT == 'Y' ? DefaultRadioFun(data) : '';
        })
    }, []);
    if (props.SUB_CHILD == undefined) {

        return false;
    }

    const DefaultRadioFun = (val) => {
        setSelected(val.SPS_CODE);
        setStepArray(val);
        customizeDispatch(val);
        setTimeout(
            function () {
                addToCartFunScene(customize_state, customizeDispatch);
            }
                .bind(this),
            200
        );
    }

    return (

        <div className={props.SS_CODE_NAME == 'RAIL_SYSTEM' ? 'ControlType d-none' : 'ControlType'} >
            <div className="step-heading">
                <h5>{props.SPS_DESC}
                    &nbsp;{props.SPS_MORE && props.SPS_MORE.length > 5 && <InfoLink {...props} />}
                </h5>
            </div>

            <div className="mountingoptions">
                <Row>
                    <Col sm={12}>
                        <Row>
                            {props.SUB_CHILD.map((data, index) => {

                                return (
                                    <Col xl={sm_length} lg={12} md={6} className="mb-2" key={index}>
                                        <Form.Check
                                            inline
                                            label={data.SPS_DESC}
                                            name={'name' + props.SS_CODE_NAME}
                                            type={`radio`}
                                            id={`inline-${data.SPS_DESC}`}
                                            checked={data.SPS_CODE == selected ? true : false}
                                            onChange={() => DefaultRadioFun(data)}
                                        />
                                        {data.SPS_MORE && <InfoLink className="px-2" {...data} />}
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
    );
}
DefaultRadio.propTypes = {};

DefaultRadio.defaultProps = {};

export default DefaultRadio;
