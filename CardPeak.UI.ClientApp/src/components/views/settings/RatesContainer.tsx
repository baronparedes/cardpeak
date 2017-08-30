import * as React from 'react'
import * as SettingActions from '../../../services/actions/settingActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { Grid, Row, Col, Form, FormGroup, Button } from 'react-bootstrap'
import { FormFieldInput, FormFieldDropdown, ButtonLoadingText, ModalConfirm } from '../../layout'
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
    },
    postingRatesError?: string,
    showConfirmModal?: boolean
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
    handleOnToggleModal = () => {
        this.setState({ showConfirmModal: !this.state.showConfirmModal, postingRatesError: undefined });
    }
    handleOnConfirm = () => {
        this.handleOnToggleModal();
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
            bank: this.props.banks.filter(_ => _.referenceId == this.state.bankId)[0],
            cardCategory: this.props.cardCategories.filter(_ => _.referenceId == this.state.cardCategoryId)[0]
        };
        this.props.actions.addRate(rate);
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
                                <FormGroup>
                                    <Col sm={12} className="text-right">
                                        <Button
                                            type="button"
                                            bsStyle="primary"
                                            onClick={this.handleOnClickAddRate}
                                            disabled={this.props.postingRates || this.props.loadingRates}>
                                            <i className="fa fa-lg fa-save"></i>
                                        </Button>
                                        <ModalConfirm
                                            title="save rates"
                                            showModal={this.state.showConfirmModal}
                                            onConfirm={this.handleOnConfirm}
                                            onToggleModal={this.handleOnToggleModal}>

                                            Do you want to continue?
                                        </ModalConfirm>
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
                            onDeleteRate={this.handleOnDeleteRate} />
                    </Col>
                </Row>
                <Row>
                    <Col className="text-right container-fluid">
                        <br/>
                        <Button bsStyle="success" onClick={this.handleOnClickSaveRates} disabled={this.props.postingRates || this.props.loadingRates}>
                            <ButtonLoadingText isLoading={this.props.postingRates || this.props.loadingRates} label="Save" />
                        </Button>
                    </Col>
                    <Col sm={12} xs={12} md={12} lg={12} className="text-danger">
                        {
                            this.state.postingRatesError ?
                                this.state.postingRatesError
                                : null
                        }
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