import React from 'react';

import { Container, Row, Col, Image } from 'react-bootstrap';
import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LinkComponent from '@components/Link';
import { IconComponent } from '@components/image';

const QuickContact = (props) => {
  if (props.CHILD == undefined) {

    return false;
  }

  const bg_color = ['#FFDB7E', '#D2D1D2', '#DFD1C4', '#E7DDD1'];
  function openWidget() { FreshworksWidget('open'); }
  return (
    <section className="QuickContact pt-5">
      <Container className="max-content">
        <Row>
          <Col sm={12} className="heading">
            {/* <h1>Have Some Questions?</h1>
            <p>Send us a message and we’ll respond as soon as possible</p> */}
            {props.description ? parse(props.description) : ''}
          </Col>
        </Row>
        <Row>
          <Col sm={12} className="contactmethod pt-5">
            <Row>

              {props.CHILD && props.CHILD.map((data, index) => {
                return (
                  <Col sm={6} md={6} lg={3} xs={6} className="contactbox" key={index} >
                    <div className="box zoom-animation" style={{ background: bg_color[index] }}>
                      {/* <picture>
                        <source media="(max-width: 575.98px)" srcSet={data.image_path_portrait} />
                        <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={data.image_path_landscape} />
                        <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={data.image_path_03} />
                        <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={data.image_path_02} />
                        <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={data.image_path_01} />
                        <LazyLoadImage effect="" src={data.image_path} alt={data.image_alt_seo} className="img-fluid boximage" width="auto" height="auto" />
                      </picture>
                      <h5>{data.title}</h5> */}

                      <IconComponent
                        classprops="img-fluid boximage"
                        src={data.image_path && data.image_path}
                        alt={data.link_url || 'Sedar Global'}
                        width={120}
                        height={120}
                      />
                      <h5>{data.title}</h5>
                      {data.SUB_CHILD && data.SUB_CHILD ?
                        <Col md={10} sm={12} className="contact_social text-end pe-0">
                          <ul className="list-unstyled list-group list-group-horizontal">
                            {data.SUB_CHILD.map((data, index) => {
                              return <li className="" key={index}><a href={data.link_url} to={data.link_url} title={data.title} >
                                {/* <Image src={data.image_path} alt="sedarglobal" width={18} height={18} /> */}
                                <IconComponent
                                  src={data.image_path && data.image_path}
                                  alt={data.link_url || 'Sedar Global'}
                                  width={18}
                                  height={18}
                                />
                              </a></li>
                            })}
                            {/* <li className="" ><LinkComponent href={"/"}><Image src={`/assets/images/socialMedia/facebook6@2x.png`} alt="sedarglobal" style={{ maxWidth: "25px" }} /></LinkComponent></li>
                      <li><LinkComponent href={"/"}><Image src={`/assets/images/socialMedia/twitter-black-shape@2x.png`} alt="sedarglobal" style={{ maxWidth: "22px" }} /></LinkComponent></li>
                      <li><LinkComponent href={"/"}><Image src={`/assets/images/socialMedia/youtube@2x.png`} style={{ maxWidth: "25px" }} /></LinkComponent></li>
                      <li><LinkComponent href={"/"}><Image src={`/assets/images/socialMedia/brands-and-logotypes@2x.png`} alt="sedarglobal" style={{ maxWidth: "20px" }} /></LinkComponent></li> */}
                          </ul>
                        </Col>
                        :
                        // index == 0 ?
                        <a href={`${data.link_url}`}>
                          <button className="btn btn-primary rounded-0 chatbutton" > {data.link_title} </button>
                        </a>
                        // : index == 1 ?
                        //   <a href={`mailto:wecare@sedarglobal.com?Subject=customer service`}>
                        //     <button className="btn btn-primary rounded-0 chatbutton" > {data.link_title} </button>
                        //   </a> : index == 2 ?
                        //     <LinkComponent href={`contact`}>
                        //       <button className="btn btn-primary rounded-0 chatbutton" > {data.link_title} </button>
                        //     </LinkComponent> : ''
                      }
                    </div>
                  </Col>
                )
              })
              }
              {/* <Col sm={3} xs={6} className="contactbox" >
                  <div className="box" style={{ background: '#FFDB7E' }}>
                    <img src={`/assets/images/chat.png`} className="img-fluid boximage" alt="Responsive image" />
                    <h5>Chat with Us</h5>
                    <button className="btn btn-primary chatbutton"> Live Chat </button>
                  </div>

                </Col>
                <Col sm={3} xs={6} className="contactbox" >
                  <div className="box" style={{ background: '#D2D1D2' }}>
                    <img src={`/assets/images/message.png`} className="img-fluid boximage" alt="Responsive image" />
                    <h5>Drop A Line</h5>
                    <button className="btn btn-primary chatbutton"> Submit Request </button>
                  </div>
                </Col>
                <Col sm={3} xs={6} className="contactbox" >
                  <div className="box" style={{ background: '#DFD1C4' }}>
                    <img src={`/assets/images/phone.png`} className="img-fluid boximage" alt="Responsive image" />
                    <h5>Text us</h5>
                    <button className="btn btn-primary chatbutton"> Text with Us </button>
                  </div>

                </Col>
                <Col sm={3} xs={6} className="contactbox ">
                  <div className="box" style={{ background: '#E7DDD1' }}>
                    <img src={`/assets/images/follow.png`} className="img-fluid boximage" alt="Responsive image" />
                    <h5>Follow Us On</h5>
                    <Col md={7} sm={12} className="contact_social text-end pe-0">
                      <ul className="list-unstyled list-group list-group-horizontal">
                        <li className="" ><LinkComponent href={"/"}><Image src={`/assets/images/socialMedia/facebook6@2x.png`} alt="sedarglobal" style={{ maxWidth: "25px" }} /></LinkComponent></li>
                        <li><LinkComponent href={"/"}><Image src={`/assets/images/socialMedia/twitter-black-shape@2x.png`} alt="sedarglobal" style={{ maxWidth: "22px" }} /></LinkComponent></li>
                        <li><LinkComponent href={"/"}><Image src={`/assets/images/socialMedia/youtube@2x.png`} style={{ maxWidth: "25px" }} /></LinkComponent></li>
                        <li><LinkComponent href={"/"}><Image src={`/assets/images/socialMedia/brands-and-logotypes@2x.png`} alt="sedarglobal" style={{ maxWidth: "20px" }} /></LinkComponent></li>
                      </ul>
                    </Col>
                  </div>

                </Col> */}


            </Row>
          </Col>
        </Row>
      </Container>

    </section>
  );
}

QuickContact.propTypes = {};

QuickContact.defaultProps = {};

export default QuickContact;
