import * as React from 'react'
import * as UploadActions from '../../../services/actions/uploadActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { FormFieldFile, ConfirmButton } from '../../layout'
import { Panel, Form, FormGroup, Button, Col } from 'react-bootstrap'

import BatchUploadDetail from './BatchUploadDetail'
import BatchUploadErrorList from './BatchUploadErrorList'

interface BatchUploadContainerDispatchProps {
    actions?: typeof UploadActions;
}

interface BatchUploadContainerState {
    fileName: string,
    files: any
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
    handleOnPreventToggle = () => {
        if (this.hasErrors()) {
            return true;
        }
        return false;
    }
    handleOnConfirm = () => {
        if (this.hasErrors()) {
            return;
        }
        this.handleOnUpload();
    }
    handleErrors() {
        let errors = this.state.errors;
        if (this.state.fileName === "") errors.fileName = "please choose a file to upload";
        this.setState({ errors, onUploadError: undefined });
    }
    handleOnFileChange = (e: any) => {
        let errors = this.state.errors;
        errors[e.target.name] = '';
        this.setState({
            files: e.target.files,
            [e.target.name]: e.target.value,
            errors,
            onUploadError: undefined
        });
        this.props.actions.clearBatch();
    }
    handleOnUpload = () => {
        if (!this.state.files) {
            return;
        }

        let formData = new FormData();
        formData.append('file', this.state.files[0]);
        this.props.actions.uploadFileStart(formData, () => {
            this.setState({
                fileName: undefined,
                files: undefined
            });
        }, (e: string) => {
            this.setState({ onUploadError: e });
        })
    }
    render() {
        return (
            <div>
                <Panel className="container-fluid">
                    <Form horizontal onSubmit={(e: any) => { e.preventDetfault() }}>
                        <fieldset disabled={this.props.uploadingFile || this.props.processing}>
                            <FormFieldFile
                                block
                                onChange={this.handleOnFileChange}
                                label="file"
                                name="fileName"
                                value={this.state.fileName}
                                error={this.state.errors.fileName}
                                accept={".xls,.xlsx"}
                                controlId="form-batch-upload" />
                            <FormGroup>
                                <Col sm={12} className="text-right">
                                    <ConfirmButton
                                        useButtonLoading
                                        bsStyle="primary"
                                        onPreventToggle={this.handleOnPreventToggle}
                                        onConfirm={this.handleOnConfirm}
                                        confirmTitle="upload file"
                                        confirmMessage="Do you want to continue?"
                                        isLoading={this.props.uploadingFile}
                                        disabled={this.props.uploadingFile}
                                        buttonLabel="Upload" />
                                </Col>
                                <Col sm={12} xs={12} md={12} lg={12}>
                                    {
                                        this.state.onUploadError ?
                                            <label className="text-danger">{this.state.onUploadError}</label>
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
                    onClickClear={this.props.actions.clearBatch}
                    onProcess={this.props.actions.processBatchStart} />
                {
                    !this.props.processingCompleted || !this.props.selectedBatchUpload.hasErrors ? null :
                        <BatchUploadErrorList data={this.props.processedApprovalTransactions} />
                }
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
