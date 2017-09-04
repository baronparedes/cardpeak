import * as React from 'react'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import { ListNoRecordsRow, GridList } from '../../layout'

import BatchUploadErrorDetail from './BatchUploadErrorDetail'
import BatchUploadErrorDetailRowLayout from './BatchUploadErrorDetailRowLayout'

interface BatchUploadErrorListProps {
    processedItems?: CardPeak.Entities.ProcessedApprovalTransaction[]
}

export default class BatchUploadErrorList extends React.Component<BatchUploadErrorListProps, undefined> {
    constructor(props: BatchUploadErrorListProps) {
        super(props)
    }
    render() {
        return (
            <div>
                <GridList header={<BatchUploadErrorDetailRowLayout isHeader={true} />}>
                    {
                        this.props.processedItems && this.props.processedItems.length > 0 ?
                            this.props.processedItems.map((processedItem) => {
                                return (
                                    <BatchUploadErrorDetail processedItem={processedItem} key={processedItem.row} />
                                )
                            }) : <ListNoRecordsRow />
                    }
                </GridList>
            </div>
        )
    }
}