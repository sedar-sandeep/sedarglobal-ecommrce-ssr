import React, { useState, useEffect, Suspense } from "react";
import { Col, Container, Row, Tab, Nav, Button } from 'react-bootstrap';
import LinkComponent from '@components/Link';

import ApiDataService from '../../../services/ApiDataService';
import CardList from './CardList';
import parse from 'html-react-parser';
import { useTranslation } from 'next-i18next'

const UserCard = () => {
  const { t } = useTranslation('common');
  const [faqList, setFaqList] = useState(false);


  const faqListFun = () => {
    let post_data = { page_name: 'save_card', content: 'na', page: 1, limit: 50 }
    ApiDataService.getAll('content/page', post_data).then(response => {
      let res_data = response.data;
      if (res_data.return_status == 0 && res_data.error_message == 'Success') {
        // 
        setFaqList(res_data.results);
      } else {
        //console.log(res_data.error_message, 'Error...');
      }

    }).catch(e => {
      console.log(e, 'res_data...', e.return_status);
    });
  }
  useEffect(() => {
    faqListFun();
  }, [])

  return (
    <div className="ProfileSavedCard mt-15">
      <Tab.Container id="ProfileMyorder-tab" defaultActiveKey="first">
        <Row>
          <Col sm={12}>
            <Nav variant="pills" className="flex-row tab-nav">
              <Nav.Item>
                <Nav.Link eventKey="first"> {t("SavedCards")} </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={12} className="tab-content">
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Row>
                  <Col sm={12}>
                    <div className="saved-card">
                      <CardList />

                      <div className="color-button">
                        <LinkComponent className="" href="/profile/card/add" ><span>{t("AddCards")}</span></LinkComponent>
                      </div>
                    </div>

                    {faqList.PARENT && faqList.PARENT.map((parent_data, parent_index) => {
                      return (
                        <div className="card-faq" key={parent_index}>
                          <h2>{parent_data.title}</h2>

                          {parent_data.child.length > 0 && parent_data.child.map((child_data, child_index) => {
                            return (
                              <div className="card-faq-loop" key={child_index}>
                                <h3>{child_data.title}</h3>
                                <p>{parse(child_data.description)}</p>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}

                    {/* <div className="card-faq">
                      <div className="card-faq-loop">
                        <h3>Why is my Card being saved on Jollysilks?</h3>
                        <p>It’s quicker. You can save the hassle of typing in the complete card information every time you shop at Jollysilks by saving your card details. You can make your payment by selecting the saved card of your choice at checkout. While this is obviously faster, it is also very secure.</p>
                      </div>
                      <div className="card-faq-loop">
                        <h3>Why is my Card being saved on Jollysilks?</h3>
                        <p>It’s quicker. You can save the hassle of typing in the complete card information every time you shop at Jollysilks by saving your card details. You can make your payment by selecting the saved card of your choice at checkout. While this is obviously faster, it is also very secure.</p>
                      </div>
                      <div className="card-faq-loop">
                        <h3>Why is my Card being saved on Jollysilks?</h3>
                        <p>It’s quicker. You can save the hassle of typing in the complete card information every time you shop at Jollysilks by saving your card details. You can make your payment by selecting the saved card of your choice at checkout. While this is obviously faster, it is also very secure.</p>
                      </div>
                    </div> */}


                  </Col>
                </Row>

              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

    </div>
  )
}


export default UserCard;
