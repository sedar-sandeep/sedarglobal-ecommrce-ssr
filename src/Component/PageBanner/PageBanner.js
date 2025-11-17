import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const PageBanner = (props) => (
  <section className="PageBanner max1920">
    <picture>
      <source media="(max-width: 575.98px)" srcSet={props.image_path_portrait} />
      <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={props.image_path_landscape} />
      <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={props.image_path_03} />
      <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={props.image_path_02} />
      <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={props.image_path_01} />
      <LazyLoadImage effect="" src={props.image_path} alt={props.image_alt_seo} className="imsg" width="auto" height="auto" />
    </picture>
  </section>
);

PageBanner.propTypes = {};

PageBanner.defaultProps = {};

export default PageBanner;
