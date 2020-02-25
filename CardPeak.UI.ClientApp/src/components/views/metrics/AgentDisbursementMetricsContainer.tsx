import * as React from 'react';
import {
    Checkbox,
    Col,
    FormGroup,
    Grid,
    Panel,
    Row
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dateHelpers from '../../../helpers/dateHelpers';
import * as Actions from '../../../services/actions/metricActions';
import { RootState } from '../../../services/reducers';
import {
    Currency,
    DataItemProps,
    DataListFiltered,
    DateRangeAction
} from '../../layout';

type AgentDisbursementMetricsDataListFiltered = new () => DataListFiltered<
    CardPeak.Entities.AgentDisbursementMetrics
>;
const AgentDisbursementMetricsDataListFiltered = DataListFiltered as AgentDisbursementMetricsDataListFiltered;

interface AgentDisbursementMetricsContainerDispatchProps {
    actions?: typeof Actions;
}

interface AgentDisbursementMetricsContainerState {
    displayAll?: boolean;
    agentDisbursementMetrics?: CardPeak.Entities.AgentDisbursementMetrics[];
}

const AgentDisbursementDetails: React.StatelessComponent<{
    details: CardPeak.Entities.DebitCreditTransaction[];
}> = props => {
    return (
        <div>
            {props.details.map(_ => {
                return (
                    <div className="block">
                        <small className="text-muted">
                            {_.remarks}
                            {props.details.length === 1 ? null : (
                                <span>
                                    (
                                    <span className="money-debit">
                                        {_.amount}
                                    </span>
                                    )
                                </span>
                            )}
                        </small>
                    </div>
                );
            })}
        </div>
    );
};

const AgentDisbursementMetricsRowLayout: React.StatelessComponent<DataItemProps<
    CardPeak.Entities.AgentDisbursementMetrics
>> = props => {
    const comments = ['ca', 'payout', 'payout 3'];

    return (
        <Row>
            <Col
                mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader}
                className="text-center">
                <span className="grid-label spacer-left">
                    agent metrics
                </span>
            </Col>
            <Col sm={4} xsHidden={props.isHeader}>
                {props.isHeader
                    ? 'agent'
                    : props.item.key.firstName +
                      ' ' +
                      props.item.key.lastName}
            </Col>
            <Col
                sm={4}
                xsHidden={props.isHeader}
                className="text-center">
                {props.isHeader ? (
                    'total disbursed'
                ) : (
                    <Currency currency={props.item.totalDisbursed} />
                )}
            </Col>
            <Col
                sm={4}
                xsHidden={props.isHeader}
                className="text-center">
                {props.isHeader ? (
                    'details'
                ) : props.item.details ? (
                    <AgentDisbursementDetails
                        details={props.item.details}
                    />
                ) : null}
            </Col>
        </Row>
    );
};

class AgentDisbursementMetricsContainer extends React.Component<
    CardPeak.Models.MetricsModel &
        AgentDisbursementMetricsContainerDispatchProps,
    AgentDisbursementMetricsContainerState
> {
    constructor(props: any) {
        super(props);
        this.state = {
            displayAll: false
        };
    }
    componentDidMount() {
        this.props.actions.getAgentDisbursementMetricsStart(
            dateHelpers.currentDay()
        );
    }
    componentWillReceiveProps(nextProps: CardPeak.Models.MetricsModel) {
        if (
            this.props.agentDisbursementMetrics !==
            nextProps.agentDisbursementMetrics
        ) {
            this.filterMetrics(nextProps.agentDisbursementMetrics);
        }
    }
    handleOnChange = (e: any) => {
        this.setState(
            {
                [e.target.name]: e.target.checked
            },
            () => {
                this.filterMetrics(this.props.agentDisbursementMetrics);
            }
        );
    };
    filterMetrics = (
        data: CardPeak.Entities.AgentDisbursementMetrics[]
    ) => {
        let filteredData = data.filter(item => {
            return item.totalDisbursed < 0 || this.state.displayAll;
        });
        this.setState({
            agentDisbursementMetrics: filteredData
        });
    };
    render() {
        let summary = {
            grandTotalApprovals: 0,
            grandTotalCredited: 0,
            grandTotalDisbursed: 0
        };

        if (this.state.agentDisbursementMetrics) {
            this.state.agentDisbursementMetrics.forEach(_ => {
                summary.grandTotalApprovals += _.value;
                summary.grandTotalCredited += _.amount;
                summary.grandTotalDisbursed += _.totalDisbursed;
            });
        }

        return (
            <div>
                <h2>Daily Disbursement</h2>
                <div>
                    <DateRangeAction
                        refreshing={this.props.loadingMetrics}
                        onRefresh={
                            this.props.actions
                                .getAgentDisbursementMetricsStart
                        }
                        label="metrics"
                        startDateLabel="target date"
                        hideEndDate
                    />
                    <Grid fluid>
                        <Row className="text-right">
                            <FormGroup>
                                <Checkbox
                                    name="displayAll"
                                    checked={this.state.displayAll}
                                    onChange={this.handleOnChange}
                                    inline>
                                    <span className="text-muted">
                                        display all
                                    </span>
                                </Checkbox>
                            </FormGroup>
                            <Panel>
                                <div>
                                    <label className="text-muted spacer-right">
                                        total disbursed
                                    </label>
                                    <Currency
                                        currency={
                                            summary.grandTotalDisbursed
                                        }
                                    />
                                </div>
                            </Panel>
                        </Row>
                        <Row>
                            <AgentDisbursementMetricsDataListFiltered
                                predicate={(agent, searchString) => {
                                    const firstNameMatch =
                                        agent.key.firstName
                                            .toLowerCase()
                                            .indexOf(searchString) >= 0;
                                    const lastNameMatch =
                                        agent.key.lastName
                                            .toLowerCase()
                                            .indexOf(searchString) >= 0;
                                    return (
                                        firstNameMatch || lastNameMatch
                                    );
                                }}
                                onGetKey={item => item.key.agentId}
                                renderHeader={() => {
                                    return (
                                        <AgentDisbursementMetricsRowLayout
                                            isHeader
                                        />
                                    );
                                }}
                                renderItem={(item, key) => {
                                    return (
                                        <AgentDisbursementMetricsRowLayout
                                            item={item}
                                            key={key}
                                        />
                                    );
                                }}
                                isLoading={this.props.loadingMetrics}
                                data={
                                    this.state.agentDisbursementMetrics
                                }
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
): AgentDisbursementMetricsContainerDispatchProps => {
    return {
        actions: bindActionCreators(Actions as any, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AgentDisbursementMetricsContainer);
