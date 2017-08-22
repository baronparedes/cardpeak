import * as React from 'react'
import { Row, Col } from 'react-bootstrap'

interface AgentRowLayoutProps {
    firstName?: string,
    lastName?: string,
    gender?: string,
    alias?: string,
    isHeader: boolean
}

const AgentRowLayout = (props: AgentRowLayoutProps) => {
    return (
        <Row>
            <Col md={5} lg={5} sm={4} xs={4}>
                {props.isHeader ? "first name" : props.firstName}
            </Col>
            <Col md={4} lg={4} sm={4} xs={4}>
                {props.isHeader ? "last name" : props.lastName}
            </Col>
            <Col md={1} lg={1} smHidden xsHidden>
                {props.isHeader ? "gender" : props.gender}
            </Col>
            <Col md={1} lg={1} smHidden xsHidden>
                {props.isHeader ? "alias" : props.alias}
            </Col>
            <Col md={1} lg={1} sm={1} xs={1}>
                {props.isHeader ? "actions" : "actions"}
            </Col>
        </Row>   
    )
}

export default AgentRowLayout;
