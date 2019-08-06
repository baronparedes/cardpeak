import * as React from 'react'
import { Panel, Row, Col, Button, FormGroup, InputGroup } from 'react-bootstrap'
import { GridList, ListNoRecordsRow, FormFieldInput } from '../../layout'
import SelectTeamContainer from '../teams/SelectTeamContainer'

interface AgentTeamListProps {
    agent: CardPeak.Entities.Agent,
    onRemoveTeamPlacement: (teamId: number) => void;
    onAddTeamPlacement: (team: CardPeak.Entities.TeamPlacement) => void;
    isSaving?: boolean;
}

interface AgentTeamDetailRowLayoutProps {
    teamPlacement?: CardPeak.Entities.TeamPlacement;
    isHeader?: boolean;
    onRemoveTeamPlacement?: (teamId: number) => void;
    isSaving?: boolean;
}

class AgentTeamDetailRowLayout extends React.Component<AgentTeamDetailRowLayoutProps, undefined> {
    handleOnRemoveAccount = () => {
        if (this.props.onRemoveTeamPlacement) {
            this.props.onRemoveTeamPlacement(this.props.teamPlacement.teamId);
        }
    }
    render() {
        return (
            <Row>
                <Col md={10} lg={10} sm={11} xs={10}>
                    {this.props.isHeader ? "teams" : this.props.teamPlacement.team.name}
                </Col>
                <Col>
                    {
                        this.props.isHeader ? null :
                            <Button onClick={this.handleOnRemoveAccount} bsStyle="danger" bsSize="sm" disabled={this.props.isSaving}>
                                <i className="fa fa-lg fa-trash-o"></i>
                            </Button>
                    }
                </Col>
            </Row>
        );
    }
}

class AgentTeamList extends React.Component<AgentTeamListProps, undefined> {
    handleOnTeamSelected = (team: CardPeak.Entities.Team) => {
        if (this.props.onAddTeamPlacement) {
            const teamPlacement: CardPeak.Entities.TeamPlacement = {
                teamPlacementId: 0,
                agentId: this.props.agent.agentId,
                teamId: team.teamId,
                team
            }
            this.props.onAddTeamPlacement(teamPlacement);
        }
    }
    render() {
        return (
            <div>
                <FormGroup className="container-fluid text-right">
                    <SelectTeamContainer
                        buttonLabel="add team"
                        bsStyle="primary"
                        onTeamSelected={this.handleOnTeamSelected} />
                </FormGroup>
                <GridList header={<AgentTeamDetailRowLayout isHeader />}>
                    {
                        this.props.agent.teamPlacements && this.props.agent.teamPlacements.length > 0 ?
                            this.props.agent.teamPlacements.map((team) => {
                                return (
                                    <Panel className="panel-row" key={team.teamId}>
                                        <AgentTeamDetailRowLayout
                                            teamPlacement={team}
                                            key={team.teamId}
                                            onRemoveTeamPlacement={this.props.onRemoveTeamPlacement} />
                                    </Panel>
                                )
                            }) : <ListNoRecordsRow />
                    }
                </GridList>
            </div>
        );
    }
}

export default AgentTeamList;