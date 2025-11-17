import React from 'react';
import PropTypes from 'prop-types';
// import './ToolsAndGuidFaq.scss';
import { Col, Container, Row, Accordion, Card, AccordionContext, useAccordionButton } from 'react-bootstrap';
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

const ToolGuideFAQPageAccordion = (props) => {
  if (props.value == undefined) {
    ////console.log(props.value);
    return false;
  }

  return (
    <Accordion defaultActiveKey="card-0" className="faq-collapse">
      {props.value.map((data, index) => {
        return <Card key={index}>
          <Card.Header>
            <CustomToggle eventKey={`card-${index}`}>{data.title} </CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey={`card-${index}`}>
            <Card.Body>
              <div className="body-content">
                {parse(data.description)}
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      }
      )}
    </Accordion>
  )
}




const ToolsAndGuidFaq = (props) => {
  if (props == undefined) {
    
    return false;
  }
  const backgroundImage = {
    backgroundImage: "url('" + `${props.image_path}` + "')",
  };
  const Background = `/assets/images/Consultant/Group22721.png`;

  return (
    <section className="ToolsAndGuidFaq py-5" style={{ backgroundImage: `url(${Background})` }}>
     
      <Container className="maxwidth">
        <Row>
          <Col ms={12}>
            <div className="heading-section">
              {parse(String(props.description))}

            </div>
            <ToolGuideFAQPageAccordion value={props.CHILD} />
          </Col>
        </Row>
      </Container>
    

    </section>
  );
}

ToolsAndGuidFaq.propTypes = {};

ToolsAndGuidFaq.defaultProps = {};

export default ToolsAndGuidFaq;
