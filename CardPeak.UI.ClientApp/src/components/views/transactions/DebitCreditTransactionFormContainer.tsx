import * as React from 'react'
import * as AgentsActions from '../../../services/actions/agentActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { Form, FormGroup, Col, Button } from 'react-bootstrap'
import { FormFieldInput, ModalConfirm, ButtonLoadingText, Currency, ConfirmButton }from '../../layout'

interface DebitCreditTransactionFormState {
    showConfirmModal: boolean;
    remarks: string;
    amount: number;
    errors: {
        [error: string]: string,
    };
    postingTransactionError?: string;
}

interface DebitCreditTransactionFormProps {
    agent: CardPeak.Entities.Agent;
    transaction: Transaction;
    onTransactionSubmitted?: () => void;
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
            remarks: this.state.remarks
            },
            (this.props.transaction.toLowerCase() === "debit"),
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
    render() {
        let isDebit: boolean = (this.props.transaction.toLowerCase() === "debit");
        let transaction = (isDebit) ? "Debit" : "Credit";
        let buttonClass = (isDebit) ? "danger" : "success";
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
                                    buttonLabel={this.props.transaction}>

                                    <p>
                                        You are about to <strong>{this.props.transaction} </strong>
                                        <br />
                                        <span className="text-muted spacer-right">amount:</span>
                                        <Currency noCurrencyColor className={(isDebit) ? "amount-debit" : "amount-credit"} currency={this.state.amount} />
                                        <br />
                                        <span className="text-muted spacer-right">account:</span>
                                        <strong className="text-highlight">{this.props.agent.firstName + " " + this.props.agent.lastName}</strong>
                                    </p>
                                    <p className="text-right">Do you wish to continue?</p>
                                </ConfirmButton>
                            </Col>
                            <Col sm={12} xs={12} md={12} lg={12}>
                                {
                                    this.state.postingTransactionError ?
                                        <label className="text-danger">{this.state.postingTransactionError}</label>
                                        : null
                                }
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