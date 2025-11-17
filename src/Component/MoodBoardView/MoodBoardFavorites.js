import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, connect } from "react-redux";
import { Container, Row, Col, Breadcrumb, Tabs, Tab } from 'react-bootstrap';
// import './MoodBoardView.scss';
// import { t_lang } from '../../services/i18n';
// import MoodBoardModal from '../Modals/WishList/MoodBoard';
// import ApiDataService from '../../services/ApiDataService';
// import { fetchFavorites } from '../../Redux-Config/Actions';

// import Material from '../MaterialList/Material';
// import { defaultLocale } from '../../i18n';

// import LoginModal from '../Modals/LoginModal';
import { useTranslation } from 'next-i18next';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
// import SignupModal from '../Modals/SignupModal';
// import ForgotPwdModal from '../Modals/ForgotPwdModal';
const LoginModal = dynamic(() => import("../Modals/LoginModal"), { ssr: false })
const SignupModal = dynamic(() => import("../Modals/SignupModal"), { ssr: false })
const ForgotPwdModal = dynamic(() => import("../Modals/ForgotPwdModal"), { ssr: false })

const MoodBoardView = (props) => {
  const { t } = useTranslation("common");
  let i = 0;
  let user_info = props.user_state ? props.user_state.user_info : null;
  let auth_token = Cookies.get('AUTH_TOKEN');
  // if (user_info == null || auth_token == null || auth_token.length == null) {
  //   return <Redirect to={`/${defaultLocale}`} />;
  // }
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [signupModalShow, setSignupModalShow] = useState(false);
  const [forgotPwdModalShow, setforgotPwdModalShow] = useState(false);


  // const [moodboard, setMoodBoard] = useState(false);
  // const [tabKey, setTabKey] = useState(0);
  // const [moodlist, setMoodlist] = useState([]);
  // const listings = useSelector(store => store.favoritesReducer.data);
  const dispatch = useDispatch();

  ////console.log(listings);

  // useEffect(() => {
  //   ////console.log(moodlist.length)
  //   if (moodlist.length == 0) {
  //     ApiDataService.getAll('mood_board/fetch')
  //       .then(response => {
  //         setMoodlist(response.data.result);
  //       }
  //       )
  //   }
  // }, [])

  // useEffect(() => {
  //   fetchFavorites()(dispatch)
  // }, [])

  // const removeMoodBoard = (id) => (
  //   ApiDataService.post('mood_board/delete_mood_board')
  //     .then(response => {
  //       setMoodlist(response.data.result);
  //     }
  //     )
  // );

  return (
    <>
      <div className="MoodBoardView">
        <Container>
          <Row className="d-none d-sm-block">
            <Col className='pt-5'>
              <Breadcrumb>
                <Breadcrumb.Item href={"/"}>{t("Home")}</Breadcrumb.Item>
                <Breadcrumb.Item active> {t("Wishlist")} </Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col sm={8} className="d-none d-sm-block" >
              <h3>{t("MyFavorites")}
                {/* <span>( 0 {t("items")} )</span> */}
              </h3>
            </Col>
            <Col sm={4} className="divSpan text-center text-sm-end">
              {/* <span>Already have an Account ?</span> <span>Sign in</span> */}
              {user_info == null || auth_token == null || auth_token.length == null ? <><span>Already have an Account ?</span> <span style={{ color: '#FF7500', cursor: 'pointer' }} onClick={() => setLoginModalShow(true)} > Sign in</span></> : ''}

            </Col>
            <Col>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col className="mood-boards">
              <h3> {t("MoodBoards")} </h3>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Tabs defaultActiveKey={0} id="uncontrolled-tab-example" className="mb-3 flex-row desk-tabnav flex-nowrap hidescroll">
                {/* {listings.length > 0 && listings.map((row, key) => (
                  Object.keys(row).map((key, j) => {
                    return (
                      <Tab key={`key-${row}`} eventKey={j} title={row[key].desc}>
                        <Material listings={row[key].material} data={props} page_name="moodboards-favorites" />
                      </Tab>
                    )
                  }
                  )
                <Tab eventKey={key} title={row.desc}>
                  <Material listings={row.material} data={props} page_name="moodboards-favorites" />
                </Tab>
                ))} */}
              </Tabs>
            </Col>
          </Row>
        </Container>
      </div>

      {loginModalShow &&
        <LoginModal loginShow={loginModalShow} loginOnHide={() => setLoginModalShow(false)} onShowSignup={() => setSignupModalShow(true)} onShowForgotPWD={() => setforgotPwdModalShow(true)} />
      }
      {signupModalShow &&
        <SignupModal signupShow={signupModalShow} SignupOnHide={() => setSignupModalShow(false)} onShowLogin={() => setLoginModalShow(true)} onShowForgotPWD={() => setforgotPwdModalShow(true)} />
      }
      {forgotPwdModalShow &&
        <ForgotPwdModal forgotShow={forgotPwdModalShow} ForgotOnHide={() => setforgotPwdModalShow(false)} onShowLogin={() => setLoginModalShow(true)} onShowSignup={() => setSignupModalShow(true)} />
      }
    </>
  );
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MoodBoardView);