import React from 'react';
// import './VideoModal.scss';

import Modal from 'react-bootstrap/Modal';
// import ReactPlayer from 'react-player'

const VideoModal = (props) => {
  // //console.log(props)
  return (
    <>
      <Modal {...props}
        aria-labelledby="example-custom-modal-styling-title"
        dialogClassName="modal-80w VideoModal"
        centered>
        <div className="close-button" onClick={props.onHide}> ✕ </div>
        <Modal.Body>
          <div className='player-wrapper'>
            <video
              className='react-player'
              controls
              src={props.video_url}
              width='100%'
              height="calc(88vh - 100px)"
              config={{
                youtube: {
                  playerVars: { showinfo: 1, disablekb: 1 }
                }
              }}
            />
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
}
VideoModal.propTypes = {};

VideoModal.defaultProps = {};

export default VideoModal;
