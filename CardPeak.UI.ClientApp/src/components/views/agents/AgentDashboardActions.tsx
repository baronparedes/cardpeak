import * as React from 'react'
import { Button, Grid, Row, Col, ButtonGroup } from 'react-bootstrap'
import { ButtonLoadingText, DatePicker } from '../../layout'
import DebitCreditTransactionFormModal from '../transactions/DebitCreditTransactionFormModal'
import * as dateHelpers from '../../../helpers/dateHelpers'

interface AgentDashboardActionsProps {
    agent: CardPeak.Entities.Agent,
    onRefresh?: (toDate?: string, fromDate?: string) => void,
    refreshingAgentDashboard?: boolean
}

interface AgentDashboardActionsState {
    showModal: boolean;
    transaction: string;
    startDate?: string;
    endDate?: string
}

export default class AgentDashboardActions extends React.Component<AgentDashboardActionsProps, AgentDashboardActionsState> {
    constructor(props: AgentDashboardActionsProps) {
        super(props);
        super(props);
        this.state = {
            showModal: false,
            transaction: "Credit",
            startDate: dateHelpers.firstDayOfTheMonth()
        }
    }
    handleOnTransactionToggleModal = (e: any) => {
        this.setState({ transaction: e.target.dataset.name });
        this.handleOnToggleModal();
    }
    handleOnToggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }
    handleOnRefreshTransactions = () => {
        this.props.onRefresh(this.state.startDate, this.state.endDate);
    }
    handleOnStartDatePickerChange = (value: string, formattedValue: string) => {
        this.setState({ startDate: value });
    }
    handleOnEndDatePickerChange = (value: string, formattedValue: string) => {
        this.setState({ endDate: value });
    }
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
                                onChange={this.handleOnStartDatePickerChange}
                                disabled={this.props.refreshingAgentDashboard} />
                        </Col>
                        <Col lg={1} md={1} sm={1}>
                            <label className="text-muted">to</label>
                        </Col>
                        <Col lg={5} md={5} sm={5}>
                            <DatePicker
                                value={this.state.endDate}
                                onChange={this.handleOnEndDatePickerChange}
                                disabled={this.props.refreshingAgentDashboard} />
                        </Col>
                    </Row>
                </div>
            </Col>
        )
    }
    renderButtons() {
        return (
            <Col lg={6} md={6} sm={12}  xsHidden className="text-right">
                <ButtonGroup disabled={this.props.refreshingAgentDashboard}>
                    <Button
                        onClick={this.handleOnRefreshTransactions}
                        bsStyle="primary"
                        disabled={this.props.refreshingAgentDashboard}>
                        <ButtonLoadingText isLoading={this.props.refreshingAgentDashboard} label="refresh transactions" />
                    </Button>
                    <Button
                        onClick={this.handleOnTransactionToggleModal}
                        bsStyle="success"
                        data-name="Credit"
                        disabled={this.props.refreshingAgentDashboard}>
                        Credit
                    </Button>
                    <Button
                        onClick={this.handleOnTransactionToggleModal}
                        bsStyle="danger"
                        data-name="Debit"
                        disabled={this.props.refreshingAgentDashboard}>
                        Debit
                    </Button>
                </ButtonGroup>
            </Col >
        )
    }
    renderSmallButtons() {
        return (
            <Col xs={12} smHidden lgHidden mdHidden className="text-right">
                <ButtonGroup className="spacer-top spacer-bottom" disabled={this.props.refreshingAgentDashboard}>
                    <Button
                        onClick={this.handleOnRefreshTransactions}
                        bsStyle="primary"
                        disabled={this.props.refreshingAgentDashboard}>
                        <i className={"fa fa-refresh fa-2x" + (this.props.refreshingAgentDashboard ? " fa-spin" : "")} title="Refresh"></i>
                    </Button>
                    <Button
                        onClick={this.handleOnTransactionToggleModal}
                        bsStyle="success"
                        data-name="Credit"
                        disabled={this.props.refreshingAgentDashboard}>
                        <i className="fa fa-plus fa-2x" title="Credit Credit" data-name="Credit"></i>
                    </Button>
                    <Button
                        onClick={this.handleOnTransactionToggleModal}
                        bsStyle="danger"
                        data-name="Debit"
                        disabled={this.props.refreshingAgentDashboard}>
                        <i className="fa fa-minus fa-2x" title="Debit Transaction" data-name="Debit"></i>
                    </Button>
                </ButtonGroup>
                <DebitCreditTransactionFormModal
                    agent={this.props.agent}
                    onToggleModal={this.handleOnToggleModal}
                    showModal={this.state.showModal}
                    transaction={this.state.transaction} />
            </Col>    
        )
    }
    render() {
        return (
            <Grid fluid className="spacer-bottom">
                <Row>
                    {this.renderDateFilters()}
                    {this.renderButtons()}
                    {this.renderSmallButtons()}
                </Row>
            </Grid>
        )
    }
}