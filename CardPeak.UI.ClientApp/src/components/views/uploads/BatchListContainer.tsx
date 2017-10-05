import * as React from 'react'
import * as TransactionActions from '../../../services/actions/transactionActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

interface BatchListContainerDispatchProps {
    transactionActions?: typeof TransactionActions;
}

class BatchListContainer extends React.Component<{ match: any } & BatchListContainerDispatchProps, {}> {
    constructor(props: { match: any } & BatchListContainerDispatchProps) {
        super(props);
    }
    render() {
        return (
            <div>
                <h2>Batch {this.props.match.params.id} transactions</h2>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): {} => ({
});

const mapDispatchToProps = (dispatch: any): BatchListContainerDispatchProps => {
    return {
        transactionActions: bindActionCreators(TransactionActions as any, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BatchListContainer);
