import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import EnquiryForm from '../Utility/EnquiryForm';

const FreeConsultationBookForm = (props) => {

  const router = useRouter();
  const [queryParams, setQueryParams] = useState(false);

  useEffect(() => {
    if (!router.isReady) return; // Wait until router is ready

    setQueryParams(true);
  }, [router.isReady, router.query]);


  return (
    <section className="FreeConsultationBookForm pt-4" id="bookNow">
      <Container fluid="lg" className="">
        <Row>
          <Col sm={12}>
            <div className="headingsection pt-lg-2">
              {props.description && parse(props.description)}
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className="form-section">
              {queryParams ? <EnquiryForm
                form="Consultation"
                type={router.query && router.query.product_type && router.query?.product_type == 'Upholstery' ? 'U' : 'H'}
                // InterestedProductList={InterestedProduct}
                ConsultationType={props.CHILD && props.CHILD}
                {...props}
              />
                : ''}
            </div>
          </Col>
        </Row>
      </Container>

    </section>
  );
}


export default FreeConsultationBookForm;
