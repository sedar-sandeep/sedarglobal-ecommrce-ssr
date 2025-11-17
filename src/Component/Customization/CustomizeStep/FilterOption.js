import React, { useContext, useState } from 'react';
import { Col, Row, Form, Dropdown } from 'react-bootstrap';
import { CustomizationContext } from '../CustomizationProduct';
import { useTranslation } from 'next-i18next';
import LaddaButton from "react-ladda";
import { useForm } from "react-hook-form";

let filterArray = {};

const FilterOption = (props) => {
  const { t } = useTranslation('common');
  const { customize_state, customizeDispatch } = useContext(CustomizationContext);
  let filter_type = Object.keys(props.SUB_CHILD);
  const [loading, setLoading] = useState(true);
  const [loading_btn, setLoading_btn] = useState(false);
  const { register, handleSubmit, watch, setValue, setError, getValues, reset, formState: { errors } } = useForm({});

  if (props.SUB_CHILD.length == 0) {
    return false;
  }



  const filterFun = (e) => {
    let value = e.target.value;
    let key = e.target.name;

    if (Object.keys(filterArray).length == 0) {
      filterArray[key] = [value];
    } else {
      if (filterArray[key]) {
        let i = filterArray[key].indexOf(value);
        if (i !== -1) {
          filterArray[key].splice(i, 1);
        } else {
          filterArray[key].push(value);
        }
      } else {
        filterArray[key] = [value];
      }
    }
    console.log(filterArray, 'filterArray');
    customizeDispatch({ type: 'FILTER', value: filterArray });
  }
  const searchFun = (data) => {
    console.log(data, 'data');
    /* if (data.search_item_code) {
       customizeDispatch({ type: 'SERACH-WITH-ITEM', value: data.search_item_code });
     }*/
    customizeDispatch({ type: 'SERACH-WITH-ITEM', value: data.search_item_code });
  }

  return (
    <div className="FilterOption">
      <div className="step-heading">
        <h5>{props.SPS_DESC}</h5>
      </div>
      <Row>

        {
          filter_type.map((data, index) => {
            if (data == 'Color Group' || (props.SUB_CHILD && props.SUB_CHILD[data].length == 0)) {
              return false;
            }
            return (
              <Col sm={6} lg={6} xl={4} xs={6} key={index}>
                <Dropdown>
                  <Dropdown.Toggle variant="Light" id="dropdown-basic">
                    {data}
                    {/* {props.SUB_CHILD[data] && props.SUB_CHILD[data][0] ? props.SUB_CHILD[data][0].DESCRIPTION : ''} */}
                  </Dropdown.Toggle>
                  <Dropdown.Menu onChange={filterFun}>
                    {props.SUB_CHILD && props.SUB_CHILD[data].map((tag, key11) => {
                      return (
                        <Dropdown.ItemText key={key11}>
                          <Form.Check
                            type="checkbox"
                            value={tag.DESCRIPTION_EN}
                            className="filter_section "
                            name={data}
                            label={tag.DESCRIPTION}
                          />
                        </Dropdown.ItemText>
                      )
                    })
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            )
          })

        }


      </Row>
      <Row>
        <Form onSubmit={handleSubmit(searchFun)}>
          <Col md={6} style={{ float: 'left' }}>
            <Form.Control
              type="search"
              placeholder={t("item code")}
              aria-label="Search"
              name="search_item_code"
              maxLength="10"
              className="form-control border-0 bg-transparent border-bottom border-dark rounded-0"
              style={{ marginTop: '15px' }}
              {...register('search_item_code', { })}
            />
            {errors?.search_item_code && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
          </Col>
          <Col md={6} style={{ float: 'left', marginTop: '7px' }}>
            <LaddaButton loading={loading_btn} type="submit" className="submit_btn search_button">
              <span>{t("Search")}</span>
            </LaddaButton>
          </Col>
        </Form>
      </Row>
    </div>
  );
}

FilterOption.propTypes = {};

FilterOption.defaultProps = {};

export default FilterOption;
