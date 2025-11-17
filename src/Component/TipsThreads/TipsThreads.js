import React from 'react';
import { Container, Col, Row } from "react-bootstrap";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import parse from 'html-react-parser';
import LinkComponent from '@components/Link';


const Sectionstyle = {
  backgroundImage: "url('" + `/assets/images/` + "')",
  backgroundPosition: '817px 0%',
  backgroundSize: '546px 253px',
  backgroundRepeat: 'no-repeat'


  // backgroundPosition: '102.5% 0%' ,
  // backgroundSize: '41% 26%',
  // backgroundRepeat: 'no-repeat'

};

const TipsThreads = (props) => {
  ////console.log(props.data,'dkdkdk')
  if (props.data == undefined) {

    return false;
  }
  ////console.log(props.data,'dfsdhfk');
  return (
    <div className="TipsThreads px-3" style={Sectionstyle}>
      <Container className="TipsThreadsCollection">
        <Row className="TipsThreads-heading">
          <Col sm={8}>
            <h2 className="TipsThreads-title border-start border-end-0 border-2 border-warning ps-3 ps-lg-4">{props.data.title}</h2>
          </Col>
          <Col sm={4} className="">
            <div>
              <LinkComponent href={props.data.link_url ? props.data.link_url : '#'} className="TipsThreads-title-all align-middle float-end">
                {props.data.link_title ? props.data.link_title : 'MoreStories'}
              </LinkComponent>
            </div>
          </Col>
        </Row>
        <Row className="TipsThreads-details">
          {props.data.SUB_CHILD.map((data, index) => {
            return (
              <Col sm={12} md={6} className="Collection-text" key={index}>
                {/* <LazyLoadImage effect="" src={data.image_path} alt={data.image_alt_seo} title={data.title} /> */}
                <LinkComponent href={data.link_url ? data.link_url : '#'}>
                  <picture>
                    <source media="(max-width: 575.98px)" srcSet={data.image_path_portrait} />
                    <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={data.image_path_landscape} />
                    <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={data.image_path_03} />
                    <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={data.image_path_02} />
                    <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={data.image_path_01} />
                    <LazyLoadImage effect="" src={data.image_path} alt={data.image_alt_seo} className="imsg" width="auto" height="auto" />
                  </picture>
                </LinkComponent>
                <div className="desc">
                  {data.description ? parse(data.description) : ''}

                  <h6 className="TipsThreads-txt">{data.title}</h6>
                </div>
              </Col>
            )
          })
          }
        </Row>

        {/* <Row className="TipsThreads-details">
          <Col sm={6} className="Collection-text">
            <Image src={`/assets/images/TipsThreads/Embroidery-Roman(KVL-1015)-with-wallpaper(Fujikawa---7205-6FV)--Kids-Room@2x.png`} />

            <p>
              Guiding interface and experience design for a
              new standard in the property industry.
      </p>
            <h6 className="TipsThreads-txt">Living - October 2, 2020</h6>
          </Col>


          <Col sm={6} className="TipsThreads-text">

            <Image src={`/assets/images/TipsThreads/Image3_character prints_revision.png`} />
            <p >
              A new brand, design language, and
              website for the UK’s deposit revolution.
          </p>
            <h6 className="TipsThreads-txt">Living - October 2, 2020</h6>

          </Col>

        </Row> */}
      

      </Container>
    </div>
  );
}

TipsThreads.propTypes = {};

TipsThreads.defaultProps = {};

export default TipsThreads;
