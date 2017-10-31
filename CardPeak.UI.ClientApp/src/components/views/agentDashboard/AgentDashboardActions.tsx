import * as React from 'react'
import { Button, Grid, Row, Col, ButtonGroup } from 'react-bootstrap'
import { ButtonLoadingText, DatePicker, UpdateAgentLinkButton } from '../../layout'
import DebitCreditTransactionFormModal from '../transactions/DebitCreditTransactionFormModal'
import * as dateHelpers from '../../../helpers/dateHelpers'

interface AgentDashboardActionsProps {
    agent: CardPeak.Entities.Agent;
    onRefresh?: (toDate?: string, fromDate?: string) => void;
    onSetDateFilters?: (dateFilters: CardPeak.Entities.DateFilters) => void;
    onPrint?: () => void;
    refreshingAgentDashboard?: boolean
}

interface AgentDashboardActionsState {
    showModal: boolean;
    transaction: Transaction;
    startDate?: string;
    endDate?: string
}

export default class AgentDashboardActions extends React.Component<AgentDashboardActionsProps, AgentDashboardActionsState> {
    constructor(props: AgentDashboardActionsProps) {
        super(props);
        this.state = {
            showModal: false,
            transaction: "credit",
            startDate: dateHelpers.firstDayOfTheMonth()
        }
    }
    componentDidMount() {
        this.handleOnSetDateFilters();
    }
    handleOnTransactionToggleModal = (e: any) => {
        this.setState({ transaction: e.target.dataset.name });
        this.handleOnToggleModal();
    }
    handleOnToggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }
    handleOnRefreshTransactions = () => {
        this.handleOnSetDateFilters();
        this.props.onRefresh(this.state.startDate, this.state.endDate);
    }
    handleOnStartDatePickerChange = (value: string, formattedValue: string) => {
        this.setState({ startDate: value });
    }
    handleOnEndDatePickerChange = (value: string, formattedValue: string) => {
        this.setState({ endDate: value });
    }
    handleOnSetDateFilters() {
        if (this.props.onSetDateFilters) {
            const dateFilters: CardPeak.Entities.DateFilters = {
                startDate: this.state.startDate,
                endDate: this.state.endDate
            };
            this.props.onSetDateFilters(dateFilters);
        }
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
                                showClearButton={false}
                                disabled={this.props.refreshingAgentDashboard} />
                        </Col>
                        <Col lg={1} md={1} sm={1}>
                            <label className="text-muted">to</label>
                        </Col>
                        <Col lg={5} md={5} sm={5}>
                            <DatePicker
                                value={this.state.endDate}
                                onChange={this.handleOnEndDatePickerChange}
                                showClearButton
                                disabled={this.props.refreshingAgentDashboard} />
                        </Col>
                    </Row>
                </div>
            </Col>
        )
    }
    renderButtons() {
        return (
            <Col lg={6} md={6} sm={12} xsHidden className="text-right hidden-print">
                <ButtonGroup disabled={this.props.refreshingAgentDashboard} className="spacer-right-sm">
                    <Button
                        onClick={this.handleOnRefreshTransactions}
                        bsStyle="primary"
                        disabled={this.props.refreshingAgentDashboard}>
                        <ButtonLoadingText isLoading={this.props.refreshingAgentDashboard} label="refresh" />
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
                    <Button
                        onClick={this.handleOnTransactionToggleModal}
                        bsStyle="info"
                        data-name="Incentive"
                        disabled={this.props.refreshingAgentDashboard}>
                        Incentive
                    </Button>
                </ButtonGroup>
                <UpdateAgentLinkButton id={this.props.agent.agentId} />
            </Col >
        )
    }
    renderSmallButtons() {
        return (
            <Col xs={12} smHidden lgHidden mdHidden className="text-right hidden-print">
                <ButtonGroup className="spacer-top spacer-bottom spacer-right-sm" disabled={this.props.refreshingAgentDashboard}>
                    <Button
                        onClick={this.handleOnRefreshTransactions}
                        bsStyle="primary"
                        disabled={this.props.refreshingAgentDashboard}>
                        <i className={"fa fa-refresh" + (this.props.refreshingAgentDashboard ? " fa-spin" : "")} title="Refresh"></i>
                    </Button>
                    <Button
                        onClick={this.handleOnTransactionToggleModal}
                        bsStyle="success"
                        data-name="Credit"
                        disabled={this.props.refreshingAgentDashboard}>
                        <i className="fa fa-plus" title="Credit Credit" data-name="Credit"></i>
                    </Button>
                    <Button
                        onClick={this.handleOnTransactionToggleModal}
                        bsStyle="danger"
                        data-name="Debit"
                        disabled={this.props.refreshingAgentDashboard}>
                        <i className="fa fa-minus" title="Debit Transaction" data-name="Debit"></i>
                    </Button>
                    <Button
                        onClick={this.handleOnTransactionToggleModal}
                        bsStyle="info"
                        data-name="Incentive"
                        disabled={this.props.refreshingAgentDashboard}>
                        <i className="fa fa-money" title="Incentive Transaction" data-name="Incentive"></i>
                    </Button>
                </ButtonGroup>
                <UpdateAgentLinkButton id={this.props.agent.agentId} />
            </Col>    
        )
    }
    renderModals() {
        return (
            <DebitCreditTransactionFormModal
                agent={this.props.agent}
                onToggleModal={this.handleOnToggleModal}
                showModal={this.state.showModal}
                transaction={this.state.transaction} />
        )
    }
    render() {
        return (
            <Grid fluid className="spacer-bottom">
                <Row>
                    {this.renderDateFilters()}
                    {this.renderButtons()}
                    {this.renderSmallButtons()}
                    {this.renderModals()}
                </Row>
            </Grid>
        )
    }
}