
import React, { useState, useEffect, useContext } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import { CustomizationContext } from '../CustomizationProduct'
var len = ['0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0', '9.5', '10'];

const LengthofWire = (props) => {

  const { customize_state, customizeDispatch } = useContext(CustomizationContext);
  const [selected, setSelected] = useState(2.5);

  let lengthFun = (val) => {
    props['length_of_wire'] = val;
    props['m_width'] = val;
    customizeDispatch(props);
    setSelected(val);
  };
  useEffect(() => {
    setTimeout(lengthFun(2.5), 1500);
  }, []);
  return (
    <div className="SizeAndMount">
      <div className="step-heading">
        <h5>{props.SPS_DESC}</h5>
      </div>
      <div className="quantity">
        <Row>
          <Col sm={5}>
            <p>Length of wire </p>
          </Col>
          <Col sm={7}>
            <Form>
              <Form.Group className="py-3">
                <Form.Select onChange={e => lengthFun(e.target.value)} size="lg">
                  {len.map((data) => {
                    return (
                      <option value={data} defaultValue={selected} selected={selected == data ? true : false} key={data}>{data} LMT</option>
                    )
                  })}
                </Form.Select>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  )
}

LengthofWire.propTypes = {};

LengthofWire.defaultProps = {};

export default LengthofWire;
