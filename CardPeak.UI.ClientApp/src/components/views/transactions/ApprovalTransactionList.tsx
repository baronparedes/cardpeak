import * as React from 'react'
import * as concat from 'classnames'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { DataListFiltered, DataListProps, DataItemProps, ConfirmButton, Currency } from '../../layout'
import { dateFormat } from '../../../helpers/dateHelpers'

type ApprovalTransactionDataList = new () => DataListFiltered<CardPeak.Entities.ApprovalTransaction>;
const ApprovalTransactionDataList = DataListFiltered as ApprovalTransactionDataList;

interface ApprovalTransactionListProps {
    showAgent?: boolean;
    hideAmount?: boolean;
    hideSearchBar?: boolean;
    onDeleteComplete?: (id: number) => void;
    onDeleteError?: (e: string) => void;
    onDelete?: (id: number,
        deleteCompleted: (id: number) => void,
        deleteError: (e: string) => void) => void;
}

interface ApprovalTransactionListState {
    data: CardPeak.Entities.ApprovalTransaction[]
}

interface DeleteTransactionButtonState {
    isDeleting?: boolean;
}

class DeleteTransactionButton extends React.Component<DataItemProps<CardPeak.Entities.ApprovalTransaction> & ApprovalTransactionListProps, DeleteTransactionButtonState> {
    constructor(props: DataItemProps<CardPeak.Entities.ApprovalTransaction> & ApprovalTransactionListProps) {
        super(props);
        this.state = {
            isDeleting: undefined
        }
    }
    handleOnConfirm = () => {
        if (this.props.onDelete) {
            this.setState({ isDeleting: true });
            this.props.onDelete(this.props.item.id, this.handleOnDeleteComplete, this.handleOnDeleteError);
        }
    }
    handleOnDeleteComplete = (id: number) => {
        this.setState({ isDeleting: undefined });
        if (this.props.onDeleteComplete) {
            this.props.onDeleteComplete(id);
        }
    }
    handleOnDeleteError = (e: string) => {
        this.setState({ isDeleting: undefined });
        if (this.props.onDeleteError) {
            this.props.onDeleteError(e);
        }
    }
    render() {
        return (
            <ConfirmButton
                useButtonLoading
                noButtonLoadingText
                isLoading={this.state.isDeleting}
                disabled={this.state.isDeleting}
                bsStyle= "danger"
                buttonLabel= {<i className= "fa fa-trash-o" ></i >}
                confirmTitle = "Delete Transaction"
                onConfirm = { this.handleOnConfirm } >

                    <p>
                        You are about to
                        <strong className="text-highlight text-danger"> delete </strong>
                        transaction: <span className="text-highlight">{this.props.item.client}</span>
                    </p>
                    <p>
                        <label className="text-muted text-small spacer-right">credited to</label>
                        <span className="text-highlight text-small">{concat(this.props.item.agent.firstName, " ", this.props.item.agent.lastName)}</span>
                    </p>
                    <p className="text-right">Do you wish to continue?</p>
            </ConfirmButton >
        )
    }
}

const ApprovalTransactionListRowLayout = (props: DataItemProps<CardPeak.Entities.ApprovalTransaction> & ApprovalTransactionListProps) => {
    return (
        <Row>
            <Col mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader}>
                <span className="grid-label text-center spacer-left">Approval Transactions</span>
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "bank" : props.item.bank.description}
            </Col>
            <Col md={1} lg={1} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "card category" : props.item.cardCategory.description}
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "product" : props.item.productType}
            </Col>
            <Col md={3} lg={3} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "client" : props.item.client}
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "approval date" : dateFormat(props.item.approvalDate)}
            </Col>
            {
                props.hideAmount ?
                    <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                        {
                            props.isHeader ? "actions" :
                                <DeleteTransactionButton {...props} />
                        }
                    </Col> :
                    <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                        {props.isHeader ? "amount" : <Currency className="row-amount" noCurrencyColor currency={props.item.amount} />}
                    </Col>
            }
            {
                !props.showAgent || props.isHeader ? null :
                    <Col md={12} lg={12} sm={12} xs={12}>
                        <label className="text-muted text-small spacer-right">credited to</label>
                        <span className="text-highlight text-small">{concat(props.item.agent.firstName, " ", props.item.agent.lastName)}</span>
                    </Col>
            }
        </Row>
    )
}


class ApprovalTransactionList extends React.Component<DataListProps<CardPeak.Entities.ApprovalTransaction> & ApprovalTransactionListProps, ApprovalTransactionListState> {
    constructor(props: DataListProps<CardPeak.Entities.ApprovalTransaction> & ApprovalTransactionListProps) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }
    componentWillReceiveProps(nextProps: DataListProps<CardPeak.Entities.ApprovalTransaction> & ApprovalTransactionListProps) {
        if (this.state.data != nextProps.data) {
            this.setState({ data: nextProps.data });
        }
    }
    handleOnDeleteComplete = (id: number) => {
        this.setState({
            data: this.state.data.filter(_ => _.id != id)
        });
    }
    render() {
        return (
            <div>
                <ApprovalTransactionDataList
                    predicate={(_, searchString) => {
                        const clientMatched = _.client.toLowerCase().indexOf(searchString) >= 0;
                        const productMatched = _.cardCategory.description.toLowerCase().startsWith(searchString);
                        return clientMatched || productMatched;
                    }}
                    hideSearchBar={this.props.hideSearchBar}
                    pageSize={10}
                    isLoading={this.props.isLoading}
                    renderHeader={() => { return <ApprovalTransactionListRowLayout isHeader hideAmount={this.props.hideAmount} /> }}
                    renderItem={(item, key) => {
                        return <ApprovalTransactionListRowLayout
                            item={item}
                            key={key}
                            showAgent={this.props.showAgent}
                            hideAmount={this.props.hideAmount}
                            onDeleteComplete={this.handleOnDeleteComplete}
                            onDelete={this.props.onDelete} />
                    }}
                    data={this.state.data} />
            </div>
        )
    }
}

export default ApprovalTransactionList