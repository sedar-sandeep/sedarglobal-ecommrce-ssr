import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import parse from 'html-react-parser';
import ScrollTo from "react-scroll-into-view";


const ContractsBringWorld = (props) => {
  // if (props.CHILD == undefined) {
  //   return false;
  // }
  //console.log(props,'ContractsBringWorld props')
  return (
    <>
      <div className="ContractsBringWorld">
        <section className="AboutusBringWorld pt-5">
          <Container className="max-content">
            <Row>
              {/* {props.CHILD.map((data, index) => {
                return ( */}
              <Col md={6} className={`col-first item-`} key={1}>
                <div className={`pb-4 index-${1}`}>
                  {/* {data.description ? parse(data.description) : ''} */}
                  <h1>{props.title}</h1>
                  {props.image_path ?
                    <picture>
                      <source media="(max-width: 575.98px)" srcSet={props.image_path_portrait} />
                      <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={props.image_path_landscape} />
                      <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={props.image_path_03} />
                      <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={props.image_path_02} />
                      <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={props.image_path_01} />
                      <LazyLoadImage effect="" src={props.image_path} alt={props.image_alt_seo} className="mt-5 w-100" width="auto" height="auto" />
                    </picture>
                    : ''}


                </div>
              </Col>
              <Col md={6} className={`col-first item-`} key={2}>
                <div className={`pb-4 index-${2}`}>
                  {props.description ? parse(props.description) : ''}

                  <ScrollTo selector={`#ContractsForm`} smooth={false} block="center">
                    <a className="btn sedar-btn mt-4 rounded-0" >{props.link_title}</a>
                  </ScrollTo>
                </div>
              </Col>
              {/* ) */}
              {/* })
              } */}
            </Row>

          </Container>

        </section>
      </div>
    </>
  )

}

ContractsBringWorld.propTypes = {};

ContractsBringWorld.defaultProps = {};

export default ContractsBringWorld;
