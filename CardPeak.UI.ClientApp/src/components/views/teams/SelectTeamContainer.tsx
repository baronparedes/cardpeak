import * as React from 'react'
import * as TeamsActions from '../../../services/actions/teamsActions'
import { Row, Col, Grid } from 'react-bootstrap'

import { Button, ButtonGroup } from 'react-bootstrap'
import { ModalPanel } from '../../layout'
import SelectTeamList from './SelectTeamList'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

interface SelectTeamContainerPropsConnect {
    Teams?: CardPeak.Entities.Team[];
    isLoading?: boolean;
}

interface SelectTeamContainerProps {
    onTeamSelected?: (Team: CardPeak.Entities.Team) => void;
    bsStyle?: string;
    bsSize?: ReactBootstrap.Sizes;
    buttonLabel?: React.ReactNode;
    disabled?: boolean;
}

interface SelectTeamContainerDispatchProps {
    actions?: typeof TeamsActions;
}

class SelectTeamContainer extends React.Component<SelectTeamContainerProps & SelectTeamContainerPropsConnect & SelectTeamContainerDispatchProps, { showModal: boolean }> {
    constructor(props: SelectTeamContainerProps & SelectTeamContainerPropsConnect & SelectTeamContainerDispatchProps) {
        super(props);
        this.state = { showModal: false };
    }
    handleOnSelectTeam = () => {
        this.props.actions.getTeamsStart();
        this.handleOnToggleModal();
    }
    handleOnToggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }
    handleOnTeamSelected = (Team: CardPeak.Entities.Team) => {
        this.handleOnToggleModal();
        if (this.props.onTeamSelected) {
            this.props.onTeamSelected(Team);
        }
    }
    render() {
        return (
            <ButtonGroup className="hidden-print">
                <Button
                    disabled={this.props.disabled}
                    bsStyle={this.props.bsStyle}
                    bsSize={this.props.bsSize}
                    onClick={this.handleOnSelectTeam}>
                    {this.props.buttonLabel}
                </Button>
                <ModalPanel
                    onToggleModal={this.handleOnToggleModal}
                    showModal={this.state.showModal}
                    title="select Team">
                    <SelectTeamList
                        data={this.props.Teams}
                        onTeamSelected={this.handleOnTeamSelected}
                        isLoading={this.props.isLoading} />
                </ModalPanel>
            </ButtonGroup>
        );
    }
}

const mapStateToProps = (state: RootState): SelectTeamContainerPropsConnect => ({
    Teams: state.teamsModel.teams,
    isLoading: state.teamsModel.loadingTeams
});

const mapDispatchToProps = (dispatch: any): SelectTeamContainerDispatchProps => {
    return {
        actions: bindActionCreators(TeamsActions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectTeamContainer);