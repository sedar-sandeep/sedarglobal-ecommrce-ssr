import React, { useState, useRef, useEffect, useContext } from "react";


import { Col, Row, Tooltip, Button, Alert } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import MaterialInfoPopup from "./MaterialInfoPopup";
import { updateTextureImg, addLights, addToCartFunScene } from '../Scene';
import { CustomizationContext } from '../CustomizationProduct';
import ApiDataService from '../../../services/ApiDataService';
import { VscInfo } from 'react-icons/vsc';
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ImageComponent, IconComponent } from '@components/image';
let img_path = "/assets/images/";
const item_img_path = process.env.NEXT_PUBLIC_ITEM_IMG_WEBP_PATH + 'laptop/';

const InfoLink = (props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <VscInfo size={12} role="button" onClick={() => setModalShow(true)} />
      <MaterialInfoPopup show={modalShow} onHide={() => setModalShow(false)} materila_info={true} images_with_https={true}  {...props} />
    </>
  )
}

const MaterialSelection = (props) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const target = useRef(null);
  let { slug } = router.query;
  const listInnerRef = useRef();
  const [selected, setSelected] = useState();
  const [errorMgs, setErrorMgs] = useState();
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);
  const edit_step = customize_state.edit_step_data;

  let edit_item_id = edit_step.info_result && edit_step.info_result.MATERIAL_SELECTION ? edit_step.info_result.MATERIAL_SELECTION.ITEM_ID : '';

  let material_item_id = slug && slug.length ? slug[3] : edit_item_id;
  let SPI_PR_ITEM_CODE = customize_state.product_info ? customize_state.product_info.SPI_PR_ITEM_CODE : 0;

  const perPage = 15;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [materialList, setMaterialList] = useState([]);
  const [loading, setLoading] = useState(false);

  let m_width = customize_state.product_info && customize_state.product_info.m_width ? customize_state.product_info.m_width : 0;
  let m_height = customize_state.product_info && customize_state.product_info.m_height ? customize_state.product_info.m_height : 0;

  const updateTextureFun = (val) => {

    val = val ? val : [];
    props['ITEM_CODE'] = val.SII_CODE;
    props['material_info'] = val;
    updateTextureImg(val);
    val.light_info && val.light_info.length > 0 ? addLights(val.light_info, val.SIO_LIGHT_INTENSITY) : '';
    props['SUB_CHILD'] = '';
    props['material_info']['light_info'] = '';
    // props['material_info']['material_family'] = '';

    customizeDispatch(props);
    setSelected(val.SII_CODE);

    customizeDispatch({ type: 'ADD-TO-CART' });
    if (customize_state.product_info && customize_state.product_info.m_width && customize_state.product_info.m_width) {
      // getPrice(customize_state, customizeDispatch, props);
      //addToCartFunScene(customize_state, customizeDispatch);

      setTimeout(function () {
        addToCartFunScene(customize_state, customizeDispatch);
      }.bind(this), 500);
    }
  }

  let post_data = { content: 'customization_material', param: customize_state.filter_data, _limit: perPage, _page: page * perPage, material_item_id: material_item_id, m_width: m_width, m_height: m_height };
  const getMaterialList = () => {
    setLoading(true);
    ApiDataService.getAll(`customization/materialFilter/${SPI_PR_ITEM_CODE}`, post_data)
      .then(response => {
        let res_data = response.data;
        if (res_data.return_status == 0 && res_data.error_message == 'Success') {
          setTotalPages(parseInt(res_data.row_count / perPage));
          setMaterialList([...materialList, ...res_data.results]);
          if (res_data.single_material && res_data.single_material.length == 1 && page == 0) {
            setTimeout(updateTextureFun(res_data.single_material[0]), 1500);
          } else if (page == 0) {
            setTimeout(updateTextureFun(res_data.results[0]), 1500);
          }
        } else {
          setErrorMgs(res_data.error_message);
        }
        setLoading(false);
      });
  }

  useEffect(() => {
    getMaterialList();
  }, [page]);


  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      let winHeight = Math.round(scrollTop + clientHeight)
      if (winHeight === scrollHeight) {
        if (page < totalPages) {
          setPage(page + 1);
          getMaterialList();
        }
      }
    }
  };


  useEffect(() => {
    let post_data = { content: 'customization_material', param: customize_state.filter_data, m_width: m_width, m_height: m_height };
    const getMaterialFilter = () => {
      if (customize_state.filter_data.length == 0) {
        return false;
      }
      //setLoading(true);
      ApiDataService.getAll(`customization/materialFilter/${SPI_PR_ITEM_CODE}`, post_data)
        .then(response => {
          let res_data = response.data;
          // 
          if (res_data.return_status == 0 && res_data.error_message == 'Success') {
            setTotalPages(parseInt(res_data.row_count / perPage));
            setMaterialList(res_data.results);
          } else {
            setErrorMgs(res_data.error_message);
          }
          setLoading(false);
        });
    }
    getMaterialFilter();
  }, [customize_state.filter_data]);

  useEffect(() => {
    let post_data = { content: 'customization_material', m_width: m_width, m_height: m_height, search_item_code: customize_state.search_item_code };
    const getMaterialFilter = () => {
      ApiDataService.getAll(`customization/materialFilter/${SPI_PR_ITEM_CODE}`, post_data)
        .then(response => {
          let res_data = response.data;
          // 
          if (res_data.return_status == 0 && res_data.error_message == 'Success') {
            setTotalPages(parseInt(res_data.row_count / perPage));
            setMaterialList(res_data.results);
          } else {
            setErrorMgs(res_data.error_message);
          }
          setLoading(false);
        });
    }
    getMaterialFilter();
  }, [customize_state.search_item_code]);

  if (props.SUB_CHILD == undefined) {

    return false;
  }

  const RenderTooltip = (event, data) => {
    return (
      <Tooltip  {...event} className="tooltip_color_popup">
        <ul className="list-group list-group-horizontal">
          {data.map((family, index) => {
            let active_cls = family.SII_CODE == selected ? 'mountgrid active' : 'mountgrid';
            return (
              <li key={index} onClick={() => updateTextureFun(family)} className={active_cls} title={family.SII_ITEM_ID}>
                <IconComponent
                  classprops={`img-fluid`}
                  src={family.SII_THUMBNAIL_IMAGES ? item_img_path + family.SII_THUMBNAIL_IMAGES : img_path + 'noimage.jpg'}
                  alt={family.SII_CODE || 'Sedar Global'}
                  width={28}
                  height={28}
                  marginLeftRight
                  contains={true}
                />
              </li>
            )
          })}
        </ul>
      </Tooltip>
    )
  }

  return (
    <div className="MaterialSelection">
      <div className="step-heading">
        <h5>{props.SPS_DESC}</h5>
      </div>
      {errorMgs ? <Alert className="api_alert_mgs fs-6" variant="danger" onClose={() => setErrorMgs(false)} dismissible>
        {errorMgs}
      </Alert> : ''}

      <Row className="materialselectlist hidescroll px-2" style={{ 'overflow': 'scroll' }} onScroll={() => onScroll()} ref={listInnerRef}>

        {materialList && materialList.map((data, index) => {
          //const [SampleImage, setSampleImage] = useState(props.SII_THUMBNAIL_IMAGES); 
          //  let IMAGE_PATH = data.material_family[0].IMAGE_PATH;
          return (
            <Col xl={4} lg={6} sm={4} xs={6} className="px-1" key={index}>
              <div className={selected == data.material_family[0].SII_CODE ? 'material-grid active' : 'material-grid'} >
                <div className="material-grid-content">
                  <div className="materialimage" onClick={() => updateTextureFun(data.material_family[0])}>
                    {/* <img className="browseImage" src={data.material_family[0].SII_THUMBNAIL_IMAGES ? item_img_path + data.material_family[0].SII_THUMBNAIL_IMAGES : img_path + 'noimage.jpg'} item_id={data.SII_ITEM_ID} width="auto" height="auto" /> */}
                    <ImageComponent
                      classprops={`browseImage`}
                      src={data.material_family[0].SII_THUMBNAIL_IMAGES ? item_img_path + data.material_family[0].SII_THUMBNAIL_IMAGES : img_path + 'noimage.jpg'}
                      item_id={data.SII_ITEM_ID}
                      width={512}
                      height={512}
                      marginLeftRight
                      contains={true}
                    />
                    <div className="item-code">
                      <span>{data.ITEM_ID}</span>
                    </div>
                  </div>

                  <div className="materialcontent">
                    <div className="color_tooltip">
                      <div className="color_tooltip_list d-inline-block">
                        <ul className="list-group list-group-horizontal">
                          {data.material_family && data.material_family.length > 0 ? data.material_family.slice(0, 2).map((family, key) => {
                            let active_cls = family.SII_CODE == selected ? 'mountgrid active' : 'mountgrid';
                            return (
                              <li key={key} onClick={() => updateTextureFun(family)} className={active_cls} title={family.SII_ITEM_ID}>
                                <IconComponent
                                  classprops={`img-fluid`}
                                  src={family.SII_THUMBNAIL_IMAGES ? item_img_path + family.SII_THUMBNAIL_IMAGES : img_path + 'noimage.jpg'}
                                  alt={family.SII_CODE || 'Sedar Global'}
                                  width={28}
                                  height={28}
                                  marginLeftRight
                                  contains={true}
                                />
                              </li>
                            )
                          }) : ''}
                          <li>
                            {data.material_family && data.material_family.length > 2 ?
                              <OverlayTrigger trigger="click" placement="top" overlay={(e) => RenderTooltip(e, data.material_family)} rootClose >
                                <p ref={target} className="opentooltip more_color" > +{data.material_family.length - 2}</p>
                              </OverlayTrigger> : ''}
                          </li>
                        </ul>
                      </div>
                      {/* <div className="info  d-inline-block">
                        <InfoLink link="#" {...data.material_family[0]} SFI_COLLECTION_DESC={data.SFI_COLLECTION_DESC} PATTERN_DESC_LANG={data.PATTERN_DESC_LANG} SFI_MT_DESC={data.SFI_MT_DESC} BRAND_DESC={data.BRAND_DESC} />
                      </div> */}
                    </div>

                    {/* hover */}
                    <div className="selectmaterial">
                      <div className="item-code" onClick={() => updateTextureFun(data.material_family[0])}>
                        <span>{data.ITEM_ID}</span>
                      </div>
                      <div className="bg-light">
                        <div className="color_tooltip">
                          <div className="color_tooltip_list d-inline-block">
                            <ul className="list-group list-group-horizontal">
                              {data.material_family && data.material_family.length > 0 ? data.material_family.slice(0, 2).map((family, key) => {
                                let active_cls = family.SII_CODE == selected ? 'mountgrid active' : 'mountgrid';
                                return (
                                  <li key={key} onClick={() => updateTextureFun(family)} className={active_cls} title={family.SII_ITEM_ID}>
                                    <IconComponent
                                      classprops={`img-fluid`}
                                      src={family.SII_THUMBNAIL_IMAGES ? item_img_path + family.SII_THUMBNAIL_IMAGES : img_path + 'noimage.jpg'}
                                      alt={family.SII_CODE || 'Sedar Global'}
                                      width={28}
                                      height={28}
                                      marginLeftRight
                                      contains={true}
                                    />
                                  </li>
                                )
                              }) : ''}
                              <li>
                                {data.material_family && data.material_family.length > 2 ?
                                  <OverlayTrigger trigger="click" placement="top" overlay={(e) => RenderTooltip(e, data.material_family)} rootClose >
                                    <p ref={target} className="opentooltip more_color" > +{data.material_family.length - 2}</p>
                                  </OverlayTrigger> : ''}
                              </li>
                            </ul>
                          </div>
                          {/* <div className="info d-inline-block">
                            <InfoLink link="#" {...data.material_family[0]} SFI_COLLECTION_DESC={data.SFI_COLLECTION_DESC} PATTERN_DESC_LANG={data.PATTERN_DESC_LANG} SFI_MT_DESC={data.SFI_MT_DESC} BRAND_DESC={data.BRAND_DESC} />
                          </div> */}
                        </div>
                        <Button variant="warning" onClick={() => updateTextureFun(data.material_family[0])}>{selected == data.material_family[0].SII_CODE ? t('Selected') : t('Select')}</Button>
                        {/* <Link to="#">Get Free Sample</Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          )
        })

        }
        {listInnerRef && listInnerRef.current && listInnerRef.current.scrollHeight ? '' : <Button className="load_more btn-warning" onClick={onScroll}>load More Material</Button>}
        {/* <Col sm={12} className="justify-content-center py-3">
        {totalPages !== page &&
          <>
            {loading ?
              <img style={{ width: '15%' }} src={`/assets/images/Customization/dancingloader.gif`} className="img-fluid" alt="sedarglobal"  />
              :
              <img style={{ width: '15%' }} onClick={() => setPage(page + 1)} src={`/assets/images/Customization/dancingloader.png`} className="img-fluid" alt="sedarglobal"  />

            }

          </>

        }
      </Col> */}
        {materialList.length == 0 ? t("Nodatafound") : ''}

      </Row>
      <Col sm={12} className="text-center py-1">
        {totalPages !== page &&
          <>
            {loading ?
              <img width="12%" role="button" src={`/assets/images/Customization/dancingloader.gif`} className="img-fluid" alt="sedarglobal" height="auto" />
              :
              ''
              // <img width="12%" role="button" onClick={() => setPage(page + 1)} src={`/assets/images/Customization/dancingloader.png`} className="img-fluid" alt="sedarglobal"  />

            }

          </>

        }
      </Col>
    </div>
  );

}

MaterialSelection.propTypes = {};

MaterialSelection.defaultProps = {};

export default MaterialSelection;
