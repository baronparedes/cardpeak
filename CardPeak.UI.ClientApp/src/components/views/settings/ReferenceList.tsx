import * as React from 'react'
import { Row, Col, Button, Panel } from 'react-bootstrap'
import { DataList, DataListProps, DataItemProps } from '../../layout'

type ReferenceDataList = new () => DataList<CardPeak.Entities.Reference>;
const ReferenceDataList = DataList as ReferenceDataList;

interface ReferenceListProps {
    title?: string;
    onSaveReference?: (item: CardPeak.Entities.Reference) => void;
    referenceTypeId?: number;
}

const ReferenceRowLayout = (props: DataItemProps<CardPeak.Entities.Reference> & ReferenceListProps) => {
    return (
        <Row>
            <Col md={2} lg={2} sm={3} xs={3}>
                {props.isHeader ? "id" : props.item.referenceId}
            </Col>
            <Col md={8} lg={8} sm={7} xs={7}>
                {props.isHeader ? "description" : props.item.description}
            </Col>
        </Row>
    )
}

const ReferenceList = (props: DataListProps<CardPeak.Entities.Reference> & ReferenceListProps) => {
    return (
        <div>
            <ReferenceDataList
                addOn={
                    <Col sm={12} xsHidden={true} className="text-center spacer-top spacer-bottom">
                        <label className="text-muted">{props.title}</label>
                    </Col>
                }
                onGetKey={(item) => item.referenceId}
                renderHeader={() => { return <ReferenceRowLayout isHeader /> }}
                renderItem={(item, key) => { return <ReferenceRowLayout item={item} key={key} onSaveReference={props.onSaveReference} /> }}
                data={props.data} />
        </div>
    )
}

export default ReferenceList;