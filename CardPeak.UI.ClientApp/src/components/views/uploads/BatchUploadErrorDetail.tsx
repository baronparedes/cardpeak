import * as React from 'react'
import { Panel } from 'react-bootstrap'
import BatchUploadErrorDetailRowLayout from './BatchUploadErrorDetailRowLayout'

interface BatchUploadErrorDetailProps {
    processedItem: CardPeak.Entities.ProcessedApprovalTransaction
}

const BatchUploadErrorDetail = (props: BatchUploadErrorDetailProps) => {
    return (
        <Panel className="panel-row">
            <BatchUploadErrorDetailRowLayout
                processedItem={props.processedItem}
                isHeader={false} />
        </Panel>
    )
}

export default BatchUploadErrorDetail;