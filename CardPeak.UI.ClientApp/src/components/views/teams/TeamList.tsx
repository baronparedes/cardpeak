import * as React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { DataListFiltered, DataListProps, DataItemProps } from '../../layout'

type TeamDataListFiltered = new () => DataListFiltered<CardPeak.Entities.Team>;
const TeamDataListFiltered = DataListFiltered as TeamDataListFiltered;

interface TeamListProps {
	onTeamSelected?: (data: CardPeak.Entities.Team) => void;
}

const TeamListRowLayout = (props: DataItemProps<CardPeak.Entities.Team> & TeamListProps) => {
	return (
		<Row className="team-item">
			<Col sm={10}>
				{props.isHeader ? "team" : props.item.name}
			</Col>
			<Col sm={2}>
				{props.isHeader ? "" : <Button onClick={() => { props.onTeamSelected(props.item) }} bsStyle="primary" bsSize="sm">Select</Button>}
			</Col>
		</Row>
	)
}

const TeamList = (props: DataListProps<CardPeak.Entities.Team> & TeamListProps) => {
	return (
		<div>
			<TeamDataListFiltered
				predicate={(team, searchString) => {
					const nameMatch = team.name.toLowerCase().indexOf(searchString) >= 0;
					return nameMatch;
				}}
				pageSize={5}
				onGetKey={(item) => item.teamId}
				isLoading={props.isLoading}
				renderHeader={() => { return <TeamListRowLayout isHeader /> }}
				renderItem={(item, key) => { return <TeamListRowLayout item={item} key={key} onTeamSelected={props.onTeamSelected} /> }}
				data={props.data} />
		</div>
	)
}

export default TeamList;