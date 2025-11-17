import React, { } from 'react';
import { Col, Row } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Instruction = (props) => {

    return (
        <Col xxl={6} className="SizeAndMount Instructioncol" style={{ float: 'left' }}>
            <div className="bothmount">
                <Row>
                    <Col md={12} className="p-2">
                        <p>{props.SPS_DESC}</p>

                        {props.SUB_CHILD.map((data, index) => {

                            if (data.SPS_CODE == 'PDF') {
                                return (<span className="px-1" key={index} >
                                    <a href={data.SPS_IMAGE_PATH} target="_blank" rel="noreferrer">
                                        <LazyLoadImage src={`/assets/images/Customization/pdf-file.png`} alt="sedarglobal" className="px-1" width="auto" height="auto" />
                                        <span>{data.SPS_DESC}</span>
                                    </a>
                                </span>)
                            } else if (data.SPS_CODE == 'VIDEO') {

                                return (<span className="px-1" key={index}>
                                    <a href={data.SPS_IMAGE_PATH} target="_blank" rel="noreferrer">
                                        <LazyLoadImage src={`/assets/images/Customization/375.png`} alt="sedarglobal" className="px-1" width="auto" height="auto" />
                                        <span>{data.SPS_DESC}</span>
                                    </a>
                                </span>)
                            }

                        })
                        }

                    </Col>
                </Row>
            </div>
        </Col>

    )
}
export default Instruction;
