import * as React from 'react'
import * as DashboardActions from '../../../services/actions/dashboardActions'
import { connect } from 'react-redux'
import { Panel, Button } from 'react-bootstrap'
import { RootState } from '../../../services/reducers'

interface DashboardContainerProps {
    selectedAgent?: CardPeak.Types.Agent;
}

const RenderAgentName = (props: { agent: CardPeak.Types.Agent }) => {
    if (!!!props.agent) {
        return (
            <div>
                <span className="text-muted spacer-right">Select an Agent</span>
                <Button>
                    <i className="fa fa-sm fa-users"></i>
                </Button>    
            </div>
        );
    }
    return (
        <h5 className="spacer-right">
            <span className="spacer-right">
                {props.agent.firstName + " " + props.agent.lastName}    
            </span>
            <Button>
                <i className="fa fa-sm fa-users"></i>
            </Button>
        </h5>
    );
}

class DashboardContainer extends React.Component<DashboardContainerProps, undefined>{
    constructor(props: DashboardContainerProps) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <Panel>
                    <RenderAgentName agent={this.props.selectedAgent} />
                </Panel>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState):DashboardContainerProps  => ({
    selectedAgent: state.dashboard.selectedAgent
});

export default connect(mapStateToProps)(DashboardContainer);