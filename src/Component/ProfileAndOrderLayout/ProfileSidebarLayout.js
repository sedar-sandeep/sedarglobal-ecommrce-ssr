import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { Col, Container, Row, Alert } from 'react-bootstrap';
import ApiDataService from '../../services/ApiDataService';
import { defaultLocale, onError } from '@utils/i18n';
import { connect } from "react-redux";
import GLOBALS from '../../Globals';
import { useTranslation } from 'next-i18next'

// component
import ProfileMyorder from './ProfileContent/ProfileMyorder';
import ProfileMyaccount from './ProfileContent/ProfileMyaccount';
import ProfileAddress from "./ProfileContent/ProfileAddress";
import ProfileOrderReturn from "./ProfileContent/ProfileOrderReturn";
import UserCard from "./Card/UserCard";
import ProfileEditAccount from "./ProfileContent/ProfileEditAccount";
import ProfileChangePassword from "./ProfileContent/ProfileChangePassword";
import AddCard from "./Card/AddCard";
import ChangeProfilePic from "./ProfileModal/ChangeProfilePic";
import ProfileMobileSidebarPage from "./ProfileMobileSidebarPage"
// component
import { isMobile } from "react-device-detect";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LinkComponent from '@components/Link';


let img_url = '/';

const ProfileSidebar = (props) => {

  const { t } = useTranslation('common');
  /*function refreshPage() {
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }*/
  const location = useRouter();

  return (
    <>
      <div className="media align-items-center d-flex ">
        <LazyLoadImage onError={onError} src={props.cust_photo ? props.cust_photo : `/assets/images/noimage.png`} alt="sedarglobal" onClick={() => props.setImageModalShow(true)} title="Profile image" style={{ 'cursor': 'pointer', height: "48px", width: "48px" }} className="profile_image" width="48" height="48" />
        <Col className="media-body ps-2 text-break">
          <h6>{t('Hello')} </h6>
          <p>{props.cust_first_name} {props.cust_last_name}</p>
        </Col>
      </div>
      <div className="side-menu">
        <ul className="list-unstyled">
          <li className={location.pathname.split('/')[3] == 'orders' ? 'active' : ''} > <LinkComponent className="" href="/profile/orders"> <div><LazyLoadImage effect="" src={`${img_url}assets/images/profile/Group24593.png`} alt="sedarglobal" width="auto" height="auto" /></div> <span className='ms-4'> {t('MyOrders')}  </span></LinkComponent></li>
          {/* <li className={location.pathname.split('/')[3] == 'WishList' ? 'active' : ''} > <LinkComponent href={`/WishList`}> <div><LazyLoadImage effect="" src={`${img_url}assets/images/profile/20.png`} alt="sedarglobal" width="auto" height="auto" /></div> <span className='ms-4'>{t('MyFavourites')}   </span></LinkComponent></li> */}
          <li className={location.pathname.split('/')[3] == 'account-setting' ? 'active' : ''}> <LinkComponent href="/profile/account-setting"> <div><LazyLoadImage effect="" src={`${img_url}assets/images/profile/Group24594.png`} alt="sedarglobal" width="auto" height="auto" /></div> <span className='ms-4'> {t('AccountSettings')}  </span></LinkComponent></li>
          <li className={location.pathname.split('/')[3] == 'card' ? 'active' : ''} > <LinkComponent href="/profile/card"> <div><LazyLoadImage effect="" src={`${img_url}assets/images/profile/Group24596.png`} alt="sedarglobal" width="auto" height="auto" /></div> <span className='ms-4'> {t('SavedCards')}  </span></LinkComponent></li>
          <li className={location.pathname.split('/')[3] == 'address-list' ? 'active' : ''} > <LinkComponent href="/profile/address-list" > <div><LazyLoadImage effect="" src={`${img_url}assets/images/profile/Group24595.png`} alt="sedarglobal" width="auto" height="auto" /></div>  <span className='ms-4' >{t('Addressbook')}  </span></LinkComponent></li>
        </ul>
        <div className="logout">
          <div className="border-button" onClick={() => props.user_dispatch(GLOBALS.user_reducer.LOGOUT_USER)} > <div><LazyLoadImage effect="" src={`${img_url}assets/images/profile/logout.png`} alt="sedarglobal" width="auto" height="auto" /></div>  <span className='ms-4'> {t('SignOut')}  </span>
          </div>
        </div>
      </div>

    </>
  )
}

const ProfileSidebarLayout = (props) => {
  const router = useRouter();
  const { page_name, id } = router.query;
  const { t } = useTranslation('common');
  let user_info = props.user_state ? props.user_state.user_info : null;
  let auth_token = props.user_state ? props.user_state.auth_token : '';

  const [userData, setuserdata] = useState(user_info);
  const [apiStatus, setApiStatus] = useState(false);
  const [imageModalShow, setImageModalShow] = useState(false);
  const [errorMgs, setErrorMgs] = useState(false);
  const [variant, setVariant] = useState('danger');

  const userprofielfun = () => {
    ApiDataService.getAll(`dashboard/edit_profile/${user_info?.cust_id}`, { "cust_user_id": user_info?.cust_email_id, "auth_token": auth_token })
      .then(response => {
        let res_data = response.data;
        if (res_data.return_status == '0' || res_data.error_message == 'Success') {
          setuserdata(res_data.result);
          setApiStatus(true);
          props.user_dispatch('UPDATE_USER_PROFILE', res_data.result);
        } else if (res_data.return_status == -111 || res_data.error_message == 'Error') {

        } else if (res_data.return_status == 401 && res_data.error_message == 'Invalid Request') {
          props.user_dispatch('LOGOUT_USER');
          // history.push('/cartPage');
        } else {
          setErrorMgs(res_data.error_message);
          setVariant('danger');
        }
      }).catch(e => {
        console.log(e);
        props.user_dispatch('LOGOUT_USER');
        //setErrorMgs(e.message);
        // setVariant('danger');
      });
  }

  return (
    <section className="ProfileSidebarLayout p-sm-4">
      {errorMgs ? <Alert className="api_alert_mgs fs-6" variant={variant} onClose={() => setErrorMgs(false)} dismissible>
        {errorMgs}
      </Alert> : ''}

      <Container fluid className="max-width">
        <div className="heading-section d-none d-md-block">
          <h1> {t('Profile')}</h1>
        </div>
        <Row>

          <Col xl={3} md={4} sm={12} className="ProfileSidebar-col border-end border-1">
            <div className="ProfileSidebar me-auto d-none d-md-block">
              <ProfileSidebar {...userData} user_state={props.user_state} user_dispatch={props.user_dispatch} setImageModalShow={setImageModalShow} />
            </div>
          </Col>
          <Col xl={9} md={8} sm={12} className="Profile-content-col">
            <div className="Profile-content ProfileContent">
              {page_name == 'orders' && (<ProfileMyorder />)}
              {page_name == 'account-setting' && (<ProfileMyaccount {...userData} userprofielfun={userprofielfun} setuserdata={setuserdata} />)}
              {page_name == 'card' && (<UserCard />)}
              {id && <AddCard />}
              {page_name == 'address-list' && (<ProfileAddress />)}
              {page_name == 'orders-return' && (<ProfileOrderReturn />)}
              {page_name == 'edit-profile' && (<ProfileEditAccount userData={userData} userprofielfun={userprofielfun} />)}
              {page_name == 'profileChangePassword' && (<ProfileChangePassword userData={userData} />)}
              {page_name == 'shippingPage' && (<ProfileMyorder />)}
              {isMobile && router.pathname == '/profile' && (<ProfileMobileSidebarPage userData={userData} userProfielFun={userprofielfun} />)}
            </div>
          </Col>
        </Row>
      </Container>
      <ChangeProfilePic show={imageModalShow}
        onHide={() => setImageModalShow(false)}
        userprofielfun={userprofielfun}
        currentImage={userData.cust_photo && userData.cust_photo}
      />
    </section>
  );
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileSidebarLayout);
