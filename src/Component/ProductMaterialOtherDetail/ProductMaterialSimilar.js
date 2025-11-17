import React, { useState, useEffect, lazy } from 'react';
import { Col, Row, Nav, Tab } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import MaterialCard from '../MaterialList/MaterialCard';
import MoodBoardModal from '../Modals/WishList/MoodBoard';
import { useTranslation } from 'next-i18next';

// Import Swiper styles

import SwiperCore, {
  Pagination
} from 'swiper';

const AddtoCartModal = lazy(() => import('../Modals/QuickByModal/AddtoCartModal'));

// install Swiper modules
SwiperCore.use([Pagination]);

const ProductMaterialSimilar = (props) => {

  const { t } = useTranslation('common');
  const [Selecttab, setSelecttab] = useState(0);

  const [state, setState] = useState({
    show: false,
    item: false,
    divGrid: 4,
    active_item_id: false
  });
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 1000);
  }, [state.show])

  const [MoodBoard, setMoodBoard] = useState(false);
  const [activeImage, setActiveImage] = useState([]);

  if (props) {

    let dataVal = props.SIMILAR_COLOR ? props.SIMILAR_COLOR : {};
    const ProductMaterialSimilarSlideConfig = {
      loop: false,
      slidesPerView: 3,
      spaceBetween: 30,
      autoHeight: false, //enable auto height          
      observer: true,
      observeParents: true,
      breakpoints: {
        // when window width is >= 320px
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        400: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        // when window width is >= 480px
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // when window width is >= 640px
        767: {
          slidesPerView: 3,
          spaceBetween: 40,
        }
      },
      
      pagination: { "clickable": true, dynamicBullets: true }
    }

    const unique_pattern = [...new Set(Object.values(dataVal).map(row => row.SFI_PATTERN_DESC))];

    const handleShow = (data) => {
      setState({ ...state, show: true, item: data, active_item_id: activeImage[data.SFI_CODE] });
    }
    const handleClose = () => {
      // dispatch(priceReset());
      setState({ ...state, show: false, item: '' });
    }
    return (
      <div className="ProductMaterialSmilar px-3 px-md-0">
        {unique_pattern.length > 0 &&
          <Tab.Container id="left-tabs-example" defaultActiveKey={Selecttab}>
            <Row>
              <Col lg={3} xl={3} xxl={2} className="heading-section d-none d-lg-block">
                <div>
                  <h3>{t('SimilarColors')}</h3>
                </div>

              </Col>
              <Col lg={9} xl={9} xxl={10}>
                <Nav variant="pills" className="flex-row tab-nav flex-nowrap hidescroll pb-3">

                  {unique_pattern.map((row, index) => (
                    <Nav.Item key={index}>
                      <Nav.Link eventKey={index} onClick={() => setSelecttab(index)} >{row}</Nav.Link>
                    </Nav.Item>
                  ))}
                  {/* <Nav.Item>
               <Nav.Link eventKey="second" >Printed</Nav.Link>
             </Nav.Item> */}
                </Nav>
              </Col>
              <Col sm={12}>
                {/* {`${JSON.stringify(props[0].sfi_ref_colors_list)}fdsfsdfsdfdsffs`} */}

                <Tab.Content>
                  <Tab.Pane eventKey={Selecttab} >
                    <Row className="materialgridlist px-2">
                      <Swiper {...ProductMaterialSimilarSlideConfig} className="order_sample" >
                        {Object.values(dataVal).map((content, index) => {
                          return (
                            content.SFI_PATTERN_DESC == unique_pattern[Selecttab] ? <SwiperSlide key={index} >

                              <MaterialCard
                                className="materialgridlistitem"
                                {...content}
                                data={{ ...dataVal, data:{'type':'similar'} }}
                                state={state}
                                setLoader={setLoader}
                                handleShow={handleShow}
                                handleClose={handleClose}
                                category_slug={props.category_slug}
                                sub_category_slug={props.sub_category_slug}
                                key={index}
                              />
                            </SwiperSlide> : ''
                          )
                        })
                        }
                      </Swiper>
                    </Row>
                  </Tab.Pane>

                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        }
        {state.show && state.item && state.item.SPI_PR_ITEM_CODE ? <AddtoCartModal loginShow={state.show} {...state.item} active_item_id={state.active_item_id} loginOnHide={() => handleClose()} /> : ''}
        {/* {MoodBoard.show ? (<MoodBoardModal show={MoodBoard.show} {...MoodBoard} onHide={() => setMoodBoard(false)} />) : ''} */}
      </div>
    );
  } else {
    return (<></>);
  }
}



ProductMaterialSimilar.propTypes = {};

ProductMaterialSimilar.defaultProps = {};

export default ProductMaterialSimilar;
