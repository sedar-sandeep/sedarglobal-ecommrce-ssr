import React from 'react';
import { Card } from 'react-bootstrap';
import LinkComponent from '@components/Link';

const Tiles = (props) => {
  return (
    <LinkComponent
      href={`/blog/${props.category_link}/${props.link_url}`}
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <Card
        className="shadow-sm bg-white rounded border-0"
        style={{ height: '100%' }}
      >
        <Card.Img variant="top" style={{ height: '100%' }} src={props.image_path} />
        <Card.Body>
          <p style={{ fontWeight: 'bold', fontSize: '16px' ,fontWeight:'900'}}>{props.category_title}</p>
          <p style={{ fontSize: '14px' }}>{props.title}</p> 
        </Card.Body>
      </Card>
    </LinkComponent>
  );
};

export default Tiles;
