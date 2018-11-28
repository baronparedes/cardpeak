import * as React from 'react'
import * as RateActions from '../../../services/actions/rateActions'
import * as SettingsActions from '../../../services/actions/settingsAction'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { Grid, Row, Col, Form, FormGroup, Button, ButtonGroup, Panel } from 'react-bootstrap'
import { FormFieldInput, FormFieldDropdown, ConfirmButton, ErrorLabel } from '../../layout'
import RateList from './RateList'
import ReferencePickerContainer from './ReferencePickerContainer'

interface Props {
	selectedAgentId: number;
	selectedTypeId?: number;
	defaultRate?: boolean;
	applyDefaults?: boolean;
}

interface DispatchProps {
	actions?: typeof RateActions;
}

interface State {
	selectedDefaultRate?: CardPeak.Entities.Reference;
	bank?: CardPeak.Entities.Reference,
	cardCategory?: CardPeak.Entities.Reference,
	amount: number,
	savingsAmount?: number,
	errors: {
		[error: string]: string,
	},
	postingRatesError?: string,
}

class RatesContainer extends React.Component<CardPeak.Models.RatesModel & Props & DispatchProps, State> {
	constructor(props: CardPeak.Models.RatesModel & Props & DispatchProps) {
		super(props);
		this.state = {
			bank: undefined,
			cardCategory: undefined,
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
		this.setState({
			postingRatesError: undefined,
			selectedDefaultRate: undefined
		});
	}
	handleErrors = () => {
		let errors = this.state.errors;
		if (!!!this.state.amount || this.state.amount === 0) errors.amount = "*";
		if (!!!this.state.bank || this.state.bank.referenceId === 0) errors.bankId = "*";
		if (!!!this.state.cardCategory || this.state.cardCategory.referenceId === 0) errors.cardCategoryId = "*";
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
			typeId: this.props.selectedTypeId,
			bankId: parseInt(this.state.bank.referenceId.toString()),
			cardCategoryId: parseInt(this.state.cardCategory.referenceId.toString()),
			amount: this.state.amount,
			savingsAmount: this.state.savingsAmount ? this.state.savingsAmount : 0,
			bank: this.state.bank,
			cardCategory: this.state.cardCategory
		};

		this.props.actions.addRate(rate);
	}
	handleOnClearRate = () => {
		this.setState({
			bank: undefined,
			cardCategory: undefined,
			amount: 0,
			savingsAmount: 0,
			errors: {
				amount: '',
				bankId: '',
				cardCategoryId: ''
			}
		});
	}
	handleOnSelectReference = (ref: CardPeak.Entities.Reference, name: any) => {
		this.setState({ postingRatesError: undefined });
		let errors = this.state.errors;
		errors[name] = '';
		this.setState({
			[name]: ref,
			errors
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
			bank: data.bank,
			cardCategory: data.cardCategory,
			amount: data.amount,
			savingsAmount: data.savingsAmount,
		});
	}
	handleOnClickSaveRates = () => {
		if (this.props.defaultRate) {
			this.props.actions.postDefaultRatesStart(this.props.typeId, this.props.rates, null, (e) => {
				this.setState({ postingRatesError: e });
			});
		}
		else {
			this.props.actions.postRatesStart(this.props.agentId, this.props.rates, null, (e) => {
				this.setState({ postingRatesError: e });
			});
		}
	}

	handleOnPreventToggleDefaultRate = (): boolean => {
		return this.state.selectedDefaultRate ? false : true;
	}

	handleOnConfirmDefaultRate = () => {
		this.props.actions.applyDefaultRateStart(this.state.selectedDefaultRate, this.props.selectedAgentId);
	}
	componentDidMount() {
		if (this.props.defaultRate) {
			this.props.actions.selectDefaultRateStart(this.props.selectedTypeId);
		}
		else {
			this.props.actions.selectAgentStart(this.props.selectedAgentId);
		}
	}
	componentWillReceiveProps(nextProps: Props) {
		if (nextProps.defaultRate) {
			if (this.props.selectedTypeId !== nextProps.selectedTypeId) {
				this.props.actions.selectDefaultRateStart(nextProps.selectedTypeId);
				this.handleOnClearRate();
			}
		}
		else {
			if (this.props.selectedAgentId !== nextProps.selectedAgentId) {
				this.props.actions.selectAgentStart(nextProps.selectedAgentId);
				this.handleOnClearRate();
			}
		}
	}
	render() {
		return (
			<Grid fluid>
				<Row>
					<Col lg={4} md={12} sm={12} xs={12}>
						<Form horizontal onSubmit={(e) => { e.preventDefault(); }}>
							<fieldset disabled={this.props.postingRates || this.props.loadingRates}>
								<ReferencePickerContainer
									controlId="form-bank"
									label="Bank"
									name="bank"
									error={this.state.errors.bankId}
									selectedId={this.state.bank ? this.state.bank.referenceId : 0}
									isRequired
									referenceName="banks"
									onSelect={this.handleOnSelectReference} />
								<ReferencePickerContainer
									controlId="form-card-category"
									label="Category"
									name="cardCategory"
									error={this.state.errors.cardCategoryId}
									selectedId={this.state.cardCategory ? this.state.cardCategory.referenceId : 0}
									isRequired
									referenceName="cardCategories"
									onSelect={this.handleOnSelectReference} />
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
											{
												this.props.applyDefaults && this.props.selectedAgentId !== 0 ?
													<ConfirmButton
														bsStyle="primary"
														buttonLabel={
															<i className="fa fa-lg fa-sliders"></i>
														}
														confirmTitle="select default rate"
														confirmMessage={
															<div>
																<p>
																	<strong>
																		Choosing a default rate will overwrite your existing changes
															</strong>
																</p>
																<div className="spacer-bottom block">
																	<ReferencePickerContainer
																		controlId="form-default-rate-picker"
																		label="type"
																		name="selectedDefaultRate"
																		selectedId={this.state.selectedDefaultRate ? this.state.selectedDefaultRate.referenceId : 0}
																		referenceName="defaultRateTypes"
																		onSelect={this.handleOnSelectReference} />
																</div>
																<br />
																<br />
																<p className="spacer-top">Do you wish to continue?</p>
															</div>
														}
														onToggleConfirm={this.handleOnToggleModal}
														onPreventConfirm={this.handleOnPreventToggleDefaultRate}
														onConfirm={this.handleOnConfirmDefaultRate}
														disabled={this.props.postingRates || this.props.loadingRates} /> : null
											}
											<Button
												title="clear"
												type="button"
												bsStyle="warning"
												onClick={this.handleOnClearRate}>
												<i className="fa fa-lg fa-eraser"></i>
											</Button>
											<Button
												title="update"
												type="button"
												bsStyle="success"
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
							data={this.props.rates}
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
							buttonLabel="Save Changes"
							confirmTitle="save rates"
							confirmMessage="Do you want to continue?"
							onToggleConfirm={this.handleOnToggleModal}
							onConfirm={this.handleOnClickSaveRates}
							disabled={this.props.postingRates || this.props.loadingRates}
							isLoading={this.props.postingRates || this.props.loadingRates} />
					</Col>
					<Col sm={12} xs={12} md={12} lg={12}>
						<ErrorLabel error={this.state.postingRatesError} />
					</Col>
				</Row>
			</Grid>
		)
	}
}

const mapStateToProps = (state: RootState): CardPeak.Models.RatesModel => ({
	...state.ratesModel
});

const mapDispatchToProps = (dispatch: any): DispatchProps => {
	return {
		actions: bindActionCreators(RateActions as any, dispatch),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(RatesContainer);