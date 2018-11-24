import * as React from 'react'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { DataListFiltered, DataListProps, DataItemProps, TeamDashboardLinkButton, ConfirmButton } from '../../layout'
import TeamModalForm from './TeamModalForm'

type TeamDataListFiltered = new () => DataListFiltered<CardPeak.Entities.Team>;
const TeamDataListFiltered = DataListFiltered as TeamDataListFiltered;

interface TeamListProps {
	onRefresh?: () => void;
	onDeleteTeam?: (id: number) => void;
	onSaveTeam?: (
		team: CardPeak.Entities.Team,
		saveCompleteCallback: () => void,
		errorCallback: (error: string) => void
	) => void;
}

class TeamListRowLayout extends React.Component<DataItemProps<CardPeak.Entities.Team> & TeamListProps, { isDeleting: boolean }> {
	constructor(props: DataItemProps<CardPeak.Entities.Team> & TeamListProps) {
		super(props);
		this.state = {
			isDeleting: false
		}
	}
	handleOnConfirm = () => {
		if (this.props.onDeleteTeam) {
			this.props.onDeleteTeam(this.props.item.teamId);
		}
	}
	render() {
		return (
			<Row className="team-item">
				<Col sm={4}>
					{this.props.isHeader ? "name" : this.props.item.name}
				</Col>
				<Col sm={6}>
					{this.props.isHeader ? "description" : this.props.item.description}
				</Col>
				<Col sm={2}>
					{
						this.props.isHeader ? null :
							<ButtonGroup>
								<TeamDashboardLinkButton id={this.props.item.teamId} />
								<TeamModalForm
									onSaveTeam={this.props.onSaveTeam}
									team={this.props.item} bsStyle="success" buttonLabel={
									<i className="fa fa-pencil" />
								} />
								<ConfirmButton
									useButtonLoading
									noButtonLoadingText
									isLoading={this.state.isDeleting}
									bsStyle="danger"
									buttonLabel={<i className="fa fa-trash-o"></i>}
									confirmTitle="Delete Team"
									onConfirm={this.handleOnConfirm}>

									<p>
										You are about to
									<strong className="text-highlight text-danger"> delete </strong>
										team: <span className="text-highlight">{this.props.item.name}</span>
									</p>
									<p className="text-right">Do you wish to continue?</p>
								</ConfirmButton>
							</ButtonGroup>
					}
				</Col>
			</Row>
		)
	}
}

const TeamList = (props: DataListProps<CardPeak.Entities.Team> & TeamListProps) => {
	return (
		<div>
			<TeamDataListFiltered
				predicate={(team, searchString) => {
					const nameMatch = team.name.toLowerCase().indexOf(searchString) >= 0;
					return nameMatch;
				}}
				pageSize={props.pageSize}
				onGetKey={(item) => item.teamId}
				isLoading={props.isLoading}
				renderHeader={() => { return <TeamListRowLayout isHeader /> }}
				renderItem={(item, key) => {
					return <TeamListRowLayout item={item} key={key}
						onSaveTeam={props.onSaveTeam} onDeleteTeam={props.onDeleteTeam} onRefresh={props.onRefresh} />
				}}
				data={props.data} />
		</div>
	)
}

export default TeamList;