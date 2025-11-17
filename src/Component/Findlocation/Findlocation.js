import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
// import './Findlocation.scss';

const Findlocation = () => (

  <section className="Findlocation">

    <Container className="maxwidth map-section">
      <Row>
        <Col className="country" xl={4} lg={4} md={5} sm={12}>
          <div className="country-list">
            <div className="Our-Offices">
              <h1>Find your Store</h1>
              <p>Sometimes, you just need to see it in-person. Schedule a personal shopping appointment with an Account Executive at your local DWR store.</p>


            </div>

            <form className="ContactForm row ">

              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Col sm="12" className="form-group user_input_wrp">
                  <Form.Control
                    type="text"
                    className="form-control inputText"
                    name="Enter town, city, or Postal code here"
                  />
                  <span className="floating-label">Enter town, city, or Postal code here <span>*</span></span>
                </Col>

                <Col sm="12" className="form-group user_input_wrp">
                  <select className="form-control" >
                    <option>your area</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>


                </Col>
                <Col sm="12" className="form-group user_input_wrp">
                  <select className="form-control" >
                    <option>Within 10 miles</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>


                </Col>


                <Col sm={12} className="text-end">
                  <Button className="btn sedar-btn">Locate Our Store</Button>
                </Col>

                <Col sm={12} className="text-center or_text">
                  <p>or</p>
                </Col>

                <Col sm={12} className="text-end">
                  <Button className="btn sedar-location">Use My Location</Button>
                </Col>
                <div className="store">
                  <p>There are 35 sedar stores.</p>
                  <span><a>View All Stores </a></span>
                </div>
              </Form.Group>


            </form>



          </div>
        </Col>
        <Col xl={8} lg={8} md={7} sm={12} className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3696171.4837213554!2d51.19128348202764!3d25.218647798366618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1351614c1e26ff48!2sSedar%20Global%20-%20Curtains%2C%20Wallpapers%2C%20Blinds%20Qatar!5e0!3m2!1sen!2sae!4v1623656952241!5m2!1sen!2sae"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen=""
          />
        </Col>
      </Row>
    </Container>
  </section>

);

Findlocation.propTypes = {};

Findlocation.defaultProps = {};

export default Findlocation;
