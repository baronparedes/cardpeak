﻿import * as React from 'react';
import { Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../services/actions/agentPayoutActions';
import { RootState } from '../../services/reducers';

interface PayoutBadgeContainerDispatchProps {
    actions?: typeof Actions;
}

interface PayoutBadgeContainerProps {
    autoRefresh?: boolean;
}

class PayoutBadgeContainer extends React.Component<
    CardPeak.Models.AgentPayoutModel &
        PayoutBadgeContainerDispatchProps &
        PayoutBadgeContainerProps,
    {}
> {
    constructor(
        props: CardPeak.Models.AgentPayoutModel &
            PayoutBadgeContainerDispatchProps &
            PayoutBadgeContainerProps
    ) {
        super(props);
    }
    componentDidMount() {
        if (!this.props.initialized) {
            this.props.actions.initializeStart();
            if (this.props.autoRefresh) {
                setInterval(
                    this.props.actions.getAgentPayoutStart,
                    15000
                );
            }
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
                <Badge>{this.props.count}</Badge>
            </span>
        );
    }
}

const mapStateToProps = (
    state: RootState
): CardPeak.Models.AgentPayoutModel => ({
    ...state.agentPayoutModel
});

const mapDispatchToProps = (
    dispatch: any
): PayoutBadgeContainerDispatchProps => {
    return {
        actions: bindActionCreators(Actions as any, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PayoutBadgeContainer);
