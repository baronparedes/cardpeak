import * as React from 'react'
import { Button, Grid, Row, Col, ButtonGroup } from 'react-bootstrap'
import { YearPicker, MonthPicker, ButtonLoadingText } from './'
import * as dateHelpers from '../../helpers/dateHelpers'

interface YearMonthActionsProps {
    onRefresh?: (year?: number, month?: number) => void,
    refreshing?: boolean
    availableYears?: CardPeak.Entities.ApprovalMetric<number>[];
    label?: string;
    addOnActions?: React.ReactNode;
}

interface YearMonthActionsState {
    year?: number;
    month?: number;
    errors: {
        [error: string]: string,
    },
}

export class YearMonthAction extends React.Component<YearMonthActionsProps, YearMonthActionsState> {
    constructor(props: YearMonthActionsProps) {
        super(props);
        this.state = {
            year: dateHelpers.currentYear(),
            month: 0,
            errors: {
                year: ''
            }
        }
    }
    handleOnRefresh = () => {
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
        if (!!this.state.errors.year) {
            return true;
        }
        return false;
    }
    handleErrors = () => {
        let errors = this.state.errors;
        if (!this.state.year || this.state.year == 0) errors.year = "*";
        this.setState({ errors });
        return errors;
    }
    renderDateFilters() {
        return (
            <Col sm={8}>
                <div className="container-fluid no-padding">
                    <Row>
                        <Col sm={6}>
                            <YearPicker
                                value={this.state.year}
                                error={this.state.errors.year}
                                refreshing={this.props.refreshing}
                                availableYears={this.props.availableYears}
                                onChange={this.handleOnChange} />
                        </Col>
                        <Col sm={6}>
                            <MonthPicker
                                value={this.state.month}
                                refreshing={this.props.refreshing}
                                onChange={this.handleOnChange} />
                        </Col>
                    </Row>
                </div>
            </Col>
        )
    }
    renderButtons() {
        return (
            <Col sm={4} className="text-right">
                <ButtonGroup>
                    <Button
                        onClick={this.handleOnRefresh}
                        bsStyle="primary"
                        disabled={this.props.refreshing}>
                        <ButtonLoadingText
                            isLoading={this.props.refreshing}
                            label={"refresh" + (this.props.label ? (" " + this.props.label) : "")} />
                    </Button>
                    {this.props.addOnActions}
                </ButtonGroup>
            </Col >
        )
    }
    render() {
        return (
            <Grid className="spacer-bottom no-padding hidden-print">
                <Row>
                    {this.renderDateFilters()}
                    {this.renderButtons()}
                </Row>
            </Grid>
        )
    }
}