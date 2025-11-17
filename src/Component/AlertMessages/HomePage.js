import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LinkComponent from '@components/Link';


function HomePage(props) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <section className="position-relative max1920">
        <Alert className="sedar_notification" onClose={() => setShow(false)} dismissible closeVariant="white">
          <div className="text-center">
            <div className="notificationtxt">
              {props.image_path ? <i><LazyLoadImage effect="" src={props.image_path} alt="sedarglobal" width="auto" height="auto" /></i> : ''}
              {props.description ? parse(props.description) : ''}
              <span className='ps-3' ><LinkComponent href={props.link_url ? props.link_url : '#'}>{props.link_title}</LinkComponent></span>

              {/* <p className="d-inline-block">
          <span style={{letterSpacing: '1.7px' }} > LABOR DAY WEEKEND SPECIAL  -</span>
          <span style={{fontWeight:"normal"}}>   ENDS MONDAY </span>
          <span style={{marginLeft: '5px'}}> <a href="/">SHOP SALE </a>  </span>
             
           </p> */}
            </div>
          </div>
        </Alert>
      </section>
    );
  }
  return <div className="sedar_notification" onClick={() => setShow(true)} />;
}
export default HomePage;