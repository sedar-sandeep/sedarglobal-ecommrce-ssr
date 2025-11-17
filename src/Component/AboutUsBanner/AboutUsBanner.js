import React, { useState } from 'react';
// import './AboutUsBanner.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import VideoModal from "../VideoModal/VideoModal";


const AboutUsBanner = (props) => {

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <section className="AboutUsBanner max1920">
        <div className="AboutUsBanner" onClick={() => setModalShow(true)}>
          {/* <LazyLoadImage effect="" className="AboutUsBanner_img" src={props.image_path} alt="sedarglobal" /> */}
          {/* <div className="AboutUsBanner_text">        
            <div className="watchvideodiv">
            <button className="btn watchvideo" onClick={()=>setModalShow(true)} >Watch Video</button>
            </div>
          </div> */}
          <picture>
            <source media="(max-width: 575.98px)" srcSet={props.image_path_portrait} />
            <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={props.image_path_landscape} />
            <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={props.image_path_03} />
            <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={props.image_path_02} />
            <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={props.image_path_01} />
            <LazyLoadImage effect="" src={props.image_path} alt={props.image_alt_seo} className="imsg" width="auto" height="auto" />
          </picture>
        </div>
      </section>
      {props.CHILD && props.CHILD[0] ?
        <VideoModal show={modalShow} onHide={() => setModalShow(false)} video_url={props.CHILD && props.CHILD[0].image_path != null ? props.CHILD[0].image_path : 'https://www.sedarglobal.com/assets/video/sedar-story.mp4'} />
        : ''}
    </>
  );
}




AboutUsBanner.propTypes = {};

AboutUsBanner.defaultProps = {};

export default AboutUsBanner;
