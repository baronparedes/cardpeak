import * as React from 'react'
import { Button, Grid, Row, Col, ButtonGroup } from 'react-bootstrap'
import { ButtonLoadingText, DatePicker, UpdateAgentLinkButton, AgentDashboardLinkButton } from '../../layout'
import DebitCreditTransactionFormModal from '../transactions/DebitCreditTransactionFormModal'
import * as dateHelpers from '../../../helpers/dateHelpers'

interface AgentSavingsActionsProps {
    agent: CardPeak.Entities.Agent;
    onRefresh?: () => void;
    onPrint?: () => void;
    refreshingAgentSavings?: boolean;
}

interface AgentSavingsActionsState {
    showModal: boolean;
    transaction: Transaction;
}

export default class AgentSavingsActions extends React.Component<AgentSavingsActionsProps, AgentSavingsActionsState> {
    constructor(props: AgentSavingsActionsProps) {
        super(props);
        this.state = {
            showModal: false,
            transaction: "savings-credit",
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
        this.props.onRefresh();
    }
    renderButtons() {
        return (
            <Col md={12} xsHidden className="text-right hidden-print">
                <ButtonGroup disabled={this.props.refreshingAgentSavings} className="spacer-right-sm">
                    <Button
                        onClick={this.handleOnRefreshTransactions}
                        bsStyle="primary"
                        disabled={this.props.refreshingAgentSavings}>
                        <ButtonLoadingText isLoading={this.props.refreshingAgentSavings} label="refresh" />
                    </Button>
                    <Button
                        onClick={this.handleOnTransactionToggleModal}
                        bsStyle="success"
                        data-name="Savings-Credit"
                        disabled={this.props.refreshingAgentSavings}>
                        Credit Savings
                    </Button>
                    <Button
                        onClick={this.handleOnTransactionToggleModal}
                        bsStyle="danger"
                        data-name="Savings-Debit"
                        disabled={this.props.refreshingAgentSavings}>
                        Debit Savings
                    </Button>
                </ButtonGroup>
                <AgentDashboardLinkButton id={this.props.agent.agentId} />
                <span className="spacer-left-sm"></span>
                <UpdateAgentLinkButton id={this.props.agent.agentId} />
            </Col >
        )
    }
    renderSmallButtons() {
        return (
            <Col xs={12} smHidden lgHidden mdHidden className="text-right hidden-print">
                <ButtonGroup className="spacer-top spacer-bottom spacer-right-sm" disabled={this.props.refreshingAgentSavings}>
                    <Button
                        onClick={this.handleOnRefreshTransactions}
                        bsStyle="primary"
                        disabled={this.props.refreshingAgentSavings}>
                        <i className={"fa fa-refresh" + (this.props.refreshingAgentSavings ? " fa-spin" : "")} title="Refresh"></i>
                    </Button>
                    <Button
                        onClick={this.handleOnTransactionToggleModal}
                        bsStyle="success"
                        data-name="Credit"
                        disabled={this.props.refreshingAgentSavings}>
                        <i className="fa fa-plus" title="Credit Transaction" data-name="Savings-Credit"></i>
                    </Button>
                    <Button
                        onClick={this.handleOnTransactionToggleModal}
                        bsStyle="danger"
                        data-name="Debit"
                        disabled={this.props.refreshingAgentSavings}>
                        <i className="fa fa-minus" title="Debit Transaction" data-name="Savings-Debit"></i>
                    </Button>
                </ButtonGroup>
                <AgentDashboardLinkButton id={this.props.agent.agentId} />
                <span className="spacer-left-sm"></span>
                <UpdateAgentLinkButton id={this.props.agent.agentId} />
            </Col>
        )
    }
    renderModals() {
        return (
            <DebitCreditTransactionFormModal
                showTransactionDate
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
                    {this.renderButtons()}
                    {this.renderSmallButtons()}
                    {this.renderModals()}
                </Row>
            </Grid>
        )
    }
}