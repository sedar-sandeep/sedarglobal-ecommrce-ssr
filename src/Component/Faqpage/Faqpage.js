import React from 'react';
import { Col, Container, Row, Tab, Nav, Image, Accordion, Card, AccordionContext, useAccordionButton } from 'react-bootstrap';
// import './Faqpage.scss';
import parse from 'html-react-parser';

function CustomToggle({ children, eventKey, callback }) {
  const currentEventKey = React.useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );
  const isCurrentEventKey = currentEventKey.activeEventKey == eventKey;
 
  return (
    <div onClick={decoratedOnClick} className="faq-question">
      <span className="iconcollapse">{isCurrentEventKey ? "-" : "+"} </span> <span className="faq-question-text">{children} </span>
    </div>
  );
}

const FAQPageAccordion = (props) => {

  if (props.SUB_CHILD == undefined) {
    //
    return false;
  }

  return (
    <Accordion className="faq-collapse">
      {props.SUB_CHILD.map((data, index) => {
        return (
          <Card key={index} >
            <Card.Header>
              <CustomToggle eventKey={index} > {data.title}</CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index}>
              <Card.Body>
                <div className="body-content">
                  {data.description ? parse(data.description) : ''}
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        )
      })
      }
    </Accordion>
  );
}


const Faqpage = (props) => {
  if (props.CHILD == undefined) {
    
    return false;
  }

  
  return (
    <section className="Faqpage">
      <Container className="maxwidth">
        <Row>
          <Col sm={12}>
            <div className="heading-section">
              {props.description ? parse(props.description) : ''}
            </div>
          </Col>
        </Row>

      </Container>
      <Container className="maxwidth">
        <Row>
          <Col sm={12} className="faq-content">
            <Tab.Container id="left-tabs-example" defaultActiveKey="0">
              <Row>
                <Col sm={4}>
                  <div className="faq-tab-body">
                    <Nav variant="pills" className="flex-column">
                      {props.CHILD.map((data, index) => {
                        return (
                          <Nav.Item key={index}>
                            <Nav.Link eventKey={index}><h3 className="fs-5">{data.title}</h3></Nav.Link>
                          </Nav.Item>
                        )
                      })
                      }
                    </Nav>
                  </div>
                </Col>
                <Col sm={8}>

                  <Tab.Content>
                    {props.CHILD.map((data, index) => {
                      return (
                        <Tab.Pane eventKey={index} key={index} transition={false}>
                          <FAQPageAccordion {...data} />
                        </Tab.Pane>
                      )
                    })
                    }
                  </Tab.Content>
                </Col>

              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

Faqpage.propTypes = {};

Faqpage.defaultProps = {};

export default Faqpage;
