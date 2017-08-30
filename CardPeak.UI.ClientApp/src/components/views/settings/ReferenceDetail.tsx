﻿import * as React from 'react'
import { Panel } from 'react-bootstrap'
import ReferenceDetailRowLayout from './ReferenceDetailRowLayout'

interface ReferenceDetailProps {
    referenceTypeId: number;
    reference: CardPeak.Entities.Reference;
    onSaveReference?: (reference: CardPeak.Entities.Reference) => void;
    isLoading?: boolean;
}

const ReferenceDetail = (props: ReferenceDetailProps) => {
    return (
        <Panel className="panel-row">
            <ReferenceDetailRowLayout
                isLoading={props.isLoading}
                reference={props.reference}
                onSaveReference={props.onSaveReference}
                isHeader={false} />
        </Panel>
    )
}
export default ReferenceDetail;