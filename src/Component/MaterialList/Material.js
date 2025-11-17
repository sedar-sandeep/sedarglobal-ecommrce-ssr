import dynamic from "next/dynamic";
import _ from "lodash";
import React, { useState, useEffect } from 'react';
import { connect, useSelector } from "react-redux";
import { Col, Row } from 'react-bootstrap';
import SwiperCore, { Navigation, Pagination, Thumbs, Virtual } from 'swiper';
// import MaterialCard from "./MaterialCard";
import GoogleAnalytics from "../../services/GoogleAnalytics";
import SnapPixel from "../../services/SnapPixel";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const ToastAlert = dynamic(() => import("../AlertMessages/ToastAlert"));
const MaterialCard = dynamic(() => import("./MaterialCard"));

SwiperCore.use([Navigation, Pagination, Thumbs, Virtual]);



const Material = (props) => {
  const { query } = useRouter();
  const { slug } = query;

  let category_slug = slug && slug[0] || undefined;
  let sub_category_slug = slug && slug[1] || undefined;

  const { t } = useTranslation("common");

  const [state, setState] = useState({
    show: false,
    item: false,
    divGrid: 4,
    active_item_id: false
  });

  const alert_message = useSelector(store => store.alert);
  //const dispatch = useDispatch();

  const [loader, setLoader] = useState(true)
  useEffect(() => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 1000);
  }, [state.show])

  useEffect(() => {
    if (props.listings && props.listings.length > 0) {
      GoogleAnalytics.viewItemList(props.listings);
      SnapPixel.viewItemList(props.listings, props?.user_state?.user_info);
    }

  }, [props.listings]);


  return (
    <>
      {alert_message && alert_message.message ? <ToastAlert {...alert_message} /> : ''}
      <Col className="MaterialList" id="material_list">

        <Row className="materialgridlist px-2">
          {props.listings && props.listings.map((data, index) => {
            return (
              <Col key={index} className={`group${props.divGrid == 0 ? 4 : props.divGrid} materialgridlistitem px-1 px-sm-3`} lg={props.divGrid == 0 ? 4 : props.divGrid} md={6} sm={6} xs={6} xl={props.divGrid == 0 ? 4 : props.divGrid}>
                <MaterialCard {...data} data={props} state={state} setLoader={setLoader} category_slug={category_slug} sub_category_slug={sub_category_slug} key={index + 1} />
              </Col>
            )
          })}

        </Row>

      </Col>
    </>
  )
}


const mapStateToProps = (state) => ({ user_state: state.UserReducer, numberCart: state.cart.numberCart });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Material)
//export default Material