import * as React from 'react'
import { Button, Grid, Row, Col, ButtonGroup } from 'react-bootstrap'
import { ButtonLoadingText, FormFieldDropdown } from '../../layout'
import DebitCreditTransactionFormModal from '../transactions/DebitCreditTransactionFormModal'
import * as dateHelpers from '../../../helpers/dateHelpers'

interface DashboardActionsProps {
    onRefresh?: (year?: number, month?: number) => void,
    refreshing?: boolean
    availableYears?: CardPeak.Entities.ApprovalMetric<number>[];
}

interface DashboardActionsState {
    year?: number;
    month?: number;
    errors: {
        [error: string]: string,
    },
}

export default class AgentDashboardActions extends React.Component<DashboardActionsProps, DashboardActionsState> {
    constructor(props: DashboardActionsProps) {
        super(props);
        this.state = {
            year: dateHelpers.currentYear(),
            month: dateHelpers.currentMonth(),
            errors: {
                year: '',
                month: '',
            }
        }
    }
    handleOnRefreshDashboard = () => {
        if (this.hasErrors()) {
            return;
        }
        this.props.onRefresh(this.state.year, this.state.month);
    }
    handleOnChange = (e: any) => {
        let errors = this.state.errors;
        errors[e.target.name] = '';
        this.setState({
            [e.target.name]: e.target.value,
            errors
        });
    }
    hasErrors = () => {
        this.handleErrors();
        if (!!this.state.errors.year ||
            !!this.state.errors.month) {
            return true;
        }
        return false;
    }
    handleErrors = () => {
        let errors = this.state.errors;
        if (!this.state.year || this.state.year == 0) errors.year = "*";
        if (!this.state.month || this.state.month == 0) errors.month = "*";
        this.setState({ errors });
        return errors;
    }
    renderDateFilters() {
        return (
            <Col sm={8}>
                <div className="container-fluid no-padding">
                    <Row>
                        <Col sm={6}>
                            <FormFieldDropdown
                                disabled={this.props.refreshing}
                                controlId="form-year"
                                label="year"
                                name="year"
                                error={this.state.errors.year}
                                value={this.state.year}
                                isRequired
                                onChange={this.handleOnChange} >
                                {
                                    this.props.availableYears ? this.props.availableYears.map(_ => {
                                        return (
                                            <option key={_.key} value={_.key}>
                                                {_.key + " (" + _.value + ")"}
                                            </option>
                                        )
                                    }) : null
                                }
                            </FormFieldDropdown>
                        </Col>
                        <Col sm={6}>
                            <FormFieldDropdown
                                disabled={this.props.refreshing}
                                controlId="form-month"
                                label="month"
                                name="month"
                                error={this.state.errors.month}
                                value={this.state.month}
                                isRequired
                                onChange={this.handleOnChange} >
                                <option value={1}>Jan</option>
                                <option value={2}>Feb</option>
                                <option value={3}>Mar</option>
                                <option value={4}>Apr</option>
                                <option value={5}>May</option>
                                <option value={6}>Jun</option>
                                <option value={7}>Jul</option>
                                <option value={8}>Aug</option>
                                <option value={9}>Sep</option>
                                <option value={10}>Oct</option>
                                <option value={11}>Nov</option>
                                <option value={12}>Dec</option>
                            </FormFieldDropdown>
                        </Col>
                    </Row>
                </div>
            </Col>
        )
    }
    renderButtons() {
        return (
            <Col sm={4} className="text-right">
                <Button
                    onClick={this.handleOnRefreshDashboard}
                    bsStyle="primary"
                    disabled={this.props.refreshing}>
                    <ButtonLoadingText isLoading={this.props.refreshing} label="refresh dashboard" />
                </Button>
            </Col >
        )
    }
    render() {
        return (
            <Grid fluid className="spacer-bottom">
                <Row>
                    {this.renderDateFilters()}
                    {this.renderButtons()}
                </Row>
            </Grid>
        )
    }
}