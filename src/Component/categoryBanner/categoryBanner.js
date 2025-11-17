import React, { useState, useEffect, Suspense } from "react";
import { Col, Container, Row, Modal } from 'react-bootstrap';
import Skeleton from "react-loading-skeleton";
import { ImageComponent } from '@components/image';
import { isMobile } from "react-device-detect";
import parse from 'html-react-parser';
import { useTranslation } from 'next-i18next';

const CategoryBanner = (props) => {
  const { t } = useTranslation("common");
  const items = props.BANNER || '';

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

  const sanitizedHTML = items?.SC_MORE?.replace(/<h1[^>]*>.*?<\/h1>/gi, '') || '';
  const parsedContent = sanitizedHTML ? `${sanitizedHTML.substring(0, 180)}...` : '';
  console.log(parsedContent);  // Inspect the final parsed content

  const h1HTML = items?.SC_MORE
  ? items.SC_MORE?.replace(/<p[^>]*><h1[^>]*>/g, '<h1>').replace(/<\/h1><\/p>/g, '</h1>') || '' // Clean the nested <p> around <h1>
  : ''; // Limit content to 570 chars

  const truncatedHTML = h1HTML.substring(0, 570);
  // Parse and only allow <h1> tags
  const h1content = parse(truncatedHTML, {
    replace: function (domNode) {
      // If it's a tag and not an <h1>, exclude it
      if (domNode.type === 'tag' && domNode.name !== 'h1') {
        return null; // Skip rendering all non-<h1> tags
      }
      // Return undefined to render the <h1> tag as is
      return undefined;
    }
  });
// console.log('================================', h1content[0].props.children );
  return (
    <>

      <div className="category_width max1920" style={{ minHeight: '10vw', textAlign: 'center', position: 'relative' }} >
        {items ? <>
          {items && items.SC_IMAGE_PATH &&
            <>
              <ImageComponent
                src={items.SC_IMAGE_PATH} alt={items.SC_DESC}
                width={1920}
                height={508}
                contains={true}
              // unoptimized={true}
              />
              {!isMobile &&
                <Col xl={5} md={5} sm={8} style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  color: '#fff',
                  transform: 'translate(-50%, -50%)'
                }}>
                  {/* <h1 style={{ fontSize: '1.4rem', marginBottom: '45px' }}>{parse(items.SC_DESC)}</h1> */}
                  <p style={{ fontSize: '14px' }}>
                    {items?.SC_MORE && items?.SC_MORE != null && items?.SC_MORE.length > 370 ?
                      parse(`${items?.SC_MORE.substring(0, 370)}... `) : parse(`${items?.SC_MORE || ''}`)
                    }
                    {items?.SC_MORE && items?.SC_MORE != null && items?.SC_MORE.length > 370 ? <span onClick={() => handleShow()} style={{ cursor: 'pointer', color: '#eaaf60' }}>{t('ReadMore')}</span> : ''}
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
                  <h1 style={{ fontSize: '0.9rem' }}>{h1content?.[0]?.props?.children}</h1>
                  {/* <h1 style={{ fontSize: '0.9rem' }}>{items.SC_DESC}</h1> */}
                </Col>
              }
            </>
          }
        </> : <SuspenceLoader />}
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="border-start border-2 border-warning ps-3 ps-lg-4">
            {h1content?.[0]?.props?.children}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '14px' }}>
          {/* {parse(items?.SC_MORE || '')} */}
          {parse(`${sanitizedHTML}`)}
        </Modal.Body>
      </Modal>

      {isMobile && items?.SC_MORE && items?.SC_MORE != null &&
        <Col sm={12} style={{
          padding: '15px'
        }}>
          <p style={{ fontSize: '14px' }}>
            {parse(`${parsedContent}`)}
            {/* {items?.SC_MORE.length > 80 ?
              parse(`${items?.SC_MORE.substring(0, 80)}... `) : parse(items?.SC_MORE)
            } */}
            {items?.SC_MORE && items?.SC_MORE != null && items?.SC_MORE.length > 80 ? <span onClick={() => handleShow()} style={{ cursor: 'pointer', color: '#eaaf60' }}>{t('ReadMore')}</span> : ''}
          </p>
        </Col>
      }
    </>
  );
}


CategoryBanner.propTypes = {};

CategoryBanner.defaultProps = {};

export default CategoryBanner;
