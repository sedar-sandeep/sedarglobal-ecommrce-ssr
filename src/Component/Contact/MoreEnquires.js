import React from 'react';
import { Col, Row, Image, Container, offset } from 'react-bootstrap';
import parse from 'html-react-parser';
import { ImageComponent } from '@components/image';


function MoreEnquires(props) {

    return (
        <section id="MoreEnquires" className="MoreEnquires-sec">
            <Container className="MoreEnquires maxwidth px-4" fluid>
                <Row>
                    <Col sm={12} className="heading text-start text-sm-center">
                        {props?.description ? parse(props?.description) : ''}
                        {props?.data?.description ? parse(props?.data?.description) : ''}
                    </Col>
                    {/* <h2 style={{ textAlign: 'center' }}>More Enquiries</h2> */}
                </Row>
                <Container>
                    <Container className="d-flex justify-content-center px-5">
                        <Row className="justify-content-end mt-2">
                            {props?.CHILD && props?.CHILD != undefined ?
                                <>
                                    {props?.CHILD?.map((data, index) => {
                                        return (
                                            <Col xl={{ span: 5 }} md={{ span: 5, offset: 1 }} className="enquire_type mx-4 d-flex gap-4" key={index} style={{ marginLeft: 0, marginRight: 0 }}>
                                                <div className="flex-shrink-0">
                                                    <a href={data.link_url ? "mailto:" + data.link_url : '#'} >
                                                     
                                                        <ImageComponent
                                                            classprops="imsg"
                                                            src={data.image_path}
                                                            alt={data.link_url || 'Sedar Global'}
                                                            width={42}
                                                            height={38}
                                                        />
                                                    </a>
                                                </div>
                                                <div className="title flex-grow-1">
                                                    <div className="desc">
                                                        {data.description ? parse(data.description) : ''}
                                                    </div>
                                                    <a href={data.link_url ? "mailto:" + data.link_url : ''}>{data.link_title}</a>
                                                </div>
                                            </Col>
                                        )
                                    })
                                    }

                                </>
                                : ''}
                            {props?.data?.SUB_CHILD && props?.data?.SUB_CHILD.map((data, index) => {
                                return (
                                    <Col xl={{ span: 5 }} md={{ span: 5, offset: 1 }} className="enquire_type mx-4 d-flex gap-0" style={{ marginRight: 0, marginLeft: 0 }} key={index}>
                                        <div className="flex-shrink-0">
                                            <a href={data.link_url ? "mailto:" + data.link_url : '#'} >
                                             
                                                <ImageComponent
                                                    classprops="imsg"
                                                    src={data.image_path}
                                                    alt={data.link_url || 'Sedar Global'}
                                                    width={42}
                                                    height={38}
                                                />
                                            </a>
                                        </div>
                                        <div className="title flex-grow-0">
                                            <div className="desc">
                                                {data.description ? parse(data.description) : ''}
                                            </div>
                                            <a href={data.link_url ? "mailto:" + data.link_url : ''}>{data.link_title}</a>
                                        </div>
                                    </Col>
                                )
                            })
                            }
                        </Row>
                    </Container>
                </Container>

            </Container>
        </section>
    );

}
MoreEnquires.propTypes = {};

MoreEnquires.defaultProps = {};

export default MoreEnquires;