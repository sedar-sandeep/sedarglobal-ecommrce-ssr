import React, { useContext, useState, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import { Nav, Tab, Row, Col, Button } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import StepImport from './StepImport';
import { CustomizationContext } from './CustomizationProduct';
import ErrorStepPopup from "./Modal/ErrorStepPopup";
import SuccessStepPopup from "./Modal/SuccessStepPopup";
import ValidationPopup from "./Modal/ValidationPopup";
//import { fetchItems, addToCart, removeFromCart, increment, decrement } from 'src/Redux-Config/Actions';
import { addToCartFunScene } from './Scene';
import CurrencyFormat from '../../services/CurrencyFormat';
import GoogleAnalytics from '../../services/GoogleAnalytics';
import SnapPixel from '../../services/SnapPixel';

import LinkComponent from '@components/Link';
import { IoChevronBack } from 'react-icons/io5';
import parse from 'html-react-parser';
import { useTranslation } from 'next-i18next';
import { siteDetail } from '@utils/i18n';
import { useRouter } from 'next/router';
import { isMobile } from "react-device-detect";
const site = siteDetail;
let decimalPoints = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_decimals >= 0 ? parseInt(JSON.parse(site).show_decimals) : 0;
let currency = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_ccy_code ? JSON.parse(site).show_ccy_code : '';


const StepCouner = (Props) => {
  const { t } = useTranslation("common");
  return (
    <div className="stepintro d-none d-sm-block">
      <Row>
        <Col sm={6}>
          <div className="stepnumber">
            <h3>{t("Step")} {Props.active} <span>| {Props.total}</span></h3>
          </div>
        </Col>
        <Col sm={6}>
          <div className="stepname">
            <h3>{Props.name} </h3>
          </div>
        </Col>
      </Row>
    </div>
  )
}


const CustomizationStepSection = (props) => {
  const { t } = useTranslation("common");
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);
  const totalSteps = customize_state.total_steps;
  let key = customize_state.active_step;
  const edit_step = customize_state.edit_step_data;
  //let cart_status = edit_step.line_result && edit_step.line_result.SOL_CART_STATUS == 'COMPLETED' ? 'COMPLETED' : 'INCOMPLETE';
  let cart_status = edit_step.line_result && edit_step.line_result.SOL_CART_STATUS && ['COMPLETED', 'MODIFICATION'].indexOf(edit_step.line_result.SOL_CART_STATUS) >= 0 ? edit_step.line_result.SOL_CART_STATUS : 'INCOMPLETE';
  const handleSelect = (val) => {
    customizeDispatch({ type: 'PRESENT-STEP', value: val });
    cartAddUpdate(cart_status);
  }
  let history = useRouter();
  let { slug } = history.query;


  const myRef = useRef(null);

  const [size, setSize] = useState([0, 0]);
  const [errorModal, setErrorModal] = useState();
  const [validationModal, setValidationModal] = useState();

  const [successModal, setSuccessModal] = useState();
  const [bottompadding, setBottompadding] = useState(0);
  let m_width = customize_state.product_info.m_width ? parseInt(customize_state.product_info.m_width) : 0;
  let m_height = customize_state.product_info.m_height ? parseInt(customize_state.product_info.m_height) : 0;
  let restrict_to_material_width_yn = customize_state.product_info.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN ? customize_state.product_info.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN : 'N';
  let restrict_to_material_height_yn = customize_state.product_info.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN ? customize_state.product_info.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN : 'N';


  function updateSize() {
    if (!myRef.current) return;
    const bottomHeight = myRef.current.clientHeight
    const maxHeightstep = window.innerHeight - bottomHeight

    setSize([window.innerWidth, maxHeightstep]);
    setBottompadding(myRef.current.clientHeight)
  }
  const addToCartFun = () => {
    customizeDispatch({ type: 'ADD-TO-CART' });
    customizeDispatch({ type: 'ERROR-VALIDATION' });
    let missing = Object.keys(customize_state.missing_step_validation).length;
    let validation = Object.keys(customize_state.error_step_validation).length;
    console.log(missing, validation, 'validation', customize_state, customize_state.missing_step_validation);
    if (missing > 0) {
      setErrorModal(true);
    } else if (validation > 0) {
      setValidationModal(true);
    } else if (missing == 0 && validation == 0 && m_width > 0 && m_height > 0) {
      setSuccessModal(true);
      if (['MODIFICATION', 'COMPLETED'].indexOf(cart_status) >= 0) {
        cartAddUpdate(cart_status);
      } else {
        cartAddUpdate('COMPLETED')
      }
      //cartAddUpdate('COMPLETED');
      GoogleAnalytics.addToCartCustomizeGoogle(customize_state);
      SnapPixel.addToCartCustomizeGoogle(customize_state, customize_state.user_info);

    } else if (m_width == undefined || m_height == undefined || m_width == 0 || m_height == 0) {
      customizeDispatch({ type: 'ERROR-VALIDATION', value: { key: 'MEASUREMENT', mgs: t('height_width_validation') } });
      setValidationModal(true);
      //  alert(t('height_width_validation'));
    } else {
      alert('Something Error.');
    }
  }
  const cartAddUpdate = (cart_status = 'INCOMPLETE') => {
    customizeDispatch({ type: 'ADD-TO-CART' });
    addToCartFunScene(customize_state, customizeDispatch, cart_status);
  }
  const goTocartPage = () => {
    customizeDispatch({ type: 'ADD-TO-CART' });
    addToCartFunScene(customize_state, customizeDispatch, 'COMPLETED');
    // setObjPercentage(75);

    let cust_type = customize_state.user_info ? customize_state.user_info.cust_type : '';
    let SOL_SOH_SYS_ID = customize_state.modification_user_info && customize_state.modification_user_info.head_sys_id ? customize_state.modification_user_info.head_sys_id : '';

    let cart_url = cust_type == 'ADMIN' ? '/modification?head_sys_id=' + SOL_SOH_SYS_ID : '/cartPage';
    //console.log(customize_state, 'customize_state222', cart_url);
    setTimeout(() => {
      // setObjPercentage(90);
      history.push(cart_url)
    }, 1800);

  }


  useEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
  }, []);

  useEffect(() => {
    if (customize_state.steps.MATERIAL_SELECTION && customize_state.steps.MATERIAL_SELECTION.material_info && parseInt(customize_state.steps.MATERIAL_SELECTION.material_info.SII_WIDTH) < m_width && restrict_to_material_width_yn == 'Y') {
      customizeDispatch({ type: 'ERROR-VALIDATION', value: { key: 'MATERIAL_SELECTION', mgs: t('alertMessageMaxWidth_mgs') } });
      setValidationModal(true);
    } else if (customize_state.steps.MATERIAL_SELECTION && customize_state.steps.MATERIAL_SELECTION.material_info && parseInt(customize_state.steps.MATERIAL_SELECTION.material_info.SII_LENGTH) < m_height && restrict_to_material_height_yn == 'Y') {
      customizeDispatch({ type: 'ERROR-VALIDATION', value: { key: 'MATERIAL_SELECTION', mgs: t('alertMessageMaxHeight_mgs') } });
      setValidationModal(true);
    } else {
      customize_state.error_step_validation.MATERIAL_SELECTION ? delete customize_state.error_step_validation.MATERIAL_SELECTION : '';
    }

    if (customize_state.steps.TYPE_OF_MOTOR && parseInt(customize_state.steps.TYPE_OF_MOTOR.SPS_MIN_WIDTH) > m_width) {
      customizeDispatch({ type: 'ERROR-VALIDATION', value: { key: 'TYPE_OF_MOTOR', mgs: t('motor_width_validation') } });
      setValidationModal(true);
    }
    else if (customize_state.steps.TYPE_OF_MOTOR && parseInt(customize_state.steps.TYPE_OF_MOTOR.SPS_MAX_HEIGHT) < m_height) {
      customizeDispatch({ type: 'ERROR-VALIDATION', value: { key: 'TYPE_OF_MOTOR', mgs: t('motor_height_validation') } });
      setValidationModal(true);
    } else {
      customize_state.error_step_validation.TYPE_OF_MOTOR ? delete customize_state.error_step_validation.TYPE_OF_MOTOR : '';
    }
  }, [m_width, customize_state.steps.MATERIAL_SELECTION, customize_state.steps.TYPE_OF_MOTOR]);

  return (
    <>
      <div className="CustomizationStepSection" style={{ maxHeight: window.innerHeight, paddingBottom: bottompadding }}>
        <Tab.Container id="left-tabs-example" activeKey={key} onSelect={handleSelect}>
          <div className="stepsidebar hidescroll">
            <Row className="m-0 stepsidebarcontentRow">
              <Col xs={9} md={9} lg={9}   >
                <Tab.Content className="hidescroll stepsidebarcontent pb-2" style={{ maxHeight: size[1] }} >
                  {props.CHILD[1].map((data, index) => {
                    return (
                      <Tab.Pane eventKey={index} key={index} transition={false}>
                        <StepCouner total={'0' + totalSteps} active={'0' + (index + 1)} name={data.SPS_DESC} />
                        <StepImport key={index} {...data} />
                      </Tab.Pane>
                    )
                  })
                  }

                </Tab.Content>
              </Col>

              <Col xs={3} md={3} lg={3} className="p-0 hidescroll stepsidebarmenu" style={{ maxHeight: size[1] }}>
                <Nav variant="pills" className="flex-column tab-nav flex-nowrap">
                  {props.CHILD[1].map((data, index) => {
                    return (
                      <Nav.Item key={index}>
                        <Nav.Link eventKey={index}>
                          <div className="step-menu">
                            <h5>{t("Step0")}{index + 1}</h5>
                            <div className="step-name">
                              {key == index ? <LazyLoadImage effect="" src={data.SPS_INFO_IMAGE_PATH ? data.SPS_INFO_IMAGE_PATH : data.SPS_IMAGE_PATH} className="img-fluid" alt={data.image_alt_seo} width="auto" height="auto" /> : <LazyLoadImage effect="" src={data.SPS_IMAGE_PATH} className="img-fluid" alt={data.image_alt_seo} width="auto" height="auto" />}
                              <p>{data.SPS_DESC}</p>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
                  <Nav.Item className='d-sm-none'>
                    <Nav.Link eventKey={key == props.CHILD[1].length + 1 ? props.CHILD[1].length - 2 : props.CHILD[1].length + 1} className='previewBtn' style={{ padding: '0px' }}>
                      <div className="back_url_mobile">
                        {cart_status == 'COMPLETED' ? <span className="back_url_mobile" onClick={() => { goTocartPage() }}>
                          <span><IoChevronBack /></span> {parse(t("Back"))}</span>
                          :
                          <LinkComponent className="back_url_mobile" href={slug[0] + '/' + slug[1]} style={{ color: "#fff" }}>
                            <span><IoChevronBack /><span className="d-md-inline">{t('Back')}</span> </span>
                          </LinkComponent>}
                      </div>
                      <button className="btn btn-warning text-light" style={{ margin: '5px 0px 0px 8px' }}>{key == props.CHILD[1].length + 1 ? t('Preview_close') : t("Preview")} </button>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>

          </div>
        </Tab.Container>
      </div>
      
      <Col sm={12} className="bottom-panel w-100" ref={myRef}>
        {isMobile && isMobile ?
          (<Row style={{ borderBottom: '1px solid #fff', height: '70px' }}>
            <Col xs={8} sm={6} xl={3} className="pt-0 pb-1 p-4 p-sm-2">
              <div className="d-sm-block">
                <span style={{ fontSize: '12px', opacity: 1 }}>
                  {customize_state?.steps?.MATERIAL_SELECTION?.material_info?.SII_ITEM_ID?.split('-')?.splice(1)?.join('-')}
                  {customize_state.steps && customize_state.steps?.MATERIAL_SELECTION ? <span style={{ color: '#ffa701', fontSize: '14px' }}> - {customize_state.steps.MATERIAL_SELECTION?.material_info?.COLOR_DESC} </span> : ''}
                </span>
                <p><span style={{ opacity: 1 }}>{customize_state.product_info.SPI_TOOLTIP}</span></p>
              </div>
            </Col>
            <Col xs={4} sm={12} lg={12} xl={5} className="text-end p-0">

            </Col>
          </Row>) : ('')}
        <Row>
          <Col sm={6} xl={5} className="p-1 d-none d-sm-block" >
            <div className="productname">
              <span style={{ fontSize: '12px', opacity: 1 }}>
                {customize_state?.steps?.MATERIAL_SELECTION?.material_info?.SII_ITEM_ID?.split('-')?.splice(1)?.join('-')}
                {customize_state.steps && customize_state.steps?.MATERIAL_SELECTION ? <span style={{ color: '#ffa701', fontSize: '14px' }}> - {customize_state.steps.MATERIAL_SELECTION?.material_info?.COLOR_DESC} </span> : ''}
              </span>
              <p>{props.CHILD[2].SPI_TOOLTIP ? props.CHILD[2].SPI_TOOLTIP : ''}</p>
            </div>
          </Col>
          <Col xs={8} sm={6} xl={2} className={customize_state.price_array.SOL_VALUE > 0 ? 'p-3 p-sm-2' : 'with_opacity p-3 p-sm-2'}>
            <div className="productprice">
              <p style={{ lineHeight: 0 }}><span>{t("Total")}</span>&nbsp;</p>
              <p>
                <CurrencyFormat
                  value={customize_state.price_array.SOL_VALUE ? customize_state.price_array.SOL_VALUE : 0}
                  decimalScale={decimalPoints}
                />
              </p>
            </div>
          </Col>
          <Col xs={4} sm={12} lg={12} xl={5} className={customize_state.price_array.SOL_VALUE > 0 ? 'p-0' : 'with_opacity p-0'}>
            <div className="nextstep">
              {key > 0 ? <Button className="btn btn-secondary mx-sm-2 mt-sm-2  d-none d-sm-inline" onClick={() => { customizeDispatch({ type: 'PREV-STEP' }); cartAddUpdate('INCOMPLETE') }}>{t("PrevStep")} </Button> : ''}
              {key < (totalSteps - 2) ? <Button className="btn btn-secondary mx-sm-2 mt-sm-2 p-4 p-sm-2" onClick={() => { customizeDispatch({ type: 'NEXT-STEP' }); cartAddUpdate('INCOMPLETE') }}>{t("NextStep")}</Button> : ''}
              {['MODIFICATION', 'COMPLETED'].indexOf(cart_status) == -1 && customize_state.price_array.SOL_VALUE > 0 && ['A1', 'A3', 'A5'].indexOf(props.CHILD[2]['SPI_ADD_TO_CART_TYPE']) >= 0 && (key == (totalSteps - 2) || key == (totalSteps - 1)) ? <Button className="btn btn-secondary mx-sm-2 mt-sm-2 p-4 p-sm-2" onClick={() => { customizeDispatch({ type: 'ADD-TO-CART' }); addToCartFun() }} style={{ backgroundColor: "#ef9c00" }}> {t("AddtoCart")} </Button> : ''}
              {['MODIFICATION', 'COMPLETED'].indexOf(cart_status) >= 0 && customize_state.price_array.SOL_VALUE > 0 && (key == (totalSteps - 2) || key == (totalSteps - 1)) ? <Button className="btn btn-secondary mx-sm-2 mt-sm-2 p-4 p-sm-2" onClick={() => { customizeDispatch({ type: 'ADD-TO-CART' }); addToCartFun() }} style={{ backgroundColor: "#ef9c00" }}>{cart_status == 'COMPLETED' ? t('UpdatetoCart') : t('modification_cart')}</Button> : ''}
              {props.CHILD[2].SPI_ADD_TO_CART_TYPE == 'B1' && (key == (totalSteps - 2) || key == (totalSteps - 1)) ? <Button className="btn btn-secondary mx-sm-2 mt-sm-2 p-4 p-sm-2" style={{ backgroundColor: "#803fb7" }}>{t("ContactUs")} </Button> : ''}
            </div>

          </Col>
        </Row>
      </Col>
      <ErrorStepPopup
        show={errorModal}
        onHide={() => setErrorModal(false)}
      />
      <ValidationPopup
        show={validationModal}
        onHide={() => setValidationModal(false)}
      />

      <SuccessStepPopup
        show={successModal}
        onHide={() => setSuccessModal(false)}
        customize_state={customize_state}
      />

    </>
  )
}

export default connect(
  (state) => ({
    items: state.items.filteredItems, cartItems: state.cart.cartItems
  }),
  {
    // fetchItems,
    // addToCart,
    // removeFromCart,
    // increment,
    // decrement,
  }
)(CustomizationStepSection);

