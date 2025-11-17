import _ from 'lodash';
import React, { createContext, useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
import { HeaderReducer, initialState } from './HeaderReducer';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import ApiDataService from 'src/services/ApiDataService';
import CanonicalTag from 'src/components/canonicalTag';
import { useWindowSize } from '@components/WindowSize';

const TopBar = dynamic(() => import("../Topbar/Topbar"));
const HeaderMidSection = dynamic(() => import("../HeaderMidSection/HeaderMidSection"));
const Searchbox = dynamic(() => import("../Searchbox"));
const Logo = dynamic(() => import("../Logo"));
const MegaMenu = dynamic(() => import("../MegaMenu/MegaMenu"));

export const HeaderContext = createContext();
export function DynamicComponent(props) {
  switch (props.url) {
    case 'Component/Topbar/Topbar':
      return <TopBar  {...props} />
    case 'Component/Logo':
      return <Logo {...props} />
    case 'Component/Searchbox':
      return props.locale != 'default' ? <Searchbox {...props} /> : '';
    case 'Component/HeaderMidSection/HeaderMidSection':
      return <HeaderMidSection RESULT={props?.RESULT} topbar={props?.topbar}  {...props} />
    case 'Component/MegaMenu/MegaMenu':
      return <MegaMenu  {...props} />
    default:
      return ''
  }
}

const fetchToCart = () => fetchToCart;

function Header({ props, pagetype = '' }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [header_state, headerDispatch] = useReducer(HeaderReducer, initialState);
  const [width] = useWindowSize();
  const orderListFun = () => {
    ApiDataService.getAll("order/orderList")
      .then(response => {
        let res_data = response.data;
        if (res_data.return_status == 0 && res_data.error_message == 'Success') {
          dispatch({
            type: 'FETCH_TO_CART',
            payload: {
              cartItems: res_data.complete,
              numberCart: res_data.cart_count.QTY > 0 ? res_data.cart_count.QTY : 0,
              countFreeSample: parseInt(res_data.countFreeSample)
            },
          });
        }
      }).catch(e => { })
  }

  useEffect(() => {
    orderListFun();
  }, [])


  useEffect(() => {
    dispatch({
      type: 'SITE_DETAIL',
      payload: props?.result && props?.result?.COMMON?.length && props?.result?.COMMON[0],
    });
  }, [dispatch])

  return (
    <>
      <CanonicalTag router={router} pagetype={pagetype} hrefLang={props?.result?.SEO?.hreflang || ''}/>
      <HeaderContext.Provider value={{ header_state, headerDispatch }}>
        <div className="container-fluid headerMain">
          {
            props?.result && props?.result?.COMPONENT && props?.result?.COMPONENT.length > 0 && (
              <div className="row">
                {
                  props.result.COMPONENT.map((data, index) => (
                    data.PARENT.component_title === 'Topbar' ? (
                      <DynamicComponent key={'result' + index} RESULT={props?.result} topbar={props?.result?.COMPONENT[0]?.PARENT} url={data?.PARENT?.component_url} {...data?.PARENT} locale={router.locale} />
                    ) : (
                      (data.PARENT.component_title === 'Logo' && width > 767) ? (
                        <div className="col-md-2 col-xl-2 col-xxl-1 p-3 d-flex  align-items-center" key={'result' + index}>
                          <DynamicComponent RESULT={props?.result} topbar={props?.result?.COMPONENT[0]?.PARENT} url={data?.PARENT?.component_url} {...data?.PARENT} locale={router.locale} />
                        </div>
                      ) : (
                        null
                      )
                    )
                  ))
                }
                <div className="col-md-10 col-xl-10 col-xxl-11 mobile_css">
                  {
                    props.result.COMPONENT.map((data, index) => (
                      data.PARENT.component_title !== 'Topbar' && data.PARENT.component_title !== 'Logo' ? (
                        <DynamicComponent key={'result' + index} RESULT={props?.result} topbar={props?.result?.COMPONENT[0]?.PARENT} url={data?.PARENT?.component_url} {...data?.PARENT} locale={router.locale} />
                      ) : null
                    ))
                  }
                </div>
              </div>
            )
          }

          {/* </div> */}
          {/* </div> */}
        </div>
      </HeaderContext.Provider >
    </>
  );
}
export default Header;