import React from 'react';
// import './ToolsAndinstructions.scss';
import { Container, Row, Col, Tab, Nav, Modal, CloseButton } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import parse from 'html-react-parser';
import { useTranslation } from 'next-i18next';
// import { t } from '../../services/i18n';



const ToolsAndinstructionsModal = (props) => {
  const { t } = useTranslation("common")
  ////console.log(props.data, 'ddjhhdhd')

  // if (props.data == undefined) {
  //   //console.log(props.CHILD);
  //   return false;
  // }

  var filetype;
  return (
    <Modal
      {...props}
      size={props.data.GALLERY ? 'lg' : 'xl'}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="ToolsAndinstructionsModal"
    >

      <Modal.Body className="p-0">
        <CloseButton onClick={props.onHide} className="p-3 position-absolute top-0 end-0" />
        <Container>
          {props.data.GRAND_CHILD ? (

            <Row>
              <Col md={6} className="p-0">
                {props.data.image_path && <img className="w-100 h-100" effect="blur" src={props.data.image_path} alt={props.data.title} title={props.data.title} width="auto" height="auto" />}
              </Col>
              <Col md={6} className="py-5 px-4">
                <Row>
                  <h4 >{props?.data?.GRAND_CHILD && props?.data?.GRAND_CHILD[0]['title'] ? props?.data?.GRAND_CHILD[0]['title'] : t("Nodatafound")}  </h4>
                  {props?.data?.GRAND_CHILD && props?.data?.GRAND_CHILD[0]['GRAND_CHILD_2'] && props?.data?.GRAND_CHILD[0]['GRAND_CHILD_2'].map((data, index) => {
                    return (
                      <Col key={index} sm={12}>
                        <div className="text-warning my-2 fs-5 fw-bold">{parse(data.description)}</div>

                        <Row>
                          {data.GRAND_CHILD_3 && data.GRAND_CHILD_3.map((data1, index) => {
                            return (
                              <>
                                {data1.image_path && data1.image_path.split('.').pop() == 'pdf' || data1.image_path && data1.image_path.split('.').pop() == 'mp4' ? (
                                  <>
                                    <Col key={index} lg={6} className="py-2">
                                      <a href={data1.image_path} rel="noreferrer" target="_blank" className="text-dark d-flex" style={{ fontSize: "1.14rem" }}>
                                        {parse(data1.title)}
                                        <span className="px-2">
                                          {data1.image_path.split('.').pop() == 'pdf' ? (
                                            <LazyLoadImage className="w-100" effect="" src={`/assets/images/toolguide/pdf.png`} alt={data1.title} title={data1.title} width="auto" height="auto" />
                                          ) : data1.image_path.split('.').pop() == 'mp4'
                                              ? (<LazyLoadImage className="w-100" effect="" src={`/assets/images/toolguide/mp4.png`} alt={data1.title} title={data1.title} width="auto" height="auto" />)
                                            : ''
                                          }
                                        </span>
                                      </a>
                                    </Col>
                                  </>
                                ) : ''
                                }
                              </>
                            )
                          })}
                        </Row>
                      </Col>

                    )
                  })
                  }

                </Row>
              </Col>
            </Row>
          ) : (
            <Row>

              <Col md={6} className="p-0">
                  <LazyLoadImage className="w-100 h-100" style={{ maxHeight: "338px", objectFit: "cover" }} src={`${props.data.image_path}`} alt={props.data.title} title={props.data.title} width="auto" height="auto" />
              </Col>
              <Col md={6} className="py-5 px-4">
                <Row>
                  <h2 className='pt-2 pb-4'>{props.data.title}</h2>
                  <h5 className='pt-2 pb-4'>{props.data.desc}</h5>

                  {props.data.pdf_path && (
                    <Col lg={6} className="py-2">
                      <a href={props.data.pdf_path} rel="noreferrer" target="_blank" className="text-dark d-flex" style={{ fontSize: "1.14rem" }} >
                        <span className="px-2">
                            <LazyLoadImage className="w-20 h-20" effect="" src={`/assets/images/toolguide/pdf.png`} alt={props.data.desc} title={props.data.desc} width="auto" height="auto" />
                        </span>
                        {t("PDF")}
                      </a>
                    </Col>
                  )}
                  {props.data.video_path && (
                    <Col lg={6} className="py-2">
                      <a href={props.data.video_path} rel="noreferrer" target="_blank" className="text-dark d-flex" style={{ fontSize: "1.14rem" }}>
                        <span className="px-2">
                            <LazyLoadImage className="w-20 h-20" effect="" src={`/assets/images/toolguide/mp4.png`} alt={props.data.desc} title={props.data.desc} width="auto" height="auto" />
                        </span>

                        {t("Video")}

                      </a>
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
          )}

        </Container>
      </Modal.Body>
    </Modal>
  );
}



export default ToolsAndinstructionsModal;
