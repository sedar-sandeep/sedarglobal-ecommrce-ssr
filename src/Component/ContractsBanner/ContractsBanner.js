import React, { useState } from "react";
import { Col, Row, Modal } from 'react-bootstrap';
import Skeleton from "react-loading-skeleton";
import { ImageComponent } from '@components/image';
import { isMobile } from "react-device-detect";
import parse from 'html-react-parser';
import { useTranslation } from 'next-i18next';


const ContractsBanner = (props) => {
  const { t } = useTranslation("common");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const SuspenceLoader = () => {
    return (
      <Row>
        <Col>
          <Skeleton duration={2} count={1} height={`42vh`} />
        </Col>
      </Row>
    )
  }

  return (
    <>

      <div className="category_width max1920" style={{ minHeight: '10vw', textAlign: 'center', position: 'relative' }} >
        {props ? <>
          {props && props.image_path &&
            <>
              <ImageComponent
                src={props.image_path} alt={props.image_alt_seo}
                width={1920}
                height={508}
                contains={true}
              // unoptimized={true}
              />
              {!isMobile &&
                <Col xl={5} md={5} sm={8} style={{
                  position: 'absolute',
                  top: '62%',
                  left: '50%',
                  color: '#fff',
                  transform: 'translate(-50%, -50%)'
                }}>
                  {/* <h1 style={{ fontSize: '1.4rem', marginBottom: '45px' }}>{parse(props?.title || '')}</h1> */}
                  <p style={{ fontSize: '14px' }}>
                    {props?.description && props?.description != null && props?.description.length > 370 ?
                      parse(`${props?.description.substring(0, 370)}... `) : parse(`${props?.description || ''}`)
                    }
                    {props?.description && props?.description != null && props?.description.length > 370 ? <span onClick={() => handleShow()} style={{ cursor: 'pointer', color: '#eaaf60' }}>{t('ReadMore')}</span> : ''}
                  </p>
                </Col>
              }
              {isMobile &&
                <Col sm={12} style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  color: '#fff',
                  transform: 'translate(-50%, -50%)'
                }}>
                  {/* <h1 style={{ fontSize: '0.9rem' }}>{props?.title || ''}</h1> */}
                </Col>
              }
            </>
          }
        </> : <SuspenceLoader />}
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="border-start border-2 border-warning ps-3 ps-lg-4">{props?.title || ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '14px' }}>{parse(props?.description || '')}</Modal.Body>
      </Modal>

      {isMobile && props?.description && props?.description != null &&
        <Col sm={12} style={{
          padding: '15px'
        }}>
          <p style={{ fontSize: '14px' }}>
            {props?.description.length > 100 ?
              parse(`${props?.description.substring(0, 100)}...`) : parse(props?.description)
            }
            {props?.description && props?.description != null && props?.description.length > 100 ? <span onClick={() => handleShow()} style={{ cursor: 'pointer', color: '#eaaf60' }}>{t('ReadMore')}</span> : ''}
          </p>
        </Col>
      }
    </>
  );
}

export default ContractsBanner