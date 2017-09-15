import * as React from 'react'
import * as DashboardActions from '../../../services/actions/dashboardActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../../services/reducers'

import { Grid, Row, Col } from 'react-bootstrap'
import { SpinnerBlock } from '../../layout'

import { LatestProcessedBatchList } from './metrics'

interface DashboardContainerDispatchProps {
    actions?: typeof DashboardActions
}

class DashboardContainer extends React.Component<CardPeak.Models.DashboardModel & DashboardContainerDispatchProps, undefined> {
    constructor(props: CardPeak.Models.DashboardModel & DashboardContainerDispatchProps) {
        super(props);
    }
    componentDidMount() {
        this.props.actions.getDashboardStart();
    }
    renderMetrics() {
        return (
            <div>
                <LatestProcessedBatchList data={this.props.latestProcessedBatch} />
            </div>
        )
    }
    render() {
        return (
            <div>
                { this.props.refreshing ? <SpinnerBlock /> : this.renderMetrics() }
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): CardPeak.Models.DashboardModel => ({
    ...state.dashboardModel
})

const mapDispatchToProps = (dispatch: any): DashboardContainerDispatchProps => {
    return {
        actions: bindActionCreators(DashboardActions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);