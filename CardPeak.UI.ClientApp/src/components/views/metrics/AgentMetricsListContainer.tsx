import * as React from 'react'
import * as Actions from '../../../services/actions/metricActions'
import * as dateHelpers from '../../../helpers/dateHelpers'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../../services/reducers'

import { Col, Row, Grid, Panel } from 'react-bootstrap'
import {
    YearMonthAction, DataListFiltered, DataListProps, DataItemProps, Currency
} from '../../layout'

type AgentMetricsDataListFiltered = new () => DataListFiltered<CardPeak.Entities.AgentApprovalMetric>;
const AgentMetricsDataListFiltered = DataListFiltered as AgentMetricsDataListFiltered;


interface AgentMetricsListContainerDispatchProps {
    actions?: typeof Actions
}

const AgentMetricsRowLayout: React.StatelessComponent<DataItemProps<CardPeak.Entities.AgentApprovalMetric>> = (props) => {
        return (
            <Row>
                <Col mdHidden
                    lgHidden
                    smHidden
                    xsHidden={!props.isHeader}>
                    <span className="grid-label text-center spacer-left">agent metrics</span>
                </Col>
                <Col sm={4} xsHidden={props.isHeader}>
                    {props.isHeader ? "agent" : props.item.key.firstName + " " + props.item.key.lastName}
                </Col>
                <Col sm={2} xsHidden={props.isHeader}>
                    {props.isHeader ? "approvals" : <label className="text-highlight">{props.item.value}</label>}
                </Col>
                <Col sm={3} xsHidden={props.isHeader}>
                    {props.isHeader ? "balance" : <Currency currency={props.item.accountBalance} />}
                </Col>
                <Col sm={3} xsHidden={props.isHeader}>
                    {props.isHeader ? "savings" : <Currency noCurrencyColor currency={props.item.savingsBalance} />}
                </Col>
            </Row>
        )
    }

class AgentMetricsListContainer extends React.Component<CardPeak.Models.MetricsModel & AgentMetricsListContainerDispatchProps, undefined> {
    constructor(props: CardPeak.Models.MetricsModel & AgentMetricsListContainerDispatchProps) {
        super(props);
    }
    componentDidMount() {
        this.props.actions.getAvailableYears();
        this.props.actions.getAgentMetricsStart(dateHelpers.currentYear(), 0);
    }
    render() {
        return (
            <div>
                <YearMonthAction
                    label="agent metrics"
                    availableYears={this.props.availableYears}
                    refreshing={this.props.loadingAgentMetrics}
                    onRefresh={this.props.actions.getAgentMetricsStart} />
                <br />
                <Grid className="no-padding">
                    <Row>
                        <AgentMetricsDataListFiltered
                            predicate={(agent, searchString) => {
                                const firstNameMatch = agent.key.firstName.toLowerCase().indexOf(searchString) >= 0;
                                const lastNameMatch = agent.key.lastName.toLowerCase().indexOf(searchString) >= 0;
                                return firstNameMatch || lastNameMatch;
                            }}
                            paged
                            pageSize={20}
                            onGetKey={(item) => item.key.agentId}
                            renderHeader={() => { return <AgentMetricsRowLayout isHeader /> }}
                            renderItem={(item, key) => {
                                return <AgentMetricsRowLayout item={item} key={key} />
                            }}
                            isLoading={this.props.loadingAgentMetrics}
                            data={this.props.agentMetrics} />
                    </Row>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): CardPeak.Models.MetricsModel => ({
    ...state.metricsModel,
})

const mapDispatchToProps = (dispatch: any): AgentMetricsListContainerDispatchProps => {
    return {
        actions: bindActionCreators(Actions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentMetricsListContainer);