import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Image, Form, Dropdown } from 'react-bootstrap'
import cookies from 'js-cookie'
import { Swiper, SwiperSlide } from "swiper/react";
import { IconComponent } from '@components/image';
import SwiperCore, { Mousewheel, Pagination, Autoplay } from 'swiper';
import { HeaderContext } from '../Header/Header';
import { cn_iso, countryName, langName, userId, visitorId } from '@utils/i18n';
import Router, { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import LinkComponent from '@components/Link';
import classNames from 'classnames';
import { isMobile } from "react-device-detect";


SwiperCore.use([Mousewheel, Pagination, Autoplay]);


const TopBar = (props) => {

  // const { isMOBILE, isTABLET, isLAPTOP, isDESKTOP } = useDevice();
  const { t } = useTranslation('common');
  // const { setShow } = useLoader();
  // const dispatch = useDispatch();
  const router = useRouter();
  const { locale } = router;
  const { header_state, headerDispatch } = useContext(HeaderContext);
  const [currentLanguageCode, setCurrentLanguageCode] = useState(langName ? langName : "en");
  const [currentcountryCode, setcurrentcountryCode] = useState(cookies.get("country") ? cookies.get("country") : "global");
  // const dispatch = useDispatch();
  useEffect(() => {
    headerDispatch({ type: 'TOPBAR', value: props });
    // dispatch({
    //   type: 'TOPBAR_SECTION',
    //   payload: props,
    // });
  }, []);

  const changeLanguage = (lng) => {
    cookies.set('i18next', lng);
    setCurrentLanguageCode(lng);
    const country = cookies.get('country') || "global";
    window.location.href = `/${country}-${lng}${router.asPath && router.asPath.length > 1 ? router.asPath : ''}`
  }

  let data = props;
  // let cn_iso = "BH";
  let show_price_yn = "Y";
  // eslint-disable-next-line react/display-name
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      // href={""}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="Country_menu"
    >
      {children}
    </div>
  ));
  const prmotionconfig = {
    loop: true,
    observer: true,
    observeParents: true,
    //slidesPerView: 1,
    // autoHeight: true,
    autoplay: {
      "delay": 2000,
      "disableOnInteraction": false,
    },
    direction: 'vertical',
    spaceBetween: 30,
    mousewheel: true,
  }
  // console.log(props);
  if (props.CHILD && props.CHILD.length > 1) {
    return (
      <>

        <section id="Topbar">
          <Container fluid className="max_content Topbar" style={{
            height: locale != 'default' && !isMobile ? '38px' : locale == 'default' && !isMobile ? '38px' : 'auto',
            display: !isMobile ? 'flex' : 'block',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {/* <Row> */}
            {props.CHILD[0].SUB_CHILD && (
              <Col xl={3} lg={7} md={7} sm={12}>
                {locale != "default" && data.CHILD && data.CHILD[0] && data.CHILD[0].applicable_countries.indexOf(cn_iso) >= 0 && (
                  <div className="promotion">
                    <Swiper {...prmotionconfig} >
                      {props.CHILD[0].SUB_CHILD && props.CHILD[0].SUB_CHILD.map(function (row, index) {

                        if (row.content != '.') {
                          return (
                            <SwiperSlide key={index}>
                              <div>
                                <LinkComponent href={row?.link_url || '/'} className="text-light">
                                  {row.content}
                                </LinkComponent>
                              </div>
                            </SwiperSlide>
                          )
                        }
                      })}
                    </Swiper>
                  </div>
                )}
              </Col>
            )
            }

            {props.CHILD[1].SUB_CHILD &&
              <Col xl={9} lg={5} md={5} className="px-1">
                <div className="contact_topbar d-none d-md-flex">
                  <ul>
                    {props.CHILD[1].SUB_CHILD.map(function (row, index) {

                      if (row.GRAND_CHILD) {
                        let grand_child_length = row.GRAND_CHILD.length;
                        if (grand_child_length == 2) {
                          return (
                            <li className={`language ps-2 ${locale != "default" ? "d-inline-block" : "d-none"}`

                            } key={index + 2}>
                              <span style={
                                { cursor: currentLanguageCode != row.GRAND_CHILD[0].link_title ? "pointer" : "auto", display: 'inline-flex', top: '-2px', position: 'relative' }
                              } className={
                                classNames({ 'text-secondary d-inline-block': currentLanguageCode == row.GRAND_CHILD[0].link_title })} href={"/"} onClick={() => changeLanguage(row.GRAND_CHILD[0].link_title)} >
                                {row.GRAND_CHILD[0].content}
                              </span>
                              <span className="countrySlesh d-inline-block mx-0" style={{ display: 'inline-flex', top: '-2px', position: 'relative' }}>/</span>
                              <span style={
                                { cursor: currentLanguageCode != row.GRAND_CHILD[1].link_title ? "pointer" : "auto", display: 'inline-flex', top: '-2px', position: 'relative' }
                              } className={
                                classNames({ 'text-secondary': currentLanguageCode == row.GRAND_CHILD[1].link_title })} href={"/"} onClick={() => changeLanguage(row.GRAND_CHILD[1].link_title)} >
                                {row.GRAND_CHILD[1].content}
                              </span>
                            </li>
                          )
                        } else if (grand_child_length == 1) {
                          return (
                            <li className="countryli" key={index}>
                              <LinkComponent href={"/"}>
                                {/* {row.GRAND_CHILD[0].cn_iso} */}
                                <IconComponent
                                  src={row.GRAND_CHILD[0].image_path}
                                  alt={row.GRAND_CHILD[0]?.image_alt_seo || 'Sedar Global'}
                                  width={17}
                                  height={12}
                                  content={row.GRAND_CHILD[0] && row.GRAND_CHILD[0].country_iso ? row.GRAND_CHILD[0].country_iso.toUpperCase() : currentcountryCode.toUpperCase()}
                                />
                              </LinkComponent>
                            </li>
                          )
                        } else if (row.link_title && row.link_title == 'Language') {
                          return (
                            <li className={`language ps-2 ${locale != "default" ? "d-inline-block" : "d-none"}`} key={index}  >

                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} variant="success" id="dropdown-autoclose-true">
                                  {row.GRAND_CHILD && row.GRAND_CHILD.map((data, i) => {
                                    return (
                                      <React.Fragment key={i + 3}>
                                        {data.link_title && data.link_title === currentLanguageCode ?
                                          <>
                                            {/* <img src={row.image_path} className="flag_icon" alt="sedarglobal" width="auto" height="auto" /> */}
                                            <IconComponent
                                              src={row.image_path}
                                              alt={data?.image_alt_seo || 'Sedar Global'}
                                              width={17}
                                              height={14}
                                              content={data.content}
                                            />
                                          </> : ''}
                                      </React.Fragment>
                                    )
                                  })}
                                </Dropdown.Toggle>
                                {locale != "default" && <Dropdown.Menu className="country-dropdown text-start" >
                                  {row.GRAND_CHILD && row.GRAND_CHILD.map((subchild, i) => (
                                    <Dropdown.Item href={`/${currentcountryCode?.toLowerCase()}-${subchild.link_title}${router.asPath && router.asPath.length > 1 ? router.asPath : ''}`} key={i + 5}>
                                      {subchild.content}
                                    </Dropdown.Item>
                                  ))}
                                </Dropdown.Menu>}
                              </Dropdown>

                            </li>
                          )
                        } else if (grand_child_length && grand_child_length > 3) {
                          // 
                          return (
                            <li className="countryli" key={index}  >
                              {show_price_yn == 'Y' ? (
                                <>
                                  <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle} variant="success" id="dropdown-autoclose-true">
                                      {row.GRAND_CHILD && row.GRAND_CHILD.map((data, i) => {
                                        return (
                                          <React.Fragment key={i + 3}>
                                            {data.link_url && data.link_url.toUpperCase() === currentcountryCode.toUpperCase() ?
                                              <>
                                                {/* <img src={data.image_path} className="flag_icon" alt="sedarglobal" width="auto" height="auto" /> */}
                                                <IconComponent
                                                  src={data.image_path}
                                                  alt={data?.image_alt_seo || 'Sedar Global'}
                                                  width={17}
                                                  height={12}
                                                  content={currentcountryCode.toUpperCase()}
                                                />

                                              </> : ''}
                                          </React.Fragment>
                                        )
                                      })}
                                    </Dropdown.Toggle>
                                    {locale != "default" && <Dropdown.Menu className="country-dropdown text-start" >
                                      {row.GRAND_CHILD && row.GRAND_CHILD.map((subchild, i) => (
                                        <Dropdown.Item href={`/${subchild.link_url?.toLowerCase()}-${currentLanguageCode}${router.asPath && router.asPath.length > 1 ? router.asPath : ''}`} key={i + 5}>
                                          <img src={subchild.image_path} className="flag_icon" alt="sedarglobal" />
                                          {subchild.content}
                                        </Dropdown.Item>
                                      ))}
                                    </Dropdown.Menu>}
                                  </Dropdown>
                                </>
                              ) : ('')}
                            </li>
                          )
                        }
                      }

                      let image = row.image_path != null ?
                        // <img src={row.image_path} alt="sedarglobal" width="auto" height="auto" />
                        <IconComponent
                          src={row.image_path}
                          alt={row?.image_alt_seo || 'Sedar Global'}
                          width={17}
                          height={12}
                          content={row.content}
                        />
                        : '';
                      // if (row.applicable_countries.indexOf(cn_iso) >= 0) 
                      {
                        return (
                          <React.Fragment key={index}>
                            <li>
                              <div>
                                {index == 0 ? (
                                  <a href={row.link_url}>
                                    <span style={{
                                      display: 'inline-flex', top: '-2px', position: 'relative'
                                    }}>
                                      {image}

                                      {/* {row.content} */}
                                    </span>
                                  </a>
                                )
                                  : (
                                    index == 1 ?
                                      <a href={row.link_url}>
                                        {image}
                                        {/* <span>{row.content} </span> */}
                                      </a>
                                      :
                                      <LinkComponent href={'/' + row.link_url}>
                                        {image}
                                        {/* <span>{row.content} </span> */}
                                      </LinkComponent>
                                  )}
                              </div>
                            </li>
                            {/* {row.applicable_countries.indexOf(cn_iso) >= 0 && (
                                
                              )} */}
                          </React.Fragment>
                        )
                      }
                    })}

                    <li className="laptopmoredrpdn px-3 d-xl-none">
                      <div>
                        <Dropdown>
                          <Dropdown.Toggle as={CustomToggle} variant="success" id="dropdown-autoclose-true">
                            {t('More')}
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="country-dropdown text-start" >
                            {props.CHILD[1].SUB_CHILD.map(function (row, index) {
                              return (
                                <React.Fragment key={index + 6}>
                                  {index < 3 ?
                                    index == 0 || index == 1 ? (
                                      <Dropdown.Item key={index} href={`/${row.link_url}`}>
                                        <span>{row.content}</span> <span className="dot"></span>
                                      </Dropdown.Item>
                                    ) : (
                                      <Dropdown.Item as="span" className='m-0' key={index}>
                                        <LinkComponent className="text-dark" href={`/${row.link_url}`}>
                                          <span>{row.content}</span> <span className="dot"></span>
                                        </LinkComponent>
                                      </Dropdown.Item>
                                    )
                                    : ''}

                                </React.Fragment>
                              )
                            })}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </li>

                  </ul>

                </div>

              </Col>
            }
            {/* </Row> */}
          </Container>
        </section>

      </>
    );
  } else {

    return (
      <section id="Topbar">
        <Container fluid className="max_content Topbar">
          <Row></Row>
        </Container>
      </section>
    );
  }
}


export default TopBar;


