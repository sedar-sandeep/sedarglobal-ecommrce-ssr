// import './ProfileContent.scss';
import React, { useState, useEffect, Suspense } from 'react';
import { Col, Container, Row, Tab, Modal, Button, Alert, Nav, Form, InputGroup, FormControl } from 'react-bootstrap';
import { Collapse } from 'react-collapse';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ApiDataService from 'src/services/ApiDataService';
import { defaultLocale } from '@utils/i18n';
import { useTranslation } from 'next-i18next'
import { connect } from "react-redux";
import Cookies from 'js-cookie';
import LaddaButton from "react-ladda";
import MyOrderListSkeleton from '../../Preloader/MyOrderList';
import { useForm } from "react-hook-form";
const assets_path = process.env.NEXT_PUBLIC_IMAGE_URL + 'assets/'


const GetOffPercentage = (props) => {
  const { t } = useTranslation('common');

  let old_value = Number(props.old_value);
  let new_value = Number(props.new_value);

  let per = 100 - (new_value / old_value) * 100;
  let val = Math.round(per);
  return (
    <span>{t('off_percentage', { val: val })}</span>
  )
}

const Index = (props) => {

  const { t } = useTranslation('common');
  const { register, handleSubmit, watch, setValue, setError, getValues, reset, formState: { errors } } = useForm({});

  const [errorMgs, setErrorMgs] = useState(false);
  const [variant, setVariant] = useState('danger');
  const [header_data, setHeaderData] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loading_btn, setLoading_btn] = useState(false);

  const borderStyle = {
    borderTop: '1px solid #E9E9ED'
  }
  const [collapse, setCollapse] = useState({});
  const [viewCollapse, setViewCollapse] = useState({});


  const toggle = (id, type) => {
    //setCollapse({ ...collapse, [id]: !collapse[id], type: type });

    if (type == "track_detail") {
      setCollapse({ ...collapse, [id]: !collapse[id] });
      setViewCollapse({ ...viewCollapse, [id]: false });

    } else if (type == "view_detail") {
      setViewCollapse({ ...viewCollapse, [id]: !viewCollapse[id] });
      setCollapse({ ...collapse, [id]: false });

    }
  };



  const orderListFun = (data) => {
    let txn_no = data.order_txn_no;
    ApiDataService.getAll("order/tracking/" + txn_no, { email: data.email }).then(response => {
      let res_data = response.data;
      if (res_data.return_status == 0 && res_data.error_message == 'Success') {
        res_data.result ? setHeaderData(res_data.result) : setHeaderData('NO');
      } else {
        setErrorMgs(res_data.error_message);
        setVariant('danger');
      }
      setTimeout(() => {
        setLoading(false)
      }, 500);
    }).catch(e => {
      console.log(e);
      setErrorMgs(e.message);
      setVariant('danger');
    });
  }

  console.log(errors,'errors');

  const OrderEmpty = () => {
    return (
      <section className="PaymentError">
        <div>
          <Container>
            <Row>
              <Col sm={12} className="text-center">
                <div className="">
                  <LazyLoadImage src={`/assets/images/Error/Group25785.png`} alt="1" className="my-4" width="auto" height="auto" />
                  <h2 className="my-2" >{header_data != 'NO' ? t('NoActiveOrders') : t('Invalid_reference_no')} </h2>
                  {/* <p className="my-4"><b> {t('Therenorecentordertoshow')}  </b></p> */}
                  <Col sm={10} md={4} lg={3} className="mx-auto">
                    <a href={`/${defaultLocale}`} type="button" className="btn btn-Primary bg-sg-primary py-3 py-sm-4 my-4 w-sm-25 w-100 fw-bold"> {t('StartShopping')}  </a>
                  </Col>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

      </section>
    )
  }


  const MyOrderList = () => {
    const [modalShowDetail, setModalShowDetail] = React.useState(false);
    const [MoreDetail, setMoreDetail] = React.useState(false);
    const [orderId, setOrderId] = React.useState(0);


    return (
      <section className="ProfileMyorder" style={{ padding: "10px 65px" }}>

        <Tab.Container id="ProfileMyorder-tab" defaultActiveKey="first">
          <Row>
            <Col sm={12} className="tab-content">
              <Tab.Content>
                <Tab.Pane eventKey="first" transition={false}>
                  <Nav variant="pills" className="flex-row tab-nav">
                    <Nav.Item>
                      <p className="nav-link active">{t("MyOrder")} </p>
                    </Nav.Item>
                  </Nav>
                  <div className="pt-3">

                    <Row>

                      <Col sm={12} key={1}>

                        <div className="orderheader d-none d-lg-block">
                          <Row>
                            <Col sm={2}><p> {t('OrderNo')}</p></Col>
                            <Col sm={5} className="p-0"><p> {t('Item')} </p></Col>
                            <Col sm={3}><p> {t('Price')} </p></Col>
                            <Col sm={2}><p>{t('Date')} </p></Col>
                          </Row>
                        </div>
                        {header_data && header_data.line_info && header_data.line_info.map((data, index) => {

                          return (
                            <div className="ordercol" key={index} style={data.SOL_ITEM_LABEL && data.SOL_ITEM_LABEL == "SAMPLE" ? { background: "#f1fafa" } : {}}>
                              <Row>
                                <Col lg={2} className="py-1">{header_data.EOH_TXN_CODE}-{header_data.EOH_TXN_NO}-{index + 1}</Col>
                                <Col lg={5} className="py-1 p-lg-0">
                                  <div className="media item d-flex">
                                    <div className="flex-shrink-0  me-3">
                                      <LazyLoadImage className='order_img' src={data.SOL_IMAGE_PATH ? data.SOL_IMAGE_PATH : `/assets/images/profile/MaskGroup4322.png`} alt={data.image_alt_seo} width="auto" height="auto" />
                                    </div>
                                    <Col className="media-body flex-grow-1">
                                      <p>{data.SFP_TITLE}</p>
                                      {data['brand_info'] && data['brand_info']['SII_ITEM_ID'] ? <h6>{t('ItemCode')} <span>{data['brand_info']['SII_ITEM_ID']} </span></h6> : ''}
                                      {data['brand_info'] && data['brand_info']['SII_BR_DESC'] ? <h6>{t('Brand')} <span>{data['brand_info']['SII_BR_DESC']} </span></h6> : ''}
                                      {data.SOL_ORDER_STATUS && !collapse[data.SOL_SYS_ID] ? <h3>{t(data.SOL_ORDER_STATUS)}</h3> : ''}
                                      {data.SOL_ITEM_LABEL && data.SOL_ITEM_LABEL == "SAMPLE" ?
                                        <div>
                                          <span className="fw-normal text-9e6493"> {t('free_sample')}</span>
                                        </div>
                                        : <span className="savelater" onClick={() => { setModalShowDetail(true); setMoreDetail(data) }}> {t("MoreDetail")}  </span>
                                      }


                                    </Col>
                                  </div>
                                </Col>
                                <Col lg={3} className="py-1">
                                  <div className="price">
                                    <p>{t(data.SOL_CCY_CODE)} {Number(data.SOL_GROSS_VALUE).toFixed(2)}</p>
                                    {data.SOL_OLD_VALUE > 0 && data.SOL_OLD_VALUE > data.SOL_GROSS_VALUE ?
                                      <h6> <del>{t(data.SOL_CCY_CODE)} {Number(data.SOL_OLD_VALUE).toFixed(2)} </del>
                                        <span>
                                          <GetOffPercentage
                                            old_value={data.SOL_OLD_VALUE}
                                            new_value={data.SOL_GROSS_VALUE}
                                          /></span>
                                      </h6>
                                      : ''}
                                  </div>
                                </Col>
                                <Col lg={2} className="py-1">
                                  <div className="date">
                                    <p>{data.SOL_TXN_DT}</p>
                                  </div>
                                </Col>
                                <div className="ordercol-footer mt-3" style={collapse[data.SOL_SYS_ID] ? { borderTop: 'none' } : borderStyle}>
                                  <Col sm={12}>
                                    <Row>

                                      <Col sm={6} className="text-start">
                                        <div className="morebtn p-3" onClick={() => toggle(data.SOL_SYS_ID, 'view_detail')}> <u>{viewCollapse[data.SOL_SYS_ID] ? t('HideDetails') : t('ViewDetail')}</u> </div>
                                      </Col>
                                      <Col sm={6} className="text-start text-sm-end">
                                        <div className="morebtn p-3" onClick={() => toggle(data.SOL_SYS_ID, 'track_detail')}> <u>{collapse[data.SOL_SYS_ID] ? t('HideTrackOrder') : t('trackOrder')}</u> </div>
                                      </Col>
                                      <Col sm={12} className="more-detail">
                                        <Collapse isOpened={viewCollapse[data.SOL_SYS_ID]} className="collapse-content">

                                          <OrderViewDetail
                                            {...props}
                                            header_data={header_data}
                                            line_data={data}
                                          />

                                        </Collapse>
                                        <Collapse isOpened={collapse[data.SOL_SYS_ID]} className="collapse-content">
                                          <OrderTrackDetail
                                            {...props}
                                            header_data={header_data}
                                            line_data={data}
                                          />

                                        </Collapse>
                                      </Col>
                                    </Row>
                                  </Col>
                                </div>
                              </Row>
                            </div>
                          )

                        })}
                      </Col>
                    </Row>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

        <OrderModalShowDetail
          show={modalShowDetail}
          onHide={() => setModalShowDetail(false)}
          orderInfo={MoreDetail}
          id={orderId}
        />
      </section>

    );
  }


  function OrderModalShowDetail(props) {
    const { SOL_SYS_ID, SFP_TITLE, SOL_IMAGE_PATH, info_data, SOL_WIDTH, SOL_HEIGHT } = props.orderInfo


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >


        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">

            <h4 className="py-2">{SFP_TITLE}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="OrderModalShowDetail py-4 px-2">
            <Row>
              <Col lg={5}>
                <LazyLoadImage className="py-3 w-100 " src={SOL_IMAGE_PATH ? SOL_IMAGE_PATH : `/assets/images/profile/MaskGroup4322.png`} alt="sedarglobal" width="auto" height="auto" />
              </Col>
              <Col lg={7}>
                <table class="table">
                  <tbody>
                    {info_data &&
                      <>
                        <tr className="border border-0">
                          <th className="border border-0 py-1">
                            <h6 className="py-1" > {t("ItemCode")} <span className="float-end">:</span></h6>
                          </th>
                          <td className="border border-0  py-1"><span className="fs-6 text-secondary">{info_data["MATERIAL_SELECTION"] ? info_data["MATERIAL_SELECTION"]['ITEM_ID'] : ''}</span></td>
                        </tr>
                        <tr className="border border-0 ">
                          <th className="border border-0 py-1">
                            <h6 className="py-1" > {t("Dim")} <span className="float-end">:</span></h6>
                          </th>
                          <td className="border border-0   py-1"><span className="fs-6 text-secondary">{SOL_WIDTH ? SOL_WIDTH : 0}<span className='px-1'>x</span>{SOL_HEIGHT ? SOL_HEIGHT : 0}  {t("cmcart")}</span></td>
                        </tr>
                      </>
                    }
                    {info_data && Object.keys(info_data).map((data, index) => {
                      return (
                        <React.Fragment key={index}>
                          <tr className="border border-0">
                            <th className="border border-0 py-1">
                              <h6 className="py-1" > {t(data)} <span className="float-end">:</span></h6>
                            </th>
                            <td className="border border-0   py-1"><span className="fs-6 text-secondary">{info_data[data]['SPS_DESC']}</span></td>
                          </tr>
                        </React.Fragment>
                      )
                    })}
                  </tbody>
                </table>
              </Col>
            </Row>
          </div>
          {/* <h6>Fabric : <span>Beige / Natural</span></h6> */}
        </Modal.Body>


        {/* <Modal.Footer>
          <Button className="bg-sg-primary" onClick={props.onHide}>{t("Close")} </Button>
        </Modal.Footer> */}
      </Modal>
    );
  }

  const SearchForm = () => {
    return (
      <Container className="mt-5">
        <Form onSubmit={handleSubmit(orderListFun)}>
          <Row>
            <Col md={4} xs={4}>
              <Form.Control
                type="text"
                placeholder={t("Order_No")}
                aria-label="Search"
                name="order_txn_no"
                maxLength="10"
                className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                style={{ marginTop: '15px' }}
                {...register('order_txn_no', {
                  required: true,
                 // valueAsNumber: true,
                  pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/
                  }
                })}
              />
              {errors?.order_txn_no && errors.order_txn_no?.type=='required' &&<span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
              {errors?.order_txn_no && errors.order_txn_no?.type=='pattern' &&<span className="text-danger fs-6 fw-lighter form-input-error">{t('OnlyNumber')}</span>}
            </Col>
            <Col md={4} xs={8}>
              <Form.Control
                type="email"
                placeholder={t("Email")}
                aria-label="Search"
                name="email"
                maxLength="35"
                className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
                style={{ marginTop: '15px' }}
                {...register('email', { required: true })}
              />
              {errors?.email && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
            </Col>
            <Col md={4} sm={12} className="mt-2">
              <LaddaButton loading={loading_btn} type="submit" className="submit_btn search_button">
                <span>{t("Track_Order")}</span>
              </LaddaButton>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }

  return (
    <Row>
      {errorMgs ? <Alert className="api_alert_mgs fs-6" variant={variant} onClose={() => setErrorMgs(false)} dismissible>
        {errorMgs}
      </Alert> : ''}
      <Col md={12} className='ProfileContent'>

        <SearchForm />
        {header_data && header_data != 'NO' ? <MyOrderList {...props} /> : <OrderEmpty />}

      </Col>
    </Row>

  )

}
const OrderTrackDetail = (props) => {
  const { t } = useTranslation('common');
  let header_data = props.header_data;
  let data = props.line_data;
  let sol_order_status = props.line_data?.SOL_ORDER_STATUS;
  let opacity = sol_order_status == 'Cancelled' ? '0.2' : '1';

  return (

    <>
      <Row className="track-bar p-xl-4 my-3" Title={header_data.EOH_STATUS}>
        <hr className="track-line d-none d-xl-block" />
        <Col xl={3} sm={12} className={['Under Verification', 'Order Placed'].indexOf(sol_order_status) >= 0 ? 'track-step active' : 'track-step'}>
          <div className="step-count">
            <LazyLoadImage effect="" src={`/assets/images/profile/Group25784.png`} alt="sedarglobal" width="auto" height="auto" />
          </div>
          <div className="step-description text-nowrap">{t('Orderplaced')} </div>
          <div className="step-date d-none d-lg-block">{data.SOL_TXN_DT}</div>
          <div className='vertical_line col-sm-1 d-block d-sm-none'></div>
        </Col>
        <Col xl={3} sm={12} className={['Processed', 'Cancelled', 'Produced', 'Partially Produced', 'Produced (Partial Produced)'].indexOf(sol_order_status) >= 0 ? 'track-step active' : 'track-step d-none d-xl-block'}>
          <div className="step-count">
            <LazyLoadImage effect="" src={`/assets/images/profile/Group25784.png`} alt="sedarglobal" width="auto" height="auto" />
          </div>
          <div className="step-description text-nowrap">{['Processed', 'Cancelled', 'Partially Produced', 'Produced', 'Produced (Partial Produced)'].indexOf(sol_order_status) >= 0 ? t(sol_order_status) : t('In_Process')} </div>
          <div className="step-date">{['Processed', 'Cancelled'].indexOf(sol_order_status) >= 0 ? data.PROCESS_DT : ''}</div>
          <div className="step-date">{['Produced', 'Partially Produced'].indexOf(sol_order_status) >= 0 ? data.PROCESS_DT : ''}</div>
          <div className='vertical_line col-sm-1 d-block d-sm-none'></div>
        </Col>
        <Col xl={3} sm={12} className={['Shipped'].indexOf(sol_order_status) >= 0 ? 'track-step active' : 'track-step'} style={{ opacity: opacity }}>
          <div className="step-count">
            <LazyLoadImage effect="" src={`/assets/images/profile/Group25784.png`} alt="sedarglobal" width="auto" height="auto" />
          </div>
          <div className="step-description text-nowrap">{t('Shipped')} </div>
          <div className="step-date">{data.SHIP_DT}</div>
          <div className='vertical_line col-sm-1 d-block d-sm-none'></div>
        </Col>
        <Col xl={3} sm={12} className={['Delivered'].indexOf(sol_order_status) >= 0 ? 'track-step active' : 'track-step'} style={{ opacity: opacity }}>
          <div className="step-count">
            <LazyLoadImage effect="" src={`/assets/images/profile/Group25784.png`} alt="sedarglobal" width="auto" height="auto" />
          </div>
          <div className="step-description text-nowrap">{t('Delivered')}  </div>
          {/* <div className="step-date">{data.DELIVERED_DT ? data.DELIVERED_DT : data.SOL_DELIVERY_DT}</div> */}
          <div className="step-date">{data.DELIVERED_DT ? data.DELIVERED_DT : ''}</div>
        </Col>
      </Row>
      <div className="order-other-detail p-xl-3 ss  pb-3">
        <Row>
          <Col xl={6}>
            <div className="media item d-lg-flex flex-wrap ">
              <p>{t('Deliverto')} : </p>
              {data.shipping_detail ?
                <Col className="shipping_detail">
                  <p>{data.shipping_detail ? data.shipping_detail.CAD_FIRST_NAME : ''} {data.shipping_detail ? data.shipping_detail.CAD_LAST_NAME : ''} <span className="plan-type-heading ml-4"> {t(data.shipping_detail ? data.shipping_detail.CAD_ADDRESS_TYPE : 'HOME')} </span></p>
                  <address className="address">
                    <p>{data.shipping_detail ? data.shipping_detail.CAD_STREET_NAME_NO : ''}, {data.shipping_detail ? data.shipping_detail.CAD_BUILDING_NAME_NO : ''}, {data.shipping_detail ? data.shipping_detail.CAD_FLOOR_NO : ''} {data.shipping_detail ? data.shipping_detail.CAD_APARTMENT_NO : ''} {data.shipping_detail ? data.shipping_detail.CAD_NEAREST_LANDMARK : ''}</p>
                    <p>{data.shipping_detail ? data.shipping_detail.AR_DESC : ''}, {data.shipping_detail ? data.shipping_detail.CT_DESC : ''}, {data.shipping_detail ? data.shipping_detail.ST_DESC : ''}, {data.shipping_detail ? data.shipping_detail.CAD_POSTAL_CODE : ''} {data.shipping_detail ? data.shipping_detail.CAD_COUNTRY : ''}</p>
                    <p>{data.shipping_detail ? data.shipping_detail.CAD_SHIPPING_NOTE : ''}</p>
                  </address>
                </Col>
                : data.showroom_detail ?
                  <Col className="showroom_detail">
                    <p> {data.showroom_detail ? data.showroom_detail.SSA_ADDRESS_TITLE : ''} &nbsp;<span className="plan-type-heading ml-4">{t('Showroom')} </span></p>
                    <p>{data.showroom_detail ? data.showroom_detail.SSA_CITY_NAME : ''}, {data.showroom_detail ? data.showroom_detail.SSA_SCN_ISO : ''} </p>
                  </Col>
                  : ''}
            </div>
          </Col>
          {data.shipping_detail ?
            <Col xl={6}>
              <div className="media item d-flex flex-wrap">
                <p>{t('Mobile')} :</p>
                <div className="">
                  <p>{data.shipping_detail ? data.shipping_detail.CAD_CONTACT_NUMBER : ''}</p>
                </div>
              </div>
              <div className="media item d-flex flex-wrap">
                <p>{t('Email')} :</p>
                <div className="">
                  <p>{header_data.USER_EMAIL_ID}</p>
                </div>
              </div>
            </Col>
            : data.showroom_detail ?
              <Col xl={6}>
                <div className="media item d-flex flex-wrap">
                  <p>{t('Mobile')} :</p>
                  <div className="">
                    <p><a href={'tel:' + data.showroom_detail.SSA_PHONE_NO}>{data.showroom_detail.SSA_PHONE_NO}</a></p>
                  </div>
                </div>
                <div className="media item d-flex flex-wrap">
                  <p style={{ paddingTop: '5px' }}>{t('Email')} :</p>
                  <div className="">
                    <p><a href={'mailto:' + data.showroom_detail.SSA_MANAGER_EMAIL_ID}>{data.showroom_detail.SSA_MANAGER_EMAIL_ID}</a>
                      <a href={data.showroom_detail.SSA_GEO_LOCATION.length > 5 ? data.showroom_detail.SSA_GEO_LOCATION : 'https://www.google.ae/maps/place/SEDAR'} target="_blank" style={{ padding: '5px' }} rel="noreferrer">
                        <img alt="google map" src={assets_path + 'icon/google-maps.png'} width="28" height="auto" />
                      </a>
                    </p>
                  </div>
                </div>
              </Col>
              : ''}
        </Row>
      </div>

    </>
  )
}

const OrderViewDetail = (props) => {
  const { t } = useTranslation('common');
  let header_data = props.header_data;
  let data = props.line_data;

  return (
    <>
      <div className="order-other-detail p-xl-3 vew pb-3">
        <Row>
          {/* <Col xl={6}>
            <label>{header_data.SOH_PAYMENT_METHOD ? t('PaymentMethod') : ''} </label>
            <p>{header_data.SOH_PAYMENT_METHOD}</p>
            {header_data.payment_info && header_data.payment_info.map((e, i) => {
              return (
                <div className='payment_info' key={i}>
                  {e.PG_CARD_NUMBER ? <p>{e.PG_CARD_NUMBER}</p> : ''}
                  {e.PG_PAYMENT_OPTION ? <p>{e.PG_PAYMENT_OPTION}</p> : ''}
                  {e.PG_PAYMENT_TYPE ? <p>{e.PG_PAYMENT_TYPE}</p> : ''}
                </div>
              )
            })}
          </Col> */}
          <Col xl={6}>
            <label>{t('OrderSummary')} </label>
            <div>
              <p>
                <label>{t('items_subtotal')}: </label>
                <b className='order_val fw-bold'> {t(data.SOL_CCY_CODE)} {Number(data.SOL_VALUE).toFixed(2)}</b>
              </p>
              {/* {data.SOL_OLD_VALUE > 0 && data.SOL_OLD_VALUE > data.SOL_GROSS_VALUE ?
                <p>
                  <label>{t('Old_Price')}: </label>
                  <span className='order_val' style={{ padding: '5px' }}>
                    <del>{t(data.SOL_CCY_CODE)} {Number(data.SOL_OLD_VALUE).toFixed(2)} </del>
                    <span style={{ color: 'red' }}>
                      <GetOffPercentage
                        old_value={data.SOL_OLD_VALUE}
                        new_value={data.SOL_GROSS_VALUE}
                      /></span></span>
                </p>
                : ''} */}
              <p>
                <label>{t('Shipping')}: </label>
                <b className='order_val fw-bold'>
                  {data.SOL_SHIP_VALUE > 0 ? Number(data.SOL_SHIP_VALUE).toFixed(2) : t("Free")}
                </b>
              </p>
              {data.SOL_PROMO_VALUE > 0 ?
                <>
                  <p className="" >
                    <label>{t('Promo_discount')}: </label><b className='order_val fw-bold '>{Number(data.SOL_PROMO_VALUE).toFixed(2)}</b>
                  </p>
                </>
                : ''}
              <hr></hr>
              <h6>
                <label>{t("Total")} : </label>
                <span className='order_val text-warning'> {t(data.SOL_CCY_CODE)} {Number(data.SOL_GROSS_VALUE).toFixed(2)}</span>
              </h6>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}


const mapStateToProps = (state) => ({ user_state: state.UserReducer });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
