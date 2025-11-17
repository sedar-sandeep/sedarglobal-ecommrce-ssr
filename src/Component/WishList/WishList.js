import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { Container, Row, Col, Breadcrumb, Image, Card } from 'react-bootstrap';
import { connect } from "react-redux";
import LinkComponent from '@components/Link';
// import LoginModal from '../Modals/LoginModal';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';


const LoginModal = dynamic(() => import("../Modals/LoginModal"), { ssr: false })
const WishList = (props) => {
  const { t } = useTranslation("common");
  let user_info = props.user_state ? props.user_state.user_info : null;
  let auth_token = Cookies.get('AUTH_TOKEN');


  const [loginModalShow, setLoginModalShow] = useState(false);

  return (
    <div className="WishList">
      <Container>
        <Row className="d-none d-sm-block">
          <Col className='pt-5' sm={12}>
            <Breadcrumb>
              <Breadcrumb.Item href={"/"}>{t("Home")}</Breadcrumb.Item>
              <Breadcrumb.Item active> {t("Wishlist")} </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col sm={8} className="d-none d-sm-block" >
            <h3>{t("MyFavorites")}  <span>( 0 {t("items")} )</span></h3>
          </Col>
          <Col sm={4} className="divSpan text-center text-sm-end">
            {/* <span>Already have an Account ?</span> <span>Sign in</span> */}
            {user_info == null || auth_token == null || auth_token.length == null ? <><span>Already have an Account ?</span> <span style={{ color: '#FF7500', cursor: 'pointer' }} onClick={() => setLoginModalShow(true)} > Sign in</span></> : ''}

          </Col>
          <Col>
            <hr />
          </Col>
        </Row>
        <Row className="py-2 py-md-5 d-none d-sm-block">
          <Col className="cardHeading">
            <h3>{t("CreateyourFavouriteMoodBoards")}  </h3>
          </Col>
        </Row>
        <Row className="py-1">
          <Col sm={6} lg={4} className="moodBoardCard py-3 px-md-4">
            <Card className='rounded-md-0 '>
              <Card.Body className='px-3 px-sm-5 py-4 py-sm-4'>
                <Row className="px-3 px-sm-0 align-items-baseline">
                  <Col sm={12} xs={2} className="px-0">
                    <Card.Title className='wishBoardNum'>01</Card.Title>
                  </Col>
                  <Col sm={12} xs={2} className="px-0">
                    <div className='text-center wishBoardText'>
                      <Image src={`/assets/images/wishlist/Path28516.png`} className="p-2" />
                    </div>
                  </Col>
                  <Col sm={12} xs={8} className="px-0">
                    <p className='wishBoardBottomText text-center'>{t("SaveittoFavourites")} </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

          </Col>
          <Col sm={6} lg={4} className="moodBoardCard py-3 px-md-4">
            <LinkComponent href="moodboards">
              <Card className='rounded-md-0 '>
                <Card.Body className='px-3 px-sm-5 py-3 py-sm-4'>
                  <Row className="px-3 px-sm-0 align-items-center">

                    <Col sm={12} xs={2} className="px-0">
                      <Card.Title className='wishBoardNum '>02</Card.Title>
                    </Col>
                    <Col sm={12} xs={3} className="px-2">
                      <div className='text-center wishBoardText'>
                        <div className='centerBox py-2 px-2 px-sm-4 m-0 m-sm-2'>
                          <p className='text-start py-1 smallText'> {t("ForMyRoom")} </p>
                          <Image src={`/assets/images/wishlist/Group23929.png`} className="p-2" />
                        </div>
                      </div>
                    </Col>
                    <Col sm={12} xs={7} className="px-0">
                      <p className='wishBoardBottomText text-center'>{t("CreateaModeBoard")} </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </LinkComponent>

          </Col>
          <Col sm={6} lg={4} className="moodBoardCard py-3 px-md-4">
            <LinkComponent href="moodboards-favorites">
              <Card className='rounded-md-0'>
                <Card.Body className='px-3 px-sm-5 py-2 py-sm-4'>
                  <Row className="px-3 px-sm-0 align-items-center">
                    <Col sm={12} xs={2} className="px-0">
                      <Card.Title className='wishBoardNum '>03  </Card.Title>
                    </Col>
                    <Col sm={12} xs={3} className="px-0">
                      <div className='text-start text-sm-center wishBoardText last'>
                        <span className='text-center py-1 smallText'>{t("ForMyRoom")} </span>
                        <div className='text-start gridGroup'>
                          <Image src={`/assets/images/wishlist/Group25878.png`} className="m-sm-2" />
                          <Image src={`/assets/images/wishlist/Group25879.png`} className="m-sm-2" />
                          <Image src={`/assets/images/wishlist/Group25880.png`} className="m-sm-2" />
                        </div>
                      </div>
                    </Col>
                    <Col sm={12} xs={7} className="px-0">
                      <p className='wishBoardBottomText text-center'>{t("SeeitallTogether")}  </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </LinkComponent>
          </Col>
        </Row>
      </Container>
      {loginModalShow &&
        <LoginModal loginShow={loginModalShow} loginOnHide={() => setLoginModalShow(false)} onShowSignup={() => setSignupModalShow(true)} onShowForgotPWD={() => setforgotPwdModalShow(true)} />
      }
      {/* <SignupModal signupShow={signupModalShow} SignupOnHide={() => setSignupModalShow(false)} onShowLogin={() => setLoginModalShow(true)} onShowForgotPWD={() => setforgotPwdModalShow(true)} />
      <ForgotPwdModal forgotShow={forgotPwdModalShow} ForgotOnHide={() => setforgotPwdModalShow(false)} onShowLogin={() => setLoginModalShow(true)} onShowSignup={() => setSignupModalShow(true)} /> */}
    </div>
  );
}



const mapStateToProps = (state) => ({ user_state: state.UserReducer });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WishList);

