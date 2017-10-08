import * as React from 'react'
import * as TransactionActions from '../../../services/actions/transactionActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { SpinnerBlock, NavigationProps } from '../../layout'

import ApprovalTransactionList from '../transactions/ApprovalTransactionList'

interface BatchListContainerDispatchProps {
    actions?: typeof TransactionActions;
}

interface BatchListContainerState {
    transactions?: CardPeak.Entities.ApprovalTransaction[];
    isLoading?: boolean;
    loadingError?: string;
    count?: number;
}

class BatchListContainer extends React.Component<NavigationProps<any> & BatchListContainerDispatchProps, BatchListContainerState> {
    constructor(props: NavigationProps<any> & BatchListContainerDispatchProps) {
        super(props);
        this.state = {
            loadingError: undefined,
            count: 0
        }
    }
    componentDidMount() {
        this.props.actions.getTransactionsByBatchStart(this.props.match.params.id,
            this.handleOnGetTransactionsComplete, this.handleOnGetTransactionsError);
    }
    handleOnGetTransactions = () => {
        this.setState({ isLoading: true, loadingError: undefined });
        this.props.actions.getTransactionsByBatchStart(this.props.match.params.id,
            this.handleOnGetTransactionsComplete,
            this.handleOnGetTransactionsError)
    }
    handleOnGetTransactionsComplete = (data: CardPeak.Entities.ApprovalTransaction[]) => {
        this.setState({
            isLoading: undefined,
            loadingError: undefined,
            transactions: data
        });
    }
    handleOnGetTransactionsError = (e: string) => {
        this.setState({
            isLoading: undefined,
            loadingError: e
        });
    }
    render() {
        return (
            <div>
                <h2>Batch {this.props.match.params.id} transactions</h2>
                <label className="text-danger">
                    {this.state.loadingError ? this.state.loadingError : null}
                </label>
                {
                    this.state.isLoading ? <SpinnerBlock /> :
                        <ApprovalTransactionList
                            data={this.state.transactions}
                            showAgent
                            hideAmount
                            onDelete={this.props.actions.deleteTransaciton} />
                }
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): {} => ({
});

const mapDispatchToProps = (dispatch: any): BatchListContainerDispatchProps => {
    return {
        actions: bindActionCreators(TransactionActions as any, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BatchListContainer);
