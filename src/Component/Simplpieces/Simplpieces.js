
import parse from 'html-react-parser';
import { Col, Container, Row ,Button} from 'react-bootstrap';
import LinkComponent from '@components/Link';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import MetModal from '../Modals/TheMet/MetModal';
import { isMobile } from 'react-device-detect';

const Simplpieces = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const { t } = useTranslation('common')
  if (props.CHILD == undefined) {
    
    return false;
  }
  const artModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <>
    <MetModal isOpen={isModalOpen} closeModal={closeModal} />

    <section className="Simplpieces px-2 px-md-0">
      <Container className="max-content">
        {props.CHILD.map((data, index) => {
          return (
            <Row key={index}>
              <Col sm={6} className="col-first">
                <h1>{data.title ? parse(data.title) : ''}</h1>
              </Col>

              <Col sm={6} className="col-second">
                <div className="desc">
                  {data.description ? parse(data.description) : ''}
                </div>
                {/* <button className="btn btn-primary sedar-btn" type="button"> {t("ContactUs")}</button> */}
                
                <LinkComponent href={data.link_url} className="btn btn-primary sedar-btn border-0 rounded-0">  {t("ContactUs")}</LinkComponent>
                {!isMobile && <span>&nbsp;</span>} 
                <Button className={`btn btn-primary sedar-btn border-0 rounded-0 ${isMobile ? 'mt-1' : ''}`} onClick={artModal}>{t("BrowseCollection")}</Button>
              </Col>
            </Row>
          )
        })
        }

      </Container>
    </section>
    </>
  );
}
Simplpieces.propTypes = {};

Simplpieces.defaultProps = {};

export default Simplpieces;
