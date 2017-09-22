import * as React from 'react'
import * as RateActions from '../../../services/actions/rateActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { Grid, Row, Col, Form, FormGroup, Button, ButtonGroup, Panel } from 'react-bootstrap'
import { FormFieldInput, FormFieldDropdown, ConfirmButton } from '../../layout'
import RateList from './RateList'

interface RatesContainerProps {
    selectedAgentId: number;
}

interface RatesContainerDispatchProps {
    actions?: typeof RateActions;
}

interface RatesContainerState {
    bankId: number,
    cardCategoryId: number,
    amount: number,
    savingsAmount?: number,
    errors: {
        [error: string]: string,
    },
    postingRatesError?: string,
}

class RatesContainer extends React.Component<CardPeak.Models.RatesModel & RatesContainerProps & RatesContainerDispatchProps, RatesContainerState> {
    constructor(props: CardPeak.Models.RatesModel & RatesContainerProps & RatesContainerDispatchProps) {
        super(props);
        this.state = {
            bankId: 0,
            cardCategoryId: 0,
            amount: 0,
            savingsAmount: 0,
            errors: {
                amount: '',
                bankId: '',
                cardCategoryId: ''
            }
        }
    }
    handleOnToggleModal = () => {
        this.setState({ postingRatesError: undefined });
    }
    handleOnConfirm = () => {
        this.handleOnClickSaveRates();
    }
    handleErrors = () => {
        let errors = this.state.errors;
        if (!!!this.state.amount || this.state.amount === 0) errors.amount = "*";
        if (!!!this.state.bankId || this.state.bankId === 0) errors.bankId = "*";
        if (!!!this.state.cardCategoryId || this.state.cardCategoryId === 0) errors.cardCategoryId = "*";
        this.setState({ errors });
        return errors;
    }
    handleOnClickAddRate = (e: any) => {
        this.handleErrors();
        this.setState({ postingRatesError: undefined });
        if (!!this.state.errors.amount || !!this.state.errors.bankId || !!this.state.errors.cardCategoryId) {
            return;
        }
        let rate = {
            rateId: 0,
            agentId: this.props.selectedAgentId,
            bankId: parseInt(this.state.bankId.toString()),
            cardCategoryId: parseInt(this.state.cardCategoryId.toString()),
            amount: this.state.amount,
            savingsAmount: this.state.savingsAmount ? this.state.savingsAmount : 0,
            bank: this.props.banks.filter(_ => _.referenceId == this.state.bankId)[0],
            cardCategory: this.props.cardCategories.filter(_ => _.referenceId == this.state.cardCategoryId)[0]
        };
        this.props.actions.addRate(rate);
    }
    handleOnClearRate = () => {
        this.setState({
            bankId: 0,
            cardCategoryId: 0,
            amount: 0,
            savingsAmount: 0,
            errors: {
                amount: '',
                bankId: '',
                cardCategoryId: ''
            }
        });
    }
    handleOnChange = (e: any) => {
        this.setState({ postingRatesError: undefined });
        let errors = this.state.errors;
        errors[e.target.name] = '';
        this.setState({
            [e.target.name]: e.target.value,
            errors
        });
    }
    handleFocus = (e: any) => {
        e.target.select();
    }
    handleOnDeleteRate = (data: CardPeak.Entities.Rate) => {
        this.props.actions.deleteRate(data);
    }
    handleOnSelectRate = (data: CardPeak.Entities.Rate) => {
        this.setState({
            ...this.state,
            bankId: data.bankId,
            cardCategoryId: data.cardCategoryId,
            amount: data.amount,
            savingsAmount: data.savingsAmount,
        });
    }
    handleOnClickSaveRates = () => {
        this.props.actions.postRatesStart(this.props.agentId, this.props.rates, null, (e) => {
            this.setState({ postingRatesError: e });
        });
    }
    componentDidMount() {
        this.props.actions.selectAgentStart(this.props.selectedAgentId);
    }
    componentWillReceiveProps(nextProps: RatesContainerProps) {
        if (this.props.selectedAgentId != nextProps.selectedAgentId) {
            this.props.actions.selectAgentStart(nextProps.selectedAgentId);
        }
    }
    render() {
        return (
            <Panel>
                <Grid fluid>
                    <Row>
                        <Col lg={4} md={12} sm={12} xs={12}>
                            <Form horizontal onSubmit={(e) => { e.preventDefault(); }}>
                                <fieldset disabled={this.props.postingRates || this.props.loadingRates}>
                                    <FormFieldDropdown
                                        controlId="form-bank"
                                        label="Bank"
                                        name="bankId"
                                        error={this.state.errors.bankId}
                                        value={this.state.bankId}
                                        isRequired
                                        onChange={this.handleOnChange} >
                                        <option key={0} value={0}>Select...</option>
                                        {
                                            this.props.banks.map((bank) => {
                                                return (
                                                    <option key={bank.referenceId} value={bank.referenceId}>
                                                        {bank.description}
                                                    </option>
                                                )
                                            })
                                        }
                                    </FormFieldDropdown>
                                    <FormFieldDropdown
                                        controlId="form-card-category"
                                        label="Category"
                                        name="cardCategoryId"
                                        error={this.state.errors.cardCategoryId}
                                        value={this.state.cardCategoryId}
                                        isRequired
                                        onChange={this.handleOnChange} >
                                        <option key={0} value={0}>Select...</option>
                                        {
                                            this.props.cardCategories.map((category) => {
                                                return (
                                                    <option key={category.referenceId} value={category.referenceId}>
                                                        {category.description}
                                                    </option>
                                                )
                                            })
                                        }
                                    </FormFieldDropdown>
                                    <FormFieldInput
                                        controlId="form-rate-amount"
                                        type="number"
                                        label="Amount"
                                        name="amount"
                                        error={this.state.errors.amount}
                                        value={this.state.amount}
                                        isRequired
                                        onFocus={this.handleFocus}
                                        onChange={this.handleOnChange} />
                                    <FormFieldInput
                                        controlId="form-rate-savings-amount"
                                        type="number"
                                        label="Savings"
                                        name="savingsAmount"
                                        value={this.state.savingsAmount}
                                        onFocus={this.handleFocus}
                                        onChange={this.handleOnChange} />
                                    <FormGroup>
                                        <Col sm={12} className="text-right">
                                            <ButtonGroup disabled={this.props.postingRates || this.props.loadingRates}>
                                                <Button
                                                    type="button"
                                                    bsStyle="warning"
                                                    onClick={this.handleOnClearRate}>
                                                    <i className="fa fa-lg fa-eraser"></i>
                                                </Button>
                                                <Button
                                                    type="button"
                                                    bsStyle="primary"
                                                    onClick={this.handleOnClickAddRate}>
                                                    <i className="fa fa-lg fa-pencil-square-o"></i>
                                                </Button>
                                            </ButtonGroup>
                                        </Col>
                                    </FormGroup>
                                </fieldset>
                            </Form>
                        </Col>
                        <Col lg={8} md={12} sm={12} xs={12}>
                            <RateList
                                agentId={this.props.agentId}
                                rates={this.props.rates}
                                isLoading={this.props.loadingRates}
                                onSelectRate={this.handleOnSelectRate}
                                onDeleteRate={this.handleOnDeleteRate} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-right container-fluid">
                            <br />
                            <ConfirmButton
                                useButtonLoading
                                bsStyle="success"
                                buttonLabel="Save"
                                confirmTitle="save rates"
                                confirmMessage="Do you want to continue?"
                                onToggleConfirm={this.handleOnToggleModal}
                                onConfirm={this.handleOnConfirm}
                                disabled={this.props.postingRates || this.props.loadingRates}
                                isLoading={this.props.postingRates || this.props.loadingRates} />
                        </Col>
                        <Col sm={12} xs={12} md={12} lg={12}>
                            {
                                this.state.postingRatesError ?
                                    <label className="text-danger">{this.state.postingRatesError}</label>
                                    : null
                            }
                        </Col>
                    </Row>
                </Grid>
            </Panel>
        )
    }
}

const mapStateToProps = (state: RootState): CardPeak.Models.RatesModel => ({
    ...state.ratesModel
});

const mapDispatchToProps = (dispatch: any): RatesContainerDispatchProps => {
    return {
        actions: bindActionCreators(RateActions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RatesContainer);