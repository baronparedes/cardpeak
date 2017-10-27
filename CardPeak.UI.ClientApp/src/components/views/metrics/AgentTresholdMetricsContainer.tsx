import * as React from 'react'
import * as Actions from '../../../services/actions/metricActions'
import * as dateHelpers from '../../../helpers/dateHelpers'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../../services/reducers'

import { Col, Row, Grid } from 'react-bootstrap'
import { YearMonthAction, DataListFiltered, DataItemProps, DashboardLabel } from '../../layout'

type AgentTresholdMetricsDataList = new () => DataListFiltered<CardPeak.Entities.AgentRankMetric>;
const AgentTresholdMetricsDataList = DataListFiltered as AgentTresholdMetricsDataList;

interface AgentTresholdMetricsContainerDispatchProps {
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
                        <Col key={_.key} sm={3} xs={4}>
                            <DashboardLabel label={_.key} metrics={_.value} />
                        </Col>
                    )
                })}
            </Row>
        </Grid>
    )
}

const AgentTresholdMetricsRowLayout: React.StatelessComponent<DataItemProps<CardPeak.Entities.AgentRankMetric>> = (props) => {
    return (
        <Row>
            <Col mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader} className="text-center">
                <span className="grid-label spacer-left">rankings</span>
            </Col>
            <Col sm={1} xs={3} xsHidden={props.isHeader}>
                {props.isHeader ? "rank" : <strong>{props.item.rank}</strong>}
            </Col>
            <Col sm={2} xs={6} xsHidden={props.isHeader}>
                {props.isHeader ? "agent" : props.item.key.firstName + " " + props.item.key.lastName}
            </Col>
            <Col sm={1} xs={3} xsHidden={props.isHeader} className={props.isHeader ? "" : "text-center"}>
                {props.isHeader ? "approvals" : <label className="text-highlight text-larger">{props.item.value}</label>}
            </Col>
            {
                props.isHeader ? null :
                    <Col sm={8} xs={12}>
                        <AgentApprovalsByBank data={props.item.approvalsByBank} />
                    </Col>
            }
        </Row>
    )
}

class AgentTresholdMetricsContainer extends React.Component<CardPeak.Models.MetricsModel & AgentTresholdMetricsContainerDispatchProps, undefined> {
    constructor(props: CardPeak.Models.MetricsModel & AgentTresholdMetricsContainerDispatchProps) {
        super(props);
    }
    componentDidMount() {
        this.props.actions.getAvailableYears();
        this.props.actions.getAgentTresholdMetricsStart(dateHelpers.currentYear(), 0);
    }
    render() {
        return (
            <div>
                <YearMonthAction
                    label="agent metrics"
                    availableYears={this.props.availableYears}
                    refreshing={this.props.loadingMetrics}
                    onRefresh={this.props.actions.getAgentTresholdMetricsStart} />
                <br />
                <Grid>
                    <Row>
                        <AgentTresholdMetricsDataList
                            predicate={(metric, searchString) => {
                                const firstNameMatch = metric.key.firstName.toLowerCase().indexOf(searchString) >= 0;
                                const lastNameMatch = metric.key.lastName.toLowerCase().indexOf(searchString) >= 0;
                                return firstNameMatch || lastNameMatch;
                            }}
                            onGetKey={(item) => item.key.agentId}
                            renderHeader={() => { return <AgentTresholdMetricsRowLayout isHeader /> }}
                            renderItem={(item, key) => {
                                return <AgentTresholdMetricsRowLayout item={item} key={key} />
                            }}
                            isLoading={this.props.loadingMetrics}
                            data={this.props.agentTresholdMetrics} />
                    </Row>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): CardPeak.Models.MetricsModel => ({
    ...state.metricsModel,
})

const mapDispatchToProps = (dispatch: any): AgentTresholdMetricsContainerDispatchProps => {
    return {
        actions: bindActionCreators(Actions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentTresholdMetricsContainer);