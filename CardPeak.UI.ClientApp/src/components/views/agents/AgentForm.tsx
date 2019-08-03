import * as React from 'react'

import { Form, FormGroup, Col, Button } from 'react-bootstrap'
import { FormFieldInput, FormFieldDate, FormFieldRadioGroup, ConfirmButton, ErrorLabel } from '../../layout'

import AgentAccountList from './AgentAccountList'
import AgentTeamList from './AgentTeamList'

interface AgentFormProps {
    agent: CardPeak.Entities.Agent;
    onSave: (agent: CardPeak.Entities.Agent, errorCallback?: (error: string) => void) => void;
    isSaving: boolean;
}

interface AgentFormState {
    agent?: CardPeak.Entities.Agent;
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
    hasErrors = () => {
        this.handleErrors();
        if (!!this.state.errors.firstName || !!this.state.errors.lastName) {
            return true;
        }
        return false;
    }
    handleErrors = () => {
        let errors = this.state.errors;
        if (this.state.agent.firstName === "") errors.firstName = "*";
        if (this.state.agent.lastName === "") errors.lastName = "*";
        this.setState({ errors });
        return errors;
    }
    handleOnConfirm = () => {
        this.handleOnUpdateAgentSubmitted();
    }
    handleOnToggleModal = () => {
        this.setState({ onSaveAgentErrorMessage: undefined });
    }
    handleOnUpdateAgentSubmitted = () => {
        this.setState({ onSaveAgentErrorMessage: undefined });
        this.props.onSave(this.state.agent, (e: string) => {
            this.setState({ onSaveAgentErrorMessage: e })
        });
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
    handleOnAddAccount = (account: string) => {
        let accounts: CardPeak.Entities.Account[] = []
        this.state.agent.accounts.forEach(_ => {
            if (_.alias.toLowerCase() === account.toLowerCase()) {
                return;
            }
            accounts.push(_);
        });
        accounts.push({
            agentId: this.props.agent.agentId,
            alias: account
        });
        this.setState({
            agent: {
                ...this.state.agent,
                accounts
            }
        });
    }
    handleOnDeleteAccount = (account: string) => {
        let accounts: CardPeak.Entities.Account[] = []
        this.state.agent.accounts.forEach(_ => {
            if (_.alias.toLowerCase() === account.toLowerCase()) {
                return;
            }
            accounts.push(_);
        });
        this.setState({
            agent: {
                ...this.state.agent,
                accounts
            }
        });
    }
    handleOnAddTeam = (teamPlacement: CardPeak.Entities.TeamPlacement) => {
        if (this.state.agent) {
            if (!this.state.agent.teamPlacements) {
                this.setState({
                    agent: {
                        ...this.state.agent,
                        teamPlacements: [teamPlacement]
                    }
                });
            }
            else {
                const exists = this.state.agent.teamPlacements.find(t => t.teamId === teamPlacement.teamId);
                if (!exists) {
                    this.setState({
                        agent: {
                            ...this.state.agent,
                            teamPlacements: [...this.state.agent.teamPlacements, teamPlacement]
                        }
                    });
                }
            }
        }
    }
    handleOnDeleteTeam = (teamId: number) => {
        this.setState({
            agent: {
                ...this.state.agent,
                teamPlacements: this.state.agent.teamPlacements.filter(t => t.teamId !== teamId)
            }
        });
    }
    componentWillReceiveProps(nextProps: AgentFormProps) {
        if (this.state.agent.agentId != nextProps.agent.agentId || nextProps.agent.agentId === 0) {
            this.setState({
                agent: nextProps.agent
            });
        }
    }
    renderActions() {
        return (
            <FormGroup>
                <Col sm={12} className="text-right">
                    <ConfirmButton
                        useButtonLoading
                        bsStyle="success"
                        buttonLabel="Save"
                        confirmTitle="save agent details"
                        confirmMessage="Do you want to continue?"
                        onConfirm={this.handleOnConfirm}
                        onToggleConfirm={this.handleOnToggleModal}
                        onPreventToggle={this.hasErrors}
                        isLoading={this.props.isSaving}
                        disabled={this.props.isSaving} />
                </Col>
                <Col sm={12} xs={12} md={12} lg={12}>
                    <ErrorLabel error={this.state.onSaveAgentErrorMessage} />
                </Col>
            </FormGroup>
        )
    }
    renderTeamsAndAccounts() {
        return (
            <FormGroup>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <AgentTeamList
                        agent={this.state.agent}
                        isSaving={this.props.isSaving}
                        onAddTeamPlacement={this.handleOnAddTeam}
                        onRemoveTeamPlacement={this.handleOnDeleteTeam} />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <AgentAccountList
                        agent={this.state.agent}
                        isSaving={this.props.isSaving}
                        onAddAccount={this.handleOnAddAccount}
                        onRemoveAccount={this.handleOnDeleteAccount} />
                </Col>
            </FormGroup>
        )
    }
    render() {
        return(
            <div className="container-fluid">
                <Form horizontal onSubmit={(e) => { e.preventDefault(); }}>
                    <fieldset disabled={this.props.isSaving}>
                        <FormGroup>
                            <Col lg={6} md={6} sm={12} xs={12}>
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
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12}>
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
                            </Col>
                        </FormGroup>
                        <br/>
                        {this.renderTeamsAndAccounts()}
                        {this.renderActions()}
                    </fieldset>
                </Form>
            </div>
        )
    }
}