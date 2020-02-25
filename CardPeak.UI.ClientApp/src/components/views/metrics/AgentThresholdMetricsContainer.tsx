import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dateHelpers from '../../../helpers/dateHelpers';
import * as Actions from '../../../services/actions/metricActions';
import { RootState } from '../../../services/reducers';
import {
    ApprovalMetric,
    DashboardLabel,
    DataItemProps,
    DataListFiltered,
    YearMonthAction
} from '../../layout';

type AgentThresholdMetricsDataList = new () => DataListFiltered<
    CardPeak.Entities.AgentRankMetric
>;
const AgentThresholdMetricsDataList = DataListFiltered as AgentThresholdMetricsDataList;

interface AgentThresholdMetricsContainerDispatchProps {
    actions?: typeof Actions;
}

const AgentApprovalsByBank = (props: {
    data: CardPeak.Entities.ApprovalMetric<string>[];
}) => {
    if (!props.data) {
        return null;
    }
    return (
        <Grid fluid>
            <Row>
                {props.data.map(_ => {
                    return (
                        <Col key={_.key} sm={3} xs={4}>
                            <DashboardLabel
                                label={_.key}
                                metrics={_.value}
                            />
                        </Col>
                    );
                })}
            </Row>
        </Grid>
    );
};

const AgentThresholdMetricsRowLayout: React.StatelessComponent<DataItemProps<
    CardPeak.Entities.AgentRankMetric
>> = props => {
    return (
        <Row>
            <Col
                mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader}
                className="text-center">
                <span className="grid-label spacer-left">rankings</span>
            </Col>
            <Col sm={1} xs={3} xsHidden={props.isHeader}>
                {props.isHeader ? (
                    'rank'
                ) : (
                    <strong>{props.item.rank}</strong>
                )}
            </Col>
            <Col sm={2} xs={6} xsHidden={props.isHeader}>
                {props.isHeader
                    ? 'agent'
                    : props.item.key.firstName +
                      ' ' +
                      props.item.key.lastName}
            </Col>
            <Col
                sm={1}
                xs={3}
                xsHidden={props.isHeader}
                className={props.isHeader ? '' : 'text-center'}>
                {props.isHeader ? (
                    'approvals'
                ) : (
                    <ApprovalMetric
                        metric={props.item.value}
                        className="text-larger"
                    />
                )}
            </Col>
            {props.isHeader ? null : (
                <Col sm={8} xs={12}>
                    <AgentApprovalsByBank
                        data={props.item.approvalsByBank}
                    />
                </Col>
            )}
        </Row>
    );
};

class AgentThresholdMetricsContainer extends React.Component<
    CardPeak.Models.MetricsModel &
        AgentThresholdMetricsContainerDispatchProps,
    undefined
> {
    constructor(
        props: CardPeak.Models.MetricsModel &
            AgentThresholdMetricsContainerDispatchProps
    ) {
        super(props);
    }
    componentDidMount() {
        this.props.actions.getAvailableYears();
        this.props.actions.getAgentThresholdMetricsStart(
            dateHelpers.currentYear(),
            0
        );
    }
    render() {
        return (
            <div>
                <h2>Agent Threshold</h2>
                <div>
                    <YearMonthAction
                        label="metrics"
                        availableYears={this.props.availableYears}
                        refreshing={this.props.loadingMetrics}
                        onRefresh={
                            this.props.actions
                                .getAgentThresholdMetricsStart
                        }
                    />
                    <br />
                    <Grid>
                        <Row>
                            <AgentThresholdMetricsDataList
                                predicate={(metric, searchString) => {
                                    const firstNameMatch =
                                        metric.key.firstName
                                            .toLowerCase()
                                            .indexOf(searchString) >= 0;
                                    const lastNameMatch =
                                        metric.key.lastName
                                            .toLowerCase()
                                            .indexOf(searchString) >= 0;
                                    return (
                                        firstNameMatch || lastNameMatch
                                    );
                                }}
                                onGetKey={item => item.key.agentId}
                                renderHeader={() => {
                                    return (
                                        <AgentThresholdMetricsRowLayout
                                            isHeader
                                        />
                                    );
                                }}
                                renderItem={(item, key) => {
                                    return (
                                        <AgentThresholdMetricsRowLayout
                                            item={item}
                                            key={key}
                                        />
                                    );
                                }}
                                isLoading={this.props.loadingMetrics}
                                data={this.props.agentThresholdMetrics}
                            />
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (
    state: RootState
): CardPeak.Models.MetricsModel => ({
    ...state.metricsModel
});

const mapDispatchToProps = (
    dispatch: any
): AgentThresholdMetricsContainerDispatchProps => {
    return {
        actions: bindActionCreators(Actions as any, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AgentThresholdMetricsContainer);
