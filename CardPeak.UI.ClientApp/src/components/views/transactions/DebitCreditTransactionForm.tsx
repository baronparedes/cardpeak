import * as React from 'react'
import { Form, FormGroup, Col, Button } from 'react-bootstrap'
import FormField from '../../layout/FormField'
import ModalConfirm from '../../layout/ModalConfirm'
import ButtonLoadingText from '../../layout/ButtonLoadingText'

interface DebitCreditTransactionFormState {
    loading: boolean;
    showConfirmModal: boolean;
    remarks: string;
    amount: number;
    errors: {
        [error: string]: string,
    };
}

interface DebitCreditTransactionFormProps {
    agent: CardPeak.Entities.Agent,
    transaction: string,
    onSubmitTransaction: (transaction: CardPeak.Entities.DebitCreditTransaction) => void
}

export default class DebitCreditTransactionForm extends React.Component<DebitCreditTransactionFormProps, DebitCreditTransactionFormState> {
    constructor(props: DebitCreditTransactionFormProps) {
        super(props);
        this.state = {
            amount: 0,
            remarks: '',
            errors: {
                remarks: '',
                amount: ''
            },
            loading: false,
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
        this.props.onSubmitTransaction({
            amount: this.state.amount,
            remarks: this.state.remarks,
            agentId: this.props.agent.agentId
        });
    }
    handleOnToggleModal = () => {
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
                    <fieldset disabled={this.state.loading}>
                        <FormField
                            controlId="form-amount"
                            type="number"
                            name="amount"
                            label="amount"
                            error={this.state.errors.amount}
                            value={this.state.amount}
                            onFocus={this.handleFocus}
                            onChange={this.handleChange} />
                        <FormField
                            controlId="form-remarks"
                            type="textarea"
                            name="remarks"
                            label="remarks"
                            error={this.state.errors.remarks}
                            value={this.state.remarks}
                            onChange={this.handleChange} />
                        <FormGroup>
                            <Col sm={12} className="text-right">
                                <Button
                                    bsStyle={buttonClass}
                                    onClick={this.handleOnToggleModal}
                                    disabled={this.state.loading}>
                                    <ButtonLoadingText isLoading={this.state.loading} label={this.props.transaction} />
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
                        </FormGroup>
                    </fieldset>
                </Form>
            </div>
        )
    }
}