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
    yearOnly?: boolean;
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
                year: ""
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
            ...this.state,
            [e.target.name]: e.target.value,
            errors
        }, this.handleOnRefresh);
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
                        {
                            this.props.yearOnly ? null :
                                <MonthPicker
                                    value={this.state.month}
                                    refreshing={this.props.refreshing}
                                    onChange={this.handleOnChange} />
                        }
                    </Col>
                </Row>
            </div>
        )
    }
    renderButtons() {
        return (
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
        )
    }
    render() {
        return (
            <Grid className="spacer-bottom no-padding hidden-print">
                <Row>
                    <Col sm={8}>
                        {this.renderDateFilters()}
                        {
                            !this.props.children ? null :
                                <Row>
                                    <Col sm={12}>
                                        <fieldset disabled={this.props.refreshing}>
                                            {this.props.children}
                                        </fieldset>
                                    </Col>
                                </Row>
                        }
                    </Col>
                    <Col sm={4} className="text-right">
                        {this.renderButtons()}
                    </Col>
                </Row>
            </Grid>
        )
    }
}