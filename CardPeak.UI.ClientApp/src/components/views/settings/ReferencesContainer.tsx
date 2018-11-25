import * as React from 'react'
import * as SettingsActions from '../../../services/actions/settingsAction'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { Grid, Row, Col, Panel } from 'react-bootstrap'

import ReferenceList from './ReferenceList'

interface ReferencesContainerProps {
}

interface ReferencesContainerDispatchProps {
	actions?: typeof SettingsActions;
}

interface ReferencesContainerState {
}


class ReferencesContainer extends React.Component<CardPeak.Models.SettingsModel & ReferencesContainerProps & ReferencesContainerDispatchProps, ReferencesContainerState>{
	constructor(props: CardPeak.Models.SettingsModel & ReferencesContainerProps & ReferencesContainerDispatchProps) {
		super(props);
	}
	handleOnSave = (data: CardPeak.Entities.Reference) => {
		// TODO: Save
	}
	componentDidMount() {
		this.props.actions.loadReferencesStart();
	}
	render() {
		return (
			<Grid fluid>
				<Row>
					<Col lg={6} md={6} sm={12} xs={12}>
						<ReferenceList
							title="banks"
							onSaveReference={this.handleOnSave}
							data={this.props.banks}
							referenceTypeId={this.props.bankReferenceTypeId}
							isLoading={this.props.loadingBanks} />
					</Col>
					<Col lg={6} md={6} sm={12} xs={12}>
						<ReferenceList
							title="card categories"
							onSaveReference={this.handleOnSave}
							data={this.props.cardCategories}
							referenceTypeId={this.props.cardCategoryReferenceTypeId}
							isLoading={this.props.loadingCardCategories} />
						<br />
						<ReferenceList
							title="default rates"
							onSaveReference={this.handleOnSave}
							data={this.props.defaultRateTypes}
							referenceTypeId={this.props.defaultRateReferenceTypeId}
							isLoading={this.props.loadingCardCategories} />
					</Col>
				</Row>
			</Grid>
		)
	}
}

const mapStateToProps = (state: RootState): CardPeak.Models.SettingsModel => ({
	...state.settingsModel
});

const mapDispatchToProps = (dispatch: any): ReferencesContainerDispatchProps => {
	return {
		actions: bindActionCreators(SettingsActions as any, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ReferencesContainer);
