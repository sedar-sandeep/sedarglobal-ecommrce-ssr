import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row, Tab, Nav, Form ,FloatingLabel } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LinkComponent from '@components/Link';

import { defaultLocale } from '@utils/i18n';


const ProfileOrderReturn = () => (
  <section className="ProfileOrderReturn mt-15">
    <Tab.Container id="ProfileMyorder-tab" defaultActiveKey="first">
      <Row>
        <Col sm={12}>
          <Nav variant="pills" className="flex-row tab-nav">
            <Nav.Item>
              <Nav.Link eventKey="first">Return Item</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={12} className="tab-content">
          <Tab.Content>
            <Tab.Pane eventKey="first" transition={false}>
              <div>
                <Row>
                  <Col sm={12}>
                    <div className="ordercol">
                      <Row>
                        <Col sm={2}>SR0035</Col>
                        <Col sm={5} className="p-0">
                          <div className="media item d-flex">
                            <div className="px-3">
                              <LazyLoadImage effect="" src={`/assets/images/profile/MaskGroup4322.png`} alt="sedarglobal" width="auto" height="auto" />

                            </div>
                            <Col className="media-body">
                              <h6>Item Code : <span>FR449C</span></h6>
                              <p>Sunscreen Roller Shades</p>
                              <h3>Shipped</h3>
                            </Col>
                          </div>
                        </Col>
                        <Col sm={3}>
                          <div className="price">
                            <p>AED 170.00</p>
                            <h6> <del>Aed 282.00</del> <span>50% OFF</span></h6>
                          </div>
                        </Col>
                        <Col sm={2}>
                          <div className="date">
                            <p>Apr 18 - 2020</p>
                          </div>
                        </Col>
                        <div className="ordercol-footer" style={{ borderTop: '1px solid #E9E9ED' }}>
                          <Col sm={12}>
                            <Form>
                              <Row>
                                <Col sm={12}>
                                  <div className="heading-section">
                                    <h3>Reason to return</h3>
                                    <p>This information is only used to improve our service</p>
                                  </div>
                                </Col>

                                <Col sm={6}>                                 
                                  <FloatingLabel controlId="floatingSelectGrid" label="Select Reson*" className="my-4">
                                    <Form.Control as="select" name="country" className="form-control inputText">
                                      <option>abcd</option>
                                      <option>Efgh</option>
                                    </Form.Control>
                                  </FloatingLabel>
                                </Col>
                                <Col sm={6}>
                                 
                                  <FloatingLabel controlId="floatingSelectGrid" label="Select Reason Detail*" className="my-4">
                                    <Form.Control as="select" name="country" className="form-control inputText">
                                    <option>abcd</option>
                                      <option>Efgh</option>
                                    </Form.Control>
                                  </FloatingLabel>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm={12}>
                                  <div className="heading-section">
                                    <h3>Reason to return</h3>
                                  </div>
                                </Col>
                                <Col sm={6}>                                 
                                  <FloatingLabel controlId="floatingSelectGrid" label="I want A new piece" className="my-4">
                                    <Form.Control as="select" name="country" className="form-control inputText">
                                    <option>abcd</option>
                                      <option>Efgh</option>
                                    </Form.Control>
                                  </FloatingLabel>
                                </Col>
                                <Col sm={6}>                                 
                                  <FloatingLabel controlId="floatingSelectGrid" label="Preferred Time*" className="my-4">
                                    <Form.Control as="select" name="country" className="form-control inputText">
                                    <option>abcd</option>
                                      <option>Efgh</option>
                                    </Form.Control>
                                  </FloatingLabel>
                                </Col>
                                <Col sm={12} className="Notice">
                                  <p>We will pick up the item you wish to return from the shipping address where it was</p>
                                  <div className="form-check labelstylecheckbox">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">I confirm the product is un used with original tags intact</label>
                                  </div>
                                </Col>
                                <Col sm={12}>
                                  <div className="border-button">
                                    <LinkComponent className="" href={`${defaultLocale}/faqpage`}  ><span>Cancel </span></LinkComponent>
                                  </div>
                                  <div className="color-button">
                                    <LinkComponent className="" href="/Profile/ProfileAddCard" ><span>Proceed</span></LinkComponent>
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </Col>
                        </div>
                      </Row>
                    </div>

                  </Col>
                </Row>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>

  </section>
);

ProfileOrderReturn.propTypes = {};

ProfileOrderReturn.defaultProps = {};

export default ProfileOrderReturn;
