import * as React from 'react'
import * as Actions from '../../../services/actions/metricActions'
import * as dateHelpers from '../../../helpers/dateHelpers'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../../services/reducers'

import { Col, Row, Grid } from 'react-bootstrap'
import { YearMonthAction, DataList, DataItemProps, DashboardLabel, PerformanceDashboard, MetricsHorizontalBarChart } from '../../layout'

type BankAmountDistributionMetricsDataList = new () => DataList<CardPeak.Entities.BankAmountDistribution>;
const BankAmountDistributionMetricsDataList = DataList as BankAmountDistributionMetricsDataList;

interface BankAmountDistributionMetricsContainerDispatchProps {
    actions?: typeof Actions
}

const CardCategoryAmountDistributionMetricsRowLayout: React.StatelessComponent<DataItemProps<CardPeak.Entities.AmountDistribution[]>> = (props) => {
    return (
        <Grid fluid>
            <Row>
                {
                    props.item.map(_ => {
                        return (
                            <Col sm={4} className="text-center" key={_.description}>
                                {
                                    _.approvalsByAmount && _.approvalsByAmount.length > 0 ? 
                                            <MetricsHorizontalBarChart metrics={_.approvalsByAmount} label={_.description} height={400} /> : null
                                }
                            </Col>
                        )
                    })
                }
            </Row>
        </Grid>
    )
}

const BankAmountDistributionMetricsRowLayout: React.StatelessComponent<DataItemProps<CardPeak.Entities.BankAmountDistribution>> = (props) => {
    return (
        <Row>
            <Col mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader} className="text-center">
                <span className="grid-label spacer-left">bank amount distribution</span>
            </Col>
            <Col sm={12} xsHidden={props.isHeader} className="text-center">
                {
                    props.isHeader ? "bank amount distribution" :
                        <h3>{props.item.description}</h3>
                }
            </Col>
            {
                props.isHeader ? null :
                    <Col sm={12}>
                        {props.isHeader ? null : <CardCategoryAmountDistributionMetricsRowLayout item={props.item.cardCategoryAmountDistribution} />}
                    </Col>
            }
        </Row>
    )
}

class BankAmountDistributionMetricsContainer extends React.Component<CardPeak.Models.MetricsModel & BankAmountDistributionMetricsContainerDispatchProps, undefined> {
    constructor(props: CardPeak.Models.MetricsModel & BankAmountDistributionMetricsContainerDispatchProps) {
        super(props);
    }
    componentDidMount() {
        this.props.actions.getAvailableYears();
        this.props.actions.getBankAmountDistributionMetricsStart(dateHelpers.currentYear(), 0);
    }
    render() {
        return (
            <div>
                <h2>Bank Amount Distribution</h2>
                <div>
                    <YearMonthAction
                        label="metrics"
                        availableYears={this.props.availableYears}
                        refreshing={this.props.loadingMetrics}
                        onRefresh={this.props.actions.getBankAmountDistributionMetricsStart} />
                    <br />
                    <Grid>
                        <Row>
                            <BankAmountDistributionMetricsDataList
                                onGetKey={(item) => item.description}
                                renderHeader={() => { return <BankAmountDistributionMetricsRowLayout isHeader /> }}
                                renderItem={(item, key) => {
                                    return <BankAmountDistributionMetricsRowLayout item={item} key={key} />
                                }}
                                isLoading={this.props.loadingMetrics}
                                data={this.props.bankAmountDistributionMetrics} />
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

const mapDispatchToProps = (dispatch: any): BankAmountDistributionMetricsContainerDispatchProps => {
    return {
        actions: bindActionCreators(Actions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BankAmountDistributionMetricsContainer);