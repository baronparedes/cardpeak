import * as React from 'react'
import * as SettingActions from '../../../services/actions/settingActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { Grid, Row, Col, Form, FormGroup, Button } from 'react-bootstrap'
import { FormFieldInput, FormFieldDropdown, ButtonLoadingText } from '../../layout'
import RateList from './RateList'

interface RatesContainerProps {
    selectedAgentId: number;
}

interface RatesContainerDispatchProps {
    actions?: typeof SettingActions;
}

interface RatesContainerState {
    bankId: number,
    cardCategoryId: number,
    amount: number,
    errors: {
        [error: string]: string,
    };
}

class RatesContainer extends React.Component<CardPeak.Models.RatesModel & RatesContainerProps & RatesContainerDispatchProps, RatesContainerState> {
    constructor(props: CardPeak.Models.RatesModel & RatesContainerProps & RatesContainerDispatchProps) {
        super(props);
        this.state = {
            bankId: 0,
            cardCategoryId: 0,
            amount: 0,
            errors: {
                amount: '',
                bankId: '',
                cardCategoryId: ''
            }
        }
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
        if (!!this.state.errors.amount || !!this.state.errors.bankId || !!this.state.errors.cardCategoryId) {
            return;
        }
        let rate = {
            rateId: 0,
            agentId: this.props.selectedAgentId,
            bankId: this.state.bankId,
            cardCategoryId: this.state.cardCategoryId,
            amount: this.state.amount,
            bank: this.props.banks.filter(_ => _.referenceId == this.state.bankId)[0],
            cardCategory: this.props.cardCategories.filter(_ => _.referenceId == this.state.cardCategoryId)[0]
        };
        this.props.actions.addRate(rate);
    }
    handleOnChange = (e: any) => {
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
            <Grid fluid>
                <Row>
                    <Col lg={4} md={4} sm={12} xs={12}>
                        <Form horizontal>
                            <fieldset disabled={this.props.postingRates}>
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
                                <FormGroup>
                                    <Col sm={12} className="text-right">
                                        <Button
                                            bsStyle="primary"
                                            onClick={this.handleOnClickAddRate}
                                            disabled={this.props.postingRates}>
                                            <i className="fa fa-2x fa-plus"></i>
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </fieldset>
                        </Form>
                    </Col>
                    <Col lg={8} md={8} sm={12} xs={12}>
                        <RateList agentId={this.props.agentId} rates={this.props.rates} onDeleteRate={this.handleOnDeleteRate} />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

const mapStateToProps = (state: RootState): CardPeak.Models.RatesModel => ({
    postingRates: state.ratesModel.postingRates,
    loadingRates: state.ratesModel.loadingRates,
    rates: state.ratesModel.rates,
    agentId: state.ratesModel.agentId,
    banks: state.ratesModel.banks,
    cardCategories: state.ratesModel.cardCategories
});

const mapDispatchToProps = (dispatch: any): RatesContainerDispatchProps => {
    return {
        actions: bindActionCreators(SettingActions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RatesContainer);