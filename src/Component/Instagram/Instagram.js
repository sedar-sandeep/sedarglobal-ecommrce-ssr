import React, { useState, useEffect } from 'react';
import 'react-ig-feed/dist/index.css'
import { Container, Row, Col, Image } from 'react-bootstrap';
import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ApiDataService from '../../services/ApiDataService';

const API_LOCATION = `${process.env.NEXT_PUBLIC_API_URL}fetch/instagram`;

const InstagramBackground = {
  backgroundImage: "url('" + `/assets/images/Instagram/Path%2021189@2x.png` + "')",
  backgroundPosition: '49% 50%',
  backgroundSize: '18% 54%',
  backgroundRepeat: 'no-repeat'


};

const Instagram = (props) => {
  const [insta, setInsta] = useState([]);
  useEffect(() => {
    ApiDataService.getAll(API_LOCATION)
      .then(response => {
        setInsta(response.data.result);
      }).catch((error) => {
        console.log(error);
      });
  }, []);
 

  return (
    <section className="Instagram pt-5 mt-sm-5">
      <Container className="InstagramCollection" style={InstagramBackground}>
        <Row className="Instagram-content-row">
          <Col md={6} sm={12} className="Instagram-content">
            <Row>
              {insta && insta.map((row, key) => (
                
                <Col md={6} sm={12} className="my-3" key={key}>
                  <a href={"#"} target="_blank" rel="noreferrer">
                    <LazyLoadImage effect="" src={row.SI_MEDIA_URL} width="auto" height="auto" />
                  </a>
                </Col>
                
              ))}
            </Row>
            

            {/* <InstagramFeed token="IGQVJXcTk5XzZAoaFRVLXdoaEJhUWJnUmN2RmxwVlV0blVmQ1ZABa3RHaUtsdUczVXdrMDFmd3VxQXlDcVRfR0lWdnFtbDV5V0NqMTB3QWNONXNITWV5NGYwcFl1NmJMbC1WRlRQbzBUTV9BNXBuX0xMUwZDZD" counter="4" /> */}
          </Col>
          <Col md={6} sm={12} className="InstagramCollection-text my-3">
            <LazyLoadImage effect="" src={props.image_path} alt={props.image_alt_seo} title={props.title} width="auto" height="auto" />
            {/* <Image className="insta-icon" src={`/assets/images/Instagram/brands-and-logotypes-B(2).png`} /> */}
            <div className="desc">
              {props.description ? parse(props.description) : ''}
            </div>
            <Col sm={12} className="Follow-sedarglobal">
              <a href={"#"} target="_blank" rel="noreferrer"> {props.link_title}</a>
            </Col>
          </Col>
        </Row>
      </Container>

    </section>
  );
}
Instagram.propTypes = {};

Instagram.defaultProps = {};

export default Instagram;
