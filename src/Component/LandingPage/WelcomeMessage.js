import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import ApiDataService from '../../services/ApiDataService';
const img_path = process.env.NEXT_PUBLIC_IMAGE_URL + 'assets/'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const WelcomeMessage = (props) => {
  const [socialListData, setSocialListData] = useState([]);

  const socialList = () => {
    let param = { content: 'Social Link' };
    ApiDataService.getAll("footer/getfooterData", param)
      .then(response => {
        let res_data = response.data;
        setSocialListData(res_data.result);
        console.log(res_data);
        //setClickCollectList(res_data.clickCollectResult);
      }).catch(e => {
        console.log(e, 'Error');
      });
  }

  useEffect(() => {
    socialList();
  }, []);

  return (
    <section className="welcome_message">
      <Row className="log_section">
        <Col className="logo">
          <LazyLoadImage
            classprops="nexticon"
            // src={img_path + 'images/brand/Sedar_Logo_white.png'}
            src="assets/images/brand/Sedar_Logo_white.png"
            width={19}
            height={10}
            quality={100}
          />
        </Col>
      </Row>
      <Row className="text_section">
        <Col className="text_mgs">
          <h1>Welcome Message</h1>
          <p>Impactful body message</p>
        </Col>
      </Row>
      <Row className="Footer3">
        <Col md={6} sm={12} className="contact_social text-end pe-0">
          <ul className="list-unstyled list-group list-group-horizontal">
            {socialListData && socialListData.map(function (row, index) {
              return <li key={index}>
                <a href={row.link_url} target="_blank" rel="noreferrer">
                  <LazyLoadImage effect="blur" src={row.image_path} alt="sedarglobal" width="auto" height="auto" />
                </a>
              </li>
            })}
          </ul>
        </Col>
      </Row>
    </section >
  );
};
export default WelcomeMessage;