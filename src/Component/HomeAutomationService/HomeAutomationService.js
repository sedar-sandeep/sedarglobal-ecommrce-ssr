import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import parse from 'html-react-parser';

const Servicegrid = ({ backgroundcolor, description, image }) => {
  return (
    <Col sm={4}>
      <div className="service-grid">
        <img 
          className="w-100" 
          src={image || ''} 
          alt={description?.substring(0, 50) || 'Service Image'} 
          width="auto" 
          height="auto" 
        />
        <div className="grid-footer" style={{ backgroundColor: backgroundcolor || 'transparent' }}>
          {description ? parse(description) : ''}
        </div>
      </div>
    </Col>
  );
};

Servicegrid.propTypes = {
  backgroundcolor: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
};

const HomeAutomationService = ({ CHILD = [] }) => {
  const { t } = useTranslation('common');

  return (
    <section className="HomeAutomationService">
      <div className="heading-section">
        {CHILD[0]?.description ? parse(CHILD[0].description) : ''}
      </div>
      <div className="content-section">
        <Container className="maxwidth">
          <Row>
            {CHILD[1]?.SUB_CHILD?.map((value, index) => (
              <Servicegrid 
                key={value?.id || index} 
                backgroundcolor="#9B927E" 
                description={value?.description || ''} 
                image={value?.image_path || ''} 
              />
            ))}
          </Row>
        </Container>
      </div>
    </section>
  );
};

HomeAutomationService.propTypes = {
  CHILD: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      SUB_CHILD: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          description: PropTypes.string,
          image_path: PropTypes.string
        })
      )
    })
  )
};

export default HomeAutomationService;
