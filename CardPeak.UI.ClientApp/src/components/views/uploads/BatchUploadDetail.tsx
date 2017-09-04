﻿import * as React from 'react'
import { Panel, Button } from 'react-bootstrap'
import { SpinnerBlock, ConfirmButtonLoading, GridList } from '../../layout'

import BatchUploadDetailRowLayout from './BatchUploadDetailRowLayout'

interface BatchUploadDetailProps {
    uploadingFile: boolean,
    batchUpload: CardPeak.Entities.BatchUpload,
    processing: boolean
    onProcess: (batchId: number, errorCallback: (e: string) => void) => void,
    processingComplete: boolean,
    onClickClear: () => void
}

interface BatchUploadDetailState {
    onProcessError: string;
}

class BatchUploadDetail extends React.Component<BatchUploadDetailProps, BatchUploadDetailState> {
    constructor(props: BatchUploadDetailProps) {
        super(props);
        this.state = {
            onProcessError: undefined
        }
    }
    handleOnToggleModal = () => {
        this.setState({
            onProcessError: undefined
        });
    }
    handleOnConfirm = () => {
        this.handleOnProcess();
    }
    handleOnProcess = () => {
        this.props.onProcess(this.props.batchUpload.batchId, (e: string) => {
            this.setState({ onProcessError: e });
        });
    }
    render() {
        if (this.props.uploadingFile) {
            return <SpinnerBlock />
        }
        if (!!!this.props.batchUpload) {
            return null;
        }
        return (
            <Panel className="container-fluid">
                <GridList header={<BatchUploadDetailRowLayout isHeader={true} />}>
                    <Panel className="panel-row">
                        <BatchUploadDetailRowLayout batchUpload={this.props.batchUpload} isHeader={false} />
                    </Panel>
                </GridList>
                <br />
                <div className="text-right">
                    {
                        this.props.processingComplete ? null :
                            <ConfirmButtonLoading
                                bsStyle="success"
                                onToggleConfirm={this.handleOnToggleModal}
                                onConfirm={this.handleOnConfirm}
                                confirmTitle="start processing"
                                confirmMessage="Do you want to begin processing?"
                                isLoading={this.props.processing}
                                disabled={this.props.processing || this.props.processingComplete}
                                buttonLabel="Process" />
                    }
                    {
                        !this.props.processingComplete ? null : 
                            <Button type="button" bsStyle="primary" onClick={this.props.onClickClear} className="spacer-right">
                                Clear
                            </Button>
                    }
                </div>
                <div>
                    {
                        this.state.onProcessError ?
                            this.state.onProcessError
                            : null
                    }
                </div>
            </Panel>
        )
    }
}

export default BatchUploadDetail;