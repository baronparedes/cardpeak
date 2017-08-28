import * as React from 'react'
import * as AgentsActions from '../../../services/actions/agentActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { Form, FormGroup, Col, Button } from 'react-bootstrap'
import { FormFieldInput, ModalConfirm, ButtonLoadingText }from '../../layout'

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
    transaction: string;
    onTransactionSubmitted?: () => void;
}

interface DebitCreditTransactionFormPropsConnect {
    postingTransaction?: boolean;
}

interface DebitCreditTransactionFormDispatchProps {
    actions?: typeof AgentsActions
}

class DebitCreditTransactionForm extends React.Component<
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
        if (this.state.amount === 0) errors.amount = "*";
        if (this.state.remarks === '') errors.remarks = "*";
        this.setState({ errors });
        return errors;
    }
    handleOnConfirm = () => {
        this.handleErrors();
        if (!!this.state.errors.remarks && !!this.state.errors.amount) {
            return;
        }
        this.handleOnToggleModal();

        this.props.actions.postAgentTransactionStart({
            agentId: this.props.agent.agentId,
            amount: this.state.amount,
            remarks: this.state.remarks
        },
        (this.props.transaction.toLowerCase() == 'debit'),
        this.handleOnTransactionSubmitted, this.handleOnTransactionSubmittedError);
    }
    handleOnTransactionSubmitted = () => {
        this.setState({ postingTransactionError: undefined });
        this.props.onTransactionSubmitted();
    }
    handleOnTransactionSubmittedError = (message: string) => {
        this.setState({ postingTransactionError: message });
    }
    handleOnToggleModal = () => {
        this.setState({ postingTransactionError: undefined });
        this.handleErrors();
        if (!!this.state.errors.remarks && !!this.state.errors.amount) {
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
            [e.target.name]: e.target.value,
            errors
        });
    }
    render() {
        let isDebit: boolean = (this.props.transaction.toLowerCase() == 'debit');
        let transaction = (isDebit) ? "Debit" : "Credit";
        let buttonClass = (isDebit) ? "danger" : "success";
        return (
            <div className="container-fluid">
                <Form horizontal>
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
                                <Button
                                    bsStyle={buttonClass}
                                    onClick={this.handleOnToggleModal}
                                    disabled={this.props.postingTransaction}>
                                    <ButtonLoadingText isLoading={this.props.postingTransaction} label={this.props.transaction} />
                                </Button>
                                <ModalConfirm
                                    title="confirm transaction"
                                    showModal={this.state.showConfirmModal}
                                    onConfirm={this.handleOnConfirm}
                                    onToggleModal={this.handleOnToggleModal}>
                                    <p>
                                        You are about to <strong>{this.props.transaction} </strong>
                                        <br />
                                        <span className="text-muted spacer-right">amount:</span><strong className={(isDebit) ? "text-highlight perf-down" : "text-highlight perf-up"}>{this.state.amount}</strong>
                                        <br/>
                                        <span className="text-muted spacer-right">account:</span><strong className="text-highlight">{this.props.agent.firstName + " " + this.props.agent.lastName}</strong>
                                    </p>
                                    <p className="text-right">Do you wish to continue?</p>
                                </ModalConfirm>
                            </Col>
                            <Col sm={12} xs={12} md={12} lg={12} className="text-danger">
                                {
                                    this.state.postingTransactionError ?
                                        this.state.postingTransactionError
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
    postingTransaction: state.agentDashboardModel.postingTransaction
});

const mapDispatchToProps = (dispatch: any): DebitCreditTransactionFormDispatchProps => {
    return {
        actions: bindActionCreators(AgentsActions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DebitCreditTransactionForm);