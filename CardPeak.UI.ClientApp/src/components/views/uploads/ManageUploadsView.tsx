import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import ManageUploadsContainer from './ManageUploadsContainer'
import BatchListContainer from './BatchListContainer'

const ManageUploadsView: React.StatelessComponent<{ match: any }> = (props) => {
    console.log(props.match.url);
    return (
        <div>
            <h2>Manage Uploads</h2>
            <ManageUploadsContainer />
        </div>
    )
}

export default ManageUploadsView;