import * as React from 'react'
import * as DashboardActions from '../../../services/actions/dashboardActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../../services/reducers'

import { Panel, Grid, Row, Col } from 'react-bootstrap'
import { SpinnerBlock, PerformanceDashboard, DashboardLabel } from '../../layout'

import { LatestProcessedBatchList } from './metrics'
import { TopAgentList } from './metrics'

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
            <Grid fluid>
                <Row>
                    <Col sm={8}>
                        <Panel>
                            <PerformanceDashboard performance={this.props.performance} />
                        </Panel>
                    </Col>
                    <Col sm={4}>
                        <Panel>
                            <DashboardLabel className="pull-right" label="approvals" metrics={this.props.totalApprovals} />
                        </Panel>
                        <Panel>
                            <DashboardLabel className="pull-right" label="balance" metrics={this.props.accountBalance} isCurrency />
                        </Panel>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <Panel>
                            Banks
                        </Panel>
                    </Col>
                    <Col sm={4}>
                        <Panel>
                            Card Categories
                        </Panel>
                    </Col>
                </Row>
                <Row>
                    <Col sm={7}>
                        <Panel>
                            <TopAgentList data={this.props.topAgents} />
                        </Panel>
                    </Col>
                    <Col sm={5}>
                        <Panel>
                            <LatestProcessedBatchList data={this.props.latestProcessedBatch} />
                        </Panel>
                    </Col>
                </Row>
            </Grid>
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