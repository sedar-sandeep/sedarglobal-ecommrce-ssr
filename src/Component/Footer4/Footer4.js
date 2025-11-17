import LinkComponent from "@components/Link";
import React from "react";
// import './Footer4.scss';
import { Row, Col} from 'react-bootstrap';


export default function Footer4(data) {
  if (data?.CHILD == undefined || data?.CHILD[1] == undefined || data?.CHILD[1]?.SUB_CHILD == undefined) {
    return false;
  }
  return (
    <>
      <div className="Footer4">
        <Row className="footer_bottombar m-0">
          <Col md={3} sm={12} className="copyright ps-0">
            {data.CHILD[0].content}
          </Col>
          <Col md={6} sm={12} className="bottombar_menu">
            <ul className="list-unstyled list-group list-group-horizontal">
              {data.CHILD[1].SUB_CHILD.map(function (row, index) {
                return <li key={index}>
                  <LinkComponent href={'/'+row.link_url}>
                    {row.content}
                  </LinkComponent>
                </li>
              })}
            </ul>
          </Col>
          <Col md={3} sm={12} className="designby">{data.CHILD[2].content}</Col>
        </Row>
      </div>
    </>
  );
}

