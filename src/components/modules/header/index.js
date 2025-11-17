import { Card } from 'react-bootstrap'
import React from 'react'

const CommonHeader = ({ title }) => {
    return (
        <Card.Text className='common-title'>{title}</Card.Text>
    )
}

export default CommonHeader