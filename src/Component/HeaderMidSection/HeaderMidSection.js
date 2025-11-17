import { cn_iso, defaultLocale } from '@utils/i18n';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Dropdown, Container } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsCart3 } from 'react-icons/bs';
import { BiArrowBack } from 'react-icons/bi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { HeaderContext } from '../Header/Header';
// import { useDevice } from '../Utility/useDevice';
import { isMobile } from "react-device-detect";
import { RiSearchLine } from 'react-icons/ri'
import LinkComponent from '@components/Link';
import dynamic from 'next/dynamic';
import SeoHeader from '@components/seoHeader';
import CanonicalTag from '@components/canonicalTag';
import { connect, useDispatch } from "react-redux";
import Globals from 'src/Globals';
import { IconComponent } from '@components/image';
import WebSiteShema from '@components/websiteSchema';
import { useWindowSize } from '@components/WindowSize';
import LanguageDropdown from 'src/Component/LanguageDropdown/LanguageDropDown';
const Searchbox = dynamic(() => import('../Searchbox/index'));
const Logo = dynamic(() => import('../Logo/index'));
const LoginModal = dynamic(() => import('../Modals/LoginModal'), { ssr: false });
const SignupModal = dynamic(() => import('../Modals/SignupModal'), { ssr: false });
const ForgotPwdModal = dynamic(() => import('../Modals/ForgotPwdModal'), { ssr: false });
const GuestUserFormModal = dynamic(() => import('../Modals/GuestUserFormModal'), { ssr: false });
const SideNavbar = dynamic(() => import('../OffcanvasMenus/SideNavbar'), { ssr: false });
const SearchModal = dynamic(() => import('../Modals/SearchModal'), { ssr: false });



const Searchbar = ({ data }) => {





    if (data?.CHILD) {
        if (data?.CHILD[0] && data?.CHILD[0]?.SUB_CHILD) {
            if (data?.CHILD[0]?.SUB_CHILD[1]) {
                return (
                    <Searchbox />
                );
            } else {
                return '';
            }

        }
    } else {
        return false;
    }
};


const Quickmenu = ({ data }) => {
    // console.log(data, 'hahiai');
    if (data == undefined) {
        return false;
    }

    return (
        <div className="quickmenu">
            {data &&
                <div className='d-none d-xl-block'>
                    <ul className="list-group list-group-horizontal justify-content-between">
                        {data && data.map(function (row, i) {
                            if (i < 4 && i != 0) {
                                return (
                                    <React.Fragment key={i}>
                                        {cn_iso && row.applicable_countries.indexOf(cn_iso) >= 0 && (
                                            <li className={`quickmenu-list-Item d-flex ${row?.link_url == 'free-consultation' ? 'Consultation_Desktop_Header' : ''}`}>
                                                <LinkComponent href={row.link_url} >
                                                    <IconComponent
                                                        src={row.image_path}
                                                        alt={row?.image_alt_seo || 'Sedar Global'}
                                                        width={32}
                                                        height={24}
                                                        content={row.content}
                                                    />
                                                </LinkComponent>
                                            </li>
                                        )}
                                    </React.Fragment>
                                )
                            } else {
                                return ('');
                            }
                        })
                        }
                    </ul>
                </div>
            }
        </div>
    );
};

const MobileQuickmenu = ({ data }) => {
    const router = useRouter()
    return (
        <>
            {router.pathname == '/' ?

                <div className="moiblequickmenu d-block d-md-none max_content container-fluid">
                    <ul className="list-group list-group-horizontal">
                        {data && data[3] ? (<li>  <LinkComponent href={data[3]?.link_url} className="btn btn-light px-3" >
                            <IconComponent
                                src={data[3]?.image_path}
                                alt={data[3]?.image_alt_seo || 'Sedar Global'}
                                width={32}
                                height={24}
                                content={data[3]?.content}
                                spanClass="ps-2"
                            />

                        </LinkComponent> </li>) : ''}
                        {data && data[1] ? (<li>
                            <LinkComponent href={data[1]?.link_url} className="btn btn-light px-3" >
                                <IconComponent
                                    src={data[1]?.image_path}
                                    alt={data[1]?.image_alt_seo || 'Sedar Global'}
                                    width={32}
                                    height={24}
                                    content={data[1]?.content}
                                    spanClass="ps-2"
                                />
                            </LinkComponent> </li>) : ''}
                    </ul>
                </div>
                :
                ''
            }
        </>
    );
}

const Usermenu = (props) => {
    // console.log(props, 'hahiai');
    // const { isMOBILE, isTABLET, isLAPTOP, isDESKTOP } = useDevice();
    const { t } = useTranslation('common');

    // const { header_state, headerDispatch } = useContext(HeaderContext);
    let login_link = '';
    const [modalShowSearch, setModalShowSearch] = useState(false);

    if (props?.usermenu && props?.usermenu[4]) {
        if (props.usermenu[4].SUB_CHILD != undefined && props.usermenu[4].SUB_CHILD[0] != undefined) {
            login_link = <li className="login me-3 d-none d-md-block Main_Header_Login_Button" onClick={props.onShow}>
                {/* <span className="pe-3">{t('login')} </span> */}
                {/* <LazyLoadImage effect="" src={`/assets/icon/Group 24620.png`} alt="sedarglobal" className="loginimg" width="auto" height="auto" /> */}
                <IconComponent
                    classprops="loginimg"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}assets/icon/Group 24620.png`}
                    alt={'Sedar Global'}
                    width={18}
                    height={18}
                    content={t('login')}
                    content_align="left"
                />
            </li>


            if (props?.user_state && props?.user_state?.isLoggedIn) {
                let user_info = props?.user_state?.user_info;
                if (user_info.cust_cr_uid === 'GUEST-USER') {
                    login_link = <>
                        <li className="logout login me-2 me-md-3 d-none d-md-block" >
                            <div className="dropdown user-utility-menu" >
                                <Dropdown>
                                    <Dropdown.Toggle as="span" bsPrefix="">
                                        <span className="d-flex" id="usernavbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ cursor: 'pointer' }}>
                                            <div className="me-3 overflow-hidden" > {t('Hi_Guest')}</div>  <LazyLoadImage effect="" src={`${process.env.NEXT_PUBLIC_IMAGE_URL}assets/icon/Group 24620.png`} alt="sedarglobal" className="loginimg" />
                                        </span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as="span">
                                            <p className="dropdown-item" onClick={() =>
                                                props.user_dispatch(Globals.user_reducer.LOGOUT_USER)
                                            }>
                                                <IconComponent
                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}assets/images/profile/logout.png`}
                                                    alt={'Sedar Global'}
                                                    width={18}
                                                    height={18}
                                                    content={t("SignOut")}
                                                    justifyContent={'left'}
                                                />
                                            </p>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </li>
                    </>
                } else {
                    login_link =
                        <>
                            <li className="logout login me-2 me-md-3   d-none d-md-block">
                                <div className="position-relative">
                                    <div className="dropdown user-utility-menu" >
                                        <Dropdown>
                                            <Dropdown.Toggle as="span" bsPrefix="">
                                                <span className="d-flex" id="usernavbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ cursor: 'pointer' }}>
                                                    <div className="me-3 overflow-hidden" > {user_info && user_info.cust_first_name ? `${user_info.cust_first_name.substring(0, 8)}..` : ''}</div>

                                                    <IconComponent
                                                        classprops="loginimg"
                                                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}assets/icon/Group 24620.png`}
                                                        alt={'Sedar Global'}
                                                        width={18}
                                                        height={18}
                                                    />
                                                </span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item as="span">
                                                    <LinkComponent className="dropdown-item" href="/profile/account-setting">
                                                        {/* <LazyLoadImage effect="" src={`/assets/images/profile/Group24594.png`} alt="sedarglobal" width="auto" height="auto" /> */}
                                                        <IconComponent
                                                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}assets/images/profile/Group24594.png`}
                                                            alt={'Sedar Global'}
                                                            width={18}
                                                            height={18}
                                                            content={t("MyAccount")}
                                                        />

                                                    </LinkComponent>
                                                </Dropdown.Item>
                                                <Dropdown.Item as="span">
                                                    <LinkComponent className="dropdown-item" href="/profile/orders">
                                                        {/* <LazyLoadImage effect="" src={`/assets/images/profile/Group24593.png`} alt="sedarglobal" width="auto" height="auto" /> */}
                                                        <IconComponent
                                                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}assets/images/profile/Group24593.png`}
                                                            alt={'Sedar Global'}
                                                            width={18}
                                                            height={18}
                                                            content={t("MyOrders")}
                                                        />

                                                    </LinkComponent>
                                                </Dropdown.Item>
                                                {/* <Dropdown.Item as="span">
                                                    <LinkComponent className="dropdown-item" href="/wishlist">
                                                        <IconComponent
                                                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}assets/images/profile/20.png`}
                                                            alt={'Sedar Global'}
                                                            width={18}
                                                            height={18}
                                                            content={t("MyFavourites")}
                                                        />
                                                    </LinkComponent>
                                                </Dropdown.Item> */}
                                                <Dropdown.Item as="span" className="d-block">
                                                    <LinkComponent className="dropdown-item" href="/profile/card">
                                                        {/* <LazyLoadImage effect="" src={`/assets/images/profile/Group24596.png`} alt="sedarglobal" width="auto" height="auto" /> */}
                                                        <IconComponent
                                                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}assets/images/profile/Group24596.png`}
                                                            alt={'Sedar Global'}
                                                            width={18}
                                                            height={18}
                                                            content={t("SavedCards")}
                                                        />

                                                    </LinkComponent>
                                                </Dropdown.Item>
                                                <Dropdown.Item as="span">
                                                    <LinkComponent className="dropdown-item" href="/profile/address-list">
                                                        {/* <LazyLoadImage effect="" src={`/assets/images/profile/Group24595.png`} alt="sedarglobal" width="auto" height="auto" /> */}
                                                        <IconComponent
                                                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}assets/images/profile/Group24595.png`}
                                                            alt={'Sedar Global'}
                                                            width={18}
                                                            height={18}
                                                            content={t("Addressbook")}
                                                        />

                                                    </LinkComponent>
                                                </Dropdown.Item>


                                                <Dropdown.Item as="span">
                                                    <p className="dropdown-item" onClick={() =>
                                                        props.user_dispatch(Globals.user_reducer.LOGOUT_USER)
                                                    }>
                                                        {/* <LazyLoadImage effect="" src={`/assets/images/profile/logout.png`} alt="sedarglobal" width="auto" height="auto" /> */}
                                                        <IconComponent
                                                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}assets/images/profile/logout.png`}
                                                            alt={'Sedar Global'}
                                                            width={18}
                                                            height={18}
                                                            content={t("SignOut")}
                                                            justifyContent={'left'}
                                                        />
                                                    </p>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <div className="ovelry-color d-none"></div>
                                    </div>
                                </div>
                            </li>
                        </>
                }
            }
        }
    }
    return (
        <div className="position-relative">
            <div className={`${!isMobile ? 'usermenu pe-0 pl-0' : ''}`}>
                <ul className="list-group list-group-horizontal">

                    {props.usermenu && props.usermenu[4].SUB_CHILD != undefined && props.usermenu[4].SUB_CHILD[0] && cn_iso && props.usermenu[4].SUB_CHILD[0].applicable_countries.indexOf(cn_iso) >= 0 ? login_link : ''}
                    <li className="search_icon d-md-none me-2 me-md-3 me-xxl-1" role="button" onClick={() => setModalShowSearch(true)}>
                        <RiSearchLine size={24} />
                    </li>

                    {/* {!isMobile && props.usermenu[4].SUB_CHILD != undefined && props.usermenu[4].SUB_CHILD[1] && cn_iso && props.usermenu[4].SUB_CHILD[1].applicable_countries.indexOf(cn_iso) >= 0 && (
                        props?.user_state && props?.user_state?.isLoggedIn ? (
                            <li className="wishlist me-2 me-md-3" role="button" >
                                <LinkComponent href="wishlist">
                                    <AiOutlineHeart size={24} color={'#000000bf'} />
                                </LinkComponent>
                            </li>
                        ) : (
                            <li className="wishlist ms-3 me-2 me-md-3  Favourite_with_Login" onClick={props.onShow} role="button">
                                <AiOutlineHeart size={24} color={'#000000bf'} />
                            </li>
                        )
                    )} */}
                    {props?.usermenu[4]?.SUB_CHILD != undefined && props?.usermenu[4]?.SUB_CHILD[2] != undefined && cn_iso && props.usermenu[4].SUB_CHILD[2].applicable_countries.indexOf(cn_iso) >= 0 && (
                        <li className="cart d-none me-2 d-md-block Begin_Ceckout_Button" onClick={() => props.user_dispatch('CARTBOX')} style={{ marginRight: "0rem!important" }}>  <div className="carttext" > <span className=""> {t('Cart')} </span>
                            <BsCart3 size={24} />
                            <span className='badge badge-warning' id='lblCartCount'> {props.totalCart} </span> </div> </li>
                    )}

                </ul>
            </div>
            {modalShowSearch && <SearchModal show={modalShowSearch} onHide={() => setModalShowSearch(false)} />}
        </div>
    );


}


const LogoPart = (props) => {
    var data = props;


    if (data?.RESULT) {
        if (data?.RESULT?.COMPONENT[1]?.PARENT) {

            // return <LinkComponent href={"/"}>
            //     <IconComponent
            //         justifyContent={locale.indexOf("-ar") !== -1 ? "right" : "left"}
            //         classprops="logoimage"
            //         src={data.CHILD[0].SUB_CHILD[0].image_path}
            //         alt={data?.CHILD[0]?.SUB_CHILD[0]?.image_alt_seo || 'Sedar Global'}
            //         width={isMobile ? 96 : 121}
            //         height={isMobile ? 43 : 55}
            //         quality={100}
            //     />
            // </LinkComponent>
            return (
                <div className="logo">
                    <Logo image_path={data?.RESULT?.COMPONENT[1]?.PARENT?.image_path} image_alt_seo={data?.RESULT?.COMPONENT[1]?.PARENT?.image_alt_seo || 'Sedar Global'} />
                </div>
            );
        }
        else {
            // return <LinkComponent href={"/"}>
            //     <IconComponent
            //         justifyContent={locale.indexOf("-ar") !== -1 ? "right" : "left"}
            //         classprops="logoimage"
            //         src={`${process.env.NEXT_PUBLIC_IMAGE_URL}assets/images/logo@2x.png`}
            //         alt={'Sedar Global'}
            //         width={101}
            //         height={50}
            //         quality={100}
            //     />
            // </LinkComponent>
            return (
                <div className="logo">
                    <Logo image_path={`${process.env.NEXT_PUBLIC_IMAGE_URL}assets/images/logo@2x.png`} image_alt_seo={'Sedar Global'} />
                </div>
            );
        }
    } else {
        return false;
    }
};

function Header(data) {
    //console.log(data, 'data');
    const { locale } = useRouter();
    const location = useRouter();
    const router = useRouter();
    const [width] = useWindowSize();
    const [GuestUserFormModalShow, setguestUserFormModalShow] = useState(false);
    const [loginModalShow, setLoginModalShow] = useState(false);
    const [signupModalShow, setSignupModalShow] = useState(false);
    const [forgotPwdModalShow, setforgotPwdModalShow] = useState(false);
    const { header_state, headerDispatch } = useContext(HeaderContext);

    let tollFreeTF = data?.topbar != undefined && data?.topbar?.CHILD && data?.topbar?.CHILD[1] && cn_iso && data?.topbar?.CHILD[1].applicable_countries.indexOf(cn_iso) >= 0 ? true : false;
    let tollFree = data?.topbar != undefined && data?.topbar?.CHILD && data?.topbar?.CHILD[1] && data?.topbar?.CHILD[1].SUB_CHILD ? data?.topbar?.CHILD[1].SUB_CHILD[0].link_url : '';
    let image_path = data?.topbar != undefined && data?.topbar?.CHILD && data?.topbar?.CHILD[1] && data?.topbar?.CHILD[1].SUB_CHILD ? data?.topbar?.CHILD[1].SUB_CHILD[0].image_path : '';

    let searchParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();

    const [showside, setShowside] = useState(false);
    const handleClose = () => setShowside(false);
    const toggleShow = () => setShowside((s) => !s);

    useEffect(() => {
        headerDispatch({ type: 'HEADER_MID_SECTION', value: data });
        dispatch({
            type: 'MID_SECTION',
            payload: data,
        });

        if (searchParams.get('t') == 'login' && data.user_state.isLoggedIn == false) {
            setLoginModalShow(true);
        }

    }, []);


    return (
        <React.Fragment>
            <SeoHeader
                data={data?.RESULT}
                router={router}
            />
            {location.pathname == '/' ? <WebSiteShema data={data?.RESULT?.SEO} router={router} /> : ''}
            <Head>
                <CanonicalTag router={router} />
            </Head>
            <div id="Header" className='header_mid abc'>
                <Container fluid className={`max_content header pt-3 ${locale != "default" ? "" : "pb-3"}`}>
                    <>
                        {router.pathname == "/" && width < 767 ?
                            (
                                <>
                                    {locale != "default" &&
                                        <>
                                            <div className="moible_menu_toggle">
                                                <button className="navbar-toggler" type="button" onClick={toggleShow}>
                                                    <IconComponent
                                                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}assets/icon/Group 6489.png`}
                                                        alt={'Sedar Global'}
                                                        width={18}
                                                        height={16}
                                                    />

                                                </button>
                                                {showside && <SideNavbar showside={showside} onHide={handleClose} value={header_state.megamenu} user_state={data.user_state} />}

                                            </div>
                                        </>
                                    }

                                    <LogoPart {...data} />

                                </>
                            )
                            :
                            (
                                <>
                                    {locale != "default" &&
                                        <>
                                            <BiArrowBack role="button" color={'#000000bf'} size={28} onClick={() => router.back()} />
                                            <div className="moible_menu_toggle d-md-none  text-center px-2">
                                                <button className="navbar-toggler" type="button" onClick={toggleShow}>
                                                    <IconComponent
                                                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}assets/icon/Group 6489.png`}
                                                        alt={'Sedar Global'}
                                                        width={18}
                                                        height={16}
                                                    />
                                                </button>
                                                {showside && <SideNavbar data={data} showside={showside} onHide={handleClose} value={header_state.megamenu} user_state={data.user_state} />}
                                                <div>
                                                </div>
                                            </div>

                                            <span className="mx-2" style={{ width: "50%", overflow: "hidden", textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{data?.RESULT?.SEO && data?.RESULT?.SEO?.SEO_PAGE_DESC}</span>

                                        </>
                                    }
                                </>
                            )
                        }
                    </>
                    <>

                        <div className='header-extra-content col-md-12 d-flex justify-content-end'>

                            {locale != "default" && data && data?.CHILD ? <Searchbar data={data} className="pe-4" /> : ''}

                            {locale != "default" && data && data.CHILD ? <Quickmenu data={data.CHILD} /> : ''}
                            {locale != "default" && data && data.CHILD && data.CHILD[2] && cn_iso && data.CHILD[2].applicable_countries.indexOf(cn_iso) >= 0 && (
                                <>
                                    <Usermenu onShow={() => setLoginModalShow(true)} usermenu={data.CHILD} user_state={data.user_state} user_dispatch={data.user_dispatch} totalCart={data.numberCart} />
                                    {loginModalShow &&
                                        <LoginModal data={data} loginShow={loginModalShow} loginOnHide={() => setLoginModalShow(false)} onShowSignup={() => setSignupModalShow(true)} onShowForgotPWD={() => setforgotPwdModalShow(true)} onShowGuest={() => setguestUserFormModalShow(true)} />
                                    }

                                    {signupModalShow &&
                                        <SignupModal signupShow={signupModalShow} SignupOnHide={() => setSignupModalShow(false)} onShowLogin={() => setLoginModalShow(true)} onShowForgotPWD={() => setforgotPwdModalShow(true)} />
                                    }
                                    {forgotPwdModalShow &&
                                        <ForgotPwdModal forgotShow={forgotPwdModalShow} ForgotOnHide={() => setforgotPwdModalShow(false)} onShowLogin={() => setLoginModalShow(true)} onShowSignup={() => setSignupModalShow(true)} guestOnHide={() => setguestUserFormModalShow(false)} />
                                    }
                                    {GuestUserFormModalShow &&
                                        <GuestUserFormModal guestFormShow={GuestUserFormModalShow} guestOnHide={() => setguestUserFormModalShow(false)} onShowLogin={() => setLoginModalShow(true)} />
                                    }
                                </>
                            )}
                        </div>
                        <>
                            {isMobile && isMobile && tollFreeTF ?
                                <div className="">
                                    <ul className="list-group list-group-horizontal">
                                        <li className="wishlist me-2 me-md-3 mt-2 " role="button" style={{ width: '24px' }}>

                                            <a href={tollFree}>
                                                {image_path &&
                                                    // <img src={image_path} alt="sedarglobal" width="auto" height="auto" />
                                                    <IconComponent
                                                        src={image_path}
                                                        alt={'Sedar Global'}
                                                        width={18}
                                                        height={18}
                                                    />
                                                }
                                            </a>

                                        </li>
                                        <li className='d-md-none me-2 me-md-3 me-xxl-1'>
                                            <LanguageDropdown />
                                        </li>
                                    </ul>
                                </div>
                                : <></>
                            }
                        </>
                    </>
                </Container>
                {data && data.CHILD && data.CHILD[2] && cn_iso && data.CHILD[2].applicable_countries.indexOf(cn_iso) >= 0 && (
                    <MobileQuickmenu data={data.CHILD} />
                )}
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer, numberCart: state.cart.numberCart, seo: state.seo });
const mapDispatchToProps = (dispatch) => {
    return {
        user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) },
        menuitemlist: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);