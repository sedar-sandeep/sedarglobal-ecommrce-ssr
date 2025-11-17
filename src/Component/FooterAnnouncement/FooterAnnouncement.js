import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, CloseButton, Stack } from 'react-bootstrap';
import parse from 'html-react-parser';
import MoreEnquires from "../Contact/MoreEnquires";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Collapse } from 'react-collapse';
import { useTranslation } from 'next-i18next';
import EnquiryForm from '../Utility/EnquiryForm';

const FooterAnnouncement = (props) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('common');

  //  
  const ref = useRef(null);
  const handleClick = () => {
    setTimeout(() => {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 500);
  };

  useEffect(() => {
    open ? handleClick() : ''
  }, [open])

  return (
    <>

      <section className="FooterAnnouncement  mt-5">
        <Container className="max-content">
          <Row>
            <Col sm={12} className="d-flex col-first justify-content-start ">
              <p className='mb-0'> {props.description ? parse(props.description) : t('Foryourinspiredrequirements')}  <button className="btn-announcement zoom-animation" onClick={() => { setOpen(!open); }}
                aria-controls="example-fade-text"
                aria-expanded={open} > {t('Writetous')}  </button></p>
              {/* {props.description?parse(props.description):''} */}
            </Col>
            {props.image_path &&
              <Col sm={12} className="text-end col-second">
                {/* <img className="img-fluid" src={`/assets/images/Group 6634.png`} alt="sedarglobal" /> */}
                <LazyLoadImage effect="" className="img-fluid" src={props.image_path} alt={props.image_alt_seo} title={props.title} width="auto" height="auto" />
              </Col>
            }

          </Row>

        </Container>
      </section>
      <section className="announcement-contact position-relative" ref={ref}>
        <Container className="maxwidth  position-relative">
          <Container className=" position-relative p-0 px-md-3">

            <Collapse isOpened={open}>
              <Stack direction='horizontal' className='w-100 justify-content-between mb-3 mt-5'>
                <div></div>
                <div>
                  {open ? <CloseButton onClick={() => setOpen(!open)} className="" style={{ zIndex: '1' }} /> : ''}
                </div>
              </Stack>

              <Row>
                <Col sm={12}>
                  <div className="headingsection pt-lg-2">
                    {props.CHILD && props.CHILD[0] && parse(props.CHILD[0].description)}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col sm={12} style={{ paddingBottom: '15px' }} className="FreeConsultationBookForm">
                  <div className="form-section">
                    <EnquiryForm
                      form="Consultation"
                      type="H"
                      ConsultationType={props.CHILD && props.CHILD[0] && props.CHILD[0]['SUB_CHILD'] ? props.CHILD[0]['SUB_CHILD'] : ''}
                      {...props.CHILD}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  {props.CHILD && props.CHILD != undefined && props.CHILD[1] && props.CHILD[1]['SUB_CHILD'] ? <MoreEnquires data={props.CHILD && props.CHILD != undefined && props.CHILD[1] ? props.CHILD[1] : ''} /> : ''}
                </Col>
              </Row>
            </Collapse>

          </Container>
        </Container>
      </section>
    </>
  );
}

FooterAnnouncement.propTypes = {};

FooterAnnouncement.defaultProps = {};

export default FooterAnnouncement;
