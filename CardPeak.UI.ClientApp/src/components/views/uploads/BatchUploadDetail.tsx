﻿import * as React from 'react';
import { ButtonGroup, Panel } from 'react-bootstrap';
import { ConfirmButton, ErrorLabel, SpinnerBlock } from '../../layout';
import BatchUploadDetailInfo from './BatchUploadDetailInfo';

interface BatchUploadDetailProps {
    uploadingFile: boolean;
    batchUpload: CardPeak.Entities.BatchUpload;
    processing: boolean;
    onProcess: (
        batchId: number,
        errorCallback: (e: string) => void
    ) => void;
    processingComplete: boolean;
    onClear: () => void;
}

interface BatchUploadDetailState {
    onProcessError: string;
}

class BatchUploadDetail extends React.Component<
    BatchUploadDetailProps,
    BatchUploadDetailState
> {
    constructor(props: BatchUploadDetailProps) {
        super(props);
        this.state = {
            onProcessError: undefined
        };
    }
    handleOnToggleModal = () => {
        this.setState({
            onProcessError: undefined
        });
    };
    handleOnConfirm = () => {
        this.handleOnProcess();
    };
    handleOnProcess = () => {
        this.props.onProcess(
            this.props.batchUpload.batchId,
            (e: string) => {
                this.setState({ onProcessError: e });
            }
        );
    };
    renderActions() {
        return (
            <div className="text-right">
                {this.props.processingComplete ? null : (
                    <div className="container-fluid">
                        <ButtonGroup>
                            <ConfirmButton
                                useButtonLoading
                                bsStyle="success"
                                onToggleConfirm={
                                    this.handleOnToggleModal
                                }
                                onConfirm={this.handleOnConfirm}
                                confirmTitle="start processing"
                                confirmMessage="Do you want to begin processing?"
                                isLoading={this.props.processing}
                                disabled={
                                    this.props.processing ||
                                    this.props.processingComplete
                                }
                                buttonLabel="Process"
                            />
                            <ConfirmButton
                                bsStyle="warning"
                                onConfirm={this.props.onClear}
                                confirmTitle="cancel batch upload"
                                confirmMessage="Continue?"
                                disabled={
                                    this.props.processing ||
                                    this.props.processingComplete
                                }
                                buttonLabel="cancel"
                            />
                        </ButtonGroup>
                    </div>
                )}
                {!this.props.processingComplete ? null : (
                    <ConfirmButton
                        bsStyle="warning"
                        onConfirm={this.props.onClear}
                        confirmTitle="clear batch upload"
                        confirmMessage="Continue?"
                        buttonLabel="Clear"
                    />
                )}
            </div>
        );
    }
    render() {
        if (this.props.uploadingFile) {
            return <SpinnerBlock />;
        }
        if (!!!this.props.batchUpload) {
            return null;
        }
        return (
            <Panel className="container-fluid">
                <BatchUploadDetailInfo
                    batchUpload={this.props.batchUpload}
                />
                <br />
                {this.renderActions()}
                <ErrorLabel error={this.state.onProcessError} />
            </Panel>
        );
    }
}

export default BatchUploadDetail;
