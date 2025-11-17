import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { connect } from "react-redux";
import ApiDataService from '../../services/ApiDataService';
import LinkComponent from '@components/Link';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const LoginModal = dynamic(() => import("../Modals/LoginModal"), { ssr: false })
const SignupModal = dynamic(() => import("../Modals/SignupModal"), { ssr: false })
const ForgotPwdModal = dynamic(() => import("../Modals/ForgotPwdModal"), { ssr: false })

const MoodBoardView = (props) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  let user_info = props.user_state ? props.user_state.user_info : null;
  let auth_token = user_info && user_info.auth_token ? user_info.auth_token : null;

  console.log(user_info, 'moodboards', auth_token);

  const [moodboard, setMoodBoard] = useState(false);
  const [moodlist, setMoodlist] = useState([]);

  const [loginModalShow, setLoginModalShow] = useState(false);
  const [signupModalShow, setSignupModalShow] = useState(false);
  const [forgotPwdModalShow, setforgotPwdModalShow] = useState(false);





  useEffect(() => {

    if (moodlist.length == 0) {
      ApiDataService.getAll('mood_board/fetch')
        .then(response => {
          setMoodlist(response.data.result);
        }
        )
    }
    if (user_info == null || auth_token == null) {
      router?.push('/');
    }
  }, [moodlist])


  const removeMoodBoard = (id) => (
    ApiDataService.post('mood_board/delete_mood_board')
      .then(response => {
        setMoodlist(response.data.result);
      }
      )
  );

  return (
    <>
      <div className="MoodBoardView">
        <Container>
          <Row className="d-none d-sm-block">
            <Col className='pt-5 '>
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
              <h3>{t("MoodBoards")}</h3>
            </Col>
          </Row>
          <Row>
            <Col sm={3} className="create-new-list" onClick={() => setMoodBoard({ show: true })}>
              <span>{t("CreateNewList")} </span>
            </Col>
            {moodlist.length > 0 && moodlist.map(row => (
              <Col key={`index-${row}`} sm={3} className="create-new-list">
                <LinkComponent href="moodboards-favorites">{row.desc}</LinkComponent>

                {/* <BsFillTrashFill onClick={() => removeMoodBoard(row.code)} /> */}

              </Col>
            ))}

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
