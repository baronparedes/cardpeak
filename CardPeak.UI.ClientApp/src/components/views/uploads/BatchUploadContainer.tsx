import * as React from 'react'
import * as UploadActions from '../../../services/actions/uploadActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { FormFieldFile, ModalConfirm, ButtonLoadingText } from '../../layout'
import { Panel, Form, FormGroup, Button, Col } from 'react-bootstrap'

import BatchUploadDetail from './BatchUploadDetail'

interface BatchUploadContainerDispatchProps {
    actions?: typeof UploadActions;
}

interface BatchUploadContainerState {
    fileName: string,
    files: any
    showConfirmModal?: boolean,
    onUploadError?: string,
    errors: {
        [error: string]: string,
    }
}

class BatchUploadContainer extends React.Component<CardPeak.Models.BatchUploadModel & BatchUploadContainerDispatchProps, BatchUploadContainerState> {
    constructor(props: CardPeak.Models.BatchUploadModel & BatchUploadContainerDispatchProps) {
        super(props);
        this.state = {
            fileName: "",
            files: undefined,
            errors: {
                fileName: ""
            }
        }
    }
    hasErrors: () => boolean = () => {
        this.handleErrors();
        let result: boolean = false;
        if (!!this.state.errors.fileName) {
            result = true;
            this.setState({ onUploadError: this.state.errors.fileName });
        }
        return result;
    }
    handleOnToggleModal = () => {
        if (this.hasErrors()) {
            return;
        }
        this.setState({ showConfirmModal: !this.state.showConfirmModal });
    }
    handleOnConfirm = () => {
        if (this.hasErrors()) {
            return;
        }
        this.handleOnToggleModal();
        this.handleOnUpload();
    }
    handleErrors() {
        this.setState({ onUploadError: undefined });
        let errors = this.state.errors;
        if (this.state.fileName === "") errors.fileName = "please choose a file to upload";
        this.setState({ errors });
    }
    handleOnFileChange = (e: any) => {
        let errors = this.state.errors;
        errors[e.target.name] = '';
        this.setState({
            files: e.target.files,
            [e.target.name]: e.target.value,
            errors
        });
        this.setState({ onUploadError: undefined });
    }
    handleOnUpload = () => {
        let formData = new FormData();
        formData.append('file', this.state.files[0]);
        this.props.actions.uploadFileStart(formData, (e: string) => {
            this.setState({ onUploadError: e });
        })
    }
    render() {
        return (
            <div className="container-fluid">
                <Panel className="container-fluid">
                    <Form horizontal onSubmit={(e: any) => { e.preventDetfault() }}>
                        <fieldset disabled={this.props.uploadingFile || this.props.processing}>
                            <FormFieldFile
                                onChange={this.handleOnFileChange}
                                label="file"
                                name="fileName"
                                value={this.state.fileName}
                                error={this.state.errors.fileName}
                                accept={".xls,.xlsx"}
                                controlId="form-batch-upload" />
                            <FormGroup>
                                <Col sm={12} className="text-right">
                                    <Button
                                        type="button"
                                        bsStyle="success"
                                        onClick={this.handleOnToggleModal}
                                        disabled={this.props.uploadingFile}>
                                        <ButtonLoadingText isLoading={this.props.uploadingFile} label="Upload" />
                                    </Button>
                                    <ModalConfirm
                                        title="upload file"
                                        showModal={this.state.showConfirmModal}
                                        onConfirm={this.handleOnConfirm}
                                        onToggleModal={this.handleOnToggleModal}>

                                        Do you want to continue?
                                    </ModalConfirm>
                                </Col>
                                <Col sm={12} xs={12} md={12} lg={12} className="text-danger">
                                    {
                                        this.state.onUploadError ?
                                            this.state.onUploadError
                                            : null
                                    }
                                </Col>
                            </FormGroup>
                        </fieldset>
                    </Form>
                </Panel>
                <BatchUploadDetail
                    uploadingFile={this.props.uploadingFile}
                    batchUpload={this.props.selectedBatchUpload}
                    processing={this.props.processing}
                    processingComplete={this.props.processingCompleted}
                    onProcess={this.props.actions.processBatchStart} />
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): CardPeak.Models.BatchUploadModel => ({
    ...state.batchUploadModel
});

const mapDispatchToProps = (dispatch: any): BatchUploadContainerDispatchProps => {
    return {
        actions: bindActionCreators(UploadActions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BatchUploadContainer);
