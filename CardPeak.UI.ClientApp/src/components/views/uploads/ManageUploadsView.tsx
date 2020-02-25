import * as React from 'react';
import ManageUploadsContainer from './ManageUploadsContainer';

const ManageUploadsView: React.StatelessComponent<{}> = props => {
    return (
        <div>
            <h2>Manage Uploads</h2>
            <ManageUploadsContainer />
        </div>
    );
};

export default ManageUploadsView;
