import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TeamsActions from '../../../services/actions/teamsActions';
import { RootState } from '../../../services/reducers';
import { SpinnerBlock } from '../../layout';
import ManageTeamsActions from './ManageTeamsActions';
import TeamList from './TeamList';

interface ManageTeamsContainerPropsConnect {
    refreshing?: boolean;
    teams?: CardPeak.Entities.Team[];
}

interface ManageTeamsContainerDispatchProps {
    actions?: typeof TeamsActions;
}

class ManageTeamsContainer extends React.Component<
    ManageTeamsContainerPropsConnect &
        ManageTeamsContainerDispatchProps,
    {}
> {
    constructor(
        props: ManageTeamsContainerPropsConnect &
            ManageTeamsContainerDispatchProps
    ) {
        super(props);
    }
    componentDidMount() {
        this.handleOnRefresh();
    }
    handleOnRefresh = () => {
        this.props.actions.getTeamsStart();
    };
    render() {
        return (
            <div>
                <ManageTeamsActions
                    onSaveTeam={this.props.actions.saveTeamStart}
                    onRefresh={this.handleOnRefresh}
                    refreshing={this.props.refreshing}
                    teams={this.props.teams}
                />
                <br />
                {this.props.refreshing ? (
                    <SpinnerBlock />
                ) : (
                    <TeamList
                        onDeleteTeam={
                            this.props.actions.deleteTeamStart
                        }
                        onSaveTeam={this.props.actions.saveTeamStart}
                        data={this.props.teams}
                        isLoading={this.props.refreshing}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (
    state: RootState
): ManageTeamsContainerPropsConnect => ({
    refreshing: state.teamsModel.loadingTeams,
    teams: state.teamsModel.teams
});

const mapDispatchToProps = (
    dispatch: any
): ManageTeamsContainerDispatchProps => {
    return {
        actions: bindActionCreators(TeamsActions as any, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageTeamsContainer);
