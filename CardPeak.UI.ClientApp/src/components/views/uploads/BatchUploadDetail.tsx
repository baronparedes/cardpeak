import * as React from 'react'
import { Panel, Button } from 'react-bootstrap'
import { SpinnerBlock, ButtonLoadingText, ModalConfirm } from '../../layout'

interface BatchUploadDetailProps {
    uploadingFile: boolean,
    batchUpload: CardPeak.Entities.BatchUpload,
    processing: boolean
    onProcess: (batchId: number, errorCallback: (e: string) => void) => void,
    processingComplete: boolean
}

interface BatchUploadDetailState {
    showConfirmModal?: boolean,
    onProcessError?: string,
}

class BatchUploadDetail extends React.Component<BatchUploadDetailProps, BatchUploadDetailState> {
    constructor(props: BatchUploadDetailProps) {
        super(props);
        this.state = {

        }
    }
    handleOnToggleModal = () => {
        this.setState({
            showConfirmModal: !this.state.showConfirmModal,
            onProcessError: undefined
        });
    }
    handleOnConfirm = () => {
        this.handleOnToggleModal();
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
                <div>
                    <label className="spacer-right">Batch Id</label>
                    <span>{this.props.batchUpload.batchId}</span>
                </div>
                <div>
                    <label className="spacer-right">filename</label>
                    <span>{this.props.batchUpload.fileName.split('\\').pop().split('/').pop()}</span>
                </div>
                <div>
                    <label className="spacer-right">Bank</label>
                    <span className="text-highlight">{this.props.batchUpload.bank.description}</span>
                </div>
                <div className="text-right">
                    <Button
                        hidden={this.props.processingComplete}
                        type="button"
                        bsStyle="success"
                        onClick={this.handleOnToggleModal}
                        disabled={this.props.processing}>
                        <ButtonLoadingText isLoading={this.props.processing} label="Process" />
                    </Button>
                    <ModalConfirm
                        title="start processing"
                        showModal={this.state.showConfirmModal}
                        onConfirm={this.handleOnConfirm}
                        onToggleModal={this.handleOnToggleModal}>

                        Do you want to begin processing?

                    </ModalConfirm>
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