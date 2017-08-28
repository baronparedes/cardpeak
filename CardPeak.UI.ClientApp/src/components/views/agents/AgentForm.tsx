import * as React from 'react'

import { Form, FormGroup, Col, Button } from 'react-bootstrap'
import { FormFieldInput, FormFieldDate, FormFieldRadioGroup, ModalConfirm, ButtonLoadingText } from '../../layout'

interface AgentFormProps {
    agent: CardPeak.Entities.Agent;
    onSave: (agent: CardPeak.Entities.Agent, errorCallback?: (error: string) => void) => void;
    isSaving: boolean;
}

interface AgentFormState {
    agent?: CardPeak.Entities.Agent;
    showConfirmModal?: boolean;
    errors: {
        [error: string]: string,
    };
    onSaveAgentErrorMessage?: string;
}

export default class AgentForm extends React.Component<AgentFormProps, AgentFormState> {
    constructor(props: AgentFormProps) {
        super(props);
        this.state = {
            agent: props.agent,
            errors: {
                firstName: '',
                lastName: '',
                gender: '',
            }
        };
    }
    handleErrors = () => {
        let errors = this.state.errors;
        if (this.state.agent.firstName === "") errors.firstName = "*";
        if (this.state.agent.lastName === "") errors.lastName = "*";
        this.setState({ errors });
        return errors;
    }
    handleOnConfirm = () => {
        this.handleErrors();
        if (!!this.state.errors.firstName && !!this.state.errors.lastName) {
            return;
        }
        this.handleOnToggleModal();
        this.handleOnUpdateAgentSubmitted();
    }
    handleOnUpdateAgentSubmitted = () => {
        this.setState({ onSaveAgentErrorMessage: undefined });
        this.props.onSave(this.state.agent, this.handleOnUpdateAgentSubmittedError);
    }
    handleOnUpdateAgentSubmittedError = (error: string) => {
        this.setState({ onSaveAgentErrorMessage: error });
    }
    handleOnToggleModal = () => {
        this.setState({ onSaveAgentErrorMessage: undefined });
        this.handleErrors();
        if (!!this.state.errors.firstName && !!this.state.errors.lastName) {
            return;
        }
        this.setState({ showConfirmModal: !this.state.showConfirmModal });
    }
    handleFocus = (e: any) => {
        e.target.select();
    }
    handleChange = (e: any) => {
        let errors = this.state.errors;
        errors[e.target.name] = '';
        this.setState({
            agent: {
                ...this.state.agent,
                [e.target.name]: e.target.value,
            },
            errors
        });
    }
    handleChangeBirthDate = (value: string, formatted: string) => {
        this.setState({
            ...this.state,
            agent: {
                ...this.state.agent,
                birthDate: new Date(value)
            }
        })
    }
    componentWillReceiveProps(nextProps: AgentFormProps) {
        if (this.state.agent.agentId != nextProps.agent.agentId || nextProps.agent.agentId === 0) {
            this.setState({
                agent: nextProps.agent
            });
        }
    }
    renderFooter() {
        return (
            <FormGroup>
                <Col sm={12} className="text-right">
                    <Button
                        bsStyle="success"
                        onClick={this.handleOnToggleModal}
                        disabled={this.props.isSaving}>
                        <ButtonLoadingText isLoading={this.props.isSaving} label="Save" />
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
                        this.state.onSaveAgentErrorMessage ?
                            this.state.onSaveAgentErrorMessage
                            : null
                    }
                </Col>
            </FormGroup>
        )
    }
    render() {
        return(
            <div className="container-fluid">
                <Form horizontal>
                    <fieldset disabled={this.props.isSaving}>
                        <FormFieldInput
                            controlId="form-first-name"
                            type="text"
                            name="firstName"
                            label="first name"
                            error={this.state.errors.firstName}
                            value={this.state.agent.firstName}
                            isRequired
                            onFocus={this.handleFocus}
                            onChange={this.handleChange} />
                        <FormFieldInput
                            controlId="form-middle-name"
                            type="text"
                            name="middleName"
                            label="middle name"
                            value={this.state.agent.middleName}
                            onFocus={this.handleFocus}
                            onChange={this.handleChange} />
                        <FormFieldInput
                            controlId="form-last-name"
                            type="text"
                            name="lastName"
                            label="last name"
                            error={this.state.errors.lastName}
                            value={this.state.agent.lastName}
                            isRequired
                            onFocus={this.handleFocus}
                            onChange={this.handleChange} />
                        <FormFieldRadioGroup
                            controlId="form-gender"
                            name="gender"
                            label="gender"
                            value={this.state.agent.gender}
                            options={[
                                ['M', 'male'],
                                ['F', 'female']
                            ]}
                            onChange={this.handleChange} />
                        <FormFieldInput
                            controlId="form-email"
                            type="email"
                            name="email"
                            label="email"
                            value={this.state.agent.email}
                            onFocus={this.handleFocus}
                            onChange={this.handleChange} />
                        <FormFieldDate
                            controlId="form-birth-date"
                            name="birthDate"
                            label="birth date"
                            value={this.state.agent.birthDate}
                            onChangeDate={this.handleChangeBirthDate} />
                        {this.renderFooter()}
                    </fieldset>
                </Form>
            </div>
        )
    }
}