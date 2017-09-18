import * as React from 'react'
import { Button, Grid, Row, Col, ButtonGroup } from 'react-bootstrap'
import { ButtonLoadingText, FormFieldDropdown } from '../../layout'
import DebitCreditTransactionFormModal from '../transactions/DebitCreditTransactionFormModal'
import * as dateHelpers from '../../../helpers/dateHelpers'

interface DashboardActionsProps {
    onRefresh?: (year?: number, month?: number) => void,
    refreshing?: boolean
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
                                controlId="form-year"
                                label="year"
                                name="year"
                                error={this.state.errors.year}
                                value={this.state.year}
                                isRequired
                                onChange={this.handleOnChange} >
                                <option key={0} value={0}>Select...</option>
                            </FormFieldDropdown>
                        </Col>
                        <Col sm={6}>
                            <FormFieldDropdown
                                controlId="form-month"
                                label="month"
                                name="month"
                                error={this.state.errors.month}
                                value={this.state.month}
                                isRequired
                                onChange={this.handleOnChange} >
                                <option key={0} value={0}>Select...</option>
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