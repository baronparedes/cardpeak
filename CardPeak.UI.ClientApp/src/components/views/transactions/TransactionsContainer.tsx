﻿import * as React from 'react'
import * as Actions from '../../../services/actions/transactionActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { Panel, Button, FormGroup } from 'react-bootstrap'
import { SearchBar, SpinnerBlock } from '../../layout'

import ApprovalTransactionList from '../transactions/ApprovalTransactionList'

interface TransactionContainerDispatchProps {
    actions?: typeof Actions
}

interface TransactionContainerState {
    transactions?: CardPeak.Entities.ApprovalTransaction[];
    isLoading?: boolean;
    loadingError?: string;
    clientName: string;
    errors: {
        [error: string]: string,
    };
}

class TransactionsContainer extends React.Component<TransactionContainerDispatchProps, TransactionContainerState> {
    constructor(props: TransactionContainerDispatchProps) {
        super(props);
        this.state = {
            transactions: [],
            clientName: '',
            errors: {
                clientName: ''
            }
        }
    }
    hasErrors: () => boolean = () => {
        this.handleErrors();
        let result: boolean = false;
        if (!!this.state.errors.clientName) {
            result = true;
        }
        return result;
    }
    handleErrors = () => {
        let errors = this.state.errors;
        if (this.state.clientName === "") errors.clientName = "*";
        this.setState({ errors });
        return errors;
    }
    handleOnGetTransactions = () => {
        if (this.hasErrors()) {
            return;
        }
        this.setState({ isLoading: true, loadingError: undefined });
        this.props.actions.getTransactionsStart(this.state.clientName,
            this.handleOnGetTransactionsComplete,
            this.handleOnGetTransactionsError)
    }
    handleOnGetTransactionsComplete = (data: CardPeak.Entities.ApprovalTransaction[]) => {
        this.setState({
            isLoading: undefined,
            loadingError: undefined,
            transactions: data
        });
    }
    handleOnGetTransactionsError = (e: string) => {
        this.setState({
            isLoading: undefined,
            loadingError: e
        });
    }
    handleOnSearchBarChange = (e: any) => {
        let errors = this.state.errors;
        errors[e.target.name] = '';
        this.setState({
            [e.target.name]: e.target.value,
            errors
        });
    }
    handleOnSearchBarKeyPress = (e: any) => {
        if (e.charCode === 13) {
            e.preventDefault();
            this.handleOnGetTransactions();
        }
    }
    render() {
        return (
            <div className="container-fluid">
                <Panel>
                    <FormGroup validationState={!!this.state.errors.clientName && this.state.errors.clientName != "" ? "error" : null}>
                        <SearchBar
                            name="clientName"
                            placeholder="client name"
                            showButton={true}
                            disabled={this.state.isLoading}
                            onSearchBarKeyPress={this.handleOnSearchBarKeyPress}
                            onSearchBarClick={this.handleOnGetTransactions}
                            onSearchBarChange={this.handleOnSearchBarChange} />
                    </FormGroup>
                    <span className="text-danger">
                        { this.state.loadingError ? this.state.loadingError : null }
                    </span>
                </Panel>
                {
                    this.state.isLoading ? <SpinnerBlock /> :
                        <ApprovalTransactionList transactions={this.state.transactions} showAgent={true} />
                }
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): {} => ({
});

const mapDispatchToProps = (dispatch: any): TransactionContainerDispatchProps => {
    return {
        actions: bindActionCreators(Actions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsContainer);