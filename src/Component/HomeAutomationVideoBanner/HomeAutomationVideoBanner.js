import React, { useState } from 'react';
// import './HomeAutomationVideoBanner.scss';
// import VideoModal from "../VideoModal/VideoModal";
// import ReactPlayer from 'react-player';
// import parse from 'html-react-parser';

const HomeAutomationVideoBanner = (props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <section className="HomeAutomationVideoBanner max1920">
        <div className="videobanner">
          {props?.CHILD?.[0]?.image_path?.split('.')[3] === 'mp4' ?
            <div className='player-wrapper'>
              <video
                className='react-player'
                src={props.CHILD?.[0]?.image_path}
                width='100%'
                height="100%"
                playing={true}
                muted={true}
                loop={true}
                controls
              />
            </div>
            :
            <img src={props?.CHILD?.[0]?.image_path} alt="sedarglobal" width="auto" height="auto" />
          }

          {/* <div className="center-item">
            {props.CHILD && props.CHILD[0] ?
              <div className="center-content">
                <button className="btn playicon" onClick={() => setModalShow(true)}>
                  <img src={`/assets/images/Automation/Group22983.png`} alt="sedarglobal" />
                </button>
              </div>
              : ''}
          </div> */}
        </div>
      </section>
      {/* {props.CHILD && props.CHILD[0] ?
        <VideoModal show={modalShow} onHide={() => setModalShow(false)} video_url={props.CHILD && props.CHILD[0].image_path != null ? props.CHILD[0].image_path : 'https://www.sedarglobal.com/assets/video/sedar-story.mp4'} />
        : ''} */}
    </>
  );
}

HomeAutomationVideoBanner.propTypes = {};
HomeAutomationVideoBanner.defaultProps = {};
export default HomeAutomationVideoBanner;
