import parse from 'html-react-parser';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LinkComponent from '@components/Link';
import MetModal from '../Modals/TheMet/MetModal';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'next-i18next';

const QualityServices_page = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation('common');
  if (props.CHILD == undefined) {

    return false;
  }
  const backgroundImage = {
    backgroundImage: "url('" + `${props.image_path}` + "')",
  };


  const artModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <>
      <MetModal isOpen={isModalOpen} closeModal={closeModal} />

      <div className="QualityServices_page px-2 px-md-0" style={backgroundImage}>
        <Container className="max-content">
          <Row>
            <Col sm={12} className="QualityServices-heading">
              {props.description ? parse(props.description) : ''}
            </Col>
          </Row>
          {props.CHILD.map((data, index) => {
            return (
              <Row className="QualityServices_Collection" key={index}>
                <Col lg={6} sm={12} md={6} className="QualityServices_text">
                  <h2 className="Whysedar-title">{data.title}</h2>

                  <div className="desc">
                    {data.description ? parse(data.description) : ''}
                    {data.link_title ? (
                      <Col sm={12} className="shop-link pt-0">
                        {data.link_url == '/blinds-shades/the-met-blinds' ? 
                          <LinkComponent href={data.link_url ? data.link_url : ''} 
                          className={`btn btn-primary sedar-btn border-0 rounded-0 ${isMobile ? 'mt-1' : ''}`}>
                            {data.link_title ? data.link_title : ''}
                          </LinkComponent>

                        :
                        <Button className="btn btn-primary sedar-btn border-0 rounded-0" onClick={artModal}>{data.link_title ? data.link_title : ''}</Button>

                         }
                        {!isMobile && <span>&nbsp;</span>} 
                        <LinkComponent href={data.link_url ? data.link_url : ''} className={`btn btn-primary sedar-btn border-0 rounded-0 ${isMobile ? 'mt-1' : ''}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            id="Layer_1"
                            width="24px"
                            height="18px"
                            viewBox="0 0 128 128"
                            enableBackground="new 0 0 128 128"
                            xmlSpace="preserve"
                          >
                            <path
                              fill="#000000" // Color changed to black
                              d="M104,0H24C15.164,0,8,7.164,8,16v96c0,8.836,7.164,16,16,16h80c8.836,0,16-7.164,16-16V16  C120,7.164,112.836,0,104,0z M112,112c0,4.414-3.586,8-8,8H24c-4.406,0-8-3.586-8-8V16c0-4.414,3.594-8,8-8h80c4.414,0,8,3.586,8,8  V112z"
                            />
                            <rect x="32" y="24" fill="#000000" width="64" height="8" /> {/* Color changed to black */}
                            <rect x="32" y="40" fill="#000000" width="64" height="8" /> {/* Color changed to black */}
                            <rect x="32" y="56" fill="#000000" width="64" height="8" /> {/* Color changed to black */}
                            <rect x="32" y="72" fill="#000000" width="32" height="8" /> {/* Color changed to black */}
                          </svg>
                          
                          {t('downloadBrochure')}
                        </LinkComponent>
                      </Col>
                    ) : (<></>)}

                  </div>


                </Col>

                <Col lg={6} sm={12} md={6} className="QualityServices">
                  <picture>
                    <source media="(max-width: 575.98px)" srcSet={data.image_path_portrait} />
                    <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={data.image_path_landscape} />
                    <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={data.image_path_03} />
                    <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={data.image_path_02} />
                    <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={data.image_path_01} />
                    <LazyLoadImage effect="" src={data.image_path} alt={data.image_alt_seo} className="imsg" width="auto" height="auto" />
                  </picture>
                </Col>

              </Row>
            )
          })
          }



        </Container>

      </div>
    </>
  );
}
QualityServices_page.propTypes = {};

QualityServices_page.defaultProps = {};

export default QualityServices_page;
