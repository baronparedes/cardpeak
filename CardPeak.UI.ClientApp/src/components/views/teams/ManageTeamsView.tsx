import * as React from 'react';
import ManageTeamsContainer from './ManageTeamsContainer';

const ManageTeamsView: React.StatelessComponent<{}> = () => {
    return (
        <div>
            <h2>Manage Teams</h2>
            <ManageTeamsContainer />
        </div>
    );
};

export default ManageTeamsView;
