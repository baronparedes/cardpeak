﻿import * as React from 'react'
import { Panel, Row, Col, Button, FormGroup, InputGroup } from 'react-bootstrap'
import { GridList, ListNoRecordsRow, FormFieldInput } from '../../layout'

interface AgentAccountListProps {
    accounts: CardPeak.Entities.Account[],
    onRemoveAccount: (account: string) => void;
    onAddAccount: (account: string) => void;
    isSaving?: boolean;
}

interface AgentAccountListState {
    input: string;
    errors: {
        [error: string]: string,
    },
}

interface AgentAccountDetailRowLayoutProps {
    account?: CardPeak.Entities.Account;
    isHeader: boolean;
    onRemoveAccount?: (account: string) => void;
    isSaving?: boolean;
}

class AgentAccountDetailRowLayout extends React.Component<AgentAccountDetailRowLayoutProps, undefined> {
    handleOnRemoveAccount = () => {
        if (this.props.onRemoveAccount) {
            this.props.onRemoveAccount(this.props.account.alias);
        }
    }
    render() {
        return (
            <Row>
                <Col md={10} lg={10} sm={11} xs={10}>
                    {this.props.isHeader ? "accounts" : this.props.account.alias}
                </Col>
                <Col>
                    {
                        this.props.isHeader ? null :
                            <Button onClick={this.handleOnRemoveAccount} bsStyle="danger" bsSize="sm" disabled={this.props.isSaving}>
                                <i className="fa fa-lg fa-trash-o"></i>
                            </Button>
                    }
                </Col>
            </Row>
        );
    }
}

class AgentAccountList extends React.Component<AgentAccountListProps, AgentAccountListState> {
    constructor(props: AgentAccountListProps) {
        super(props);
        this.state = {
            input: "",
            errors: {
                input: "",
            }
        }
    }
    hasErrors = () => {
        this.handleErrors();
        if (!!this.state.errors.input) {
            return true;
        }
        return false;
    }
    handleErrors = () => {
        let errors = this.state.errors;
        if (this.state.input === "") errors.input = "*";
        this.setState({ errors });
        return errors;
    }
    handleOnClickAddRate = () => {
        if (this.hasErrors()) {
            return;
        }
        this.props.onAddAccount(this.state.input);
        this.setState({ input: "" });
    }
    handleOnChange = (e: any) => {
        let errors = this.state.errors;
        errors[e.target.name] = "";
        this.setState({
            [e.target.name]: e.target.value,
            errors
        });
    }
    handleFocus = (e: any) => {
        e.target.select();
    }
    handleOnKeyPress = (e: any) => {
        if (e.charCode === 13) {
            e.preventDefault();
            this.handleOnClickAddRate();
        }
    }
    render() {
        return (
            <div>
                <FormGroup className="container-fluid" validationState={!!this.state.errors.input && this.state.errors.input != "" ? "error" : null}>
                    <InputGroup>
                        <input
                            type="text"
                            name="input"
                            placeholder="alias"
                            className="form-control"
                            onFocus={this.handleFocus}
                            onChange={this.handleOnChange}
                            onKeyPress={this.handleOnKeyPress}
                            disabled={this.props.isSaving} />
                        <InputGroup.Button>
                            <Button
                                type="button"
                                bsStyle="primary"
                                onClick={this.handleOnClickAddRate}
                                disabled={this.props.isSaving}>
                                <i className="fa fa-lg fa-save"></i>
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
                <GridList header={<AgentAccountDetailRowLayout isHeader={true} />}>
                    {
                        this.props.accounts && this.props.accounts.length > 0 ?
                            this.props.accounts.map((account) => {
                                return (
                                    <Panel className="panel-row" key={account.alias}>
                                        <AgentAccountDetailRowLayout
                                            account={account}
                                            key={account.alias}
                                            isHeader={false}
                                            onRemoveAccount={this.props.onRemoveAccount} />
                                    </Panel>
                                )
                            }) : <ListNoRecordsRow />
                    }
                </GridList>
            </div>
        );
    }
}

export default AgentAccountList;