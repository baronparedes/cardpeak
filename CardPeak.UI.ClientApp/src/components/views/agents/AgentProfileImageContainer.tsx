import * as React from 'react';
import { ModalPanel } from "../../layout/ModalPanel";
import { Panel, Form, FormGroup, Col } from "react-bootstrap";
import { FormFieldFile } from "../../layout/FormField";
import { ConfirmButton } from "../../layout/ConfirmButton";
import { ErrorLabel } from "../../layout/ErrorLabel";
import * as AgentActions from '../../../services/actions/agentActions';
import { RootState } from "../../../services/reducers/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

interface AgentProfileImageDispatchProps {
    actions?: typeof AgentActions;
}

interface AgentProfileImageState {
    showModal: boolean;
    fileName: string;
    files: any;
    onUploadError?: string;
    errors: {
        [error: string]: string;
    };
}

class AgentProfileImageContainer extends React.Component<
    CardPeak.Models.AgentModel & AgentProfileImageDispatchProps,
    AgentProfileImageState
> {
    constructor(props: CardPeak.Models.AgentModel
        & AgentProfileImageDispatchProps) {
        super(props);
        this.state = {
            showModal: false,
            fileName: '',
            files: undefined,
            errors: {
                fileName: ''
            }
        }
    }
    getPhotoUrl = () => {
        if (this.props.selectedAgent) {
            return __API_BASE_URL__ + '/agents/' + this.props.selectedAgent.agentId + '/photo';
        }
        return '';
    }
    hasErrors: () => boolean = () => {
        this.handleErrors();
        let result: boolean = false;
        if (!!this.state.errors.fileName) {
            result = true;
            this.setState({
                onUploadError: this.state.errors.fileName
            });
        }
        return result;
    }
    handleErrors() {
        let errors = this.state.errors;
        if (this.state.fileName === '')
            errors.fileName = 'please choose a file to upload';
        this.setState({ errors, onUploadError: undefined });
    }
    handleOnToggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
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
    handleOnUpload = () => {
        if (!this.state.files) {
            return;
        }

        let formData = new FormData();
        formData.append('file', this.state.files[0]);
        this.props.actions.uploadPhotoStart(
            this.props.selectedAgent.agentId,
            formData,
            () => {
                this.setState({
                    fileName: '',
                    files: undefined
                });
                this.handleOnToggleModal();
            },
            (e: string) => {
                this.setState({ onUploadError: e });
            }
        );
    }
    render() {
        return (
            <div>
                <ModalPanel
                    onToggleModal={this.handleOnToggleModal}
                    showModal={this.state.showModal}
                    title="upload photo">
                    <Panel className="container-fluid">
                        <Form
                            horizontal
                            onSubmit={(e: any) => {
                                e.preventDetfault();
                            }}>
                            <fieldset
                                disabled={
                                    this.props.uploadingAgentPhoto
                                }>
                                <FormFieldFile
                                    block
                                    onChange={this.handleOnFileChange}
                                    label="file"
                                    name="fileName"
                                    value={this.state.fileName}
                                    error={this.state.errors.fileName}
                                    accept={'.png,.jpg,.jpeg'}
                                    controlId="form-batch-upload"
                                />
                                <FormGroup>
                                    <Col sm={12} className="text-right">
                                        <ConfirmButton
                                            useButtonLoading
                                            bsStyle="primary"
                                            onPreventToggle={
                                                this.handleOnPreventToggle
                                            }
                                            onConfirm={this.handleOnConfirm}
                                            confirmTitle="upload file"
                                            confirmMessage="Do you want to continue?"
                                            isLoading={
                                                this.props.uploadingAgentPhoto
                                            }
                                            disabled={
                                                this.props.uploadingAgentPhoto
                                            }
                                            buttonLabel="Upload"
                                        />
                                    </Col>
                                    <Col sm={12} xs={12} md={12} lg={12}>
                                        <ErrorLabel
                                            error={this.state.onUploadError}
                                        />
                                    </Col>
                                </FormGroup>
                            </fieldset>
                        </Form>
                    </Panel>
                </ModalPanel>
                <div onClick={this.handleOnToggleModal}>
                    <img key={Date.now()} className="img-round-overlap float-right"
                        alt=""
                        src={this.getPhotoUrl()}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (
    state: RootState
): CardPeak.Models.AgentModel => ({
    ...state.agentModel
});

const mapDispatchToProps = (
    dispatch: any
): AgentProfileImageDispatchProps => {
    return {
        actions: bindActionCreators(AgentActions as any, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AgentProfileImageContainer);