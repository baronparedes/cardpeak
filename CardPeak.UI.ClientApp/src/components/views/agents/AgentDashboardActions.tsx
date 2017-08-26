import * as React from 'react'
import { Button, Grid, Row, Col, ButtonGroup } from 'react-bootstrap'
import { DatePicker } from '../../layout/DatePicker'
import DebitCreditTransactionFormModal from '../transactions/DebitCreditTransactionFormModal'

interface AgentDashboardActionsProps {
    agent: CardPeak.Entities.Agent
}

interface AgentDashboardActionsState {
    showModal: boolean;
    transaction: string;
}

export default class AgentDashboardActions extends React.Component<AgentDashboardActionsProps, AgentDashboardActionsState> {
    constructor(props: AgentDashboardActionsProps) {
        super(props);
        this.state = {
            showModal: false,
            transaction: "Credit"
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
        // TODO
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
                            <DatePicker label="from" />
                        </Col>
                        <Col lg={1} md={1} sm={1}>
                            <label className="text-muted">to</label>
                        </Col>
                        <Col lg={5} md={5} sm={5}>
                            <DatePicker label="to" />
                        </Col>
                    </Row>
                </div>
            </Col>
        )
    }
    renderButtons() {
        return (
            <Col lg={6} md={6} sm={12}  xsHidden className="text-right">
                <ButtonGroup>
                    <Button onClick={this.handleOnRefreshTransactions} bsStyle="primary">Refresh Transactions</Button>
                    <Button onClick={this.handleOnTransactionToggleModal} bsStyle="success" data-name="Credit">Credit</Button>
                    <Button onClick={this.handleOnTransactionToggleModal} bsStyle="danger" data-name="Debit">Debit</Button>
                </ButtonGroup>
            </Col >
        )
    }
    renderSmallButtons() {
        return (
            <Col xs={12} smHidden lgHidden mdHidden className="text-right">
                <ButtonGroup className="spacer-top spacer-bottom">
                    <Button onClick={this.handleOnRefreshTransactions} bsStyle="primary">
                        <i className="fa fa-refresh fa-2x" title="Refresh"></i>
                    </Button>
                    <Button onClick={this.handleOnTransactionToggleModal} bsStyle="success" data-name="Credit">
                        <i className="fa fa-plus fa-2x" title="Credit Credit" data-name="Credit"></i>
                    </Button>
                    <Button onClick={this.handleOnTransactionToggleModal} bsStyle="danger" data-name="Debit">
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