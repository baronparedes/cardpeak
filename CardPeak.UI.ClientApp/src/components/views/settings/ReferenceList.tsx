import * as React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { GridList, SpinnerRow, ListNoRecordsRow } from '../../layout'
import ReferenceDetail from './ReferenceDetail'
import ReferenceDetailRowLayout from './ReferenceDetailRowLayout'

interface ReferenceListProps {
    referenceTypeId?: number;
    isLoading?: boolean;
    references?: CardPeak.Entities.Reference[];
    onSaveReference?: (reference: CardPeak.Entities.Reference) => void;
}

const ReferenceListItems = (props: ReferenceListProps) => {
    return (
        <GridList header={<ReferenceDetailRowLayout isHeader={true} />}>
            {
                props.isLoading ?
                    <SpinnerRow /> :
                    props.references && props.references.length > 0 ?
                        props.references.map((reference) => {
                            return (
                                <ReferenceDetail
                                    isLoading={props.isLoading}
                                    referenceTypeId={props.referenceTypeId}
                                    reference={reference}
                                    key={reference.referenceId}
                                    onSaveReference={props.onSaveReference} />
                            )
                        }) : <ListNoRecordsRow />
            }
        </GridList>
    )
}

const ReferenceList = (props: ReferenceListProps) => {
    return (
        <div>
            <ReferenceListItems
                referenceTypeId={props.referenceTypeId}
                isLoading={props.isLoading}
                references={props.references}
                onSaveReference={props.onSaveReference} />
        </div>
    )
}

export default ReferenceList