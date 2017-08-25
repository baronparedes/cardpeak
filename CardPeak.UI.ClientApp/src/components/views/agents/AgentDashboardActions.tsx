import * as React from 'react'
import { Button, Grid, Row, Col, ButtonGroup } from 'react-bootstrap'
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
    render() {
        return (
            <Grid fluid className="spacer-bottom">
                <Row>
                    <Col lg={6} md={6} sm={6} xs={12}>
                        <Grid fluid className="no-padding">
                            <Row>
                                <Col xs={6}>
                                    <label className="text-muted spacer-right">from</label>
                                    DATE_FROM__PICKER
                                </Col>
                                <Col xs={6}>
                                    <label className="text-muted spacer-right">to</label>
                                    DATE_TO__PICKER
                                </Col>    
                            </Row>
                        </Grid>
                    </Col>
                    <Col lg={6} md={6} sm={6} xsHidden className="text-right" >
                        <ButtonGroup>
                            <Button onClick={this.handleOnRefreshTransactions} bsStyle="primary">Refresh Transactions</Button>
                            <Button onClick={this.handleOnTransactionToggleModal} bsStyle="success" data-name="Credit">Credit</Button>
                            <Button onClick={this.handleOnTransactionToggleModal} bsStyle="danger" data-name="Debit">Debit</Button>
                        </ButtonGroup>
                    </Col>
                    <Col xs={12} smHidden lgHidden mdHidden className="text-right">
                        <ButtonGroup>
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
                </Row>
            </Grid>
        )
    }
}