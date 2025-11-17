import { Col, Container, Row } from 'react-bootstrap';
// import './FranchiseeContactForm.scss';
import parse from 'html-react-parser';
// import { t_lang } from '../../services/i18n';
// import { useForm } from "react-hook-form";
// import ApiDataService from '../../services/ApiDataService';
import EnquiryForm from '../Utility/EnquiryForm';

const FranchiseeContactForm = (props) => {

  return (
    <section className="FranchiseeContactForm px-3" id="FranchiseeContactForm">
      <div className="ContactForm pt-3 pt-md-5 mt-md-5">

        <Container className="max-width">
          <Row>
            <Col sm="12 headingsection">
              {props.description ? parse(props.description) : ''}
              {/* <h1>Become a Franchisee</h1>
            <label htmlFor="for heading">Start a conversation or To Contact us via email, Please fill out the form</label> */}
            </Col>
          </Row>
          <Row>
            <Col sm="12 form">
              <EnquiryForm form="Franchisee" type="F" />
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}



export default FranchiseeContactForm;
