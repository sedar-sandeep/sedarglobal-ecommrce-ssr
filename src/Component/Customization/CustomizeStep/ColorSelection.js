import React, { useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Col, Row } from 'react-bootstrap';
import { CustomizationContext } from '../CustomizationProduct'
const site_id = process.env.NEXT_PUBLIC_SITE_ID; //100001;
let color_path = process.env.NEXT_PUBLIC_BASE_URL + 'uploads/' + site_id + '/tag/';

let filterArray = {};

const ColorSelection = (props) => {
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);
  if (props.SUB_CHILD.length == 0) {
    
    return false;
  }

  //const [selected, setSelected] = useState();
  let select_color = customize_state.filter_data['003'] ? customize_state.filter_data['003'] : [];

  const colorselectFun = (val) => {
    let value = val.SIF_TAGS;
    let key = val.SIF_FILTER_TYPE;
    //setSelected(value);

    if (Object.keys(filterArray).length == 0) {
      filterArray[key] = [value];
    } else {
      let i = filterArray[key].indexOf(value);
      if (i !== -1) {
        filterArray[key].splice(i, 1);
      } else {
        filterArray[key].push(value);
      }
    }
    customizeDispatch({ type: 'FILTER', value: filterArray });
  }

  return (
    <div className="ColorSelection">
      <div className="step-heading">
        <h5>{props.SPS_DESC}</h5>
      </div>
      <Row>
        {props.SUB_CHILD['003'] && props.SUB_CHILD['003'].length > 0 && props.SUB_CHILD['003'].map((data, index) => {
          let active_cls = select_color.indexOf(data.SIF_TAGS) >= 0 ? 'color-box active' : 'color-box';
          return (
            <Col sm={3} xs={4} key={index}>
              <div className={active_cls} onClick={() => colorselectFun(data)}>
                <div className="color-img" >
                  <LazyLoadImage effect="" src={data.IMAGE_PATH ? color_path + data.IMAGE_PATH : `/assets/images/Customization/FCFAD2.png`} className="img-fluid" alt={data.image_alt_seo} width="auto" height="auto" />
                  <div className="selected-icon">
                    <LazyLoadImage effect="" src={`/assets/images/Customization/Group23632.png`} className="img-fluid" alt={data.image_alt_seo} width="auto" height="auto" />
                  </div>
                </div>
                <p>{data.SIF_TAGS_DESC}</p>
              </div>
            </Col>
          )
        })
        }
      </Row>
    </div>
  )
}
ColorSelection.propTypes = {};

ColorSelection.defaultProps = {};

export default ColorSelection;
