import React from 'react';
import { SwiperSlide } from "swiper/react";
import { ImageComponent } from '@components/image';
import LinkComponent from '@components/Link';

export const Slider = (props) => {
  const { key, href, classprops, src, alt, width, height, title } = props;
  return (
    <React.Fragment key={key || 0}>
      
      <SwiperSlide key={key || 0} virtualIndex={key || 0}>
        <LinkComponent href={ href || ''}>
          <ImageComponent
            className={classprops}
            src={src || ''}
            alt={alt || ''}
            width={width}
            height={height}
          />
          {title && <div className="overly-color"></div>}
          {title && <div className="slider-text"> <p> {title} </p> </div>}
      </LinkComponent>
    </SwiperSlide>
      
    </React.Fragment>
  );
};