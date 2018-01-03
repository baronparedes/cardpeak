import * as React from 'react'
import * as Actions from '../../../services/actions/metricActions'
import * as SettingsActions from '../../../services/actions/settingsAction'
import * as dateHelpers from '../../../helpers/dateHelpers'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../../services/reducers'

import { Col, Row, Grid } from 'react-bootstrap'
import { YearMonthAction, DataListFiltered, DataItemProps, DashboardLabel, ApprovalMetric, FormFieldDropdown }from '../../layout'

type AgentRankingMetricsDataList = new () => DataListFiltered<CardPeak.Entities.AgentRankMetric>;
const AgentRankingMetricsDataList = DataListFiltered as AgentRankingMetricsDataList;

interface AgentRankingMetricsContainerDispatchProps {
    actions?: typeof Actions
    settingsActions?: typeof SettingsActions;
}

interface AgentRankingMetricsContainerProps {
    banks: CardPeak.Entities.Reference[];
}

interface AgentRankingMetricsContainerState {
    bankId: number;
    year: number;
    month: number;
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

const AgentRankingMetricsRowLayout: React.StatelessComponent<DataItemProps<CardPeak.Entities.AgentRankMetric>> = (props) => {
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
                {props.isHeader ? "approvals" : <ApprovalMetric metric={props.item.value} className="text-larger" />}
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

class AgentRankingMetricsContainer extends React.Component<CardPeak.Models.MetricsModel & AgentRankingMetricsContainerProps & AgentRankingMetricsContainerDispatchProps, AgentRankingMetricsContainerState> {
    constructor(props: CardPeak.Models.MetricsModel & AgentRankingMetricsContainerProps & AgentRankingMetricsContainerDispatchProps) {
        super(props);
        this.state = {
            bankId: 0,
            year: dateHelpers.currentYear(),
            month: 0
        }
    }
    componentDidMount() {
        this.props.actions.getAvailableYears();
        this.props.settingsActions.loadReferencesStart();
        this.props.actions.getAgentRankingMetricsStart(dateHelpers.currentYear(), 0, 0);
    }
    handleOnBankChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value,
        }, () => {
            this.props.actions.getAgentRankingMetricsStart(this.state.year, this.state.month, this.state.bankId);
        });
    }
    handleOnRefresh = (year: number, month?: number) => {
        this.setState({
            ...this.state,
            year,
            month
        }, () => {
            this.props.actions.getAgentRankingMetricsStart(year, month, this.state.bankId);
        })
    }
    render() {
        return (
            <div>
                <h2>Agent Rankings</h2>
                <div>
                    <YearMonthAction
                        label="metrics"
                        availableYears={this.props.availableYears}
                        refreshing={this.props.loadingMetrics}
                        onRefresh={this.handleOnRefresh}>

                        <div>
                            <FormFieldDropdown
                                block
                                controlId="form-bank"
                                label="Bank"
                                name="bankId"
                                value={this.state.bankId}
                                onChange={this.handleOnBankChange} >
                                <option key={0} value={0}>All</option>
                                {
                                    this.props.banks.map((bank) => {
                                        return (
                                            <option key={bank.referenceId} value={bank.referenceId}>
                                                {bank.description}
                                            </option>
                                        )
                                    })
                                }
                            </FormFieldDropdown>
                        </div>

                    </YearMonthAction>
                    <br />
                    <Grid>
                        <Row>
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
                        </Row>
                    </Grid>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): CardPeak.Models.MetricsModel & AgentRankingMetricsContainerProps => ({
    ...state.metricsModel,
    banks: state.settingsModel.banks
})

const mapDispatchToProps = (dispatch: any): AgentRankingMetricsContainerDispatchProps => {
    return {
        actions: bindActionCreators(Actions as any, dispatch),
        settingsActions: bindActionCreators(SettingsActions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentRankingMetricsContainer);