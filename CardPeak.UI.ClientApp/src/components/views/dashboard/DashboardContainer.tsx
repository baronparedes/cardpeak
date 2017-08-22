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
            <div className="container-fluid no-padding">
                <Panel>
                    <RenderAgentName agent={this.props.selectedAgent} />
                </Panel>
                <Panel className="text-right">
                    <h4>
                        Account Balance
                        <span className="text-muted spacer-left">1000.00</span>
                    </h4>
                    <h4>
                        Savings Incentive
                        <span className="text-muted spacer-left">1000.00</span>
                    </h4>
                </Panel>
                <Panel>
                    Transactions Here
                </Panel>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState):DashboardContainerProps  => ({
    selectedAgent: state.dashboard.selectedAgent
});

export default connect(mapStateToProps)(DashboardContainer);