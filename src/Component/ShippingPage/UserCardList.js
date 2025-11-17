import React, { useState, useEffect, Suspense } from "react";

import { Col, Form, Row, Button, FloatingLabel } from 'react-bootstrap';
import ApiDataService from '../../services/ApiDataService';
import { connect } from "react-redux";
import { useTranslation } from 'next-i18next'

const UserCardList = (props) => {
    const { t } = useTranslation('common');
    const [errorMgs, setErrorMgs] = useState();
    const [variant, setVariant] = useState('danger');


    let user_info = props.user_state ? props.user_state.user_info : null;
    
    let auth_token = props.user_state ? props.user_state.auth_token : '';
    let user_id = props.user_state ? props.user_state.user_id : 0;
    let user_email = props.user_state ? props.user_state.user_email : '';

    // if (user_info == null || auth_token == null || auth_token.length == null) {
    //     return <Redirect to={`/${defaultLocale}`} />;
    // }

    const cardListFun = () => {
        let post_data = { "cust_user_id": user_info.cust_email_id, "auth_token": auth_token, "active_yn": 'Y' }
        ApiDataService.getAll('dashboard/customerCard', post_data).then(response => {
            let res_data = response.data;
            if (res_data.return_status == 0 && res_data.error_message == 'Success') {
                props.setSaveCardList(res_data.result);
            } else {
                //console.log(res_data.error_message, 'Error...');
            }
        }).catch(e => {
            console.log(e, 'res_data...', e.return_status);
            setErrorMgs(e.message);
            setVariant('danger');
        });
    }

    const saveCVVFun = (val) => {
        props.setSelectCardInfo({ ...props.selectCardInfo, CVV_NUMBER: val });
    }

    useEffect(() => {
        cardListFun();
    }, []);

    return (
        <div className="select-card-list">

            {props.saveCardList && props.saveCardList.length > 0 && props.saveCardList.map((data, index) => {
                return (
                    <div key={index}>
                        <div className={`d-flex align-items-center m-2 border border-1 p-2 p-sm-3 rounded-2 ${props.selectCardInfo.SCC_SYS_ID == data.SCC_SYS_ID ? "active" : ''}`} onClick={() => { props.setSelectCardInfo(data) }}>
                            <div className="flex-shrink-0">
                                <input name="saveCard" className="radio" type="radio" checked={props.selectCardInfo.SCC_SYS_ID == data.SCC_SYS_ID ? 'checked' : ''} onChange={() => { props.setSelectCardInfo(data) }} />
                            </div>

                            <label htmlFor={`selectcard-${index}`} className="flex-grow-1 ms-3">
                                <div className="bankname  mb-2">
                                    <p>
                                        {data.SCC_BANK_NAME ? data.SCC_BANK_NAME : t('no_bank')} {data.SCC_CARD_TYPE} {t('ending_in')} {data.SCC_CARD_NUMBER.slice(-4)}
                                    </p>
                                </div>
                                <Row>
                                    <Col xs={12} md={4} className="bankname  mb-2">
                                        <h6>{data.SCC_CARD_HOLDER}</h6>
                                    </Col>
                                    <Col className="bankname  mb-2">
                                        <div className="cardname">
                                            <p>{data.SCC_EXP_MONTH}/{data.SCC_EXP_YEAR}</p>
                                        </div>
                                    </Col>
                                    {props.selectCardInfo.SCC_SYS_ID == data.SCC_SYS_ID ?
                                        // <Col className="cvv_number">
                                        //     <input className="form-control border border-1 bg-white" type="text" name="cvv_number" />
                                        // </Col>

                                        <Col lg={4} md={5} xs={6} >
                                            <div className="cvv-number" >
                                                <label for="formFile" className="form-label">{t('Card_CVV')}</label>
                                                {/* <FloatingLabel
                                                controlId=""
                                                label=
                                                className="my-2 my-xl-2 cvv-number"
                                            > */}
                                                <Form.Control
                                                    type="text"
                                                    className="form-control border border-1 bg-white   rounded-2"
                                                    placeholder={t('Card_CVV')}
                                                    name="card_security_code"
                                                    maxLength="3"
                                                    value={data.CVV_NUMBER}
                                                    autoComplete="off"
                                                    onChange={(e) => { saveCVVFun(e.target.value) }}
                                                />
                                                {/* </FloatingLabel> */}
                                            </div>
                                        </Col>
                                        : ''}
                                </Row>

                            </label>
                        </div>

                    </div>
                )
            })
            }
        </div>
    );
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer });
const mapDispatchToProps = (dispatch) => {
    return {
        user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserCardList);

