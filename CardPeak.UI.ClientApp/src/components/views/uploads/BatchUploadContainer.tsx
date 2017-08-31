import * as React from 'react'
import { FormFieldFile, ModalConfirm, ButtonLoadingText } from '../../layout'
import { Panel, Form, FormGroup, Button, Col } from 'react-bootstrap'

interface BatchUploadContainerProps {
    isUploading?: boolean
}

interface BatchUploadContainerState {
    fileName: string,
    showConfirmModal?: boolean,
    onUploadError?: string,
    errors: {
        [error: string]: string,
    }
}

class BatchUploadContainer extends React.Component<BatchUploadContainerProps, BatchUploadContainerState> {
    controls: {
        uploadFile?: HTMLInputElement
    } = {};
    constructor(props: BatchUploadContainerProps) {
        super(props);
        this.state = {
            fileName: "",
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
        alert(this.state.fileName);
        // TODO: Upload
    }
    handleErrors() {
        this.setState({ onUploadError: undefined });
        let errors = this.state.errors;
        if (this.state.fileName === "") errors.fileName = "please choose a file to upload";
        this.setState({ errors });
    }
    handleOnChange = (e: any) => {
        let errors = this.state.errors;
        errors[e.target.name] = '';
        this.setState({
            [e.target.name]: e.target.value,
            errors
        });
        this.setState({ onUploadError: undefined });
    }
    render() {
        return (
            <Panel className="container-fluid">
                <Form horizontal onSubmit={(e: any) => { e.preventDetfault() }}>
                    <FormFieldFile
                        ref={(input) => this.controls.uploadFile = input}
                        onChange={this.handleOnChange}
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
                                disabled={this.props.isUploading}>
                                <ButtonLoadingText isLoading={this.props.isUploading} label="Upload" />
                            </Button>
                            <ModalConfirm
                                title="save agent details"
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
                </Form>
            </Panel>
        )
    }
}

export default BatchUploadContainer;