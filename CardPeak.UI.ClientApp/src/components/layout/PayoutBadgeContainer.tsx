import * as React from 'react'
import * as Actions from '../../services/actions/agentPayoutActions'
import { Badge } from 'react-bootstrap'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../services/reducers'

interface PayoutBadgeContainerDispatchProps {
    actions?: typeof Actions;
}

class PayoutBadgeContainer extends React.Component<CardPeak.Models.AgentPayoutModel & PayoutBadgeContainerDispatchProps, {}> {
    constructor(props: CardPeak.Models.AgentPayoutModel & PayoutBadgeContainerDispatchProps) {
        super(props);
    }
    componentDidMount() {
        if (!this.props.initialized) {
            this.props.actions.initializeStart();
            setInterval(this.props.actions.getAgentPayoutStart, 15000);
        }
    }
    componentWillUpdate(nextProps: CardPeak.Models.AgentPayoutModel) {
        if (this.props.count == nextProps.count) {
            return false;
        }
    }
    render() {
        if (this.props.count <= 0) {
            return null;
        }
        return (
            <span className="spacer-left-sm">
                <Badge>
                    {this.props.count}
                </Badge>
            </span>
        )
    }
}

const mapStateToProps = (state: RootState): CardPeak.Models.AgentPayoutModel => ({
    ...state.agentPayoutModel
});

const mapDispatchToProps = (dispatch: any): PayoutBadgeContainerDispatchProps => {
    return {
        actions: bindActionCreators(Actions as any, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutBadgeContainer);