import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
// import './OffcanvasMenus.scss';
import { BiUser } from 'react-icons/bi';
import { IoCloseSharp } from 'react-icons/io5';
import { RiArrowRightSLine, RiArrowDownSLine } from 'react-icons/ri';
import GLOBALS from '../../Globals';

import { useTranslation } from 'next-i18next';
import { connect, useSelector } from "react-redux";

import { HeaderContext } from '../Header/Header';
import { LazyLoadImage } from "react-lazy-load-image-component";

import { countryName, langName } from "@utils/i18n";
import LinkComponent from "@components/Link";
import { countries_url_path } from "@utils/countriesData";
import dynamic from "next/dynamic";
import { Container, Navbar, Offcanvas, Accordion, AccordionContext, useAccordionButton } from 'react-bootstrap';
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const LoginModal = dynamic(() => import('..//Modals/LoginModal'), { ssr: false });
const SignupModal = dynamic(() => import('../Modals/SignupModal'), { ssr: false });
const ForgotPwdModal = dynamic(() => import('../Modals/ForgotPwdModal'), { ssr: false });
const GuestUserFormModal = dynamic(() => import('../Modals/GuestUserFormModal'), { ssr: false });

const SideNavbar = (props) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const { header_state } = useContext(HeaderContext)
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [signupModalShow, setSignupModalShow] = useState(false);
  const [forgotPwdModalShow, setforgotPwdModalShow] = useState(false);
  const [GuestUserFormModalShow, setguestUserFormModalShow] = useState(false);

  const [user_state, setuser_state] = useState([]);

  const [currentLanguageCode, setCurrentLanguageCode] = useState(langName);
  const [CountryList, setCountryList] = useState('');
  const [Languages, setLanguages] = useState('');
  const [UserMenu, setUserMenu] = useState('');
  // const siteDe = useSelector(store => store.MenusItemReduser.siteDetail);
  let cn_iso = props?.value?.RESULT && props?.value?.RESULT?.COMMON?.length > 0 && props?.value?.RESULT?.COMMON[0]?.primary_ref_cn_iso;
  let show_price_yn = props?.value?.RESULT && props?.value?.RESULT?.COMMON?.length > 0 && props?.value?.RESULT?.COMMON[0]?.show_price_yn;


  useEffect(() => {
    // console.log(header_state?.topbar.CHILD[1].SUB_CHILD, 'SideNavbar111');

    setCountryList(header_state?.topbar && header_state?.topbar.CHILD && header_state?.topbar.CHILD[1] && header_state?.topbar.CHILD[1].SUB_CHILD[4] && header_state?.topbar.CHILD[1].SUB_CHILD[4].GRAND_CHILD)
    setLanguages(header_state?.topbar && header_state?.topbar.CHILD && header_state?.topbar.CHILD[1] && header_state?.topbar.CHILD[1].SUB_CHILD[5] && header_state?.topbar.CHILD[1].SUB_CHILD[5].GRAND_CHILD)
    setUserMenu(header_state?.header_mid_section && header_state?.header_mid_section.CHILD && header_state?.header_mid_section.CHILD[4])
  }, [props && header_state?.header_mid_section]);

  const changeLanguage = (lng) => {
    Cookies.set('i18next', lng);
    //console.log("i18nextrt", lng)
    setCurrentLanguageCode(lng);
    const country = Cookies.get('country') || "global";
    router.replace(router.asPath, router.asPath, { locale: `${country}-${lng}` });
    router.events.on('routeChangeComplete', () => {
      router.reload()
    });
  }

  function CustomToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );
    return (
      <div onClick={decoratedOnClick}>
        {children}
        <span className="iconcollapse float-end">
          {currentEventKey.activeEventKey != undefined && currentEventKey.activeEventKey.indexOf(eventKey) != -1 ? <RiArrowDownSLine size={25} /> : <RiArrowRightSLine size={25} />}
        </span>
      </div>
    );
  }

  function CustomCountryToggle({ children, eventKey, callback, CountryList }) {
    const currentEventKey = useContext(AccordionContext);

    console.log(currentLanguageCode, 'currentLanguageCode')
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );
    //console.log(currentEventKey);
    //let style_css = currentLanguageCode == 'ar' ? 'left:0' : 'right:0';
    return (
      <div onClick={decoratedOnClick}>
        {children}
        {CountryList && CountryList.map(function (data, index) {
          return (
            <React.Fragment key={index}>
              {data.link_url && data.link_url.toLowerCase() === countryName.toLowerCase() ?
                <span className="iconcollapse float-end">
                  <LazyLoadImage effect="blur" style={{ height: '22px', width: "22px" }} src={data.image_path} className="flag_icon me-2" alt="sedarglobal" width="22" height="22" />
                  {/* {data.content} */}
                  {currentEventKey.activeEventKey != undefined && currentEventKey.activeEventKey.indexOf(eventKey) != -1 ? <RiArrowRightSLine size={25} /> : <RiArrowRightSLine size={25} />}
                </span>
                :
                ''}
            </React.Fragment>
          )
        })}

      </div>
    );
  }

  return (
    <>
      <Container fluid className="SideNavbar">
        <Navbar.Offcanvas
          id="SideNavbar"
          aria-labelledby="SideNavbarLabel"
          placement="start"
          show={props.showside && props.showside}  {...props} >
          <Offcanvas.Body className="mobilenav pt-2 px-0">

            <div id="wrapper">
              <div className="menu__wrap">
                <ul className="submenu main_navigation px-0">
                  {UserMenu != undefined && UserMenu.SUB_CHILD != undefined && UserMenu.applicable_countries.indexOf(cn_iso) >= 0 ? (
                    <li>
                      {props?.user_state.isLoggedIn ? <>
                        <div className="offcanvasNavbarloginlabel d-flex align-items-center pb-0 mt-3 px-2 position-relative">
                          <span className="d-flex align-items-center" >
                            <BiUser size={25} />
                            <label className="ps-2 pb-2" onClick={props.onHide}>
                              {props?.user_state && props?.user_state.user_info.cust_cr_uid === 'GUEST-USER' ? t('Hi_Guest') :
                                props?.user_state && props?.user_state.user_info.cust_first_name + ' ' + props?.user_state.user_info.cust_last_name}
                            </label>
                          </span>
                          {currentLanguageCode == 'ar' ?
                            <IoCloseSharp role="button" onClick={props.onHide} size={30} className="text-dark position-absolute top-50 translate-middle-y " style={{ left: 0 }} />
                            : <IoCloseSharp role="button" onClick={props.onHide} size={30} className="text-dark position-absolute top-50 translate-middle-y" style={{ right: 0 }} />
                          }
                        </div>
                      </>
                        : <>
                          <div className="offcanvasNavbarloginlabel d-flex align-items-center pb-0 mt-3 px-2 position-relative">
                            <span className="d-flex align-items-center Main_Header_Login_Button" onClick={() => setLoginModalShow(true)}>
                              <BiUser size={25} /> <label className="ps-3">{t("LoginAndSignUp")}</label>
                            </span>
                            {currentLanguageCode == 'ar' ?
                              <IoCloseSharp role="button" onClick={props.onHide} size={30} className="text-dark position-absolute top-50 translate-middle-y" style={{ left: 0 }} />
                              : <IoCloseSharp role="button" onClick={props.onHide} size={30} className="text-dark position-absolute top-50 translate-middle-y" style={{ right: 0 }} />
                            }
                          </div>
                        </>
                      }


                    </li>
                  ) : (
                    <li>
                      <div className="offcanvasNavbarloginlabel d-flex align-items-center pb-0 mt-3 px-2 position-relative">
                        {currentLanguageCode == 'ar' ?
                          <IoCloseSharp role="button" onClick={props.onHide} size={30} className="text-dark position-absolute top-50 translate-middle-y" style={{ left: 0 }} />
                          :
                          <IoCloseSharp role="button" onClick={props.onHide} size={30} className="text-dark position-absolute top-50 translate-middle-y" style={{ right: 0 }} />
                        }
                      </div>
                    </li>
                  )}


                  <Accordion defaultActiveKey="0" >
                    <Accordion.Item eventKey="0" alwaysOpen style={{ border: 0 }}>
                      <Accordion.Header className="offCanvas-product" as="p">
                        <label style={{ fontSize: '18px' }}>
                          <CustomToggle eventKey={0}>{t("Products")}</CustomToggle>
                        </label>
                      </Accordion.Header>
                      <Accordion.Body style={{ padding: 0 }}>
                        <ul className="submenu px-0">
                          {props.value.CHILD && props.value.CHILD.map(function (row, index) {
                            if ((props.value.CHILD.length - 2) > index) {
                              return (
                                <li key={index} className="border-bottom" style={{ padding: '10px 20px' }} onClick={props.onHide}>
                                  <label>
                                    <LinkComponent href={row.redirect_to_type == 'OTHER' ? '/' + row.redirect_url : '/' + row.link_url}>{row.content} <RiArrowRightSLine size={25} /></LinkComponent>

                                  </label>
                                </li>
                              )
                            } else {
                              return (<></>);
                            }
                          })}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>

                  </Accordion>

                  <div className="py-2 pt-4 menuSpace">
                    {props.value.CHILD && props.value.CHILD.map(function (row, index) {
                      if ((props.value.CHILD.length - 3) < index) {
                        return (
                          <li key={index} className="border-bottom" onClick={props.onHide}>
                            <label> <LinkComponent href={row.redirect_to_type == 'OTHER' ? row.redirect_url : row.link_url} >{row.content}</LinkComponent></label>
                          </li>
                        )
                      } else {
                        return (<></>);
                      }
                    })}
                  </div>

                  <li className="border-bottom d-none">
                    <label onClick={props.onHide} className='' htmlFor="GiftCards"> <LinkComponent href={"/"} > {t("GiftCards")} </LinkComponent></label>
                  </li>
                  {UserMenu != undefined && UserMenu.SUB_CHILD != undefined && UserMenu.applicable_countries.indexOf(cn_iso) >= 0 && props?.user_state.isLoggedIn && props?.user_state.user_info.cust_cr_uid != 'GUEST-USER' ?
                    <div className="py-2 pt-4 menuSpace">
                      <li className="border-bottom">
                        <label onClick={props.onHide} className='' htmlFor="profile"> <LinkComponent href="/profile" > {t("MyAccount")} </LinkComponent></label>
                      </li>
                      <li className="border-bottom">
                        <label onClick={props.onHide} className='' htmlFor="Profile/Orders"> <LinkComponent href="/Profile/Orders" > {t("MyOrders")} </LinkComponent></label>
                      </li>
                      <li className="border-bottom">
                        <label onClick={props.onHide} className='' htmlFor="profile"> <LinkComponent href="/cartPage" > {t("MyCart")} </LinkComponent></label>
                      </li>
                      {/* <li className="border-bottom">
                        <label onClick={props.onHide} className='' htmlFor="profile"> <LinkComponent href="/wishlist" > {t("MyWishlist")} </LinkComponent></label>
                      </li> */}
                    </div> : ''}
                  <div className="py-3 menuSpace">
                    <li className="border-bottom">
                      <label onClick={props.onHide} className='' htmlFor="profile"> <LinkComponent href="/about" > {t("AboutUs")}</LinkComponent></label>
                    </li>
                    <li className="border-bottom">
                      <label onClick={props.onHide} className='' htmlFor="profile"> <LinkComponent href="/contact" > {t("ContactUs")} </LinkComponent></label>
                    </li>
                  </div>

                  <div className="py-2 menuSpace">

                    <Accordion>
                      <Accordion.Item style={{ border: 0 }}>
                        <Accordion.Header className="offCanvas-product" as="p">
                          <label style={{ fontSize: '18px' }}>

                            <CustomCountryToggle CountryList={CountryList}>
                              {t("CountryIn")}
                            </CustomCountryToggle>
                          </label>
                        </Accordion.Header>
                        <Accordion.Body style={{ padding: 0 }}>
                          <ul className="submenu">
                            {CountryList && CountryList.map(function (data, index) {
                              return (
                                <React.Fragment key={index}>
                                  {data.link_url && data.link_url.toUpperCase() === countryName.toUpperCase() ? '' :
                                    <li>
                                      <a href={`/${data.link_url ? data.link_url.toLowerCase() + '-' + currentLanguageCode : ''}${router.asPath}`} >
                                        <label className='menu__trigger p-0' htmlFor={`menu` + 1}>
                                          <span role="button" >
                                            <LazyLoadImage effect="blur" style={{ height: '22px', width: "22px" }} src={data.image_path} className="flag_icon me-2" alt="sedarglobal" />
                                            <span className="float-end"> {data.content}</span>
                                          </span>
                                          <RiArrowRightSLine size={25} />
                                        </label>
                                      </a>
                                    </li>
                                  }
                                </React.Fragment>

                              )
                            })}

                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>

                    </Accordion>

                    <Accordion className="border-bottom">

                      <Accordion.Item eventKey="2" style={{ border: 0 }}>
                        <Accordion.Header className="offCanvas-product langCountry" as="p">
                          <CustomToggle eventKey={2}>
                            <label style={{ fontSize: '18px' }}>{t("Languages")}
                              <span className="float-end"> {langName.toUpperCase()}</span>
                            </label>
                          </CustomToggle>
                        </Accordion.Header>
                        <Accordion.Body style={{ padding: 0 }}>
                          <ul className="submenu px-0">
                            {Languages && Languages.map(function (data, index) {
                              return (
                                <React.Fragment key={index}>

                                  {data.link_title.toLowerCase() === langName.toLowerCase() ? '' :
                                    <p onClick={() => changeLanguage(data.link_title)}>
                                      <li className="">
                                        <label className='menu__trigger p-0' htmlFor={`menu` + 1}>
                                          <span role="button" >
                                            <span className="float-end"> {data.content}</span>
                                          </span>
                                          <RiArrowRightSLine size={25} />
                                        </label>
                                      </li>
                                    </p>
                                  }
                                </React.Fragment>
                              )
                            })}
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>

                  </div>
                  {UserMenu != undefined && UserMenu.SUB_CHILD != undefined && UserMenu.applicable_countries.indexOf(cn_iso) >= 0 && props?.user_state.isLoggedIn ?
                    <div className="py-2 pt-4 menuSpace">
                      <li className="border-bottom">
                        <label onClick={() => { props.onHide(); props.user_dispatch(GLOBALS.user_reducer.LOGOUT_USER) }} className='' htmlFor="profile"> {t("LogOut")}    </label>
                      </li>
                    </div> : ''}
                </ul>
              </div>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
      {loginModalShow &&
        <LoginModal loginShow={loginModalShow} loginOnHide={() => setLoginModalShow(false)} onShowSignup={() => setSignupModalShow(true)} onShowForgotPWD={() => setforgotPwdModalShow(true)} onShowGuest={() => setguestUserFormModalShow(true)} />
      }
      {signupModalShow &&
        <SignupModal signupShow={signupModalShow} SignupOnHide={() => setSignupModalShow(false)} onShowLogin={() => setLoginModalShow(true)} onShowForgotPWD={() => setforgotPwdModalShow(true)} />
      }
      {forgotPwdModalShow &&
        <ForgotPwdModal forgotShow={forgotPwdModalShow} ForgotOnHide={() => setforgotPwdModalShow(false)} onShowLogin={() => setLoginModalShow(true)} onShowSignup={() => setSignupModalShow(true)} />
      }
      {GuestUserFormModalShow &&
        <GuestUserFormModal guestFormShow={GuestUserFormModalShow} guestOnHide={() => setguestUserFormModalShow(false)} onShowLogin={() => setLoginModalShow(true)} />
      }

    </>

  );
}



SideNavbar.propTypes = {};

SideNavbar.defaultProps = {};


const mapStateToProps = (state) => ({ user_state: state.UserReducer, numberCart: state.cart.numberCart });
const mapDispatchToProps = (dispatch) => {
  return {
    user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SideNavbar);
