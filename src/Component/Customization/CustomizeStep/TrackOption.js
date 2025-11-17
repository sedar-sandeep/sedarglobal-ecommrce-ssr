import React, { useState, useEffect, useContext } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import InfoPopup from "./InfoPopup";
import { controlType, valanceType, glassColor, addToCartFunScene } from '../Scene'
import SubStepImport from '../SubStepImport';
import { CustomizationContext } from '../CustomizationProduct'
import { VscInfo } from 'react-icons/vsc';
import { useTranslation } from 'next-i18next';

const InfoLink = (props) => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <VscInfo size={12} role="button" onClick={() => setModalShow(true)} />
            <InfoPopup show={modalShow} onHide={() => setModalShow(false)} {...props} />
        </>
    )
}

const TrackOption = (props) => {
    const { t } = useTranslation("common");
    let sm_length = (props.SUB_CHILD.length % 2) == 0 ? 6 : 6;
    const [selected, setSelected] = useState();
    const [stepArray, setStepArray] = useState();
    const { customize_state, customizeDispatch } = useContext(CustomizationContext);
    const edit_step = customize_state.edit_step_data;

    const optionFun = (val) => {
        controlType(val.SPS_CODE);
        setSelected(val.SPS_CODE);
        setStepArray(val);
        customizeDispatch(val);
        if (['TO01', 'TO02', 'TO04'].indexOf(val.SPS_CODE) >= 0) {
            valanceType('VAL02');
            delete customize_state.steps.MOTOR_POSITION;
            delete customize_state.steps.TYPE_OF_MOTOR;
            delete customize_state.steps.TYPE_OF_REMOTE;
        } else {
            valanceType('VAL01');
            if (val.SUB_CHILD.length > 0 && val.SUB_CHILD[0].SS_DATA_SOURCE == 'MATL' && val.SUB_CHILD[0].SUB_CHILD && val.SUB_CHILD[0].SUB_CHILD[0]) {
                glassColor(val.SUB_CHILD[0].SUB_CHILD[0]);
            }
        }
        customizeDispatch({ type: 'ADD-TO-CART' });
        setTimeout(
            function () {
                addToCartFunScene(customize_state, customizeDispatch);
            }.bind(this)
            , 200);
    }

    useEffect(() => {
        let editcheck = true;
        props.SUB_CHILD.map((data) => {
            //   data.SPS_VALUE_DEFAULT == 'Y' ? optionFun(data) : '';
            if (edit_step.info_result && edit_step.info_result.TRACK_OPTION && edit_step.info_result.TRACK_OPTION.SOI_SPS_CODE == data.SPS_CODE) {
                setTimeout(optionFun(data), 1500)
                editcheck = false;
            } else if (editcheck && data.SPS_VALUE_DEFAULT == 'Y') {
                data.SPS_VALUE_DEFAULT == 'Y' ? setTimeout(optionFun(data), 1500) : '';
            }
        })
    }, []);

    if (props.SUB_CHILD == undefined) {

        return false;
    }

    return (
        <div className="ControlType">
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
                                let active_cls = data.SPS_CODE == selected ? 'mountgrid active' : 'mountgrid';
                                switch (props.SPS_INPUT_TYPE) {
                                    case '1':
                                        return (
                                            <Col sm={6} xs={6} className="mb-2" key={index}>
                                                <div className={active_cls} onClick={() => optionFun(data)}>
                                                    <LazyLoadImage src={data.SPS_IMAGE_PATH} className="img-fluid" alt={data.image_alt_seo} role="button" width="auto" height="auto" />
                                                    <p>{data.SPS_DESC} {data.SPS_MORE && <InfoLink {...data} />}</p>
                                                    {data.SPS_CODE == selected ?
                                                        <div className="selected-icon">
                                                            <LazyLoadImage effect="" src={`/assets/images/Customization/Group23632.png`} className="img-fluid" alt={data.image_alt_seo} width="auto" height="auto" />
                                                        </div>
                                                        :
                                                        ''}
                                                </div>
                                                {data.SPS_CODE == 'TO04' && customize_state.steps && customize_state.steps['TRACK_OPTION'] && customize_state.steps['TRACK_OPTION']['SPS_CODE'] == 'TO04' ? <p className='text-danger' style={{ fontSize: '12px' }}>{t('track_option_mgs')}</p> : ''}
                                            </Col>)
                                    case '2':
                                        return (
                                            <Col xs={12} sm={6} md={12} xl={6} className="mb-2" key={index}>
                                                <Form.Check
                                                    inline
                                                    label={data.SPS_DESC}
                                                    name={`step_name-${data.SPS_SPS_SYS_ID}`}
                                                    type={`radio`}
                                                    id={`inline-${data.SPS_DESC}`}
                                                    checked={data.SPS_CODE == selected ? true : false}
                                                    onChange={() => optionFun(data)}
                                                />
                                                {data.SPS_MORE && <InfoLink className="px-2" {...data} />}
                                                {data.SPS_CODE == 'TO04' && customize_state.steps && customize_state.steps['TRACK_OPTION'] && customize_state.steps['TRACK_OPTION']['SPS_CODE'] == 'TO04' ? <p className='text-danger' style={{ fontSize: '12px' }}>{t('track_option_mgs')}</p> : ''}
                                            </Col>)
                                    case '3':
                                        return (
                                            <Col sm={12} xs={12} xl={6} className="mb-2" key={index}>
                                                <Form.Check type="radio" className="d-flex align-items-center py-2" >
                                                    <Form.Check.Input type="radio" name={`step_name-${data.SPS_SPS_SYS_ID}`} className="flex-shrink-0" checked={data.SPS_CODE == selected ? true : false} onClick={() => optionFun(data)} />
                                                    <Form.Check.Label>
                                                        <LazyLoadImage src={data.SPS_IMAGE_PATH} className="img-fluid w-25" alt={`data.SPS_DESC`} role="button" width="auto" height="auto" />
                                                    </Form.Check.Label>
                                                </Form.Check>
                                                <p className="img_desc">{data.SPS_DESC} {data.SPS_MORE && <InfoLink {...data} />}</p>
                                                {data.SPS_CODE == 'TO04' && customize_state.steps && customize_state.steps['TRACK_OPTION'] && customize_state.steps['TRACK_OPTION']['SPS_CODE'] == 'TO04' ? <p className='text-danger' style={{ fontSize: '12px' }}>{t('track_option_mgs')}</p> : ''}
                                            </Col>
                                        );
                                    default:
                                        return (
                                            <Col xl={sm_length} lg={12} md={6} className="mb-2" key={index}>
                                                <Form.Check
                                                    inline
                                                    label={data.SPS_DESC}
                                                    name={'name' + props.SS_CODE_NAME}
                                                    type={`radio`}
                                                    id={`inline-${data.SPS_DESC}`}
                                                    checked={data.SPS_CODE == selected ? true : false}
                                                    onChange={() => optionFun(data)}
                                                    className="me-1"
                                                />
                                                {data.SPS_MORE && <InfoLink className="px-2" {...data} />}
                                                {data.SPS_CODE == 'TO04' && customize_state.steps && customize_state.steps['TRACK_OPTION'] && customize_state.steps['TRACK_OPTION']['SPS_CODE'] == 'TO04' ? <p className='text-danger' style={{ fontSize: '12px' }}>{t('track_option_mgs', { desc: t('track') })}</p> : ''}
                                            </Col>)
                                }

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

                    {/* <Col sm={12}>
                        {props.SUB_CHILD.map((data) => {
                            return (
                                data.SUB_CHILD.map((sub_data, index) => {
                                    if (stepArray && sub_data.SPS_SPS_SYS_ID == stepArray.SPS_SYS_ID) {
                                        return (
                                            <div key={index}>
                                                <SubStepImport {...data} />
                                            </div>
                                        )
                                    }

                                })
                            )
                        })
                        }
                    </Col> */}
                </Row>
            </div>
        </div>
    );
}
TrackOption.propTypes = {};

TrackOption.defaultProps = {};

export default TrackOption;
