import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, Col, Row, Container, FloatingLabel } from 'react-bootstrap';

import parse, { domToReact } from 'html-react-parser';
// import { } from ../../services/i18n';
import EnquiryForm from '../Utility/EnquiryForm';
import ScrollTo from "react-scroll-into-view";
import axios from "axios";
import { ccy_decimals, cn_iso, countryName, langName, visitorId } from '@utils/i18n';
import axiosInstance from '@utils/axios';
import { useTranslation } from 'next-i18next';



const site_id = process.env.NEXT_PUBLIC_SITE_ID; //100001;


function ContactFormpage(props) {

  let path_url = `?lang=${langName}&site=${site_id}&country=${countryName}&content="contact"&"visitorId"=${visitorId}&currency=${''}&ccy_decimal=${ccy_decimals}&cn_iso=${cn_iso}`;

  const [ContactCategory, setContactCategory] = useState();
  const { t } = useTranslation('common');
  const getContactCategory = async () => {
    const response = await axiosInstance
      .get(`content/fetch_enquiry${path_url}`)
      .catch((error) => {
        console.log(error);
      });

    setContactCategory(response.data)
  };

  useEffect(() => {
    getContactCategory();
  }, []);





  return (
    <section className="ContactFormpage-sec px-3 px-xl-0" style={{ backgroundColor: "#f5ece0" }}>

      <Container className="maxwidth">
        <Row>
          <Col sm="6" className="section_first">

            <h6>{props.title}</h6>

            {props.description ?
              parse(props.description, {
                replace: domNode => {

                  if (domNode.name && domNode.children && domNode.name == 'h1') {
                    return <h2>{domToReact(domNode?.children)}</h2>
                  }
                }
              })
              : ''}

            <ScrollTo selector={`#MoreEnquires`} smooth={false} scrollOptions={{ block: "center" }} block="center"  >
              <a className="More_Enquiries  d-none d-sm-block text-start py-2">{props.link_title}</a>
            </ScrollTo>
            <Col sm={12} className="text-start col-second">
              <img className="img-fluid" src={`/assets/images/Group 6634.png`} alt="sedarglobal" width="auto" height="auto" />
              {/* <LazyLoadImage effect="" className="img-fluid" src={props.image_path} alt={props.image_alt_seo} title={props.title} /> */}
            </Col>

          </Col>
          <Col sm="12" md="6" className="section_sec">
            <div className="heading ">
              <label className='d-none d-sm-block'>{t('ToContactusviaemailPleasefillouttheform')} </label>
            </div>
            <EnquiryForm form="contact" type="C" hideField={"A"} ContactCategoryList={ContactCategory} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

ContactFormpage.propTypes = {};

ContactFormpage.defaultProps = {};

export default ContactFormpage;

