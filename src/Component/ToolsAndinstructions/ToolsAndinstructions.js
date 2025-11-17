import React from 'react';
// import './ToolsAndinstructions.scss';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import parse from 'html-react-parser';
import ToolsAndinstructionsModal from './ToolsAndinstructionsModal';

const ToolsAndinstructions = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowdata, setModalShowdata] = React.useState(false);
  if (props == undefined) {
    
    return false;
  }
  const Background = `/assets/images/Consultant/Group22720.png`;
  return (
    <section className="ToolsAndinstructions px-3" style={{ backgroundImage: `url(${Background})` }}>
      <Container className="max-content px-3">
        <div className="heading-section py-3">
          {parse(String(props.description))}
        </div>


        <div className="tab-section">
        <Tab.Container id="left-tabs-example" defaultActiveKey="0">
          <Row>
            <Col sm={12}>
              <Nav variant="pills" className="flex-row desk-tabnav flex-nowrap hidescroll py-3" >
                {props.CHILD && props.CHILD.map((data, index) => {
                  return <Nav.Item key={index}>
                    <Nav.Link eventKey={index}>{data.title} </Nav.Link>
                  </Nav.Item>
                })}
              </Nav>
            </Col>

            <Container className="max-content py-3">
              <Col sm={12}>


                {props.CHILD && props.CHILD.map((data, index) => {
                  return (
                    <Tab.Content key={index}>
                      {props.CHILD[index].SUB_CHILD ?
                        <Tab.Pane eventKey={index}>
                          <Row>
                            {props.CHILD[index].SUB_CHILD.map((data, index) => {

                              return (
                                <React.Fragment key={index}>
                                  {/* {//console.log(props.CHILD[index].SUB_CHILD[index],'dd')} */}
                                  <Col xs={6} sm={4} key={index} onClick={() => { setModalShow(true); setModalShowdata(data) }} >
                                    <div className="tab-grid">
                                      <LazyLoadImage effect="" src={data.image_path} alt={data.image_alt_seo} title={data.title} width="auto" height="auto" />
                                      <h5>{data.title}  </h5>
                                    </div>
                                  </Col>

                                </React.Fragment>
                              )
                            })}

                          </Row>

                        </Tab.Pane>
                        : ''}

                    </Tab.Content>
                  )
                })}
              </Col>
            </Container>
          </Row>
        </Tab.Container>
        </div>
      </Container>

      <ToolsAndinstructionsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={modalShowdata}
      />
    </section>
  );
}








ToolsAndinstructions.propTypes = {};

ToolsAndinstructions.defaultProps = {};

export default ToolsAndinstructions;
