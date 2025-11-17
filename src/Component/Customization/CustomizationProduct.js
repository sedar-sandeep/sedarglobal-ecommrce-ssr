import React, { useRef, useState, useLayoutEffect, createContext, useReducer } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { customizeReducer } from './Customize';
import Scene from "./Scene";
import CustomizationStep from "./CustomizationStepSection";
import { useTranslation } from 'next-i18next';
import { connect } from "react-redux";

export const CustomizationContext = createContext();


const CustomizationProduct = (props) => {
  const { t } = useTranslation("common");
  const ref = useRef(null)
  const [size, setSize] = useState([0, 0]);

  function updateSize() {
    setSize([window.innerWidth, window.innerHeight]);
  }
  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
  }, []);


  const initialState = {
    active_step: 0,
    steps: {},
    product_info: props.CHILD[2],
    object_load: false,
    total_steps: props.CHILD[1].length,
    all_step_list: props.CHILD[1],
    missing_step_validation: {},
    error_step_validation: {},
    filter_data: [],
    material_filter_data: [],
    edit_step_data: props.CHILD && props.CHILD[3] && props.CHILD[3]['info_result'] ? props.CHILD[3] : [],
    price_array: { SOL_VALUE: 0 },
    user_info: props.user_state && props.user_state.user_info ? props.user_state.user_info : [],
    modification_user_info:props.user_state && props.user_state.modification_user_info ? props.user_state.modification_user_info : [],
    search_item_code:'',
    t_lang: t


  };

  const [customize_state, customizeDispatch] = useReducer(customizeReducer, initialState);
  let key = customize_state.active_step;

  if (props.CHILD == undefined || props.CHILD[0] == undefined) {
    return <div style={{ textAlign: "center" }}>{props.CHILD.result}</div>;
  }

  return (
    <section className="CustomizationProduct" ref={ref}>
      <CustomizationContext.Provider value={{ customize_state, customizeDispatch }}>
        <Container className="maxwidth" fluid>
          <Row>
            <Col md={12} lg={7} className={`p-0 scenesection ` + 'scenesection' + key}>
              <div className="threeD-section">
                <div className="threeD-scene">
                  <Scene {...props.CHILD[0]} />

                </div>
                <div className="d-sm-none p-3 previewText">
                  <h4>{t("Preview")} </h4>
                  <p>Preview your selection below. You can click on any option to review or make changes. Once you have completed & confirmed your information, add the item to your cart.</p>
                </div>
              </div>
            </Col>
            <Col md={12} lg={5} className="p-0 stepsection position-relative">
              {customize_state.object_load ? <CustomizationStep {...props} maxHeight={size} /> : ''}
            </Col>
          </Row>
        </Container>
      </CustomizationContext.Provider>
    </section>
  );
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomizationProduct);