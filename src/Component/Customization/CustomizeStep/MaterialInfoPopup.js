import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Swiper, SwiperSlide } from 'swiper/react';

import parse from 'html-react-parser';
import { useTranslation } from 'next-i18next';
const item_img_path = process.env.NEXT_PUBLIC_ITEM_IMG_WEBP_PATH + 'laptop/';

const MaterialInfo = (data) => {
  const { t } = useTranslation("common")
  return (
    <ul>
      {data.SII_ITEM_ID ? <li><b>{t('item_Code')} : </b>{data.SII_ITEM_ID}</li> : ''}
      {data.SII_WIDTH ? <li><b>{t('Maximum_Width')} : </b>{data.SII_WIDTH}</li> : ''}
      {data.SFI_COLLECTION_DESC ? <li><b>{t('Collection')} : </b>{data.SFI_COLLECTION_DESC}</li> : ''}
      {data.BRAND_DESC ? <li><b>{t('Brand')} : </b>{data.BRAND_DESC}</li> : ''}
      {data.PATTERN_DESC_LANG ? <li><b>{t('Pattern')} : </b>{data.PATTERN_DESC_LANG}</li> : ''}
      {data.SFI_MT_DESC ? <li><b> {t('Material_Type')} : </b>{data.SFI_MT_DESC}</li> : ''}
      {/* <li><b>{t('Color_Group')} : </b>{data.COLOR_GROUP_DESC}</li> */}
    </ul>
  )
}

const MaterialInfoPopup = (props) => {
  let img_array = [item_img_path + props.SII_THUMBNAIL_IMAGES, props.IMAGE_PATH + props.SIO_DIFFUSE_IMG_PATH];

  return (
    <Modal
      //{...props}
      show={props.show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="InfoPopup"
    >

      <Modal.Body className="p-0">
        <div className="close-button">
          <Button onClick={props.onHide}> ✕ </Button>
        </div>
        <Swiper
        //{...props}
        >

          {img_array ? img_array.map((data, index) => {
            return (
              <SwiperSlide key={index}>
                <LazyLoadImage effect="" src={data} width="100%" style={{ maxHeight: '380px' }} height="auto" />
              </SwiperSlide>
            )
          })
            : ''}
        </Swiper>
        <div className="p-5">
          <h5>{props.SII_DESC}</h5>
          {props.materila_info ? <MaterialInfo {...props} /> : ''}
          {props.SII_MORE ? parse(props.SII_MORE) : ''}

        </div>
      </Modal.Body>

    </Modal>
  );
}

MaterialInfoPopup.propTypes = {};

MaterialInfoPopup.defaultProps = {};

export default MaterialInfoPopup;
