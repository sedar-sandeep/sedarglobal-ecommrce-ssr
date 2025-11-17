import LinkComponent from "@components/Link";
import React from "react";
// import './Footer2.scss';
import { Container, Row, Image, Col, Accordion, Card, AccordionContext, useAccordionButton } from 'react-bootstrap';
import { isMobile, isTablet } from "react-device-detect";
import { useRouter } from 'next/router';
import { countries_lang } from '@utils/countriesData';



function CustomToggle({ children, eventKey, callback }) {
  const currentEventKey = React.useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );
  const isCurrentEventKey = currentEventKey.activeEventKey == eventKey;

  return (
    <div onClick={decoratedOnClick} className="customtoggle">
      {children} <span className="iconcollapse float-end">{isCurrentEventKey ? "-" : "+"} </span>
    </div>

  );
}


const MobileFooterMenu = (props) => {
  const router = useRouter();
  const { locale } = router;
  return (
    <Accordion className="footercollapse">
      {props.value.CHILD && props.value.CHILD.map(function (row, index) {
        return (
          <Card key={index}>
            <Card.Header>
              <CustomToggle eventKey={index}>{row.content}</CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index}>
              <Card.Body>
                <ul className="footer_main_menu_list list-unstyled">
                  {index == 4 && countries_lang && countries_lang[0] && countries_lang[0][locale] ? (
                    Object?.values(countries_lang[0][locale.split('-')[1]])?.map((row, i) => {
                      return (
                        <li key={i}>
                          <a href={`/${row.code}-${row.lang}`}>
                            {row.name}
                          </a>
                        </li>
                      )
                    })
                  ) : (
                    row.SUB_CHILD && row.SUB_CHILD.map(function (row_child, child_index) {
                      return (
                        <li key={child_index}>
                          <LinkComponent href={'/' + row_child?.link_url}>
                            {row_child.content}
                          </LinkComponent>
                        </li>
                      )
                    })
                  )}
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        )
      })
      }
    </Accordion>
  );
}

export default function Footer2(props) {
  // const { isMOBILE, isTABLET, isLAPTOP, isDESKTOP } = useDevice();
  const router = useRouter();
  const { locale } = router;
  return (
    <div className="Footer2">
      <Row className="footer_main_menu">
        {isMobile || isTablet ?
          <Col sm={12} className=""><MobileFooterMenu value={props} /></Col>
          :
          props.CHILD && props.CHILD.map(function (row, index) {
            return (
              <div className="footerMid2" key={index}>
                <div className="footer-widget ">
                  <div className="footer-title">{row.content}</div>
                  <ul className="footer_main_menu_list list-unstyled">

                    {index == 4 && countries_lang[0] && countries_lang[0][locale.split('-')[1]] ? (
                      Object?.values(countries_lang[0][locale.split('-')[1]])?.map((row, i) => {
                        return (
                          <li key={i}>
                            <a href={`/${row.code}-${row.lang}`}>
                              {row.name}
                            </a>
                          </li>
                        )
                      })
                    ) : (
                      row.SUB_CHILD && row.SUB_CHILD.map(function (row_child, child_index) {
                        return (
                          <li key={child_index}>
                            <LinkComponent href={'/' + row_child.link_url}>
                              {row_child.content}
                            </LinkComponent>
                          </li>
                        )
                      })
                    )}
                  </ul>
                </div>

              </div>
            )
          })
        }
      </Row>
    </div>

  );
}