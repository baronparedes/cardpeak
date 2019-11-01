import * as React from 'react'
import * as Actions from '../../services/actions/agentPayoutActions'
import { Panel } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { RootState } from '../../services/reducers'

import { DashboardLabel } from './DashboardLabel'

interface PayoutTotalContainerDispatchProps {
    actions?: typeof Actions;
}

interface PayoutTotalContainerProps {
    autoRefresh?: boolean;
}

class PayoutTotalContainer extends React.Component<CardPeak.Models.AgentPayoutModel & PayoutTotalContainerDispatchProps & PayoutTotalContainerProps, {}> {
    constructor(props: CardPeak.Models.AgentPayoutModel & PayoutTotalContainerDispatchProps & PayoutTotalContainerProps) {
        super(props);
    }
    componentWillUpdate(nextProps: CardPeak.Models.AgentPayoutModel) {
        if (this.props.total == nextProps.total) {
            return false;
        }
    }
    render() {
        return (
            <Link to="/agents/payout">
                <Panel className="panel-label-dashboard">
                    <DashboardLabel
                        className="pull-right total-approved-metric"
                        label="payout total"
                        metrics={this.props.total}
                        isCurrency
                        noCurrencyColor
                    />
                </Panel>
            </Link>
        )
    }
}

const mapStateToProps = (state: RootState): CardPeak.Models.AgentPayoutModel => ({
    ...state.agentPayoutModel
});

const mapDispatchToProps = (dispatch: any): PayoutTotalContainerDispatchProps => {
    return {
        actions: bindActionCreators(Actions as any, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutTotalContainer);