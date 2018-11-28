import * as React from 'react'
import * as SettingsActions from '../../../services/actions/settingsAction'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { Grid, Row, Col, Form, FormGroup, Button, ButtonGroup, Panel } from 'react-bootstrap'
import { FormFieldInput, FormFieldDropdown, ConfirmButton, ErrorLabel } from '../../layout'

import RatesContainer from './RatesContainer'
import ReferencePickerContainer from './ReferencePickerContainer'

class DefaultRatesView extends React.Component<{}, { selectedTypeId?: number }> {
	constructor(props: any) {
		super(props);
		this.state = {
			selectedTypeId: 0
		}
	}
	handleOnSelectReference = (item: CardPeak.Entities.Reference, name: string) => {
		this.setState({
			[name]: item ? item.referenceId : 0
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
								<fieldset>
									<ReferencePickerContainer
										referenceName="defaultRateTypes"
										label="type"
										controlId="form-selectedTypeId"
										selectedId={this.state.selectedTypeId}
										name="selectedTypeId"
										onSelect={this.handleOnSelectReference} />
								</fieldset>
							</Form>
						</Col>
					</Row>
				</Grid>
				<Panel >
					{
						this.state.selectedTypeId === 0 ? null : 
							<RatesContainer selectedAgentId={0} selectedTypeId={this.state.selectedTypeId} defaultRate />
					}
				</Panel>
			</div>
		);
	}
}

export default DefaultRatesView;
