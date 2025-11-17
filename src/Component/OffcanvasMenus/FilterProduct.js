import React, { useState } from "react";
import { Container, Navbar, Offcanvas, Tab, Nav, Row, Col, Form, Button, Dropdown } from 'react-bootstrap';
import { VscArrowLeft } from 'react-icons/vsc';
import InputRange from 'react-input-range-rtl';
import { useRouter } from "next/router";
import { langName } from "@utils/i18n";
import { useTranslation } from "next-i18next";
import LinkComponent from "@components/Link";

const FilterProduct = (props) => {
  const { t } = useTranslation("common");
  const checkbox = props.CHECKBOX;
  const lov = props.MAIN_CATEGORY;
  const filters = props.FILTERS;
  const category = props.CATEGORY;
  const product = props.PRODUCT;
  const filter_subCategory = props.filter_subCategory;
  let {
    datapush,
    size,
    minMax_value,
    min_size,
    max_size,
    ccy_code,
    set_minSize,
    set_maxSize,
    handlePrice,
    handleTagChecked,
    size_filtercomplete,
    siteDetail
  } = props;
  // const checkbox = props.CHECKBOX;
  const router = useRouter();
  let { slug } = router.query;
  // const lovCategory = category_slug == 'c' ? sub_category_slug : category_slug;

  const category_slug = slug && slug.length && slug[0];
  const sub_category_slug = slug && slug.length && slug[1];

  // console.log("router.query", filters)

  let express_days = siteDetail != undefined && siteDetail != 'undefined' && siteDetail.express_days != 'undefined' ? siteDetail.express_days : 0;
  let ondemand_days = siteDetail != undefined && siteDetail != 'undefined' && siteDetail.ondemand_days != 'undefined' ? siteDetail.ondemand_days : 0;
  let instock_days = siteDetail != undefined && siteDetail != 'undefined' && siteDetail.instock_days != 'undefined' ? siteDetail.instock_days : 0;

  return (
    <>
      <div fluid="true" className="FilterProduct">
        <Navbar.Offcanvas
          id="FilterProduct"
          aria-labelledby="FilterProductLabel"
          placement="start"
          show={props.showside}  {...props}
        >
          <Offcanvas.Body className="mobilenav pt-2 px-0">
            <div className="offcanvasNavbarloginlabel px-2 py-3 position-relative d-flex align-items-center justify-content-between">
              <div role="button" onClick={props.onHide}><VscArrowLeft size={35} className="pb-2 me-3 link-dark bold" />  <span className="pt-1"> {t("Filter")}  </span> </div>
              <div role="button" onClick={() => { props.onHide(), props.clearAll() }} size={30} className="text-end clear_link pb-2 pe-4">{t("ClearAll")} </div>
            </div>
            <Container className="FilterProductSide pb-5 mb-2" >
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col xs={5} className="ps-0">
                    <Nav variant="pills" className="flex-column">
                      {filters && filters.map((filter, key) => {
                        if (filter.SFT_CODE == '012') {
                          return (
                            <Nav.Item key={key}>
                              <Nav.Link eventKey={key + 1}>{filter.DESCRIPTION}</Nav.Link>
                            </Nav.Item>
                          )
                        } else if (filter.SFT_CODE == '014') {
                          return (
                            <Nav.Item key={key}>
                              <Nav.Link eventKey={key + 1}>{filter.DESCRIPTION}</Nav.Link>
                            </Nav.Item>
                          )
                        }
                      })}
                      <Nav.Item>
                        <Nav.Link eventKey="first">{t("Products")} </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">{t("Categories")}</Nav.Link>
                      </Nav.Item>
                      {filter_subCategory && filter_subCategory.length > 0 ? (
                        <Nav.Item>
                          <Nav.Link eventKey="third">{t("SubCategories")} </Nav.Link>
                        </Nav.Item>
                      ) : ('')}

                      {filters && filters.map((filter, key) => {
                        if (filter.SFT_CODE != '010' && filter.SFT_CODE != '012' && filter.SFT_CODE != '013' && filter.SFT_CODE != '014') {
                          return (
                            <Nav.Item key={key}>
                              <Nav.Link eventKey={key + 1}>{filter.DESCRIPTION}</Nav.Link>
                            </Nav.Item>
                          )
                        }
                      }
                      )}


                    </Nav>
                  </Col>
                  <Col xs={7} className="pt-4">
                    <Tab.Content>

                      {filters && filters.map((filter, key) => {
                        if (filter.SFT_CODE == '012') {
                          return (
                            <Tab.Pane key={key} eventKey={key + 1}>
                              {filter.SIZE_FILTER_BY == 'RANGE' ? (
                                <Row style={{ width: "96%", margin: "auto" }}>
                                  <Col sm={12} md={12} xl={6} className="my-4">
                                    <label className="mb-2 rangefilter text-dark fs-6">{category_slug == 'wallpaper' ? t("wall_Width") : t("Width")} </label>
                                    <InputRange
                                      maxValue={size.max_width ? size.max_width : 100}
                                      minValue={size.min_width ? size.min_width : 10}
                                      formatLabel={value => `${value} CM`}
                                      value={min_size ? min_size : 50}
                                      onChange={(value) => set_minSize(value)}
                                      onChangeComplete={(value) => size_filtercomplete(value, 'min')}
                                      direction={langName === 'ar' ? 'rtl' : 'ltr'}
                                    />
                                  </Col>
                                  <Col sm={12} md={12} xl={6} className="my-4">
                                    <label className="mb-2 rangefilter text-dark fs-6">{category_slug == 'wallpaper' ? t("wall_Height") : t("Height")} </label>
                                    <InputRange
                                      maxValue={size.max_height ? size.max_height : 100}
                                      minValue={size.min_height ? size.min_height : 10}
                                      formatLabel={value => `${value} CM`}
                                      value={max_size ? max_size : 50}
                                      onChange={(value) => set_maxSize(value)}
                                      onChangeComplete={(value) => size_filtercomplete(value, 'max')}
                                      direction={langName === 'ar' ? 'rtl' : 'ltr'}
                                    />
                                  </Col>
                                </Row>
                              ) : (filter.TAGS && filter.TAGS.map((type, tagkey) => (
                                type.SPI_WIDTH_STANDARD && type.SPI_WIDTH_STANDARD.map((val, key) => (
                                  <Form.Check id={`check-api-${val}`} className="filtercheckbox" key={key}>
                                    <div className="d-flex mb-3">
                                      <Form.Check.Input className="my-0" type="checkbox" onChange={() => handleTagChecked('size', { DESCRIPTION_EN: `${val},${type.SPI_HEIGHT_STANDARD[key]}` }, key)} />
                                      <Form.Check.Label className="mx-1 my-0" style={{ lineHeight: 'normal' }}>{`${val} * ${type.SPI_HEIGHT_STANDARD[key]} CM`}</Form.Check.Label>
                                    </div>
                                  </Form.Check>
                                ))
                              ))
                              )}
                            </Tab.Pane>
                          );
                        } else if (filter.SFT_CODE == '014') {
                          return (
                            <Tab.Pane key={key} eventKey={key + 1}>
                              {filter.TAGS &&
                                filter.TAGS.map((type, tagkey) => {
                                  let prodDesc = datapush[filter?.DESCRIPTION_EN] && datapush[filter?.DESCRIPTION_EN]?.indexOf(type?.DESCRIPTION_EN) >= 0 ? true : false;

                                  if (type.STG_SYS_ID == '324168' && express_days > 0) {
                                    return (

                                      <Form.Check id={`check-api-${type.DESCRIPTION_EN}`} className="filtercheckbox" key={tagkey}>
                                        <div className="d-flex">
                                          <Form.Check.Input type="checkbox" onChange={() => handleTagChecked(filter.DESCRIPTION_EN, type, key)} checked={prodDesc} />
                                          <Form.Check.Label>&nbsp;{`${type.DESCRIPTION}`} </Form.Check.Label>
                                        </div>
                                      </Form.Check>

                                    )
                                  } else if (type.STG_SYS_ID == '324169' && instock_days > 0) {

                                    return (

                                      <Form.Check id={`check-api-${type.DESCRIPTION}`} className="filtercheckbox" key={tagkey}>
                                        <div className="d-flex">
                                          <Form.Check.Input type="checkbox" onChange={() => handleTagChecked(filter.DESCRIPTION_EN, type, key)} checked={prodDesc} />
                                          <Form.Check.Label>&nbsp;{`${type.DESCRIPTION}`} </Form.Check.Label>
                                        </div>
                                      </Form.Check>

                                    )
                                  } else if (type.STG_SYS_ID == '324170' && ondemand_days > 0) {

                                    return (

                                      <Form.Check id={`check-api-${type.DESCRIPTION}`} className="filtercheckbox" key={tagkey}>
                                        <div className="d-flex">
                                          <Form.Check.Input type="checkbox" onChange={() => handleTagChecked(filter.DESCRIPTION_EN, type, key)} checked={prodDesc} />
                                          <Form.Check.Label>&nbsp;{`${type.DESCRIPTION}`} </Form.Check.Label>
                                        </div>
                                      </Form.Check>

                                    )
                                  }
                                })}
                            </Tab.Pane>
                          );
                        }
                      })}

                      <Tab.Pane eventKey="first">
                        {lov && lov.map((i, key) => (
                          <Form.Check id={`check-api-${key}`} className="filtercheckbox " key={key}>
                            <LinkComponent href={i.SC_REDIRECT_TO == 'OTHER' ? i.SC_REDIRECT_URL : i.SC_LINK_URL} key={key} className="d-flex py-1">
                              <Form.Check.Input type="checkbox" checked={i.SC_LINK_URL == category_slug ? true : false} />
                              <Form.Check.Label>{i.DESCRIPTION}</Form.Check.Label>
                            </LinkComponent>
                          </Form.Check>
                        ))}
                      </Tab.Pane>

                      <Tab.Pane eventKey="second">
                        {lov && lov.filter(category => category.SC_LINK_URL == category_slug).map((row, key) =>
                        (row && row.CATEGORY.map((type, key) => (
                          <Form.Check id={`check-api-${type.DESCRIPTION}`} className="filtercheckbox" key={key}>
                            <>
                              <LinkComponent href={type.SC_REDIRECT_TO == 'OTHER' ? type.SC_REDIRECT_URL : `${category_slug}/${type.SC_LINK_URL}`} className="d-flex py-1" >
                                <Form.Check.Input type="checkbox" defaultChecked={type.SC_LINK_URL == sub_category_slug ? true : false} />
                                <Form.Check.Label>{type.DESCRIPTION}</Form.Check.Label>
                              </LinkComponent>

                            </>
                          </Form.Check>
                        ))
                        )
                        )}
                      </Tab.Pane>
                      {filter_subCategory && filter_subCategory.length > 0 ? (
                        <Tab.Pane eventKey="third">
                          {product && product.map((row, key) => {
                            let prodDesc = datapush['product'] && datapush['product']?.indexOf(row?.DESCRIPTION_EN) >= 0 ? true : false;
                            if (row.SC_SHOW_IN_FILTER_YN == 'Y') {
                              return (
                                <Form.Check id={`check-api-${row.DESCRIPTION}`} className="filtercheckbox" key={key}>
                                  <div className="d-flex py-1">
                                    <div><Form.Check.Input type="checkbox" className="mt-1" onChange={() => handleTagChecked(row.SC_DESC, row, key, 'product')} checked={prodDesc} /></div>
                                    <Form.Check.Label className="px-2">{row.DESCRIPTION} {prodDesc}</Form.Check.Label>
                                  </div>
                                </Form.Check>

                              )
                            } else {
                              return ('');
                            }
                          })}
                        </Tab.Pane>
                      ) : ('')}

                      {filters && filters.map((filter, key) => {
                        if (filter.SFT_CODE != '010' && filter.SFT_CODE != '012' && filter.SFT_CODE != '013' && filter.SFT_CODE != '014') {
                          return (
                            <Tab.Pane key={key} eventKey={key + 1}>
                              {filter.TAGS && filter.TAGS.map((type, tagkey) => {
                                let prodDesc = datapush[filter?.DESCRIPTION_EN] && datapush[filter?.DESCRIPTION_EN]?.indexOf(type?.DESCRIPTION_EN) >= 0 ? true : false;
                                return (
                                  <Form.Check id={`check-api-${type.DESCRIPTION}`} className="filtercheckbox" key={tagkey}>
                                    <div className="d-flex py-1">
                                      <div> <Form.Check.Input type="checkbox" className="mt-1" onClick={() => handleTagChecked(filter.DESCRIPTION_EN, type, key)} checked={prodDesc} /></div>
                                      <Form.Check.Label className="px-2">{type.DESCRIPTION} </Form.Check.Label>
                                    </div>
                                  </Form.Check>
                                )
                              })}
                            </Tab.Pane>
                          )
                        } else if (filter.SFT_CODE == '013') {
                          return (
                            <Tab.Pane key={key} eventKey={key + 1}>
                              <InputRange
                                maxValue={filter.TAGS && filter.TAGS[0] && filter.TAGS[0].MAX_PRICE ? parseInt(filter.TAGS[0].MAX_PRICE) : 100}
                                minValue={filter.TAGS && filter.TAGS[0] && filter.TAGS[0].MIN_PRICE ? parseInt(filter.TAGS[0].MIN_PRICE) : 10}
                                formatLabel={value => `${value} ${ccy_code}`}
                                value={minMax_value ? minMax_value : 50}
                                onChange={(value) => handlePrice(value)}
                                onChangeComplete={value => console.log(value, 'value')}
                              />
                            </Tab.Pane>
                          );
                        }
                      }
                      )}

                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
              <Row className="position-absolute bottom-0 w-100 p-3 filterbottom bg-light">
                <Col xs={6}>
                  <Button className="rounded-0 w-100 border border-dark btn-bordercolor py-3" variant="outline-dark" onClick={props.onHide}>{t("Close")} </Button>
                </Col>
                <Col xs={6}>
                  <Button className="rounded-0 w-100 py-3 text-light" variant="warning" onClick={props.onHide}>{t("Apply")}</Button>
                </Col>
              </Row>
            </Container>

          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </div>


    </>

  );
}


export default FilterProduct;

