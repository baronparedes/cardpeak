import * as React from 'react'
import * as Actions from '../../../services/actions/metricActions'
import * as dateHelpers from '../../../helpers/dateHelpers'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../../services/reducers'

import { Col, Row, Grid } from 'react-bootstrap'
import { YearMonthAction, DataList, DataItemProps, DashboardLabel, PerformanceDashboard, ApprovalMetricsBarChart } from '../../layout'

type BankAmountBreakdownMetricsDataList = new () => DataList<CardPeak.Entities.BankAmountBreakdown>;
const BankAmountBreakdownMetricsDataList = DataList as BankAmountBreakdownMetricsDataList;

interface BankAmountBreakdownMetricsContainerDispatchProps {
    actions?: typeof Actions
}

const CardCategoryAmountBreakdownMetricsRowLayout: React.StatelessComponent<DataItemProps<CardPeak.Entities.AmountBreakdown[]>> = (props) => {
    return (
        <Grid fluid>
            <Row>
                {
                    props.item.map(_ => {
                        return (
                            <Col sm={4} className="text-center" key={_.description}>
                                {
                                    _.approvalsByAmount && _.approvalsByAmount.length > 0 ? 
                                        <ApprovalMetricsBarChart metrics={_.approvalsByAmount} label={_.description} /> : null
                                }
                            </Col>
                        )
                    })
                }
            </Row>
        </Grid>
    )
}

const BankAmountBreakdownMetricsRowLayout: React.StatelessComponent<DataItemProps<CardPeak.Entities.BankAmountBreakdown>> = (props) => {
    return (
        <Row>
            <Col mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader} className="text-center">
                <span className="grid-label spacer-left">bank amount breakdown</span>
            </Col>
            <Col sm={12} xsHidden={props.isHeader} className="text-center">
                {
                    props.isHeader ? "bank amount breakdown" :
                        <h3>{props.item.description}</h3>
                }
            </Col>
            {
                props.isHeader ? null :
                    <Col sm={12}>
                        {props.isHeader ? null : <CardCategoryAmountBreakdownMetricsRowLayout item={props.item.cardCategoryAmountBreakdown} />}
                    </Col>
            }
        </Row>
    )
}

class BankAmountBreakdownMetricsContainer extends React.Component<CardPeak.Models.MetricsModel & BankAmountBreakdownMetricsContainerDispatchProps, undefined> {
    constructor(props: CardPeak.Models.MetricsModel & BankAmountBreakdownMetricsContainerDispatchProps) {
        super(props);
    }
    componentDidMount() {
        this.props.actions.getAvailableYears();
        this.props.actions.getBankAmountBreakdownMetricsStart(dateHelpers.currentYear(), 0);
    }
    render() {
        return (
            <div>
                <YearMonthAction
                    label="metrics"
                    availableYears={this.props.availableYears}
                    refreshing={this.props.loadingMetrics}
                    onRefresh={this.props.actions.getBankAmountBreakdownMetricsStart} />
                <br />
                <Grid>
                    <Row>
                        <BankAmountBreakdownMetricsDataList
                            onGetKey={(item) => item.description}
                            renderHeader={() => { return <BankAmountBreakdownMetricsRowLayout isHeader /> }}
                            renderItem={(item, key) => {
                                return <BankAmountBreakdownMetricsRowLayout item={item} key={key} />
                            }}
                            isLoading={this.props.loadingMetrics}
                            data={this.props.bankAmountBreakdown} />
                    </Row>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): CardPeak.Models.MetricsModel => ({
    ...state.metricsModel,
})

const mapDispatchToProps = (dispatch: any): BankAmountBreakdownMetricsContainerDispatchProps => {
    return {
        actions: bindActionCreators(Actions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BankAmountBreakdownMetricsContainer);