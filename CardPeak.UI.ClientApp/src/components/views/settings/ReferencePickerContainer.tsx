import * as React from 'react'
import * as SettingsActions from '../../../services/actions/settingsAction'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { FormFieldInput, FormFieldDropdown } from '../../layout'

interface Props {
	name: string;
	label: string;
	error?: string;
	referenceName: string;
	controlId?: string;
	isRequired?: boolean;
	selectedId?: number;
	onSelect?: (item: CardPeak.Entities.Reference, name: string) => void;
}

interface DispatchProps {
	actions?: typeof SettingsActions;
}

interface State {
	data?: CardPeak.Entities.Reference[];
}

class ReferencePickerContainer extends React.Component<CardPeak.Models.SettingsModel & Props & DispatchProps, State> {
	constructor(props: CardPeak.Models.SettingsModel & Props & DispatchProps) {
		super(props);
		this.state = {
			data: []
		}
	}
	componentDidMount() {
		this.props.actions.initializeReferences();
		this.setState({
			data: this.getData(this.props)
		});
	}
	componentWillReceiveProps(nextProps: CardPeak.Models.SettingsModel & Props) {
		const data = this.getData(nextProps);
		if (this.state.data !== data) {
			this.setState({
				data
			});
		}
	}
	getData = (props: CardPeak.Models.SettingsModel & Props): CardPeak.Entities.Reference[] => {
		const p: any = {
			...props
		}
		return p[props.referenceName] as CardPeak.Entities.Reference[];
	}
	handleOnChange = (e: any) => {
		const id = e.target.value as number;
		if (this.state.data) {
			if (this.props.onSelect) {
				let item = this.state.data.find(_ => _.referenceId == id);
				this.props.onSelect(item, this.props.name);
			}
		}
	}
	render() {
		return (
			<FormFieldDropdown
				disabled={this.props.loading}
				controlId={this.props.controlId}
				label={this.props.label}
				name={this.props.name}
				value={this.props.selectedId}
				isRequired={this.props.isRequired}
				error={this.props.error}
				onChange={this.handleOnChange} >
				<option key={0} value={0}>Select...</option>
				{
					this.state.data ? this.state.data.map((item) => {
						return (
							<option key={item.referenceId} value={item.referenceId}>
								{item.description}
							</option>
						)
					}) : null
				}
			</FormFieldDropdown>
		);
	}
}

const mapStateToProps = (state: RootState): CardPeak.Models.SettingsModel => ({
	...state.settingsModel
});

const mapDispatchToProps = (dispatch: any): DispatchProps => {
	return {
		actions: bindActionCreators(SettingsActions as any, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ReferencePickerContainer);
