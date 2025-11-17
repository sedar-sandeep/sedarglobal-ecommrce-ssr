import React, { useState, useEffect } from 'react';
//import './ProfileMobileSidebarPage.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LinkComponent from '@components/Link';
//import '../ProfileAndOrderLayout/ProfileSidebarLayout.scss';
import { Col, Container, Row } from 'react-bootstrap';
import ChangeProfilePic from "./ProfileModal/ChangeProfilePic";
import { RiArrowRightSLine } from 'react-icons/ri';
import ApiDataService from '../../services/ApiDataService';
import GLOBALS from '../../Globals';
import { connect, useSelector } from "react-redux";
import { useTranslation } from 'next-i18next'
import { useRouter } from "next/router";


let img_url = '/';

const ProfileMobileSidebarPage = (props) => {
  const { t } = useTranslation('common');
  const location = useRouter();
  const [imageModalShow, setImageModalShow] = useState(false);
  let user_info = props.user_state ? props.user_state.user_info : null;

  const user_data = props.userData ? props.userData : user_info;

  function refreshPage() {
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }


  let cust_photo = user_data && user_data.cust_photo ? user_data.cust_photo : '/assets/images/noimage.png';

  return (
    <>
      <div className="ProfileMobileSidebarPage container p-0">
        <div className="profileimage">
          <div className="text-center imagebox w-100">
            <LazyLoadImage style={{ height: "78px", width: "78px" }} src={cust_photo} alt="sedarglobal" title="Edit" role="button" className="profile_image" onClick={() => setImageModalShow(true)} />
            <Col className="media-body p-2">
              {props.user_state.isLoggedIn ?
                <>
                  <h6>{t('Hello') + ' ' + user_data && user_data.cust_first_name + ' ' + user_data.cust_last_name} </h6>
                </>
                : ""}
              {/* <p>{user_data.cust_first_name} {user_data.cust_last_name}</p> */}
            </Col>
          </div>

        </div>

        <div className="side-menu px-4 mx-2 pb-5">
          <ul className="list-unstyled">
            <li className={location.pathname.split('/')[3] == 'Orders' ? 'active' : ''} > <LinkComponent className="" href="/Profile/Orders"> <div><LazyLoadImage src={`${img_url}assets/images/profile/Group24593.png`} alt="sedarglobal" /> <span> {t('MyOrders')} </span> </div> <RiArrowRightSLine size={28} color="#000" /></LinkComponent></li>
            {/* <li className={location.pathname.split('/')[3] == 'WishList' ? 'active' : ''} > <LinkComponent href={`/WishList`} onClick={refreshPage}> <div><LazyLoadImage src={`${img_url}assets/images/profile/20.png`} alt="sedarglobal" /><span>  {t('MyFavourites')} </span></div> <RiArrowRightSLine size={28} color="#000" /></LinkComponent></li> */}
            <li className={location.pathname.split('/')[3] == 'account-setting' ? 'active' : ''}> <LinkComponent href="/profile/account-setting"> <div><LazyLoadImage src={`${img_url}assets/images/profile/Group24594.png`} alt="sedarglobal" /><span>{t('AccountSettings')}  </span></div> <RiArrowRightSLine size={28} color="#000" /></LinkComponent></li>
            <li className={location.pathname.split('/')[3] == 'saved-card' ? 'active' : ''} > <LinkComponent href="/profile/card"> <div><LazyLoadImage src={`${img_url}assets/images/profile/Group24596.png`} alt="sedarglobal" /><span> {t('SavedCards')} </span></div> <RiArrowRightSLine size={28} color="#000" /></LinkComponent></li>
            <li className={location.pathname.split('/')[3] == 'address-list' ? 'active' : ''} > <LinkComponent href="/profile/address-list" > <div><LazyLoadImage src={`${img_url}assets/images/profile/Group24595.png`} alt="sedarglobal" /><span>{t('Addressbook')}  </span></div>  <RiArrowRightSLine size={28} color="#000" /></LinkComponent></li>
          </ul>
          <div className="logout pt-3">
            <div className="border-button">
              <LinkComponent className="p-2 my-4" href="/" onClick={() => props.user_dispatch(GLOBALS.user_reducer.LOGOUT_USER)} > <div><LazyLoadImage src={`${img_url}assets/images/profile/logout.png`} alt="sedarglobal" /></div>  <span> {t('SignOut')}  </span></LinkComponent>
            </div>
          </div>
        </div>
        <ChangeProfilePic show={imageModalShow}
          onHide={() => setImageModalShow(false)}
          userProfielFun={props.userProfielFun}
          currentImage={cust_photo && cust_photo}
        />


      </div>
      {/* <div className="d-none d-sm-block p-5 m-5 text-center w-100">
       <LinkComponent href="/profile/account-setting" className="w-100 d-block text-dark" ><LazyLoadImage effect="" src={`${img_url}assets/images/profile/Group24594.png`} alt="sedarglobal"  /><span> {t('AccountSettings')}  </span><RiArrowRightSLine size={28} color="#000" /></LinkComponent>
      </div> */}
    </>
  )
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer, numberCart: state.cart.numberCart });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileMobileSidebarPage);


