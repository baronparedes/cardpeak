import * as React from 'react'
import * as Actions from '../../../services/actions/metricActions'
import * as dateHelpers from '../../../helpers/dateHelpers'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../../services/reducers'

import { Col, Row, Grid } from 'react-bootstrap'
import { YearMonthAction, DataListFiltered, DataItemProps, DashboardLabel }from '../../layout'

type AgentRankingMetricsDataList = new () => DataListFiltered<CardPeak.Entities.AgentRankMetric>;
const AgentRankingMetricsDataList = DataListFiltered as AgentRankingMetricsDataList;

interface AgentRankingMetricsContainerDispatchProps {
    actions?: typeof Actions
}

const AgentApprovalsByBank = (props: { data: CardPeak.Entities.ApprovalMetric<string>[] }) => {
    if (!props.data) {
        return null;
    }
    return (
        <Grid fluid>
            <Row>
                {props.data.map(_ => {
                    return (
                        <Col key={_.key}>
                            <DashboardLabel label={_.key} metrics={_.value} />
                        </Col>
                    )
                })}
            </Row>
        </Grid>
    )
}

const AgentRankingMetricsRowLayout: React.StatelessComponent<DataItemProps<CardPeak.Entities.AgentRankMetric>> = (props) => {
    return (
        <Row>
            <Col mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader}>
                <span className="grid-label text-center spacer-left">top agents</span>
            </Col>
            <Col sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "rank" : props.item.rank}
            </Col>
            <Col sm={8} xsHidden={props.isHeader}>
                {props.isHeader ? "agent" : props.item.key.firstName + " " + props.item.key.lastName}
            </Col>
            <Col sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "approvals" : <span className="text-highlight">{props.item.value}</span>}
            </Col>
            {
                props.isHeader ? null :
                    <Col sm={12}>
                        <AgentApprovalsByBank data={props.item.approvalsByBank} />
                    </Col>
            }
        </Row>
    )
}

class AgentRankingMetricsContainer extends React.Component<CardPeak.Models.MetricsModel & AgentRankingMetricsContainerDispatchProps, undefined> {
    constructor(props: CardPeak.Models.MetricsModel & AgentRankingMetricsContainerDispatchProps) {
        super(props);
    }
    componentDidMount() {
        this.props.actions.getAvailableYears();
        this.props.actions.getAgentRankingMetricsStart(dateHelpers.currentYear(), 0);
    }
    render() {
        return (
            <div>
                <YearMonthAction
                    label="agent metrics"
                    availableYears={this.props.availableYears}
                    refreshing={this.props.loadingMetrics}
                    onRefresh={this.props.actions.getAgentRankingMetricsStart} />
                <br />
                <AgentRankingMetricsDataList
                    predicate={(metric, searchString) => {
                        const firstNameMatch = metric.key.firstName.toLowerCase().indexOf(searchString) >= 0;
                        const lastNameMatch = metric.key.lastName.toLowerCase().indexOf(searchString) >= 0;
                        return firstNameMatch || lastNameMatch;
                    }}
                    onGetKey={(item) => item.key.agentId}
                    renderHeader={() => { return <AgentRankingMetricsRowLayout isHeader /> }}
                    renderItem={(item, key) => {
                        return <AgentRankingMetricsRowLayout item={item} key={key} />
                    }}
                    isLoading={this.props.loadingMetrics}
                    data={this.props.agentRankingMetrics} />
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): CardPeak.Models.MetricsModel => ({
    ...state.metricsModel,
})

const mapDispatchToProps = (dispatch: any): AgentRankingMetricsContainerDispatchProps => {
    return {
        actions: bindActionCreators(Actions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentRankingMetricsContainer);