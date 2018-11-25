import * as React from 'react'
import * as SettingsActions from '../../../services/actions/settingsAction'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { Grid, Row, Col, Form, FormGroup, Button, ButtonGroup, Panel } from 'react-bootstrap'
import { FormFieldInput, FormFieldDropdown, ConfirmButton, ErrorLabel } from '../../layout'

import RatesContainer from './RatesContainer'

interface DefaultRatesContainerPropsConnect {
	defaultRateTypes?: CardPeak.Entities.Reference[];
	loading?: boolean;
}

interface DefaultRatesContainerDispatchProps {
	actions?: typeof SettingsActions;
}

class DefaultRatesContainer extends React.Component<DefaultRatesContainerPropsConnect & DefaultRatesContainerDispatchProps, { selectedTypeId?: number }> {
	constructor(props: DefaultRatesContainerPropsConnect & DefaultRatesContainerDispatchProps) {
		super(props);
		this.state = {
			selectedTypeId: 0
		}
	}
	componentDidMount() {
		this.props.actions.loadReferencesStart();
	}
	handleOnChange = (e: any) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	render() {
		return (
			<div>
				<h2>Default Rates</h2>
				<Grid fluid>
					<Row>
						<Col md={6}>
							<Form horizontal onSubmit={(e) => { e.preventDefault(); }}>
								<fieldset disabled={this.props.loading}>
									<FormFieldDropdown
										controlId="form-selectedTypeId"
										label="type"
										name="selectedTypeId"
										value={this.state.selectedTypeId}
										isRequired
										onChange={this.handleOnChange} >
										<option key={0} value={0}>Select...</option>
										{
											this.props.defaultRateTypes.map((item) => {
												return (
													<option key={item.referenceId} value={item.referenceId}>
														{item.description}
													</option>
												)
											})
										}
									</FormFieldDropdown>
								</fieldset>
							</Form>
						</Col>
					</Row>
				</Grid>
				<Panel >
					{
						this.state.selectedTypeId === 0 ? null : 
							<RatesContainer selectedAgentId={0} selectedTypeId = {this.state.selectedTypeId} defaultRate />
					}
				</Panel>
			</div>
		);
	}
}

const mapStateToProps = (state: RootState): DefaultRatesContainerPropsConnect => ({
	defaultRateTypes: state.settingsModel.defaultRateTypes,
	loading: state.settingsModel.loading
});

const mapDispatchToProps = (dispatch: any): DefaultRatesContainerDispatchProps => {
	return {
		actions: bindActionCreators(SettingsActions as any, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultRatesContainer);
