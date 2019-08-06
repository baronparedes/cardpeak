import * as React from 'react'
import * as AgentsActions from '../../../services/actions/agentActions'
import * as dateHelpers from '../../../helpers/dateHelpers'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { Form, FormGroup, Col, Button } from 'react-bootstrap'
import { FormFieldInput, ModalConfirm, ButtonLoadingText, Currency, ConfirmButton, ErrorLabel, FormFieldDate } from '../../layout'

interface DebitCreditTransactionFormState {
    showConfirmModal: boolean;
    remarks: string;
    amount: number;
    transactionDate?: Date
    errors: {
        [error: string]: string,
    };
    postingTransactionError?: string;
}

interface DebitCreditTransactionFormProps {
    agent: CardPeak.Entities.Agent;
    transaction: Transaction;
    onTransactionSubmitted?: () => void;
    showTransactionDate?: boolean;
}

interface DebitCreditTransactionFormPropsConnect {
    postingTransaction?: boolean;
}

interface DebitCreditTransactionFormDispatchProps {
    actions?: typeof AgentsActions
}

class DebitCreditTransactionFormContainer extends React.Component<
    DebitCreditTransactionFormProps & DebitCreditTransactionFormPropsConnect & DebitCreditTransactionFormDispatchProps,
    DebitCreditTransactionFormState> {
    constructor(props: DebitCreditTransactionFormProps & DebitCreditTransactionFormPropsConnect & DebitCreditTransactionFormDispatchProps) {
        super(props);
        this.state = {
            amount: 0,
            remarks: '',
            transactionDate: new Date(dateHelpers.currentDay()),
            errors: {
                remarks: '',
                amount: ''
            },
            showConfirmModal: false
        }
    }
    handleErrors = () => {
        let errors = this.state.errors;
        if (!this.state.amount || this.state.amount <= 0) errors.amount = "*";
        if (this.state.remarks === '') errors.remarks = "*";
        this.setState({ errors });
        return errors;
    }
    handleOnConfirm = () => {
        if (this.hasErrors()) {
            return;
        }
        this.props.actions.postAgentTransactionStart({
            agentId: this.props.agent.agentId,
            amount: this.state.amount,
            remarks: this.state.remarks,
            transactionDateTime: this.state.transactionDate
        },
        this.props.transaction,
        this.handleOnTransactionSubmitted, this.handleOnTransactionSubmittedError);
    }
    handleOnTransactionSubmitted = () => {
        this.setState({ postingTransactionError: undefined });
        this.props.onTransactionSubmitted();
    }
    handleOnTransactionSubmittedError = (message: string) => {
        this.setState({ postingTransactionError: message });
    }
    hasErrors: () => boolean = () => {
        this.handleErrors();
        let result: boolean = false;
        if (!!this.state.errors.amount || !!this.state.errors.remarks) {
            result = true;
            this.setState({ postingTransactionError: undefined });
        }
        return result;
    }
    handleOnPreventToggle = () => {
        return this.hasErrors();
    }
    handleFocus = (e: any) => {
        e.target.select();
    }
    handleChange = (e: any) => {
        let errors = this.state.errors;
        errors[e.target.name] = '';
        this.setState({
            [e.target.name]: e.target.value,
            errors
        });
    }
    handleOnTransactionDateChange = (value: string, formattedValue: string) => {
        this.setState({ transactionDate: new Date(value) });
    }
    render() {
        let buttonClass: string;
        let amountClass: string;
        let transaction: string;
        switch (this.props.transaction.toLowerCase()) {
            case "savings-credit":
                buttonClass = "success";
                amountClass = "amount-credit";
                transaction = "Credit Savings";
                break;
            case "savings-debit":
                buttonClass = "danger";
                amountClass = "amount-debit";
                transaction = "Debit Savings";
                break;
            case "credit":
                buttonClass = "success";
                amountClass = "amount-credit";
                transaction = "Credit";
                break;
            case "debit":
                buttonClass = "danger";
                amountClass = "amount-debit";
                transaction = "Debit";
                break;
            case "incentive":
                buttonClass = "info";
                amountClass = "amount-incentive";
                transaction = "Incentive";
                break;
        }
        return (
            <div className="container-fluid">
                <Form horizontal onSubmit={(e) => { e.preventDefault() }}>
                    <fieldset disabled={this.props.postingTransaction}>
                        <FormFieldInput
                            controlId="form-amount"
                            type="number"
                            name="amount"
                            label="amount"
                            error={this.state.errors.amount}
                            value={this.state.amount}
                            isRequired
                            onFocus={this.handleFocus}
                            onChange={this.handleChange} />
                        <FormFieldInput
                            controlId="form-remarks"
                            type="textarea"
                            name="remarks"
                            label="remarks"
                            isRequired
                            error={this.state.errors.remarks}
                            value={this.state.remarks}
                            onChange={this.handleChange} />
                        {
                            this.props.showTransactionDate &&
                            <FormFieldDate
                                maxDate={dateHelpers.currentDay()}
                                controlId="form-transaction-date"
                                name="transactionDate"
                                label="transaction date"
                                value={this.state.transactionDate}
                                error={this.state.errors.transactionDate}
                                onChangeDate={this.handleOnTransactionDateChange} />
                        }
                        <FormGroup>
                            <Col sm={12} className="text-right">
                                <ConfirmButton
                                    useButtonLoading
                                    bsStyle={buttonClass}
                                    onPreventToggle={this.handleOnPreventToggle}
                                    onConfirm={this.handleOnConfirm}
                                    confirmTitle="confirm transaction"
                                    isLoading={this.props.postingTransaction}
                                    disabled={this.props.postingTransaction}
                                    buttonLabel={transaction}>

                                    <p>
                                        You are about to <strong>{transaction} </strong>
                                        <br />
                                        <span className="text-muted spacer-right">amount:</span>
                                        <Currency noCurrencyColor className={amountClass} currency={this.state.amount} />
                                        <br />
                                        <span className="text-muted spacer-right">account:</span>
                                        <strong className="text-highlight">{this.props.agent.firstName + " " + this.props.agent.lastName}</strong>
                                    </p>
                                    <p className="text-right">Do you wish to continue?</p>
                                </ConfirmButton>
                            </Col>
                            <Col sm={12} xs={12} md={12} lg={12}>
                                <ErrorLabel error={this.state.postingTransactionError} />
                            </Col>
                        </FormGroup>
                    </fieldset>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): DebitCreditTransactionFormPropsConnect => ({
    postingTransaction: state.agentModel.postingTransaction
});

const mapDispatchToProps = (dispatch: any): DebitCreditTransactionFormDispatchProps => {
    return {
        actions: bindActionCreators(AgentsActions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DebitCreditTransactionFormContainer);