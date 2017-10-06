import * as React from 'react'
import * as Actions from '../../../services/actions/metricActions'
import * as dateHelpers from '../../../helpers/dateHelpers'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../../services/reducers'

import { Col, Row, Grid } from 'react-bootstrap'
import { YearMonthAction, DataListFiltered, DataItemProps, DashboardLabel, PerformanceDashboard } from '../../layout'

type AgentPerformanceMetricsDataList = new () => DataListFiltered<CardPeak.Entities.AgentPerformanceMetric>;
const AgentPerformanceMetricsDataList = DataListFiltered as AgentPerformanceMetricsDataList;

interface AgentPerformanceMetricsContainerDispatchProps {
    actions?: typeof Actions
}

const AgentPerformanceMetricsRowLayout: React.StatelessComponent<DataItemProps<CardPeak.Entities.AgentPerformanceMetric>> = (props) => {
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
                        <PerformanceDashboard performance={props.item.performance} />
                    </Col>
            }
        </Row>
    )
}

class AgentPerformanceMetricsContainer extends React.Component<CardPeak.Models.MetricsModel & AgentPerformanceMetricsContainerDispatchProps, undefined> {
    constructor(props: CardPeak.Models.MetricsModel & AgentPerformanceMetricsContainerDispatchProps) {
        super(props);
    }
    componentDidMount() {
        this.props.actions.getAvailableYears();
        this.props.actions.getAgentPerformanceMetricsStart(dateHelpers.currentYear(), 0);
    }
    render() {
        return (
            <div>
                <YearMonthAction
                    yearOnly
                    label="agent metrics"
                    availableYears={this.props.availableYears}
                    refreshing={this.props.loadingMetrics}
                    onRefresh={this.props.actions.getAgentPerformanceMetricsStart} />
                <br />
                <Grid className="no-padding">
                    <Row>
                        <AgentPerformanceMetricsDataList
                            predicate={(metric, searchString) => {
                                const firstNameMatch = metric.key.firstName.toLowerCase().indexOf(searchString) >= 0;
                                const lastNameMatch = metric.key.lastName.toLowerCase().indexOf(searchString) >= 0;
                                return firstNameMatch || lastNameMatch;
                            }}
                            onGetKey={(item) => item.key.agentId}
                            renderHeader={() => { return <AgentPerformanceMetricsRowLayout isHeader /> }}
                            renderItem={(item, key) => {
                                return <AgentPerformanceMetricsRowLayout item={item} key={key} />
                            }}
                            isLoading={this.props.loadingMetrics}
                            data={this.props.agentPerformanceMetrics} />
                    </Row>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): CardPeak.Models.MetricsModel => ({
    ...state.metricsModel,
})

const mapDispatchToProps = (dispatch: any): AgentPerformanceMetricsContainerDispatchProps => {
    return {
        actions: bindActionCreators(Actions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentPerformanceMetricsContainer);