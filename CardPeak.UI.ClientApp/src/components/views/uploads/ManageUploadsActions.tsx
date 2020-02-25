import * as React from 'react';
import { Button, ButtonGroup, Col, Grid, Row } from 'react-bootstrap';
import * as dateHelpers from '../../../helpers/dateHelpers';
import { ButtonLoadingText, DatePicker } from '../../layout';

interface ManageUploadsActionsProps {
    onRefresh?: (toDate?: string, fromDate?: string) => void;
    refreshing?: boolean;
    disabled?: boolean;
}

interface ManageUploadsActionsState {
    startDate?: string;
    endDate?: string;
}

export default class ManageUploadsActions extends React.Component<
    ManageUploadsActionsProps,
    ManageUploadsActionsState
> {
    constructor(props: ManageUploadsActionsProps) {
        super(props);
        this.state = {
            startDate: dateHelpers.firstDayOfTheMonth()
        };
    }
    handleOnRefresh = () => {
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
        this.setState({ startDate: value });
    };
    handleOnEndDatePickerChange = (
        value: string,
        formattedValue: string
    ) => {
        this.setState({ endDate: value });
    };
    renderDateFilters() {
        return (
            <Col lg={6} md={6} sm={12} xs={12}>
                <div className="container-fluid no-padding">
                    <Row>
                        <Col lg={1} md={1} sm={1}>
                            <label className="text-muted">from</label>
                        </Col>
                        <Col lg={5} md={5} sm={5}>
                            <DatePicker
                                value={this.state.startDate}
                                onChange={
                                    this.handleOnStartDatePickerChange
                                }
                                showClearButton={false}
                                disabled={
                                    this.props.refreshing ||
                                    this.props.disabled
                                }
                            />
                        </Col>
                        <Col lg={1} md={1} sm={1}>
                            <label className="text-muted">to</label>
                        </Col>
                        <Col lg={5} md={5} sm={5}>
                            <DatePicker
                                value={this.state.endDate}
                                onChange={
                                    this.handleOnEndDatePickerChange
                                }
                                showClearButton
                                disabled={
                                    this.props.refreshing ||
                                    this.props.disabled
                                }
                            />
                        </Col>
                    </Row>
                </div>
            </Col>
        );
    }
    renderButtons() {
        return (
            <Col lg={6} md={6} sm={12} xs={12} className="text-right">
                <ButtonGroup
                    disabled={
                        this.props.refreshing || this.props.disabled
                    }>
                    <Button
                        onClick={this.handleOnRefresh}
                        bsStyle="primary"
                        disabled={
                            this.props.refreshing || this.props.disabled
                        }>
                        <ButtonLoadingText
                            isLoading={this.props.refreshing}
                            label="refresh"
                        />
                    </Button>
                </ButtonGroup>
            </Col>
        );
    }
    render() {
        return (
            <Grid fluid className="spacer-bottom">
                <Row>
                    {this.renderDateFilters()}
                    {this.renderButtons()}
                </Row>
            </Grid>
        );
    }
}
