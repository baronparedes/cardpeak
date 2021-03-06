﻿import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dateHelpers from '../../../helpers/dateHelpers';
import * as TeamsActions from '../../../services/actions/teamsActions';
import { RootState } from '../../../services/reducers';
import { NavigationProps } from '../../layout';
import SelectTeam from './SelectTeam';
import TeamDashboardView from './teamDashboard/TeamDashboardView';

interface TeamDashboardContainerDispatchProps {
    actions?: typeof TeamsActions;
}

class TeamDashboardContainer extends React.Component<
    CardPeak.Models.TeamsModel &
        TeamDashboardContainerDispatchProps &
        NavigationProps<any>,
    {}
> {
    constructor(
        props: CardPeak.Models.TeamsModel &
            TeamDashboardContainerDispatchProps &
            NavigationProps<any>
    ) {
        super(props);
    }
    componentDidMount() {
        if (this.props.match.params.id) {
            if (this.props.selectedTeam) {
                if (
                    this.props.selectedTeam.teamId ==
                    this.props.match.params.id
                ) {
                    return;
                }
            }
            this.props.actions.selectTeamById(
                parseInt(this.props.match.params.id),
                (team: CardPeak.Entities.Team) => {
                    this.props.actions.selectTeamDashboard(team);
                    this.props.actions.selectTeamDashboardStart(
                        dateHelpers.currentYear()
                    );
                },
                () => {
                    this.props.history.push('/404');
                }
            );

            return;
        }

        if (this.props.selectedTeam) {
            this.props.history.push(
                '/teams/' + this.props.selectedTeam.teamId
            );
        }
    }
    handleOnSelectTeam = () => {
        this.props.actions.getTeamsStart();
    };
    handleOnTeamSelected = (team: CardPeak.Entities.Team) => {
        if (this.props.history) {
            this.props.history.push('/teams/' + team.teamId);
        }
        this.props.actions.selectTeamDashboard(team);
        this.props.actions.selectTeamDashboardStart(
            dateHelpers.currentYear()
        );
    };
    handleOnRefresh = (year: number) => {
        this.props.actions.refreshTeamDashboardStart(year);
    };
    handleOnRemoveAgent = (
        teamPlacement: CardPeak.Entities.TeamPlacement,
        completeCallback: () => void
    ) => {
        this.props.actions.removeAgentStart(
            teamPlacement,
            completeCallback
        );
    };
    handleOnAgentSelected = (agent: CardPeak.Entities.Agent) => {
        this.props.actions.addAgentStart(
            this.props.selectedTeam.teamId,
            agent.agentId,
            this.props.selectedYear
        );
    };
    render() {
        return (
            <div>
                <h2>Team Dashboard</h2>
                <div className="container-fluid no-padding">
                    <Panel>
                        <SelectTeam
                            team={this.props.selectedTeam}
                            teams={this.props.teams}
                            isLoading={this.props.loadingTeams}
                            onTeamSelected={this.handleOnTeamSelected}
                            onSelectTeam={this.handleOnSelectTeam}
                        />
                    </Panel>
                    <TeamDashboardView
                        removingAgentError={
                            this.props.removingAgentError
                        }
                        onRemoveAgent={this.handleOnRemoveAgent}
                        onAgentSelected={this.handleOnAgentSelected}
                        teamDashboard={this.props.selectedTeamDashboard}
                        onRefresh={this.handleOnRefresh}
                        refreshing={this.props.refreshingTeamDashboard}
                        loadingTeamDashboard={
                            this.props.loadingTeamDashboard
                        }
                        selectedYear={this.props.selectedYear}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (
    state: RootState
): CardPeak.Models.TeamsModel => ({
    ...state.teamsModel
});

const mapDispatchToProps = (
    dispatch: any
): TeamDashboardContainerDispatchProps => {
    return {
        actions: bindActionCreators(TeamsActions as any, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamDashboardContainer);
