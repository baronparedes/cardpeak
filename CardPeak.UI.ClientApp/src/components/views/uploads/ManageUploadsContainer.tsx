import * as React from 'react'
import * as UploadActions from '../../../services/actions/uploadActions'
import * as dateHelpers from '../../../helpers/dateHelpers'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import ManageUploadsActions from './ManageUploadsActions'
import BatchUploadList from './BatchUploadList'

interface ManageUploadsContainerProps {
    batchUploads?: CardPeak.Entities.BatchUpload[];
    loadingBatchUploads?: boolean;
    deletingBatch?: boolean;
}

interface ManageUploadsContainerDispatchProps {
    uploadActions?: typeof UploadActions;
}

class ManageUploadsContainer extends React.Component<ManageUploadsContainerProps & ManageUploadsContainerDispatchProps, {}> {
    constructor(props: ManageUploadsContainerProps & ManageUploadsContainerDispatchProps) {
        super(props);
    }
    componentDidMount() {
        this.props.uploadActions.manageUploadsStart(dateHelpers.firstDayOfTheMonth());
    }
    render() {
        return (
            <div>
                <ManageUploadsActions
                    disabled={this.props.deletingBatch}
                    refreshing={this.props.loadingBatchUploads}
                    onRefresh={this.props.uploadActions.manageUploadsStart} />
                <br />
                <BatchUploadList
                    onDelete={this.props.uploadActions.deleteBatchStart}
                    isLoading={this.props.loadingBatchUploads}
                    deletingBatch={this.props.deletingBatch}
                    data={this.props.batchUploads} />
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): ManageUploadsContainerProps => ({
    batchUploads: state.batchUploadModel.batchUploads,
    deletingBatch: state.batchUploadModel.deletingBatch,
    loadingBatchUploads: state.batchUploadModel.loadingBatchUploads
});

const mapDispatchToProps = (dispatch: any): ManageUploadsContainerDispatchProps => {
    return {
        uploadActions: bindActionCreators(UploadActions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUploadsContainer);