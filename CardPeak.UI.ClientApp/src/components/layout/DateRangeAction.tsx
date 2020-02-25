import * as React from 'react';
import { Button, ButtonGroup, Col, Grid, Row } from 'react-bootstrap';
import * as dateHelpers from '../../helpers/dateHelpers';
import { ButtonLoadingText, DatePicker } from './';

interface DateRangeActionsProps {
    onRefresh?: (startDate: string, endDate?: string) => void;
    refreshing?: boolean;
    label?: string;
    startDateLabel?: string;
    endDateLabel?: string;
    addOnActions?: React.ReactNode;
    hideEndDate?: boolean;
    defaultStartDate?: string;
}

interface DateRangeActionsState {
    startDate?: string;
    endDate?: string;
    errors: {
        [error: string]: string;
    };
}

export class DateRangeAction extends React.Component<
    DateRangeActionsProps,
    DateRangeActionsState
> {
    public static defaultProps: Partial<DateRangeActionsProps> = {
        defaultStartDate: dateHelpers.currentDay(),
        startDateLabel: 'from',
        endDateLabel: 'to'
    };

    constructor(props: DateRangeActionsProps) {
        super(props);
        this.state = {
            startDate: props.defaultStartDate,
            endDate: undefined,
            errors: {
                startDate: ''
            }
        };
    }
    handleOnRefresh = () => {
        if (this.hasErrors()) {
            return;
        }
        if (this.props.onRefresh) {
            this.props.onRefresh(
                this.state.startDate,
                this.state.endDate
            );
        }
    };
    handleOnStartDatePickerChange = (
        value: string,
        formattedValue: string
    ) => {
        let errors = this.state.errors;
        errors['startDate'] = '';
        this.setState(
            {
                ...this.state,
                ['startDate']: value,
                errors
            },
            this.handleOnRefresh
        );
    };
    handleOnEndDatePickerChange = (
        value: string,
        formattedValue: string
    ) => {
        this.setState({ endDate: value });
    };
    hasErrors = () => {
        this.handleErrors();
        if (!!this.state.errors.year) {
            return true;
        }
        return false;
    };
    handleErrors = () => {
        let errors = this.state.errors;
        if (!this.state.startDate) errors.startDate = '*';
        this.setState({ errors });
        return errors;
    };
    renderDateFilters() {
        return (
            <div className="no-padding">
                <Row>
                    <Col md={6} sm={6}>
                        <label className="text-muted">
                            {this.props.startDateLabel}
                        </label>
                        <DatePicker
                            value={this.state.startDate}
                            onChange={
                                this.handleOnStartDatePickerChange
                            }
                            showClearButton={false}
                            disabled={this.props.refreshing}
                        />
                    </Col>
                    <Col md={6} sm={6}>
                        {this.props.hideEndDate ? null : (
                            <div>
                                <label className="text-muted">
                                    {this.props.endDateLabel}
                                </label>
                                <DatePicker
                                    value={this.state.endDate}
                                    onChange={
                                        this.handleOnEndDatePickerChange
                                    }
                                    showClearButton
                                    disabled={this.props.refreshing}
                                />
                            </div>
                        )}
                    </Col>
                </Row>
            </div>
        );
    }
    renderButtons() {
        return (
            <ButtonGroup className="spacer-right-sm">
                <Button
                    onClick={this.handleOnRefresh}
                    bsStyle="primary"
                    disabled={this.props.refreshing}>
                    <ButtonLoadingText
                        isLoading={this.props.refreshing}
                        label={
                            'refresh' +
                            (this.props.label
                                ? ' ' + this.props.label
                                : '')
                        }
                    />
                </Button>
                {this.props.addOnActions}
            </ButtonGroup>
        );
    }
    render() {
        return (
            <Grid
                fluid
                className="spacer-bottom no-padding hidden-print">
                <Row>
                    <Col md={9} sm={9}>
                        {this.renderDateFilters()}
                        {!this.props.children ? null : (
                            <Row>
                                <Col md={12} sm={12}>
                                    <fieldset
                                        disabled={
                                            this.props.refreshing
                                        }>
                                        {this.props.children}
                                    </fieldset>
                                </Col>
                            </Row>
                        )}
                    </Col>
                    <Col
                        md={3}
                        sm={3}
                        className="text-right hidden-print">
                        {this.renderButtons()}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
