import * as React from 'react'
import * as Actions from '../../../services/actions/metricActions'
import * as dateHelpers from '../../../helpers/dateHelpers'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../../services/reducers'

import { Col, Row, Grid, Panel, Button, DropdownButton, MenuItem } from 'react-bootstrap'
import {
    YearMonthAction, DataListFiltered, DataListProps, DataItemProps, Currency,
    DashboardLabel, ApprovalMetric
} from '../../layout'

type AgentMetricsDataListFiltered = new () => DataListFiltered<CardPeak.Entities.AgentApprovalMetric>;
const AgentMetricsDataListFiltered = DataListFiltered as AgentMetricsDataListFiltered;

interface AgentMetricsContainerDispatchProps {
    actions?: typeof Actions
}

const AgentMetricsRowLayout: React.StatelessComponent<DataItemProps<CardPeak.Entities.AgentApprovalMetric>> = (props) => {
        return (
            <Row>
                <Col mdHidden
                    lgHidden
                    smHidden
                    xsHidden={!props.isHeader} className="text-center">
                    <span className="grid-label spacer-left">agent metrics</span>
                </Col>
                <Col sm={4} xs={12} xsHidden={props.isHeader}>
                    {props.isHeader ? "agent" : props.item.key.firstName + " " + props.item.key.lastName}
                </Col>
                <Col sm={2} xs={3} xsHidden={props.isHeader} className="text-center">
                    {props.isHeader ? "approvals" : <ApprovalMetric metric={props.item.value} />}
                </Col>
                <Col sm={2} xs={3} xsHidden={props.isHeader} className="text-center">
                    {props.isHeader ? "balance" : <Currency currency={props.item.accountBalance} />}
                </Col>
                <Col sm={2} xs={3} xsHidden={props.isHeader} className="text-center">
                    {props.isHeader ? "savings" : <Currency noCurrencyColor currency={props.item.savingsBalance} />}
                </Col>
                <Col sm={2} xs={3} xsHidden={props.isHeader} className="text-center">
                    {props.isHeader ? "incentives" : <Currency noCurrencyColor currency={props.item.incentivesBalance} className="amount-incentive" />}
                </Col>
            </Row>
        )
}

const AgentMetricsTotals: React.StatelessComponent<CardPeak.Models.MetricsModel> = (props) => {
    return (
        <Row>
             <Col sm={6}>
                <Panel className="panel-label-dashboard">
                    <DashboardLabel className="pull-right" label="approvals" metrics={props.agentMetrics.totalApproved} />
                </Panel>
            </Col>
            <Col sm={6}>
                <Panel className="panel-label-dashboard">
                    <DashboardLabel className="pull-right" label="balance" metrics={props.agentMetrics.totalBalance} isCurrency />
                    <DashboardLabel className="pull-right" label="savings" metrics={props.agentMetrics.totalSavings} isCurrency noCurrencyColor />
                    <DashboardLabel className="pull-right amount-incentive" label="savings" metrics={props.agentMetrics.totalIncentives} isCurrency noCurrencyColor />
                </Panel>
            </Col>
        </Row>
    )
}

class AgentMetricsContainer extends React.Component<CardPeak.Models.MetricsModel & AgentMetricsContainerDispatchProps, undefined> {
    constructor(props: CardPeak.Models.MetricsModel & AgentMetricsContainerDispatchProps) {
        super(props);
    }
    componentDidMount() {
        this.props.actions.getAvailableYears();
        this.props.actions.getAgentMetricsStart(dateHelpers.currentYear(), 0);
    }
    render() {
        return (
            <div>
                <h2>Agents</h2>
                <div>
                    <YearMonthAction
                        label="metrics"
                        availableYears={this.props.availableYears}
                        refreshing={this.props.loadingMetrics}
                        onRefresh={this.props.actions.getAgentMetricsStart} />
                    <br />
                    <Grid>
                        <AgentMetricsTotals agentMetrics={this.props.agentMetrics} />
                        <Row>
                            <AgentMetricsDataListFiltered
                                predicate={(agent, searchString) => {
                                    const firstNameMatch = agent.key.firstName.toLowerCase().indexOf(searchString) >= 0;
                                    const lastNameMatch = agent.key.lastName.toLowerCase().indexOf(searchString) >= 0;
                                    return firstNameMatch || lastNameMatch;
                                }}
                                onGetKey={(item) => item.key.agentId}
                                renderHeader={() => { return <AgentMetricsRowLayout isHeader /> }}
                                renderItem={(item, key) => {
                                    return <AgentMetricsRowLayout item={item} key={key} />
                                }}
                                isLoading={this.props.loadingMetrics}
                                data={this.props.agentMetrics.agentApprovalMetrics} />
                        </Row>
                    </Grid>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): CardPeak.Models.MetricsModel => ({
    ...state.metricsModel,
})

const mapDispatchToProps = (dispatch: any): AgentMetricsContainerDispatchProps => {
    return {
        actions: bindActionCreators(Actions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentMetricsContainer);