import React from 'react';
import { ImageComponent } from '@components/image';

const CommonBannerPage = (props) => (
  <div className="CommonBannerPage max1920">
    <ImageComponent
      classprops="img-fluid"
      src={props.image_path}
      alt={props.image_alt_seo} 
      width={1920}
      height={508} 
      contains={true}
    />
  </div>
);

export default CommonBannerPage;
