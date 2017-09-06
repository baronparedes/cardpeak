import * as React from 'react'
import { Panel, Row, Col, Button } from 'react-bootstrap'
import { GridList, SpinnerRow, ListNoRecordsRow } from '../../layout'

interface AgentAccountListProps {
    accounts: CardPeak.Entities.Account[],
    onRemoveAccount: (account: CardPeak.Entities.Account) => void;
    isLoading?: boolean;
}

interface AgentAccountDetailRowLayoutProps {
    account?: CardPeak.Entities.Account;
    isHeader: boolean;
    onRemoveAccount?: (account: CardPeak.Entities.Account) => void;
}

class AgentAccountDetailRowLayout extends React.Component<AgentAccountDetailRowLayoutProps, undefined> {
    handleOnClick = () => {

    }
    render() {
        return (
            <Row>
                <Col md={10} lg={10} sm={9} xs={9}>
                    {this.props.isHeader ? "accounts" : this.props.account.alias}
                </Col>
                <Col md={2} lg={2} sm={2} xs={2}>
                    {
                        this.props.isHeader ? null :
                            <Button onClick={this.handleOnClick} bsStyle="danger" bsSize="sm">
                                <i className="fa fa-lg fa-trash-o"></i>
                            </Button>
                    }
                </Col>
            </Row>
        );
    }
}

const AgentAccountList: React.StatelessComponent<AgentAccountListProps> = (props) => {
    return (
        <GridList header={<AgentAccountDetailRowLayout isHeader={true} />}>
            {
                props.isLoading ?
                    <SpinnerRow /> :
                    props.accounts && props.accounts.length > 0 ?
                        props.accounts.map((account) => {
                            return (
                                <Panel className="panel-row">
                                    <AgentAccountDetailRowLayout
                                        account={account}
                                        key={account.alias}
                                        isHeader={false}
                                        onRemoveAccount={props.onRemoveAccount} />
                                </Panel>
                            )
                        }) : <ListNoRecordsRow />
            }
        </GridList>
    );
}

export default AgentAccountList;