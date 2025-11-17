import React, { useState, useContext, useEffect, Fragment } from 'react'
import { Row, Image, DropdownButton, Dropdown } from 'react-bootstrap';
import { HeaderContext } from '../Header/Header';
import CartListMenu from '../CartListMenu/CartListMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'next-i18next';
import LinkComponent from '@components/Link';
import { useRouter } from 'next/router';
import { cn_iso, defaultLocale } from '@utils/i18n';
import { connect } from "react-redux";
import GLOBALS from '../../Globals';
const disable_menu = ['folding-doors'];

const MegaMenu = (props) => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const [showResults, setShowResults] = useState(false);
  const { header_state, headerDispatch } = useContext(HeaderContext)

  useEffect(() => {
    headerDispatch({ type: 'MEGAMENU', value: props })
    props.menuitemlist(GLOBALS.menusItem.MEGAMENU, props);
  }, []);

  return (
    <>
      {locale != "default" && <div className="MegaMenu d-none d-md-block">
        <div className="max_content">
          <nav className="navbar navbar-expand navbar-light MegaMenu_nav ">
            <div id="navbarContent" className="collapse navbar-collapse order-sm-12 order-lg-1">
              <ul className="navbar-nav">
                {props?.CHILD && props?.CHILD?.map(function (row, index) {
                  // if (disable_menu.indexOf(row.link_url) >= 0 && cn_iso == 'EG') {
                  //   return false
                  // }
                  return (
                    <React.Fragment key={index}>
                      {row.SUB_CHILD ?
                        <li className="nav-item dropdown megamenu" key={index} onMouseEnter={() => setShowResults(true)}  >
                          <LinkComponent href={
                            row.redirect_to_type == 'OTHER'
                              ? '/' + row.redirect_url.toLowerCase()
                              : '/' + row.link_url.toLowerCase()
                          } rel="noreferrer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link text-uppercase active more-option">
                            {row.content}
                          </LinkComponent>
                          {showResults ?
                            <div aria-labelledby="megamenu" className={`dropdown-menu border-0 p-0 mega_menu_dropdown smallbg`} onClick={() => setShowResults(false)}>
                              <Row className="mega_dropdown_content" key={index}>
                                <div className="col-custom-1 position-relative">
                                  <h2 className="" >{row.content}</h2>
                                </div>
                                <div className="position-relative col-menu-child">
                                  <ul className="list-unstyled row">
                                    {row?.SUB_CHILD && row?.SUB_CHILD?.map((subchild, i) => {
                                      return (
                                        <li className="nav-item col-md-4 col-sm-6" key={i} onMouseEnter={e => { (e.currentTarget.childNodes[0].childNodes[0].childNodes[1].childNodes[0].src = subchild.image_path_2) }}
                                          onMouseLeave={e => (e.currentTarget.childNodes[0].childNodes[0].childNodes[1].childNodes[0].src = subchild.image_path)}>
                                          <LinkComponent href={
                                            subchild.redirect_to_type == 'OTHER'
                                              ? '/' + subchild.redirect_url.toLowerCase()
                                              : '/' + subchild.link_url.toLowerCase()
                                          } className="nav-link text-small pb-0  d-flex align-items-center">
                                            <div className="pe-3 ps-3"> <LazyLoadImage effect="blur" alt={subchild.content} src={subchild.image_path} className="blinds" width="30" height="30" /></div>
                                            <div>{subchild.content}</div>
                                          </LinkComponent>
                                        </li>
                                      )
                                    })
                                    }
                                  </ul>
                                </div>
                                {row.image_path ?
                                  <div className="col-custom-5 position-relative">
                                    <div className="shop_box">
                                      <LazyLoadImage effect="blur" alt={row.content} src={row.banner_image_path} width="322" height="245" />
                                      {['curtains-and-drapes', 'blinds-shades'].indexOf(row.link_url) >= 0 ?
                                        <p className="shop_link">
                                          <LinkComponent href={row.redirect_to_type == 'OTHER' ? row.redirect_url : '/curtains-and-blinds'} > {t('shop_all')}</LinkComponent>
                                        </p>
                                        :
                                        <p className="shop_link">
                                          <LinkComponent href={row.redirect_to_type == 'OTHER' ? row.redirect_url : '/' + row.link_url} > {t('shop_all')}</LinkComponent>
                                        </p>
                                      }
                                    </div>
                                  </div> : ''}
                              </Row>
                            </div>
                            : null}
                        </li>
                        :
                        <li className="nav-item" key={index}>
                          <p className="line-devider float-start"></p>
                          <LinkComponent
                            className="nav-link text-uppercase"
                            href={row.redirect_to_type == 'OTHER' ? row.redirect_url : '/' + row.link_url}
                          >
                            {row.content}
                          </LinkComponent>
                        </li>
                      }

                    </React.Fragment>
                  )

                })}

                {props?.CHILD && props?.CHILD?.length > 8 ? <li className="nav-item dropdown moreItem dropstart" key={2} onMouseEnter={() => setShowResults(true)}>
                  <span className="nav-link  text-uppercase active"  > {t('More')}  <FontAwesomeIcon icon={faAngleDown} size="lg" /></span>
                  <div aria-labelledby="megamenu" className={`dropdown-menu mega_menu_dropdown moreItemDropdown rounded-0`} onClick={() => setShowResults(false)}>
                    <ul className="list-unstyled">
                      {props?.CHILD && props?.CHILD?.map(function (row, index) {
                        return (
                          <React.Fragment key={index}>
                            <li>
                              <LinkComponent href={row.redirect_to_type == 'OTHER' ? row.redirect_url : '/' + row.link_url}>{row.content}</LinkComponent>
                            </li>
                          </React.Fragment>
                        )

                      })}
                    </ul>
                  </div>

                </li> : ''}
              </ul>
            </div>

          </nav>
        </div>

        {props?.user_state?.CartBox ?
          <CartListMenu />
          : ''}
      </div>}

    </>
  );
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer, numberCart: state.cart.numberCart });
const mapDispatchToProps = (dispatch) => {
  return {
    menuitemlist: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MegaMenu);


