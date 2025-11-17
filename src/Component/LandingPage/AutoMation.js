import React, { Suspense } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import LinkComponent from '@components/Link';
import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LandingPrePage from '../../Preloader/LandingPrePage'
import { WindowResize } from '@utils/windowResize';


const styleone = {
    backgroundImage: "url('" + `/assets/images/Mask Group 270.png` + "')",
    backgroundColor: "#B4A690",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left bottom'
}
const styletwo = {
    backgroundImage: "url('" + `/assets/images/Mask Group 271.png` + "')",
    backgroundColor: "#BE8064",
    backgroundRepeat: "no-repeat",
    backgroundPosition: 'right bottom'


}


const AutoMation = (props) => {

    const [width, height] = WindowResize();
    return (

        <Suspense fallback={<LandingPrePage />}>
            {props ?

                <div className="AboutHomeAutoMationBox max1920" style={{ height: height }}>
                    <Container fluid className="landing_page_about">
                        {props.type && props.type % 2 != 0 ?
                            <Row reminder1={props.type % 2}>
                                <Col lg={6} md={12} sm={12} className="col-first p-md-0" style={styleone} >
                                    <div className="boxText px-4 px-lg-5 px-sm-2">
                                        <h5>{props.title}</h5>

                                        <div className="pt-4">{props.description ? parse(props.description) : ''}</div>

                                        <LinkComponent href={props.link_url} className="pb-1">{props.link_title}</LinkComponent>
                                    </div>
                                </Col>
                                <Col lg={6} md={12} sm={12} className="col-second p-0">
                                    <LinkComponent href={props.link_url ? props.link_url : ''} className="link_img">
                                        <picture>
                                            <source media="(max-width: 575.98px)" srcSet={props.image_path} />
                                            <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={props.image_path} />
                                            <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={props.image_path} />
                                            <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={props.image_path} />
                                            <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={props.image_path} />
                                            <LazyLoadImage effect="" src={props.image_path} alt={props.image_alt_seo} className="imsg" width="auto" style={{ height: height }} />
                                        </picture>
                                    </LinkComponent>
                                </Col>
                            </Row>
                            :
                            <Row className="row-reverse">
                                <Col lg={6} md={12} sm={12} className="col-second p-md-0" style={styletwo}>
                                    <div className="boxText px-4 px-lg-5 px-sm-2">
                                        <h5>{props.title}</h5>
                                        <div className="pt-4">{props.description ? parse(props.description) : ''}</div>
                                    </div>
                                </Col>
                                <Col lg={6} md={12} sm={12} className="col-first p-0">
                                    <LinkComponent href={props.link_url ? props.link_url : ''} className="link_img">
                                        <picture>
                                            <source media="(max-width: 575.98px)" srcSet={props.image_path} />
                                            <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={props.image_path} />
                                            <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={props.image_path} />
                                            <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={props.image_path} />
                                            <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={props.image_path} />
                                            <LazyLoadImage effect="" src={props.image_path} alt={props.image_alt_seo} className="imsg" width="auto" style={{ height: height }}/>
                                        </picture>
                                    </LinkComponent>
                                </Col>
                            </Row>
                        }
                    </Container>
                </div>
                : <LandingPrePage />
            }
        </Suspense>
    );
}


export default AutoMation;
