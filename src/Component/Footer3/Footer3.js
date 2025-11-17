import React from "react";
import {Row, Col } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { isMobile, isTablet } from "react-device-detect";

export default function Footer3(data) {
  // const { isMOBILE, isTABLET, isLAPTOP, isDESKTOP } = useDevice();
  if (data?.CHILD == undefined || data?.CHILD[0]?.SUB_CHILD == undefined) {
    return false;
  }

  return (
    <div className="Footer3">

      {/* icon menu */}
      <Row className="footer_main_contact">
        <Col lg={7} md={12}>
          <Row>
            {isMobile || isTablet ?
              ''
              :
              data.CHILD[0] &&
              <Col lg={5} md={12} className="payment_method ps-1">
                <ul className="list-unstyled list-group list-group-horizontal">
                  {data.CHILD[0].SUB_CHILD.map(function (row, index) {
                    return <li key={index}><LazyLoadImage effect="blur" src={row.image_path} alt="sedarglobal" width="auto" height="auto" /></li>
                  })}
                </ul>
              </Col>

            }
            {data.CHILD[1] &&
              <Col lg={7} md={12} className="number ltr_text">
                <label>{data.CHILD[1].content}</label>
                <p>{data.CHILD[1].link_title}</p>
              </Col>
            }
          </Row>

        </Col>
        <Col lg={5} md={12}>
          <Row>
            {data.CHILD[2] &&
              <Col lg={7} md={12} className="email">
                <label>{data.CHILD[2].content}</label>
                <p className="eng_font">{data.CHILD[2].link_title}</p>
              </Col>
            }
            {data.CHILD[3] &&
              <Col lg={5} md={6} sm={12} className="contact_social text-end pe-0">
                <ul className="list-unstyled list-group list-group-horizontal">
                  {data.CHILD[3].SUB_CHILD && data.CHILD[3].SUB_CHILD.map(function (row, index) {
                    return <li key={index}>
                      <a href={row.link_url} target="_blank" rel="noreferrer">
                        <LazyLoadImage effect="blur" src={row.image_path} alt="sedarglobal" width="auto" height="auto" />
                      </a>
                    </li>
                  })}
                </ul>
              </Col>
            }
            {isMobile || isTablet ?
              data.CHILD[0] &&
              <Col lg={5} md={6} sm={12} className="payment_method ps-1 text-center">
                <ul className="list-unstyled list-group list-group-horizontal m-auto">
                  {data.CHILD[0].SUB_CHILD.map(function (row, index) {
                    return <li key={index}><LazyLoadImage effect="blur" src={row.image_path ? row.image_path : "#"} alt="sedarglobal" width="auto" height="auto" /></li>
                  })}
                </ul>
              </Col>
              :
              ''
            }

          </Row>
        </Col>
      </Row>

    </div>
  );
}

