import React, { useState, useRef } from 'react';
import { Container, Col, Row, Collapse } from "react-bootstrap";
import parse from 'html-react-parser';
import TipsThreads from '../TipsThreads/TipsThreads';
import ContractsForm from '../ContractsForm/ContractsForm';
import { ImageComponent } from '@components/image';

const BackgroundImageStyle = {
  backgroundImage: "url('" + `/assets/images/toolguide/halfcircle.png` + "')",
  backgroundPosition: 'right 30%',
  backgroundSize: 'auto',
  backgroundRepeat: 'no-repeat'
};
const Franchise = (props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const handleClick = () => {
    setTimeout(() => {
      const section = document.querySelector('#ContractsForm');
      section?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: "start",
      });

      section.style.top = '122px';
    }, 200);
  };

  if (props.CHILD == undefined) {

    return false;
  }

  return (
    <>
      <section className="Franchise" style={BackgroundImageStyle}>


        <div className="max1920  px-2" >
          <Container className="Franchise containers">
            <Row>
              <Col sm={12} md={6} xs={12} className="FranchiseCollection py-3">
                <ImageComponent
                  classprops="w-100 img-fluid"
                  src={props.image_path}
                  alt={props.image_alt_seo}
                  width={545}
                  height={395}
                  quality={70}
                />
              </Col>

              <Col sm={12} md={6} xs={12} className="FranchiseCollection-text">
                <h3 className="Franchise-title border-start border-end-0 border-2 border-warning ps-3 ps-lg-4">{props.title}</h3>

                <div className="fran">
                  <h4 className="Franchise-title-big">{props.CHILD[0].title ? parse(props.CHILD[0].title) : ''}</h4>
                  <div className="desc">
                    {props.CHILD[0].description ? parse(props.CHILD[0].description) : ''}
                  </div>
                  <Row>
                    <Col sm={4} className="shop-link">
                      <a onClick={() => { setOpen(!open); handleClick() }} className="pb-2"> {props.CHILD[0].link_title}</a>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <TipsThreads data={props.CHILD[1]} />
      </section>
      <Collapse in={open}>
        <div id="example-collapse-text" >
          <ContractsForm />
        </div>
      </Collapse>

    </>
  );
}

Franchise.propTypes = {};

Franchise.defaultProps = {};

export default Franchise;
