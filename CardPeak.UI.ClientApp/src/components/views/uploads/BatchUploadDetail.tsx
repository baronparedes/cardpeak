﻿import * as React from 'react'
import { Panel, Button } from 'react-bootstrap'
import { ConfirmButton, SpinnerBlock } from '../../layout'

import BatchUploadDetailInfo from './BatchUploadDetailInfo'

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
    renderActions() {
        return (
            <div className="text-right">
                {
                    this.props.processingComplete ? null :
                        <ConfirmButton
                            useButtonLoading
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
                        <ConfirmButton
                            bsStyle="warning"
                            onConfirm={this.props.onClickClear}
                            confirmTitle="clear batch upload"
                            confirmMessage="Continue?"
                            buttonLabel="Clear" />
                }
            </div>
        )
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
                <BatchUploadDetailInfo batchUpload={this.props.batchUpload} />
                <br />
                {this.renderActions()}
                <div>
                    {
                        this.state.onProcessError ?
                            <label className="text-danger">{this.state.onProcessError}</label>
                            : null
                    }
                </div>
            </Panel>
        )
    }
}

export default BatchUploadDetail;