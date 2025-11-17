import React, { useState, useEffect, useContext } from "react";
import { Col, Row } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import HoverImage from "react-hover-image";
import { VscInfo } from 'react-icons/vsc';
import InfoPopup from "./InfoPopup";
import { updateBorderTextureImg, addLights, addToCartFunScene } from '../Scene';
import { CustomizationContext } from '../CustomizationProduct';
import ApiDataService from '../../../services/ApiDataService';
import { useTranslation } from "next-i18next";

//let base_url = process.env.REACT_APP_BASE_URL;
let img_path = '/' + "/assets/images/";

const InfoLink = (props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <VscInfo size={12} role="button" onClick={() => setModalShow(true)} /> <InfoPopup show={modalShow} onHide={() => setModalShow(false)} {...props} />
    </>
  )
}

const BorderColor = (props) => {
  const { t } = useTranslation("common");

  console.log(props, 'BorderColor');

  // return true;
  const [selected, setSelected] = useState();
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);
  const edit_step = customize_state.edit_step_data;
  const perPage = 18;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);

  const [materialList, setMaterialList] = useState([]);
  const [loading, setLoading] = useState(false);

  let SPI_PR_ITEM_CODE = customize_state.product_info ? customize_state.product_info.SPI_PR_ITEM_CODE : 0;
  let material_item_id = edit_step.info_result && edit_step.info_result.BORDER_COLOR ? edit_step.info_result.BORDER_COLOR.ITEM_ID : '0';


  useEffect(() => {
    let post_data = { content: 'customization_material', param: customize_state.filter_data, _limit: perPage, _page: page * perPage, material_item_id: material_item_id, texture_type: props.SPS_SS_CODE };
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
    getMaterialList();
  }, [page]);


  useEffect(() => {
    let post_data = { content: 'customization_material', param: customize_state.filter_data, _limit: perPage, _page: page * perPage, material_item_id: material_item_id, texture_type: props.SPS_SS_CODE };
    const getMaterialFilter = () => {
      if (customize_state.filter_data.length == 0) {
        return false;
      }

      //setLoading(true);
      ApiDataService.getAll(`customization/materialFilter/${SPI_PR_ITEM_CODE}`, post_data)
        .then(response => {
          let res_data = response.data;
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

  const updateTextureFun = (val) => {

    val = val ? val : [];
    props['ITEM_CODE'] = val.SII_CODE;
    props['material_info'] = val;
    updateBorderTextureImg(val);
    val.light_info && val.light_info.length > 0 ? addLights(val.light_info, val.SIO_LIGHT_INTENSITY) : '';
    props['SUB_CHILD'] = '';
    props['material_info']['light_info'] = '';


    customizeDispatch(props);
    setSelected(val.SII_CODE);

    if (customize_state.product_info && customize_state.product_info.m_width && customize_state.product_info.m_width) {
      setTimeout(
        function () {
          addToCartFunScene(customize_state, customizeDispatch);
        }
          .bind(this), 500);
    }
  }

  if (props.SUB_CHILD == undefined) {
    return false;
  }

  return (
    <div className="BorderColor SizeAndMount">


      {props.SUB_CHILD && props.SUB_CHILD.length > 0 ?
        <div className="step-heading">
          <h5>{props.SPS_DESC}</h5>
        </div> : ''}
      <div className="BorderOption">
        <Row>
          <Col sm={12}>
            <Row>
              {props.SUB_CHILD && props.SUB_CHILD.map((data, index) => {
                let active_cls = data.SII_CODE == selected ? 'mountgrid active' : 'mountgrid';
                return (
                  <Col xl={4} lg={6} sm={4} xs={6} className="px-1" key={index} >
                    <div className={active_cls} >
                      <img className="browseImage" src={data.SIO_DIFFUSE_IMG_PATH ? data.IMAGE_PATH + data.SIO_DIFFUSE_IMG_PATH : img_path + 'noimage.jpg'} hoverSrc={data.SII_IMAGE_PATH_TABLET} onClick={() => updateTextureFun(data)} />

                      <p>{data.SII_ITEM_ID} <InfoLink {...data} /></p>
                      {data.SII_CODE == selected ?
                        <div className="selected-icon">
                          <LazyLoadImage effect="" src={`/assets/images/Customization/Group23632.png`} className="img-fluid" alt={data.image_alt_seo} width="auto" height="auto" />
                        </div>
                        :
                        ''}
                    </div>
                  </Col>)
              })
              }
            </Row>
          </Col>
        </Row>
      </div>
      <Row className="materialselectlist hidescroll px-2">

        {materialList.length == 0 ? t("Nodatafound") : ''}
      </Row>
      <Row className="justify-content-center py-3">
        {totalPages !== page &&
          <>
            {loading ?
              <img style={{ width: '15%' }} src={`/assets/images/Customization/dancingloader.gif`} className="img-fluid" alt="sedarglobal" width="auto" height="auto" />
              :
              <img style={{ width: '15%' }} onClick={() => setPage(page + 1)} src={`/assets/images/Customization/dancingloader.png`} className="img-fluid" alt="sedarglobal" width="auto" height="auto" />

            }

          </>

        }
      </Row>
    </div>
  );

}


BorderColor.propTypes = {};

BorderColor.defaultProps = {};

export default BorderColor;
