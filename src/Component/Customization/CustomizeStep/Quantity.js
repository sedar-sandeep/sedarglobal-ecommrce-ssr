import React, { useEffect, useContext, useState } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import { CustomizationContext } from '../CustomizationProduct';
import { addToCartFunScene } from '../Scene'

const Quantity = (props) => {
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);
  const [selected, setSelected] = useState();
  const [errorMgs, setErrorMgs] = useState();
  const edit_step = customize_state.edit_step_data;

  const quantityFn = (qty) => {
    props = { ...props, 'QTY': qty };
    customizeDispatch(props);
    setSelected(qty);
    //setTimeout(addToCartFunScene(customize_state, customizeDispatch), 500000);

  }

  useEffect(() => {
    if (edit_step.info_result && edit_step.info_result.QUANTITY && edit_step.info_result.QUANTITY.SOI_PCS > 0) {
      quantityFn(edit_step.info_result.QUANTITY.SOI_PCS);
    } else if (edit_step.line_result && edit_step.line_result.SOL_QTY && edit_step.line_result.SOL_QTY > 0) {
      quantityFn(edit_step.line_result.SOL_QTY);
    } else {
      quantityFn(1);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      addToCartFunScene(customize_state, customizeDispatch)
    }, 1000);
    return () => clearTimeout(timer);

  }, [customize_state.product_info && customize_state.product_info.count])


  return (
    <div className="SizeAndMount">
      <div className="step-heading">
        <h5>{props.SPS_DESC}</h5>
      </div>
      <div className="quantity">
        <Row>
          <Col sm={5}>
            <p>{props.SPS_TEXT ? props.SPS_TEXT : 'QTY'}</p>
          </Col>
          <Col sm={7}>
            <Form>
              <Form.Group className="py-3">
                <Form.Select onChange={e => quantityFn(e.target.value)} size="lg" value={selected}>
                  {Array.from(Array(100), (e, i) => {
                    let val = i + 1;
                    return <option key={i} value={val}>{val}</option>

                  })}
                </Form.Select>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

Quantity.propTypes = {};

Quantity.defaultProps = {};

export default Quantity;
