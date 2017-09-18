import * as React from 'react'
import { Row, Col, Panel } from 'react-bootstrap'
import { ApprovalMetricsBarChart, ApprovalMetricsPieChart, FormFieldDropdown } from './'

interface ApprovalMetricsProps {
    approvalsByBank?: CardPeak.Entities.ApprovalMetric<string>[];
    approvalsByCategory?: CardPeak.Entities.ApprovalMetric<string>[];
    approvalsByBankDetails?: any;
}

interface ApprovalMetricsState {
    approvalsByCategoryFiltered?: CardPeak.Entities.ApprovalMetric<string>[]
}

export class ApprovalMetrics extends React.Component<ApprovalMetricsProps, ApprovalMetricsState> {
    constructor(props: ApprovalMetricsProps) {
        super(props);
        this.state = {
            approvalsByCategoryFiltered: this.props.approvalsByCategory
        }
    }
    componentWillReceiveProps(nextProps: ApprovalMetricsProps) {
        this.setState({ approvalsByCategoryFiltered: nextProps.approvalsByCategory })
    }
    handleOnCategoryFilter = (e: any) => {
        let target: string = e.target.value;
        if (target === "") {
            this.setState({ approvalsByCategoryFiltered: this.props.approvalsByCategory })
        }
        else {
            if (this.props.approvalsByBankDetails) {
                target = target.charAt(0).toLowerCase() + target.slice(1);
                let metrics: CardPeak.Entities.ApprovalMetric<string>[] = this.props.approvalsByBankDetails[target];
                if (!metrics) {
                    metrics = this.props.approvalsByBankDetails[target.toLowerCase()];
                }
                this.setState({ approvalsByCategoryFiltered: metrics })
            }
        }
    }
    render() {
        return (
            <Row>
                <Col sm={6}>
                    <Panel>
                        <ApprovalMetricsBarChart metrics={this.props.approvalsByBank} label="approval by banks" />
                    </Panel>
                </Col>
                <Col sm={6}>
                    <Panel>
                        <ApprovalMetricsPieChart metrics={this.state.approvalsByCategoryFiltered} label="approval by categories" />
                        <br />
                        <FormFieldDropdown
                            onChange={this.handleOnCategoryFilter}
                            controlId="form-filter"
                            label="filter"
                            name="filter">
                            <option key={0} value={""}>All</option>
                            {
                                this.props.approvalsByBank ? this.props.approvalsByBank.map((bank) => {
                                    return (
                                        <option key={bank.key} value={bank.key}>
                                            {bank.key}
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