import * as React from 'react'
import { Row, Col, Panel } from 'react-bootstrap'
import { MetricsHorizontalBarChart, MetricsPieChart, FormFieldDropdown } from './'

interface ApprovalMetricsProps {
    approvalsByBank?: CardPeak.Entities.ApprovalMetric<string>[];
    approvalsByCategory?: CardPeak.Entities.ApprovalMetric<string>[];
    approvalsByBankDetails?: any;
}

interface ApprovalMetricsState {
    approvalsByCategoryFiltered?: CardPeak.Entities.ApprovalMetric<string>[];
    selectedCategoryFilter?: string;
}

export class ApprovalMetrics extends React.Component<ApprovalMetricsProps, ApprovalMetricsState> {
    constructor(props: ApprovalMetricsProps) {
        super(props);
        this.state = {
            approvalsByCategoryFiltered: this.props.approvalsByCategory,
            selectedCategoryFilter: ""
        }
    }
    componentWillReceiveProps(nextProps: ApprovalMetricsProps) {
        this.setState({ approvalsByCategoryFiltered: nextProps.approvalsByCategory })
    }
    handleOnCategoryFilter = (target: string) => {
        let metrics: CardPeak.Entities.ApprovalMetric<string>[]
        if (target === "") {
            metrics = this.props.approvalsByCategory;
        }
        else {
            if (this.props.approvalsByBankDetails) {
                const bankKey: string = target.charAt(0).toLowerCase() + target.slice(1);
                metrics = this.props.approvalsByBankDetails[bankKey];
                if (!metrics) {
                    metrics = this.props.approvalsByBankDetails[bankKey.toLowerCase()];
                }
            }
        }

        this.setState({
            approvalsByCategoryFiltered: metrics,
            selectedCategoryFilter: target
        })

    }
    handleOnClick = (e: any) => {
        const label: string = e[0]._view.label;
        let target: string = "";
        this.props.approvalsByBank.forEach(_ => {
            if (label.startsWith(_.key)) {
                target = _.key;
                return;
            }
        });
        this.handleOnCategoryFilter(target);
    }
    handleOnCategoryFilterChange = (e: any) => {
        let target: string = e.target.value;
        this.handleOnCategoryFilter(target);
    }
    render() {
        return (
            <Row className="hidden-print">
                <Col sm={6}>
                    <Panel>
                        <MetricsHorizontalBarChart metrics={this.props.approvalsByBank} label="approval by banks" onClick={this.handleOnClick} />
                    </Panel>
                </Col>
                <Col sm={6}>
                    <Panel>
                        <MetricsPieChart metrics={this.state.approvalsByCategoryFiltered} label="approval by categories" />
                        <br />
                        <FormFieldDropdown
                            onChange={this.handleOnCategoryFilterChange}
                            controlId="form-filter"
                            value={this.state.selectedCategoryFilter}
                            label="filter"
                            name="filter">
                            <option key={0} value={""}>All</option>
                            {
                                this.props.approvalsByBank ? this.props.approvalsByBank.map((bank) => {
                                    return (
                                        <option key={bank.key} value={bank.key}>
                                            {bank.key + " (" + bank.value + ")"}
                                        </option>
                                    )
                                }) : null
                            }
                        </FormFieldDropdown>
                    </Panel>
                </Col>
            </Row>
        )
    }
}