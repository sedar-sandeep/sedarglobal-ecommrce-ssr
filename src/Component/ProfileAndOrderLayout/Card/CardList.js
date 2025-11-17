import React, { useState, useEffect, Suspense } from "react";

import { Col, Container, Row, Tab, Nav, Button, Modal } from 'react-bootstrap';
import LinkComponent from '@components/Link';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import RemovePopup from './RemovePopup';
import ApiDataService from '../../../services/ApiDataService';
import { connect } from "react-redux";
import { useTranslation } from 'next-i18next'
import parse from 'html-react-parser';
import Cookies from 'js-cookie';

const CardList = (props) => {
  const { t } = useTranslation('common');

  const [modalShow, setModalShow] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMgs, setErrorMgs] = useState();
  const [variant, setVariant] = useState('danger');
  const [cardList, setCardListFun] = useState();
  const [cardEdit, setCardEdit] = useState(false);

  let user_info = props.user_state ? props.user_state.user_info : null;
  let auth_token = Cookies.get('AUTH_TOKEN');
  // if (user_info == null || auth_token == null || auth_token.length == null) {
  //   return <Redirect to={`/${defaultLocale}`} />;
  // }



  const cardListFun = () => {
    let post_data = { "cust_user_id": user_info.cust_email_id, "auth_token": auth_token }
    ApiDataService.getAll('dashboard/customerCard', post_data).then(response => {
      let res_data = response.data;
      if (res_data.return_status == 0 && res_data.error_message == 'Success') {
        //
        setCardListFun(res_data.result);
      } else {
        setErrorMgs(res_data.error_message);
        setVariant('danger');
        //console.log(res_data.error_message, 'Error...');
      }
      setTimeout(() => {
        setLoading(false)
      }, 1000);

    }).catch(e => {
      //console.log(e, 'res_data...', e.return_status);
      setErrorMgs(e.message);
      setVariant('danger');
      setTimeout(() => {
        setLoading(false)
      }, 500);
    });
  }

  useEffect(() => {
    cardListFun();
  }, []);

  return (
    <div className="ProfileSavedCardList">
      <Row>
        <Col sm={12} className="tab-content">
          <div className="grid">
            {cardList && cardList.length > 0 ? cardList.map((data, index) => {
              return (
                <div className="card-list" key={index} >
                  <label className={data.SCC_ACTIVE_YN == 'Y' ? 'card' : 'card deactivated'} title={data.SCC_ACTIVE_YN == 'Y' ? 'This card is active' : 'This card is Inactive'}>
                    <span className={`plan-details`}>
                      <div className="card-box">
                        <div className="bankname  mb-3">
                          {data.SCC_BANK_NAME ? <h3>data.SCC_BANK_NAME </h3> : ''}
                          <LazyLoadImage effect="" src={`/assets/images/payment/${data.SCC_CARD_TYPE}.png`} alt={data.SCC_CARD_TYPE} width={'auto'} height={34} />
                        </div>
                        <div className="cardnumber  mb-3">
                          <p>Card Number</p>
                          <h3>{data.SCC_CARD_NUMBER}</h3>
                        </div>
                        <div className="bankname  mb-2">
                          <div className="cardname">
                            <p>Name On card</p>
                            <h3>{data.SCC_CARD_HOLDER}</h3>
                          </div>
                          <div className="cardname">
                            <p>Validity</p>
                            <h3>{data.SCC_EXP_MONTH}/{data.SCC_EXP_YEAR}</h3>
                          </div>
                        </div>
                      </div>
                    </span>
                  </label>
                  <div className="action-btn">
                    <div className="border-button">
                      <LinkComponent className="text-dark" href={`/profile/card/${data.SCC_SYS_ID}`}><span>{t("Edit")} </span></LinkComponent>
                    </div>
                    <div className="border-button" onClick={() => { setModalShow(true), setCardEdit(data) }}><span>{t("Remove")} </span>
                    </div>
                  </div>
                </div>
              )
            })

              :
              <div className="saved-card-detail">
                <h3>{t("ThereisnoCredit")} </h3>
                <p>{parse(t('convenienttopaywithsaved'))}</p>
              </div>
            }
          </div>
        </Col>
      </Row>

      <RemovePopup
        show={modalShow}
        onHide={() => setModalShow(false)}
        cardEdit={cardEdit}
        cardListFun={cardListFun}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardList);

